import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/cta-mountains.jpg"
        alt=""
        fill
        aria-hidden
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

      <div className="relative mx-auto flex min-h-[340px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Ready to get started?
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Stop guessing. Start understanding.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-white/70 md:text-base">
          Join thousands of developers who are turning errors into lessons.
        </p>
        <Link
          href="/investigate"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#A99BFF] px-7 py-3.5 text-sm font-semibold text-[#0B0C10] transition hover:brightness-110"
        >
          Start Investigating
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
