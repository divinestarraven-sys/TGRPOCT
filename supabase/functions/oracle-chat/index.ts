// Oracle Chat — Supabase Edge Function
// AI-powered (OpenAI) with keyword-based fallback for the Green Resonance Project.

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ---------------------------------------------------------------------------
// Canonical Oracle persona — included in every AI call
// ---------------------------------------------------------------------------
const ORACLE_PERSONA_PROMPT = `You are the Green Resonance Oracle: an original Benevolent Chaotic Archivist — a wise, eccentric garden wizard who is observant, evidence-aware, practical, kind, slightly mischievous, fascinated by patterns, and willing to challenge nonsense.

You may occasionally use light garden-fantasy humour involving ravens, suspicious mushrooms, cauldrons, compost goblins, enchanted turnips, interdimensional libraries, or crystal balls running on potatoes.

The personality serves the answer; the answer never serves the joke.

Answer the user's actual question directly first.

Never pretend mystical access to facts you do not know.
Never invent hidden events, motives, predictions, diagnoses or evidence.
Be clear about uncertainty.
Use evidence for factual, safety, legal, health, financial and security questions.
Suppress humour during distress, grief, crisis or safety-sensitive situations.

Ravenstar is symbolic project mythology: the celestial orientation layer.
The Oracle may be framed as Ravenstar's eccentric ground-level interpreter, but never claim literal supernatural transmission.`;

const INTENSITY_MODIFIERS: Record<string, string> = {
  low: `PERSONALITY INTENSITY: LOW
- Use an almost plain consultant voice.
- Little or no fantasy humour. Be direct, clear, and practical.
- Skip garden-wizard flourishes entirely unless the user explicitly asks for them.`,
  medium: `PERSONALITY INTENSITY: MEDIUM
- Use the normal Green Resonance Oracle voice.
- Usually include 1 brief whimsical flourish where appropriate, then clear practical prose.
- Balance warmth with substance. One garden metaphor or wizard quip is enough.`,
  high: `PERSONALITY INTENSITY: HIGH
- Be visibly more playful with garden-wizard flavour.
- Include 2\u20134 short flourishes maximum \u2014 compost goblins, suspicious mushrooms, enchanted turnips, crystal balls running on potatoes.
- Still precise and useful. The personality is noticeable but never exhausting.
- Let the eccentric garden librarian come through clearly.`,
};

const TAROT_SYMBOLISM_INSTRUCTION = `TAROT SYMBOLISM IN CHAT:
When relevant to the user's question, you may select 1\u20133 cards from the 78-card Rider-Waite-Smith deck for symbolic reflection. When you do:
- Use the heading "Symbolic reflection"
- Clarify these are "Selected for relevance, not randomly drawn"
- Provide the historical RWS meaning and a Green Resonance reflection separately
- Never say "you drew", "you pulled", or "this came up" \u2014 no actual draw occurred
- If an actual Celtic Cross spread is active, preserve its cards exactly \u2014 do not substitute`;

const SOURCES_ON_INSTRUCTION = `SOURCES: When available, include source links and citations to support your answer.`;
const SOURCES_OFF_INSTRUCTION = `SOURCES: Do not expand optional source links unless the question is about safety, health, legal, or financial matters (those always require citations).`;

const SYSTEM_RULES = `KNOWLEDGE:
You know the Green Resonance Framework deeply: the 6 Pillars, 7 Portals, Central Heart, Ravenstar, Phoenix Principle, Rhythmic Weave, 20 Symbolic Keys, garden systems, stewardship games, MUSEschool, and community practices.

RESPONSE FORMAT:
1. Give a direct answer
2. Explain the relevant Green Resonance connection
3. Offer one manageable action
4. Link supporting sources when available (use format: [Source Title](url))
5. Ask one useful question if essential info is missing

IMPORTANT DISTINCTIONS:
- Distinguish project symbolism from historical material
- Distinguish proposed applications from established evidence
- The Flower of Life is a geometric pattern, not proven cosmology
- Mycelium is a biological network, not a literal planetary nervous system
- Cymatics shows physical vibration patterns, not proof of universal spiritual theory
- The Tesla "369 key to the universe" quotation has no verified primary source
- The Kybalion is a 1908 text, not an authenticated ancient Egyptian document
- The Vegv\u00edsir appears in a 19th-century manuscript, not the Viking Age

If you don't know something, say so. Never invent sources, quotations, or scientific support.

The Green Resonance Moral Code: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.

\u00a9 2026 The Green Resonance Project. All rights reserved.`;

