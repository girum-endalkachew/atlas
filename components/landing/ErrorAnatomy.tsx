const parts = [
  { n: "01", key: "SYMPTOM",    detail: "What the user or runtime observes." },
  { n: "02", key: "TRIGGER",    detail: "The specific call that raised the failure." },
  { n: "03", key: "ASSUMPTION", detail: "The implicit assumption the code relied on." },
  { n: "04", key: "ROOT CAUSE", detail: "The underlying state that violated it.", gold: true },
  { n: "05", key: "FIX",        detail: "The resolution that restores correctness." },
];

export default function ErrorAnatomy() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Error anatomy
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Every failure has a structure.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-[color:var(--color-border)]">
              <span className="travel absolute left-1/2 -translate-x-1/2 block h-16 w-px bg-[color:var(--color-sky)]" />
            </div>
            <ul className="relative space-y-3">
              {parts.map((p) => (
                <li key={p.key} className="flex justify-center">
                  <div className={"mono w-full rounded-lg border px-4 py-3 text-center text-[12px] tracking-[0.16em] " +
                    (p.gold
                      ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)] gold-glow"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)] text-[color:var(--color-text)]/85")}>
                    {p.key}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ol className="space-y-3">
            {parts.map((p) => (
              <li key={p.key} className="atlas-panel grid grid-cols-[auto_auto_1fr] items-center gap-4 px-5 py-4">
                <span className="mono text-[11px] text-[color:var(--color-muted)]">{p.n}</span>
                <span className={"mono text-[11px] tracking-[0.16em] " + (p.gold ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-sky)]")}>{p.key}</span>
                <p className="text-[13.5px] text-[color:var(--color-text)]/80">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
