import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/env-CnwZZ4O7.js
var PLACEHOLDER_PATTERNS = [
	/^__.*__$/i,
	/^YOUR[_-].*$/i,
	/^replace[_-]with.*$/i,
	/^change[_-]?me$/i,
	/^placeholder$/i
];
function isPlaceholder(value) {
	return PLACEHOLDER_PATTERNS.some((p) => p.test(value.trim()));
}
var trimmedString = stringType().transform((s) => s.trim()).pipe(stringType().min(1));
var publicSchema = objectType({
	VITE_SUPABASE_URL: trimmedString,
	VITE_SUPABASE_ANON_KEY: trimmedString
});
var serverSchema = objectType({
	SUPABASE_SERVICE_ROLE_KEY: trimmedString,
	GROQ_API_KEY: trimmedString
});
var cached = null;
function validateEnv() {
	if (cached) return cached;
	const src = typeof process !== "undefined" && process.env ? process.env : {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGt6aXRhcG9maHNpZ3lsdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDA3MjcsImV4cCI6MjEwMjk3NjcyN30.q4wwi3Eb3D2r8VHuMmXZMK0o4rYihd4gHeTRMQPh97c",
		"VITE_SUPABASE_URL": "https://xnlkzitapofhsigylvht.supabase.co"
	};
	function collectMissing(schema, keys) {
		const raw = src;
		const missing = [];
		for (const key of keys) {
			const value = raw[key];
			if (!value || !value.trim() || isPlaceholder(value)) missing.push(key);
		}
		return missing;
	}
	const publicParsed = publicSchema.safeParse(src);
	const serverParsed = serverSchema.safeParse(src);
	const missing = {
		public: publicParsed.success ? [] : collectMissing(publicSchema, ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"]),
		server: serverParsed.success ? [] : collectMissing(serverSchema, ["SUPABASE_SERVICE_ROLE_KEY", "GROQ_API_KEY"])
	};
	cached = {
		public: publicParsed.success ? publicParsed.data : {},
		server: serverParsed.success ? serverParsed.data : {},
		missing
	};
	if (missing.public.length || missing.server.length) console.warn(`[env] missing keys — public: [${missing.public.join(", ")}]; server: [${missing.server.join(", ")}]`);
	return cached;
}
//#endregion
export { validateEnv as t };