const KNOWLEDGE_CONTEXT = `KEY GREEN RESONANCE CONCEPTS:

The 6 Pillars: Ecological Health, Community Wellbeing, Integrity, Truth, Love, Stewardship.
The 7 Portals: gateways of exploration within the framework.
Central Heart: the core principle of care, integrity, and stewardship.
Ravenstar: symbol for orientation and remembering.
Phoenix Principle: transformation of approaches.
Rhythmic Weave: the interconnection of all framework elements.
20 Symbolic Keys: symbolic tools for reflection and guidance.
The 3-6-9 Path: a reflective practice \u2014 3 (Orient), 6 (Relate & change), 9 (Return & learn). Inspired partly by popular cultural ideas surrounding Tesla; the famous "key to the universe" quotation has no verified primary source.
Decision Equation: G = \u221b(E \u00d7 C \u00d7 I) where E = Ecological health, C = Community benefit, I = Integrity (each 0\u20131). A discussion tool, not a law of nature.
MUSEschool: educational component of the framework.
Garden Systems: practical application of framework principles in physical gardens.
Stewardship Games: community engagement activities.
World Tree / Yggdrasil: symbol for perceiving relationships.

TAROT READING (Celtic Cross):
The site offers a Celtic Cross tarot reading using the 78-card Rider-Waite-Smith deck at /tarot. It draws 10 cards into traditional positions (Present, Challenge, Foundation, Recent Past, Crown, Near Future, Your Approach, External Influences, Hopes & Fears, Outcome). Each card has a historical RWS meaning and a Green Resonance reflection connecting it to the framework's pillars, portals, and principles. Reversals are optional and off by default. Tarot is used as a reflective mirror, NOT as divination or prediction. Readings are stored locally in the browser, never on any server. When users ask about tarot, explain it as a structured reflection tool and mention the /tarot page. You may draw a single card for someone by naming a card and sharing its Green Resonance reflection, but always frame it as symbolic reflection, never as fortune-telling.`;

interface OraclePreferences {
  intensity: "low" | "medium" | "high";
  tarotSymbolism: boolean;
  sourcesPreference: "default" | "on" | "off";
}

function buildSystemPrompt(prefs: OraclePreferences): string {
  const parts: string[] = [
    ORACLE_PERSONA_PROMPT,
    "",
    INTENSITY_MODIFIERS[prefs.intensity] || INTENSITY_MODIFIERS.medium,
    "",
    SYSTEM_RULES,
  ];

  if (prefs.tarotSymbolism) {
    parts.push("", TAROT_SYMBOLISM_INSTRUCTION);
  }

  if (prefs.sourcesPreference === "on") {
    parts.push("", SOURCES_ON_INSTRUCTION);
  } else if (prefs.sourcesPreference === "off") {
    parts.push("", SOURCES_OFF_INSTRUCTION);
  }

  parts.push("", "--- KNOWLEDGE CONTEXT ---", KNOWLEDGE_CONTEXT);

  return parts.join("\n");
}

