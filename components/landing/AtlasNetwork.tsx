"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Node = { id: string; label: string; x: number; y: number; group?: string };

const nodes: Node[] = [
  { id: "atlas", label: "ATLAS", x: 50, y: 50 },
  { id: "js",    label: "JavaScript", x: 18, y: 22, group: "lang" },
  { id: "ts",    label: "TypeScript", x: 82, y: 22, group: "lang" },
  { id: "py",    label: "Python",     x: 12, y: 78, group: "lang" },
  { id: "react", label: "React",      x: 30, y: 45, group: "fw" },
  { id: "next",  label: "Next.js",    x: 70, y: 45, group: "fw" },
  { id: "state", label: "State",      x: 40, y: 20, group: "concept" },
  { id: "async", label: "Async",      x: 60, y: 20, group: "concept" },
  { id: "api",   label: "API",        x: 82, y: 62, group: "concept" },
  { id: "run",   label: "Runtime",    x: 50, y: 82, group: "concept" },
  { id: "build", label: "Build",      x: 18, y: 62, group: "concept" },
  { id: "db",    label: "Database",   x: 88, y: 80, group: "concept" },
  { id: "net",   label: "Network",    x: 30, y: 88, group: "concept" },
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
    <section id="product" className="relative border-t border-white/[0.06] bg-[#0D0F14] px-6 py-32">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
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
            className="mono mt-8 inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#08090D]"
          >
            Explore the Atlas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-square w-full max-w-[560px] justify-self-center">
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
                    "mono block rounded-sm border px-3 py-1.5 text-[11px] tracking-[0.1em] transition " +
                    (isCenter
                      ? "border-white/25 bg-[#08090D] text-white shadow-[0_0_40px_-8px_rgba(85,114,255,0.4)]"
                      : active
                      ? "border-[#8B6CFF]/70 bg-[#8B6CFF]/15 text-white"
                      : dim
                      ? "border-white/[0.05] bg-transparent text-white/25"
                      : "border-white/10 bg-[#0D0F14] text-white/70 hover:text-white")
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
