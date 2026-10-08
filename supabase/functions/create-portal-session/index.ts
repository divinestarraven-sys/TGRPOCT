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

// Origin / Referer are caller-supplied. Interpolating them into the Stripe
// billing portal return_url would let an attacker mint a genuine portal link
// whose "back to site" button lands on their own page, so only known origins
// are accepted.
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return jsonResponse({ error: "Payments are not yet configured" }, 503);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Not authenticated" }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAuth = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return jsonResponse({ error: "Not authenticated" }, 401);
    }

    const supabaseAdmin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: entitlement } = await supabaseAdmin
      .from("members_entitlements")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!entitlement?.stripe_customer_id) {
      return jsonResponse({ error: "No billing record found" }, 400);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30.basil" });
    const origin = resolveOrigin(req);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: entitlement.stripe_customer_id,
      return_url: `${origin}/members`,
    });

    return jsonResponse({ url: portalSession.url });
  } catch (err) {
    console.error("create-portal-session error:", err);
    return jsonResponse({ error: "Could not open billing portal" }, 500);
  }
});
