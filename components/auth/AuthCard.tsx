"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ReactNode } from "react";
import { ArrowRight, Eye, EyeOff, Github } from "lucide-react";

type Mode = "login" | "signup" | "forgot";

export default function AuthCard({
  mode,
  title,
  hint,
}: {
  mode: Mode;
  title: string;
  hint: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || (mode !== "forgot" && !pw) || (mode === "signup" && !name)) {
      setError("Signal lost. Fill required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    if (mode === "forgot") {
      setLoading(false);
      setOk(true);
      return;
    }

    // Mock sign in / sign up: store user
    const user = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split("@")[0],
      createdAt: Date.now(),
    };
    localStorage.setItem("atlas_user", JSON.stringify(user));
    setLoading(false);
    setOk(true);
    setTimeout(() => router.push("/dashboard"), 550);
  };

  return (
    <section className="relative flex items-center justify-center p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 topo opacity-40 lg:hidden" />
      <div className="relative w-full max-w-[440px]">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="mono text-[11px] tracking-[0.24em] text-[color:var(--color-muted)]">
            ? BACK
          </Link>
          <span className="mono text-[11px] tracking-[0.22em] text-[color:var(--color-muted)]">
            {mode === "login" && "SIGN IN"}
            {mode === "signup" && "CREATE ACCOUNT"}
            {mode === "forgot" && "RESET"}
          </span>
        </div>

        <h2 className="text-[30px] font-semibold leading-tight tracking-tight sm:text-[36px]">
          {title}
        </h2>
        <p className="mt-2 text-[14px] text-[color:var(--color-muted)]">{hint}</p>

        <form
          onSubmit={submit}
          className={"atlas-surface mt-6 space-y-4 p-6 " + (ok ? "gold-flash" : "")}
        >
          {mode === "signup" && (
            <Field
              id="name"
              label="Name"
              value={name}
              onChange={setName}
              placeholder=" "
              autoComplete="name"
            />
          )}

          <Field
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder=" "
            autoComplete="email"
            error={!!error}
          />

          {mode !== "forgot" && (
            <div className="field">
              <input
                id="pw"
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder=" "
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className={error ? "shake" : ""}
              />
              <label htmlFor="pw">Password</label>
              <span className="underline" />
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                onClick={() => setShow((s) => !s)}
                className="reveal-btn"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}

          {error && (
            <p className="mono text-[11px] tracking-[0.14em] text-[color:var(--color-danger)]">
              ? {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? "Working?" : mode === "forgot" ? "Send reset link" : mode === "signup" ? "Create account" : "Continue"}
            {!loading && <ArrowRight className="h-3.5 w-3.5" />}
          </button>

          {mode !== "forgot" && (
            <>
              <div className="my-2 flex items-center gap-3 text-[color:var(--color-muted)]">
                <span className="h-px flex-1 bg-[color:var(--color-border)]" />
                <span className="mono text-[10.5px] tracking-[0.2em]">OR</span>
                <span className="h-px flex-1 bg-[color:var(--color-border)]" />
              </div>

              <button
                type="button"
                className="btn-ghost w-full justify-center"
                onClick={() => {
                  const user = { id: crypto.randomUUID(), email: "you@github", name: "GitHub User", createdAt: Date.now() };
                  localStorage.setItem("atlas_user", JSON.stringify(user));
                  router.push("/dashboard");
                }}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </button>
            </>
          )}
        </form>

        <div className="mt-5 flex items-center justify-between text-[13px] text-[color:var(--color-muted)]">
          {mode === "login" ? (
            <>
              <Link href="/signup" className="hover:text-[color:var(--color-text)]">Create account</Link>
              <Link href="/forgot" className="hover:text-[color:var(--color-text)]">Forgot password?</Link>
            </>
          ) : mode === "signup" ? (
            <>
              <Link href="/login" className="hover:text-[color:var(--color-text)]">Sign in</Link>
              <Link href="/forgot" className="hover:text-[color:var(--color-text)]">Forgot password?</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[color:var(--color-text)]">Sign in</Link>
              <Link href="/signup" className="hover:text-[color:var(--color-text)]">Create account</Link>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/investigate"
            className="mono text-[10.5px] tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
          >
            SKIP ? TRY ATLAS AS GUEST
          </Link>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, placeholder, type = "text", autoComplete, error,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; autoComplete?: string; error?: boolean;
}) {
  return (
    <div className="field">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? " "}
        autoComplete={autoComplete}
        className={error ? "shake" : ""}
      />
      <label htmlFor={id}>{label}</label>
      <span className="underline" />
    </div>
  );
}
