import { i as __toESM } from "../_runtime.mjs";
import { a as getServerFnById, i as createServerFn, s as __exportAll, t as TSS_SERVER_FUNCTION } from "./server-CgYtOA4r.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as validateEnv } from "./env-CnwZZ4O7.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-CxIN7Ch9.js
var url = "https://xnlkzitapofhsigylvht.supabase.co";
var anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGt6aXRhcG9maHNpZ3lsdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDA3MjcsImV4cCI6MjEwMjk3NjcyN30.q4wwi3Eb3D2r8VHuMmXZMK0o4rYihd4gHeTRMQPh97c";
/**
* Supabase browser client.
*
* When the env vars are unset (misconfigured deploy) we DO NOT call
* createClient("","") — that succeeds but throws later on first network
* call, taking the whole app down. Instead we lazily construct a real
* client only when both vars are present, and export a never-resolving
* proxy for the misconfigured case so any code path that touches
* `supabase` (auth state subscriptions, getSession, etc.) just hangs
* silently instead of throwing during module evaluation.
*
* Net effect: a deploy with missing env vars shows the marketing page
* (no auth), the login/signup forms show a clear inline error, and the
* rest of the UI keeps working. Without this, the same misconfig makes
* the page blank.
*/
var configured = Boolean(anonKey);
var placeholder = new Proxy({}, { get() {
	return () => new Promise(() => {});
} });
var supabase = configured ? createClient(url, anonKey, { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} }) : placeholder;
var SUPABASE_CONFIGURED = configured;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DnY1Bs6l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BxmSq11j.css";
var talkMessages = [];
var talkListeners = /* @__PURE__ */ new Set();
function emitTalk() {
	for (const fn of talkListeners) fn();
}
function subscribeTalk(listener) {
	talkListeners.add(listener);
	return () => {
		talkListeners.delete(listener);
	};
}
function getTalkSnapshot() {
	return talkMessages;
}
var EMPTY_SNAPSHOT = [];
function getTalkServerSnapshot() {
	return EMPTY_SNAPSHOT;
}
/**
* Read/write the talk-with-document transcript. Survives navigation away
* from /talk because the store is module-level (not React-state). Lives
* only in memory; a page reload clears it (the rolling transcript is
* ephemeral by design — /talk is ephemeral by design).
*/
function useTalkMessages() {
	return {
		messages: (0, import_react.useSyncExternalStore)(subscribeTalk, getTalkSnapshot, getTalkServerSnapshot),
		setMessages: (0, import_react.useCallback)((next) => {
			talkMessages = typeof next === "function" ? next(talkMessages) : next;
			emitTalk();
		}, [])
	};
}
/** Clear the talk transcript (used by future "Clear conversation" buttons). */
function clearTalkMessages() {
	talkMessages = [];
	emitTalk();
}
var CHAT_STORAGE_PREFIX = "telux:chat-history-v1";
var ANON_USER = "anon";
var CHAT_MAX_MESSAGES = 200;
function chatStorageKey(paneId, userId) {
	if (paneId) return `${CHAT_STORAGE_PREFIX}:${userId || ANON_USER}:${paneId}`;
	if (userId) return `${CHAT_STORAGE_PREFIX}:${userId}`;
	return CHAT_STORAGE_PREFIX;
}
var chatMessagesByKey = /* @__PURE__ */ new Map();
var chatListenersByKey = /* @__PURE__ */ new Map();
function loadChatFromStorage(storageKey) {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(storageKey);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((m) => m && typeof m === "object" && typeof m.id === "string" && (m.role === "user" || m.role === "assistant") && typeof m.text === "string");
	} catch {
		return [];
	}
}
function persistChat(storageKey, next) {
	if (typeof window === "undefined") return;
	try {
		const slice = next.length > CHAT_MAX_MESSAGES ? next.slice(-200) : next;
		window.localStorage.setItem(storageKey, JSON.stringify(slice));
	} catch {}
}
function emitChat(storageKey) {
	const set = chatListenersByKey.get(storageKey);
	if (!set) return;
	for (const l of set) l();
}
function subscribeChat(storageKey, listener) {
	let set = chatListenersByKey.get(storageKey);
	if (!set) {
		set = /* @__PURE__ */ new Set();
		chatListenersByKey.set(storageKey, set);
	}
	set.add(listener);
	return () => {
		set.delete(listener);
	};
}
function getChatSnapshot(storageKey) {
	let arr = chatMessagesByKey.get(storageKey);
	if (!arr) {
		arr = loadChatFromStorage(storageKey);
		chatMessagesByKey.set(storageKey, arr);
	}
	return arr;
}
function getChatServerSnapshot() {
	return EMPTY_SNAPSHOT;
}
/**
* Read/write the chat panel history. Persists across page reloads via
* `localStorage`. Survives navigation between Documents and Chat inside
* `/dashboard` because the store is module-level, not context-bound.
*
* Pass `paneId` to use a per-pane key (the Parallel tab does this so
* the two side-by-side chats don't clobber each other). Pass `userId`
* to use a per-user key (so two accounts on the same device see
* separate scrollback). Both can be combined:
*
*   useChatMessages("multiA", session?.user?.id)
*
* When neither is passed, falls back to the legacy key so users with a
* saved chat from before this change keep their scrollback.
*/
function useChatMessages(paneId = void 0, userId = void 0) {
	const storageKey = chatStorageKey(paneId, userId);
	return {
		messages: (0, import_react.useSyncExternalStore)((l) => subscribeChat(storageKey, l), () => getChatSnapshot(storageKey), getChatServerSnapshot),
		setMessages: (0, import_react.useCallback)((next) => {
			const current = getChatSnapshot(storageKey);
			const nextArr = typeof next === "function" ? next(current) : next;
			chatMessagesByKey.set(storageKey, nextArr);
			persistChat(storageKey, nextArr);
			emitChat(storageKey);
		}, [storageKey])
	};
}
/** Wipe the chat panel history. Pass `paneId` / `userId` to scope. */
function clearChatMessages(paneId = void 0, userId = void 0) {
	const storageKey = chatStorageKey(paneId, userId);
	chatMessagesByKey.set(storageKey, []);
	if (typeof window !== "undefined") try {
		window.localStorage.removeItem(storageKey);
	} catch {}
	emitChat(storageKey);
}
var DashboardStateContext = (0, import_react.createContext)(null);
/**
* Provider mounted around `DashboardPage`. Children must be inside the
* `/dashboard` route — outside the provider the hook throws.
*/
function DashboardStateProvider({ children }) {
	const value = (0, import_react.useMemo)(() => ({}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardStateContext.Provider, {
		value,
		children
	});
}
var LEGACY_CHAT_KEY = "telux:chat-history-v1";
var LEGACY_DONE_KEY = "telux:legacy-cleanup-v1-done";
/**
* Idempotent session-bound cleanup at sign-out. We intentionally do
* NOT wipe per-user data — chat history and IndexedDB documents are
* namespaced by user id, so each signed-in account sees only their own
* history on this device. The only thing we wipe is in-memory module
* state (so the next signed-in user starts with a blank session) and
* legacy un-namespaced storage keys from before per-user scoping was
* introduced.
*
* Safe to call multiple times — every step is idempotent.
*
* @param _userId Retained for back-compat. Previously used to scope
*                the IndexedDB document delete; that's no longer
*                needed because docs are already keyed by userId and
*                per-user docs must survive a sign-out so the next
*                sign-in picks them up.
*/
async function wipeLocalSessionData(_userId) {
	if (typeof window === "undefined") return;
	clearChatMessages();
	clearTalkMessages();
	try {
		if (!window.localStorage.getItem(LEGACY_DONE_KEY)) {
			window.localStorage.removeItem(LEGACY_CHAT_KEY);
			window.localStorage.setItem(LEGACY_DONE_KEY, "1");
		}
	} catch {}
	window.__telux_pendingSession = void 0;
	window.dispatchEvent(new CustomEvent("telux:documents-changed"));
	window.dispatchEvent(new CustomEvent("telux:usage-changed"));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var credentialsSchema = objectType({
	email: stringType().email().max(254),
	password: stringType().min(6).max(200)
});
createServerFn({ method: "POST" }).validator(credentialsSchema.extend({ fullName: stringType().max(120).optional() })).handler(createSsrRpc("fab498bba830f26c7e64d3fbec9ed5e4c42cd1816e5aafead3a8a7418165610f"));
var loginWithRateLimit = createServerFn({ method: "POST" }).validator(credentialsSchema).handler(createSsrRpc("36b1e867faa865129e675d549027d05693366aded94229666cf2b4df2d9daeb9"));
var AuthContext = (0, import_react.createContext)(null);
function setPendingSession(session) {
	if (typeof window === "undefined") return;
	if (window.__telux_pendingSession) window.__telux_pendingSession.resolve(session);
}
function consumePendingSession() {
	if (typeof window === "undefined") return null;
	const p = window.__telux_pendingSession;
	if (!p) return null;
	window.__telux_pendingSession = void 0;
	return p.promise;
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!SUPABASE_CONFIGURED) {
			setLoading(false);
			return;
		}
		let mounted = true;
		let wipeInFlight = false;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session ?? null);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
			if (!mounted) return;
			if (event === "SIGNED_OUT" || event !== "INITIAL_SESSION" && nextSession == null) {
				if (!wipeInFlight) {
					wipeInFlight = true;
					try {
						await wipeLocalSessionData(null);
					} catch (err) {
						console.warn("[AuthProvider] wipeLocalSessionData failed", err);
					} finally {
						window.setTimeout(() => {
							wipeInFlight = false;
						}, 250);
					}
				}
			}
			setSession(nextSession);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	const sessionRef = (0, import_react.useRef)(session);
	sessionRef.current = session;
	const signInRef = (0, import_react.useRef)(async () => ({ error: "not initialised" }));
	const signUpRef = (0, import_react.useRef)(async () => ({
		error: "not initialised",
		needsEmailConfirmation: false
	}));
	signInRef.current = async (email, password) => {
		if (!SUPABASE_CONFIGURED) return { error: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env." };
		try {
			const result = await loginWithRateLimit({ data: {
				email,
				password
			} });
			const { error: setErr, data: setData } = await supabase.auth.setSession({
				access_token: result.accessToken,
				refresh_token: result.refreshToken
			});
			if (setErr) return { error: "Signed in but the session could not be applied. Please refresh." };
			let resolved = setData?.session ?? null;
			if (!resolved) {
				const { data: fresh } = await supabase.auth.getSession();
				resolved = fresh.session ?? null;
			}
			if (resolved) setSession(resolved);
			setPendingSession(resolved);
			return { error: null };
		} catch (err) {
			return { error: err instanceof Error ? err.message : "Sign-in failed." };
		}
	};
	signUpRef.current = async (email, password, fullName) => {
		if (!SUPABASE_CONFIGURED) return {
			error: "Supabase is not configured.",
			needsEmailConfirmation: false
		};
		const origin = window.location.origin;
		const trimmedName = fullName?.trim() ? fullName.trim() : void 0;
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin.replace(/\/$/, "")}/auth/callback`,
				data: trimmedName ? { full_name: trimmedName } : void 0
			}
		});
		if (error) return {
			error: error.message,
			needsEmailConfirmation: false
		};
		if (data.session) {
			setSession(data.session);
			setPendingSession(data.session);
		}
		const user = data.user;
		return {
			error: null,
			needsEmailConfirmation: !Boolean(data.session) && user != null && user.email_confirmed_at == null
		};
	};
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		loading,
		configured: SUPABASE_CONFIGURED,
		signInWithPassword: (email, password) => signInRef.current(email, password),
		signUpWithPassword: (email, password, fullName) => signUpRef.current(email, password, fullName),
		async signInWithGoogle() {
			if (!SUPABASE_CONFIGURED) return { error: "Supabase is not configured." };
			const redirectTo = `${window.location.origin.replace(/\/$/, "")}/auth/callback`;
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo,
					queryParams: { prompt: "select_account" }
				}
			});
			return { error: error?.message ?? null };
		},
		async signOut() {
			if (!SUPABASE_CONFIGURED) return;
			const userId = sessionRef.current?.user?.id ?? null;
			await supabase.auth.signOut();
			try {
				await wipeLocalSessionData(userId);
			} catch (err) {
				console.warn("[useAuth.signOut] wipeLocalSessionData failed", err);
			}
		}
	}), [session, loading]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Telux — Chat with your documents, stored only on your device" },
			{
				name: "description",
				content: "Telux answers questions about your PDFs, reports and agreements while every file stays in your own device storage."
			},
			{
				name: "author",
				content: "Telux"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "no-js",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: "document.documentElement.classList.replace('no-js','js')" } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-KyteILpq.mjs");
var title$5 = "Telux — Chat with your PDFs and reports, stored only on your device";
var description$5 = "Telux lets you ask questions about PDFs, contracts, health papers and medical reports. Files stay in your own browser storage — Telux keeps nothing.";
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$5
		},
		{
			property: "og:title",
			content: title$5
		},
		{
			property: "og:description",
			content: description$5
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-D11i0ELS.mjs");
var title$4 = "Dashboard — Telux";
var description$4 = "Chat with your documents. Files stay on your device; only the relevant excerpt leaves.";
var Route$10 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$4
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./history-BwJi_y0Z.mjs");
var Route$9 = createFileRoute("/history")({
	head: () => ({ meta: [{ title: "History — Telux" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-CwFkAvmJ.mjs");
var title$3 = "Log in to Telux";
var description$3 = "Sign in to Telux and keep chatting with the documents stored on your device.";
var Route$8 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$3
		},
		{
			property: "og:description",
			content: description$3
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-BfHifXOi.mjs");
var title$2 = "Privacy Policy — Telux";
var description$2 = "Your documents never leave your device. Telux only sends a handful of pre-scored paragraphs and your question to a language model. Audio stays in your browser. No analytics, no tracking.";
var Route$7 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description$2
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "index, follow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./signup-BfwTL0J3.mjs");
var title$1 = "Create your Telux account";
var description$1 = "Sign up for Telux and start chatting with PDFs, reports and agreements kept only on your device.";
var Route$6 = createFileRoute("/signup")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description$1
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var BASE_URL = "";
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/signup",
				changefreq: "monthly",
				priority: "0.5"
			},
			{
				path: "/login",
				changefreq: "monthly",
				priority: "0.3"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$1 = () => import("./talk-BE4HBy8C.mjs");
var title = "Talk with Document — Telux";
var description = "Speak to your documents in any language. Talk with Document reads your files and answers out loud — Hindi, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi and more.";
var Route$4 = createFileRoute("/talk")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$3 = createFileRoute("/api/healthz")({ server: { handlers: { GET: async () => {
	const env = validateEnv();
	return Response.json({
		ok: true,
		service: "telux-chat-companion",
		env: {
			public: {
				VITE_SUPABASE_URL: env.public.VITE_SUPABASE_URL ? "set" : "missing",
				VITE_SUPABASE_ANON_KEY: env.public.VITE_SUPABASE_ANON_KEY ? "set" : "missing"
			},
			server: {
				SUPABASE_SERVICE_ROLE_KEY: env.server.SUPABASE_SERVICE_ROLE_KEY ? "set" : "missing",
				GROQ_API_KEY: env.server.GROQ_API_KEY ? "set" : "missing"
			}
		},
		missing: env.missing
	});
} } } });
var $$splitComponentImporter = () => import("./auth.callback-DIHGVuFl.mjs");
var Route$2 = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$1 = createFileRoute("/dashboard/documents")({ beforeLoad: () => {
	throw redirect({
		to: "/dashboard",
		search: { view: "documents" }
	});
} });
var Route = createFileRoute("/dashboard/history")({ beforeLoad: () => {
	throw redirect({ to: "/history" });
} });
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var DashboardRoute = Route$10.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$12
});
var HistoryRoute = Route$9.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$12
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$12
});
var PrivacyRoute = Route$7.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$12
});
var SignupRoute = Route$6.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$12
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$12
});
var TalkRoute = Route$4.update({
	id: "/talk",
	path: "/talk",
	getParentRoute: () => Route$12
});
var ApiHealthzRoute = Route$3.update({
	id: "/api/healthz",
	path: "/api/healthz",
	getParentRoute: () => Route$12
});
var AuthCallbackRoute = Route$2.update({
	id: "/auth/callback",
	path: "/auth/callback",
	getParentRoute: () => Route$12
});
var DashboardRouteChildren = {
	DashboardDocumentsRoute: Route$1.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => DashboardRoute
	}),
	DashboardHistoryRoute: Route.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => DashboardRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	HistoryRoute,
	LoginRoute,
	PrivacyRoute,
	SignupRoute,
	SitemapDotxmlRoute,
	TalkRoute,
	ApiHealthzRoute,
	AuthCallbackRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { DashboardStateProvider as a, useTalkMessages as c, createSsrRpc as i, SUPABASE_CONFIGURED as l, consumePendingSession as n, clearChatMessages as o, useAuth as r, useChatMessages as s, router_exports as t, supabase as u };
