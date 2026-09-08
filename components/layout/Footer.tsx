import { Mountain } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-obsidian-border bg-obsidian light-mode:border-paper-border light-mode:bg-paper">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cobalt/10 via-transparent to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cobalt to-violet text-white">
            <Mountain className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold text-paper light-mode:text-obsidian">Atlas</span>
        </div>
        <p className="max-w-md text-sm text-fog">
          Understand the error. Fix the cause. Remember the lesson.
        </p>
        <p className="text-xs text-fog/60">From confusion to clarity.</p>
        <div className="mt-2 flex gap-6 text-xs text-fog">
          <Link href="/investigate" className="hover:text-paper light-mode:hover:text-obsidian">
            Investigate
          </Link>
          <Link href="/atlas" className="hover:text-paper light-mode:hover:text-obsidian">
            Error Map
          </Link>
          <Link href="/learn" className="hover:text-paper light-mode:hover:text-obsidian">
            Learn
          </Link>
        </div>
      </div>
    </footer>
  );
}
