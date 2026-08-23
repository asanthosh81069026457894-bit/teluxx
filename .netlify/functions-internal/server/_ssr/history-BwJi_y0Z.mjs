import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useAuth } from "./router-DnY1Bs6l.mjs";
import { D as FileText, T as Inbox, a as Trash2 } from "../_libs/lucide-react.mjs";
import { o as clearAllDocuments, p as useDocuments, s as deleteDocument, t as AuthGate } from "./useDocuments-WMWqtLPa.mjs";
import { t as DashboardSubNav } from "./dashboard-nav-DijIoiWm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BwJi_y0Z.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardHistorySection() {
	const { user } = useAuth();
	const { docs, refresh } = useDocuments(user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-surface-2/30 p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "History"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-2xl font-semibold",
					children: "Documents on this device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Stored in your browser only. Delete anything you no longer need."
				})
			] }), docs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: async () => {
					if (!user?.id) return;
					if (window.confirm(`Delete all ${docs.length} documents from this device?`)) {
						await clearAllDocuments(user.id);
						refresh();
					}
				},
				className: "inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Clear all"]
			}) : null]
		}), docs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface-2/30 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-10 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold",
					children: "No documents yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm text-muted-foreground",
					children: "Upload a document in the workspace above. It will appear here, and only here on this device."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-4 rounded-2xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center rounded-xl bg-signal/15 text-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: d.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground",
							children: [
								formatSize(d.size),
								" · ",
								formatDate(d.addedAt),
								" · ",
								d.chunks.length,
								" chunks"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Delete ${d.name}`,
						onClick: async () => {
							await deleteDocument(d.id);
							refresh();
						},
						className: "grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			}, d.id))
		})]
	});
}
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function formatDate(ts) {
	return new Date(ts).toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function HistoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSubNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHistorySection, {})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryPage, {}) });
//#endregion
export { SplitComponent as component };
