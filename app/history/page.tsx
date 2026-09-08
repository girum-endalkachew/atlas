"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storage } from "@/lib/storage";
import type { UserHistoryItem } from "@/types/atlas";
import { formatRelativeTime } from "@/lib/utils";

export default function HistoryPage() {
  const [items, setItems] = useState<UserHistoryItem[]>([]);

  useEffect(() => {
    setItems(storage.getHistory());
  }, []);

  const clear = () => {
    storage.clearHistory();
    setItems([]);
  };

  return (
    <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">
            Debugging memory
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">History</h1>
          <p className="mt-2 text-sm text-white/50">
            Every investigation becomes part of your technical journal.
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40 hover:text-[#FF5C63]"
          >
            Clear history
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-white/70">No investigations yet.</p>
          <Link
            href="/investigate"
            className="mono mt-4 inline-flex text-[11px] uppercase tracking-[0.14em] text-[#5572FF]"
          >
            Start investigating ?
          </Link>
        </div>
      ) : (
        <div className="gradient-border rounded-2xl">
          <div className="glass overflow-hidden rounded-2xl">
            {items.map((it, i) => (
              <article
                key={it.id}
                className={
                  "grid gap-2 px-6 py-6 sm:grid-cols-[140px_1fr_160px] " +
                  (i < items.length - 1 ? "border-b border-white/[0.06]" : "")
                }
              >
                <div>
                  <p className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                    {it.framework}
                  </p>
                  <p className="mono mt-1 text-[10.5px] text-white/35">
                    {formatRelativeTime(it.timestamp)}
                  </p>
                </div>
                <div>
                  <p className="mono text-[11px] tracking-[0.12em] text-[#FF5C63]">
                    ? {it.errorType.toUpperCase()}
                  </p>
                  <p className="mt-2 line-clamp-2 font-mono text-[14px] text-white">
                    {it.message}
                  </p>
                  <p className="mt-2 text-[12.5px] text-white/50">
                    Concept: <span className="text-white/80">{it.learnedConcept}</span>
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="mono text-[10.5px] uppercase tracking-[0.14em] text-[#B8F36A]">
                    Understood
                  </p>
                  <Link
                    href="/investigate"
                    className="mono mt-2 inline-block text-[10.5px] uppercase tracking-[0.12em] text-white/40 hover:text-white"
                  >
                    Investigate again
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
