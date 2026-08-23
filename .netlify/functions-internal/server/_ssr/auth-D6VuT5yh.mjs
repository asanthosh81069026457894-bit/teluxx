import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { n as getAnonClient, t as createServerRpc } from "./supabaseServer-Ccd90Lx7.mjs";
import { r as enforceRateLimit, t as TooManyRequestsError } from "./rate-limit-CZrX3sfM.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D6VuT5yh.js
var credentialsSchema = objectType({
	email: stringType().email().max(254),
	password: stringType().min(6).max(200)
});
function normaliseEmail(email) {
	return email.trim().toLowerCase();
}
var signupWithRateLimit_createServerFn_handler = createServerRpc({
	id: "fab498bba830f26c7e64d3fbec9ed5e4c42cd1816e5aafead3a8a7418165610f",
	name: "signupWithRateLimit",
	filename: "src/serverFns/auth.ts"
}, (opts) => signupWithRateLimit.__executeServer(opts));
var signupWithRateLimit = createServerFn({ method: "POST" }).validator(credentialsSchema.extend({ fullName: stringType().max(120).optional() })).handler(signupWithRateLimit_createServerFn_handler, async ({ data, context }) => {
	const ip = context.ip ?? "unknown";
	const email = normaliseEmail(data.email);
	enforceRateLimit(`signup:ip:${ip}`, {
		capacity: 5,
		windowMs: 36e5
	}, "signup attempts");
	enforceRateLimit(`signup:email:${email}`, {
		capacity: 3,
		windowMs: 864e5
	}, "signup attempts for this email");
	const supabase = getAnonClient();
	const headers = context.headers ?? new Headers();
	const origin = headers.get("origin") ?? headers.get("referer")?.replace(/\/$/, "") ?? "";
	const safeOrigin = origin.startsWith("http") ? origin.replace(/\/$/, "") : "";
	const { data: result, error } = await supabase.auth.signUp({
		email,
		password: data.password,
		options: {
			emailRedirectTo: safeOrigin ? `${safeOrigin}/auth/callback` : void 0,
			data: data.fullName?.trim() ? { full_name: data.fullName.trim() } : void 0
		}
	});
	if (error) {
		const msg = error.message.toLowerCase();
		if (msg.includes("already registered") || msg.includes("already been registered")) throw new Error("An account with this email already exists. Try signing in instead.");
		if (msg.includes("rate limit") || msg.includes("too many")) throw new TooManyRequestsError(36e5, "signup attempts from this network");
		throw new Error(error.message);
	}
	return {
		userId: result.user?.id ?? null,
		needsEmailConfirmation: result.session == null && result.user != null && result.user.email_confirmed_at == null
	};
});
var loginWithRateLimit_createServerFn_handler = createServerRpc({
	id: "36b1e867faa865129e675d549027d05693366aded94229666cf2b4df2d9daeb9",
	name: "loginWithRateLimit",
	filename: "src/serverFns/auth.ts"
}, (opts) => loginWithRateLimit.__executeServer(opts));
var loginWithRateLimit = createServerFn({ method: "POST" }).validator(credentialsSchema).handler(loginWithRateLimit_createServerFn_handler, async ({ data, context }) => {
	const ip = context.ip ?? "unknown";
	const email = normaliseEmail(data.email);
	enforceRateLimit(`login:ip:${ip}`, {
		capacity: 20,
		windowMs: 6e5
	}, "login attempts");
	enforceRateLimit(`login:email:${email}`, {
		capacity: 10,
		windowMs: 6e5
	}, "login attempts for this account");
	const { data: result, error } = await getAnonClient().auth.signInWithPassword({
		email,
		password: data.password
	});
	if (error) {
		const msg = error.message.toLowerCase();
		if (msg.includes("invalid login credentials")) throw new Error("Email or password is wrong. Double-check both and try again.");
		if (msg.includes("email not confirmed")) throw new Error("Please confirm your email first — check your inbox for the link.");
		throw new Error(error.message);
	}
	if (!result.session) throw new Error("Login succeeded but no session was returned. Please try again.");
	return {
		accessToken: result.session.access_token,
		refreshToken: result.session.refresh_token,
		expiresAt: result.session.expires_at,
		userId: result.user?.id ?? null
	};
});
//#endregion
export { loginWithRateLimit_createServerFn_handler, signupWithRateLimit_createServerFn_handler };
