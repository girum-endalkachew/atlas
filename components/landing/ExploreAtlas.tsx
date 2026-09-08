import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const cards = [
  { name: "JavaScript", detail: "TypeError, ReferenceError, SyntaxError?", badge: "JS" },
  { name: "React", detail: "Hooks, Rendering, State, Effects?", badge: "R" },
  { name: "Next.js", detail: "Routing, Server, Build, Client?", badge: "N" },
  { name: "Python", detail: "TypeError, ImportError, AttributeError?", badge: "Py" },
  { name: "Database", detail: "Connection, Query, Schema?", badge: "DB" },
];

const positions = [
  "top-4 left-2",
  "top-2 right-4",
  "bottom-24 right-0",
  "bottom-4 left-2",
  "top-1/2 -right-2 -translate-y-1/2",
];

export default function ExploreAtlas() {
  return (
    <section className="border-t border-white/5 bg-[#0F1116] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#A99BFF]">
            Explore the Atlas
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            A living map of
            <br />
            real-world errors.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Browse error types, explore common cases, and discover patterns across frameworks, languages, and more.
          </p>
          <Link
            href="/atlas"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#A99BFF] px-6 py-3 text-sm font-semibold text-[#0B0C10] transition hover:brightness-110"
          >
            Explore Atlas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-lg items-center justify-center">
          <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,#4969FF,transparent_70%)] opacity-40 blur-3xl" />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-[#A99BFF]/40 bg-[#0B0C10] shadow-2xl shadow-[#4969FF]/40">
            <Image src="/atlas-logo-icon.png" alt="Atlas core" width={44} height={44} className="h-11 w-11 object-contain" />
          </div>

          {cards.map((c, i) => (
            <div
              key={c.name}
              className={"absolute " + positions[i] + " w-44 rounded-xl border border-white/10 bg-[#0B0C10]/95 p-3 shadow-xl"}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold">
                  {c.badge}
                </span>
                <span className="text-xs font-semibold">{c.name}</span>
              </div>
              <p className="text-[10px] leading-snug text-white/45">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
