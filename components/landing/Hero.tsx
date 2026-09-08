"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const forward = ["DATA", "users", "undefined", ".map()", "ERROR"];
const backward = ["ERROR", ".map()", "undefined", "users", "DATA"];
type Phase = "forward" | "trace" | "resolved";

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("forward");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (phase === "forward" && s < forward.length - 1) return s + 1;
        if (phase === "forward" && s === forward.length - 1) {
          setTimeout(() => { setPhase("trace"); setStep(0); }, 900);
          return s;
        }
        if (phase === "trace" && s < backward.length - 1) return s + 1;
        if (phase === "trace" && s === backward.length - 1) {
          setTimeout(() => setPhase("resolved"), 900);
          return s;
        }
        return s;
      });
    }, 560);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resolved") return;
    const t = setTimeout(() => { setPhase("forward"); setStep(0); }, 2800);
    return () => clearTimeout(t);
  }, [phase]);

  const sequence = phase === "trace" ? backward : forward;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-70" />
      <div className="pointer-events-none absolute inset-0 noise opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[560px] w-[820px] rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.22),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(139,108,255,0.18),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-[1200px] items-center gap-14 px-6 pt-32 pb-24 lg:grid-cols-[1fr_1fr]">
        {/* LEFT */}
        <div className="relative z-10 rise">
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.28em] text-white/45">
            Developer Error Atlas ? <span className="text-white/70">v1.0</span>
          </p>

          <h1 className="mt-6 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[60px] lg:text-[76px]">
            Errors are not
            <br />
            the end of the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#5572FF] to-[#8B6CFF] bg-clip-text text-transparent">story.</span>
              <span className="pointer-events-none absolute -inset-x-1 -bottom-2 h-1 rounded-full bg-gradient-to-r from-[#5572FF]/0 via-[#8B6CFF]/40 to-[#5572FF]/0 blur-sm" />
            </span>
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/60">
            Atlas follows the failure back to its cause ? and explains what it means.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/investigate"
              className="group mono inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#08090D] transition hover:bg-white/90"
            >
              Start Investigating
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/atlas"
              className="glass mono inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/85 transition hover:text-white"
            >
              Explore the Atlas
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 mono text-[10.5px] uppercase tracking-[0.16em] text-white/40 sm:grid-cols-3">
            <p><span className="text-white/70">Trace</span> 0042</p>
            <p><span className="text-white/70">Stack</span> JS ? React</p>
            <p><span className="text-white/70">Env</span> Runtime</p>
            <p><span className="text-white/70">Signals</span> 5</p>
            <p><span className="text-[#B8F36A]">Root</span> Found</p>
            <p><span className="text-white/70">Latency</span> 240ms</p>
          </div>
        </div>

        {/* RIGHT ? ERROR CASCADE (glass) */}
        <div className="relative z-10 mx-auto w-full max-w-[520px]">
          {/* Ambient orbs behind the card */}
          <div className="pointer-events-none absolute -inset-10">
            <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-[#5572FF]/20 blur-3xl pulse-soft" />
            <div className="absolute -right-6 bottom-4 h-48 w-48 rounded-full bg-[#8B6CFF]/20 blur-3xl pulse-soft" />
          </div>

          <div className="gradient-border rounded-2xl">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF5C63] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5C63]" />
                  </span>
                  <span className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">
                    Runtime ? Uncaught
                  </span>
                </div>
                <span className="mono text-[10.5px] text-white/40">0042</span>
              </div>

              {/* Error body */}
              <div className="p-5 mono">
                <p className="text-[13px] font-semibold text-[#FF5C63]">TypeError</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                  Cannot read properties of undefined
                </p>
                <p className="text-[13px] text-white/60">(reading &apos;map&apos;)</p>
              </div>

              {/* Cascade */}
              <div className="relative border-t border-white/[0.06] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
                    {phase === "forward" && "Cascade ? Forward"}
                    {phase === "trace" && "Cascade ? Tracing"}
                    {phase === "resolved" && <span className="text-[#B8F36A]">Cascade ? Root Cause Found</span>}
                  </span>
                  <span className="mono text-[10.5px] text-white/40">
                    {phase === "resolved" ? "5 / 5" : (step + 1) + " / 5"}
                  </span>
                </div>

                {phase !== "resolved" ? (
                  <div className="relative">
                    <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/[0.06]">
                      <span className="signal-dot absolute left-1/2 top-0 block h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#8B6CFF] to-transparent" />
                    </div>

                    <ul className="relative space-y-3">
                      {sequence.map((node, i) => {
                        const active = i <= step;
                        const isError = node === "ERROR";
                        return (
                          <li key={i} className="flex justify-center">
                            <div
                              className={
                                "mono w-56 rounded-lg border px-4 py-2.5 text-center text-[12.5px] transition-all duration-500 " +
                                (isError && active
                                  ? "border-[#FF5C63]/60 bg-[#FF5C63]/10 text-[#FF5C63] glow-coral"
                                  : active
                                  ? "border-white/25 bg-white/[0.04] text-white"
                                  : "border-white/[0.08] bg-transparent text-white/25")
                              }
                            >
                              {node}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <div className="py-10 text-center rise">
                    <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[#B8F36A]">
                      Root Cause
                    </p>
                    <p className="mt-3 text-[22px] font-semibold text-white">
                      users <span className="text-white/50">was</span> undefined.
                    </p>
                    <p className="mt-2 mono text-[12px] text-white/45">
                      Async data had not resolved when render occurred.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
