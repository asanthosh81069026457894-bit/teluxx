// Server-side chat proxy. Holds the Groq API key, picks the most relevant
// chunks from those supplied by the client, and forwards a single completion
// request. The key is read from process.env (not import.meta.env) so it never
// enters the browser bundle.
//
// Post-payment-removal: voice mode is no longer gated. Every signed-in user
// gets both `text` and `voice` modes. The `effectivePlan` lookup is gone --
// it used to be the only thing that distinguished the two paths server-side.
// We still accept the `mode` field for back-compat with the browser client
// (it sets the spoken-style system prompt vs the written one).
//
// Model selection: the operator picks the model with `GROQ_MODEL`. The
// default (`openai/gpt-oss-20b`) is one of Groq's stable Production models
// on the free tier with a healthy per-minute quota and good RAG coverage
// across the 22 Eighth Schedule languages. Earlier defaults
// (`groq/compound`, `llama-3.3-70b-versatile`) were either rate-limited
// mid-session on the free tier or rolled off Groq's catalogue. To pin to a
// different model, set `GROQ_MODEL` -- e.g. `openai/gpt-oss-120b` for the
// larger GPT-OSS model, or `groq/compound-mini` if you trust a small
// router.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { detectLangFromText } from "@/lib/detect-lang";
import { consume } from "@/lib/rate-limit";
import { userIdExists } from "@/lib/supabaseServer";
import { pickTopChunks } from "@/lib/chunk-picker";

// Friendly error thrown when the per-user chat rate limit is exceeded. The
// chat UI surfaces this as a one-line "slow down" toast instead of a generic
// server error so the user understands the cause.
export class ChatRateLimitedError extends Error {
  readonly code = "CHAT_RATE_LIMITED";
  readonly retryAfterMs: number;
  constructor(retryAfterMs: number) {
    super("You're sending messages too quickly. Please wait a moment and try again.");
    this.name = "ChatRateLimitedError";
    this.retryAfterMs = retryAfterMs;
  }
}

// Input caps. Token budget on the Groq free tier is 8 000 TPM (Tier 1 dev
// accounts). With the historical 6-chunk configuration a single ask could push
// past 2 500 input tokens plus a 1 000-token reply -- usually fine, but
// every couple of turns under sustained use would trip 429. We now budget
// under 5 000 input tokens per call so users get at least 8-10 questions per
// minute on the free tier before rate-limit kicks in.
//
// Caps:
//   - 4 chunks of 1 200 chars each (was 6 x 1500)
//   - up to 12 history turns accepted from the client (the actual slice we
//     forward to the model is determined inside the handler, not by Zod;
//     setting the Zod cap above the client slice avoids spurious
//     "Array must contain at most N" rejections when the client ships
//     up to 8 turns)
//   - server-side context joined up to 2 800 chars (~ 700 tokens) -- was 3600
//   - per-chunk server cap 800 chars (was 1200)
const MAX_CONTEXT_CHARS = 2_800;

const inputSchema = z.object({
  userId: z.string().uuid(),
  question: z.string().min(1).max(2000),
  chunks: z.array(z.string().min(1).max(1200)).max(4).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .max(12)
    .optional(),
  // "text" = regular chat, "voice" = Talk-with-Document / read-aloud / mic.
  // Both modes are available to every signed-in user.
  mode: z.enum(["text", "voice"]).default("text"),
  forceLang: z.string().min(2).max(20).optional(),
  voiceToken: z.string().optional(),
});

export type ChatResponse = {
  answer: string;
  usedChunks: number;
};

// In-process cache for `userIdExists` lookups. Repeated questions from
// the same user (the common case) skip the Supabase admin round-trip
// and shave ~30-50ms off each call. TTL is short so a deleted user
// can't keep asking indefinitely, but long enough that a 1-minute
// conversation never re-checks.
//
// Keyed by userId; value is the expiry epoch in ms. We never store the
// boolean "exists" result because we want to be conservative on
// cache hits -- we still trust the answer for the TTL window.
const userIdExistsCache = new Map<string, number>();
const USER_EXISTS_TTL_MS = 60_000;

async function cachedUserIdExists(userId: string): Promise<boolean> {
  const now = Date.now();
  const expiry = userIdExistsCache.get(userId);
  if (expiry !== undefined && expiry > now) return true;
  const real = await userIdExists(userId);
  if (real) userIdExistsCache.set(userId, now + USER_EXISTS_TTL_MS);
  return real;
}

