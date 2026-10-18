const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

function json(data, status, cors) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: { ...JSON_HEADERS, ...cors } });
}

export default {
  async fetch(request, env) {
    const origins = (env.ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
    const origin = request.headers.get("Origin") || "";
    const cors = origins.includes(origin) ? {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
      "vary": "Origin"
    } : {};

    if (!origin || !origins.includes(origin)) return json({ error: "Origin not allowed." }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") return json({ error: "Not found." }, 404, cors);
    if (!env.OPENAI_API_KEY) return json({ error: "Assistant is not configured." }, 503, cors);

    const visitor = request.headers.get("cf-connecting-ip") || "anonymous";
    const { success } = await env.CHAT_RATE_LIMITER.limit({ key: visitor });
    if (!success) return json({ error: "Please wait a moment before asking another question." }, 429, cors);

    let rawBody;
    try { rawBody = await request.text(); } catch (_) { return json({ error: "Invalid request." }, 400, cors); }
    if (new TextEncoder().encode(rawBody).byteLength > 12000) return json({ error: "Message is too long." }, 413, cors);
    let body;
    try { body = JSON.parse(rawBody); } catch (_) { return json({ error: "Invalid request." }, 400, cors); }
    if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 8) {
      return json({ error: "Please send a shorter conversation." }, 400, cors);
    }
    const messages = body.messages.map((item) => {
      if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") return null;
      const content = item.content.trim();
      if (!content || content.length > 1000) return null;
      return { role: item.role, content };
    });
    if (messages.some((item) => item === null) || messages[messages.length - 1].role !== "user") {
      return json({ error: "Please send a valid question." }, 400, cors);
    }

    const instructions = [
      "You are the friendly portfolio assistant for photographer and filmmaker Alexandru Țîrdea.",
      "Answer the visitor's actual question conversationally; do not behave like a search box or return a list of search results.",
      "Use only these verified facts: the site has photography collections (street, landscape, events, people, nature and wildlife, still life); a featured showreel and the film A Day in Bucharest; award details on the Awards page; full-resolution digital photo files cost $25 each; Alexandru is available for event photography and video; contact email tirdea.alex2020@gmail.com and phone +40 774 971 394.",
      "Do not invent photo locations, award results, availability, prices, payment terms, or personal facts. If the site does not give enough information, say so and invite the visitor to email Alexandru.",
      "Reply in Romanian when the visitor writes in Romanian; otherwise reply in English. Be warm, concise, and helpful. Do not claim to have viewed or searched information beyond the facts provided here."
    ].join(" ");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "authorization": "Bearer " + env.OPENAI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-5.4-mini",
          instructions,
          input: messages.map((item) => ({ role: item.role, content: item.content })),
          max_output_tokens: 260,
          store: false
        }),
        signal: controller.signal
      });
      if (!response.ok) return json({ error: "I couldn’t answer just now. Please try again or email Alexandru." }, 502, cors);
      const result = await response.json();
      const answer = result.output_text || (result.output || []).flatMap((item) => item.content || []).filter((item) => item.type === "output_text").map((item) => item.text).join("\n");
      if (!answer) return json({ error: "I couldn’t form an answer just now. Please try again." }, 502, cors);
      return json({ answer: answer.slice(0, 4000) }, 200, cors);
    } catch (_) {
      return json({ error: "The assistant is temporarily unavailable. Please try again." }, 502, cors);
    } finally {
      clearTimeout(timeout);
    }
  }
};
