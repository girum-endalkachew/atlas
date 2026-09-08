const parts = [
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
      <div className="mx-auto max-w-[1200px]">
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

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          {/* Vertical diagram */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-white/[0.08]">
              <span className="travel absolute left-1/2 -translate-x-1/2 block h-16 w-px bg-gradient-to-b from-transparent via-[#5572FF] to-transparent" />
            </div>
            <ul className="relative space-y-4">
              {parts.map((p) => (
                <li key={p.key} className="flex justify-center">
                  <div className={"mono w-full rounded-sm border bg-[#0D0F14] px-4 py-3 text-center text-[12px] tracking-[0.14em] " + tones[p.tone]}>
                    {p.key}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Details column */}
          <ol className="space-y-3">
            {parts.map((p, i) => (
              <li key={p.key} className="grid grid-cols-[auto_auto_1fr] items-center gap-4 border-b border-white/[0.05] px-2 py-4 last:border-b-0">
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