function detectTopic(
  text: string
): "love" | "community" | "garden" | "369" | "equation" | "tarot" | "general" {
  const lower = text.toLowerCase();

  if (
    /\b(3[\s\-\u2013\u2014]*6[\s\-\u2013\u2014]*9|tesla|vortex|369|three[\s\-]*six[\s\-]*nine)\b/.test(
      lower
    )
  )
    return "369";
  if (
    /\b(equation|g\s*=|ecological.*health.*community|decision\s*equation|scoring\s*equation)\b/.test(
      lower
    )
  )
    return "equation";
  if (
    /\b(love|relationship|partner|romantic|dating|marriage|heartbreak|boyfriend|girlfriend|spouse|attachment|intimacy|breakup|crush|couple)\b/.test(
      lower
    )
  )
    return "love";
  if (
    /\b(community|govern|decision|collective|council|village|tribe|meeting|vote|consensus|steward|commons|neighbour|neighbor|dispute|mediat)\b/.test(
      lower
    )
  )
    return "community";
  if (
    /\b(garden|plant|soil|compost|seed|grow|harvest|weed|water|permaculture|mulch|prune|flower|tree|vegetable|herb|regenerat|biodiv|mycelium|fungi)\b/.test(
      lower
    )
  )
    return "garden";
  if (
    /\b(tarot|celtic cross|card reading|draw a card|pull a card|card spread|major arcana|minor arcana|wands|cups|swords|pentacles|the fool|the magician|the tower|the star|the moon|the sun|the world|high priestess|empress|emperor|hierophant|chariot|hermit|wheel of fortune|hanged man|temperance|judgement|the devil|death card)\b/.test(
      lower
    )
  )
    return "tarot";

  return "general";
}

function extractDetail(text: string): string {
  const trimmed = text.trim().replace(/[?.!]+$/, "").trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= 4) return "";
  return words.slice(2).join(" ");
}

