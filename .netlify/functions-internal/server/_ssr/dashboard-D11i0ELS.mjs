import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as detectLangFromDocs } from "./detect-lang-BUkpTlmE.mjs";
import { a as DashboardStateProvider, o as clearChatMessages, r as useAuth, s as useChatMessages } from "./router-DnY1Bs6l.mjs";
import { A as Copy, D as FileText, F as Check, I as ArrowUp, M as CloudUpload, R as ArrowDown, S as LoaderCircle, a as Trash2, c as Sparkles, f as RefreshCw, h as Mic, j as Columns2, o as ThumbsUp, p as Pin, r as Volume2, s as ThumbsDown, t as X, u as Send } from "../_libs/lucide-react.mjs";
import { a as chunkText, c as extractTextWithMeta, f as saveDocument, i as allChunksWithDoc, l as nativeForLang, m as useVoices, p as useDocuments, r as allChunks, s as deleteDocument, t as AuthGate } from "./useDocuments-WMWqtLPa.mjs";
import { a as scoreChunks, i as recordQuestion, n as LanguagePicker, o as speak, r as askChat, s as useUsage, t as ChatRateLimitedError } from "./scoring-BlzkiuxQ.mjs";
import { t as DashboardSubNav } from "./dashboard-nav-DijIoiWm.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D11i0ELS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BillingCard() {
	const { questionsThisMonth } = useUsage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Your plan",
		className: "rounded-2xl border border-signal/30 bg-gradient-to-br from-signal/10 via-signal/5 to-transparent p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-signal/20 text-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-mono tracking-widest text-muted-foreground uppercase",
						children: "Your plan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base font-semibold sm:text-lg",
						children: ["Free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "— full access"
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-emerald-400 uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), "Active"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Unlimited questions"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Voice & 9 languages"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "On-device storage"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-foreground",
							children: questionsThisMonth
						}),
						" question",
						questionsThisMonth === 1 ? "" : "s",
						" this month · no cap"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: true,
					"aria-label": "Upgrade to Pro (coming soon)",
					className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-4 py-2 text-xs font-medium text-muted-foreground opacity-70",
					children: ["Pro · ₹899/mo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-border/70 px-1.5 py-0.5 text-[9px] tracking-wide uppercase",
						children: "Soon"
					})]
				})]
			})
		]
	});
}
function getRecognitionCtor() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function useSpeech(opts = {}) {
	const { lang = "en-US", userId = null } = opts;
	const { supported: ttsSupported, voices, gender, ttsProvider, elevenlabsAvailable } = useVoices();
	const sttSupported = typeof window !== "undefined" && getRecognitionCtor() !== null;
	const [sttListening, setSttListening] = (0, import_react.useState)(false);
	const [interim, setInterim] = (0, import_react.useState)("");
	const [speakingId, setSpeakingId] = (0, import_react.useState)(null);
	const recRef = (0, import_react.useRef)(null);
	const langRef = (0, import_react.useRef)(lang);
	(0, import_react.useEffect)(() => {
		langRef.current = lang;
	}, [lang]);
	const stopListening = (0, import_react.useCallback)(() => {
		try {
			recRef.current?.stop();
		} catch {}
		setSttListening(false);
		setInterim("");
	}, []);
	const startListening = (0, import_react.useCallback)((onResult) => {
		if (!sttSupported) return;
		const Ctor = getRecognitionCtor();
		if (!Ctor) return;
		try {
			recRef.current?.abort();
		} catch {}
		const rec = new Ctor();
		rec.lang = langRef.current;
		rec.continuous = false;
		rec.interimResults = true;
		rec.maxAlternatives = 1;
		rec.onresult = (event) => {
			let interimText = "";
			let finalText = "";
			let detectedLang;
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const result = event.results[i];
				const alt = result[0];
				if (!alt) continue;
				if (result.isFinal) {
					finalText += alt.transcript;
					detectedLang = detectedLang ?? alt.lang;
				} else interimText += alt.transcript;
			}
			if (interimText) setInterim(interimText);
			if (finalText.trim()) {
				setInterim("");
				onResult(finalText.trim(), detectedLang ?? langRef.current);
			}
		};
		rec.onerror = () => {
			setSttListening(false);
			setInterim("");
		};
		rec.onend = () => {
			setSttListening(false);
			setInterim("");
		};
		recRef.current = rec;
		setInterim("");
		try {
			rec.start();
			setSttListening(true);
		} catch {
			setSttListening(false);
		}
	}, [sttSupported]);
	const stopSpeaking = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		try {
			window.speechSynthesis.cancel();
		} catch {}
		setSpeakingId(null);
	}, []);
	const speak$1 = (0, import_react.useCallback)((id, text, speakLang) => {
		if (!ttsSupported) return;
		if (typeof window !== "undefined" && window.speechSynthesis) try {
			window.speechSynthesis.cancel();
		} catch {}
		setSpeakingId(id);
		const target = speakLang ?? langRef.current;
		speak(text, {
			userId,
			lang: target,
			provider: ttsProvider,
			elevenlabsAvailable,
			gender,
			id,
			onStart: (startedId) => setSpeakingId(startedId),
			onEnd: (endedId) => setSpeakingId((cur) => cur === endedId ? null : cur)
		}).catch((err) => {
			console.warn("[useSpeech] speak() failed:", err);
			setSpeakingId(null);
		});
	}, [
		ttsSupported,
		gender,
		ttsProvider,
		elevenlabsAvailable,
		userId
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			try {
				recRef.current?.abort();
			} catch {}
			if (typeof window !== "undefined" && window.speechSynthesis) try {
				window.speechSynthesis.cancel();
			} catch {}
		};
	}, []);
	return {
		sttSupported,
		sttListening,
		interim,
		startListening,
		stopListening,
		ttsSupported,
		speakingId,
		speak: speak$1,
		stopSpeaking,
		voices
	};
}
var enUS = {
	thinking: "Thinking…",
	uploadFirst: "Upload a document first, then ask again.",
	placeholder: "Ask about this document…",
	emptyState: "Ask anything about the document you uploaded.",
	copied: "Copied",
	regenerate: "Regenerate answer",
	goodResponse: "Helpful answer",
	badResponse: "Not helpful"
};
var CHAT_COPY = {
	"en-US": enUS,
	"hi-IN": {
		thinking: "सोच रहा है…",
		uploadFirst: "कृपया पहले एक दस्तावेज़ अपलोड करें, फिर पूछें।",
		placeholder: "इस दस्तावेज़ के बारे में पूछें…",
		emptyState: "अपलोड किए गए दस्तावेज़ के बारे में कुछ भी पूछें।",
		copied: "कॉपी हो गया",
		regenerate: "उत्तर फिर से बनाएँ",
		goodResponse: "उपयोगी उत्तर",
		badResponse: "उपयोगी नहीं था"
	},
	"bn-IN": {
		thinking: "ভাবছে…",
		uploadFirst: "প্রথমে একটি নথি আপলোড করুন, তারপর জিজ্ঞাসা করুন।",
		placeholder: "এই নথি সম্পর্কে জিজ্ঞাসা করুন…",
		emptyState: "আপলোড করা নথি সম্পর্কে যেকোনো প্রশ্ন করুন।",
		copied: "কপি হয়েছে",
		regenerate: "উত্তর পুনরায় তৈরি করুন",
		goodResponse: "সহায়ক উত্তর",
		badResponse: "সহায়ক ছিল না"
	},
	"ta-IN": {
		thinking: "சிந்திக்கிறது…",
		uploadFirst: "முதலில் ஆவணத்தை பதிவேற்றவும், பிறகு கேள்வி கேளுங்கள்.",
		placeholder: "இந்த ஆவணம் பற்றி கேளுங்கள்…",
		emptyState: "பதிவேற்றிய ஆவணம் பற்றி எதையும் கேளுங்கள்.",
		copied: "நகலெடுத்தது",
		regenerate: "பதிலை மீண்டும் உருவாக்கு",
		goodResponse: "பயனுள்ள பதில்",
		badResponse: "பயனுள்ளதாக இல்லை"
	},
	"te-IN": {
		thinking: "ఆలోచిస్తోంది…",
		uploadFirst: "ముందుగా ఒక పత్రాన్ని అప్‌లోడ్ చేయండి, ఆ తర్వాత అడగండి.",
		placeholder: "ఈ పత్రం గురించి అడగండి…",
		emptyState: "మీరు అప్‌లోడ్ చేసిన పత్రం గురించి ఏదైనా అడగండి.",
		copied: "కాపీ అయింది",
		regenerate: "సమాధానాన్ని మళ్లీ రూపొందించండి",
		goodResponse: "ఉపయోగకరమైన సమాధానం",
		badResponse: "ఉపయోగకరం కాదు"
	},
	"kn-IN": {
		thinking: "ಯೋಚಿಸುತ್ತಿದೆ…",
		uploadFirst: "ಮೊದಲು ಒಂದು ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ನಂತರ ಕೇಳಿ.",
		placeholder: "ಈ ದಾಖಲೆಯ ಬಗ್ಗೆ ಕೇಳಿ…",
		emptyState: "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.",
		copied: "ನಕಲಿಸಲಾಗಿದೆ",
		regenerate: "ಉತ್ತರವನ್ನು ಮತ್ತೆ ರಚಿಸಿ",
		goodResponse: "ಉಪಯುಕ್ತ ಉತ್ತರ",
		badResponse: "ಉಪಯುಕ್ತವಲ್ಲ"
	},
	"ml-IN": {
		thinking: "ചിന്തിക്കുന്നു…",
		uploadFirst: "ആദ്യം ഒരു രേഖ അപ്‌ലോഡ് ചെയ്യുക, പിന്നെ ചോദിക്കുക.",
		placeholder: "ഈ രേഖയെക്കുറിച്ച് ചോദിക്കൂ…",
		emptyState: "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത രേഖയെക്കുറിച്ച് എന്തെങ്കിലും ചോദിക്കൂ.",
		copied: "കോപ്പിയായി",
		regenerate: "ഉത്തരം വീണ്ടും സൃഷ്ടിക്കുക",
		goodResponse: "സഹായകമായ ഉത്തരം",
		badResponse: "സഹായകമല്ല"
	},
	"mr-IN": {
		thinking: "विचार करत आहे…",
		uploadFirst: "कृपया प्रथम एक दस्तऐवज अपलोड करा, नंतर विचारा.",
		placeholder: "या दस्तऐवजाबद्दल विचारा…",
		emptyState: "आपण अपलोड केलेल्या दस्तऐवजाबद्दल काहीही विचारा.",
		copied: "कॉपी झाले",
		regenerate: "उत्तर पुन्हा तयार करा",
		goodResponse: "उपयुक्त उत्तर",
		badResponse: "उपयुक्त नव्हते"
	},
	"gu-IN": {
		thinking: "વિચારી રહ્યું છે…",
		uploadFirst: "કૃપા કરીને પહેલાં એક દસ્તાવેજ અપલોડ કરો, પછી પૂછો.",
		placeholder: "આ દસ્તાવેજ વિશે પૂછો…",
		emptyState: "તમે અપલોડ કરેલા દસ્તાવેજ વિશે કંઈપણ પૂછો.",
		copied: "કૉપિ થઈ ગયું",
		regenerate: "જવાબ ફરી બનાવો",
		goodResponse: "ઉપયોગી જવાબ",
		badResponse: "ઉપયોગી નહોતું"
	},
	"pa-IN": {
		thinking: "ਸੋਚ ਰਿਹਾ ਹੈ…",
		uploadFirst: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਇੱਕ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ, ਫਿਰ ਪੁੱਛੋ।",
		placeholder: "ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਪੁੱਛੋ…",
		emptyState: "ਤੁਹਾਡੇ ਵੱਲੋਂ ਅੱਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।",
		copied: "ਕਾਪੀ ਹੋ ਗਿਆ",
		regenerate: "ਜਵਾਬ ਮੁੜ ਬਣਾਓ",
		goodResponse: "ਮਦਦਗਾਰ ਜਵਾਬ",
		badResponse: "ਮਦਦਗਾਰ ਨਹੀਂ ਸੀ"
	},
	"or-IN": {
		thinking: "ଚିନ୍ତା କରୁଛି…",
		uploadFirst: "ଦୟାକରି ପ୍ରଥମେ ଗୋଟିଏ ଦସ୍ତାବେଜ ଅପଲୋଡ୍ କରନ୍ତୁ, ତା'ପରେ ପଚାରନ୍ତୁ।",
		placeholder: "ଏହି ଦସ୍ତାବେଜ ବିଷୟରେ ପଚାରନ୍ତୁ…",
		emptyState: "ଆପଣ ଅପଲୋଡ୍ କରିଥିବା ଦସ୍ତାବେଜ ବିଷୟରେ କିଛି ପଚାରନ୍ତୁ।",
		copied: "କପି ହୋଇଗଲା",
		regenerate: "ଉତ୍ତର ପୁଣି ତିଆରି କରନ୍ତୁ",
		goodResponse: "ଉପଯୋଗୀ ଉତ୍ତର",
		badResponse: "ଉପଯୋଗୀ ନୁହେଁ"
	},
	"as-IN": {
		thinking: "চিন্তা কৰিছে…",
		uploadFirst: "প্ৰথমে এটা নথি আপলোড কৰক, তাৰ পিছত সুধক।",
		placeholder: "এই নথিৰ বিষয়ে সুধক…",
		emptyState: "আপুনি আপলোড কৰা নথিৰ বিষয়ে যি খন সুধিব পাৰে।",
		copied: "প্ৰতিলিপি হ'ল",
		regenerate: "উত্তৰ পুনৰ সৃষ্টি কৰক",
		goodResponse: "সহায়ক উত্তৰ",
		badResponse: "সহায়ক নহয়"
	},
	"ur-IN": {
		thinking: "سوچ رہا ہے…",
		uploadFirst: "پہلے ایک دستاویز اپ لوڈ کریں، پھر پوچھیں۔",
		placeholder: "اس دستاویز کے بارے میں پوچھیں…",
		emptyState: "اپ لوڈ کردہ دستاویز کے بارے میں کچھ بھی پوچھیں۔",
		copied: "کاپی ہو گیا",
		regenerate: "جواب دوبارہ بنائیں",
		goodResponse: "مددگار جواب",
		badResponse: "مددگار نہیں تھا"
	},
	"es-ES": {
		thinking: "Pensando…",
		uploadFirst: "Sube primero un documento y vuelve a preguntar.",
		placeholder: "Pregunta sobre este documento…",
		emptyState: "Pregunta lo que quieras sobre el documento que subiste.",
		copied: "Copiado",
		regenerate: "Regenerar respuesta",
		goodResponse: "Respuesta útil",
		badResponse: "No fue útil"
	},
	"fr-FR": {
		thinking: "Réflexion…",
		uploadFirst: "Téléversez d'abord un document, puis réessayez.",
		placeholder: "Posez une question sur ce document…",
		emptyState: "Posez n'importe quelle question sur le document téléversé.",
		copied: "Copié",
		regenerate: "Régénérer la réponse",
		goodResponse: "Réponse utile",
		badResponse: "Pas utile"
	},
	"de-DE": {
		thinking: "Denke nach…",
		uploadFirst: "Lade zuerst ein Dokument hoch und versuche es dann erneut.",
		placeholder: "Frage zu diesem Dokument stellen…",
		emptyState: "Stelle eine beliebige Frage zum hochgeladenen Dokument.",
		copied: "Kopiert",
		regenerate: "Antwort neu generieren",
		goodResponse: "Hilfreiche Antwort",
		badResponse: "Nicht hilfreich"
	},
	"pt-BR": {
		thinking: "Pensando…",
		uploadFirst: "Envie um documento primeiro e pergunte de novo.",
		placeholder: "Pergunte sobre este documento…",
		emptyState: "Pergunte qualquer coisa sobre o documento enviado.",
		copied: "Copiado",
		regenerate: "Regenerar resposta",
		goodResponse: "Resposta útil",
		badResponse: "Não foi útil"
	},
	"ar-SA": {
		thinking: "جارٍ التفكير…",
		uploadFirst: "حمّل مستنداً أولاً، ثم اسأل مرة أخرى.",
		placeholder: "اسأل عن هذا المستند…",
		emptyState: "اسأل أي شيء عن المستند الذي حمّلته.",
		copied: "تم النسخ",
		regenerate: "أعد توليد الإجابة",
		goodResponse: "إجابة مفيدة",
		badResponse: "ليست مفيدة"
	}
};
/**
* Look up the chat copy for a language code. Falls back to "en-US" when
* the language isn't in the table — this is the only safe default because
* the user-facing strings must always render, even for langs we haven't
* localized yet.
*/
function lookupChatCopy(code) {
	return CHAT_COPY[code] ?? enUS;
}
/**
* Build a chat-input placeholder. When `replyLang` isn't English, the
* native-script prompt is shown first and the English fallback comes
* after a separator. The docName (when provided) is appended so the user
* knows which document the placeholder refers to.
*
* English: "Ask about this document…"
* Hindi with no doc: "इस दस्तावेज़ के बारे में पूछें… or Ask about this document…"
* Hindi with "notes.pdf": "इस दस्तावेज़ के बारे में पूछें… or Ask about notes.pdf…"
*/
function bilingualPlaceholder(replyLang, docName) {
	const native = lookupChatCopy(replyLang).placeholder;
	const enText = "Ask about this document…";
	const enWithDoc = docName ? `Ask about ${docName}…` : enText;
	if (replyLang === "en-US") return docName ? `Ask about ${docName}…` : enText;
	return `${docName ? native.replace("…", ` (${docName})…`) : native} or ${enWithDoc}`;
}
function ChatPanel({ docs, paneId = null, pinnedDocId = null, title = "Chat", userId: userIdProp = null }) {
	const { session } = useAuth();
	const userId = userIdProp ?? session?.user?.id ?? null;
	const { messages, setMessages } = useChatMessages(paneId ?? void 0, userId ?? void 0);
	const userMeta = (session?.user)?.user_metadata ?? {};
	const firstName = typeof userMeta.full_name === "string" && userMeta.full_name.trim() ? userMeta.full_name.trim().split(/\s+/)[0] : null;
	const greetingText = firstName ? `Hi ${firstName}! Drop a document on the left and ask me anything about it — in English or your preferred language.` : "Hi! Drop a document on the left and ask me anything about it — in English or your preferred language.";
	(0, import_react.useEffect)(() => {
		if (messages.length === 0) setMessages([{
			id: "m1",
			role: "assistant",
			text: greetingText
		}]);
	}, []);
	const [input, setInput] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	const startRef = (0, import_react.useRef)(null);
	const listRef = (0, import_react.useRef)(null);
	const [scrolledUp, setScrolledUp] = (0, import_react.useState)(false);
	const [scrolledDown, setScrolledDown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = listRef.current;
		if (!el) return;
		const onScroll = () => {
			const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
			setScrolledUp(distanceFromBottom > 80);
			setScrolledDown(el.scrollTop > 80);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (scrolledUp) return;
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages,
		pending,
		scrolledUp
	]);
	const { lang: manualLang } = useVoices();
	const docLang = (0, import_react.useMemo)(() => detectLangFromDocs(docs), [docs]);
	const replyLang = manualLang === "en-US" ? docLang : manualLang;
	const speech = useSpeech({
		lang: replyLang,
		userId
	});
	const [, setSttLang] = (0, import_react.useState)(replyLang);
	const [justDictated, setJustDictated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, pending]);
	const chunks = (0, import_react.useMemo)(() => allChunks(docs), [docs]);
	(0, import_react.useMemo)(() => allChunksWithDoc(docs), [docs]);
	const hasDocs = chunks.length > 0;
	hasDocs && docs.length === 1 && docs[0].name;
	const pinnedDocs = (0, import_react.useMemo)(() => {
		if (!pinnedDocId) return docs;
		const match = docs.filter((d) => d.id === pinnedDocId);
		return match.length > 0 ? match : docs;
	}, [docs, pinnedDocId]);
	const pinnedChunks = (0, import_react.useMemo)(() => allChunks(pinnedDocs), [pinnedDocs]);
	const pinnedChunksWithDoc = (0, import_react.useMemo)(() => allChunksWithDoc(pinnedDocs), [pinnedDocs]);
	const pinnedHasDocs = pinnedChunks.length > 0;
	const pinnedDocName = pinnedHasDocs && pinnedDocs.length === 1 ? pinnedDocs[0].name : void 0;
	const placeholder = pinnedHasDocs ? pinnedDocs.length === 1 ? bilingualPlaceholder(replyLang, pinnedDocName) : `Ask across ${pinnedDocs.length} documents… or सभी ${pinnedDocs.length} दस्तावेज़ों में पूछें…` : bilingualPlaceholder(replyLang);
	const thinkingCopy = lookupChatCopy(replyLang).thinking;
	const limitReached = false;
	async function onSubmit(e) {
		e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || pending) return;
		if (!pinnedHasDocs) {
			setMessages((c) => [...c, {
				id: `a-${Date.now()}`,
				role: "assistant",
				text: pinnedDocId ? `Pin this chat to a document you've uploaded, or clear the pin to ask across everything.` : "Add a document on the left first, then ask your question."
			}]);
			return;
		}
		await runAskRef.current(trimmed);
		setJustDictated(false);
	}
	const runAskRef = (0, import_react.useRef)(async () => {});
	runAskRef.current = async function runAsk(trimmed, opts) {
		if (!opts?.skipUserMsg) setMessages((c) => [...c, {
			id: `u-${Date.now()}`,
			role: "user",
			text: trimmed
		}]);
		setInput("");
		setPending(true);
		const top = scoreChunks(trimmed, pinnedChunks, 3).map((c) => c.text);
		const contributors = (() => {
			const seen = /* @__PURE__ */ new Set();
			for (const t of top) {
				const needle = t.slice(0, 60);
				const hit = pinnedChunksWithDoc.find((c) => c.text.startsWith(needle));
				if (hit && !seen.has(hit.docName)) seen.add(hit.docName);
			}
			return Array.from(seen);
		})();
		if (top.length === 0) {
			setMessages((c) => [...c, {
				id: `a-${Date.now()}`,
				role: "assistant",
				text: "I couldn't find anything in your document that matches that question. Try rephrasing or upload a different file.",
				contributors: pinnedDocs.length > 0 ? pinnedDocs.map((d) => d.name) : void 0
			}]);
			setPending(false);
			return;
		}
		const history = messagesRef.current.filter((m) => m.role === "user" || m.role === "assistant").slice(-8).map((m) => ({
			role: m.role,
			content: m.text
		}));
		try {
			const { answer } = await askChat({ data: {
				userId: userId ?? "",
				question: trimmed,
				chunks: top,
				history,
				mode: "text",
				forceLang: replyLang
			} });
			setMessages((c) => [...c, {
				id: `a-${Date.now()}`,
				role: "assistant",
				text: answer,
				contributors
			}]);
			recordQuestion();
		} catch (err) {
			console.error(err);
			const friendly = err instanceof ChatRateLimitedError ? err.message : (() => {
				const raw = err instanceof Error ? err.message : "Unknown error";
				if (/api error/i.test(raw) || /validation/i.test(raw)) return "The chat service is temporarily unavailable. Please try again in a moment.";
				return raw;
			})();
			const prefix = err instanceof ChatRateLimitedError ? "" : /GROQ request failed|GROQ_API_KEY|rate limit|busy right now/i.test(err instanceof Error ? err.message : "") ? "" : "Couldn't reach the model right now. ";
			setMessages((c) => [...c, {
				id: `e-${Date.now()}`,
				role: "assistant",
				text: `${prefix}${friendly}`,
				error: true
			}]);
		} finally {
			setPending(false);
		}
	};
	const messagesRef = (0, import_react.useRef)([]);
	messagesRef.current = messages;
	const handleCopy = (0, import_react.useCallback)(async (text) => {
		try {
			if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
			else {
				const ta = document.createElement("textarea");
				ta.value = text;
				ta.style.position = "fixed";
				ta.style.opacity = "0";
				document.body.appendChild(ta);
				ta.select();
				document.execCommand("copy");
				document.body.removeChild(ta);
			}
			toast.success(lookupChatCopy(replyLang).copied);
		} catch (err) {
			console.error("clipboard copy failed", err);
			toast.error("Couldn't copy to clipboard");
		}
	}, [replyLang]);
	const handleFeedback = (0, import_react.useCallback)((msgId, next) => {
		setMessages((cs) => cs.map((m) => m.id === msgId ? {
			...m,
			feedback: m.feedback === next ? null : next
		} : m));
		console.info("[chat-feedback]", {
			msgId,
			value: next
		});
	}, []);
	const handleClear = (0, import_react.useCallback)(() => {
		if (typeof window !== "undefined" && messages.length > 0) {
			if (!window.confirm(firstName ? `Clear ${firstName}'s chat history? This can't be undone.` : "Clear chat history? This can't be undone.")) return;
		}
		clearChatMessages(paneId ?? void 0, userId ?? void 0);
		setMessages([{
			id: "m1",
			role: "assistant",
			text: greetingText
		}]);
		toast.success(firstName ? "Chat cleared." : "Chat cleared.");
	}, [
		messages.length,
		paneId,
		userId,
		firstName,
		greetingText,
		setMessages
	]);
	const handleRegenerate = (0, import_react.useCallback)(async (msgId) => {
		const list = messagesRef.current;
		const idx = list.findIndex((m) => m.id === msgId);
		if (idx < 0) return;
		let prevUserIdx = -1;
		for (let i = idx - 1; i >= 0; i--) if (list[i].role === "user") {
			prevUserIdx = i;
			break;
		}
		if (prevUserIdx < 0) return;
		const prompt = list[prevUserIdx].text;
		const before = list.slice(0, idx);
		setMessages(before);
		await runAskRef.current(prompt, { skipUserMsg: true });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-[55vh] flex-col gap-3 rounded-2xl border border-border bg-surface-2/30 p-3.5 sm:p-5 lg:min-h-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold sm:text-lg",
							children: title
						}),
						pinnedDocName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 text-[10px] font-medium text-signal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-2.5" }), pinnedDocName]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface-2/60 px-2 py-0.5 text-[10px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-1.5 rounded-full " + (replyLang === "en-US" ? "bg-emerald-500" : replyLang.endsWith("-IN") ? "bg-signal" : "bg-amber-500"),
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Replying in",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: nativeForLang(replyLang)
								})
							] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {}), messages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleClear,
						"aria-label": "Clear conversation",
						title: "Clear conversation",
						className: "inline-flex items-center gap-1 rounded-md border border-border bg-surface-2/40 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Clear"
						})]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: listRef,
				className: "relative max-h-[55vh] flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border bg-surface-2/30 p-3 sm:p-4 lg:max-h-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: startRef,
						"aria-hidden": true
					}),
					messages.map((m, idx) => {
						const isAssistant = m.role === "assistant" && !m.error;
						const isLastAssistant = isAssistant && idx === messages.findLastIndex((cur) => cur.role === "assistant" && !cur.error);
						const cp = lookupChatCopy(replyLang);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: m.role === "user" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-signal px-3 py-2 text-sm text-signal-foreground" : m.error ? "mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-400" : "mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-background px-3 py-2 text-sm text-foreground",
							children: [
								m.text,
								isAssistant && m.contributors && m.contributors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 text-[10px] tracking-wide text-muted-foreground/80",
									children: [
										"Answered from:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: m.contributors.join(", ")
										})
									]
								}) : null,
								isAssistant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 -mb-1 flex flex-wrap items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleCopy(m.text),
											"aria-label": "Copy message",
											title: "Copy",
											className: "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 align-middle text-[10px] font-medium text-muted-foreground transition-colors hover:bg-signal/15 hover:text-signal",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), "Copy"]
										}),
										isLastAssistant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleRegenerate(m.id),
											disabled: pending,
											"aria-label": cp.regenerate,
											title: cp.regenerate,
											className: "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 align-middle text-[10px] font-medium text-muted-foreground transition-colors hover:bg-signal/15 hover:text-signal disabled:cursor-not-allowed disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), "Regenerate"]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleFeedback(m.id, "up"),
											"aria-label": cp.goodResponse,
											"aria-pressed": m.feedback === "up",
											title: cp.goodResponse,
											className: "inline-flex items-center rounded-md px-1.5 py-0.5 align-middle text-[10px] font-medium transition-colors " + (m.feedback === "up" ? "bg-signal/20 text-signal" : "text-muted-foreground hover:bg-signal/15 hover:text-signal"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleFeedback(m.id, "down"),
											"aria-label": cp.badResponse,
											"aria-pressed": m.feedback === "down",
											title: cp.badResponse,
											className: "inline-flex items-center rounded-md px-1.5 py-0.5 align-middle text-[10px] font-medium transition-colors " + (m.feedback === "down" ? "bg-red-500/20 text-red-400" : "text-muted-foreground hover:bg-red-500/15 hover:text-red-400"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-3" })
										}),
										speech.ttsSupported ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												if (speech.speakingId === m.id) speech.stopSpeaking();
												else speech.speak(m.id, m.text, replyLang);
											},
											"aria-label": speech.speakingId === m.id ? "Stop reading" : "Read aloud",
											title: speech.speakingId === m.id ? "Stop reading" : "Read aloud",
											className: "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 align-middle text-[10px] font-medium transition-colors " + (speech.speakingId === m.id ? "bg-signal/20 text-signal" : "text-muted-foreground hover:bg-signal/15 hover:text-signal"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3" }), speech.speakingId === m.id ? "Stop" : "Listen"]
										}) : null
									]
								}) : null
							]
						}, m.id);
					}),
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mr-auto inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							"aria-label": thinkingCopy,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-muted-foreground/70 [animation-delay:0ms]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-muted-foreground/70 [animation-delay:150ms]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-muted-foreground/70 [animation-delay:300ms]" })
							]
						}), thinkingCopy]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef }),
					scrolledUp && messages.length > 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
						"aria-label": "Jump to latest message",
						title: "Jump to latest",
						className: "absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3" }), "Latest"]
					}) : null,
					scrolledDown && messages.length > 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => startRef.current?.scrollIntoView({ behavior: "smooth" }),
						"aria-label": "Jump to top of conversation",
						title: "Jump to top",
						className: "absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3" }), "Top"]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: input,
						onChange: (e) => setInput(e.currentTarget.value),
						placeholder: speech.sttListening ? `Listening… ${speech.interim || "speak now"}` : placeholder,
						className: "w-full rounded-xl border border-input bg-surface-2/60 px-3.5 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
					}), speech.sttSupported ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (speech.sttListening) {
								speech.stopListening();
								return;
							}
							speech.startListening((text) => {
								setSttLang(replyLang);
								setInput((current) => current.trim() ? `${current.trim()} ${text}` : text);
								setJustDictated(true);
								window.setTimeout(() => setJustDictated(false), 5e3);
							});
						},
						"aria-label": speech.sttListening ? "Stop dictation" : "Dictate",
						title: speech.sttListening ? "Stop dictation" : "Speak to fill the input — press Enter to send",
						className: "absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg transition-colors " + (speech.sttListening ? "bg-signal/20 text-signal" : "text-muted-foreground hover:bg-signal/15 hover:text-signal"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3.5" })
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					"aria-label": "Send",
					disabled: !input.trim() || pending || limitReached,
					className: "grid size-10 shrink-0 place-items-center rounded-xl bg-signal text-signal-foreground transition-transform hover:scale-[1.03] disabled:opacity-60",
					children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			}),
			justDictated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "mt-1.5 px-1 text-[11px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "mr-1 inline-block size-3 -translate-y-px text-signal" }),
					"Transcript added — review the text above, then press",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded border border-border bg-surface-2 px-1 text-[10px]",
						children: "Enter"
					}),
					" or tap Send."
				]
			}) : null,
			hasDocs ? pinnedDocId && pinnedDocs.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "mt-1.5 px-1 text-[11px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 inline-block size-3 -translate-y-px text-signal" }),
					"Answering from ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: pinnedDocName
					}),
					" only."
				]
			}) : docs.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "mt-1.5 px-1 text-[11px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 inline-block size-3 -translate-y-px text-signal" }),
					"Asking across ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: docs.length
					}),
					" documents on this device."
				]
			}) : null : null
		]
	});
}
var PIN_STORAGE_KEY = "telux:parallel-pin-v1";
function loadPinSlots() {
	if (typeof window === "undefined") return {
		paneA: "",
		paneB: ""
	};
	try {
		const raw = window.localStorage.getItem(PIN_STORAGE_KEY);
		if (!raw) return {
			paneA: "",
			paneB: ""
		};
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return {
			paneA: "",
			paneB: ""
		};
		return {
			paneA: typeof parsed.paneA === "string" ? parsed.paneA : "",
			paneB: typeof parsed.paneB === "string" ? parsed.paneB : ""
		};
	} catch {
		return {
			paneA: "",
			paneB: ""
		};
	}
}
function savePinSlots(slots) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(slots));
	} catch {}
}
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function DashboardPage() {
	const { session } = useAuth();
	const { docs } = useDocuments(session?.user?.id);
	const routerState = useRouterState();
	const viewRaw = new URLSearchParams(routerState.location.search).get("view");
	const view = viewRaw === "chat" || viewRaw === "multi" ? viewRaw : "documents";
	const [mobileTab, setMobileTab] = (0, import_react.useState)(view === "chat" ? "chat" : "documents");
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [ingestingId, setIngestingId] = (0, import_react.useState)(null);
	const [firstUploadCelebrated, setFirstUploadCelebrated] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [pinSlots, setPinSlots] = (0, import_react.useState)({
		paneA: "",
		paneB: ""
	});
	(0, import_react.useEffect)(() => {
		const initial = loadPinSlots();
		if (docs.length > 0) {
			const docIds = new Set(docs.map((d) => d.id));
			if (initial.paneA && !docIds.has(initial.paneA)) initial.paneA = "";
			if (initial.paneB && !docIds.has(initial.paneB)) initial.paneB = "";
		}
		setPinSlots(initial);
	}, [docs.length]);
	const setPanePin = (0, import_react.useCallback)((slot, docId) => {
		setPinSlots((cur) => {
			const next = {
				...cur,
				[slot]: docId
			};
			savePinSlots(next);
			return next;
		});
	}, []);
	const ingest = (0, import_react.useCallback)(async (files) => {
		if (!session?.user?.id) return;
		const fileArr = Array.from(files);
		const added = [];
		const failed = [];
		const MAX_PARALLEL = 3;
		let cursor = 0;
		const inFlight = /* @__PURE__ */ new Set();
		const ingestOne = async (file) => {
			const id = `${file.name}-${file.size}-${file.lastModified}`;
			inFlight.add(id);
			setIngestingId(id);
			try {
				const { text, pageCount } = await extractTextWithMeta(file);
				const chunks = chunkText(text);
				await saveDocument({
					id,
					name: file.name,
					size: file.size,
					mimeType: file.type || "application/octet-stream",
					addedAt: Date.now(),
					chunks,
					pageCount,
					userId: session.user.id
				});
				added.push(file.name);
			} catch (err) {
				console.error("Failed to ingest", file.name, err);
				failed.push({
					name: file.name,
					detail: err instanceof Error ? err.message : "Only PDF and plain-text files are supported."
				});
			} finally {
				inFlight.delete(id);
				if (inFlight.size === 0) setIngestingId(null);
			}
		};
		const workers = [];
		for (let i = 0; i < Math.min(MAX_PARALLEL, fileArr.length); i++) workers.push((async () => {
			while (true) {
				const idx = cursor++;
				if (idx >= fileArr.length) return;
				await ingestOne(fileArr[idx]);
			}
		})());
		await Promise.all(workers);
		if (added.length > 0 && failed.length === 0) {
			const list = added.length === 1 ? added[0] : added.join(", ");
			toast.success(added.length === 1 ? `Added ${list} — ask away.` : `Added ${added.length} documents: ${list}.`);
		} else if (added.length > 0 && failed.length > 0) {
			toast.success(`Added ${added.length} document${added.length === 1 ? "" : "s"}. ${failed.length} couldn't be read.`);
			for (const f of failed) toast.error(`Couldn't read "${f.name}". ${f.detail}`);
		} else if (failed.length > 0) for (const f of failed) toast.error(`Couldn't read "${f.name}". ${f.detail}`);
		if (added.length > 0 && !firstUploadCelebrated) setFirstUploadCelebrated(true);
		if (added.length > 0) setMobileTab("chat");
	}, [session?.user?.id, firstUploadCelebrated]);
	function onDrop(e) {
		e.preventDefault();
		setIsDragging(false);
		ingest(e.dataTransfer.files);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardStateProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSubNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-3 pb-6 pt-3 sm:px-6 sm:pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2/40 p-1 text-xs lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMobileTab("documents"),
							className: "rounded-lg px-2 py-2 font-medium transition-colors " + (mobileTab === "documents" ? "bg-signal text-signal-foreground" : "text-muted-foreground hover:text-foreground"),
							children: "Docs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMobileTab("chat"),
							className: "rounded-lg px-2 py-2 font-medium transition-colors " + (mobileTab === "chat" ? "bg-signal text-signal-foreground" : "text-muted-foreground hover:text-foreground"),
							children: "Chat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							search: { view: "multi" },
							onClick: () => setMobileTab("chat"),
							className: "rounded-lg px-2 py-2 text-center font-medium transition-colors " + (view === "multi" ? "bg-signal text-signal-foreground" : "text-muted-foreground hover:text-foreground"),
							children: "Multi"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden gap-1 rounded-xl border border-border bg-surface-2/40 p-1 text-xs lg:flex lg:w-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							search: { view: "documents" },
							className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " + (view === "documents" ? "bg-signal/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), "Documents"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							search: { view: "chat" },
							className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " + (view === "chat" ? "bg-signal/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"),
							children: "Chat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							search: { view: "multi" },
							className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " + (view === "multi" ? "bg-signal/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns2, { className: "size-3.5" }), "Multi"]
						})
					]
				}),
				view === "multi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "grid min-h-[calc(100vh-7rem)] grid-cols-1 gap-3 lg:min-h-0 lg:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
							docs,
							paneId: "multiA",
							userId: session?.user?.id ?? null,
							pinnedDocId: pinSlots.paneA || null,
							title: "Chat A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
							docs,
							paneId: "multiB",
							userId: session?.user?.id ?? null,
							pinnedDocId: pinSlots.paneB || null,
							title: "Chat B"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiPinStrip, {
						docs,
						paneA: pinSlots.paneA,
						paneB: pinSlots.paneB,
						onChange: setPanePin
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "grid min-h-[calc(100vh-7rem)] grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: mobileTab === "documents" ? "" : "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentsPanel, {
							docs,
							isDragging,
							setIsDragging,
							ingestingId,
							firstUploadCelebrated,
							onDrop,
							onPick: () => fileInputRef.current?.click(),
							fileInputRef,
							ingest
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: mobileTab === "documents" ? "hidden lg:block" : "",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
							docs,
							title: "Chat"
						})
					})]
				})
			]
		})]
	}) });
}
function MultiPinStrip({ docs, paneA, paneB, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-surface-2/30 p-3.5 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3.5 text-signal" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Pin each chat to a document"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: "Leave a slot on \"All docs\" to ask across everything."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinRow, {
				label: "Chat A",
				docs,
				value: paneA,
				onChange: (v) => onChange("paneA", v)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinRow, {
				label: "Chat B",
				docs,
				value: paneB,
				onChange: (v) => onChange("paneB", v)
			})]
		})]
	});
}
function PinRow({ label, docs, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value,
			onChange: (e) => onChange(e.currentTarget.value),
			className: "flex-1 rounded-lg border border-input bg-background px-2 py-1.5 text-xs text-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "All docs"
			}), docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: d.id,
				children: d.name
			}, d.id))]
		})]
	});
}
function DocumentsPanel({ docs, isDragging, setIsDragging, ingestingId, firstUploadCelebrated, onDrop, fileInputRef, ingest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-3 rounded-2xl border border-border bg-surface-2/30 p-3.5 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-base font-semibold sm:text-lg",
					children: "Documents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase",
					children: "On this device"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				onDragOver: (e) => {
					e.preventDefault();
					setIsDragging(true);
				},
				onDragLeave: () => setIsDragging(false),
				onDrop,
				className: "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-surface-2/30 p-4 text-center transition-colors sm:p-6 min-h-[150px] sm:min-h-[220px] " + (isDragging ? "border-signal bg-signal/5" : "border-border hover:border-signal/60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-7 text-signal sm:size-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Drag & drop a file here"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "PDF, TXT, MD up to ~10 MB"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-medium",
						children: "Choose file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						multiple: true,
						accept: ".pdf,.txt,.md,.markdown,application/pdf,text/plain,text/markdown",
						className: "sr-only",
						onChange: (e) => {
							if (e.currentTarget.files) ingest(e.currentTarget.files);
							e.currentTarget.value = "";
						}
					})
				]
			}),
			ingestingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), "Reading documents…"]
			}) : null,
			docs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2",
				children: [docs.slice(0, 6).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 shrink-0 text-signal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [
									formatSize(d.size),
									" · ",
									d.chunks.length,
									" chunks",
									d.pageCount ? ` · ${d.pageCount} ${d.pageCount === 1 ? "page" : "pages"}` : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Remove ${d.name}`,
							onClick: () => void deleteDocument(d.id),
							className: "grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				}, d.id)), docs.length > 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-center text-xs text-muted-foreground",
					children: [
						"+ ",
						docs.length - 6,
						" more on this device"
					]
				}) : null]
			}) : null,
			firstUploadCelebrated && docs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/talk",
				className: "mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm font-semibold text-signal transition-colors hover:bg-signal/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), "Talk with Document"]
			}) : null
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {}) });
//#endregion
export { SplitComponent as component };
