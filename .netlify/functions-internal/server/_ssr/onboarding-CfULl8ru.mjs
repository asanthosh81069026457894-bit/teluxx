import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { i as readOnboardingRow, o as writeOnboardingRow, r as isSupabaseConfigured, t as createServerRpc } from "./supabaseServer-Ccd90Lx7.mjs";
import { n as consume } from "./rate-limit-CZrX3sfM.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CfULl8ru.js
var answersSchema = objectType({
	userId: stringType().uuid(),
	fullName: stringType().trim().min(1, "Please enter your name").max(120),
	replyLang: stringType().min(2).max(20).default("en-US")
});
var getOnboardingStatus_createServerFn_handler = createServerRpc({
	id: "a0562426ee8b25990e7a0ccc241b6598eb75ad6107b665d19432ba4bc6a8337e",
	name: "getOnboardingStatus",
	filename: "src/serverFns/onboarding.ts"
}, (opts) => getOnboardingStatus.__executeServer(opts));
var getOnboardingStatus = createServerFn({ method: "POST" }).validator(objectType({ userId: stringType().uuid() })).handler(getOnboardingStatus_createServerFn_handler, async ({ data }) => {
	if (!isSupabaseConfigured()) return { completed: true };
	try {
		return { completed: await readOnboardingRow(data.userId) != null };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.includes("onboarding_responses") && msg.includes("PGRST205")) {
			console.warn("[onboarding] getOnboardingStatus: table missing, treating as completed");
			return { completed: true };
		}
		throw err;
	}
});
var submitOnboarding_createServerFn_handler = createServerRpc({
	id: "0fd579966613ec2798851249efcce670896412c89269deb12f2caba9006062ec",
	name: "submitOnboarding",
	filename: "src/serverFns/onboarding.ts"
}, (opts) => submitOnboarding.__executeServer(opts));
var submitOnboarding = createServerFn({ method: "POST" }).validator(answersSchema).handler(submitOnboarding_createServerFn_handler, async ({ data }) => {
	if (!consume(`onboarding:${data.userId}`, {
		capacity: 5,
		windowMs: 36e5
	}).ok) throw new Error("Slow down — please wait a minute before resubmitting.");
	if (!isSupabaseConfigured()) throw new Error("The backend isn't reachable right now. Please try again in a moment.");
	await writeOnboardingRow(data.userId, {
		full_name: data.fullName,
		age: null,
		hear_about: null,
		reply_lang: data.replyLang
	});
	return { completed: true };
});
//#endregion
export { getOnboardingStatus_createServerFn_handler, submitOnboarding_createServerFn_handler };
