"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const links = [
  { href: "/", label: "Product" },
  { href: "/atlas", label: "Atlas" },
  { href: "/learn", label: "Learn" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("atlas_theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("light", saved === "light");
    document.documentElement.classList.toggle("dark", saved !== "light");

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("atlas_theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next !== "light");
  };

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "hairline-b bg-[color:var(--color-canvas)]/85 backdrop-blur-md"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em]">ATLAS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[12.5px] font-medium text-[color:var(--color-muted)] transition hover:text-[color:var(--color-text)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-sky)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full hairline text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link href="/investigate" className="btn-primary">
            Start Investigating
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="md:hidden text-[color:var(--color-text)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="hairline-t bg-[color:var(--color-surface)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/investigate"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              Start Investigating <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
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
