import { i as createServerFn } from "./server-CgYtOA4r.mjs";
import { a as userIdExists, t as createServerRpc } from "./supabaseServer-Ccd90Lx7.mjs";
import { n as consume } from "./rate-limit-CZrX3sfM.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tts-BIGZAViB.js
var cachedEnv = null;
function loadEnv() {
	if (cachedEnv) return cachedEnv;
	const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
	if (!apiKey) return null;
	cachedEnv = {
		apiKey,
		defaultVoiceId: process.env.ELEVENLABS_DEFAULT_VOICE_ID?.trim() || "21m00Tcm4TlvDq8ikWAM"
	};
	return cachedEnv;
}
/**
* ElevenLabs exposes per-language voice models. For Indian languages the
* "Eleven Multilingual v2" model is the one that sounds natural; English
* can use either "Multilingual v2" or the legacy "Eleven Turbo v2.5" for
* lower latency. We default to the multilingual model since the user is
* overwhelmingly likely to want a non-English voice when their picker
* isn't English.
*/
var MULTILINGUAL_MODEL = "eleven_multilingual_v2";
var ENGLISH_MODEL = "eleven_turbo_v2_5";
function modelForLang(lang) {
	if (lang.toLowerCase().startsWith("en")) return ENGLISH_MODEL;
	return MULTILINGUAL_MODEL;
}
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
var getTtsConfig_createServerFn_handler = createServerRpc({
	id: "9d6e20cfabdc6c1449b66d25da403796ceb1d73b12b5d99851d1511b67e3ae99",
	name: "getTtsConfig",
	filename: "src/serverFns/tts.ts"
}, (opts) => getTtsConfig.__executeServer(opts));
var getTtsConfig = createServerFn({ method: "POST" }).validator(objectType({ userId: stringType().uuid().optional() })).handler(getTtsConfig_createServerFn_handler, async ({ data }) => {
	if (data.userId) {
		if (!await consume(`tts-config:${data.userId}`, {
			capacity: 30,
			windowMs: 36e5
		})) return { elevenlabsAvailable: loadEnv() != null };
	}
	return { elevenlabsAvailable: loadEnv() != null };
});
var synthesizeSpeech_createServerFn_handler = createServerRpc({
	id: "58f58b043d81e3567ef92d39b4ee2bbd457ff45da28beb45032d81cae2448681",
	name: "synthesizeSpeech",
	filename: "src/serverFns/tts.ts"
}, (opts) => synthesizeSpeech.__executeServer(opts));
var synthesizeSpeech = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid(),
	text: stringType().trim().min(1).max(5e3),
	lang: stringType().min(2).max(10).default("en-US"),
	voiceId: stringType().optional()
})).handler(synthesizeSpeech_createServerFn_handler, async ({ data }) => {
	const env = loadEnv();
	if (!env) throw new ElevenLabsNotConfiguredError();
	const rl = consume(`tts:${data.userId}`, {
		capacity: 60,
		windowMs: 36e5
	});
	if (!rl.ok) throw new ElevenLabsRateLimitedError(rl.retryAfterMs);
	if (!await userIdExists(data.userId)) throw new ElevenLabsUpstreamError();
	const voiceId = data.voiceId ?? env.defaultVoiceId;
	const model = modelForLang(data.lang);
	const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
	let res;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: {
				"xi-api-key": env.apiKey,
				"content-type": "application/json",
				accept: "audio/mpeg"
			},
			body: JSON.stringify({
				text: data.text,
				model_id: model,
				voice_settings: {
					stability: .5,
					similarity_boost: .75,
					style: 0,
					use_speaker_boost: true
				}
			})
		});
	} catch {
		throw new ElevenLabsUpstreamError();
	}
	if (res.status === 429) {
		const retryAfter = Number.parseFloat(res.headers.get("retry-after") ?? "60");
		throw new ElevenLabsRateLimitedError(Math.max(1e3, Number.isFinite(retryAfter) ? retryAfter * 1e3 : 6e4));
	}
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		console.error(`[elevenlabs] ${res.status}: ${detail.slice(0, 400)}`);
		throw new ElevenLabsUpstreamError();
	}
	const buf = new Uint8Array(await res.arrayBuffer());
	let binary = "";
	const CHUNK = 32768;
	for (let i = 0; i < buf.length; i += CHUNK) {
		const slice = buf.subarray(i, Math.min(i + CHUNK, buf.length));
		binary += String.fromCharCode.apply(null, Array.from(slice));
	}
	return {
		audioBase64: btoa(binary),
		contentType: res.headers.get("content-type") ?? "audio/mpeg",
		voiceId,
		lang: data.lang,
		model
	};
});
//#endregion
export { getTtsConfig_createServerFn_handler, synthesizeSpeech_createServerFn_handler };
