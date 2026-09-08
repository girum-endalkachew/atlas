"use client";

import { useEffect, useState } from "react";

const stages = [
  {
    key: "ERROR",
    title: "Symptom appears",
    content: (
      <div className="mono">
        <p className="text-[13px] font-semibold text-[#FF5C63]">TypeError</p>
        <p className="mt-2 text-[13px] text-white/75">Cannot read properties of undefined</p>
      </div>
    ),
  },
  {
    key: "TRACE",
    title: "Follow the signal",
    content: (
      <div className="mono text-[13px] text-white/75">
        <p>data.users</p>
        <p className="text-white/35">      ?</p>
        <p className="text-[#FF5C63]">undefined</p>
      </div>
    ),
  },
  {
    key: "CAUSE",
    title: "Identify the source",
    content: (
      <div className="mono">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Root cause</p>
        <p className="mt-2 text-[13px] text-white">ASYNC DATA ? NOT READY</p>
      </div>
    ),
  },
  {
    key: "FIX",
    title: "Apply the resolution",
    content: (
      <pre className="mono text-[12px] leading-relaxed text-[#B8F36A]">{`const users = data?.users ?? [];
return users.map(...);`}</pre>
    ),
  },
  {
    key: "LEARN",
    title: "Absorb the concept",
    content: (
      <div className="mono">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Concept</p>
        <p className="mt-2 text-[13px] text-white">Asynchronous data flow</p>
      </div>
    ),
  },
];

export default function Transformation() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % stages.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative border-t border-white/[0.06] bg-[#0D0F14] px-6 py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-2xl">
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
            The transformation
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
            Watch an error become understandable.
          </h2>
        </div>

        {/* Timeline */}
        <ol className="relative grid grid-cols-5 gap-2">
          <span className="pointer-events-none absolute left-0 right-0 top-4 h-px bg-white/[0.08]" />
          {stages.map((s, idx) => {
            const active = idx === i;
            const done = idx < i;
            return (
              <li key={s.key} className="relative flex flex-col items-start">
                <span
                  className={
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[11px] mono transition " +
                    (active
                      ? "border-[#5572FF] bg-[#5572FF]/10 text-white"
                      : done
                      ? "border-[#B8F36A]/60 bg-[#B8F36A]/10 text-[#B8F36A]"
                      : "border-white/15 bg-[#08090D] text-white/45")
                  }
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p
                  className={
                    "mt-3 mono text-[11px] uppercase tracking-[0.16em] transition " +
                    (active ? "text-white" : "text-white/40")
                  }
                >
                  {s.key}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Stage panel */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-sm border border-white/[0.08] bg-[#08090D] p-6">
            <p className="mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">
              Stage {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-[26px] font-semibold tracking-tight text-white">
              {stages[i].title}
            </h3>
            <p className="mt-3 text-[13px] text-white/55">
              Atlas transforms the same error through five states until the developer arrives at understanding.
            </p>
          </div>
          <div key={i} className="rise rounded-sm border border-white/[0.08] bg-[#08090D] p-6 min-h-[180px] flex items-center">
            <div className="w-full">{stages[i].content}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
