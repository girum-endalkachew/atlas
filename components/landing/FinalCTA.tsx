import Link from "next/link";
import { ArrowRight } from "lucide-react";

const orbit = ["ERROR", "TRACE", "CAUSE", "FIX", "LEARN"];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#10131B] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

      <div className="relative mx-auto max-w-[1000px]">
        {/* Orbit visualization */}
        <div className="relative mx-auto flex h-[320px] w-full max-w-[560px] items-center justify-center">
          <div className="spin-slower absolute h-[280px] w-[280px] rounded-full border border-white/[0.08]" />
          <div className="spin-slow absolute h-[380px] w-[380px] rounded-full border border-white/[0.05]" />

          {orbit.map((label, i) => {
            const angle = (i / orbit.length) * Math.PI * 2;
            const r = 170;
            const x = 50 + (Math.cos(angle) * r) / 5.6;
            const y = 50 + (Math.sin(angle) * r) / 5.6;
            return (
              <span
                key={label}
                className="mono absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border border-white/10 bg-[#0D0F14]/85 px-3 py-1 text-[10.5px] tracking-[0.16em] text-white/70"
                style={{ left: x + "%", top: y + "%" }}
              >
                {label}
              </span>
            );
          })}

          <div className="relative z-10 text-center">
            <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px]">
              Every error is a clue.
            </h2>
            <p className="mt-3 text-[14px] text-white/60">Start following it.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <Link
            href="/investigate"
            className="mono group inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#08090D] transition hover:bg-white/90"
          >
            Start Investigating
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <p className="mono text-[10.5px] tracking-[0.18em] text-white/40">
            No account required.
          </p>
        </div>
      </div>
    </section>
  );
}
