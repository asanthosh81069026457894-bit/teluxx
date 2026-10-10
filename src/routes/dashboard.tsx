import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Columns2,
  FileText,
  LoaderCircle,
  Pin,
  UploadCloud,
  Volume2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";

import { DashboardSubNav } from "@/components/dashboard-nav";
import { AuthGate } from "@/components/AuthGate";
import { ChatPanel } from "@/components/ChatPanel";
import { DashboardStateProvider } from "@/components/dashboard-state";
import { useAuth } from "@/hooks/useAuth";
import { useDocuments } from "@/hooks/useDocuments";
import { chunkText, deleteDocument, extractTextWithMeta, saveDocument } from "@/lib/documents";
import { toast } from "sonner";

const title = "Dashboard — Telux";
const description =
  "Chat with your documents. Files stay on your device; only the relevant excerpt leaves.";

// Persisted pin state for the parallel-chat panes. We keep two slots —
// `paneA` and `paneB` — that hold the doc id pinned to each pane. Empty
// string means "no pin" (the panel asks across all uploaded docs).
const PIN_STORAGE_KEY = "telux:parallel-pin-v1";
type PinSlots = { paneA: string; paneB: string };

function loadPinSlots(): PinSlots {
  if (typeof window === "undefined") return { paneA: "", paneB: "" };
  try {
    const raw = window.localStorage.getItem(PIN_STORAGE_KEY);
    if (!raw) return { paneA: "", paneB: "" };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { paneA: "", paneB: "" };
    return {
      paneA: typeof parsed.paneA === "string" ? parsed.paneA : "",
      paneB: typeof parsed.paneB === "string" ? parsed.paneB : "",
    };
  } catch {
    return { paneA: "", paneB: "" };
  }
}

