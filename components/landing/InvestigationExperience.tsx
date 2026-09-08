import Link from "next/link";
import { Check } from "lucide-react";

const bullets = [
  "Interactive error visualization",
  "Detailed root cause analysis",
  "Multiple solution options",
  "Prevention tips & best practices",
];

export default function InvestigationExperience() {
  return (
    <section className="bg-[#0B0C10] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#A99BFF]">
            The investigation experience
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Not just a fix.
            <br />
            The full story.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Atlas doesn&apos;t just tell you what to do ? it shows you why, where, and how. With a clear visual breakdown, you&apos;ll understand the problem and never be stuck again.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A99BFF]/20 text-[#A99BFF]">
                  <Check className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12141A] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#A99BFF]/20 text-[10px] font-bold text-[#A99BFF]">A</span>
              Atlas
            </div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
          </div>

          <div className="grid md:grid-cols-[140px_1fr]">
            <aside className="hidden border-r border-white/5 p-3 text-xs text-white/45 md:block">
              {["Investigate", "Atlas", "History", "Learn", "Settings"].map((item, idx) => (
                <div
                  key={item}
                  className={"mb-1 rounded-md px-2.5 py-2 " + (idx === 0 ? "bg-white/10 text-white" : "hover:bg-white/5")}
                >
                  {item}
                </div>
              ))}
            </aside>

            <div className="p-4">
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-[#FF5C5C]/30 bg-[#FF5C5C]/10 px-3 py-2">
                <span className="mt-0.5 text-[#FF5C5C]">?</span>
                <div>
                  <p className="text-sm font-semibold text-[#FF5C5C]">TypeError</p>
                  <p className="text-xs text-white/60">Cannot read properties of undefined (reading &apos;map&apos;)</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#0B0C10] p-4">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Flow</p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="rounded border border-white/10 px-2 py-1.5 text-center text-[#A99BFF]">data</div>
                    <div className="text-center text-white/30">?</div>
                    <div className="rounded border border-[#FF5C5C]/40 px-2 py-1.5 text-center text-[#FF5C5C]">users ? undefined</div>
                    <div className="text-center text-white/30">?</div>
                    <div className="rounded border border-white/10 px-2 py-1.5 text-center text-white/70">.map()</div>
                    <div className="text-center text-white/30">?</div>
                    <div className="rounded border border-[#FF5C5C]/50 bg-[#FF5C5C]/10 px-2 py-1.5 text-center font-bold text-[#FF5C5C]">ERROR</div>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-white/10 bg-[#0B0C10] p-4 text-xs">
                  <div>
                    <p className="font-semibold text-white/80">What Happened?</p>
                    <p className="mt-1 text-white/45">You called .map() on a value that is undefined instead of an array.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Why?</p>
                    <p className="mt-1 text-white/45">The data hasn&apos;t loaded yet or the expected property doesn&apos;t exist.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Likely Cause</p>
                    <p className="mt-1 font-mono text-[#C8F56A]">data.users === undefined</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Fix</p>
                    <pre className="mt-1 overflow-x-auto rounded bg-black/40 p-2 font-mono text-[10px] text-[#A99BFF]">{`const users = data?.users || [];
return users.map(...);`}</pre>
                  </div>
                  <Link href="/investigate" className="inline-flex rounded-full bg-[#4969FF] px-3 py-1.5 text-[11px] font-semibold text-white">
                    Copy Fix
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
