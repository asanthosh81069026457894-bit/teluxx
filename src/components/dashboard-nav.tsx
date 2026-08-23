import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Mic, ScrollText } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

// Top sub-nav used inside every /dashboard/* page. Replaces the old side menu.
//
// Post-payment-removal: Billing and History tabs are gone. Documents,
// Chat, and Talk with Document are the three surfaces. Sign-out still
// lives in the right rail next to the email chip.

export function DashboardSubNav() {
  const { location } = useRouterState();
  const path = location.pathname;
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  async function onSignOut() {
    await signOut();
    void navigate({ to: "/" });
  }

  const view = new URLSearchParams(location.search).get("view");
  const onWorkspace = path === "/dashboard";
  const activeTab: "documents" | "chat" = view === "chat" ? "chat" : "documents";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-signal">
            <span className="size-2.5 rounded-[3px] bg-signal-foreground" />
          </span>
          <span className="font-display text-base font-bold">telux</span>
        </Link>

        <nav aria-label="Dashboard sections" className="flex items-center gap-1 overflow-x-auto">
          <TabLink
            to="/dashboard"
            search={{ view: "documents" }}
            active={activeTab === "documents" && onWorkspace}
          >
            Documents
          </TabLink>
          <TabLink
            to="/dashboard"
            search={{ view: "chat" }}
            active={activeTab === "chat" && onWorkspace}
          >
            Chat
          </TabLink>
          <TabLink to="/history" active={path === "/history"} icon={ScrollText}>
            History
          </TabLink>
          <TabLink to="/talk" active={path === "/talk"} icon={Mic}>
            Talk with Document
          </TabLink>
        </nav>

        <div className="flex items-center gap-3">
          {user?.email ? (
            <span className="hidden max-w-[160px] truncate text-[11px] text-muted-foreground lg:inline">
              {user.email}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label="Sign out"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

type LinkProps = {
  to: string;
  active: boolean;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  search?: Record<string, string>;
};

function TabLink({ to, active, children, icon: Icon, search }: LinkProps) {
  return (
    <Link
      to={to}
      search={search}
      className={
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors " +
        (active
          ? "bg-signal/15 text-signal"
          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground")
      }
    >
      {Icon ? <Icon className="size-3.5" /> : null}
      {children}
    </Link>
  );
}
