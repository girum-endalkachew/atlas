const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function write(file, content) {
  const full = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, { encoding: "utf8" });
  console.log("Wrote", file);
}

/* ============================================================
   GLOBAL CSS ? Alpine Instrument tokens, light + dark, surfaces,
   topographic background, motion.
============================================================ */
write("app/globals.css", `@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;

  /* Semantic tokens (resolved per theme below) */
  --color-canvas: #0B1518;
  --color-surface: #101E22;
  --color-elevated: #16272C;
  --color-text: #F2F7F8;
  --color-muted: #8EA1A8;
  --color-border: #26383E;
  --color-hair: rgba(255,255,255,0.06);

  --color-sky: #8FC8E8;
  --color-sky-strong: #B9DDF2;
  --color-teal: #0E3936;
  --color-teal-strong: #123C3A;
  --color-gold: #D6A84F;
  --color-slate: #26343D;
  --color-snow: #F8FBFC;
  --color-signal: #8FC8E8;

  /* Alerts as states, not identity */
  --color-danger: #E86A6F;
  --color-success: #7FC98A;
}

:root, .dark {
  color-scheme: dark;
  --color-canvas: #0B1518;
  --color-surface: #101E22;
  --color-elevated: #16272C;
  --color-text: #F2F7F8;
  --color-muted: #8EA1A8;
  --color-border: #26383E;
  --color-hair: rgba(255,255,255,0.06);
  --color-sky: #8FC8E8;
  --color-sky-strong: #B9DDF2;
  --color-teal: #0E3936;
  --color-teal-strong: #123C3A;
  --color-gold: #D6A84F;
  --color-slate: #26343D;
}

.light {
  color-scheme: light;
  --color-canvas: #F2F7FA;
  --color-surface: #F9FCFD;
  --color-elevated: #FFFFFF;
  --color-text: #26343D;
  --color-muted: #687780;
  --color-border: #DCE7EC;
  --color-hair: rgba(38,52,61,0.06);
  --color-sky: #B9DDF2;
  --color-sky-strong: #8EC8E6;
  --color-teal: #123C3A;
  --color-teal-strong: #0E3936;
  --color-gold: #B98C36;
  --color-slate: #26343D;
}

html, body {
  background: var(--color-canvas);
  color: var(--color-text);
}
body {
  font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: color-mix(in oklab, var(--color-sky) 40%, transparent);
  color: var(--color-text);
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: color-mix(in oklab, var(--color-border) 80%, transparent);
  border-radius: 9999px;
}

.mono { font-family: var(--font-mono); }

/* -------- Layered atmospheric surfaces (no heavy blur) -------- */
.atlas-surface {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 var(--color-hair),
    0 30px 60px -40px rgba(0,0,0,0.55);
}
.atlas-elevated {
  background: var(--color-elevated);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  box-shadow:
    inset 0 1px 0 var(--color-hair),
    0 20px 40px -30px rgba(0,0,0,0.5);
}
.atlas-panel {
  background: color-mix(in oklab, var(--color-surface) 92%, transparent);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
.atlas-inset {
  background: color-mix(in oklab, var(--color-canvas) 60%, var(--color-surface) 40%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.hairline { border: 1px solid var(--color-border); }
.hairline-b { border-bottom: 1px solid var(--color-border); }
.hairline-t { border-top: 1px solid var(--color-border); }

/* -------- Topographic contour background (SVG) -------- */
.topo {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800' fill='none'><g stroke='%238FC8E8' stroke-opacity='0.10' stroke-width='0.75' fill='none'><path d='M-100 620 Q 200 520 500 600 T 1100 560 T 1400 620'/><path d='M-100 560 Q 220 460 520 540 T 1120 500 T 1400 560'/><path d='M-100 500 Q 240 400 540 480 T 1140 440 T 1400 500'/><path d='M-100 440 Q 260 340 560 420 T 1160 380 T 1400 440'/><path d='M-100 380 Q 280 280 580 360 T 1180 320 T 1400 380'/><path d='M-100 320 Q 300 220 600 300 T 1200 260 T 1400 320'/><path d='M-100 260 Q 320 160 620 240 T 1220 200 T 1400 260'/><path d='M-100 200 Q 340 100 640 180 T 1240 140 T 1400 200'/><path d='M-100 140 Q 360 40 660 120 T 1260 80 T 1400 140'/></g></svg>");
  background-size: 1200px 800px;
  background-repeat: repeat;
}
.light .topo {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800' fill='none'><g stroke='%23123C3A' stroke-opacity='0.10' stroke-width='0.75' fill='none'><path d='M-100 620 Q 200 520 500 600 T 1100 560 T 1400 620'/><path d='M-100 560 Q 220 460 520 540 T 1120 500 T 1400 560'/><path d='M-100 500 Q 240 400 540 480 T 1140 440 T 1400 500'/><path d='M-100 440 Q 260 340 560 420 T 1160 380 T 1400 440'/><path d='M-100 380 Q 280 280 580 360 T 1180 320 T 1400 380'/><path d='M-100 320 Q 300 220 600 300 T 1200 260 T 1400 320'/><path d='M-100 260 Q 320 160 620 240 T 1220 200 T 1400 260'/><path d='M-100 200 Q 340 100 640 180 T 1240 140 T 1400 200'/><path d='M-100 140 Q 360 40 660 120 T 1260 80 T 1400 140'/></g></svg>");
}

.topo-mask {
  mask-image: radial-gradient(ellipse at center, black 45%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 45%, transparent 85%);
}

/* -------- Motion -------- */
@keyframes rise {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
.rise { animation: rise 0.55s ease-out both; }

@keyframes signal {
  0%   { transform: translateY(-120%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(120%); opacity: 0; }
}
.signal-dot { animation: signal 2.6s linear infinite; }

@keyframes travel {
  0%   { top: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.travel { animation: travel 3.6s linear infinite; }

@keyframes pulse-soft {
  0%,100% { opacity: 0.7; }
  50%     { opacity: 1; }
}
.pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }

@keyframes spin-slow { to { transform: rotate(360deg); } }
.spin-slow { animation: spin-slow 60s linear infinite; }
.spin-slower { animation: spin-slow 120s linear infinite; }

/* -------- Buttons -------- */
.btn-primary {
  background: var(--color-text);
  color: var(--color-canvas);
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform .2s ease, background .2s ease, opacity .2s ease;
}
.btn-primary:hover { background: color-mix(in oklab, var(--color-text) 90%, transparent); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

.btn-ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 12px;
  padding: 12px 20px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: color-mix(in oklab, var(--color-surface) 60%, transparent);
  transition: background .2s ease;
}
.btn-ghost:hover { background: color-mix(in oklab, var(--color-elevated) 70%, transparent); }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: color-mix(in oklab, var(--color-surface) 70%, transparent);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.chip-sky {
  color: var(--color-sky);
  border-color: color-mix(in oklab, var(--color-sky) 40%, var(--color-border));
  background: color-mix(in oklab, var(--color-sky) 10%, transparent);
}
.chip-gold {
  color: var(--color-gold);
  border-color: color-mix(in oklab, var(--color-gold) 45%, var(--color-border));
  background: color-mix(in oklab, var(--color-gold) 12%, transparent);
}
.chip-danger {
  color: var(--color-danger);
  border-color: color-mix(in oklab, var(--color-danger) 40%, var(--color-border));
  background: color-mix(in oklab, var(--color-danger) 12%, transparent);
}

.dot { width: 6px; height: 6px; border-radius: 9999px; display: inline-block; }
.dot-sky { background: var(--color-sky); box-shadow: 0 0 12px color-mix(in oklab, var(--color-sky) 60%, transparent); }
.dot-gold { background: var(--color-gold); box-shadow: 0 0 12px color-mix(in oklab, var(--color-gold) 60%, transparent); }
.dot-danger { background: var(--color-danger); box-shadow: 0 0 10px color-mix(in oklab, var(--color-danger) 50%, transparent); }
.dot-muted { background: var(--color-muted); opacity: 0.6; }

.gold-glow { box-shadow: 0 0 60px -18px color-mix(in oklab, var(--color-gold) 60%, transparent); }
.sky-glow  { box-shadow: 0 0 60px -18px color-mix(in oklab, var(--color-sky) 55%, transparent); }
`);

