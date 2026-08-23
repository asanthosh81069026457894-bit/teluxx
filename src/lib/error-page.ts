export function renderErrorPage(detail?: unknown): string {
  // In dev, surface the actual error so the operator can see exactly what
  // threw. In production we keep the user-facing message generic to avoid
  // leaking server-side stack frames, file paths, or echoed user input
  // that some handlers include in `error.message`.
  const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
  const safeMessage =
    detail instanceof Error
      ? detail.message.replace(/[<>&]/g, (c) =>
          c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
        )
      : "";
  const safeStack =
    detail instanceof Error && detail.stack
      ? detail.stack
          .split("\n")
          .slice(0, 8)
          .map((line) =>
            line
              .replace(/[<>&]/g, (c) =>
                c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
              )
              .trim(),
          )
          .filter(Boolean)
          .join("\n")
      : "";
  const devBlock = isDev
    ? safeMessage || safeStack
      ? `<details class="dev"><summary>Dev details</summary><pre>${
          safeMessage ? safeMessage + "\n\n" : ""
        }${safeStack}</pre></details>`
      : ""
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
      details.dev { margin-top: 1.5rem; text-align: left; }
      details.dev summary { cursor: pointer; color: #6b7280; font-size: 12px; }
      details.dev pre { background: #111; color: #f9fafb; padding: 12px; border-radius: 6px; overflow-x: auto; font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; word-break: break-word; text-align: left; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
      ${devBlock}
    </div>
  </body>
</html>`;
}
