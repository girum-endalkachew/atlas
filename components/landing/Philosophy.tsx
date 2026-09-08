export default function Philosophy() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-canvas)] px-6 py-36">
      <div className="pointer-events-none absolute inset-0 topo opacity-40" />
      <div className="relative mx-auto max-w-[1000px] space-y-8 text-center">
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-[60px]">Don&apos;t just patch it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)]/70 sm:text-[60px]">Trace it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[60px]">Understand it.</p>
        <p className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[60px]">
          <span className="text-[color:var(--color-gold)]">Remember it.</span>
        </p>
        <div className="pt-6">
          <span className="mono text-[11px] tracking-[0.36em] text-[color:var(--color-muted)]">? ATLAS ?</span>
        </div>
      </div>
    </section>
  );
}
