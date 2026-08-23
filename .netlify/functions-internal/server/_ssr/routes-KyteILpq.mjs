import { i as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_react, i as Root2, n as Header, r as Item, s as require_jsx_runtime, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FileText, E as HeartPulse, F as Check, P as ChevronDown, _ as MessageSquareText, a as Trash2, c as Sparkles, d as ScrollText, i as Upload, l as ShieldCheck, m as MonitorSmartphone, n as WifiOff, w as Landmark, x as Lock } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as SiteFooter, r as SiteHeader, t as Reveal } from "./SiteFooter-CezwIg-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KyteILpq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Privacy, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseCases, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-veil" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 veil-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-ring size-1.5 rounded-full bg-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Zero-storage by design"
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-5xl leading-[0.95] font-bold md:text-7xl",
							children: [
								"Read in your language.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-signal-gradient",
									children: "Speak it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Think for yourself."
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 160,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg text-lg text-muted-foreground",
							children: "Read your documents and talk back in any language. Drop in a PDF, a rental agreement, a lab report or a discharge summary — Telux answers in yours. Nothing is uploaded to a Telux server. Nothing is kept."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 240,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								className: "rounded-full bg-signal px-6 py-3 font-semibold text-signal-foreground shadow-[var(--shadow-signal)] transition-transform hover:scale-[1.03]",
								children: "Start free — no card"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how",
								className: "rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-surface-2",
								children: "See how it works"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 320,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-signal" }), " Local-only file storage"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-4 text-signal" }), " Nothing kept after you close the tab"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, { className: "size-4 text-signal" }), " Works on phone & desktop"]
								})
							]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPanel, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {})
		]
	});
}
var heroTurns = [
	{
		q: "What does my report say about vitamin D?",
		a: "Your vitamin D reading is below the reference range given in the report. The document flags it and suggests discussing supplementation with your doctor."
	},
	{
		q: "Which clauses cover early exit from this lease?",
		a: "Clause 9 allows exit with two months' written notice. Clause 11 adds a deduction from the deposit if you leave before month six."
	},
	{
		q: "Switch language to हिन्दी and explain the photo in the document.",
		a: "भाषा बदली — अब हिन्दी में जवाब दूँगा। दस्तावेज़ में दो फोटो हैं: पहला पहले पन्ने पर हस्ताक्षर क्षेत्र के नीचे, दूसरा पन्ना 12 पर स्कैन के रूप में।"
	},
	{
		q: "Walk me through solving 3x + 5 = 20.",
		a: "Hint: start by isolating the term that has the variable. If 3x + 5 = 20, what can you subtract from both sides to keep the variable on the left? Your turn — solve step 1 and tell me what you get."
	}
];
function HeroPanel() {
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setIndex((i) => (i + 1) % heroTurns.length), 5200);
		return () => clearInterval(id);
	}, []);
	const turn = heroTurns[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card float-slow relative overflow-hidden p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-line pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--signal)_12%,transparent),transparent)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs",
						children: "lab-report.pdf"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase",
					children: "on device"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-in fade-in slide-in-from-bottom-2 space-y-4 pt-5 duration-500",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-signal px-4 py-3 text-sm font-medium text-signal-foreground",
					children: turn.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[92%] text-sm leading-relaxed text-muted-foreground",
					children: turn.a
				})]
			}, index),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Ask anything about this file…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto size-2 rounded-full bg-signal" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-signal" }), "0 bytes written to Telux servers"]
			})
		]
	});
}
var marqueeItems = [
	"PDF",
	"Lab reports",
	"Prescriptions",
	"Rental agreements",
	"Insurance policies",
	"Scanned notes",
	"Discharge summaries",
	"Invoices",
	"Offer letters",
	"Study material"
];
function Marquee() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative mt-20 overflow-hidden border-y border-border py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track flex w-max gap-10 pr-10",
			children: [...marqueeItems, ...marqueeItems].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-signal" }), item]
			}, `${item}-${i}`))
		})
	});
}
var steps = [
	{
		icon: Upload,
		step: "01",
		title: "Add a file from your device",
		body: "Pick a PDF, image scan or text document. It is opened straight from your file picker into the browser — no upload dialog, no server round trip."
	},
	{
		icon: MessageSquareText,
		step: "02",
		title: "Ask in your own words",
		body: "Hindi, English or a mix. Ask for a summary, a specific clause, a number buried on page 30, or what an abbreviation on a report means."
	},
	{
		icon: Trash2,
		step: "03",
		title: "Close the tab, it's gone",
		body: "Your file lives in your browser's local storage until you clear it. One tap wipes every document and chat from the device permanently."
	}
];
function Steps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "scroll-mt-24 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "How it works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 max-w-2xl text-4xl font-bold md:text-5xl",
				children: "Three steps. No account uploads, no cloud folder, no waiting."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 md:grid-cols-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 110,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface-card group h-full p-7 transition-transform duration-500 hover:-translate-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-xl border border-border bg-surface-2 transition-colors group-hover:border-signal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5 text-signal" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tracking-widest text-muted-foreground",
									children: s.step
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-xl font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: s.body
							})
						]
					})
				}, s.step))
			})]
		})
	});
}
var guarantees = [
	{
		icon: Lock,
		title: "Files stay in local storage",
		body: "Documents are held in your browser's own storage area, tied to your device — not to a Telux bucket."
	},
	{
		icon: Trash2,
		title: "One-tap permanent wipe",
		body: "Clear everything instantly. There is no backup copy for us to delete, because one was never made."
	},
	{
		icon: ShieldCheck,
		title: "Nothing used for training",
		body: "Your medical and legal papers are never mined, profiled, sold, or fed into any model improvement loop."
	}
];
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "privacy",
		className: "relative scroll-mt-24 overflow-hidden py-24 md:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 veil-glow opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "The promise"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-4 text-4xl font-bold md:text-5xl",
					children: [
						"We can't leak what we never ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal-gradient",
							children: "hold"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-lg text-lg text-muted-foreground",
					children: "Most document tools ask you to hand over your files first. Telux inverts that. Your documents are read where they already are — on your device — and only the question you type is processed to build an answer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-9 grid gap-3",
					children: guarantees.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 90,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 rounded-xl border border-border bg-surface/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "mt-0.5 size-5 shrink-0 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: g.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: g.body
							})] })]
						})
					}, g.title))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 140,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Data map"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRow, {
									label: "Your document",
									value: "Your device only",
									good: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRow, {
									label: "Extracted text",
									value: "Your device only",
									good: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRow, {
									label: "Chat history",
									value: "Your device only",
									good: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRow, {
									label: "Your question",
									value: "Processed, not retained",
									good: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRow, {
									label: "Account email",
									value: "Stored for login only"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 border-t border-border pt-6 font-mono text-[11px] leading-relaxed tracking-widest text-muted-foreground uppercase",
							children: "Telux storage footprint per document: 0 bytes"
						})
					]
				})
			})]
		})]
	});
}
function MapRow({ label, value, good }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: good ? "flex items-center gap-2 text-sm font-medium text-signal" : "text-sm font-medium text-foreground",
			children: [good ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : null, value]
		})]
	});
}
var useCases = [
	{
		icon: HeartPulse,
		title: "Health & medical reports",
		body: "Understand a blood panel, a scan summary or a prescription without decoding jargon alone."
	},
	{
		icon: ScrollText,
		title: "Agreements & contracts",
		body: "Find notice periods, penalties and renewal terms in a rental or employment document in seconds."
	},
	{
		icon: Landmark,
		title: "Policies & statements",
		body: "Ask what an insurance policy actually covers, or trace a charge across a long bank statement."
	},
	{
		icon: FileText,
		title: "Study & work material",
		body: "Turn dense papers, manuals and notes into answers, checklists and revision-ready summaries."
	}
];
function UseCases() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "usecases",
		className: "scroll-mt-24 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "Built for real paperwork"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 max-w-2xl text-4xl font-bold md:text-5xl",
				children: "The documents you'd never upload to a random website."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 sm:grid-cols-2",
				children: useCases.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 90,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						id: u.id,
						className: "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-signal/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-signal/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(u.icon, { className: "size-6 text-signal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-2xl font-semibold",
								children: u.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md text-muted-foreground",
								children: u.body
							})
						]
					})
				}, u.title))
			})]
		})
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "scroll-mt-24 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Pricing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-4xl font-bold md:text-5xl",
					children: "Free today. Pro and Team on the way."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-muted-foreground",
					children: "Free is the full app — chat, voice, multi-document, unlimited pages. Pro and Team tiers are listed below so you can see what's coming; they're not yet available to buy."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
						name: "Free",
						price: "₹0",
						cadence: "forever",
						highlight: true,
						features: [
							"Unlimited questions",
							"Voice in 9 languages",
							"Multi-document upload",
							"On-device storage only",
							"No card, 3-day trial included"
						],
						cta: {
							label: "Start free — no card",
							to: "/signup"
						}
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
							name: "Pro",
							price: "₹899",
							cadence: "per month",
							features: [
								"Everything in Free",
								"Larger documents (up to 50 MB)",
								"More pages per library",
								"Priority chat latency",
								"Faster voice synthesis"
							],
							cta: {
								label: "Coming soon",
								disabled: true
							},
							badge: "Coming soon"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 160,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
							name: "Team",
							price: "₹2,499",
							cadence: "per month",
							features: [
								"Everything in Pro",
								"Shared on-device libraries",
								"Up to 5 seats per workspace",
								"Centralised wipe",
								"Email support"
							],
							cta: {
								label: "Coming soon",
								disabled: true
							},
							badge: "Coming soon"
						})
					})
				]
			})]
		})
	});
}
function PricingCard({ name, price, cadence, features, cta, highlight, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col gap-5 rounded-2xl border p-6 sm:p-7 " + (highlight ? "border-signal/50 bg-gradient-to-br from-signal/15 via-signal/5 to-transparent shadow-[var(--shadow-signal)]" : "border-border bg-surface"),
		children: [
			badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase",
				children: badge
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-widest text-muted-foreground uppercase",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex items-baseline gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-4xl font-bold",
					children: price
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: cadence
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex-1 space-y-2 text-sm",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-3.5 shrink-0 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
				}, f))
			}),
			cta.disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: true,
				className: "inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-surface-2/60 px-5 py-3 text-sm font-semibold text-muted-foreground opacity-70",
				children: cta.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: cta.to ?? "/signup",
				className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-signal-foreground shadow-[var(--shadow-signal)] transition-transform hover:scale-[1.02]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), cta.label]
			})
		]
	});
}
var faqs = [
	{
		q: "Where exactly are my documents stored?",
		a: "In your browser's local storage on the device you used. They are not copied to a Telux database, bucket or backup. Clearing Telux data or your browser data removes them for good."
	},
	{
		q: "What happens when I ask a question?",
		a: "Only the relevant text you are asking about plus your question is used to produce the answer. It is processed to generate the reply and is not written to any Telux store afterwards."
	},
	{
		q: "Can I open the same document on another device?",
		a: "No — and that is intentional. Since nothing syncs to a server, a document added on your phone stays on your phone. Add the file again on the other device to continue there."
	},
	{
		q: "Is Telux a substitute for a doctor or lawyer?",
		a: "No. Telux helps you read and understand your own paperwork in plain language. Decisions about treatment or legal action should always be taken with a qualified professional."
	},
	{
		q: "How much does Telux cost?",
		a: "The Free plan is the full app — chat, voice, multi-document, unlimited pages, no card. Pro (₹899/mo) and Team (₹2,499/mo) tiers are listed on the pricing section but aren't open to buy yet. You'll see a Coming soon badge on those cards until they're live."
	},
	{
		q: "Why is the Free plan really free?",
		a: "Because your work stays on your device. We don't have a server bill for storing your documents, and the chat runs on Groq's free tier. We can afford to give the whole thing away while we figure out where this goes."
	}
];
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Questions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-4xl font-bold md:text-5xl",
					children: "Everything people ask first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mt-10 p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold",
							children: "Ready to try it on one file?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Free plan, no card, and nothing of yours stays with us."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							className: "mt-6 inline-block rounded-full bg-signal px-6 py-3 font-semibold text-signal-foreground transition-transform hover:scale-[1.03]",
							children: "Create your account"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: f.q,
						className: "border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left text-base font-medium hover:no-underline",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: f.a
						})]
					}, f.q))
				})
			})]
		})
	});
}
//#endregion
export { Landing as component };
