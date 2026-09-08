import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Crosshair, Lightbulb, Shield } from "lucide-react";

const pillars = [
  { icon: Brain, label: "Understand what happened" },
  { icon: Crosshair, label: "Find the real cause" },
  { icon: Lightbulb, label: "Get the right fix" },
  { icon: Shield, label: "Learn & prevent" },
];

const anatomy = [
  { label: "expects Array", cls: "bg-[#C8F56A] text-[#101114]" },
  { label: "received undefined", cls: "bg-[#A99BFF] text-[#101114]" },
  { label: "data was not ready", cls: "bg-[#4969FF] text-white" },
  { label: "TypeError", cls: "bg-[#FF5C5C] text-white" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0C10]">
      {/* Grid + glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[720px] rounded-full bg-[radial-gradient(circle,#4969FF,transparent_60%)] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#A99BFF,transparent_60%)] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#FF5C5C,transparent_60%)] opacity-20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-24 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT */}
        <div className="relative z-10 space-y-8">
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
            <span className="text-[#FF5C5C]">Errors</span> are
            <br />
            trying to tell
            <br />
            you something.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-white/55 md:text-lg">
            Atlas turns cryptic developer errors into clear explanations, real solutions, and lasting lessons.
          </p>

          <div>
            <Link
              href="/investigate"
              className="inline-flex items-center gap-2 rounded-full bg-[#A99BFF] px-7 py-3.5 text-sm font-semibold text-[#0B0C10] shadow-[0_0_40px_-10px_rgba(169,155,255,0.6)] transition hover:brightness-110"
            >
              Start Investigating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2 sm:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.label} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80">
                  <p.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium leading-snug text-white/65">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Blended orb + floating cards + live preview */}
        <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:h-[560px]">
          {/* Blended globe (no card frame, uses mix-blend) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(73,105,255,0.35),transparent_60%)] blur-3xl" />
            <Image
              src="/hero.jpg"
              alt=""
              width={720}
              height={720}
              priority
              aria-hidden
              className="pointer-events-none relative h-auto w-[520px] max-w-none select-none opacity-90 mix-blend-screen"
            />
          </div>

          {/* Floating TypeError card */}
          <div className="absolute left-4 top-6 w-64 rotate-[-4deg] rounded-2xl border border-[#FF5C5C]/40 bg-[#12141A]/90 p-4 shadow-2xl backdrop-blur">
            <p className="text-sm font-bold text-[#FF5C5C]">TypeError</p>
            <p className="mt-2 font-mono text-[11px] leading-snug text-white/75">
              Cannot read properties
              <br />
              of undefined
              <br />
              (reading &apos;map&apos;)
            </p>
          </div>

          {/* Floating ReferenceError card */}
          <div className="absolute right-2 top-16 w-56 rotate-[6deg] rounded-2xl border border-[#A99BFF]/40 bg-[#12141A]/90 p-3 shadow-xl backdrop-blur">
            <p className="text-xs font-bold text-[#A99BFF]">ReferenceError</p>
            <p className="mt-1.5 font-mono text-[10px] leading-snug text-white/60">
              user is not defined
            </p>
          </div>

          {/* Floating SyntaxError card */}
          <div className="absolute bottom-8 left-8 w-52 rotate-[3deg] rounded-2xl border border-[#4969FF]/40 bg-[#12141A]/90 p-3 shadow-xl backdrop-blur">
            <p className="text-xs font-bold text-[#4969FF]">SyntaxError</p>
            <p className="mt-1.5 font-mono text-[10px] leading-snug text-white/60">
              Unexpected token &apos;)&apos;
            </p>
          </div>
        </div>
      </div>

      {/* LIVE PREVIEW */}
      <div className="relative mx-auto max-w-3xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1116]/90 p-6 shadow-2xl backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Live preview
            </span>
            <span className="rounded-full bg-[#FF5C5C]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#FF5C5C]">
              TypeError
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#07080B] p-4 font-mono text-sm">
            <p className="text-[#FF5C5C]">TypeError</p>
            <p className="mt-2 text-white/70">Cannot read properties of undefined</p>
            <p className="text-white/85">(reading map)</p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              {["JS", "R", "N"].map((t) => (
                <span
                  key={t}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0B0C10] text-[10px] font-bold text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="/investigate"
              className="inline-flex items-center gap-2 rounded-full bg-[#4969FF] px-4 py-2 text-xs font-semibold text-white hover:brightness-110"
            >
              Investigate
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-between gap-2 overflow-x-auto pb-1">
            {anatomy.map((n, i) => (
              <div key={n.label} className="flex items-center gap-2">
                <span className={"rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap " + n.cls}>
                  {n.label}
                </span>
                {i < anatomy.length - 1 && <span className="text-white/30 text-xs">?</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
