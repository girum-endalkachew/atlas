const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function write(file, content) {
  const full = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, { encoding: "utf8" });
  console.log("Wrote", file);
}

/* ---------- Investigate page (client workspace) ---------- */
write("app/investigate/page.tsx", `"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Copy, RotateCcw } from "lucide-react";
import type {
  ErrorAnalysisResult,
  SupportedFramework,
  SupportedLanguage,
} from "@/types/error";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

type Phase = "input" | "analyzing" | "results";

const LANGUAGES: SupportedLanguage[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "General",
];

const FRAMEWORKS: SupportedFramework[] = [
  "React",
  "Next.js",
  "Node.js",
  "Vue",
  "Express",
  "Django",
  "None",
];

const ANALYSIS_STEPS = [
  "READING ERROR",
  "IDENTIFYING SIGNAL",
  "TRACING FAILURE",
  "FINDING ROOT CAUSE",
  "BUILDING EXPLANATION",
] as const;

const SAMPLE = \`TypeError: Cannot read properties of undefined (reading 'map')

const users = data.users;
return users.map(user => (
  <UserCard key={user.id} name={user.name} />
));\`;

export default function InvestigatePage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [errorText, setErrorText] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("JavaScript");
  const [framework, setFramework] = useState<SupportedFramework>("React");
  const [codeContext, setCodeContext] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<ErrorAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [traceId, setTraceId] = useState("0042");
  const [openAnatomy, setOpenAnatomy] = useState<number>(0);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const s = storage.getSettings();
    if (s.defaultLanguage) setLanguage(s.defaultLanguage as SupportedLanguage);
    if (s.defaultFramework) setFramework(s.defaultFramework as SupportedFramework);
  }, []);

  useEffect(() => {
    if (phase !== "analyzing") return;
    setAnalysisStep(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      if (i < ANALYSIS_STEPS.length) setAnalysisStep(i);
      else clearInterval(t);
    }, 520);
    return () => clearInterval(t);
  }, [phase]);

  const canSubmit = errorText.trim().length > 8;

  const headline = useMemo(() => {
    if (!result) return null;
    const msg = result.message || result.title;
    if (/map/i.test(msg) && /undefined/i.test(msg)) {
      return "Something expected an array. It received undefined.";
    }
    return result.whatHappened;
  }, [result]);

  const runInvestigate = useCallback(async () => {
    if (!canSubmit) return;
    setErrorMsg(null);
    setPhase("analyzing");
    setResult(null);
    setTraceId(String(Math.floor(Math.random() * 9000) + 1000));

    const payload = {
      errorText: codeContext.trim()
        ? errorText.trim() + "\\n\\n" + codeContext.trim()
        : errorText.trim(),
      language,
      framework,
    };

    const minDelay = new Promise((r) => setTimeout(r, ANALYSIS_STEPS.length * 520 + 200));

    try {
      const [res] = await Promise.all([
        fetch("/api/investigate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        minDelay,
      ]);

      const json = await res.json();
      if (!res.ok || !json?.data) {
        throw new Error(json?.error || "Investigation failed");
      }

      const data = json.data as ErrorAnalysisResult;
      setResult(data);
      storage.saveToHistory(data);
      setOpenAnatomy(0);
      setPhase("results");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Investigation failed";
      setErrorMsg(msg);
      setPhase("input");
    }
  }, [canSubmit, codeContext, errorText, framework, language]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && phase === "input") {
        e.preventDefault();
        runInvestigate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, runInvestigate]);

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setPhase("input");
    setResult(null);
    setErrorMsg(null);
    setAnalysisStep(0);
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
      <div className="pointer-events-none absolute left-1/3 top-0 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(85,114,255,0.14),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-24">
        {/* Meta bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">
              Atlas / Investigate
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {phase === "input" && "What broke?"}
              {phase === "analyzing" && "Tracing the failure"}
              {phase === "results" && "Investigation complete"}
            </h1>
          </div>
          <div className="mono flex flex-wrap items-center gap-3 text-[10.5px] uppercase tracking-[0.16em] text-white/45">
            <span>
              Trace <span className="text-white/75">{traceId}</span>
            </span>
            <span className="text-white/20">?</span>
            <span>
              Status{" "}
              <span
                className={cn(
                  phase === "analyzing" && "text-[#5572FF]",
                  phase === "results" && "text-[#B8F36A]",
                  phase === "input" && "text-white/70"
                )}
              >
                {phase === "input" && "READY"}
                {phase === "analyzing" && "ANALYZING"}
                {phase === "results" && "ROOT FOUND"}
              </span>
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl border border-[#FF5C63]/35 bg-[#FF5C63]/10 px-4 py-3 text-sm text-[#FF5C63]">
            {errorMsg}
          </div>
        )}

        {/* INPUT */}
        {phase === "input" && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="gradient-border rounded-2xl">
              <div className="glass rounded-2xl p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <label className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
                    Error signal
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorText(SAMPLE)}
                    className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40 transition hover:text-white/70"
                  >
                    Load sample
                  </button>
                </div>
                <textarea
                  value={errorText}
                  onChange={(e) => setErrorText(e.target.value)}
                  placeholder={"Paste your error here...\\n\\nTypeError: Cannot read properties\\nof undefined (reading 'map')"}
                  className="min-h-[220px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#08090D]/70 px-4 py-3 font-mono text-[13px] leading-relaxed text-white outline-none placeholder:text-white/25 focus:border-[#5572FF]/40"
                />

                <div className="mt-4">
                  <label className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
                    Code context <span className="text-white/30">(optional)</span>
                  </label>
                  <textarea
                    value={codeContext}
                    onChange={(e) => setCodeContext(e.target.value)}
                    placeholder={"const users = data.users;\\nreturn users.map(...)"}
                    className="mt-2 min-h-[110px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#08090D]/70 px-4 py-3 font-mono text-[12.5px] leading-relaxed text-white/90 outline-none placeholder:text-white/25 focus:border-[#5572FF]/40"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="mono text-[10.5px] tracking-[0.14em] text-white/35">
                    Ctrl / Cmd + Enter to investigate
                  </p>
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={runInvestigate}
                    className={cn(
                      "mono group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition",
                      canSubmit
                        ? "bg-white text-[#08090D] hover:bg-white/90"
                        : "cursor-not-allowed bg-white/10 text-white/30"
                    )}
                  >
                    Investigate
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="glass-soft rounded-2xl p-5">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  Context
                </p>
                <label className="mt-4 block text-[12px] text-white/55">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="mt-1.5 w-full rounded-lg border border-white/[0.08] bg-[#08090D] px-3 py-2.5 text-sm text-white outline-none focus:border-[#5572FF]/40"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>

                <label className="mt-4 block text-[12px] text-white/55">Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as SupportedFramework)}
                  className="mt-1.5 w-full rounded-lg border border-white/[0.08] bg-[#08090D] px-3 py-2.5 text-sm text-white outline-none focus:border-[#5572FF]/40"
                >
                  {FRAMEWORKS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div className="glass-soft rounded-2xl p-5">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  Pipeline
                </p>
                <ul className="mt-4 space-y-2 mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                  {["Signal", "Trace", "Cause", "Fix", "Learn"].map((s, i) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-white/25">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}

        {/* ANALYZING */}
        {phase === "analyzing" && (
          <div className="gradient-border mx-auto max-w-xl rounded-2xl">
            <div className="glass rounded-2xl p-8">
              <p className="mono text-center text-[10.5px] uppercase tracking-[0.22em] text-[#5572FF]">
                Engine active
              </p>
              <ul className="relative mx-auto mt-8 max-w-sm space-y-3">
                <div className="pointer-events-none absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-white/[0.06]">
                  <span className="signal-dot absolute left-1/2 top-0 block h-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5572FF] to-transparent" />
                </div>
                {ANALYSIS_STEPS.map((label, i) => {
                  const active = i === analysisStep;
                  const done = i < analysisStep;
                  return (
                    <li key={label} className="relative flex justify-center">
                      <div
                        className={cn(
                          "mono w-full rounded-xl border px-4 py-3 text-center text-[11px] tracking-[0.16em] transition-all duration-500",
                          active && "border-[#5572FF]/50 bg-[#5572FF]/10 text-white glow-blue",
                          done && "border-[#B8F36A]/35 bg-[#B8F36A]/05 text-[#B8F36A]",
                          !active && !done && "border-white/[0.08] text-white/30"
                        )}
                      >
                        {label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {phase === "results" && result && (
          <div className="space-y-6">
            <div className="gradient-border rounded-2xl">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono rounded-full border border-[#FF5C63]/40 bg-[#FF5C63]/10 px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-[#FF5C63]">
                        {result.errorType}
                      </span>
                      <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        {result.framework} ? {result.language}
                      </span>
                    </div>
                    <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                      {headline}
                    </h2>
                    <p className="mt-3 max-w-2xl font-mono text-[13px] text-white/55">
                      {result.message}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] text-white/70 hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      New
                    </button>
                    <Link
                      href="/history"
                      className="mono inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#08090D]"
                    >
                      History
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Anatomy */}
              <div className="gradient-border rounded-2xl">
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                    Error anatomy
                  </p>
                  <ul className="mt-4 space-y-2">
                    {result.anatomy.map((step, idx) => {
                      const open = openAnatomy === idx;
                      return (
                        <li key={step.step + idx} className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
                          <button
                            type="button"
                            onClick={() => setOpenAnatomy(open ? -1 : idx)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: step.color || "#5572FF" }}
                              />
                              <span className="mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                                {step.step.replace("_", " ")}
                              </span>
                              <span className="text-[13px] text-white/55">{step.label}</span>
                            </div>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-white/40 transition",
                                open && "rotate-180"
                              )}
                            />
                          </button>
                          {open && (
                            <div className="border-t border-white/[0.06] px-4 py-3 text-[13px] leading-relaxed text-white/65">
                              {step.detail}
                              {step.codeSnippet && (
                                <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-2 font-mono text-[11px] text-[#B8F36A]">
                                  {step.codeSnippet}
                                </pre>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Root cause + why */}
              <div className="space-y-6">
                <div className="gradient-border rounded-2xl">
                  <div className="glass rounded-2xl p-5 sm:p-6">
                    <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[#8B6CFF]">
                      Root cause
                    </p>
                    <p className="mt-3 font-mono text-[15px] text-[#B8F36A]">
                      {result.likelyCause}
                    </p>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-white/65">
                      <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        Why ?{" "}
                      </span>
                      {result.whyItHappened}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">
                      <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        What ?{" "}
                      </span>
                      {result.whatHappened}
                    </p>
                  </div>
                </div>

                {result.codeContext?.code && (
                  <div className="glass-soft rounded-2xl p-5">
                    <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                      Code location
                    </p>
                    <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-white/75">
                      {result.codeContext.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Fixes */}
            <div className="gradient-border rounded-2xl">
              <div className="glass rounded-2xl p-5 sm:p-6">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  Fix options
                </p>
                <p className="mt-2 text-[13px] text-white/50">
                  Multiple paths ? pick the one that matches your situation.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {result.fixes.map((fix, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-xl border p-4",
                        fix.isRecommended
                          ? "border-[#B8F36A]/35 bg-[#B8F36A]/05"
                          : "border-white/[0.08] bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                            Option {String.fromCharCode(65 + idx)}
                            {fix.isRecommended ? " ? Recommended" : ""}
                          </p>
                          <h3 className="mt-1 text-[14px] font-semibold text-white">
                            {fix.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyText("fix-" + idx, fix.code)}
                          className="rounded-md border border-white/10 p-1.5 text-white/50 hover:text-white"
                          aria-label="Copy fix"
                        >
                          {copied === "fix-" + idx ? (
                            <Check className="h-3.5 w-3.5 text-[#B8F36A]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                      <pre className="mt-3 overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-[#B8F36A]">
                        {fix.code}
                      </pre>
                      <p className="mt-3 text-[12.5px] leading-relaxed text-white/55">
                        <span className="text-white/35">When to use ? </span>
                        {fix.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prevention + Learn */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="glass-soft rounded-2xl p-5 sm:p-6">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  Prevention
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                  This pattern can reappear whenever assumptions about data shape are unchecked.
                </p>
                <ul className="mt-4 space-y-2">
                  {result.howToPrevent.map((p, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-white/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5572FF]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-soft rounded-2xl p-5 sm:p-6">
                <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[#8B6CFF]">
                  What should you learn
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {result.learningConcept.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                  {result.learningConcept.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.learningConcept.relatedTopics.map((t) => (
                    <span
                      key={t}
                      className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] tracking-[0.08em] text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/learn"
                  className="mono mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#8B6CFF] hover:text-[#a58cff]"
                >
                  Open learning path
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <p className="mono text-center text-[10.5px] tracking-[0.16em] text-white/35">
              Saved to debugging memory ? local only
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
`);

/* Ensure API still solid */
write("app/api/investigate/route.ts", `import { NextRequest, NextResponse } from "next/server";
import { analyzeErrorDeterministically } from "@/core/deterministic-analyzer";
import type { SupportedFramework, SupportedLanguage } from "@/types/error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { errorText, language, framework } = body ?? {};

    if (!errorText || typeof errorText !== "string" || !errorText.trim()) {
      return NextResponse.json({ error: "Error text is required" }, { status: 400 });
    }

    const result = analyzeErrorDeterministically(
      errorText,
      language as SupportedLanguage | undefined,
      framework as SupportedFramework | undefined
    );

    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error("Investigation error:", err);
    return NextResponse.json({ error: "Failed to analyze error" }, { status: 500 });
  }
}
`);

/* History page that actually reads storage */
write("app/history/page.tsx", `"use client";

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
`);

console.log("\\nPhase 2 investigate workspace written.");

try {
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync(
      'git commit -m "feat(phase-2): investigate workspace ? input, analysis sequence, results, history"',
      { stdio: "inherit" }
    );
  } catch {
    console.log("(nothing to commit)");
  }
  execSync("git push", { stdio: "inherit" });
} catch (e) {
  console.error("Git step:", e.message);
}
