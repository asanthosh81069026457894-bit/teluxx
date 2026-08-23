import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as detectLangFromDocs } from "./detect-lang-BUkpTlmE.mjs";
import { c as useTalkMessages, r as useAuth } from "./router-DnY1Bs6l.mjs";
import { I as ArrowUp, L as ArrowLeft, N as CircleAlert, R as ArrowDown, S as LoaderCircle, c as Sparkles, g as MicOff, h as Mic, r as Volume2, t as X } from "../_libs/lucide-react.mjs";
import { m as useVoices, p as useDocuments, r as allChunks, t as AuthGate } from "./useDocuments-WMWqtLPa.mjs";
import { a as scoreChunks, i as recordQuestion, n as LanguagePicker, o as speak, r as askChat, s as useUsage } from "./scoring-BlzkiuxQ.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talk-BE4HBy8C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_SIZE = 280;
var BAR_HEIGHTS = [
	40,
	70,
	100,
	55,
	85
];
var BAR_DELAYS = [
	0,
	80,
	160,
	240,
	320
];
function MaaraOrb({ state, size = DEFAULT_SIZE, className }) {
	const eqOn = state === "listening" || state === "speaking";
	const active = state !== "idle" && state !== "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-state": state,
		"data-eq": eqOn ? "on" : "off",
		role: "img",
		"aria-label": `Talk with Document status: ${state}`,
		className: cn("relative grid place-items-center select-none", className),
		style: {
			width: size,
			height: size
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "maara-orb-ring-cw motion-reduce:animate-none absolute inset-0 rounded-full",
				style: {
					color: "var(--chart-3)",
					border: "1.5px dashed currentColor",
					WebkitMask: "radial-gradient(circle, transparent 55%, black 56.5%, black 62%, transparent 63.5%)",
					mask: "radial-gradient(circle, transparent 55%, black 56.5%, black 62%, transparent 63.5%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "maara-orb-ring-cw motion-reduce:animate-none absolute rounded-full",
				style: {
					inset: 16,
					background: "conic-gradient(from 0deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 0deg 4deg, transparent 4deg 30deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 30deg 34deg, transparent 34deg 60deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 60deg 64deg, transparent 64deg 90deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 90deg 94deg, transparent 94deg 120deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 120deg 124deg, transparent 124deg 150deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 150deg 154deg, transparent 154deg 180deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 180deg 184deg, transparent 184deg 210deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 210deg 214deg, transparent 214deg 240deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 240deg 244deg, transparent 244deg 270deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 270deg 274deg, transparent 274deg 300deg, color-mix(in oklab, var(--chart-3) 60%, transparent) 300deg 304deg, transparent 304deg 330deg, color-mix(in oklab, var(--chart-3) 50%, transparent) 330deg 334deg, transparent 334deg 360deg)",
					WebkitMask: "radial-gradient(circle, transparent 49%, black 50%, black 56%, transparent 57%)",
					mask: "radial-gradient(circle, transparent 49%, black 50%, black 56%, transparent 57%)",
					opacity: .85
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "maara-orb-ring-ccw motion-reduce:animate-none absolute rounded-full",
				style: {
					inset: 40,
					border: "1px solid color-mix(in oklab, var(--signal) 70%, transparent)",
					WebkitMask: "radial-gradient(circle, transparent 55%, black 56.5%, black 63%, transparent 64.5%)",
					mask: "radial-gradient(circle, transparent 55%, black 56.5%, black 63%, transparent 64.5%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "scan-line motion-reduce:animate-none pointer-events-none absolute left-1/2 -translate-x-1/2 h-px",
				style: {
					top: 24,
					width: size * .55,
					background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--signal) 90%, transparent), transparent)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: cn("motion-reduce:animate-none relative grid place-items-center rounded-full", active ? "maara-orb-core-active" : "maara-orb-core-idle"),
				style: {
					width: size * .55,
					height: size * .55,
					background: "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--signal) 90%, white 12%) 0%, var(--signal) 38%, var(--sand) 100%)",
					boxShadow: "var(--shadow-signal)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end gap-1",
					style: { height: size * .16 },
					children: BAR_HEIGHTS.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "maara-orb-eq rounded-full",
						style: {
							width: 6,
							height: `${h}%`,
							background: "color-mix(in oklab, var(--signal-foreground) 80%, transparent)",
							animationDelay: `${BAR_DELAYS[i]}ms`,
							transformOrigin: "50% 100%"
						}
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 rounded-full",
				style: {
					background: "radial-gradient(circle, color-mix(in oklab, var(--signal) 18%, transparent) 0%, transparent 65%)",
					filter: "blur(8px)"
				}
			})
		]
	});
}
var OPTS = [
	{
		value: "auto",
		label: "Auto",
		emoji: "✨"
	},
	{
		value: "female",
		label: "Female",
		emoji: "👩"
	},
	{
		value: "male",
		label: "Male",
		emoji: "👨"
	}
];
function VoicePicker() {
	const { supported, gender, setGender } = useVoices();
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
	if (!supported) return null;
	const current = OPTS.find((o) => o.value === gender) ?? OPTS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			"aria-haspopup": "listbox",
			"aria-expanded": open,
			"aria-label": "Choose voice gender",
			className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3.5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: current?.label ?? "Auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sm:hidden",
					children: current?.emoji ?? "✨"
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			role: "listbox",
			"aria-label": "Voice gender",
			className: "absolute right-0 top-full z-30 mt-1 min-w-[140px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
			children: OPTS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				role: "option",
				"aria-selected": gender === o.value,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setGender(o.value);
						setOpen(false);
					},
					className: "flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors " + (gender === o.value ? "bg-signal/15 font-semibold text-signal" : "text-foreground hover:bg-surface-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: o.emoji
					}), o.label]
				})
			}, o.value))
		}) : null]
	});
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function getRecognitionCtor() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function useMaaraSession(opts) {
	const { docs, history, onAnswer, onError, forceLang, mode, userId } = opts;
	const [state, setState] = (0, import_react.useState)("idle");
	const [interim, setInterim] = (0, import_react.useState)("");
	const [finalText, setFinalText] = (0, import_react.useState)("");
	const [lang, setLang] = (0, import_react.useState)(forceLang ?? "en-US");
	const [error, setError] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const mountedRef = (0, import_react.useRef)(true);
	const busyRef = (0, import_react.useRef)(false);
	const historyRef = (0, import_react.useRef)(history);
	const docsRef = (0, import_react.useRef)(docs);
	const langRef = (0, import_react.useRef)(forceLang ?? "en-US");
	const onAnswerRef = (0, import_react.useRef)(onAnswer);
	const onErrorRef = (0, import_react.useRef)(onError);
	const modeRef = (0, import_react.useRef)(mode ?? "text");
	const userIdRef = (0, import_react.useRef)(userId);
	const stateRef = (0, import_react.useRef)("idle");
	const silenceTimerRef = (0, import_react.useRef)(null);
	const pendingTextRef = (0, import_react.useRef)("");
	const abortRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		historyRef.current = history;
	}, [history]);
	(0, import_react.useEffect)(() => {
		docsRef.current = docs;
	}, [docs]);
	(0, import_react.useEffect)(() => {
		if (forceLang) {
			langRef.current = forceLang;
			setLang(forceLang);
		}
	}, [forceLang]);
	(0, import_react.useEffect)(() => {
		onAnswerRef.current = onAnswer;
	}, [onAnswer]);
	(0, import_react.useEffect)(() => {
		onErrorRef.current = onError;
	}, [onError]);
	(0, import_react.useEffect)(() => {
		modeRef.current = mode ?? "text";
	}, [mode]);
	(0, import_react.useEffect)(() => {
		userIdRef.current = userId;
	}, [userId]);
	(0, import_react.useEffect)(() => {
		stateRef.current = state;
	}, [state]);
	const { supported: ttsSupported, voices: ttsVoices, gender: ttsGender, ttsProvider, elevenlabsAvailable } = useVoices();
	const supported = typeof window !== "undefined" && getRecognitionCtor() !== null;
	const speak$1 = (0, import_react.useCallback)(async (text, langForSpeech) => {
		if (typeof window !== "undefined" && window.speechSynthesis) try {
			window.speechSynthesis.cancel();
		} catch {}
		await speak(text, {
			userId: userIdRef.current,
			lang: langForSpeech,
			provider: ttsProvider,
			elevenlabsAvailable,
			gender: ttsGender
		});
	}, [
		ttsProvider,
		elevenlabsAvailable,
		ttsGender
	]);
	const askModel = (0, import_react.useCallback)(async (question, langForSpeech) => {
		const all = allChunks(docsRef.current);
		if (all.length === 0) throw new Error("No documents uploaded yet.");
		const top = scoreChunks(question, all, 3).map((c) => c.text);
		const hist = historyRef.current.slice(-8).map((m) => ({
			role: m.role,
			content: m.text
		}));
		const { answer } = await askChat({ data: {
			userId: userIdRef.current ?? "",
			question,
			chunks: top,
			history: hist,
			mode: modeRef.current,
			forceLang: langForSpeech
		} });
		return {
			answer,
			langForSpeech
		};
	}, []);
	const runCycle = (0, import_react.useCallback)(async (text, detectedLang) => {
		setState("thinking");
		if (abortRef.current) abortRef.current.abort();
		const controller = new AbortController();
		abortRef.current = controller;
		try {
			const { answer } = await askModel(text, detectedLang);
			if (!mountedRef.current || controller.signal.aborted) return;
			if (ttsSupported) {
				setState("speaking");
				await speak$1(answer, detectedLang);
			}
			if (!mountedRef.current || controller.signal.aborted) return;
			recordQuestion();
			onAnswerRef.current(text, answer);
		} catch (err) {
			if (controller.signal.aborted || err instanceof DOMException && err.name === "AbortError") return;
			console.error("Talk-with-Document ask failed", err);
			const raw = err instanceof Error ? err.message : "Unknown error";
			const isRateLimit = /rate limit/i.test(raw) || /\(429\)/.test(raw);
			const isBackend = isRateLimit || /GROQ_API_KEY/i.test(raw) || /GROQ request failed/i.test(raw) || /api error/i.test(raw) || /API error/i.test(raw) || /too large/i.test(raw);
			const msg = isRateLimit ? raw : isBackend ? "The voice service is temporarily unavailable. Please try again in a moment." : `I couldn't reach the model right now. ${raw}`;
			setError(msg);
			onErrorRef.current(msg);
			setState("error");
			return;
		}
		setInterim("");
		setFinalText("");
		setState("idle");
	}, [
		askModel,
		speak$1,
		ttsSupported
	]);
	const cancel = (0, import_react.useCallback)(() => {
		busyRef.current = false;
		if (abortRef.current) {
			try {
				abortRef.current.abort();
			} catch {}
			abortRef.current = null;
		}
		if (silenceTimerRef.current) {
			clearTimeout(silenceTimerRef.current);
			silenceTimerRef.current = null;
		}
		pendingTextRef.current = "";
		try {
			recognitionRef.current?.abort();
		} catch {}
		if (typeof window !== "undefined" && window.speechSynthesis) try {
			window.speechSynthesis.cancel();
		} catch {}
		setInterim("");
		setState("idle");
	}, []);
	const stop = (0, import_react.useCallback)(() => {
		try {
			recognitionRef.current?.stop();
		} catch {}
	}, []);
	const start = (0, import_react.useCallback)(() => {
		if (!supported) return;
		if (busyRef.current) {
			cancel();
			setTimeout(() => start(), 30);
			return;
		}
		busyRef.current = true;
		const Ctor = getRecognitionCtor();
		if (!Ctor) return;
		const rec = new Ctor();
		rec.lang = langRef.current;
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 3;
		const SILENCE_MS = 1400;
		const armSilenceTimer = () => {
			if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
			silenceTimerRef.current = setTimeout(() => {
				try {
					rec.stop();
				} catch {}
			}, SILENCE_MS);
		};
		rec.onresult = (event) => {
			let interimText = "";
			let finalTextLocal = "";
			let finalLang;
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const result = event.results[i];
				let best = null;
				for (let j = 0; j < result.length; j++) {
					const alt = result[j];
					if (!alt) continue;
					if (!best || alt.confidence > best.confidence) best = alt;
				}
				if (!best) continue;
				if (result.isFinal) {
					finalTextLocal += best.transcript;
					finalLang = finalLang ?? best.lang;
				} else interimText += best.transcript;
			}
			if (interimText) {
				setInterim(interimText);
				pendingTextRef.current = interimText;
				armSilenceTimer();
			}
			if (finalTextLocal) {
				const trimmed = finalTextLocal.trim();
				if (trimmed) {
					setFinalText(trimmed);
					setInterim("");
					pendingTextRef.current = "";
					if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
					if (finalLang) {
						langRef.current = finalLang;
						setLang(finalLang);
					}
					try {
						rec.stop();
					} catch {}
					runCycle(trimmed, finalLang ?? langRef.current);
				}
			}
		};
		rec.onerror = (e) => {
			if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
			const code = e.error ?? "";
			if (code === "no-speech" || code === "aborted") {
				setInterim("");
				busyRef.current = false;
				setState("idle");
				return;
			}
			const friendly = code === "not-allowed" || code === "service-not-allowed" ? "Microphone access was blocked. Click the lock icon in the address bar to allow it, then try again." : code === "audio-capture" ? "I can't find a microphone on this device." : code === "network" ? "Voice service is unreachable. Check your connection and try again." : "Voice input failed. Try again or type your question instead.";
			setError(friendly);
			onErrorRef.current(friendly);
			busyRef.current = false;
			setState("error");
		};
		rec.onend = () => {
			if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
			if (!mountedRef.current) return;
			if (stateRef.current === "listening") {
				busyRef.current = false;
				const pending = pendingTextRef.current.trim();
				if (pending) {
					pendingTextRef.current = "";
					setInterim("");
					setFinalText(pending);
					runCycle(pending, langRef.current);
					return;
				}
				setState("idle");
				setInterim("");
			}
		};
		recognitionRef.current = rec;
		setError(null);
		setInterim("");
		setFinalText("");
		pendingTextRef.current = "";
		setState("listening");
		try {
			rec.start();
		} catch (err) {
			console.error("recognition.start() threw", err);
			busyRef.current = false;
			setState("idle");
		}
	}, [
		supported,
		cancel,
		runCycle
	]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
			if (abortRef.current) {
				try {
					abortRef.current.abort();
				} catch {}
				abortRef.current = null;
			}
			try {
				recognitionRef.current?.abort();
			} catch {}
			if (typeof window !== "undefined" && window.speechSynthesis) try {
				window.speechSynthesis.cancel();
			} catch {}
		};
	}, []);
	return {
		state,
		interim,
		finalText,
		lang,
		error,
		start,
		stop,
		cancel,
		supported,
		ttsSupported,
		ttsVoices
	};
}
var STATE_HINTS = {
	idle: "Tap the mic and speak — Talk with Document listens, reads your file, and answers.",
	listening: "Listening…",
	thinking: "Reading your document…",
	speaking: "Speaking…",
	error: "Something went wrong. Tap the mic to try again."
};
function TalkPage() {
	const { session, loading } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const { docs } = useDocuments(session?.user?.id);
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({ to: "/login" });
	}, [
		loading,
		session,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		const html = document.documentElement;
		const prevHtmlOverflow = html.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;
		html.style.overflow = "hidden";
		document.body.style.overflow = "hidden";
		return () => {
			html.style.overflow = prevHtmlOverflow;
			document.body.style.overflow = prevBodyOverflow;
		};
	}, []);
	const { effectivePlan } = useUsage();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingShell, {});
	if (!session) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Talk with Document",
		className: "relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background",
		style: { height: "100dvh" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbientField, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-3 sm:px-8 sm:pt-[max(1rem,env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						"aria-label": "Back to dashboard",
						className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Dashboard"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-7 shrink-0 place-items-center rounded-lg bg-signal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-signal-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-base font-bold sm:text-lg",
							children: "Talk with Document"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoicePicker, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void navigate({ to: "/dashboard" }),
								"aria-label": "Close",
								className: "grid size-10 place-items-center rounded-full border border-border bg-surface/70 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					})
				]
			}),
			docs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoDocsScreen, { onClose: () => void navigate({ to: "/dashboard" }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {
				docs,
				isMobile,
				userId: session.user.id
			})
		]
	});
}
function Workspace({ docs, isMobile, userId }) {
	const { lang: manualLang } = useVoices();
	const detectedLang = (0, import_react.useMemo)(() => detectLangFromDocs(docs), [docs]);
	const pickedLang = manualLang === "en-US" ? detectedLang : manualLang;
	const { messages, setMessages } = useTalkMessages();
	const onAnswer = (0, import_react.useCallback)((q, a) => {
		setMessages((m) => {
			return [
				...m,
				{
					id: `u-${Date.now()}`,
					role: "user",
					text: q
				},
				{
					id: `a-${Date.now()}`,
					role: "assistant",
					text: a
				}
			].slice(-24);
		});
	}, [setMessages]);
	const onError = (0, import_react.useCallback)((msg) => {
		setMessages((m) => [...m, {
			id: `e-${Date.now()}`,
			role: "assistant",
			text: msg,
			error: true
		}].slice(-24));
	}, [setMessages]);
	const session = useMaaraSession({
		docs,
		history: (0, import_react.useMemo)(() => messages.slice(-12), [messages]),
		onAnswer,
		onError,
		forceLang: pickedLang,
		mode: "voice",
		userId
	});
	const endRef = (0, import_react.useRef)(null);
	const startRef = (0, import_react.useRef)(null);
	const transcriptRef = (0, import_react.useRef)(null);
	const [scrolledUp, setScrolledUp] = (0, import_react.useState)(false);
	const [scrolledDown, setScrolledDown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = transcriptRef.current;
		if (!el) return;
		const onScroll = () => {
			const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
			setScrolledUp(distanceFromBottom > 40);
			setScrolledDown(el.scrollTop > 40);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages,
		session.state,
		session.interim
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 flex flex-1 flex-col px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, { state: session.state }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaaraOrb, {
							state: session.state,
							size: isMobile ? 240 : 360,
							className: "relative z-10 motion-reduce:scale-90"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"aria-live": "polite",
						className: "max-w-md text-center text-sm text-muted-foreground",
						children: session.state === "listening" && session.interim ? `“${session.interim.trim()}”` : STATE_HINTS[session.state]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetectedLangBadge, { lang: pickedLang }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => session.start(),
						disabled: session.state === "thinking" || session.state === "listening",
						"aria-label": micLabel(session.state),
						className: "group relative grid place-items-center rounded-full transition-transform motion-reduce:transition-none " + (isMobile ? "size-16" : "size-20") + " " + (session.state === "listening" ? "bg-signal text-signal-foreground pulse-ring shadow-[var(--shadow-signal)]" : session.state === "speaking" ? "border-2 border-signal bg-signal/15 text-signal hover:bg-signal/25" : session.state === "thinking" ? "bg-signal text-signal-foreground shadow-[var(--shadow-signal)]" : session.state === "error" ? "border-2 border-red-400/40 bg-red-500/10 text-red-400 hover:bg-red-500/20" : "border-2 border-signal/40 bg-signal/10 text-signal hover:scale-105 hover:bg-signal/20"),
						children: session.state === "listening" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: isMobile ? "size-7" : "size-8" }) : session.state === "speaking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: isMobile ? "size-7" : "size-8" }) : session.state === "thinking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: isMobile ? "size-7" : "size-8 animate-spin" }) : session.state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: isMobile ? "size-7" : "size-8" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: isMobile ? "size-7" : "size-8" })
					})
				]
			}),
			session.error && session.state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "mx-auto mt-2 flex max-w-xl items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-3.5 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: session.error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => session.start(),
						className: "rounded-md border border-red-400/30 px-2 py-0.5 text-[11px] font-medium hover:bg-red-500/15",
						children: "Try again"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: transcriptRef,
				className: "relative mx-auto mt-3 w-full max-w-3xl flex-1 space-y-2 overflow-y-auto rounded-2xl border border-border bg-surface-2/40 p-3",
				style: {
					minHeight: 110,
					maxHeight: isMobile ? 160 : 220
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: startRef,
						"aria-hidden": true
					}),
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: "Your conversation will appear here. Speak in any language and Talk with Document answers in yours."
					}) : messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.role === "user" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-signal px-3 py-1.5 text-sm text-signal-foreground" : m.error ? "mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs text-red-400" : "mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-background px-3 py-1.5 text-sm text-foreground",
						children: m.text
					}, m.id ?? i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef }),
					scrolledUp && messages.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
						"aria-label": "Jump to latest",
						title: "Jump to latest",
						className: "absolute right-2 bottom-2 z-10 inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3" })
					}) : null,
					scrolledDown && messages.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => startRef.current?.scrollIntoView({ behavior: "smooth" }),
						"aria-label": "Jump to top of conversation",
						title: "Jump to top",
						className: "absolute left-2 bottom-2 z-10 inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3" })
					}) : null
				]
			})
		]
	});
}
function DetectedLangBadge({ lang }) {
	const label = LANG_DISPLAY[lang] ?? lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-1.5 rounded-full bg-signal",
				"aria-hidden": true
			}),
			"Detected · ",
			label
		]
	});
}
var LANG_DISPLAY = {
	"en-US": "English",
	"en-GB": "English (UK)",
	"en-IN": "English (IN)",
	"hi-IN": "हिन्दी",
	"bn-IN": "বাংলা",
	"te-IN": "తెలుగు",
	"ta-IN": "தமிழ்",
	"kn-IN": "ಕನ್ನಡ",
	"ml-IN": "മലയാളം",
	"gu-IN": "ગુજરાતી",
	"pa-IN": "ਪੰਜਾਬੀ",
	"mr-IN": "मराठी",
	"or-IN": "ଓଡ଼ିଆ",
	"ar-SA": "العربية",
	"ru-RU": "Русский",
	"zh-CN": "中文",
	"ja-JP": "日本語",
	"ko-KR": "한국어"
};
function ParticleField({ state }) {
	const count = state === "idle" ? 14 : 24;
	const speed = state === "idle" ? 18 : state === "error" ? 10 : 8;
	const particles = (0, import_react.useMemo)(() => Array.from({ length: count }, (_, i) => ({
		i,
		angle: i / count * Math.PI * 2,
		radius: 150 + i * 37 % 60,
		size: 2 + i % 3,
		delay: i * .4 % speed,
		drift: 6 + i % 5 * 2
	})), [count, speed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 grid place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			style: {
				width: 0,
				height: 0
			},
			children: particles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "maara-particle absolute rounded-full",
				style: {
					width: p.size,
					height: p.size,
					background: "color-mix(in oklab, var(--signal) 80%, transparent)",
					boxShadow: "0 0 8px color-mix(in oklab, var(--signal) 60%, transparent)",
					left: Math.cos(p.angle) * p.radius,
					top: Math.sin(p.angle) * p.radius,
					animationDuration: `${speed}s`,
					animationDelay: `${-p.delay}s`,
					"--drift": `${p.drift}px`
				}
			}, p.i))
		})
	});
}
function AmbientField() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 opacity-80",
		style: { background: "radial-gradient(circle at 50% 38%, color-mix(in oklab, var(--signal) 18%, transparent) 0%, transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--chart-3) 12%, transparent) 0%, transparent 50%)" }
	});
}
function LoadingShell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[100dvh] items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 place-items-center rounded-xl bg-signal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-[3px] bg-signal-foreground" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground uppercase",
				children: "Loading…"
			})]
		})
	});
}
function NoDocsScreen({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "m-auto flex max-w-md flex-col items-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-14 place-items-center rounded-full border border-signal/40 bg-signal/10 text-signal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold",
				children: "Upload a document first"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Talk with Document reads from your own files. Add at least one document and it will start talking to you — in the language it detects in your file, in any language your browser supports."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard",
				search: { view: "documents" },
				onClick: onClose,
				className: "inline-flex items-center gap-1.5 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-signal-foreground transition-transform hover:scale-[1.02]",
				children: ["Go to Documents ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 rotate-180" })]
			})
		]
	});
}
function micLabel(state) {
	switch (state) {
		case "listening": return "Listening — tap to stop";
		case "speaking": return "Tap to interrupt";
		case "thinking": return "Thinking…";
		case "error": return "Try again";
		default: return "Tap to speak";
	}
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalkPage, {}) });
//#endregion
export { SplitComponent as component };