/* ============================================================
   NAV ? new tokens + working theme toggle
============================================================ */
write("components/layout/Navbar.tsx", `"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const links = [
  { href: "/", label: "Product" },
  { href: "/atlas", label: "Atlas" },
  { href: "/learn", label: "Learn" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("atlas_theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("light", saved === "light");
    document.documentElement.classList.toggle("dark", saved !== "light");

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("atlas_theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next !== "light");
  };

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "hairline-b bg-[color:var(--color-canvas)]/85 backdrop-blur-md"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em]">ATLAS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[12.5px] font-medium text-[color:var(--color-muted)] transition hover:text-[color:var(--color-text)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-sky)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full hairline text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link href="/investigate" className="btn-primary">
            Start Investigating
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="md:hidden text-[color:var(--color-text)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="hairline-t bg-[color:var(--color-surface)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/investigate"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              Start Investigating <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Mark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="var(--color-sky)" strokeOpacity="0.85" />
      <path d="M4.5 14.5 L10 5.5 L15.5 14.5" stroke="var(--color-text)" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="10" cy="11" r="1.4" fill="var(--color-gold)" />
    </svg>
  );
}
`);

/* ============================================================
   FOOTER
============================================================ */
write("components/layout/Footer.tsx", `import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hairline-t bg-[color:var(--color-canvas)]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mono text-[13px] font-semibold tracking-[0.18em]">ATLAS</p>
            <p className="mono mt-2 text-[10.5px] tracking-[0.22em] text-[color:var(--color-muted)]">
              DEVELOPER ERROR ATLAS ? v1.0
            </p>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-[color:var(--color-muted)]">
              Understand the error. Fix the cause. Remember the lesson.
            </p>
          </div>
          <Col title="Product" links={[
            { href: "/", label: "Home" },
            { href: "/investigate", label: "Investigate" },
            { href: "/atlas", label: "Atlas" },
            { href: "/learn", label: "Learn" },
            { href: "/history", label: "History" },
          ]} />
          <Col title="Meta" links={[
            { href: "/settings", label: "Settings" },
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 hairline-t pt-5 text-[11px] mono tracking-wider text-[color:var(--color-muted)] sm:flex-row sm:items-center">
          <p>? {new Date().getFullYear()} ATLAS</p>
          <p>FROM CONFUSION ? TO CLARITY</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mono mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[color:var(--color-text)]/85 transition hover:text-[color:var(--color-text)]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
`);