export const askChat = createServerFn({ method: "POST" })
  .validator(inputSchema)
  .handler(async ({ data }): Promise<ChatResponse> => {
    // Confirm the userId is real before we burn a rate-limit token or call
    // Groq. userIdExists() fail-opens when Supabase isn't configured so dev
    // keeps working without a backend. Cached in-process for 60s -- see
    // `cachedUserIdExists` above.
    const realUser = await cachedUserIdExists(data.userId);
    if (!realUser) {
      throw new Error("Account not found. Please sign in again.");
    }

    // Rate limit per user, per minute. Prevents a script in the browser from
    // burning through the Groq free tier. 20 messages per minute = roughly
    // one question every 3 seconds, which lets real users chat normally.
    const rl = consume(`chat:${data.userId}`, { capacity: 20, windowMs: 60_000 });
    if (!rl.ok) {
      throw new ChatRateLimitedError(rl.retryAfterMs);
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "YOUR_GROQ_KEY") {
      throw new Error("GROQ_API_KEY is not configured. Add it to .env (server-side only).");
    }

    const chunks = data.chunks ?? [];

    // No document context. Reply directly without calling the model.
    if (chunks.length === 0) {
      const noDocFallbacks: Record<string, string> = {
        "en-US":
          "I can only answer questions about a document you've uploaded. Add one on the left and ask again.",
        "hi-IN":
          "मैं केवल आपके द्वारा अपलोड किए गए दस्तावेज़ के बारे में सवालों का जवाब दे सकता हूँ। कृपया बाईं ओर एक दस्तावेज़ जोड़ें और फिर से पूछें।",
        "bn-IN":
          "আমি শুধু আপনার আপলোড করা নথি সম্পর্কে প্রশ্নের উত্তর দিতে পারি। বাঁদিকে একটি নথি যোগ করে আবার জিজ্ঞাস করুন।",
        "ta-IN":
          "நீங்கள் பதிவேற்றிய ஆவணம் பற்றிய கேள்விகளுக்கு மட்டுமே நான் பதிலளிக்க முடியும். இடதுபக்கம் ஒரு ஆவணத்தைச் சேர்த்து மீண்டும் கேளுங்கள்.",
        "te-IN":
          "మీరు అప్‌లోడ్ చేసిన పత్రం గురించి మాత్రమే నేను ప్రశ్నలకు సమాధానం ఇవ్వగలను. ఎడమవైపు ఒక పత్రాన్ని జోడించి మళ్లీ అడగండి.",
        "es-ES":
          "Solo puedo responder preguntas sobre un documento que hayas subido. Añade uno a la izquierda y vuelve a preguntar.",
        "fr-FR":
          "Je ne peux répondre qu'à des questions sur un document que vous avez importé. Ajoutez-en un à gauche et réessayez.",
        "de-DE":
          "Ich kann nur Fragen zu einem hochgeladenen Dokument beantworten. Fügen Sie links eines hinzu und fragen Sie erneut.",
        "pt-BR":
          "Só consigo responder perguntas sobre um documento que você enviou. Adicione um à esquerda e pergunte novamente.",
      };
      const fallback =
        data.mode === "voice"
          ? "Please upload a document first, then ask again."
          : (noDocFallbacks[data.forceLang ?? ""] ?? noDocFallbacks["en-US"]!);
      return { answer: fallback, usedChunks: 0 };
    }

    const isVoice = data.mode === "voice";
    const topChunks = pickTopChunks(data.question, chunks, 3);
    // Truncate the joined context so a single oversized chunk can't blow past
    // Groq's per-request body cap on its own. We keep the head of each chunk
    // (most relevant content sits at the start in extracted PDFs), and shave
    // tail chunks down further until the join fits. The model still sees the
    // top scoring snippets -- we just guarantee the request stays under the
    // ceiling even when `chunks` arrived near its own Zod limit.
    const PER_CHUNK_CAP = 800;
    const truncated = topChunks.map((c) =>
      c.length > PER_CHUNK_CAP ? c.slice(0, PER_CHUNK_CAP) + "..." : c,
    );
    let context = truncated.map((c, i) => `[${i + 1}] ${c}`).join("\n\n");
    if (context.length > MAX_CONTEXT_CHARS) {
      // Drop tail chunks first (lowest-score ones are last because
      // `pickTopChunks` returns scored-desc); keep at least the first one
      // so the model always sees something on-topic.
      const parts = truncated.map((c, i) => `[${i + 1}] ${c}`);
      while (parts.length > 1 && parts.join("\n\n").length > MAX_CONTEXT_CHARS) {
        parts.pop();
      }
      context = parts.join("\n\n");
      if (context.length > MAX_CONTEXT_CHARS) {
        context = context.slice(0, MAX_CONTEXT_CHARS);
      }
    }

    const replyLang = data.forceLang ?? detectLangFromText(context) ?? "en-US";

    // Compact system prompt. Every token here is sent on every call, so we
    // strip every piece of prose that doesn't change the model's behaviour.
    // The previous ~480-token prompt is now ~190.
    const systemPrompt =
      `You are Talk with Document inside Telux. Answer ONLY from snippets inside ` +
      `<document>...</document>. ` +
      `If the answer isn't in the document, reply exactly: "I can't find that in the document. Try rephrasing or uploading the relevant section." ` +
      `If the question is unrelated to the document, reply exactly: "I can only answer questions about the document you uploaded." ` +
      `Reply language: ${replyLang}. Reply in this language for the whole answer, including any quoted document text and any fallback phrase above. ` +
      `Style: plain prose, no markdown, no lists, no bullet points, no headings, no bold, no citations, no URLs. ` +
      `Never start with filler ("Sure!", "Here's", "Certainly", "Of course", "Absolutely"). Start directly with the answer. ` +
      `Never reference "chunks", "sections", "snippets", "the document", or any internal scaffolding. ` +
      (isVoice
        ? `Spoken reply: 1-2 short sentences, under 40 words. Spoken style, not formal written.`
        : `Written reply: keep it under 80 words unless the user asks for detail. Complete sentences.`);

    // Trim history to the most recent 4 turns before forwarding. Zod accepts
    // up to 12 (so the client's 8-turn slice never trips a "too_big" error),
    // but each extra turn costs ~80-150 input tokens against the per-minute
    // TPM budget on the Groq free tier. 4 turns keeps the conversation
    // coherent without burning the meter.
    const FORWARD_TURNS = 4;
    const trimmedHistory = (data.history ?? []).slice(-FORWARD_TURNS);

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
      {
        role: "user",
        content: `<document>\n${context}\n</document>\n\nQuestion: ${data.question}`,
      },
    ];

    // Model selection -- prefer the `GROQ_MODEL` env var so the operator can
    // swap to whatever model their plan supports. Default to
    // `openai/gpt-oss-20b` because it is one of Groq's stable Production
    // tier models on the free plan, answers RAG-style questions well across
    // the 22 Eighth Schedule languages, and has a generous per-minute quota
    // compared to `groq/compound`'s volatile routing. Earlier defaults
    // (`groq/compound`, `llama-3.3-70b-versatile`) were either rate-limited
    // mid-session on the free tier or rolled off Groq's catalogue.
    const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-20b";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.1,
        // Cap the reply so even a verbose answer can't single-handedly blow
        // past the free-tier TPM ceiling. ~600 tokens is roughly 450 words
        // -- well beyond our 80-word written-reply budget.
        max_tokens: isVoice ? 180 : 600,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      // 429 -- Groq free-tier token-per-minute cap. Surface a clear "wait
      // and retry" hint rather than a generic 500, and pass through the
      // server's `Retry-After` header when present so the chat panel can
      // show the user the actual wait time.
      if (response.status === 429) {
        const retryAfterRaw = response.headers.get("retry-after");
        const parsed = retryAfterRaw ? Number.parseFloat(retryAfterRaw) : Number.NaN;
        const waitHint =
          Number.isFinite(parsed) && parsed > 0
            ? ` Try again in about ${Math.ceil(parsed)}s.`
            : " Try again in a moment.";
        throw new Error(
          `The chat is busy right now (rate limit reached on the model).${waitHint}`,
        );
      }
      // 413 -- combined prompt + history + tool definitions exceed the
      // model's per-request body cap. With the input caps above this
      // should be unreachable, but if a future change widens either,
      // surface the actual cause instead of a generic "service down".
      if (response.status === 413) {
        throw new Error(
          "The document is too large to send in one request. Try splitting it or asking a shorter question.",
        );
      }
      throw new Error(`Groq request failed (${response.status}). ${detail.slice(0, 200)}`);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawAnswer = payload.choices?.[0]?.message?.content?.trim() ?? "";
    // Empty or near-empty answer -- Groq sometimes returns "" or a single
    // punctuation character when the prompt is ambiguous. Treat anything
    // under 5 visible characters as "no real answer" and surface a soft
    // fallback instead of "OK" or "." which look like a bug to the user.
    if (rawAnswer.length < 5) {
      return {
        answer: "I couldn't generate an answer. Try rephrasing your question or upload a clearer section.",
        usedChunks: topChunks.length,
      };
    }
    const answer = cleanAnswer(rawAnswer);
    return { answer, usedChunks: topChunks.length };
  });

function cleanAnswer(raw: string): string {
  let s = raw;
  s = s.replace(/```[\s\S]*?```/g, (m) => m.replace(/```[a-z]*\n?|```/gi, "").trim());
  s = s.replace(/`+/g, "");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/__([^_]+)__/g, "$1");
  s = s.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1");
  s = s.replace(/\[\d+\]/g, "");
  s = s.replace(
    /\b(according to (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi,
    "",
  );
  s = s.replace(
    /\b(based on (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi,
    "",
  );
  s = s.replace(
    /\b(in (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi,
    "",
  );
  s = s.replace(/\bas mentioned (in|above)\b/gi, "");
  s = s.replace(
    /^\s*(Sure[!.,]?\s*|Here('?|’s)\s+|^Certainly[!,.]?\s*|^Of course[!,.]?\s*|^Absolutely[!,.]?\s*)\s*/i,
    "",
  );
  s = s.replace(/^\s*[-*•]\s+/gm, "");
  s = s.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  s = s.replace(/\n{3,}/g, "\n\n").trim();
  return s;
}
