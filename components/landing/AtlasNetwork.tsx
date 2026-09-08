import Link from "next/link";
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
