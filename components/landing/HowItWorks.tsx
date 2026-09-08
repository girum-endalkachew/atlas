import { FileInput, Sparkles, Eye, Wrench } from "lucide-react";

const steps = [
  { n: "01", title: "Paste Error", desc: "Drop a stack trace, message, or snippet.", icon: FileInput },
  { n: "02", title: "Atlas analyzes", desc: "Deterministic parse + deep explanation.", icon: Sparkles },
  { n: "03", title: "Understand", desc: "Animated error anatomy and root cause.", icon: Eye },
  { n: "04", title: "Fix & Learn", desc: "Apply the fix. Lock in the lesson.", icon: Wrench },
];

export default function HowItWorks() {
  return (
    <section id="features" className="relative border-y border-white/5 bg-[#0F1116] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A99BFF]">
          How it works
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          From error to understanding in minutes.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
          The full loop: dump an error, see the anatomy, fix with reason, remember the lesson.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0C10] p-6 transition hover:border-[#A99BFF]/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#A99BFF]/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#A99BFF]">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-semibold text-[#4969FF]">{s.n}</span>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
