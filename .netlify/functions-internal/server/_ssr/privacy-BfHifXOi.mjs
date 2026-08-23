import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SiteFooter, r as SiteHeader, t as Reveal } from "./SiteFooter-CezwIg-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-BfHifXOi.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-5 pt-32 pb-24 md:pt-36",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "prose-telux mx-auto max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-ring size-1.5 rounded-full bg-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Privacy"
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 text-4xl font-bold tracking-tight md:text-5xl",
								children: "Your documents never leave your device."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 140,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base text-muted-foreground md:text-lg",
								children: "This is the short version. The full version is below — it's written in plain English, not fine print, because trust is the only thing we sell."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 200,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 space-y-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "01",
										title: "What we store on your device",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your uploaded documents are stored in your browser's local database (IndexedDB). They are not uploaded to any server we run. If you sign out, switch browsers, or clear your browsing data, the documents are gone from your device — and they were never on ours to begin with." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"We also keep a few small items in ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "localStorage" }),
											": your sign-in email, your plan (Starter / Personal / Pro), and a random token that unlocks voice features on paid plans. None of this contains your documents."
										] })] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "02",
										title: "What we send to a language model",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"When you ask a question, your browser runs a tiny local scoring pass that picks the 3–4 paragraphs most likely to answer it. Only those paragraphs — plus your question — leave the device, sent to",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " Groq" }),
												" over HTTPS. Groq returns the answer; we never store the request or the answer."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The full document text is never transmitted. You can verify this yourself in your browser's network tab — the request body contains only the pre-scored snippets, not the entire file." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Groq's free tier is used for completions. Their privacy terms apply to the request once it leaves our servers; we rely on Groq's no-train-on-API-data policy." })
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "03",
										title: "Voice — speech-to-text and text-to-speech",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you use the mic button, your browser's built-in SpeechRecognition listens to your microphone and returns transcripts locally. The audio itself is never recorded, uploaded, or stored by Telux." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When Talk with Document \"speaks\" an answer, your browser's built-in SpeechSynthesis generates the audio locally. No audio is uploaded to Telux." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Both APIs are language-aware. You can speak Hindi, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi, English, or any other language your browser supports — Talk with Document will reply in the same language." })
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "04",
										title: "Account & authentication",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Sign-up and login are handled by ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Supabase Auth" }),
											". We store your email address and a hashed password on Supabase servers. We never see or store your password in plain text."
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Session tokens are stored in your browser and refreshed automatically. Disabling cookies or signing out ends the session immediately." })] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "05",
										title: "What we do not collect",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "list-disc space-y-1.5 pl-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No analytics, no tracking pixels, no Google Analytics." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No advertising IDs." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No document content stored on a server." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No audio recordings." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No model-request logs on our side." })
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "06",
										title: "Payments",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paid plans are processed by our payment processor — they handle card data and billing. Telux never sees your card number. We only receive confirmation that a payment succeeded and your plan tier." })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "07",
										title: "Your rights",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can delete every document from your device at any time using the trash icon next to each file. You can sign out to clear your session. You can request deletion of your Supabase account by emailing us — we will process it within 7 days." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Because documents are never stored on our servers, deletion from your device is final and immediate." })] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "08",
										title: "Changes to this policy",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If we change anything material here, we'll bump the date below and surface a banner in the app. We will never silently expand the data we collect." })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										eyebrow: "09",
										title: "Contact",
										body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Questions, complaints, or deletion requests:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "mailto:privacy@telux.app",
												className: "text-signal underline-offset-4 hover:underline",
												children: "privacy@telux.app"
											}),
											". We respond within 7 days."
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "pt-6 font-mono text-[11px] tracking-widest text-muted-foreground uppercase",
										children: [
											"Last updated",
											" ",
											(/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
												year: "numeric",
												month: "long",
												day: "numeric"
											})
										]
									})
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Section({ eyebrow, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs tracking-widest text-signal uppercase",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold tracking-tight md:text-2xl",
			children: title
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base",
		children: body
	})] });
}
//#endregion
export { PrivacyPage as component };
