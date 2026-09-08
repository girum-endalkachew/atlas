import Link from "next/link";
import { ArrowRight } from "lucide-react";

const orbit = ["ERROR", "TRACE", "CAUSE", "FIX", "LEARN"];

export default function FinalCTA() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-elevated)] px-6 py-28">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px]">
        <div className="relative mx-auto flex h-[320px] w-full max-w-[560px] items-center justify-center">
          <div className="spin-slower absolute h-[280px] w-[280px] rounded-full hairline" />
          <div className="spin-slow absolute h-[400px] w-[400px] rounded-full hairline" />

          {orbit.map((label, i) => {
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            const r = 190;
            const x = 50 + (Math.cos(angle) * r) / 5.6;
            const y = 50 + (Math.sin(angle) * r) / 5.6;
            return (
              <span
                key={label}
                className="chip absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x + "%", top: y + "%" }}
              >
                {label}
              </span>
            );
          })}

          <div className="relative z-10 text-center">
            <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
              Every error is a clue.
            </h2>
            <p className="mt-3 text-[14px] text-[color:var(--color-muted)]">Start following it.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link href="/investigate" className="btn-primary">
            Start Investigating <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">No account required.</p>
        </div>
      </div>
    </section>
  );
}
