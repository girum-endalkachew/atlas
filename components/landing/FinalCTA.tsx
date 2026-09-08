import Link from "next/link";
import { ArrowRight } from "lucide-react";

const orbit = ["ERROR", "TRACE", "CAUSE", "FIX", "LEARN"];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0F1219] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.16),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1000px]">
        <div className="relative mx-auto flex h-[340px] w-full max-w-[560px] items-center justify-center">
          <div className="spin-slower absolute h-[280px] w-[280px] rounded-full border border-white/[0.08]" />
          <div className="spin-slow absolute h-[400px] w-[400px] rounded-full border border-white/[0.05]" />

          {orbit.map((label, i) => {
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            const r = 190;
            const x = 50 + (Math.cos(angle) * r) / 5.6;
            const y = 50 + (Math.sin(angle) * r) / 5.6;
            return (
              <span
                key={label}
                className="mono absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10.5px] tracking-[0.16em] text-white/75 backdrop-blur"
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
            className="mono group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#08090D] transition hover:bg-white/90"
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
