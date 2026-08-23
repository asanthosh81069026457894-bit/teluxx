import { t as TSS_SERVER_FUNCTION } from "./server-CgYtOA4r.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabaseServer-Ccd90Lx7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var cached = null;
var cachedAnon = null;
/**
* Marker error thrown when the service-role client is requested but the
* server's environment variables are not set. ServerFns catch this and
* translate it into a "no row found" response (or a no-op write) so the
* dashboard mounts even when the developer hasn't provisioned Supabase yet.
*
* The browser NEVER sees the message text — it's intercepted at the
* serverFn layer. The operator only sees it in server logs / console.
*/
var SupabaseNotConfiguredError = class extends Error {
	constructor() {
		super("Supabase server client not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment (server-only).");
		this.name = "SupabaseNotConfiguredError";
	}
};
/**
* True when the runtime hasn't been provisioned with SUPABASE_URL +
* SUPABASE_SERVICE_ROLE_KEY. Useful for serverFns that want to short-circuit
* with a "no row" response instead of an exception when the dev hasn't
* configured the backend yet.
*/
function isSupabaseConfigured() {
	const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
	const key = readServiceRoleKey();
	return Boolean(url && key);
}
/**
* Read + sanitize the service-role key from process.env.
*
* Why sanitize: editors on Windows routinely write files with trailing
* `\r\n` per line. Vite's dotenv loader strips the trailing `\n` but
* sometimes leaves the `\r`. Supabase's `Invalid API key` is the
* generic error returned whenever the JWT parse fails — and a stray
* `\r` at the end of the key is enough to fail the parse. Trimming
* whitespace + control characters here is a one-line fix that has
* rescued two deployments in our logs.
*/
function readServiceRoleKey() {
	const raw = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!raw) return void 0;
	const cleaned = raw.replace(/^[\s\x00-\x1F]+|[\s\x00-\x1F]+$/g, "");
	return cleaned.length > 0 ? cleaned : void 0;
}
function getServiceClient() {
	if (cached) return cached;
	const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
	const key = readServiceRoleKey();
	if (!url || !key) throw new SupabaseNotConfiguredError();
	cached = createClient(url, key, { auth: {
		autoRefreshToken: false,
		persistSession: false,
		detectSessionInUrl: false
	} });
	return cached;
}
/**
* Anon-key Supabase client for use from serverFns. We use this for
* signup / login flows because:
*   - The service-role client would mint a session with FULL ADMIN
*     privileges — sending that back to the browser would escalate the
*     user's effective permissions to RLS-bypass.
*   - The anon client is gated by RLS just like the browser-side client,
*     so the resulting session carries the user's actual role.
*
* Memoised per process. Vite's `import.meta.env.VITE_SUPABASE_*` would
* inline the URL into the build, but on the server we read from
* `process.env` (Vercel sets it as a runtime env var). The VITE_-prefixed
* values are present too because TanStack's build propagates them.
*/
function getAnonClient() {
	if (cachedAnon) return cachedAnon;
	const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
	const anon = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
	if (!url || !anon) throw new SupabaseNotConfiguredError();
	cachedAnon = createClient(url, anon, { auth: {
		autoRefreshToken: false,
		persistSession: false,
		detectSessionInUrl: false
	} });
	return cachedAnon;
}
/**
* Cheap existence check for a user id. Used by the chat proxy as a ROI guard:
* we don't want to spend rate-limit tokens or Groq tokens on a fabricated
* userId. Returns false (and logs a warning) when Supabase isn't configured
* — in that case we fall back to trusting the caller and the rate limiter
* does its job instead.
*
* We do NOT throw on missing backend; the chat proxy degrades gracefully.
*/
async function userIdExists(userId) {
	if (!isSupabaseConfigured()) return true;
	const { data, error } = await getServiceClient().auth.admin.getUserById(userId);
	if (error) {
		console.warn("[supabaseServer] userIdExists: auth lookup failed", error.message);
		return true;
	}
	return data?.user != null;
}
/**
* Read the onboarding row for a user, or null if it doesn't exist (the user
* hasn't completed the onboarding form yet). Returns null (with a console
* warn) when Supabase isn't configured so the dashboard stays usable in dev
* — AuthGate then treats the user as "onboarding not done" and the modal
* still renders (it just fails to submit if the backend is offline).
*/
async function readOnboardingRow(userId) {
	if (!isSupabaseConfigured()) {
		console.warn("[supabaseServer] readOnboardingRow: Supabase not configured, returning null");
		return null;
	}
	const { data, error } = await getServiceClient().from("onboarding_responses").select("user_id, full_name, reply_lang, age, hear_about, created_at, updated_at").eq("user_id", userId).maybeSingle();
	if (error && error.code === "PGRST205") {
		console.warn("[supabaseServer] readOnboardingRow: onboarding_responses table missing — treating as not onboarded");
		return null;
	}
	if (error) throw new Error(humanizeSupabaseError("read onboarding", error.message));
	return data ?? null;
}
/**
* Upsert a row into `public.onboarding_responses`. The PK is `user_id`, so
* a second call for the same user overwrites — this matches the modal's
* "you can correct your answers" intent and keeps the schema minimal (no
* separate history table for what's effectively a one-shot form).
*
* `age` and `hear_about` are nullable on the schema; the current modal
* always passes null for them (the trial-era questions were removed).
*
* PGRST205 ("table not found") is treated as a successful no-op. The
* current 0002 migration drops `onboarding_responses` because the signup
* form captures `full_name` directly into `auth.users.raw_user_meta_data`
* — the row is a legacy analytics convenience, not a gate. Throwing here
* would surface a confusing "table isn't set up" error to the user for
* what is actually a normal, supported state. We log a warning and return
* a synthetic row built from the inputs so callers can treat it like a
* normal write.
*/
async function writeOnboardingRow(userId, patch) {
	if (!isSupabaseConfigured()) {
		console.warn("[supabaseServer] writeOnboardingRow: Supabase not configured, returning synthetic row");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return {
			user_id: userId,
			created_at: now,
			updated_at: now,
			...patch
		};
	}
	const { data, error } = await getServiceClient().from("onboarding_responses").upsert({
		user_id: userId,
		...patch
	}, { onConflict: "user_id" }).select("user_id, full_name, reply_lang, age, hear_about, created_at, updated_at").single();
	if (error && error.code === "PGRST205") {
		console.warn("[supabaseServer] writeOnboardingRow: onboarding_responses table missing — signup captures full_name directly, treating as no-op");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return {
			user_id: userId,
			created_at: now,
			updated_at: now,
			...patch
		};
	}
	if (error) throw new Error(humanizeSupabaseError("write onboarding", error.message));
	return data;
}
/**
* Translate a Supabase error message into an actionable hint for the operator.
* The user-facing forms only show a safe generic message; the operator sees
* this detail in the deploy / console logs.
*
* The cases we cover (in order of frequency we've seen):
*   1. "Invalid API key" / "Invalid JWT" / "JWT expired"
*        → service-role key is missing, malformed, rotated, or wrong
*          (often the anon key was pasted by accident — they look identical).
*   2. "permission denied" / "row-level security"
*        → the SQL GRANTs to `service_role` haven't been run yet.
*   3. "relation … does not exist"
*        → the SQL migration creating that table hasn't been run yet.
*   4. everything else → fall through with the raw message.
*
* The `what` argument is a short human label (e.g. "read subscription")
* that's woven into the more specific cases so the operator can grep
* the deploy logs.
*/
function humanizeSupabaseError(what, message) {
	const m = message.toLowerCase();
	if (m.includes("invalid api key") || m.includes("invalid jwt") || m.includes("jwt expired")) return `Failed to ${what}: the Supabase service-role key in the server's environment is missing, malformed, or not the \`service_role\` row from Project Settings → API. Open .env, copy the \`service_role\` (NOT \`anon\`) key, restart the dev server.`;
	if (m.includes("permission denied") || m.includes("row-level security")) return `Failed to ${what}: row-level security rejected the write. Run \`supabase/sql/0002_subscriptions_and_onboarding.sql\` in the Supabase SQL Editor — it GRANTs INSERT/UPDATE to the service role on \`subscriptions\`.`;
	if (m.includes("does not exist") && (m.includes("relation") || m.includes("table"))) return `Failed to ${what}: a required table is missing from your Supabase project. Run \`supabase/sql/0002_subscriptions_and_onboarding.sql\` in the Supabase SQL Editor.`;
	return `Failed to ${what}: ${message}`;
}
//#endregion
export { userIdExists as a, readOnboardingRow as i, getAnonClient as n, writeOnboardingRow as o, isSupabaseConfigured as r, createServerRpc as t };
