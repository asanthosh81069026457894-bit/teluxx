import { i as __toESM } from "../_runtime.mjs";
import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { i as createSsrRpc, n as consumePendingSession, r as useAuth } from "./router-DnY1Bs6l.mjs";
import { S as LoaderCircle, c as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDocuments-WMWqtLPa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var answersSchema = objectType({
	userId: stringType().uuid(),
	fullName: stringType().trim().min(1, "Please enter your name").max(120),
	replyLang: stringType().min(2).max(20).default("en-US")
});
var getOnboardingStatus = createServerFn({ method: "POST" }).validator(objectType({ userId: stringType().uuid() })).handler(createSsrRpc("a0562426ee8b25990e7a0ccc241b6598eb75ad6107b665d19432ba4bc6a8337e"));
var submitOnboarding = createServerFn({ method: "POST" }).validator(answersSchema).handler(createSsrRpc("0fd579966613ec2798851249efcce670896412c89269deb12f2caba9006062ec"));
var listeners = /* @__PURE__ */ new Set();
function emit() {
	for (const l of listeners) l();
}
/** Fire the cross-component change event after a serverFn mutation. */
function emitSubscriptionChange() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent("telux:subscription-changed"));
	emit();
}
var SUPPORTED_LANGS = [
	{
		code: "en-US",
		label: "English",
		native: "English",
		quality: "strong"
	},
	{
		code: "as-IN",
		label: "Assamese",
		native: "অসমীয়া",
		quality: "partial"
	},
	{
		code: "bn-IN",
		label: "Bengali",
		native: "বাংলা",
		quality: "strong"
	},
	{
		code: "brx-IN",
		label: "Bodo",
		native: "बड़ो",
		quality: "limited"
	},
	{
		code: "doi-IN",
		label: "Dogri",
		native: "डोगरी",
		quality: "limited"
	},
	{
		code: "gu-IN",
		label: "Gujarati",
		native: "ગુજરાતી",
		quality: "strong"
	},
	{
		code: "hi-IN",
		label: "Hindi",
		native: "हिन्दी",
		quality: "strong"
	},
	{
		code: "kn-IN",
		label: "Kannada",
		native: "ಕನ್ನಡ",
		quality: "strong"
	},
	{
		code: "ks-IN",
		label: "Kashmiri",
		native: "کأشُر",
		quality: "partial"
	},
	{
		code: "kok-IN",
		label: "Konkani",
		native: "कोंकणी",
		quality: "partial"
	},
	{
		code: "mai-IN",
		label: "Maithili",
		native: "मैथिली",
		quality: "partial"
	},
	{
		code: "ml-IN",
		label: "Malayalam",
		native: "മലയാളം",
		quality: "strong"
	},
	{
		code: "mni-IN",
		label: "Manipuri (Meitei)",
		native: "মৈতৈলোন্",
		quality: "limited"
	},
	{
		code: "mr-IN",
		label: "Marathi",
		native: "मराठी",
		quality: "strong"
	},
	{
		code: "ne-IN",
		label: "Nepali",
		native: "नेपाली",
		quality: "partial"
	},
	{
		code: "or-IN",
		label: "Odia",
		native: "ଓଡ଼ିଆ",
		quality: "partial"
	},
	{
		code: "pa-IN",
		label: "Punjabi",
		native: "ਪੰਜਾਬੀ",
		quality: "strong"
	},
	{
		code: "sa-IN",
		label: "Sanskrit",
		native: "संस्कृतम्",
		quality: "partial"
	},
	{
		code: "sat-IN",
		label: "Santali",
		native: "ᱥᱟᱱᱛᱟᱲᱤ",
		quality: "limited"
	},
	{
		code: "sd-IN",
		label: "Sindhi",
		native: "سنڌي",
		quality: "partial"
	},
	{
		code: "ta-IN",
		label: "Tamil",
		native: "தமிழ்",
		quality: "strong"
	},
	{
		code: "te-IN",
		label: "Telugu",
		native: "తెలుగు",
		quality: "strong"
	},
	{
		code: "ur-IN",
		label: "Urdu",
		native: "اردو",
		quality: "partial"
	},
	{
		code: "es-ES",
		label: "Spanish",
		native: "Español",
		quality: "strong"
	},
	{
		code: "fr-FR",
		label: "French",
		native: "Français",
		quality: "strong"
	},
	{
		code: "de-DE",
		label: "German",
		native: "Deutsch",
		quality: "strong"
	},
	{
		code: "pt-BR",
		label: "Portuguese",
		native: "Português",
		quality: "strong"
	},
	{
		code: "ar-SA",
		label: "Arabic",
		native: "العربية",
		quality: "strong"
	},
	{
		code: "ru-RU",
		label: "Russian",
		native: "Русский",
		quality: "partial"
	},
	{
		code: "zh-CN",
		label: "Chinese (Simplified)",
		native: "中文",
		quality: "partial"
	},
	{
		code: "ja-JP",
		label: "Japanese",
		native: "日本語",
		quality: "strong"
	},
	{
		code: "ko-KR",
		label: "Korean",
		native: "한국어",
		quality: "partial"
	}
];
var DEFAULT_LANG = "en-US";
/** Look up a supported language entry by code; falls back to en-US. */
function getSupportedLang(code) {
	return SUPPORTED_LANGS.find((l) => l.code === code) ?? SUPPORTED_LANGS[0];
}
/** Native-script label for a code; never throws. */
function nativeForLang(code) {
	return getSupportedLang(code).native;
}
/** Quality hint for the UI tooltip. */
function qualityForLang(code) {
	return getSupportedLang(code).quality;
}
var GENDER_STORAGE_KEY = "telux:voice-gender";
var LANG_STORAGE_KEY = "telux:voice-lang";
var TTS_PROVIDER_STORAGE_KEY = "telux:tts-provider";
function isSpeechSynthesisAvailable() {
	return typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined";
}
var FEMALE_HINTS = [
	"female",
	"woman",
	"girl",
	"karen",
	"samantha",
	"victoria",
	"allison",
	"ava",
	"fiona",
	"moira",
	"tessa",
	"veena",
	"fema",
	"milena",
	"yuri",
	"zira",
	"susan",
	"kathy",
	"paulina",
	"monica",
	"amelie",
	"anna",
	"sara",
	"maria",
	"jenny"
];
var MALE_HINTS = [
	"male",
	"man",
	"guy",
	"daniel",
	"alex",
	"fred",
	"tom",
	"aaron",
	"rishi",
	"prabhat",
	"david",
	"oliver",
	"lee",
	"giorgio",
	"luca",
	"diego",
	"jorge",
	"thomas",
	"ricardo"
];
function hintForVoiceName(name) {
	const n = name.toLowerCase();
	if (FEMALE_HINTS.some((h) => n.includes(h))) return "female";
	if (MALE_HINTS.some((h) => n.includes(h))) return "male";
	return "auto";
}
function mapVoices(voices) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const v of voices) {
		const key = `${v.lang}::${v.name}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push({
			lang: v.lang,
			prefix: v.lang.split("-")[0] ?? v.lang,
			label: `${v.name} (${v.lang})`,
			gender: hintForVoiceName(v.name),
			voice: v
		});
	}
	out.sort((a, b) => {
		if (a.prefix === "en" && b.prefix !== "en") return -1;
		if (b.prefix === "en" && a.prefix !== "en") return 1;
		return a.lang.localeCompare(b.lang);
	});
	return out;
}
function useVoices() {
	const [voices, setVoices] = (0, import_react.useState)([]);
	const [gender, setGenderState] = (0, import_react.useState)("auto");
	const [lang, setLangState] = (0, import_react.useState)(DEFAULT_LANG);
	const [ttsProvider, setTtsProviderState] = (0, import_react.useState)("browser");
	const [elevenlabsAvailable, setElevenlabsAvailable] = (0, import_react.useState)(false);
	const supported = isSpeechSynthesisAvailable();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			const g = window.localStorage.getItem(GENDER_STORAGE_KEY);
			if (g === "female" || g === "male" || g === "auto") setGenderState(g);
			const l = window.localStorage.getItem(LANG_STORAGE_KEY);
			if (l && SUPPORTED_LANGS.some((opt) => opt.code === l)) setLangState(l);
			const p = window.localStorage.getItem(TTS_PROVIDER_STORAGE_KEY);
			if (p === "browser" || p === "elevenlabs") setTtsProviderState(p);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const { getTtsConfig } = await import("./tts-DTe6fUmD.mjs").then((n) => n.a).then((n) => n.a);
				const cfg = await getTtsConfig({ data: {} });
				if (cancelled) return;
				setElevenlabsAvailable(cfg.elevenlabsAvailable);
				if (!cfg.elevenlabsAvailable && ttsProvider === "elevenlabs") setTtsProviderState("browser");
			} catch {
				if (!cancelled) setElevenlabsAvailable(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!supported) return;
		const synth = window.speechSynthesis;
		setVoices(mapVoices(synth.getVoices()));
		const handler = () => setVoices(mapVoices(synth.getVoices()));
		synth.addEventListener?.("voiceschanged", handler);
		return () => {
			synth.removeEventListener?.("voiceschanged", handler);
		};
	}, [supported]);
	return {
		supported,
		voices,
		gender,
		setGender: (0, import_react.useCallback)((g) => {
			setGenderState(g);
			if (typeof window !== "undefined") try {
				window.localStorage.setItem(GENDER_STORAGE_KEY, g);
			} catch {}
		}, []),
		lang,
		setLang: (0, import_react.useCallback)((next) => {
			if (!SUPPORTED_LANGS.some((opt) => opt.code === next)) return;
			setLangState(next);
			if (typeof window !== "undefined") try {
				window.localStorage.setItem(LANG_STORAGE_KEY, next);
			} catch {}
		}, []),
		ttsProvider,
		setTtsProvider: (0, import_react.useCallback)((p) => {
			if (p === "elevenlabs" && !elevenlabsAvailable) return;
			setTtsProviderState(p);
			if (typeof window !== "undefined") try {
				window.localStorage.setItem(TTS_PROVIDER_STORAGE_KEY, p);
			} catch {}
		}, [elevenlabsAvailable]),
		elevenlabsAvailable
	};
}
/**
* Pick the best voice for (lang, gender). Exported so chat-panel TTS
* (`useSpeech`) and Talk-with-Document (`useMaaraSession`) share the same
* selection logic.
*
* Falls back gracefully when the gender hint has no matches — the user
* always gets *some* voice in the requested language, never silence.
*/
function pickVoiceForLang(voices, lang, gender = "auto") {
	if (voices.length === 0) return null;
	const prefix = lang.split("-")[0];
	const matchesGender = (v) => {
		if (gender === "auto") return true;
		const hint = hintForVoiceName(v.name);
		return hint === gender || hint === "auto";
	};
	const exactGender = voices.find((v) => v.lang === lang && matchesGender(v));
	if (exactGender) return exactGender;
	const exactAny = voices.find((v) => v.lang === lang);
	if (exactAny) return exactAny;
	const fuzzyGender = voices.find((v) => (v.lang.startsWith(prefix + "-") || v.lang === prefix) && matchesGender(v));
	if (fuzzyGender) return fuzzyGender;
	const fuzzyAny = voices.find((v) => v.lang.startsWith(prefix + "-") || v.lang === prefix);
	if (fuzzyAny) return fuzzyAny;
	return voices[0] ?? null;
}
var LANGS = [
	{
		code: "en-US",
		label: "English"
	},
	{
		code: "hi-IN",
		label: "हिन्दी (Hindi)"
	},
	{
		code: "bn-IN",
		label: "বাংলা (Bengali)"
	},
	{
		code: "ta-IN",
		label: "தமிழ் (Tamil)"
	},
	{
		code: "te-IN",
		label: "తెలుగు (Telugu)"
	},
	{
		code: "es-ES",
		label: "Español (Spanish)"
	},
	{
		code: "fr-FR",
		label: "Français (French)"
	},
	{
		code: "de-DE",
		label: "Deutsch (German)"
	},
	{
		code: "pt-BR",
		label: "Português (Portuguese)"
	}
];
function OnboardingModal() {
	const { session } = useAuth();
	const userId = session?.user?.id ?? null;
	const initialName = (session?.user?.user_metadata?.full_name)?.trim() ?? "";
	const [fullName, setFullName] = (0, import_react.useState)(initialName);
	const [replyLang, setReplyLang] = (0, import_react.useState)(DEFAULT_LANG);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const nameRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		nameRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		if (initialName && !fullName) setFullName(initialName);
	}, [initialName]);
	async function onSubmit(e) {
		e.preventDefault();
		if (!userId) {
			setErrors({ submit: "Session expired — please sign in again." });
			return;
		}
		const trimmed = fullName.trim();
		if (!trimmed) {
			setErrors({ fullName: "Please enter your name." });
			return;
		}
		if (trimmed.length > 120) {
			setErrors({ fullName: "Name is too long." });
			return;
		}
		setSubmitting(true);
		setErrors({});
		try {
			try {
				window.localStorage.setItem("telux:reply-lang", replyLang);
			} catch {}
			await submitOnboarding({ data: {
				userId,
				fullName: trimmed,
				replyLang
			} });
			emitSubscriptionChange();
		} catch (err) {
			const detail = err instanceof Error ? err.message : String(err);
			console.warn("[OnboardingModal] submit failed (treating as soft):", detail);
			emitSubscriptionChange();
			if (detail.toLowerCase().includes("pgrst205") || detail.toLowerCase().includes("table")) return;
			setErrors({ submit: "Couldn't save your answers — please try again." });
			setSubmitting(false);
		}
	}
	function onKeyDownStep(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			onSubmit(e);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "onboarding-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Quick intro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "onboarding-title",
						className: "mt-2 text-2xl font-semibold",
						children: "Welcome — let's set things up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "One name and your preferred reply language. Then you're in."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "What should we call you?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: nameRef,
							type: "text",
							value: fullName,
							onChange: (e) => setFullName(e.currentTarget.value),
							onKeyDown: onKeyDownStep,
							placeholder: "Your name",
							autoComplete: "name",
							maxLength: 120,
							"aria-invalid": Boolean(errors.fullName),
							className: "mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
						})]
					}),
					errors.fullName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-red-400",
						role: "alert",
						children: errors.fullName
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Reply language"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: replyLang,
								onChange: (e) => setReplyLang(e.currentTarget.value),
								className: "mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm text-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none",
								children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: l.code,
									children: l.label
								}, l.code))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"The chat replies in ",
									nativeForLang(replyLang),
									" by default. You can change this later."
								]
							})
						]
					}),
					errors.submit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-red-400",
						role: "alert",
						children: errors.submit
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex items-center justify-end gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting || !userId,
							className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-signal-foreground transition-transform hover:scale-[1.01] disabled:opacity-70",
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), submitting ? "Setting things up…" : "Get started"]
						})
					})
				]
			})]
		})
	});
}
function readSessionFullName(session) {
	const v = (session?.user?.user_metadata)?.full_name;
	return typeof v === "string" ? v.trim() : "";
}
function AuthGate({ children }) {
	const { session, loading } = useAuth();
	const navigate = useNavigate();
	const [onboardingCompleted, setOnboardingCompleted] = (0, import_react.useState)(void 0);
	const [onboardingResolved, setOnboardingResolved] = (0, import_react.useState)(false);
	const [pendingHandshake, setPendingHandshake] = (0, import_react.useState)(() => {
		return typeof window !== "undefined" && Boolean(window.__telux_pendingSession);
	});
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (session) {
			setPendingHandshake(false);
			return;
		}
		const p = consumePendingSession();
		if (!p) return;
		setPendingHandshake(true);
		let cancelled = false;
		p.then((resolved) => {
			if (cancelled) return;
			setPendingHandshake(false);
		});
		return () => {
			cancelled = true;
		};
	}, [loading, session]);
	(0, import_react.useEffect)(() => {
		if (loading || !session?.user?.id) return;
		const userId = session.user.id;
		setOnboardingCompleted(void 0);
		setOnboardingResolved(false);
		if (readSessionFullName(session)) setOnboardingCompleted(true);
		getOnboardingStatus({ data: { userId } }).then((res) => {
			setOnboardingResolved(true);
			if (!res.completed && readSessionFullName(session)) {
				setOnboardingCompleted(true);
				return;
			}
			setOnboardingCompleted(res.completed);
		}).catch((err) => {
			console.warn("[AuthGate] onboarding status check failed:", err);
			setOnboardingCompleted(true);
			setOnboardingResolved(true);
		});
	}, [loading, session?.user?.id]);
	(0, import_react.useEffect)(() => {
		if (loading || !session?.user?.id) return;
		function onChange() {
			const userId = session?.user?.id;
			if (!userId) return;
			getOnboardingStatus({ data: { userId } }).then((res) => {
				setOnboardingResolved(true);
				if (!res.completed && readSessionFullName(session)) {
					setOnboardingCompleted(true);
					return;
				}
				setOnboardingCompleted(res.completed);
			}).catch(() => {});
		}
		window.addEventListener("telux:subscription-changed", onChange);
		return () => window.removeEventListener("telux:subscription-changed", onChange);
	}, [loading, session?.user?.id]);
	(0, import_react.useEffect)(() => {
		setOnboardingCompleted((prev) => prev === false && readSessionFullName(session) ? true : prev);
	}, [session]);
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (session) return;
		if (pendingHandshake) return;
		const t = window.setTimeout(() => {
			if (pendingHandshake) return;
			navigate({ to: "/login" });
		}, 800);
		return () => window.clearTimeout(t);
	}, [
		loading,
		session,
		pendingHandshake,
		navigate
	]);
	if (loading || pendingHandshake) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 place-items-center rounded-xl bg-signal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-signal-foreground" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground uppercase",
				children: "Loading…"
			})]
		})
	});
	if (!session) return null;
	const showOnboarding = onboardingResolved === true && onboardingCompleted === false && !readSessionFullName(session);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, showOnboarding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingModal, {}, session.user.id) : null] });
}
async function extractTextWithMeta(file) {
	const lower = file.name.toLowerCase();
	const mime = file.type.toLowerCase();
	if (mime === "application/pdf" || lower.endsWith(".pdf")) return extractPdfText(file);
	if (mime.startsWith("text/") || lower.endsWith(".txt") || lower.endsWith(".md") || lower.endsWith(".markdown") || lower.endsWith(".csv") || lower.endsWith(".json")) return {
		text: await file.text(),
		pageCount: 0
	};
	throw new Error(`Unsupported file type: ${file.type || file.name}. Only PDF, TXT, MD, CSV and JSON are supported on the Starter plan.`);
}
async function extractPdfText(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const lib = pdfjs.default ?? pdfjs;
	if (lib.GlobalWorkerOptions) lib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${lib.version}/build/pdf.worker.min.mjs`;
	const buffer = await file.arrayBuffer();
	const doc = await lib.getDocument({ data: buffer }).promise;
	const parts = [];
	for (let i = 1; i <= doc.numPages; i++) {
		const strings = (await (await doc.getPage(i)).getTextContent()).items.map((item) => item.str ?? "").filter(Boolean);
		parts.push(strings.join(" "));
	}
	return {
		text: parts.join("\n\n"),
		pageCount: doc.numPages ?? parts.length
	};
}
function chunkText(text, opts = {}) {
	const size = opts.size ?? 1e3;
	const overlap = Math.min(opts.overlap ?? 100, Math.floor(size / 4));
	const clean = text.replace(/\s+/g, " ").trim();
	if (!clean) return [];
	if (clean.length <= size) return [clean];
	const chunks = [];
	let start = 0;
	while (start < clean.length) {
		const end = Math.min(start + size, clean.length);
		chunks.push(clean.slice(start, end));
		if (end === clean.length) break;
		start = end - overlap;
	}
	return chunks;
}
var DB_NAME = "telux";
var DB_VERSION = 1;
var STORE = "documents";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
function tx(db, mode, fn) {
	return new Promise((resolve, reject) => {
		const result = fn(db.transaction(STORE, mode).objectStore(STORE));
		if (result instanceof Promise) {
			result.then(resolve, reject);
			return;
		}
		result.onsuccess = () => resolve(result.result);
		result.onerror = () => reject(result.error);
	});
}
async function loadDocuments(userId) {
	if (typeof indexedDB === "undefined") return [];
	try {
		return (await tx(await openDb(), "readonly", (store) => store.getAll())).filter((d) => !d.userId || d.userId === userId).sort((a, b) => b.addedAt - a.addedAt);
	} catch {
		return [];
	}
}
async function saveDocument(doc) {
	if (typeof indexedDB === "undefined") return;
	if (!doc.chunks || doc.chunks.length === 0) throw new Error("Document produced no readable text — it may be a scanned PDF or image-only file. Try a text-based PDF.");
	await tx(await openDb(), "readwrite", (store) => store.put(doc));
	notifyChange();
}
async function deleteDocument(id) {
	if (typeof indexedDB === "undefined") return;
	await tx(await openDb(), "readwrite", (store) => store.delete(id));
	notifyChange();
}
async function clearAllDocuments(userId) {
	if (typeof indexedDB === "undefined") return;
	const db = await openDb();
	const toDelete = (await tx(db, "readonly", (store) => store.getAll())).filter((d) => !d.userId || d.userId === userId).map((d) => d.id);
	if (toDelete.length === 0) return;
	await new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE, "readwrite");
		const store = transaction.objectStore(STORE);
		for (const id of toDelete) store.delete(id);
		transaction.oncomplete = () => resolve();
		transaction.onerror = () => reject(transaction.error);
	});
	notifyChange();
}
function allChunks(docs) {
	const out = [];
	for (const d of docs) out.push(...d.chunks);
	return out;
}
function allChunksWithDoc(docs) {
	const out = [];
	for (const d of docs) for (const c of d.chunks) out.push({
		docName: d.name,
		text: c
	});
	return out;
}
function notifyChange() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent("telux:documents-changed"));
}
function useDocuments(userId) {
	const [docs, setDocs] = (0, import_react.useState)([]);
	const refresh = () => {
		if (!userId) {
			setDocs([]);
			return;
		}
		loadDocuments(userId).then(setDocs);
	};
	(0, import_react.useEffect)(() => {
		refresh();
		const handler = () => refresh();
		window.addEventListener("telux:documents-changed", handler);
		return () => window.removeEventListener("telux:documents-changed", handler);
	}, [userId]);
	return {
		docs,
		refresh
	};
}
//#endregion
export { chunkText as a, extractTextWithMeta as c, qualityForLang as d, saveDocument as f, allChunksWithDoc as i, nativeForLang as l, useVoices as m, SUPPORTED_LANGS as n, clearAllDocuments as o, useDocuments as p, allChunks as r, deleteDocument as s, AuthGate as t, pickVoiceForLang as u };
