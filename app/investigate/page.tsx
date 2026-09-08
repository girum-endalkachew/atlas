import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ANALYSIS = [
  "READING ERROR",
  "IDENTIFYING SIGNAL",
  "TRACING FAILURE",
  "FINDING ROOT CAUSE",
  "BUILDING EXPLANATION",
];

const ANATOMY = [
  { n: "01", key: "SYMPTOM",    text: "Cannot read properties of undefined (reading 'map')." },
  { n: "02", key: "TRIGGER",    text: "The .map() call executed during render." },
  { n: "03", key: "ASSUMPTION", text: "data.users existed as an array." },
  { n: "04", key: "ROOT CAUSE", text: "data.users === undefined ? async response not resolved.", gold: true },
  { n: "05", key: "FAILURE",    text: "React aborts render and surfaces TypeError." },
  { n: "06", key: "FIX",        text: "Guard the render or normalize the shape upstream." },
];

const FIXES = [
  { title: "Initialize the collection", code: "const items = data?.items ?? [];", when: "Guarantees an iterable, safe during loading.", recommended: true },
  { title: "Guard the render",          code: "if (!data) return <Loading />;",   when: "Prevents render until data resolves." },
  { title: "Validate at boundary",      code: "assertUsers(data.users);",         when: "Fails loud at the API edge, not deep in the tree." },
];

