export default function Knowledge() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#08090D] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <div className="relative mx-auto max-w-[1000px] space-y-14">
        <p className="mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Knowledge
        </p>

        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white/60 sm:text-[46px]">
            Fixing one error is useful.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white/85 sm:text-[46px]">
            Understanding why it happened is more valuable.
          </h2>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[46px]">
            Knowing how to recognize it next time is the point.
          </h2>
        </div>

        <div className="grid gap-4 pt-6 sm:grid-cols-3">
          <Progression id="001" state="UNDERSTOOD" tone="text-[#B8F36A]" label="Understood the fix." />
          <Progression id="014" state="PATTERN DETECTED" tone="text-[#5572FF]" label="Same shape seen 3? before." />
          <Progression id="031" state="CONCEPT MASTERED" tone="text-[#8B6CFF]" label="Async data flow internalized." />
        </div>
      </div>
    </section>
  );
}

function Progression({ id, state, tone, label }: { id: string; state: string; tone: string; label: string }) {
  return (
    <div className="rounded-sm border border-white/[0.08] bg-[#0D0F14] p-5">
      <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
        Error #{id}
      </p>
      <p className={"mono mt-3 text-[11.5px] font-semibold tracking-[0.16em] " + tone}>
        ? {state}
      </p>
      <p className="mt-3 text-[13px] text-white/65">{label}</p>
    </div>
  );
}
