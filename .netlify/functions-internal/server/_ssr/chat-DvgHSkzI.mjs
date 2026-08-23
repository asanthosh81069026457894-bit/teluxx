import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { a as userIdExists, t as createServerRpc } from "./supabaseServer-Ccd90Lx7.mjs";
import { n as consume } from "./rate-limit-CZrX3sfM.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { n as detectLangFromText } from "./detect-lang-BUkpTlmE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-DvgHSkzI.js
var STOPWORDS = /* @__PURE__ */ new Set([
	"a",
	"an",
	"am",
	"and",
	"are",
	"as",
	"at",
	"be",
	"but",
	"by",
	"do",
	"for",
	"from",
	"has",
	"have",
	"he",
	"her",
	"his",
	"i",
	"if",
	"in",
	"into",
	"is",
	"it",
	"its",
	"me",
	"my",
	"no",
	"not",
	"of",
	"on",
	"or",
	"our",
	"she",
	"so",
	"than",
	"that",
	"the",
	"their",
	"them",
	"they",
	"this",
	"to",
	"us",
	"was",
	"we",
	"were",
	"what",
	"when",
	"where",
	"which",
	"who",
	"why",
	"will",
	"with",
	"you",
	"your",
	"yours",
	"about",
	"any",
	"all",
	"can",
	"could",
	"would",
	"should",
	"may",
	"might",
	"do",
	"does",
	"did",
	"been",
	"being"
]);
function tokenize(text) {
	return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}