function savePinSlots(slots: PinSlots): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(slots));
  } catch {
    // disabled storage — silent fallback.
  }
}

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AuthGate>
      <DashboardPage />
    </AuthGate>
  ),
});

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DashboardPage() {
  // AuthGate guarantees session is non-null here.
  const { session } = useAuth();
  const { docs } = useDocuments(session?.user?.id);
  const routerState = useRouterState();
  const viewRaw = new URLSearchParams(routerState.location.search).get("view");
  // Three legal views now: documents | chat | multi. Anything else
  // falls back to documents so old bookmarks don't 404.
  const view: "chat" | "documents" | "multi" =
    viewRaw === "chat" || viewRaw === "multi" ? viewRaw : "documents";
  const [mobileTab, setMobileTab] = useState<"documents" | "chat">(
    view === "chat" ? "chat" : "documents",
  );
  const [isDragging, setIsDragging] = useState(false);
  const [ingestingId, setIngestingId] = useState<string | null>(null);
  // After the first successful upload, surface a quick CTA pointing at /talk.
  const [firstUploadCelebrated, setFirstUploadCelebrated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pin slots for the parallel-chat panes. Lazy-initialised from
  // localStorage on mount; if a previously-pinned doc has been deleted
  // since, the slot silently drops to empty on first rehydrate so the
  // pinned-doc dropdown doesn't show a stale id.
  const [pinSlots, setPinSlots] = useState<PinSlots>({ paneA: "", paneB: "" });
  useEffect(() => {
    const initial = loadPinSlots();
    if (docs.length > 0) {
      const docIds = new Set(docs.map((d) => d.id));
      if (initial.paneA && !docIds.has(initial.paneA)) initial.paneA = "";
      if (initial.paneB && !docIds.has(initial.paneB)) initial.paneB = "";
    }
    setPinSlots(initial);
  }, [docs]);

  const setPanePin = useCallback((slot: "paneA" | "paneB", docId: string) => {
    setPinSlots((cur) => {
      const next = { ...cur, [slot]: docId };
      savePinSlots(next);
      return next;
    });
  }, []);

  const ingest = useCallback(
    async (files: FileList | File[]) => {
      if (!session?.user?.id) return;
      const fileArr = Array.from(files);
      // Track successes / failures separately so we can give one
      // summary toast for a multi-file drop instead of N toasts.
      const added: string[] = [];
      const failed: { name: string; detail: string }[] = [];

      // Run the per-file work with a small concurrency cap (3 in flight)
      // so a 5-file PDF drop doesn't make the user wait for the slowest
      // one to finish before the fastest one shows up. PDF extraction
      // is the bottleneck; running 3 in parallel keeps the main thread
      // responsive while still amortising the per-call setup cost.
      const MAX_PARALLEL = 3;
      let cursor = 0;
      const inFlight = new Set<string>();
      const ingestOne = async (file: File): Promise<void> => {
        const id = `${file.name}-${file.size}-${file.lastModified}`;
        inFlight.add(id);
        setIngestingId(id);
        try {
          const { text, pageCount } = await extractTextWithMeta(file);
          const chunks = chunkText(text);
          await saveDocument({
            id,
            name: file.name,
            size: file.size,
            mimeType: file.type || "application/octet-stream",
            addedAt: Date.now(),
            chunks,
            pageCount,
            userId: session.user.id,
          });
          added.push(file.name);
        } catch (err) {
          console.error("Failed to ingest", file.name, err);
          failed.push({
            name: file.name,
            detail:
              err instanceof Error ? err.message : "Only PDF and plain-text files are supported.",
          });
        } finally {
          inFlight.delete(id);
          if (inFlight.size === 0) setIngestingId(null);
        }
      };

      const workers: Promise<void>[] = [];
      for (let i = 0; i < Math.min(MAX_PARALLEL, fileArr.length); i++) {
        workers.push(
          (async () => {
            while (true) {
              const idx = cursor++;
              if (idx >= fileArr.length) return;
              await ingestOne(fileArr[idx]!);
            }
          })(),
        );
      }
      await Promise.all(workers);

      // Surface a single summary for the common case (everything
      // succeeded) and a longer message for mixed results.
      if (added.length > 0 && failed.length === 0) {
        const list = added.length === 1 ? added[0]! : added.join(", ");
        toast.success(
          added.length === 1
            ? `Added ${list} — ask away.`
            : `Added ${added.length} documents: ${list}.`,
        );
      } else if (added.length > 0 && failed.length > 0) {
        toast.success(
          `Added ${added.length} document${added.length === 1 ? "" : "s"}. ${failed.length} couldn't be read.`,
        );
        for (const f of failed) {
          toast.error(`Couldn't read "${f.name}". ${f.detail}`);
        }
      } else if (failed.length > 0) {
        for (const f of failed) {
          toast.error(`Couldn't read "${f.name}". ${f.detail}`);
        }
      }
      if (added.length > 0 && !firstUploadCelebrated) {
        setFirstUploadCelebrated(true);
      }
      if (added.length > 0) {
        setMobileTab("chat");
      }
    },
    [session?.user?.id, firstUploadCelebrated],
  );

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(false);
    void ingest(e.dataTransfer.files);
  }

  return (
    <DashboardStateProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <DashboardSubNav />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-3 pb-6 pt-3 sm:px-6 sm:pt-6">
          {/* Mobile-only tab switcher. Three columns on small screens too:
              Documents / Chat / Multi. */}
          <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2/40 p-1 text-xs lg:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("documents")}
              className={
                "rounded-lg px-2 py-2 font-medium transition-colors " +
                (mobileTab === "documents"
                  ? "bg-signal text-signal-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Docs
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("chat")}
              className={
                "rounded-lg px-2 py-2 font-medium transition-colors " +
                (mobileTab === "chat"
                  ? "bg-signal text-signal-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Chat
            </button>
            <Link
              to="/dashboard"
              search={{ view: "multi" }}
              onClick={() => setMobileTab("chat")}
              className={
                "rounded-lg px-2 py-2 text-center font-medium transition-colors " +
                (view === "multi"
                  ? "bg-signal text-signal-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Multi
            </Link>
          </div>

          {/* Desktop-only view switcher (the global nav already exposes the
              individual routes; this is a quick switcher inside the page). */}
          <div className="hidden gap-1 rounded-xl border border-border bg-surface-2/40 p-1 text-xs lg:flex lg:w-fit">
            <Link
              to="/dashboard"
              search={{ view: "documents" }}
              className={
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " +
                (view === "documents"
                  ? "bg-signal/15 text-signal"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground")
              }
            >
              <FileText className="size-3.5" />
              Documents
            </Link>
            <Link
              to="/dashboard"
              search={{ view: "chat" }}
              className={
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " +
                (view === "chat"
                  ? "bg-signal/15 text-signal"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground")
              }
            >
              Chat
            </Link>
            <Link
              to="/dashboard"
              search={{ view: "multi" }}
              className={
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors " +
                (view === "multi"
                  ? "bg-signal/15 text-signal"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground")
              }
            >
              <Columns2 className="size-3.5" />
              Multi
            </Link>
          </div>

          {/* Workspace. Single layout for documents | chat, side-by-side
              layout for multi (two pinned chats + a compact docs list
              above). On mobile only the active tab renders. */}
          {view === "multi" ? (
            <main className="grid min-h-[calc(100vh-7rem)] grid-cols-1 gap-3 lg:min-h-0 lg:gap-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
                <ChatPanel
                  docs={docs}
                  paneId="multiA"
                  userId={session?.user?.id ?? null}
                  pinnedDocId={pinSlots.paneA || null}
                  title="Chat A"
                />
                <ChatPanel
                  docs={docs}
                  paneId="multiB"
                  userId={session?.user?.id ?? null}
                  pinnedDocId={pinSlots.paneB || null}
                  title="Chat B"
                />
              </div>
              <MultiPinStrip
                docs={docs}
                paneA={pinSlots.paneA}
                paneB={pinSlots.paneB}
                onChange={setPanePin}
              />
            </main>
          ) : (
            <main className="grid min-h-[calc(100vh-7rem)] grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
              <div className={mobileTab === "documents" ? "" : "hidden lg:block"}>
                <DocumentsPanel
                  docs={docs}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  ingestingId={ingestingId}
                  firstUploadCelebrated={firstUploadCelebrated}
                  onDrop={onDrop}
                  onPick={() => fileInputRef.current?.click()}
                  fileInputRef={fileInputRef}
                  ingest={ingest}
                />
              </div>

              <div className={mobileTab === "documents" ? "hidden lg:block" : ""}>
                <ChatPanel docs={docs} title="Chat" />
              </div>
            </main>
          )}
        </div>
      </div>
    </DashboardStateProvider>
  );
}

type MultiPinStripProps = {
  docs: ReturnType<typeof useDocuments>["docs"];
  paneA: string;
  paneB: string;
  onChange: (slot: "paneA" | "paneB", docId: string) => void;
};

function MultiPinStrip({ docs, paneA, paneB, onChange }: MultiPinStripProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface-2/30 p-3.5 sm:p-5">
      <header className="mb-3 flex items-center gap-2">
        <Pin className="size-3.5 text-signal" />
        <h3 className="text-sm font-semibold">Pin each chat to a document</h3>
        <span className="text-[11px] text-muted-foreground">
          Leave a slot on "All docs" to ask across everything.
        </span>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <PinRow label="Chat A" docs={docs} value={paneA} onChange={(v) => onChange("paneA", v)} />
        <PinRow label="Chat B" docs={docs} value={paneB} onChange={(v) => onChange("paneB", v)} />
      </div>
    </section>
  );
}

function PinRow({
  label,
  docs,
  value,
  onChange,
}: {
  label: string;
  docs: ReturnType<typeof useDocuments>["docs"];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-3 py-2 text-xs">
      <span className="font-semibold text-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="flex-1 rounded-lg border border-input bg-background px-2 py-1.5 text-xs text-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
      >
        <option value="">All docs</option>
        {docs.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </label>
  );
}

type DocsProps = {
  docs: ReturnType<typeof useDocuments>["docs"];
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  ingestingId: string | null;
  firstUploadCelebrated: boolean;
  onDrop: (e: DragEvent<HTMLLabelElement>) => void;
  onPick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  ingest: (files: FileList | File[]) => Promise<void>;
};

function DocumentsPanel({
  docs,
  isDragging,
  setIsDragging,
  ingestingId,
  firstUploadCelebrated,
  onDrop,
  fileInputRef,
  ingest,
}: DocsProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-2/30 p-3.5 sm:p-5">
      <header className="flex items-center gap-2">
        <h1 className="text-base font-semibold sm:text-lg">Documents</h1>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          On this device
        </span>
      </header>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={
          "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-surface-2/30 p-4 text-center transition-colors sm:p-6 " +
          "min-h-[150px] sm:min-h-[220px] " +
          (isDragging ? "border-signal bg-signal/5" : "border-border hover:border-signal/60")
        }
      >
        <UploadCloud className="size-7 text-signal sm:size-8" />
        <div>
          <p className="text-sm font-medium">Drag & drop a file here</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, TXT, MD up to ~10 MB</p>
        </div>
        <span className="rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-medium">
          Choose file
        </span>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.md,.markdown,application/pdf,text/plain,text/markdown"
          className="sr-only"
          onChange={(e) => {
            if (e.currentTarget.files) void ingest(e.currentTarget.files);
            e.currentTarget.value = "";
          }}
        />
      </label>

      {ingestingId ? (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <LoaderCircle className="size-3.5 animate-spin" />
          Reading documents…
        </p>
      ) : null}

      {docs.length > 0 ? (
        <ul className="space-y-2">
          {docs.slice(0, 6).map((d) => (
            <li
              key={d.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-3 py-2"
            >
              <FileText className="size-4 shrink-0 text-signal" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{d.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {formatSize(d.size)} · {d.chunks.length} chunks
                  {d.pageCount ? ` · ${d.pageCount} ${d.pageCount === 1 ? "page" : "pages"}` : ""}
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${d.name}`}
                onClick={() => void deleteDocument(d.id)}
                className="grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
          {docs.length > 6 ? (
            <li className="text-center text-xs text-muted-foreground">
              + {docs.length - 6} more on this device
            </li>
          ) : null}
        </ul>
      ) : null}

      {firstUploadCelebrated && docs.length > 0 ? (
        <Link
          to="/talk"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm font-semibold text-signal transition-colors hover:bg-signal/15"
        >
          <Volume2 className="size-4" />
          Talk with Document
        </Link>
      ) : null}
    </section>
  );
}
