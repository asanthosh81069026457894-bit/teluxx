//#region node_modules/.nitro/vite/services/ssr/assets/rate-limit-CZrX3sfM.js
var STORE = /* @__PURE__ */ new Map();
var MAX_KEYS = 1e4;
function evictIfFull() {
	if (STORE.size <= MAX_KEYS) return;
	let oldestKey = null;
	let oldestTs = Number.POSITIVE_INFINITY;
	for (const [k, b] of STORE) if (b.lastRefill < oldestTs) {
		oldestTs = b.lastRefill;
		oldestKey = k;
	}
	if (oldestKey !== null) STORE.delete(oldestKey);
}
/**
* Consume one token from the bucket identified by `key`. If the bucket has
* fewer than one token, returns `{ ok: false, ... }` with the time until the
* bucket is full enough for one more request.
*
* The bucket refills linearly: `tokens + (now - lastRefill) * (capacity / windowMs)`.
* So a capacity=20, windowMs=60_000 bucket lets through 20 requests in
* 60s, then refills at 1 token / 3s.
*/
function consume(key, opts) {
	const now = Date.now();
	const refillPerMs = opts.capacity / opts.windowMs;
	let bucket = STORE.get(key);
	if (!bucket) {
		bucket = {
			tokens: opts.capacity,
			lastRefill: now
		};
		STORE.set(key, bucket);
		evictIfFull();
	} else {
		const elapsed = Math.max(0, now - bucket.lastRefill);
		bucket.tokens = Math.min(opts.capacity, bucket.tokens + elapsed * refillPerMs);
		bucket.lastRefill = now;
		if (bucket.tokens >= opts.capacity) STORE.delete(key);
	}
	if (bucket.tokens >= 1) {
		bucket.tokens -= 1;
		return {
			ok: true,
			remaining: Math.floor(bucket.tokens),
			retryAfterMs: 0
		};
	}
	const deficit = 1 - bucket.tokens;
	return {
		ok: false,
		remaining: 0,
		retryAfterMs: Math.ceil(deficit / refillPerMs)
	};
}
/**
* Pull the originating client IP out of a Headers / Record shape, using
* X-Forwarded-For first (Vercel sets this on every request), then falling
* back to X-Real-IP, then to "unknown".
*
* X-Forwarded-For is a comma-separated list of IPs: client, proxy1, proxy2.
* We want the LEFTMOST entry that is not a private/RFC1918 address — that's
* the public client. If everything is private (the request came from inside
* the Vercel network), we fall back to the leftmost.
*
* Why the private-IP filter: Vercel's edge network adds its own IP to the
* chain. Returning the Vercel IP would mean every request shares a single
* rate-limit bucket — defeating the purpose for multi-tenant attacks.
*
* Returns "unknown" when no usable header exists; the caller should still
* rate-limit on that bucket (it's the catch-all that catches scripted
* requests without forwarded headers).
*/
function getClientIp(headers) {
	const xff = readHeader(headers, "x-forwarded-for");
	if (xff) {
		const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
		for (const part of parts) if (!isPrivateIp(part)) return part;
		if (parts[0]) return parts[0];
	}
	const xri = readHeader(headers, "x-real-ip");
	if (xri) return xri.trim();
	return "unknown";
}
function readHeader(headers, name) {
	if (headers instanceof Headers) return headers.get(name);
	return headers[name] ?? headers[name.toLowerCase()] ?? null;
}
/**
* Coarse private-IP check (RFC 1918 + loopback + link-local). Good enough
* for "is this the Vercel proxy?" — we don't need full RFC compliance.
*/
function isPrivateIp(ip) {
	if (ip === "::1" || ip === "127.0.0.1") return true;
	if (ip.startsWith("10.")) return true;
	if (ip.startsWith("192.168.")) return true;
	if (ip.startsWith("169.254.")) return true;
	if (ip.startsWith("172.")) {
		const octet = Number.parseInt(ip.split(".")[1] ?? "", 10);
		if (octet >= 16 && octet <= 31) return true;
	}
	return false;
}
/**
* Friendly error thrown when a serverFn hits its rate limit. Carries the
* retry hint so the UI can show "try again in N seconds" instead of a
* generic 429 message.
*/
var TooManyRequestsError = class extends Error {
	code = "TOO_MANY_REQUESTS";
	retryAfterMs;
	constructor(retryAfterMs, what) {
		super(`Too many ${what}. Please wait a moment before trying again.`);
		this.name = "TooManyRequestsError";
		this.retryAfterMs = retryAfterMs;
	}
};
/**
* Convenience wrapper: consume a token from the bucket, and if the bucket
* is empty, throw a TooManyRequestsError with the typed retry hint.
*
* Use this from serverFns instead of `consume()` + manual `if (!rl.ok)`.
*/
function enforceRateLimit(key, opts, what) {
	const rl = consume(key, opts);
	if (!rl.ok) throw new TooManyRequestsError(rl.retryAfterMs, what);
}
//#endregion
export { getClientIp as i, consume as n, enforceRateLimit as r, TooManyRequestsError as t };
