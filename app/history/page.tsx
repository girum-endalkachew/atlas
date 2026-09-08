const entries = [
  { type: "TypeError",      snippet: "Cannot read properties of undefined (reading 'map')", stack: "NEXT.JS",   when: "8m ago"     },
  { type: "HydrationError", snippet: "Text content does not match server-rendered HTML",    stack: "REACT",     when: "Yesterday" },
  { type: "ReferenceError", snippet: "user is not defined",                                 stack: "JAVASCRIPT",when: "3 days ago" },
];

export default function HistoryPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-24">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Debugging memory</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Errors you have already understood.</h1>
        <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Your journal builds itself as you investigate.</p>

        <div className="atlas-surface mt-10 overflow-hidden">
          {entries.map((e, i) => (
            <article key={i} className={"grid grid-cols-[auto_1fr_auto] items-start gap-x-8 gap-y-1 px-6 py-6 " + (i < entries.length - 1 ? "hairline-b" : "")}>
              <div className="min-w-[140px]">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{e.stack}</p>
                <p className="mono mt-2 text-[10.5px] text-[color:var(--color-muted)]">{e.when}</p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-[0.14em] text-[color:var(--color-danger)]">? {e.type.toUpperCase()}</p>
                <p className="mono mt-2 text-[15px]">{e.snippet}</p>
              </div>
              <div><span className="chip chip-gold">? Understood</span></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