export default function InvestigatePage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-24">

        {/* Meta bar */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Investigate</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Investigate an error</h1>
            <p className="mt-2 text-[14px] text-[color:var(--color-muted)]">Paste the signal. Atlas traces the cause.</p>
          </div>
          <div className="mono flex flex-wrap items-center gap-3 text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">
            <span>Trace <span className="text-[color:var(--color-text)]/85">0042</span></span>
            <span>?</span>
            <span>Status <span className="text-[color:var(--color-sky)]">READY</span></span>
          </div>
        </div>

        {/* Input row */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="atlas-surface p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="chip chip-sky"><span className="dot dot-sky" /> Error signal</span>
              <span className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Load sample</span>
            </div>
            <div className="atlas-inset min-h-[180px] p-4">
              <p className="mono text-[12.5px] leading-relaxed text-[color:var(--color-text)]/90">
                TypeError: Cannot read properties of undefined (reading &apos;map&apos;)
              </p>
              <p className="mono mt-3 text-[12px] text-[color:var(--color-muted)]">+ Add code context</p>
            </div>

            <div className="mt-4">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Code context</p>
              <div className="atlas-inset mt-2 p-4">
                <pre className="mono text-[12px] leading-relaxed">{`const users = data.users;
return users.map((u) => (
  <UserCard key={u.id} name={u.name} />
));`}</pre>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Ctrl / Cmd + Enter to trace</p>
              <button type="button" className="btn-primary">Trace error <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="atlas-panel p-5">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Context</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="atlas-inset p-3">
                  <p className="mono text-[10.5px] text-[color:var(--color-muted)]">Language</p>
                  <p className="mt-1 text-[13px]">JavaScript</p>
                </div>
                <div className="atlas-inset p-3">
                  <p className="mono text-[10.5px] text-[color:var(--color-muted)]">Framework</p>
                  <p className="mt-1 text-[13px]">Next.js</p>
                </div>
              </div>
            </div>

            <div className="atlas-panel p-5">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Pipeline</p>
              <ul className="relative mt-4 space-y-2">
                {["Read","Identify","Trace","Root cause","Explain"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className={"dot " + (i < 2 ? "dot-sky" : "dot-muted")} />
                    <span className="mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text)]/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Analyzing preview */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="atlas-surface p-6">
            <p className="mono text-center text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-sky)]">Engine active</p>
            <ul className="relative mx-auto mt-6 max-w-sm space-y-3">
              <div className="pointer-events-none absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[color:var(--color-border)]">
                <span className="signal-dot absolute left-1/2 top-0 block h-10 w-px -translate-x-1/2 bg-[color:var(--color-sky)]" />
              </div>
              {ANALYSIS.map((label, i) => {
                const isRoot = label === "FINDING ROOT CAUSE";
                return (
                  <li key={label} className="relative flex justify-center">
                    <div className={"mono w-full rounded-lg border px-4 py-3 text-center text-[11px] tracking-[0.18em] " +
                      (isRoot
                        ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)] gold-glow"
                        : i < 2
                          ? "border-[color:var(--color-sky)]/50 bg-[color:color-mix(in_oklab,var(--color-sky)_10%,transparent)] text-[color:var(--color-text)]"
                          : "border-[color:var(--color-border)] text-[color:var(--color-muted)]")}>
                      {label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Results preview */}
          <div className="atlas-surface p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-gold">Root found</span>
                <span className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Trace 0042</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">TypeError ? JavaScript ? Next.js</span>
              </div>
            </div>

            <h2 className="text-[24px] font-semibold leading-snug tracking-tight sm:text-[28px]">
              Something expected an array. It received undefined.
            </h2>
            <p className="mono mt-2 text-[13px] text-[color:var(--color-muted)]">
              Cannot read properties of undefined (reading &apos;map&apos;)
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="atlas-inset p-4">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Root cause</p>
                <p className="mono mt-2 text-[13px]">data.users === undefined</p>
                <p className="mt-2 text-[12.5px] text-[color:var(--color-muted)]">Async data had not resolved when render occurred.</p>
              </div>
              <div className="atlas-inset p-4">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Code location</p>
                <pre className="mono mt-2 text-[12px] leading-relaxed">{`const users = data.users;
return users.map(...);`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomy */}
        <div className="mt-10">
          <h3 className="text-[22px] font-semibold tracking-tight">Error anatomy</h3>
          <ol className="mt-5 grid gap-3">
            {ANATOMY.map((row) => (
              <li key={row.n} className={"grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 rounded-lg border px-5 py-4 " +
                (row.gold
                  ? "border-[color:var(--color-gold)]/45 bg-[color:color-mix(in_oklab,var(--color-gold)_8%,transparent)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)]")}>
                <span className="mono text-[11px] text-[color:var(--color-muted)]">{row.n}</span>
                <span className={"mono text-[11px] tracking-[0.16em] " + (row.gold ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-sky)]")}>{row.key}</span>
                <p className="text-[13.5px] text-[color:var(--color-text)]/85">{row.text}</p>
                {row.gold ? <span className="chip chip-gold">Found</span> : <span className="mono text-[10.5px] text-[color:var(--color-muted)]">?</span>}
              </li>
            ))}
          </ol>
        </div>

        {/* Fixes */}
        <div className="mt-10">
          <h3 className="text-[22px] font-semibold tracking-tight">Fix options</h3>
          <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">Multiple paths ? the recommended one is highlighted.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {FIXES.map((f, i) => (
              <div key={i} className={"rounded-lg border p-5 " +
                (f.recommended
                  ? "border-[color:var(--color-gold)]/50 bg-[color:color-mix(in_oklab,var(--color-gold)_8%,transparent)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)]")}>
                <div className="flex items-center justify-between">
                  <p className="mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">Option {String.fromCharCode(65 + i)}</p>
                  {f.recommended && <span className="chip chip-gold">? Recommended</span>}
                </div>
                <p className="mt-2 text-[14px] font-semibold">{f.title}</p>
                <pre className="atlas-inset mono mt-3 p-3 text-[12px] leading-relaxed">{f.code}</pre>
                <p className="mt-3 text-[12.5px] text-[color:var(--color-muted)]"><span className="text-[color:var(--color-text)]/70">When to use ? </span>{f.when}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention + Learn */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="atlas-panel p-5">
            <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-sky)]">Prevention</p>
            <ul className="mt-4 space-y-2">
              {["Model loading + empty + ready states explicitly.", "Type the API boundary and default array shapes.", "Fail loud at the edge, safely inside the tree."].map((p) => (
                <li key={p} className="flex gap-3 text-[13px]"><span className="dot dot-sky mt-2" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="atlas-panel p-5">
            <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Learn</p>
            <h4 className="mt-2 text-[16px] font-semibold">Asynchronous data flow</h4>
            <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">Understand how components render before async side effects resolve.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Promises","async / await","Loading states","Race conditions","Error boundaries"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <Link href="/learn" className="mono mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-gold)]">
              Open learning path <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <p className="mono mt-10 text-center text-[10.5px] tracking-[0.16em] text-[color:var(--color-muted)]">
          Saved to debugging memory ? local only
        </p>
      </div>
    </div>
  );
}
