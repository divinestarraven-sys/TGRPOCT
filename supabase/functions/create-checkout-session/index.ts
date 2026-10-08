import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const CANONICAL_ORIGIN = "https://www.thegreenresonanceproject.org";

// The Origin / Referer headers are supplied by the caller and must never be
// trusted: an attacker can request a real Stripe Checkout session whose
// post-payment redirect points at their own site, then send that genuine
// checkout link to a victim. Only known origins are accepted; anything else
// falls back to the canonical production domain.
const ALLOWED_ORIGINS = new Set<string>([
  CANONICAL_ORIGIN,
  "https://thegreenresonanceproject.org",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
]);

function resolveOrigin(req: Request): string {
  const candidates: string[] = [];

  const originHeader = req.headers.get("Origin");
  if (originHeader) candidates.push(originHeader);

  const referer = req.headers.get("Referer");
  if (referer) {
    try {
      candidates.push(new URL(referer).origin);
    } catch {
      // A malformed Referer is ignored rather than trusted.
    }
  }

  for (const candidate of candidates) {
    const normalized = candidate.replace(/\/+$/, "");
    if (ALLOWED_ORIGINS.has(normalized)) return normalized;
  }

  return CANONICAL_ORIGIN;
}

const ALLOWED_TIERS: Record<string, string> = {
  mycelium: Deno.env.get("STRIPE_MYCELIUM_PRICE_ID") || "price_1UJ5djHNnEUdlUVcXmmJJDid",
  canopy: Deno.env.get("STRIPE_CANOPY_PRICE_ID") || "price_1UJ5deHNnEUdlUVcOXvBoXT6",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return jsonResponse({ error: "Payments are not yet configured" }, 503);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Not authenticated" }, 401);
    }

    const supabaseAuth = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return jsonResponse({ error: "Not authenticated" }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const tier = typeof body.tier === "string" ? body.tier : "";
    const priceId = ALLOWED_TIERS[tier];
    if (!priceId) {
      return jsonResponse({ error: "Invalid tier" }, 400);
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: entitlement } = await supabaseAdmin
      .from("members_entitlements")
      .select("stripe_customer_id, stripe_subscription_id, status, tier")
      .eq("user_id", user.id)
      .maybeSingle();

    if (entitlement?.status === "active" && entitlement.tier === tier) {
      return jsonResponse({ error: "You already have an active subscription for this tier" }, 409);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30.basil" });

    let customerId = entitlement?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabaseAdmin
        .from("members_entitlements")
        .update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
    }

    const origin = resolveOrigin(req);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/members?checkout=success`,
      cancel_url: `${origin}/${tier === "canopy" ? "canopy-membership" : "mycelium-membership"}`,
      client_reference_id: user.id,
      subscription_data: {
        metadata: { user_id: user.id, tier },
      },
    });

    return jsonResponse({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return jsonResponse({ error: "Could not create checkout session" }, 500);
  }
});
