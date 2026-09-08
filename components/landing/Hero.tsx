import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 topo topo-mask opacity-90" />
      <div className="mx-auto grid min-h-[86vh] max-w-[1200px] items-center gap-16 px-6 pt-32 pb-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="rise">
          <p className="mono text-[10.5px] uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
            Atlas ? Alpine Instrument
          </p>
          <h1 className="mt-6 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[60px] lg:text-[80px]">
            Errors are not <br />
            the end of the story.
          </h1>
          <p className="mono mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            <span>Error</span>
            <span className="text-[color:var(--color-sky)]">?</span>
            <span className="text-[color:var(--color-text)]">Trace</span>
            <span className="text-[color:var(--color-sky)]">?</span>
            <span className="text-[color:var(--color-gold)]">Understand</span>
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            Turn confusing errors into clear root causes, fixes, and knowledge.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/investigate" className="btn-primary">
              Start Investigating
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/atlas" className="btn-ghost">Explore the Atlas</Link>
          </div>
        </div>

        {/* Signal column */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="atlas-surface p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="chip chip-sky">
                <span className="dot dot-sky" /> Signal
              </span>
              <span className="mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">Trace 0042</span>
            </div>

            <div className="atlas-inset p-5">
              <p className="mono text-[12.5px] text-[color:var(--color-muted)]">TypeError</p>
              <p className="mono mt-2 text-[13px] leading-relaxed">
                Cannot read properties of undefined
                <br />
                (reading &apos;map&apos;)
              </p>
            </div>

            <div className="relative mt-6">
              <div className="pointer-events-none absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[color:var(--color-border)]">
                <span className="signal-dot absolute left-1/2 top-0 block h-10 w-px -translate-x-1/2 bg-[color:var(--color-sky)]" />
              </div>
              <ul className="relative space-y-2">
                {["DATA","users","undefined",".map()","ROOT CAUSE"].map((node, i) => {
                  const isRoot = node === "ROOT CAUSE";
                  return (
                    <li key={node} className="flex justify-center">
                      <div
                        className={
                          "mono w-56 rounded-lg border px-4 py-2.5 text-center text-[12px] tracking-[0.14em] " +
                          (isRoot
                            ? "border-[color:var(--color-gold)]/60 text-[color:var(--color-gold)] gold-glow bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)]"
                            : "border-[color:var(--color-border)] text-[color:var(--color-text)]/80 bg-[color:var(--color-elevated)]")
                        }
                      >
                        {isRoot ? "? ROOT CAUSE" : node}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