/* ============================================================
   LAYOUT ? inject theme class before hydration to avoid flash
============================================================ */
write("app/layout.tsx", `import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Atlas ? Developer Error Atlas",
  description:
    "Understand the error. Fix the cause. Remember the lesson. Atlas turns cryptic developer errors into clear explanations, real solutions, and lasting lessons.",
};

const themeScript = \`
try {
  var t = localStorage.getItem('atlas_theme') || 'dark';
  var c = document.documentElement.classList;
  c.toggle('light', t === 'light');
  c.toggle('dark', t !== 'light');
} catch (e) {}
\`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="atlas-theme" strategy="beforeInteractive">{themeScript}</Script>
      </head>
      <body
        className={[
          inter.variable,
          jetbrains.variable,
          "min-h-screen font-sans antialiased flex flex-col",
        ].join(" ")}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`);

/* ============================================================
   LANDING ? Alpine hero + all sections repainted (visual only)
============================================================ */
write("components/landing/Hero.tsx", `import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 topo topo-mask opacity-90" />
      <div className="mx-auto grid min-h-[86vh] max-w-[1200px] items-center gap-16 px-6 pt-32 pb-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="rise">
          <p className="mono text-[10.5px] uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
            Atlas ? Alpine Instrument
          </p>
          <h1 className="mt-6 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[60px] lg:text-[80px]">
            Errors are not <br />
            the end of the story.
          </h1>
          <p className="mono mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            <span>Error</span>
            <span className="text-[color:var(--color-sky)]">?</span>
            <span className="text-[color:var(--color-text)]">Trace</span>
            <span className="text-[color:var(--color-sky)]">?</span>
            <span className="text-[color:var(--color-gold)]">Understand</span>
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            Turn confusing errors into clear root causes, fixes, and knowledge.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/investigate" className="btn-primary">
              Start Investigating
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/atlas" className="btn-ghost">Explore the Atlas</Link>
          </div>
        </div>

        {/* Signal column */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="atlas-surface p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="chip chip-sky">
                <span className="dot dot-sky" /> Signal
              </span>
              <span className="mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">Trace 0042</span>
            </div>

            <div className="atlas-inset p-5">
              <p className="mono text-[12.5px] text-[color:var(--color-muted)]">TypeError</p>
              <p className="mono mt-2 text-[13px] leading-relaxed">
                Cannot read properties of undefined
                <br />
                (reading &apos;map&apos;)
              </p>
            </div>

            <div className="relative mt-6">
              <div className="pointer-events-none absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[color:var(--color-border)]">
                <span className="signal-dot absolute left-1/2 top-0 block h-10 w-px -translate-x-1/2 bg-[color:var(--color-sky)]" />
              </div>
              <ul className="relative space-y-2">
                {["DATA","users","undefined",".map()","ROOT CAUSE"].map((node, i) => {
                  const isRoot = node === "ROOT CAUSE";
                  return (
                    <li key={node} className="flex justify-center">
                      <div
                        className={
                          "mono w-56 rounded-lg border px-4 py-2.5 text-center text-[12px] tracking-[0.14em] " +
                          (isRoot
                            ? "border-[color:var(--color-gold)]/60 text-[color:var(--color-gold)] gold-glow bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)]"
                            : "border-[color:var(--color-border)] text-[color:var(--color-text)]/80 bg-[color:var(--color-elevated)]")
                        }
                      >
                        {isRoot ? "? ROOT CAUSE" : node}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/Confusion.tsx", `export default function Confusion() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] space-y-20">
        <Line n="01" text={<>An error gives you a <span className="text-[color:var(--color-text)]">symptom</span>.</>} />
        <Line n="02" text={<>Developers need the <span className="text-[color:var(--color-sky)]">cause</span>.</>} />
        <Line n="03" text={<>Atlas connects them.</>} />
      </div>
    </section>
  );
}

