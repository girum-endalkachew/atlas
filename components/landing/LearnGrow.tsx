import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LearnGrow() {
  return (
    <section className="bg-[#0B0C10] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#12141A] p-6">
          <p className="text-4xl leading-none text-[#A99BFF]">?</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Atlas turned my confusion into clarity. It&apos;s like having a senior developer in my browser.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A99BFF] text-sm font-bold text-[#0B0C10]">LM</div>
            <div>
              <p className="text-sm font-semibold">Lina Mengesha</p>
              <p className="text-xs text-white/45">Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12141A] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A99BFF]">Learn & Grow</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">
            Build better habits.
            <br />
            Become a stronger developer.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Atlas remembers what you&apos;ve learned and suggests personalized learning paths based on your error history.
          </p>
          <Link
            href="/learn"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#A99BFF] px-5 py-2.5 text-sm font-semibold text-[#0B0C10]"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12141A] p-6">
          <div className="mb-4 inline-flex rounded-full bg-[#C8F56A]/20 px-3 py-1 text-[11px] font-semibold text-[#C8F56A]">
            You&apos;ve investigated 6 async-data errors
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Recommended Learning Path</p>
          <h4 className="mt-1 text-lg font-bold">Asynchronous JavaScript</h4>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-white/45">
              <span>Progress</span>
              <span>60%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[60%] rounded-full bg-[#A99BFF]" />
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {["Promises", "async / await", "Loading states", "Error boundaries", "Race conditions"].map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                <span className={"h-4 w-4 rounded-full border " + (i < 3 ? "border-[#A99BFF] bg-[#A99BFF]" : "border-white/20")} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
