const path = [
  { step: "Promises",       state: "done"    },
  { step: "async / await",  state: "done"    },
  { step: "Loading states", state: "current" },
  { step: "Race conditions",state: "todo"    },
  { step: "Error handling", state: "todo"    },
];

export default function LearnPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-24">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Learning paths</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">From debugging mistakes to understanding systems.</h1>
        <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Paths derived from what you have investigated.</p>

        <div className="atlas-surface mt-10 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Recommended</p>
              <h2 className="mt-2 text-[22px] font-semibold">Asynchronous JavaScript</h2>
              <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">2 / 5 understood</p>
            </div>
            <span className="chip chip-gold">In progress</span>
          </div>

          <ol className="relative mt-8">
            <div className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-[color:var(--color-border)]" />
            {path.map((p) => {
              const isDone = p.state === "done";
              const isCurrent = p.state === "current";
              return (
                <li key={p.step} className="relative pl-10 py-3">
                  <span className={"absolute left-1.5 top-4 h-3 w-3 rounded-full border " +
                    (isDone
                      ? "bg-[color:var(--color-gold)] border-[color:var(--color-gold)]"
                      : isCurrent
                        ? "bg-[color:var(--color-sky)] border-[color:var(--color-sky)] pulse-soft"
                        : "bg-[color:var(--color-canvas)] border-[color:var(--color-border)]")} />
                  <p className={"text-[15px] " + (isDone ? "text-[color:var(--color-text)]/85" : isCurrent ? "font-semibold" : "text-[color:var(--color-muted)]")}>
                    {p.step}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
