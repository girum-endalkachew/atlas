import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hairline-t bg-[color:var(--color-canvas)]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mono text-[13px] font-semibold tracking-[0.18em]">ATLAS</p>
            <p className="mono mt-2 text-[10.5px] tracking-[0.22em] text-[color:var(--color-muted)]">
              DEVELOPER ERROR ATLAS ? v1.0
            </p>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-[color:var(--color-muted)]">
              Understand the error. Fix the cause. Remember the lesson.
            </p>
          </div>
          <Col title="Product" links={[
            { href: "/", label: "Home" },
            { href: "/investigate", label: "Investigate" },
            { href: "/atlas", label: "Atlas" },
            { href: "/learn", label: "Learn" },
            { href: "/history", label: "History" },
          ]} />
          <Col title="Meta" links={[
            { href: "/settings", label: "Settings" },
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 hairline-t pt-5 text-[11px] mono tracking-wider text-[color:var(--color-muted)] sm:flex-row sm:items-center">
          <p>? {new Date().getFullYear()} ATLAS</p>
          <p>FROM CONFUSION ? TO CLARITY</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mono mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[color:var(--color-text)]/85 transition hover:text-[color:var(--color-text)]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
