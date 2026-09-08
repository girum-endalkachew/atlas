import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Crosshair,
  Lightbulb,
  Shield,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Understand what happened",
    desc: "Plain-language breakdown of the failure chain.",
  },
  {
    icon: Crosshair,
    title: "Find the real cause",
    desc: "Root cause — not just the surface stack trace.",
  },
  {
    icon: Lightbulb,
    title: "Get the right fix",
    desc: "Multiple fixes with reasoning, not magic snippets.",
  },
  {
    icon: Shield,
    title: "Learn & prevent",
    desc: "Turn every error into a lasting engineering lesson.",
  },
];

const steps = [
  { n: "01", title: "Paste Error", desc: "Drop a stack trace, message, or snippet." },
  { n: "02", title: "Atlas analyzes", desc: "Deterministic parse + deep explanation." },
  { n: "03", title: "Understand", desc: "Animated error anatomy & root cause." },
  { n: "04", title: "Fix & Learn", desc: "Apply the fix. Lock in the lesson." },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cobalt/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-0 h-[320px] w-[320px] rounded-full bg-violet/15 blur-[100px]" />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-2 lg:items-center lg:pt-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-obsidian-border bg-obsidian-light/80 px-3 py-1 text-xs font-medium text-fog light-mode:border-paper-border light-mode:bg-paper-card">
            <Sparkles className="h-3.5 w-3.5 text-lime" />
            Developer Error Intelligence
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-coral">Errors</span>
            <span className="text-paper light-mode:text-obsidian"> are trying to tell you something.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-fog">
            Atlas turns cryptic developer errors into clear explanations, real
            solutions, and lasting lessons.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/investigate"
              className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-obsidian transition hover:brightness-110"
            >
              Start Investigating
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/atlas"
              className="inline-flex items-center gap-2 rounded-full border border-obsidian-border bg-transparent px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-white/5 light-mode:border-paper-border light-mode:text-obsidian light-mode:hover:bg-ink/5"
            >
              Explore the Atlas
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-obsidian-border bg-obsidian-light text-cobalt light-mode:border-paper-border light-mode:bg-paper-card">
                  <p.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium leading-snug text-paper light-mode:text-obsidian">
                  {p.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive preview card */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cobalt/30 via-violet/20 to-coral/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-obsidian-border bg-obsidian-light/90 p-6 shadow-2xl backdrop-blur light-mode:border-paper-border light-mode:bg-paper-card">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-fog">
                Live preview
              </span>
              <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-[10px] font-semibold text-coral">
                TypeError
              </span>
            </div>

            <div className="rounded-xl border border-obsidian-border bg-obsidian p-4 font-mono text-sm light-mode:border-paper-border light-mode:bg-white">
              <p className="text-coral">TypeError</p>
              <p className="mt-2 text-fog">Cannot read properties of undefined</p>
              <p className="text-paper/80 light-mode:text-ink">(reading &apos;map&apos;)</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex -space-x-2">
                {["JS", "React", "Next"].map((t) => (
                  <span
                    key={t}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-obsidian-border bg-obsidian text-[10px] font-bold text-fog light-mode:border-paper-border light-mode:bg-paper"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/investigate"
                className="inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2 text-xs font-semibold text-white hover:bg-cobalt-hover"
              >
                Investigate
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mini anatomy strip */}
            <div className="mt-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {[
                { label: "expects Array", color: "bg-lime text-obsidian" },
                { label: "received undefined", color: "bg-violet text-obsidian" },
                { label: "data wasn't ready", color: "bg-cobalt text-white" },
                { label: "TypeError", color: "bg-coral text-white" },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-1">
                  <span className={\ounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap \\}>
                    {node.label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-fog/50 text-xs">?</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-t border-obsidian-border bg-obsidian-light/50 py-20 light-mode:border-paper-border light-mode:bg-paper-dark/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-paper light-mode:text-obsidian md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-fog">
              The full loop: dump an error, see the anatomy, fix with reason, remember the lesson.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-obsidian-border bg-obsidian p-6 light-mode:border-paper-border light-mode:bg-paper-card"
              >
                <span className="font-mono text-xs font-semibold text-cobalt">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-paper light-mode:text-obsidian">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-paper light-mode:text-obsidian md:text-4xl">
            Stop googling the same stack trace.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fog">
            Build a personal map of every failure you&apos;ve conquered — and never repeat the same blind fix twice.
          </p>
          <Link
            href="/investigate"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-sm font-semibold text-white transition hover:bg-coral-hover glow-coral"
          >
            Investigate your first error
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
