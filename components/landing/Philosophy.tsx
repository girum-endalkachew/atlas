export default function Philosophy() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#08090D] px-6 py-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.14),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1000px] space-y-10 text-center">
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/40 sm:text-[64px]">
          Don&apos;t just patch it.
        </p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/60 sm:text-[64px]">
          Trace it.
        </p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/85 sm:text-[64px]">
          Understand it.
        </p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[64px]">
          Remember it.
        </p>

        <div className="pt-8">
          <span className="mono text-[11px] tracking-[0.36em] text-white/45">? ATLAS ?</span>
        </div>
      </div>
    </section>
  );
}
