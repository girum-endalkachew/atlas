import Link from "next/link";
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
