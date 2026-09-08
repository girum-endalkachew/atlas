import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08090D]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mono text-[13px] font-semibold tracking-[0.16em] text-white">ATLAS</div>
            <p className="mt-2 text-[12px] text-white/40 mono tracking-wider">DEVELOPER ERROR ATLAS ? v1.0</p>
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-white/55">
              Understand the error. Fix the cause. Remember the lesson.
            </p>
          </div>

          <Col title="Product" links={[
            { href: "/", label: "Home" },
            { href: "/atlas", label: "Atlas" },
            { href: "/learn", label: "Learn" },
            { href: "/history", label: "History" },
          ]} />
          <Col title="Explore" links={[
            { href: "/investigate", label: "Investigate" },
            { href: "/settings", label: "Settings" },
          ]} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-white/[0.06] pt-6 text-[11px] mono tracking-wider text-white/35 sm:flex-row sm:items-center">
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
      <h4 className="mono mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{title}</h4>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/70 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
