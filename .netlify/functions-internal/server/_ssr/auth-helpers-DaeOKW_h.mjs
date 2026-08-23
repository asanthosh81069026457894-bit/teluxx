import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Eye, a as Trash2, k as EyeOff, l as ShieldCheck, x as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-helpers-DaeOKW_h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var points = [
	{
		icon: Lock,
		text: "Documents stay in your device storage"
	},
	{
		icon: Trash2,
		text: "Wipe everything with a single tap"
	},
	{
		icon: ShieldCheck,
		text: "Never used for model training"
	}
];
function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-veil" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 veil-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid min-h-screen max-w-6xl gap-12 px-5 py-10 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-[3px] bg-signal-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-bold",
								children: "telux"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-14 max-w-md text-4xl font-bold",
							children: [
								"The only document tool that keeps ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-signal-gradient",
									children: "nothing"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 space-y-4",
							children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-lg border border-border bg-surface",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "size-4 text-signal" })
								}), p.text]
							}, p.text))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mx-auto w-full max-w-md p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "mb-8 flex items-center gap-2.5 lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-[3px] bg-signal-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-bold",
								children: "telux"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-3xl font-bold",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 text-center text-sm text-muted-foreground",
							children: footer
						})
					]
				})]
			})
		]
	});
}
function Field({ label, type, placeholder, autoComplete, value, onChange, required, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type,
			placeholder,
			autoComplete,
			value,
			onChange,
			required,
			className: "mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
		})]
	});
}
var LAST_EMAIL_KEY = "telux:last-email";
function readLastEmail() {
	if (typeof window === "undefined") return "";
	try {
		return window.localStorage.getItem(LAST_EMAIL_KEY) ?? "";
	} catch {
		return "";
	}
}
function rememberEmail(email) {
	if (typeof window === "undefined" || !email) return;
	try {
		window.localStorage.setItem(LAST_EMAIL_KEY, email);
	} catch {}
}
var STRENGTH_LABEL = {
	0: "Too short",
	1: "Weak",
	2: "Okay",
	3: "Strong",
	4: "Excellent"
};
var STRENGTH_COLOR = {
	0: "bg-red-500",
	1: "bg-orange-500",
	2: "bg-amber-500",
	3: "bg-emerald-500",
	4: "bg-emerald-400"
};
/**
* Score a password 0-4. We deliberately keep this client-side only — a
* signup form can show the meter without round-tripping to a server, and
* Supabase's password policy is the only hard requirement.
*
* Heuristics (in order of weight):
*   - Length >= 8 (minimum)
*   - Length >= 12
*   - Mix of upper + lower
*   - Has a digit
*   - Has a symbol
*/
function scorePassword(pw) {
	if (pw.length < 8) return {
		score: 0,
		label: STRENGTH_LABEL[0],
		color: STRENGTH_COLOR[0]
	};
	let s = 1;
	if (pw.length >= 12) s += 1;
	if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1;
	if (/\d/.test(pw)) s += 1;
	if (/[^A-Za-z0-9]/.test(pw)) s += 1;
	const score = Math.min(4, s);
	return {
		score,
		label: STRENGTH_LABEL[score],
		color: STRENGTH_COLOR[score]
	};
}
/**
* Map the raw Supabase auth error messages to something a human can act on.
* Supabase intentionally returns terse, security-aware messages (e.g.
* "Invalid login credentials") which are correct but unhelpful for the
* user who typed the wrong email OR the wrong password.
*
* We never leak internal state — the translated messages are all generic
* enough to be safe in both flows.
*/
function translateAuthError(message) {
	if (!message) return "Something went wrong. Please try again.";
	const m = message.toLowerCase();
	if (m.includes("invalid login credentials") || m.includes("invalid email or password")) return "Email or password is wrong. Double-check both and try again.";
	if (m.includes("user already registered") || m.includes("already been registered")) return "An account with this email already exists. Try logging in instead.";
	if (m.includes("email not confirmed")) return "Check your inbox — we sent a confirmation link to that email.";
	if (m.includes("password should be at least") || m.includes("password is too short")) return "Password is too short. Use at least 8 characters.";
	if (m.includes("rate limit") || m.includes("too many requests")) return "Too many attempts. Wait a moment and try again.";
	if (m.includes("network") || m.includes("fetch")) return "Network hiccup. Check your connection and try again.";
	if (m.includes("email") && m.includes("invalid")) return "That email address doesn't look right.";
	if (m.includes("signup") && m.includes("disabled")) return "Signups are temporarily disabled. Try again in a few minutes.";
	return "Couldn't complete that. Please try again.";
}
function PasswordField({ id, label, value, onChange, autoComplete, required = true, showStrength = false }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const strength = scorePassword(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: visible ? "text" : "password",
				placeholder: "••••••••",
				autoComplete,
				value,
				onChange: (e) => onChange(e.currentTarget.value),
				required,
				className: "w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setVisible((v) => !v),
				"aria-label": visible ? "Hide password" : "Show password",
				"aria-pressed": visible,
				className: "absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
				children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
			})]
		})]
	}), showStrength && value.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 gap-1",
			children: [
				1,
				2,
				3,
				4,
				5
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 flex-1 rounded-full transition-colors " + (i <= strength.score ? strength.color : "bg-border") }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted-foreground",
			children: strength.label
		})]
	}) : null] });
}
/**
* On mount, focus the first empty field. Returning users (who saved their
* email) will land in the password field, where the cursor does the most
* good.
*/
function useFocusFirstEmpty(fieldRefs) {
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (done.current) return;
		for (const ref of fieldRefs) {
			const node = ref.current;
			if (node && !node.value) {
				node.focus();
				done.current = true;
				return;
			}
		}
		if (fieldRefs[0]?.current) {
			fieldRefs[0].current.focus();
			done.current = true;
		}
	}, [fieldRefs]);
}
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 24 24",
		className: "size-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA4335",
			d: "M12 10.2v3.94h5.51c-.24 1.32-1.66 3.86-5.51 3.86-3.32 0-6.03-2.75-6.03-6.14S8.68 5.72 12 5.72c1.89 0 3.16.81 3.89 1.5l2.65-2.56C16.95 3.18 14.68 2.2 12 2.2 6.92 2.2 2.86 6.26 2.86 11.34S6.92 20.48 12 20.48c6.93 0 9.04-4.85 9.04-7.34 0-.5-.05-.88-.12-1.26H12Z"
		})
	});
}
function SubmitButton({ phase, idleLabel, icon: Icon, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "submit",
		disabled: disabled || phase !== "idle",
		className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal py-3 font-semibold text-signal-foreground transition-transform hover:scale-[1.01] disabled:cursor-progress disabled:opacity-70",
		children: [phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-4 animate-spin rounded-full border-2 border-signal-foreground/40 border-t-signal-foreground" }) : Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: phase === "submitting" ? "Creating account…" : phase === "trial" ? "Starting your 3-day trial…" : phase === "done" ? "All set — opening dashboard" : idleLabel })]
	});
}
//#endregion
export { SubmitButton as a, translateAuthError as c, PasswordField as i, useFocusFirstEmpty as l, Field as n, readLastEmail as o, GoogleMark as r, rememberEmail as s, AuthLayout as t };
