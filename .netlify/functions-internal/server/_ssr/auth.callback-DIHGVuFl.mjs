import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as SUPABASE_CONFIGURED, u as supabase } from "./router-DnY1Bs6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-DIHGVuFl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function setPendingSession(session) {
	if (typeof window === "undefined") return;
	if (window.__telux_pendingSession) window.__telux_pendingSession.resolve(session);
}
function AuthCallbackPage() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!SUPABASE_CONFIGURED) {
			setError("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.");
			return;
		}
		if (typeof window !== "undefined") {
			let resolve;
			const promise = new Promise((r) => {
				resolve = r;
			});
			window.__telux_pendingSession = {
				promise,
				resolve
			};
		}
		let cancelled = false;
		const commitAndNavigate = (session) => {
			if (cancelled) return;
			setPendingSession(session);
			navigate({ to: "/dashboard" });
		};
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			if (cancelled) return;
			if (session) commitAndNavigate(session);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (cancelled) return;
			if (data.session) commitAndNavigate(data.session);
		});
		const timeout = window.setTimeout(() => {
			if (cancelled) return;
			setError("Sign-in didn't complete. Please try again.");
			if (typeof window !== "undefined") window.__telux_pendingSession = void 0;
			navigate({ to: "/login" });
		}, 8e3);
		return () => {
			cancelled = true;
			sub.subscription.unsubscribe();
			window.clearTimeout(timeout);
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight text-foreground",
				children: error ? "Sign-in failed" : "Finishing sign-in…"
			}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error
			}) : null]
		})
	});
}
//#endregion
export { AuthCallbackPage as component };
