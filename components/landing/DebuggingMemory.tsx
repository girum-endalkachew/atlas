const entries = [
  { type: "TypeError",      stack: "React",       snippet: "users.map()",                when: "2 hours ago", concept: "Async data" },
  { type: "ReferenceError", stack: "JavaScript",  snippet: "user is not defined",        when: "Yesterday",   concept: "Scope" },
  { type: "HydrationError", stack: "Next.js",     snippet: "Text content did not match", when: "3 days ago",  concept: "SSR / client parity" },
];

export default function DebuggingMemory() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-surface)] px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Debugging memory</p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Your mistakes become knowledge.
          </h2>
        </div>

        <div className="atlas-surface overflow-hidden">
          {entries.map((e, i) => (
            <article key={i} className={"grid grid-cols-[auto_1fr_auto] items-start gap-x-8 gap-y-1 px-6 py-6 " + (i < entries.length - 1 ? "hairline-b" : "")}>
              <div className="min-w-[130px]">
                <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">{e.stack}</p>
                <p className="mono mt-2 text-[10.5px] text-[color:var(--color-muted)]">{e.when}</p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-[0.14em] text-[color:var(--color-danger)]">? {e.type.toUpperCase()}</p>
                <p className="mono mt-2 text-[15px]">{e.snippet}</p>
                <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">
                  Concept: <span className="text-[color:var(--color-text)]/90">{e.concept}</span>
                </p>
              </div>
              <div>
                <span className="chip chip-gold">? Understood</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
