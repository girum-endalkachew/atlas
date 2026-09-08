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
          setTimeout(() => { setPhase("resolved"); }, 900);
          return s;
        }
        return s;
      });
    }, 550);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resolved") return;
    const t = setTimeout(() => { setPhase("forward"); setStep(0); }, 2600);
    return () => clearTimeout(t);
  }, [phase]);

  const sequence = phase === "trace" ? backward : forward;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines grid-mask opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[560px] w-[820px] rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.18),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-[1200px] items-center gap-14 px-6 pt-32 pb-24 lg:grid-cols-[1fr_1fr]">
        {/* LEFT */}
        <div className="relative z-10">
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.28em] text-white/45">
            Developer Error Atlas ? <span className="text-white/70">v1.0</span>
          </p>

          <h1 className="mt-6 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[60px] lg:text-[76px]">
            Errors are not
            <br />
            the end of the{" "}
            <span className="bg-gradient-to-r from-[#5572FF] to-[#8B6CFF] bg-clip-text text-transparent">
              story.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/60">
            Atlas follows the failure back to its cause ? and explains what it means.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/investigate"
              className="group mono inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#08090D] transition hover:bg-white/90"
            >
              Start Investigating
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/atlas"
              className="mono inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.02] px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/80 transition hover:bg-white/[0.05]"
            >
              Explore the Atlas
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2 mono text-[10.5px] uppercase tracking-[0.16em] text-white/40 sm:grid-cols-3">
            <p><span className="text-white/70">Trace</span> 0042</p>
            <p><span className="text-white/70">Stack</span> JS ? React</p>
            <p><span className="text-white/70">Env</span> Runtime</p>
            <p><span className="text-white/70">Signals</span> 5</p>
            <p><span className="text-[#B8F36A]">Root</span> Found</p>
            <p><span className="text-white/70">Latency</span> 240ms</p>
          </div>
        </div>

        {/* RIGHT ? ERROR CASCADE */}
        <div className="relative z-10 mx-auto w-full max-w-[520px]">
          {/* Error card */}
          <div className="rounded-sm border border-[#FF5C63]/30 bg-[#0D0F14]/80 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C63]" />
                <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-white/50">
                  Runtime ? Uncaught
                </span>
              </div>
              <span className="mono text-[10.5px] text-white/40">0042</span>
            </div>
            <div className="p-5 mono">
              <p className="text-[13px] font-semibold text-[#FF5C63]">TypeError</p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                Cannot read properties of undefined
              </p>
              <p className="text-[13px] text-white/60">(reading &apos;map&apos;)</p>
            </div>
          </div>

          {/* Cascade */}
          <div className="relative mt-6 rounded-sm border border-white/[0.08] bg-[#0D0F14]/70 p-6">
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
                {/* traveling glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/[0.06]">
                  <span className="signal-dot absolute left-1/2 top-0 block h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5572FF] to-transparent" />
                </div>

                <ul className="relative space-y-3">
                  {sequence.map((node, i) => {
                    const active = i <= step;
                    const isError = node === "ERROR";
                    return (
                      <li key={i} className="flex justify-center">
                        <div
                          className={
                            "mono w-56 rounded-sm border px-4 py-2.5 text-center text-[12.5px] transition-all duration-500 " +
                            (isError && active
                              ? "border-[#FF5C63]/60 bg-[#FF5C63]/10 text-[#FF5C63] shadow-[0_0_30px_-8px_rgba(255,92,99,0.6)]"
                              : active
                              ? "border-white/25 bg-white/[0.03] text-white"
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
    </section>
  );
}
