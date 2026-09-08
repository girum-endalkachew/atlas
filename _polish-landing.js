const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function write(file, content) {
  const full = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, { encoding: "utf8" });
  console.log("Wrote", file);
}

/* =================== GLOBAL CSS =================== */
write("app/globals.css", `@import "tailwindcss";

@theme {
  --color-bg: #08090D;
  --color-bg-2: #0B0D13;
  --color-bg-3: #0F1219;
  --color-line: #1A1E28;
  --color-text: #F5F5F7;
  --color-muted: #858B9B;
  --color-blue: #5572FF;
  --color-violet: #8B6CFF;
  --color-coral: #FF5C63;
  --color-lime: #B8F36A;
  --font-sans: var(--font-sans), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}

html, body {
  background: #08090D;
  color: #F5F5F7;
}

body {
  font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1;
  -webkit-font-smoothing: antialiased;
}

::selection { background: rgba(139, 108, 255, 0.35); color: #fff; }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1A1E28; border-radius: 9999px; }
::-webkit-scrollbar-thumb:hover { background: #2A2F3D; }

.mono { font-family: var(--font-mono); }

/* --- Backgrounds --- */
.grid-lines {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.030) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.030) 1px, transparent 1px);
  background-size: 64px 64px;
}
.grid-mask {
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}
.noise {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 260px 260px;
  mix-blend-mode: overlay;
}

/* --- Glass primitives --- */
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    0 40px 60px -30px rgba(0,0,0,0.7),
    0 8px 24px -12px rgba(0,0,0,0.6);
}
.glass-soft {
  background: linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.008));
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.glass-hover {
  transition: border-color .35s ease, transform .35s ease, box-shadow .35s ease;
}
.glass-hover:hover {
  border-color: rgba(255,255,255,0.16);
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 40px 60px -30px rgba(0,0,0,0.8),
    0 12px 30px -12px rgba(85,114,255,0.15);
}

/* --- Gradient borders (mask trick) --- */
.gradient-border {
  position: relative;
  isolation: isolate;
}
.gradient-border::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(140deg, rgba(85,114,255,0.55), rgba(139,108,255,0.15) 40%, rgba(255,255,255,0.06) 70%, rgba(139,108,255,0.35));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

/* --- Utility glows --- */
.glow-blue { box-shadow: 0 0 60px -20px rgba(85,114,255,0.55); }
.glow-violet { box-shadow: 0 0 60px -20px rgba(139,108,255,0.55); }
.glow-coral { box-shadow: 0 0 60px -20px rgba(255,92,99,0.5); }

/* --- Motion --- */
@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
.cursor::after {
  content: "";
  display: inline-block;
  width: 8px; height: 1em;
  margin-left: 3px; vertical-align: -2px;
  background: currentColor;
  animation: blink 1.1s steps(1) infinite;
}

@keyframes signal {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
.signal-dot { animation: signal 2.4s linear infinite; }

@keyframes rise {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
.rise { animation: rise 0.6s ease-out both; }

@keyframes spin-slow { to { transform: rotate(360deg); } }
.spin-slow { animation: spin-slow 40s linear infinite; }
.spin-slower { animation: spin-slow 80s linear infinite; }

@keyframes travel {
  0%   { top: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.travel { animation: travel 3.4s linear infinite; }

@keyframes pulse-soft {
  0%,100% { opacity: 0.65; transform: scale(1); }
  50%     { opacity: 1;    transform: scale(1.05); }
}
.pulse-soft { animation: pulse-soft 3.2s ease-in-out infinite; }
`);

/* =================== NAV =================== */
write("components/layout/Navbar.tsx", `"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#product", label: "Product" },
  { href: "/atlas", label: "Atlas" },
  { href: "/learn", label: "Learn" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/[0.06] bg-[#08090D]/70 backdrop-blur-2xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <AtlasMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] text-white">ATLAS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[12.5px] font-medium text-white/55 transition hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#5572FF] to-[#8B6CFF] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/investigate"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#08090D] transition hover:bg-white/90"
          >
            <span className="relative z-10">Start Investigating</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button className="md:hidden text-white/80" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#08090D]/95 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/investigate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#08090D]"
            >
              Start Investigating <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function AtlasMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5572FF" />
          <stop offset="1" stopColor="#8B6CFF" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="url(#mg)" strokeOpacity="0.8" />
      <path d="M4.5 14.5 L10 5.5 L15.5 14.5" stroke="#F5F5F7" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="10" cy="11" r="1.4" fill="url(#mg)" />
    </svg>
  );
}
`);

/* =================== HERO =================== */
write("components/landing/Hero.tsx", `"use client";

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
`);

