import { n as __exportAll } from "../_runtime.mjs";
import { i as createServerFn, s as __exportAll$1 } from "./server-CgYtOA4r.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { i as createSsrRpc } from "./router-DnY1Bs6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tts-DTe6fUmD.js
var tts_DTe6fUmD_exports = /* @__PURE__ */ __exportAll({
	a: () => tts_exports,
	i: () => synthesizeSpeech,
	n: () => ElevenLabsRateLimitedError,
	r: () => ElevenLabsUpstreamError,
	t: () => ElevenLabsNotConfiguredError
});
var tts_exports = /* @__PURE__ */ __exportAll$1({
	ElevenLabsNotConfiguredError: () => ElevenLabsNotConfiguredError,
	ElevenLabsRateLimitedError: () => ElevenLabsRateLimitedError,
	ElevenLabsUpstreamError: () => ElevenLabsUpstreamError,
	getTtsConfig: () => getTtsConfig,
	synthesizeSpeech: () => synthesizeSpeech
});
/**
* ElevenLabs exposes per-language voice models. For Indian languages the
* "Eleven Multilingual v2" model is the one that sounds natural; English
* can use either "Multilingual v2" or the legacy "Eleven Turbo v2.5" for
* lower latency. We default to the multilingual model since the user is
* overwhelmingly likely to want a non-English voice when their picker
* isn't English.
*/
var ElevenLabsNotConfiguredError = class extends Error {
	code = "ELEVENLABS_NOT_CONFIGURED";
	constructor() {
		super("ElevenLabs is not configured on the server.");
		this.name = "ElevenLabsNotConfiguredError";
	}
};
var ElevenLabsUpstreamError = class extends Error {
	code = "ELEVENLABS_UPSTREAM";
	constructor(message = "ElevenLabs is temporarily unavailable.") {
		super(message);
		this.name = "ElevenLabsUpstreamError";
	}
};
var ElevenLabsRateLimitedError = class extends Error {
	code = "ELEVENLABS_RATE_LIMITED";
	retryAfterMs;
	constructor(retryAfterMs) {
		super("ElevenLabs rate limit reached — falling back to browser voice.");
		this.name = "ElevenLabsRateLimitedError";
		this.retryAfterMs = retryAfterMs;
	}
};
/**
* Cheap probe used by useVoices() to decide whether to render the
* "ElevenLabs" option in the TTS provider picker. Returns whether the
* server has the key configured — NEVER returns the key itself.
*
* Requires the caller to be signed in (we use the user id to scope the
* rate limit, so anonymous probes would defeat the purpose).
*/
var getTtsConfig = createServerFn({ method: "POST" }).validator(objectType({ userId: stringType().uuid().optional() })).handler(createSsrRpc("9d6e20cfabdc6c1449b66d25da403796ceb1d73b12b5d99851d1511b67e3ae99"));
/**
* Synthesise speech for the given text. Returns base64-encoded MP3 that
* the client plays through an <audio> element.
*
* Auth: the user id is supplied by the caller. We rate-limit per-user and
* verify the user exists in auth.users before spending ElevenLabs chars.
* We deliberately do NOT verify the user's plan server-side here — the
* browser has already gated voice access through canUseVoice, and adding
* another DB round-trip per answer would slow the voice loop noticeably.
* If the operator wants stricter gating, add it to the resolver and read
* the row here.
*/
var synthesizeSpeech = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid(),
	text: stringType().trim().min(1).max(5e3),
	lang: stringType().min(2).max(10).default("en-US"),
	voiceId: stringType().optional()
})).handler(createSsrRpc("58f58b043d81e3567ef92d39b4ee2bbd457ff45da28beb45032d81cae2448681"));
//#endregion
export { tts_DTe6fUmD_exports as a, synthesizeSpeech as i, ElevenLabsRateLimitedError as n, ElevenLabsUpstreamError as r, ElevenLabsNotConfiguredError as t };