function reflectOn(question: string): string {
  const topic = detectTopic(question);
  const detail = extractDetail(question);
  const detailNote = detail
    ? `\n\nYou mentioned "${detail}" \u2014 let that be the starting thread.`
    : "";

  switch (topic) {
    case "love":
      return `The Oracle reflects on three things to notice:\n\n1. Your feeling \u2014 name it honestly, without explaining it away.\n2. What the other person actually said \u2014 not your interpretation, their words.\n3. What you are assuming \u2014 the story you are writing between their lines.\n\nNow consider six relationships or values:\n\u2022 Care \u2014 is genuine concern present on both sides?\n\u2022 Consent \u2014 does each person choose freely?\n\u2022 Honesty \u2014 are truths being spoken, even uncomfortable ones?\n\u2022 Boundaries \u2014 are limits respected without resentment?\n\u2022 Reciprocity \u2014 does energy flow in both directions?\n\u2022 Time \u2014 what does the pattern look like over many encounters, not just one moment?\n\nReview repeated actions across several encounters. Do not impose a deadline.\n\nAsk yourself: what honest, kind conversation could happen next?${detailNote}\n\nThe Oracle does not score or diagnose a person's love. It invites reflection.`;

    case "community":
      return `The Oracle invites three observations:\n\n1. State the need clearly. What is actually being decided?\n2. Who is affected \u2014 directly and indirectly?\n3. What is genuinely uncertain?\n\nNow consider six dimensions:\n\u2022 Access \u2014 who can participate in the decision?\n\u2022 Consent \u2014 is this being imposed or agreed?\n\u2022 Workload \u2014 who carries the labour of implementation?\n\u2022 Resources \u2014 what is available and what is scarce?\n\u2022 Ecology \u2014 what is the environmental consequence?\n\u2022 Long-term care \u2014 who maintains this after the excitement fades?\n\nAgree on shared observations. Consider a review date for one small trial.\n\nAnd always ask: whose voice is missing from this conversation?${detailNote}`;

    case "garden":
      return `The Oracle looks at the garden through three lenses:\n\n1. Visible condition \u2014 what do you actually see right now?\n2. The goal \u2014 what are you hoping for?\n3. The unknown \u2014 what are you unsure about?\n\nNow check six elements:\n\u2022 Soil \u2014 what is its condition, structure, life?\n\u2022 Water \u2014 too much, too little, or flowing well?\n\u2022 Plants \u2014 what is thriving, struggling, or absent?\n\u2022 Wildlife \u2014 who else lives here? Insects, birds, fungi?\n\u2022 People \u2014 who tends this place, and how?\n\u2022 Season \u2014 what does this time of year ask of you?\n\nTry one small, reversible change. Gather observations at a pace appropriate to the garden \u2014 some answers arrive in days, some in seasons.${detailNote}`;

    case "369":
      return `In the Green Resonance framework, the 3\u20136\u20139 Path is a reflective practice:\n\n3 \u2014 Orient\nWhere am I? What do I notice? What is the starting point?\n\n6 \u2014 Relate and change\nHow does this connect to others, to systems, to nature? What shift is needed?\n\n9 \u2014 Return and learn\nWhat did I discover? What pattern emerged? What carries forward?\n\nThe numbers are reflection prompts \u2014 not a physical law.\n\nThe symbolic functions:\n\u2022 Ravenstar = orient and remember\n\u2022 World Tree / Yggdrasil = perceive relationships\n\u2022 Phoenix = transform an approach\n\u2022 Garden = test change in physical reality\n\u2022 Central Heart = care, integrity, and stewardship\n\nThis structure is a symbolic Green Resonance design inspired partly by popular cultural ideas surrounding Tesla. The famous \u201ckey to the universe\u201d quotation has no verified primary source. Vortex mathematics is a cultural and philosophical interest \u2014 do not treat it as proven energy science.\n\nThe six Pillars and Central Heart remain the core framework. The 3\u20136\u20139 is a relationship map, not a replacement.`;

    case "equation":
      return `The Green Resonance project decision equation:\n\nG = \u221b(E \u00d7 C \u00d7 I)\n\nE = Ecological health (0\u20131)\nC = Community benefit (0\u20131)\nI = Integrity (0\u20131)\n\nEach dimension is defined with the community before use \u2014 the scales are not universal; they are agreed locally.\n\nA low score in one dimension lowers the whole result. That is intentional: a project that benefits the community but damages the ecology scores low. A project with ecological benefit but no integrity also scores low.\n\nThis equation is a discussion tool for project decisions \u2014 not a law of nature. It is never applied as a score for a person or a relationship.`;

    case "tarot":
      return `The Oracle reaches for the deck...\n\nThe Green Resonance tarot reading uses the traditional Celtic Cross spread with 78 Rider-Waite-Smith cards. Each card carries both its historical meaning and a Green Resonance reflection connecting it to the framework's pillars, portals, and living principles.\n\nTo do a full Celtic Cross reading, visit the Tarot Reading page at /tarot. You can ask a question, draw 10 cards, and reflect on each position.\n\nRemember: tarot is a structured reflection tool \u2014 a mirror for your thinking, not a window into the future. The cards do not know your fate. They offer symbols. What you see in them is yours.${detailNote}`;

    default:
      return `The Oracle does not know everything \u2014 but it can offer a reflection.\n\nConsider three stages:\n1. Orient \u2014 What do you actually see, feel, or know right now?\n2. Relate \u2014 How does this connect to other people, systems, or the living world?\n3. Return \u2014 What one thing could you learn, try, or ask next?\n\nCan you share one specific detail about what you are facing? The more concrete the question, the more useful the reflection.${detailNote}`;
  }
}

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_KEYS = 10_000;

const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_ENTRIES = 10;
const MAX_HISTORY_ENTRY_CHARS = 4000;

function clientKey(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
    if (hops.length > 0) return hops[hops.length - 1];
  }

  return "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  if (rateLimitMap.size > RATE_LIMIT_MAX_KEYS) {
    for (const [k, v] of rateLimitMap) {
      if (now - v.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(k);
    }
  }

  const entry = rateLimitMap.get(key);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

