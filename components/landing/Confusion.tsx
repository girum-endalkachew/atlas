export default function Confusion() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-32">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] space-y-20">
        <Line n="01" text={<>An error gives you a <span className="text-[color:var(--color-text)]">symptom</span>.</>} />
        <Line n="02" text={<>Developers need the <span className="text-[color:var(--color-sky)]">cause</span>.</>} />
        <Line n="03" text={<>Atlas connects them.</>} />
      </div>
    </section>
  );
}

function Line({ n, text }: { n: string; text: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10">
      <span className="mono pt-3 text-[11px] tracking-[0.2em] text-[color:var(--color-muted)]">{n}</span>
      <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-[52px]">
        {text}
      </h2>
    </div>
  );
}
