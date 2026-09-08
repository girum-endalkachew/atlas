import Link from "next/link";

export default function InstrumentPanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <aside className="relative hidden overflow-hidden hairline-b lg:block">
      <div className="pointer-events-none absolute inset-0 topo opacity-90" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[720px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-sky)_25%,transparent),transparent_60%)] blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="mono text-[13px] font-semibold tracking-[0.16em]">ATLAS</span>
          </Link>
          <span className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Atlas ? v1.0
          </span>
        </header>

        <div className="max-w-md">
          <p className="mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            Alpine instrument
          </p>
          <h1 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {subtitle}
          </p>
        </div>

        <footer className="flex items-center justify-between mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">
          <span>TRACE 0042 ? READY</span>
          <span>ERROR ? TRACE ? UNDERSTAND</span>
        </footer>
      </div>

      <div className="auth-signal">
        <div className="line">
          <span className="dot" />
        </div>
      </div>
    </aside>
  );
}

function Mark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="var(--color-sky)" strokeOpacity="0.85" />
      <path d="M4.5 14.5 L10 5.5 L15.5 14.5" stroke="var(--color-text)" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="10" cy="11" r="1.4" fill="var(--color-gold)" />
    </svg>
  );
}