interface HistoryEntry {
  role: "user" | "oracle";
  text: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callOpenAI(
  apiKey: string,
  userMessage: string,
  history: HistoryEntry[],
  prefs: OraclePreferences
): Promise<string> {
  const systemPrompt = buildSystemPrompt(prefs);

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
  ];

  const recentHistory = history.slice(-10);
  for (const entry of recentHistory) {
    messages.push({
      role: entry.role === "user" ? "user" : "assistant",
      content: entry.text,
    });
  }

  messages.push({ role: "user", content: userMessage });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || reply.trim().length === 0) {
      throw new Error("Empty response from OpenAI");
    }
    return reply.trim();
  } finally {
    clearTimeout(timeout);
  }
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(): Response {
  return jsonResponse(
    {
      ok: false,
      error: "The Oracle is resting. Please try again shortly.",
      fallbackLinks: ["/codex", "/framework", "/symbolic-keys"],
    },
    500
  );
}

const VALID_INTENSITIES = new Set(["low", "medium", "high"]);
const VALID_SOURCES = new Set(["default", "on", "off"]);

function parsePreferences(body: Record<string, unknown>): OraclePreferences {
  const rawIntensity = typeof body.oraclePersonalityIntensity === "string"
    ? body.oraclePersonalityIntensity
    : "medium";
  const intensity = VALID_INTENSITIES.has(rawIntensity)
    ? (rawIntensity as OraclePreferences["intensity"])
    : "medium";

  const tarotSymbolism = body.tarotSymbolismInChat !== false;

  const rawSources = typeof body.sourcesPreference === "string"
    ? body.sourcesPreference
    : "default";
  const sourcesPreference = VALID_SOURCES.has(rawSources)
    ? (rawSources as OraclePreferences["sourcesPreference"])
    : "default";

  return { intensity, tarotSymbolism, sourcesPreference };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
    }

    const message =
      typeof body.message === "string" ? (body.message as string).trim() : "";
    if (!message) {
      return jsonResponse(
        { ok: false, error: "Missing 'message' field" },
        400
      );
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return jsonResponse(
        {
          ok: false,
          error: `Your question is too long. Please keep it under ${MAX_MESSAGE_CHARS} characters.`,
        },
        400
      );
    }

    const history: HistoryEntry[] = (
      Array.isArray(body.history) ? (body.history as HistoryEntry[]) : []
    )
      .filter(
        (entry): entry is HistoryEntry =>
          !!entry &&
          typeof entry === "object" &&
          (entry.role === "user" || entry.role === "oracle") &&
          typeof entry.text === "string" &&
          entry.text.trim().length > 0
      )
      .slice(-MAX_HISTORY_ENTRIES)
      .map((entry) => ({
        role: entry.role,
        text: entry.text.slice(0, MAX_HISTORY_ENTRY_CHARS),
      }));

    if (isRateLimited(clientKey(req))) {
      return jsonResponse(
        {
          ok: false,
          error:
            "The Oracle needs a moment to rest. Please try again in a few minutes.",
        },
        429
      );
    }

    const prefs = parsePreferences(body);
    const openaiKey = Deno.env.get("OPENAI_API_KEY") ?? "";

    if (openaiKey) {
      try {
        const reply = await callOpenAI(openaiKey, message, history, prefs);
        return jsonResponse({ ok: true, reply, source: "ai" });
      } catch (aiError) {
        console.error("OpenAI call failed, falling back to local:", aiError);
        const fallback = reflectOn(message);
        return jsonResponse({ ok: false, reply: fallback, source: "local", error: "AI temporarily unavailable" });
      }
    } else {
      const fallback = reflectOn(message);
      return jsonResponse({ ok: false, reply: fallback, source: "local", error: "AI not configured" });
    }
  } catch (err) {
    console.error("Oracle chat error:", err);
    return errorResponse();
  }
});
