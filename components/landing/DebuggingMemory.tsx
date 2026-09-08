const entries = [
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