function Line({ n, text }: { n: string; text: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10">
      <span className="mono pt-3 text-[11px] tracking-[0.2em] text-[color:var(--color-muted)]">{n}</span>
      <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-[52px]">
        {text}
      </h2>
    </div>
  );
}
`);

write("components/landing/Transformation.tsx", `const stages = [
  { key: "ERROR",   title: "Symptom appears",    body: <p className="mono text-[13px]"><span className="text-[color:var(--color-danger)]">TypeError</span>  Cannot read properties of undefined</p> },
  { key: "TRACE",   title: "Follow the signal",  body: <p className="mono text-[13px]">data.users <span className="text-[color:var(--color-muted)]">?</span> undefined</p> },
  { key: "CAUSE",   title: "Identify the source",body: <p className="mono text-[13px]"><span className="text-[color:var(--color-gold)]">ROOT CAUSE</span>  ASYNC DATA ? NOT READY</p> },
  { key: "FIX",     title: "Apply the fix",      body: <pre className="mono text-[12px] leading-relaxed">{\`const users = data?.users ?? [];\\nreturn users.map(...);\`}</pre> },
  { key: "LEARN",   title: "Absorb the concept", body: <p className="mono text-[13px]">Asynchronous data flow</p> },
];

export default function Transformation() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-surface)] px-6 py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            The transformation
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Watch an error become understandable.
          </h2>
        </div>

        <ol className="grid grid-cols-5 gap-3">
          {stages.map((s, i) => (
            <li key={s.key} className="atlas-panel p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">{String(i + 1).padStart(2, "0")}</span>
                <span className={"chip " + (i === 2 ? "chip-gold" : i === 3 ? "chip-sky" : "")}>{s.key}</span>
              </div>
              <p className="mt-4 text-[13px] font-medium">{s.title}</p>
              <div className="mt-3 atlas-inset p-3">{s.body}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
`);

write("components/landing/ErrorAnatomy.tsx", `const parts = [
  { n: "01", key: "SYMPTOM",    detail: "What the user or runtime observes." },
  { n: "02", key: "TRIGGER",    detail: "The specific call that raised the failure." },
  { n: "03", key: "ASSUMPTION", detail: "The implicit assumption the code relied on." },
  { n: "04", key: "ROOT CAUSE", detail: "The underlying state that violated it.", gold: true },
  { n: "05", key: "FIX",        detail: "The resolution that restores correctness." },
];

export default function ErrorAnatomy() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Error anatomy
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Every failure has a structure.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-[color:var(--color-border)]">
              <span className="travel absolute left-1/2 -translate-x-1/2 block h-16 w-px bg-[color:var(--color-sky)]" />
            </div>
            <ul className="relative space-y-3">
              {parts.map((p) => (
                <li key={p.key} className="flex justify-center">
                  <div className={"mono w-full rounded-lg border px-4 py-3 text-center text-[12px] tracking-[0.16em] " +
                    (p.gold
                      ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)] gold-glow"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)] text-[color:var(--color-text)]/85")}>
                    {p.key}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ol className="space-y-3">
            {parts.map((p) => (
              <li key={p.key} className="atlas-panel grid grid-cols-[auto_auto_1fr] items-center gap-4 px-5 py-4">
                <span className="mono text-[11px] text-[color:var(--color-muted)]">{p.n}</span>
                <span className={"mono text-[11px] tracking-[0.16em] " + (p.gold ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-sky)]")}>{p.key}</span>
                <p className="text-[13.5px] text-[color:var(--color-text)]/80">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/AtlasNetwork.tsx", `import Link from "next/link";
import { ArrowRight } from "lucide-react";

const nodes = [
  { id: "atlas", label: "ATLAS", x: 50, y: 50, big: true },
  { id: "js", label: "JavaScript", x: 20, y: 22 },
  { id: "ts", label: "TypeScript", x: 80, y: 22 },
  { id: "py", label: "Python", x: 12, y: 78 },
  { id: "react", label: "React", x: 30, y: 45 },
  { id: "next", label: "Next.js", x: 70, y: 45 },
  { id: "state", label: "State", x: 40, y: 20 },
  { id: "async", label: "Async", x: 60, y: 20, gold: true },
  { id: "api", label: "API", x: 82, y: 62 },
  { id: "run", label: "Runtime", x: 50, y: 82 },
  { id: "build", label: "Build", x: 18, y: 62 },
  { id: "db", label: "Database", x: 88, y: 82 },
  { id: "net", label: "Network", x: 30, y: 88 },
];

const links = [
  ["atlas","js"],["atlas","ts"],["atlas","py"],["atlas","react"],["atlas","next"],
  ["atlas","state"],["atlas","async"],["atlas","api"],["atlas","run"],["atlas","build"],
  ["atlas","db"],["atlas","net"],
  ["js","react"],["ts","react"],["ts","next"],["react","next"],
  ["react","state"],["react","async"],["next","api"],["next","run"],
  ["async","api"],["api","net"],["db","api"],["build","next"],["py","api"],
] as const;

export default function AtlasNetwork() {
  return (
    <section id="product" className="relative hairline-t bg-[color:var(--color-surface)] px-6 py-28">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            The Atlas
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Every error belongs somewhere.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            A living network of the errors, frameworks, and concepts developers encounter every day. Highlighted paths glow sky, mastered concepts turn gold.
          </p>
          <Link href="/atlas" className="btn-primary mt-8">
            Explore the Atlas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map(([a, b], i) => {
              const na = nodes.find((n) => n.id === a)!;
              const nb = nodes.find((n) => n.id === b)!;
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="var(--color-border)"
                  strokeWidth="0.15"
                />
              );
            })}
          </svg>

          {nodes.map((n) => (
            <span
              key={n.id}
              className={
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-[11px] mono tracking-[0.12em] " +
                (n.big
                  ? "border-[color:var(--color-sky)]/60 bg-[color:var(--color-elevated)] text-[color:var(--color-text)] sky-glow"
                  : n.gold
                    ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)] text-[color:var(--color-text)]/80")
              }
              style={{ left: n.x + "%", top: n.y + "%" }}
            >
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/Knowledge.tsx", `export default function Knowledge() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-28">
      <div className="pointer-events-none absolute inset-0 topo opacity-30" />
      <div className="relative mx-auto max-w-[1100px] space-y-14">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Knowledge</p>
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-[44px]">
            Fixing one error is useful.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--color-text)]/85 sm:text-[44px]">
            Understanding why it happened is more valuable.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">
            Knowing how to recognize it next time is the point.
          </h2>
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {[
            { id: "001", state: "Understood",       chip: "chip-sky" },
            { id: "014", state: "Pattern detected", chip: "chip-sky" },
            { id: "031", state: "Concept mastered", chip: "chip-gold" },
          ].map((k) => (
            <div key={k.id} className="atlas-panel p-5">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Error #{k.id}</p>
              <p className={"chip mt-4 " + k.chip}>{k.state}</p>
              <p className="mt-4 text-[13px] text-[color:var(--color-text)]/85">Recognized when the same shape returns.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/DebuggingMemory.tsx", `const entries = [
  { type: "TypeError",      stack: "React",       snippet: "users.map()",                when: "2 hours ago", concept: "Async data" },
  { type: "ReferenceError", stack: "JavaScript",  snippet: "user is not defined",        when: "Yesterday",   concept: "Scope" },
  { type: "HydrationError", stack: "Next.js",     snippet: "Text content did not match", when: "3 days ago",  concept: "SSR / client parity" },
];

export default function DebuggingMemory() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-surface)] px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Debugging memory</p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Your mistakes become knowledge.
          </h2>
        </div>

        <div className="atlas-surface overflow-hidden">
          {entries.map((e, i) => (
            <article key={i} className={"grid grid-cols-[auto_1fr_auto] items-start gap-x-8 gap-y-1 px-6 py-6 " + (i < entries.length - 1 ? "hairline-b" : "")}>
              <div className="min-w-[130px]">
                <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">{e.stack}</p>
                <p className="mono mt-2 text-[10.5px] text-[color:var(--color-muted)]">{e.when}</p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-[0.14em] text-[color:var(--color-danger)]">? {e.type.toUpperCase()}</p>
                <p className="mono mt-2 text-[15px]">{e.snippet}</p>
                <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">
                  Concept: <span className="text-[color:var(--color-text)]/90">{e.concept}</span>
                </p>
              </div>
              <div>
                <span className="chip chip-gold">? Understood</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/Philosophy.tsx", `export default function Philosophy() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-36">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] space-y-8 text-center">
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-[60px]">Don&apos;t just patch it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)]/70 sm:text-[60px]">Trace it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[60px]">Understand it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[60px]">
          <span className="text-[color:var(--color-gold)]">Remember it.</span>
        </p>
        <div className="pt-6">
          <span className="mono text-[11px] tracking-[0.36em] text-[color:var(--color-muted)]">? ATLAS ?</span>
        </div>
      </div>
    </section>
  );
}
`);

write("components/landing/FinalCTA.tsx", `import Link from "next/link";
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
`);

write("app/page.tsx", `import Hero from "@/components/landing/Hero";
import Confusion from "@/components/landing/Confusion";
import Transformation from "@/components/landing/Transformation";
import ErrorAnatomy from "@/components/landing/ErrorAnatomy";
import AtlasNetwork from "@/components/landing/AtlasNetwork";
import Knowledge from "@/components/landing/Knowledge";
import DebuggingMemory from "@/components/landing/DebuggingMemory";
import Philosophy from "@/components/landing/Philosophy";
import FinalCTA from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Confusion />
      <Transformation />
      <ErrorAnatomy />
      <AtlasNetwork />
      <Knowledge />
      <DebuggingMemory />
      <Philosophy />
      <FinalCTA />
    </>
  );
}
`);

/* ============================================================
   /investigate ? full visual, non-functional
============================================================ */
write("app/investigate/page.tsx", `import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ANALYSIS = [
  "READING ERROR",
  "IDENTIFYING SIGNAL",
  "TRACING FAILURE",
  "FINDING ROOT CAUSE",
  "BUILDING EXPLANATION",
];

const ANATOMY = [
  { n: "01", key: "SYMPTOM",    text: "Cannot read properties of undefined (reading 'map')." },
  { n: "02", key: "TRIGGER",    text: "The .map() call executed during render." },
  { n: "03", key: "ASSUMPTION", text: "data.users existed as an array." },
  { n: "04", key: "ROOT CAUSE", text: "data.users === undefined ? async response not resolved.", gold: true },
  { n: "05", key: "FAILURE",    text: "React aborts render and surfaces TypeError." },
  { n: "06", key: "FIX",        text: "Guard the render or normalize the shape upstream." },
];

const FIXES = [
  { title: "Initialize the collection", code: "const items = data?.items ?? [];", when: "Guarantees an iterable, safe during loading.", recommended: true },
  { title: "Guard the render",          code: "if (!data) return <Loading />;",   when: "Prevents render until data resolves." },
  { title: "Validate at boundary",      code: "assertUsers(data.users);",         when: "Fails loud at the API edge, not deep in the tree." },
];

export default function InvestigatePage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-24">

        {/* Meta bar */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Investigate</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Investigate an error</h1>
            <p className="mt-2 text-[14px] text-[color:var(--color-muted)]">Paste the signal. Atlas traces the cause.</p>
          </div>
          <div className="mono flex flex-wrap items-center gap-3 text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">
            <span>Trace <span className="text-[color:var(--color-text)]/85">0042</span></span>
            <span>?</span>
            <span>Status <span className="text-[color:var(--color-sky)]">READY</span></span>
          </div>
        </div>

        {/* Input row */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="atlas-surface p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="chip chip-sky"><span className="dot dot-sky" /> Error signal</span>
              <span className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Load sample</span>
            </div>
            <div className="atlas-inset min-h-[180px] p-4">
              <p className="mono text-[12.5px] leading-relaxed text-[color:var(--color-text)]/90">
                TypeError: Cannot read properties of undefined (reading &apos;map&apos;)
              </p>
              <p className="mono mt-3 text-[12px] text-[color:var(--color-muted)]">+ Add code context</p>
            </div>

            <div className="mt-4">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Code context</p>
              <div className="atlas-inset mt-2 p-4">
                <pre className="mono text-[12px] leading-relaxed">{\`const users = data.users;
return users.map((u) => (
  <UserCard key={u.id} name={u.name} />
));\`}</pre>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Ctrl / Cmd + Enter to trace</p>
              <button type="button" className="btn-primary">Trace error <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="atlas-panel p-5">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Context</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="atlas-inset p-3">
                  <p className="mono text-[10.5px] text-[color:var(--color-muted)]">Language</p>
                  <p className="mt-1 text-[13px]">JavaScript</p>
                </div>
                <div className="atlas-inset p-3">
                  <p className="mono text-[10.5px] text-[color:var(--color-muted)]">Framework</p>
                  <p className="mt-1 text-[13px]">Next.js</p>
                </div>
              </div>
            </div>

            <div className="atlas-panel p-5">
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Pipeline</p>
              <ul className="relative mt-4 space-y-2">
                {["Read","Identify","Trace","Root cause","Explain"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className={"dot " + (i < 2 ? "dot-sky" : "dot-muted")} />
                    <span className="mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text)]/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Analyzing preview */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="atlas-surface p-6">
            <p className="mono text-center text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-sky)]">Engine active</p>
            <ul className="relative mx-auto mt-6 max-w-sm space-y-3">
              <div className="pointer-events-none absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[color:var(--color-border)]">
                <span className="signal-dot absolute left-1/2 top-0 block h-10 w-px -translate-x-1/2 bg-[color:var(--color-sky)]" />
              </div>
              {ANALYSIS.map((label, i) => {
                const isRoot = label === "FINDING ROOT CAUSE";
                return (
                  <li key={label} className="relative flex justify-center">
                    <div className={"mono w-full rounded-lg border px-4 py-3 text-center text-[11px] tracking-[0.18em] " +
                      (isRoot
                        ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)] gold-glow"
                        : i < 2
                          ? "border-[color:var(--color-sky)]/50 bg-[color:color-mix(in_oklab,var(--color-sky)_10%,transparent)] text-[color:var(--color-text)]"
                          : "border-[color:var(--color-border)] text-[color:var(--color-muted)]")}>
                      {label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Results preview */}
          <div className="atlas-surface p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-gold">Root found</span>
                <span className="mono text-[10.5px] tracking-[0.14em] text-[color:var(--color-muted)]">Trace 0042</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">TypeError ? JavaScript ? Next.js</span>
              </div>
            </div>

            <h2 className="text-[24px] font-semibold leading-snug tracking-tight sm:text-[28px]">
              Something expected an array. It received undefined.
            </h2>
            <p className="mono mt-2 text-[13px] text-[color:var(--color-muted)]">
              Cannot read properties of undefined (reading &apos;map&apos;)
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="atlas-inset p-4">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Root cause</p>
                <p className="mono mt-2 text-[13px]">data.users === undefined</p>
                <p className="mt-2 text-[12.5px] text-[color:var(--color-muted)]">Async data had not resolved when render occurred.</p>
              </div>
              <div className="atlas-inset p-4">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Code location</p>
                <pre className="mono mt-2 text-[12px] leading-relaxed">{\`const users = data.users;
return users.map(...);\`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomy */}
        <div className="mt-10">
          <h3 className="text-[22px] font-semibold tracking-tight">Error anatomy</h3>
          <ol className="mt-5 grid gap-3">
            {ANATOMY.map((row) => (
              <li key={row.n} className={"grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 rounded-lg border px-5 py-4 " +
                (row.gold
                  ? "border-[color:var(--color-gold)]/45 bg-[color:color-mix(in_oklab,var(--color-gold)_8%,transparent)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)]")}>
                <span className="mono text-[11px] text-[color:var(--color-muted)]">{row.n}</span>
                <span className={"mono text-[11px] tracking-[0.16em] " + (row.gold ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-sky)]")}>{row.key}</span>
                <p className="text-[13.5px] text-[color:var(--color-text)]/85">{row.text}</p>
                {row.gold ? <span className="chip chip-gold">Found</span> : <span className="mono text-[10.5px] text-[color:var(--color-muted)]">?</span>}
              </li>
            ))}
          </ol>
        </div>

        {/* Fixes */}
        <div className="mt-10">
          <h3 className="text-[22px] font-semibold tracking-tight">Fix options</h3>
          <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">Multiple paths ? the recommended one is highlighted.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {FIXES.map((f, i) => (
              <div key={i} className={"rounded-lg border p-5 " +
                (f.recommended
                  ? "border-[color:var(--color-gold)]/50 bg-[color:color-mix(in_oklab,var(--color-gold)_8%,transparent)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)]")}>
                <div className="flex items-center justify-between">
                  <p className="mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">Option {String.fromCharCode(65 + i)}</p>
                  {f.recommended && <span className="chip chip-gold">? Recommended</span>}
                </div>
                <p className="mt-2 text-[14px] font-semibold">{f.title}</p>
                <pre className="atlas-inset mono mt-3 p-3 text-[12px] leading-relaxed">{f.code}</pre>
                <p className="mt-3 text-[12.5px] text-[color:var(--color-muted)]"><span className="text-[color:var(--color-text)]/70">When to use ? </span>{f.when}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention + Learn */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="atlas-panel p-5">
            <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-sky)]">Prevention</p>
            <ul className="mt-4 space-y-2">
              {["Model loading + empty + ready states explicitly.", "Type the API boundary and default array shapes.", "Fail loud at the edge, safely inside the tree."].map((p) => (
                <li key={p} className="flex gap-3 text-[13px]"><span className="dot dot-sky mt-2" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="atlas-panel p-5">
            <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Learn</p>
            <h4 className="mt-2 text-[16px] font-semibold">Asynchronous data flow</h4>
            <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">Understand how components render before async side effects resolve.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Promises","async / await","Loading states","Race conditions","Error boundaries"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <Link href="/learn" className="mono mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-gold)]">
              Open learning path <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <p className="mono mt-10 text-center text-[10.5px] tracking-[0.16em] text-[color:var(--color-muted)]">
          Saved to debugging memory ? local only
        </p>
      </div>
    </div>
  );
}
`);

/* ============================================================
   /atlas ? knowledge map (visual)
============================================================ */
write("app/atlas/page.tsx", `import Link from "next/link";
import { ArrowRight } from "lucide-react";

const clusters = [
  { title: "Languages",  chips: ["JavaScript","TypeScript","Python"] },
  { title: "Frameworks", chips: ["React","Next.js","Node.js"] },
  { title: "Concepts",   chips: ["Async","State","API","Runtime","Build","Network","Database"] },
];

const nodes = [
  { id: "atlas", label: "ATLAS", x: 50, y: 50, big: true },
  { id: "js",   label: "JavaScript", x: 22, y: 22 },
  { id: "ts",   label: "TypeScript", x: 78, y: 22 },
  { id: "py",   label: "Python",     x: 14, y: 78 },
  { id: "react",label: "React",      x: 32, y: 46 },
  { id: "next", label: "Next.js",    x: 68, y: 46 },
  { id: "state",label: "State",      x: 42, y: 20 },
  { id: "async",label: "Async",      x: 60, y: 22, gold: true },
  { id: "api",  label: "API",        x: 82, y: 62 },
  { id: "run",  label: "Runtime",    x: 50, y: 82 },
  { id: "build",label: "Build",      x: 18, y: 62 },
  { id: "db",   label: "Database",   x: 88, y: 82 },
  { id: "net",  label: "Network",    x: 30, y: 88 },
];

const links: [string, string][] = [
  ["atlas","js"],["atlas","ts"],["atlas","py"],["atlas","react"],["atlas","next"],
  ["atlas","state"],["atlas","async"],["atlas","api"],["atlas","run"],["atlas","build"],
  ["atlas","db"],["atlas","net"],
  ["js","react"],["ts","react"],["ts","next"],["react","next"],
  ["react","state"],["react","async"],["next","api"],["next","run"],
  ["async","api"],["api","net"],["db","api"],["build","next"],["py","api"],
];

export default function AtlasPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-24">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Knowledge map</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Every error belongs somewhere.</h1>
        <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">
          A living network of errors, frameworks, and concepts. Highlighted paths glow sky, mastered concepts turn gold.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-6">
            {clusters.map((c) => (
              <div key={c.title} className="atlas-panel p-5">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{c.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <Link key={chip} href="/atlas" className="chip hover:border-[color:var(--color-sky)] hover:text-[color:var(--color-text)]">
                      {chip}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/atlas" className="btn-primary">Explore paths <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {links.map(([a, b], i) => {
                const na = nodes.find((n) => n.id === a)!;
                const nb = nodes.find((n) => n.id === b)!;
                return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--color-border)" strokeWidth="0.15" />;
              })}
            </svg>

            {nodes.map((n) => (
              <span
                key={n.id}
                className={
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 mono text-[11px] tracking-[0.12em] " +
                  (n.big
                    ? "border-[color:var(--color-sky)]/60 bg-[color:var(--color-elevated)] text-[color:var(--color-text)] sky-glow"
                    : n.gold
                      ? "border-[color:var(--color-gold)]/60 bg-[color:color-mix(in_oklab,var(--color-gold)_10%,transparent)] text-[color:var(--color-gold)]"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-elevated)] text-[color:var(--color-text)]/80")
                }
                style={{ left: n.x + "%", top: n.y + "%" }}
              >
                {n.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`);

/* ============================================================
   /history ? journal view (visual)
============================================================ */
write("app/history/page.tsx", `const entries = [
  { type: "TypeError",      snippet: "Cannot read properties of undefined (reading 'map')", stack: "NEXT.JS",   when: "8m ago"     },
  { type: "HydrationError", snippet: "Text content does not match server-rendered HTML",    stack: "REACT",     when: "Yesterday" },
  { type: "ReferenceError", snippet: "user is not defined",                                 stack: "JAVASCRIPT",when: "3 days ago" },
];

export default function HistoryPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-24">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Debugging memory</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Errors you have already understood.</h1>
        <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Your journal builds itself as you investigate.</p>

        <div className="atlas-surface mt-10 overflow-hidden">
          {entries.map((e, i) => (
            <article key={i} className={"grid grid-cols-[auto_1fr_auto] items-start gap-x-8 gap-y-1 px-6 py-6 " + (i < entries.length - 1 ? "hairline-b" : "")}>
              <div className="min-w-[140px]">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{e.stack}</p>
                <p className="mono mt-2 text-[10.5px] text-[color:var(--color-muted)]">{e.when}</p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-[0.14em] text-[color:var(--color-danger)]">? {e.type.toUpperCase()}</p>
                <p className="mono mt-2 text-[15px]">{e.snippet}</p>
              </div>
              <div><span className="chip chip-gold">? Understood</span></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

/* ============================================================
   /learn ? warmer path view
============================================================ */
write("app/learn/page.tsx", `const path = [
  { step: "Promises",       state: "done"    },
  { step: "async / await",  state: "done"    },
  { step: "Loading states", state: "current" },
  { step: "Race conditions",state: "todo"    },
  { step: "Error handling", state: "todo"    },
];

export default function LearnPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-24">
        <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Learning paths</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">From debugging mistakes to understanding systems.</h1>
        <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Paths derived from what you have investigated.</p>

        <div className="atlas-surface mt-10 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-gold)]">Recommended</p>
              <h2 className="mt-2 text-[22px] font-semibold">Asynchronous JavaScript</h2>
              <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">2 / 5 understood</p>
            </div>
            <span className="chip chip-gold">In progress</span>
          </div>

          <ol className="relative mt-8">
            <div className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-[color:var(--color-border)]" />
            {path.map((p) => {
              const isDone = p.state === "done";
              const isCurrent = p.state === "current";
              return (
                <li key={p.step} className="relative pl-10 py-3">
                  <span className={"absolute left-1.5 top-4 h-3 w-3 rounded-full border " +
                    (isDone
                      ? "bg-[color:var(--color-gold)] border-[color:var(--color-gold)]"
                      : isCurrent
                        ? "bg-[color:var(--color-sky)] border-[color:var(--color-sky)] pulse-soft"
                        : "bg-[color:var(--color-canvas)] border-[color:var(--color-border)]")} />
                  <p className={"text-[15px] " + (isDone ? "text-[color:var(--color-text)]/85" : isCurrent ? "font-semibold" : "text-[color:var(--color-muted)]")}>
                    {p.step}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
`);

/* ============================================================
   /settings ? intentionally quiet
============================================================ */
write("app/settings/page.tsx", `export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 pb-24 pt-24">
      <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Settings</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Preferences</h1>
      <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Small controls. Nothing spectacular. That is on purpose.</p>

      <div className="mt-10 grid gap-6">
        <Section title="Appearance">
          <Row label="Theme">
            <div className="flex gap-2">
              <span className="chip chip-sky">Dark</span>
              <span className="chip">Light</span>
              <span className="chip">System</span>
            </div>
          </Row>
        </Section>

        <Section title="Investigation">
          <Row label="Default language">
            <span className="chip">JavaScript</span>
          </Row>
          <Row label="Default framework">
            <span className="chip">Next.js</span>
          </Row>
          <Row label="Auto-save investigations">
            <span className="chip chip-gold">On</span>
          </Row>
        </Section>

        <Section title="History">
          <Row label="Clear history">
            <button className="btn-ghost">Clear</button>
          </Row>
          <Row label="Export history">
            <button className="btn-ghost">Export</button>
          </Row>
        </Section>

        <Section title="AI">
          <Row label="AI enabled">
            <span className="chip">Off</span>
          </Row>
          <Row label="Provider status">
            <span className="mono text-[11px] text-[color:var(--color-muted)]">Not connected</span>
          </Row>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="atlas-surface p-6">
      <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{title}</p>
      <div className="mt-4 divide-y divide-[color:var(--color-border)]">
        {children}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <p className="text-[14px]">{label}</p>
      <div>{children}</div>
    </div>
  );
}
`);

console.log("\\nAlpine Instrument visual build complete.");

try {
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync('git commit -m "feat(design): Alpine Instrument system ? light+dark, topo bg, full-page visuals (landing, investigate, atlas, history, learn, settings)"', { stdio: "inherit" });
  } catch { console.log("(nothing to commit)"); }
  execSync("git push", { stdio: "inherit" });
} catch (e) {
  console.error("Git step:", e.message);
}