/**
* Rank `chunks` by relevance to `question` and return the top `topK`.
* When the question has no useful tokens (pure stopwords), the first
* `topK` chunks are returned in their input order — this matches the
* previous behaviour and avoids returning an empty array.
*/
function pickTopChunks(question, chunks, topK = 3) {
	const qTokens = new Set(tokenize(question));
	if (qTokens.size === 0) return chunks.slice(0, topK);
	const scored = chunks.map((text) => {
		const tokens = tokenize(text);
		if (tokens.length === 0) return {
			text,
			score: 0
		};
		const tf = /* @__PURE__ */ new Map();
		for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
		let overlap = 0;
		for (const q of qTokens) overlap += tf.get(q) ?? 0;
		return {
			text,
			score: overlap / Math.sqrt(tokens.length)
		};
	});
	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, topK).map((s) => s.text);
}
var ChatRateLimitedError = class extends Error {
	code = "CHAT_RATE_LIMITED";
	retryAfterMs;
	constructor(retryAfterMs) {
		super("You're sending messages too quickly. Please wait a moment and try again.");
		this.name = "ChatRateLimitedError";
		this.retryAfterMs = retryAfterMs;
	}
};
var MAX_CONTEXT_CHARS = 2800;
var inputSchema = objectType({
	userId: stringType().uuid(),
	question: stringType().min(1).max(2e3),
	chunks: arrayType(stringType().min(1).max(1200)).max(4).optional(),
	history: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(2e3)
	})).max(12).optional(),
	mode: enumType(["text", "voice"]).default("text"),
	forceLang: stringType().min(2).max(20).optional(),
	voiceToken: stringType().optional()
});
var userIdExistsCache = /* @__PURE__ */ new Map();
var USER_EXISTS_TTL_MS = 6e4;
async function cachedUserIdExists(userId) {
	const now = Date.now();
	const expiry = userIdExistsCache.get(userId);
	if (expiry !== void 0 && expiry > now) return true;
	const real = await userIdExists(userId);
	if (real) userIdExistsCache.set(userId, now + USER_EXISTS_TTL_MS);
	return real;
}
var askChat_createServerFn_handler = createServerRpc({
	id: "7a56d9cdd274db35c8317b54a0faf0e4c7f48352435140548acfeab8a91b41d6",
	name: "askChat",
	filename: "src/lib/chat.ts"
}, (opts) => askChat.__executeServer(opts));
var askChat = createServerFn({ method: "POST" }).validator(inputSchema).handler(askChat_createServerFn_handler, async ({ data }) => {
	if (!await cachedUserIdExists(data.userId)) throw new Error("Account not found. Please sign in again.");
	const rl = consume(`chat:${data.userId}`, {
		capacity: 20,
		windowMs: 6e4
	});
	if (!rl.ok) throw new ChatRateLimitedError(rl.retryAfterMs);
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey || apiKey === "YOUR_GROQ_KEY") throw new Error("GROQ_API_KEY is not configured. Add it to .env (server-side only).");
	const chunks = data.chunks ?? [];
	if (chunks.length === 0) {
		const noDocFallbacks = {
			"en-US": "I can only answer questions about a document you've uploaded. Add one on the left and ask again.",
			"hi-IN": "मैं केवल आपके द्वारा अपलोड किए गए दस्तावेज़ के बारे में सवालों का जवाब दे सकता हूँ। कृपया बाईं ओर एक दस्तावेज़ जोड़ें और फिर से पूछें।",
			"bn-IN": "আমি শুধু আপনার আপলোড করা নথি সম্পর্কে প্রশ্নের উত্তর দিতে পারি। বাঁদিকে একটি নথি যোগ করে আবার জিজ্ঞাস করুন।",
			"ta-IN": "நீங்கள் பதிவேற்றிய ஆவணம் பற்றிய கேள்விகளுக்கு மட்டுமே நான் பதிலளிக்க முடியும். இடதுபக்கம் ஒரு ஆவணத்தைச் சேர்த்து மீண்டும் கேளுங்கள்.",
			"te-IN": "మీరు అప్‌లోడ్ చేసిన పత్రం గురించి మాత్రమే నేను ప్రశ్నలకు సమాధానం ఇవ్వగలను. ఎడమవైపు ఒక పత్రాన్ని జోడించి మళ్లీ అడగండి.",
			"es-ES": "Solo puedo responder preguntas sobre un documento que hayas subido. Añade uno a la izquierda y vuelve a preguntar.",
			"fr-FR": "Je ne peux répondre qu'à des questions sur un document que vous avez importé. Ajoutez-en un à gauche et réessayez.",
			"de-DE": "Ich kann nur Fragen zu einem hochgeladenen Dokument beantworten. Fügen Sie links eines hinzu und fragen Sie erneut.",
			"pt-BR": "Só consigo responder perguntas sobre um documento que você enviou. Adicione um à esquerda e pergunte novamente."
		};
		return {
			answer: data.mode === "voice" ? "Please upload a document first, then ask again." : noDocFallbacks[data.forceLang ?? ""] ?? noDocFallbacks["en-US"],
			usedChunks: 0
		};
	}
	const isVoice = data.mode === "voice";
	const topChunks = pickTopChunks(data.question, chunks, 3);
	const PER_CHUNK_CAP = 800;
	const truncated = topChunks.map((c) => c.length > PER_CHUNK_CAP ? c.slice(0, PER_CHUNK_CAP) + "..." : c);
	let context = truncated.map((c, i) => `[${i + 1}] ${c}`).join("\n\n");
	if (context.length > MAX_CONTEXT_CHARS) {
		const parts = truncated.map((c, i) => `[${i + 1}] ${c}`);
		while (parts.length > 1 && parts.join("\n\n").length > MAX_CONTEXT_CHARS) parts.pop();
		context = parts.join("\n\n");
		if (context.length > MAX_CONTEXT_CHARS) context = context.slice(0, MAX_CONTEXT_CHARS);
	}
	const systemPrompt = `You are Talk with Document inside Telux. Answer ONLY from snippets inside <document>...</document>. If the answer isn't in the document, reply exactly: "I can't find that in the document. Try rephrasing or uploading the relevant section." If the question is unrelated to the document, reply exactly: "I can only answer questions about the document you uploaded." Reply language: ${data.forceLang ?? detectLangFromText(context) ?? "en-US"}. Reply in this language for the whole answer, including any quoted document text and any fallback phrase above. Style: plain prose, no markdown, no lists, no bullet points, no headings, no bold, no citations, no URLs. Never start with filler ("Sure!", "Here's", "Certainly", "Of course", "Absolutely"). Start directly with the answer. Never reference "chunks", "sections", "snippets", "the document", or any internal scaffolding. ` + (isVoice ? `Spoken reply: 1-2 short sentences, under 40 words. Spoken style, not formal written.` : `Written reply: keep it under 80 words unless the user asks for detail. Complete sentences.`);
	const trimmedHistory = (data.history ?? []).slice(-4);
	const messages = [
		{
			role: "system",
			content: systemPrompt
		},
		...trimmedHistory.map((m) => ({
			role: m.role,
			content: m.content
		})),
		{
			role: "user",
			content: `<document>\n${context}\n</document>\n\nQuestion: ${data.question}`
		}
	];
	const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-20b";
	const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model,
			messages,
			temperature: .1,
			max_tokens: isVoice ? 180 : 600
		})
	});
	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		if (response.status === 429) {
			const retryAfterRaw = response.headers.get("retry-after");
			const parsed = retryAfterRaw ? Number.parseFloat(retryAfterRaw) : NaN;
			const waitHint = Number.isFinite(parsed) && parsed > 0 ? ` Try again in about ${Math.ceil(parsed)}s.` : " Try again in a moment.";
			throw new Error(`The chat is busy right now (rate limit reached on the model).${waitHint}`);
		}
		if (response.status === 413) throw new Error("The document is too large to send in one request. Try splitting it or asking a shorter question.");
		throw new Error(`Groq request failed (${response.status}). ${detail.slice(0, 200)}`);
	}
	const rawAnswer = (await response.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (rawAnswer.length < 5) return {
		answer: "I couldn't generate an answer. Try rephrasing your question or upload a clearer section.",
		usedChunks: topChunks.length
	};
	return {
		answer: cleanAnswer(rawAnswer),
		usedChunks: topChunks.length
	};
});
function cleanAnswer(raw) {
	let s = raw;
	s = s.replace(/```[\s\S]*?```/g, (m) => m.replace(/```[a-z]*\n?|```/gi, "").trim());
	s = s.replace(/`+/g, "");
	s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
	s = s.replace(/__([^_]+)__/g, "$1");
	s = s.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1");
	s = s.replace(/\[\d+\]/g, "");
	s = s.replace(/\b(according to (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi, "");
	s = s.replace(/\b(based on (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi, "");
	s = s.replace(/\b(in (the|your)?\s*(document|text|passage|file|excerpt|snippet|chunk|section)s?)\b/gi, "");
	s = s.replace(/\bas mentioned (in|above)\b/gi, "");
	s = s.replace(/^\s*(Sure[!.,]?\s*|Here('?|’s)\s+|^Certainly[!,.]?\s*|^Of course[!,.]?\s*|^Absolutely[!,.]?\s*)\s*/i, "");
	s = s.replace(/^\s*[-*•]\s+/gm, "");
	s = s.replace(/^\s{0,3}#{1,6}\s+/gm, "");
	s = s.replace(/\n{3,}/g, "\n\n").trim();
	return s;
}
//#endregion
export { askChat_createServerFn_handler };
