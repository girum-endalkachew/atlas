export default function Knowledge() {
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
