//#region node_modules/.nitro/vite/services/ssr/assets/detect-lang-BUkpTlmE.js
function detectLangFromDocs(docs) {
	if (!docs || docs.length === 0) return "en-US";
	const stripped = docs[0].chunks.join(" ").slice(0, 2e3).replace(/[\s\d\p{P}]/gu, "");
	if (stripped.length === 0) return "en-US";
	const scripts = {
		devanagari: 0,
		bengali: 0,
		telugu: 0,
		tamil: 0,
		kannada: 0,
		malayalam: 0,
		gujarati: 0,
		gurmukhi: 0,
		oriya: 0,
		arabic: 0,
		meeteiMayek: 0,
		olChiki: 0,
		cyrillic: 0,
		han: 0,
		hiragana: 0,
		katakana: 0,
		hangul: 0,
		latin: 0
	};
	for (const ch of stripped) {
		const code = ch.codePointAt(0) ?? 0;
		if (code >= 2304 && code <= 2431) scripts.devanagari++;
		else if (code >= 2432 && code <= 2559) scripts.bengali++;
		else if (code >= 3072 && code <= 3199) scripts.telugu++;
		else if (code >= 2944 && code <= 3071) scripts.tamil++;
		else if (code >= 3200 && code <= 3327) scripts.kannada++;
		else if (code >= 3328 && code <= 3455) scripts.malayalam++;
		else if (code >= 2688 && code <= 2815) scripts.gujarati++;
		else if (code >= 2560 && code <= 2687) scripts.gurmukhi++;
		else if (code >= 2816 && code <= 2943) scripts.oriya++;
		else if (code >= 1536 && code <= 1791) scripts.arabic++;
		else if (code >= 43968 && code <= 44031) scripts.meeteiMayek++;
		else if (code >= 7248 && code <= 7295) scripts.olChiki++;
		else if (code >= 1024 && code <= 1279) scripts.cyrillic++;
		else if (code >= 19968 && code <= 40959) scripts.han++;
		else if (code >= 12352 && code <= 12447) scripts.hiragana++;
		else if (code >= 12448 && code <= 12543) scripts.katakana++;
		else if (code >= 44032 && code <= 55215) scripts.hangul++;
		else if (code >= 65 && code <= 122) scripts.latin++;
	}
	const winner = Object.entries(scripts).sort((a, b) => b[1] - a[1])[0];
	if (!winner || winner[1] === 0) return "en-US";
	switch (winner[0]) {
		case "devanagari": return "hi-IN";
		case "bengali": return "bn-IN";
		case "telugu": return "te-IN";
		case "tamil": return "ta-IN";
		case "kannada": return "kn-IN";
		case "malayalam": return "ml-IN";
		case "gujarati": return "gu-IN";
		case "gurmukhi": return "pa-IN";
		case "oriya": return "or-IN";
		case "arabic": return "ur-IN";
		case "meeteiMayek": return "mni-IN";
		case "olChiki": return "sat-IN";
		case "cyrillic": return "ru-RU";
		case "han": return "zh-CN";
		case "hiragana":
		case "katakana": return "ja-JP";
		case "hangul": return "ko-KR";
		default: return "en-US";
	}
}
/**
* Same heuristic but operates on a raw joined string (used by the serverFn
* `askChat` which only sees the pre-scored chunks the client forwarded).
*/
function detectLangFromText(text) {
	return detectLangFromDocs([{ chunks: [text] }]);
}
//#endregion
export { detectLangFromText as n, detectLangFromDocs as t };
