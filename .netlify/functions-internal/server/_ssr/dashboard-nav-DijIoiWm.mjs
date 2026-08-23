import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./router-DnY1Bs6l.mjs";
import { d as ScrollText, h as Mic, y as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-nav-DijIoiWm.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardSubNav() {
	const { location } = useRouterState();
	const path = location.pathname;
	const { signOut, user } = useAuth();
	const navigate = useNavigate();
	async function onSignOut() {
		await signOut();
		navigate({ to: "/" });
	}
	const view = new URLSearchParams(location.search).get("view");
	const onWorkspace = path === "/dashboard";
	const activeTab = view === "chat" ? "chat" : "documents";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-7 place-items-center rounded-lg bg-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-[3px] bg-signal-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base font-bold",
						children: "telux"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Dashboard sections",
					className: "flex items-center gap-1 overflow-x-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
							to: "/dashboard",
							search: { view: "documents" },
							active: activeTab === "documents" && onWorkspace,
							children: "Documents"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
							to: "/dashboard",
							search: { view: "chat" },
							active: activeTab === "chat" && onWorkspace,
							children: "Chat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
							to: "/history",
							active: path === "/history",
							icon: ScrollText,
							children: "History"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
							to: "/talk",
							active: path === "/talk",
							icon: Mic,
							children: "Talk with Document"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [user?.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden max-w-[160px] truncate text-[11px] text-muted-foreground lg:inline",
						children: user.email
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void onSignOut(),
						className: "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400",
						"aria-label": "Sign out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Sign out"
						})]
					})]
				})
			]
		})
	});
}
function TabLink({ to, active, children, icon: Icon, search }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		search,
		className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors " + (active ? "bg-signal/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"),
		children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }) : null, children]
	});
}
//#endregion
export { DashboardSubNav as t };