/* =================== TRANSFORMATION (glass panels) =================== */
write("components/landing/Transformation.tsx", `"use client";

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
      <pre className="mono text-[12px] leading-relaxed text-[#B8F36A]">{\`const users = data?.users ?? [];
return users.map(...);\`}</pre>
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
    <section className="relative border-t border-white/[0.06] bg-[#0B0D13] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="relative mx-auto max-w-[1200px]">
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
          <span className="pointer-events-none absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          {stages.map((s, idx) => {
            const active = idx === i;
            const done = idx < i;
            return (
              <li key={s.key} className="relative flex flex-col items-start">
                <span
                  className={
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[11px] mono transition " +
                    (active
                      ? "border-[#5572FF] bg-[#5572FF]/15 text-white glow-blue"
                      : done
                      ? "border-[#B8F36A]/60 bg-[#B8F36A]/10 text-[#B8F36A]"
                      : "border-white/15 bg-[#0B0D13] text-white/45")
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
          <div className="gradient-border rounded-2xl">
            <div className="glass rounded-2xl p-6">
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
          </div>
          <div key={i} className="rise gradient-border rounded-2xl">
            <div className="glass min-h-[180px] rounded-2xl p-6 flex items-center">
              <div className="w-full">{stages[i].content}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

/* =================== ERROR ANATOMY =================== */
write("components/landing/ErrorAnatomy.tsx", `const parts = [
  { key: "SYMPTOM", tone: "coral", detail: "What the user or runtime observes." },
  { key: "TRIGGER", tone: "coral", detail: "The specific call that raised the failure." },
  { key: "ASSUMPTION", tone: "blue", detail: "The implicit assumption the code relied on." },
  { key: "ROOT CAUSE", tone: "blue", detail: "The underlying state or logic that violated it." },
  { key: "FIX", tone: "lime", detail: "The resolution that restores correctness." },
];

const tones: Record<string, string> = {
  coral: "border-[#FF5C63]/50 text-[#FF5C63]",
  blue: "border-[#5572FF]/50 text-[#5572FF]",
  lime: "border-[#B8F36A]/60 text-[#B8F36A]",
};

export default function ErrorAnatomy() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#08090D] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-2xl">
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
            Error anatomy
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
            Every failure has a structure.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/55">
            Atlas breaks each error into its diagnostic parts ? the same way a good engineer would trace it by hand.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-white/[0.08]">
              <span className="travel absolute left-1/2 -translate-x-1/2 block h-16 w-px bg-gradient-to-b from-transparent via-[#8B6CFF] to-transparent" />
            </div>
            <ul className="relative space-y-4">
              {parts.map((p) => (
                <li key={p.key} className="flex justify-center">
                  <div className={"mono glass-soft w-full rounded-xl border px-4 py-3 text-center text-[12px] tracking-[0.14em] " + tones[p.tone]}>
                    {p.key}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ol className="space-y-2">
            {parts.map((p, i) => (
              <li
                key={p.key}
                className="glass-hover glass-soft grid grid-cols-[auto_auto_1fr] items-center gap-4 rounded-xl px-4 py-4"
              >
                <span className="mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className={"mono text-[11px] tracking-[0.16em] " + tones[p.tone].split(" ")[1]}>{p.key}</span>
                <p className="text-[13.5px] text-white/70">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
`);

/* =================== ATLAS NETWORK =================== */
write("components/landing/AtlasNetwork.tsx", `"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Node = { id: string; label: string; x: number; y: number };

const nodes: Node[] = [
  { id: "atlas", label: "ATLAS", x: 50, y: 50 },
  { id: "js",    label: "JavaScript", x: 18, y: 22 },
  { id: "ts",    label: "TypeScript", x: 82, y: 22 },
  { id: "py",    label: "Python",     x: 12, y: 78 },
  { id: "react", label: "React",      x: 30, y: 45 },
  { id: "next",  label: "Next.js",    x: 70, y: 45 },
  { id: "state", label: "State",      x: 40, y: 20 },
  { id: "async", label: "Async",      x: 60, y: 20 },
  { id: "api",   label: "API",        x: 82, y: 62 },
  { id: "run",   label: "Runtime",    x: 50, y: 82 },
  { id: "build", label: "Build",      x: 18, y: 62 },
  { id: "db",    label: "Database",   x: 88, y: 80 },
  { id: "net",   label: "Network",    x: 30, y: 88 },
];

const links: [string, string][] = [
  ["atlas","js"],["atlas","ts"],["atlas","py"],["atlas","react"],["atlas","next"],
  ["atlas","state"],["atlas","async"],["atlas","api"],["atlas","run"],["atlas","build"],
  ["atlas","db"],["atlas","net"],
  ["js","react"],["ts","react"],["ts","next"],["react","next"],
  ["react","state"],["react","async"],["next","api"],["next","run"],
  ["async","api"],["api","net"],["db","api"],["build","next"],["py","api"],
];

export default function AtlasNetwork() {
  const [hover, setHover] = useState<string | null>(null);

  const connected = new Set<string>();
  if (hover) {
    links.forEach(([a, b]) => {
      if (a === hover) connected.add(b);
      if (b === hover) connected.add(a);
    });
    connected.add(hover);
  }

  return (
    <section id="product" className="relative border-t border-white/[0.06] bg-[#0B0D13] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
            The Atlas
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
            Every error belongs somewhere.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/55">
            A living network of the errors, frameworks, and concepts developers encounter every day. Hover a node ? the field responds.
          </p>
          <Link
            href="/atlas"
            className="mono mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#08090D]"
          >
            Explore the Atlas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.14),transparent_60%)] blur-2xl" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map(([a, b], i) => {
              const na = nodes.find((n) => n.id === a)!;
              const nb = nodes.find((n) => n.id === b)!;
              const active = hover && (connected.has(a) && connected.has(b));
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={active ? "rgba(139,108,255,0.6)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="0.15"
                />
              );
            })}
          </svg>

          {nodes.map((n) => {
            const isCenter = n.id === "atlas";
            const dim = hover ? !connected.has(n.id) : false;
            const active = hover === n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: n.x + "%", top: n.y + "%" }}
              >
                <span
                  className={
                    "mono block rounded-full border px-3 py-1.5 text-[11px] tracking-[0.1em] transition backdrop-blur " +
                    (isCenter
                      ? "border-white/25 bg-white/[0.06] text-white shadow-[0_0_40px_-8px_rgba(85,114,255,0.4)]"
                      : active
                      ? "border-[#8B6CFF]/70 bg-[#8B6CFF]/15 text-white"
                      : dim
                      ? "border-white/[0.05] bg-transparent text-white/25"
                      : "border-white/10 bg-white/[0.03] text-white/75 hover:text-white")
                  }
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

/* =================== KNOWLEDGE (glass progression cards) =================== */
write("components/landing/Knowledge.tsx", `export default function Knowledge() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#08090D] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="relative mx-auto max-w-[1100px] space-y-14">
        <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Knowledge
        </p>

        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white/60 sm:text-[46px]">
            Fixing one error is useful.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white/85 sm:text-[46px]">
            Understanding why it happened is more valuable.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[46px]">
            Knowing how to recognize it next time is the point.
          </h2>
        </div>

        <div className="grid gap-4 pt-6 sm:grid-cols-3">
          <Progression id="001" state="UNDERSTOOD" tone="text-[#B8F36A]" label="Understood the fix." />
          <Progression id="014" state="PATTERN DETECTED" tone="text-[#5572FF]" label="Same shape seen 3? before." />
          <Progression id="031" state="CONCEPT MASTERED" tone="text-[#8B6CFF]" label="Async data flow internalized." />
        </div>
      </div>
    </section>
  );
}

function Progression({ id, state, tone, label }: { id: string; state: string; tone: string; label: string }) {
  return (
    <div className="glass-hover gradient-border rounded-2xl">
      <div className="glass rounded-2xl p-5">
        <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
          Error #{id}
        </p>
        <p className={"mono mt-3 text-[11.5px] font-semibold tracking-[0.16em] " + tone}>
          ? {state}
        </p>
        <p className="mt-3 text-[13px] text-white/70">{label}</p>
      </div>
    </div>
  );
}
`);

/* =================== DEBUGGING MEMORY (row hover + glass) =================== */
write("components/landing/DebuggingMemory.tsx", `const entries = [
  { type: "TypeError",       stack: "React",       snippet: "users.map()",                     when: "2 hours ago", concept: "Async data",         tone: "#FF5C63" },
  { type: "ReferenceError",  stack: "JavaScript",  snippet: "user is not defined",             when: "Yesterday",   concept: "Scope",              tone: "#8B6CFF" },
  { type: "HydrationError",  stack: "Next.js",     snippet: "Text content did not match",      when: "3 days ago",  concept: "SSR / client parity",tone: "#5572FF" },
];

export default function DebuggingMemory() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#0B0D13] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-14 max-w-2xl">
          <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
            Your debugging memory
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
            Your mistakes become knowledge.
          </h2>
        </div>

        <div className="gradient-border rounded-2xl">
          <div className="glass overflow-hidden rounded-2xl">
            {entries.map((e, i) => (
              <article
                key={i}
                className={
                  "grid grid-cols-[auto_1fr] items-start gap-x-8 gap-y-1 px-6 py-6 transition hover:bg-white/[0.03] sm:grid-cols-[140px_1fr_200px] " +
                  (i < entries.length - 1 ? "border-b border-white/[0.06]" : "")
                }
              >
                <div>
                  <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
                    {e.stack}
                  </p>
                  <p className="mono mt-2 text-[10.5px] text-white/35">{e.when}</p>
                </div>

                <div>
                  <p className="mono text-[11px] tracking-[0.14em]" style={{ color: e.tone }}>
                    ? {e.type.toUpperCase()}
                  </p>
                  <p className="mono mt-2 text-[15px] text-white">{e.snippet}</p>
                  <p className="mt-2 text-[13px] text-white/55">
                    Concept: <span className="text-white/85">{e.concept}</span>
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[#B8F36A]">
                    ? Understood
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

/* =================== FINAL CTA (orbit + glass button ring) =================== */
write("components/landing/FinalCTA.tsx", `import Link from "next/link";
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
`);

console.log("\\nPolished landing UI written.");

try {
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync('git commit -m "polish: glass cards, gradient borders, refined motion and hierarchy on landing"', { stdio: "inherit" });
  } catch { console.log("(nothing to commit)"); }
  execSync("git push", { stdio: "inherit" });
} catch (e) {
  console.error("Git step issue:", e.message);
}
