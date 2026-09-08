"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#product", label: "Product" },
  { href: "/atlas", label: "Atlas" },
  { href: "/learn", label: "Learn" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/[0.06] bg-[#08090D]/70 backdrop-blur-2xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <AtlasMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] text-white">ATLAS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[12.5px] font-medium text-white/55 transition hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#5572FF] to-[#8B6CFF] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/investigate"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#08090D] transition hover:bg-white/90"
          >
            <span className="relative z-10">Start Investigating</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button className="md:hidden text-white/80" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#08090D]/95 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/investigate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#08090D]"
            >
              Start Investigating <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function AtlasMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5572FF" />
          <stop offset="1" stopColor="#8B6CFF" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="url(#mg)" strokeOpacity="0.8" />
      <path d="M4.5 14.5 L10 5.5 L15.5 14.5" stroke="#F5F5F7" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="10" cy="11" r="1.4" fill="url(#mg)" />
    </svg>
  );
}
