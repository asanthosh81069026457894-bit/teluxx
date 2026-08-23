import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./router-DnY1Bs6l.mjs";
import { c as Sparkles, v as Mail } from "../_libs/lucide-react.mjs";
import { a as SubmitButton, c as translateAuthError, i as PasswordField, l as useFocusFirstEmpty, n as Field, o as readLastEmail, r as GoogleMark, s as rememberEmail, t as AuthLayout } from "./auth-helpers-DaeOKW_h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BfwTL0J3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignupPage() {
	const navigate = useNavigate();
	const { signUpWithPassword, signInWithGoogle, configured, session, loading } = useAuth();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [needsEmailConfirmation, setNeedsEmailConfirmation] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const nameRef = (0, import_react.useRef)(null);
	const emailRef = (0, import_react.useRef)(null);
	const passwordRef = (0, import_react.useRef)(null);
	useFocusFirstEmpty([
		nameRef,
		emailRef,
		passwordRef
	]);
	(0, import_react.useEffect)(() => {
		const last = readLastEmail();
		if (last && !email) setEmail(last);
	}, []);
	(0, import_react.useEffect)(() => {
		if (loading || !session) return;
		navigate({ to: "/dashboard" });
	}, [
		loading,
		session,
		navigate
	]);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setPhase("submitting");
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
		const { error: err, needsEmailConfirmation: needsConfirm } = await signUpWithPassword(email, password, fullName);
		if (err) {
			console.error("signup failed", err);
			setError(translateAuthError(err));
			setPhase("idle");
			if (typeof window !== "undefined") window.__telux_pendingSession = void 0;
			return;
		}
		rememberEmail(email);
		if (needsConfirm) {
			setNeedsEmailConfirmation(true);
			setPhase("idle");
			if (typeof window !== "undefined") window.__telux_pendingSession = void 0;
			return;
		}
		setPhase("done");
		await navigate({ to: "/dashboard" });
	}
	async function onGoogle() {
		setError(null);
		setPhase("submitting");
		const { error: err } = await signInWithGoogle();
		if (err) {
			console.error("google signup failed", err);
			setError(translateAuthError(err));
			setPhase("idle");
		}
	}
	if (needsEmailConfirmation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		eyebrow: "Almost there",
		title: "Check your email",
		subtitle: `We sent a confirmation link to ${email}. Click it to finish setting up your account.`,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "font-medium text-signal hover:underline",
			children: "Back to log in"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "The link expires in 24 hours. If you don't see the email, check your spam folder."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		eyebrow: "Get started",
		title: "Create your account",
		subtitle: "Free plan, no card. Your files never leave this device.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Already with us?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-medium text-signal hover:underline",
				children: "Log in"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit,
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Full name",
					type: "text",
					placeholder: "Your name",
					autoComplete: "name",
					value: fullName,
					onChange: (e) => setFullName(e.currentTarget.value),
					required: true,
					id: "signup-name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: emailRef,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						type: "email",
						placeholder: "you@example.com",
						autoComplete: "email",
						value: email,
						onChange: (e) => setEmail(e.currentTarget.value),
						required: true,
						id: "signup-email"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "Password",
					value: password,
					onChange: setPassword,
					autoComplete: "new-password",
					showStrength: true,
					id: "signup-password"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					role: "alert",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-400",
						children: error
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Need help?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "text-signal hover:underline",
								children: "Log in instead"
							})
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					phase,
					idleLabel: "Create account",
					icon: Sparkles,
					disabled: !configured
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-xs tracking-widest text-muted-foreground uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"or",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onGoogle,
					disabled: !configured || phase !== "idle",
					className: "flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-surface-2/60 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {}), "Continue with Google"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-1.5 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), "We store your email — never your documents"]
				})
			]
		})
	});
}
//#endregion
export { SignupPage as component };
