import { i as __toESM } from "../_runtime.mjs";
import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { i as createSsrRpc } from "./router-DnY1Bs6l.mjs";
import { C as Languages } from "../_libs/lucide-react.mjs";
import { d as qualityForLang, m as useVoices, n as SUPPORTED_LANGS, u as pickVoiceForLang } from "./useDocuments-WMWqtLPa.mjs";
import { i as synthesizeSpeech, n as ElevenLabsRateLimitedError, r as ElevenLabsUpstreamError, t as ElevenLabsNotConfiguredError } from "./tts-DTe6fUmD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scoring-BlzkiuxQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY;
Number.POSITIVE_INFINITY;
var STORAGE_KEY = "telux:usage:v1";
function currentMonthKey(now = /* @__PURE__ */ new Date()) {
	return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}
function readUsage() {
	if (typeof window === "undefined") return {
		plan: "starter",
		questionsThisMonth: 0,
		monthKey: currentMonthKey()
	};
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return {
			plan: "starter",
			questionsThisMonth: 0,
			monthKey: currentMonthKey()
		};
		const parsed = JSON.parse(raw);
		return {
			plan: parsed.plan === "personal" || parsed.plan === "pro" ? parsed.plan : "starter",
			monthKey: typeof parsed.monthKey === "string" ? parsed.monthKey : currentMonthKey(),
			questionsThisMonth: typeof parsed.questionsThisMonth === "number" ? parsed.questionsThisMonth : 0
		};
	} catch {
		return {
			plan: "starter",
			questionsThisMonth: 0,
			monthKey: currentMonthKey()
		};
	}
}
function writeUsage(u) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
	} catch {}
}
function getUsage() {
	const u = readUsage();
	const month = currentMonthKey();
	if (u.monthKey !== month) {
		const reset = {
			...u,
			questionsThisMonth: 0,
			monthKey: month
		};
		writeUsage(reset);
		return {
			plan: reset.plan,
			questionsThisMonth: 0,
			monthKey: month
		};
	}
	return {
		plan: u.plan,
		questionsThisMonth: u.questionsThisMonth,
		monthKey: u.monthKey
	};
}
function recordQuestion() {
	const u = readUsage();
	const month = currentMonthKey();
	writeUsage({
		...u,
		monthKey: month,
		questionsThisMonth: u.monthKey === month ? u.questionsThisMonth + 1 : 1
	});
	if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("telux:usage-changed"));
}
var SERVER_SNAPSHOT = {
	plan: "pro",
	questionsThisMonth: 0,
	monthKey: "1970-01",
	effectivePlan: "pro",
	trialUntil: null,
	trialDaysRemaining: 0,
	isOnTrial: false,
	billingCycle: null
};
var lastComposite = SERVER_SNAPSHOT;
var compositeListeners = /* @__PURE__ */ new Set();
function recomputeIfChanged() {
	const usage = getUsage();
	const next = {
		...SERVER_SNAPSHOT,
		plan: usage.plan,
		questionsThisMonth: usage.questionsThisMonth,
		monthKey: usage.monthKey
	};
	if (lastComposite.plan !== next.plan || lastComposite.questionsThisMonth !== next.questionsThisMonth || lastComposite.monthKey !== next.monthKey) {
		lastComposite = next;
		for (const l of compositeListeners) l();
	}
}
function subscribe(callback) {
	recomputeIfChanged();
	compositeListeners.add(callback);
	if (typeof window !== "undefined") window.addEventListener("telux:usage-changed", recomputeIfChanged);
	return () => {
		compositeListeners.delete(callback);
		if (typeof window !== "undefined") window.removeEventListener("telux:usage-changed", recomputeIfChanged);
	};
}
function getSnapshot() {
	return lastComposite;
}
function getServerSnapshot() {
	return SERVER_SNAPSHOT;
}
function useUsage() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
var QUALITY_DOT = {
	strong: "bg-emerald-500",
	partial: "bg-amber-500",
	limited: "bg-rose-500"
};
var QUALITY_TOOLTIP = {
	strong: "Full voice support — sounds natural in this language.",
	partial: "May fall back to a generic voice — read-aloud still works.",
	limited: "Limited voice support — best-effort, may sound unclear."
};
var TOP_INDIC_CODES = [
	"hi-IN",
	"bn-IN",
	"te-IN",
	"ta-IN",
	"mr-IN",
	"gu-IN",
	"kn-IN",
	"ml-IN"
];
function partitionLangs() {
	const byCode = new Map(SUPPORTED_LANGS.map((l) => [l.code, l]));
	const topIndic = [];
	for (const code of TOP_INDIC_CODES) {
		const l = byCode.get(code);
		if (l) topIndic.push(l);
	}
	const usedTopIndic = new Set(topIndic.map((l) => l.code));
	const english = [];
	const moreIndic = [];
	const other = [];
	for (const l of SUPPORTED_LANGS) if (l.code === "en-US") english.push(l);
	else if (INDIC_CODES.has(l.code)) {
		if (!usedTopIndic.has(l.code)) moreIndic.push(l);
	} else other.push(l);
	return [
		{
			title: `Major Indian (${topIndic.length})`,
			items: topIndic
		},
		{
			title: "English",
			items: english
		},
		{
			title: `More Indian (${moreIndic.length})`,
			items: moreIndic
		},
		{
			title: "Other",
			items: other
		}
	];
}
var INDIC_CODES = /* @__PURE__ */ new Set([
	"as-IN",
	"bn-IN",
	"brx-IN",
	"doi-IN",
	"gu-IN",
	"hi-IN",
	"kn-IN",
	"ks-IN",
	"kok-IN",
	"mai-IN",
	"ml-IN",
	"mni-IN",
	"mr-IN",
	"ne-IN",
	"or-IN",
	"pa-IN",
	"sa-IN",
	"sat-IN",
	"sd-IN",
	"ta-IN",
	"te-IN",
	"ur-IN"
]);
function LanguagePicker() {
	const { lang, setLang } = useVoices();
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (!ref.current?.contains(e.target)) setOpen(false);
		};
		window.addEventListener("mousedown", onDown);
		return () => window.removeEventListener("mousedown", onDown);
	}, [open]);
	const current = SUPPORTED_LANGS.find((o) => o.code === lang) ?? SUPPORTED_LANGS[0];
	const sections = (0, import_react.useMemo)(() => partitionLangs(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			"aria-haspopup": "listbox",
			"aria-expanded": open,
			"aria-label": "Choose language",
			className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-3.5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: current?.label ?? "English"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sm:hidden",
					children: current?.native ?? "EN"
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			role: "listbox",
			"aria-label": "Language",
			className: "absolute right-0 top-full z-30 mt-1 max-h-80 min-w-[220px] overflow-y-auto overflow-x-hidden rounded-xl border border-border bg-surface shadow-2xl",
			children: sections.map((section, sIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				role: "presentation",
				children: [sIdx > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-surface-2/60 px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: section.title
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-surface-2/60 px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: section.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					role: "group",
					children: section.items.map((o) => {
						const q = qualityForLang(o.code);
						const tip = QUALITY_TOOLTIP[q];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							role: "option",
							"aria-selected": lang === o.code,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setLang(o.code);
									setOpen(false);
								},
								title: tip,
								className: "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors " + (lang === o.code ? "bg-signal/15 font-semibold text-signal" : "text-foreground hover:bg-surface-2"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: o.native
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-1.5 shrink-0 rounded-full " + QUALITY_DOT[q],
									"aria-hidden": true
								})]
							})
						}, o.code);
					})
				})]
			}, section.title))
		}) : null]
	});
}
/**
* Speak `text` using the configured provider. Returns when audio finishes
* (or fails). Never throws — TTS is best-effort.
*/
async function speak(text, opts) {
	const id = opts.id ?? "tts";
	if (opts.provider === "elevenlabs" && opts.elevenlabsAvailable && opts.userId) try {
		const { audioBase64 } = await synthesizeSpeech({ data: {
			userId: opts.userId,
			text,
			lang: opts.lang
		} });
		await playBase64Audio(audioBase64, {
			onStart: opts.onStart,
			onEnd: opts.onEnd,
			id
		});
		return { audioBase64 };
	} catch (err) {
		if (err instanceof ElevenLabsNotConfiguredError || err instanceof ElevenLabsRateLimitedError || err instanceof ElevenLabsUpstreamError) console.warn(`[tts] ElevenLabs failed (${err.code}); falling back to browser SpeechSynthesis.`);
		else console.warn("[tts] ElevenLabs failed with unexpected error:", err);
	}
	await speakBrowser(text, opts.lang, opts.gender, {
		onStart: opts.onStart,
		onEnd: opts.onEnd,
		id
	});
	return { audioBase64: null };
}
function speakBrowser(text, lang, gender, cb) {
	const { id, onStart, onEnd } = cb;
	return new Promise((resolve) => {
		if (typeof window === "undefined" || !window.speechSynthesis) {
			onEnd?.(id);
			resolve();
			return;
		}
		const synth = window.speechSynthesis;
		try {
			synth.cancel();
		} catch {}
		const utter = new SpeechSynthesisUtterance(text);
		utter.lang = lang;
		const voice = pickVoiceForLang(synth.getVoices(), lang, gender);
		if (voice) utter.voice = voice;
		utter.rate = 1;
		utter.pitch = 1;
		utter.onstart = () => onStart?.(id);
		utter.onend = () => {
			onEnd?.(id);
			resolve();
		};
		utter.onerror = () => {
			onEnd?.(id);
			resolve();
		};
		synth.speak(utter);
	});
}
/**
* Play a base64-encoded MP3 via an HTMLAudioElement. Decoded to a data URL
* once; the browser streams the bytes from there. We resolve on `ended`,
* reject on `error` so the caller's fallback chain can take over.
*
* Why a data URL and not a Blob: the bytes are already in memory (the
* serverFn returned base64) and a Blob would force an extra decode.
* Larger payloads would benefit from streaming, but answers are < 5 KB of
* audio so the data URL is fine.
*/
function playBase64Audio(audioBase64, cb) {
	const { id, onStart, onEnd } = cb;
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") {
			resolve();
			return;
		}
		const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
		let cleanedUp = false;
		const done = () => {
			if (cleanedUp) return;
			cleanedUp = true;
			onEnd?.(id);
			resolve();
		};
		audio.onended = done;
		audio.onerror = () => {
			if (cleanedUp) return;
			cleanedUp = true;
			onEnd?.(id);
			reject(/* @__PURE__ */ new Error("Audio playback failed."));
		};
		audio.onplay = () => onStart?.(id);
		audio.play().catch((err) => {
			if (cleanedUp) return;
			cleanedUp = true;
			onEnd?.(id);
			reject(err);
		});
	});
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
var askChat = createServerFn({ method: "POST" }).validator(inputSchema).handler(createSsrRpc("7a56d9cdd274db35c8317b54a0faf0e4c7f48352435140548acfeab8a91b41d6"));
var STOPWORDS = /* @__PURE__ */ new Set([
	"a",
	"an",
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
function scoreChunks(question, chunks, topK = 3) {
	if (chunks.length === 0) return [];
	const qTokens = new Set(tokenize(question));
	if (qTokens.size === 0) return chunks.slice(0, topK).map((text, i) => ({
		index: i,
		score: 0,
		text
	}));
	const scored = chunks.map((text, index) => {
		const tokens = tokenize(text);
		if (tokens.length === 0) return {
			index,
			score: 0,
			text
		};
		const tf = /* @__PURE__ */ new Map();
		for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
		let overlap = 0;
		for (const q of qTokens) overlap += tf.get(q) ?? 0;
		return {
			index,
			score: overlap / Math.sqrt(tokens.length),
			text
		};
	});
	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, topK);
}
//#endregion
export { scoreChunks as a, recordQuestion as i, LanguagePicker as n, speak as o, askChat as r, useUsage as s, ChatRateLimitedError as t };
