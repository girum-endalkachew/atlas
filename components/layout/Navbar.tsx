"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Moon, Sun, Mountain } from "lucide-react";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/atlas", label: "Atlas" },
  { href: "/learn", label: "Learn" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = storage.getTheme();
    setTheme(saved);
    document.documentElement.classList.toggle("light-mode", saved === "light");
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    storage.setTheme(next);
    document.documentElement.classList.toggle("light-mode", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-obsidian-border/80 bg-obsidian/80 backdrop-blur-xl light-mode:border-paper-border light-mode:bg-paper/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cobalt to-violet text-white shadow-lg shadow-cobalt/20">
            <Mountain className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-paper light-mode:text-obsidian">
            Atlas
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-paper light-mode:bg-ink/10 light-mode:text-obsidian"
                    : "text-fog hover:bg-white/5 hover:text-paper light-mode:hover:bg-ink/5 light-mode:hover:text-obsidian"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-obsidian-border bg-obsidian-light text-fog transition hover:text-paper light-mode:border-paper-border light-mode:bg-paper-card light-mode:text-ink"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link
            href="/investigate"
            className="rounded-full bg-cobalt px-4 py-2 text-sm font-semibold text-white transition hover:bg-cobalt-hover glow-cobalt"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
