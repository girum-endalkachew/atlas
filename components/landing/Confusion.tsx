export default function Confusion() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#08090D] px-6 py-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto max-w-[1000px] space-y-24">
        <Line small="01" text={<>An error gives you a <span className="text-white">symptom</span>.</>} />
        <Line small="02" text={<>Developers need the <span className="bg-gradient-to-r from-[#5572FF] to-[#8B6CFF] bg-clip-text text-transparent">cause</span>.</>} />
        <Line small="03" text={<>Atlas connects them.</>} />
      </div>
    </section>
  );
}

function Line({ small, text }: { small: string; text: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10">
      <span className="mono text-[11px] font-semibold text-white/35 pt-4">{small}</span>
      <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/55 sm:text-[56px]">
        {text}
      </h2>
    </div>
  );
}
