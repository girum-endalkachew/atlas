const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function write(file, content) {
  const full = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, { encoding: "utf8" });
  console.log("Wrote", file);
}

/* --------- Extra CSS: auth-specific motion --------- */
write("app/(auth)/auth.css", `.field {
  position: relative;
}
.field input {
  width: 100%;
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 22px 16px 10px;
  font-size: 14px;
  outline: none;
  transition: border-color .3s ease, box-shadow .3s ease;
}
.field input:focus {
  border-color: var(--color-sky);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-sky) 18%, transparent);
}
.field label {
  position: absolute;
  left: 16px;
  top: 14px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  pointer-events: none;
  transition: transform .25s ease, color .25s ease, top .25s ease;
}
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  top: 6px;
  transform: translateY(0);
  color: var(--color-sky);
}
.field .underline {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 6px;
  height: 1px;
  background: var(--color-sky);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .35s cubic-bezier(.2,.7,.2,1);
}
.field input:focus ~ .underline {
  transform: scaleX(1);
}
.reveal-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
  padding: 6px;
  border-radius: 8px;
}
.reveal-btn:hover { color: var(--color-text); }

@keyframes shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}
.shake { animation: shake .35s ease-in-out; }

@keyframes gold-flash {
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--color-gold) 45%, transparent); }
  100% { box-shadow: 0 0 0 22px transparent; }
}
.gold-flash { animation: gold-flash .7s ease-out; }

.auth-grid {
  display: grid;
  min-height: 100vh;
}
@media (min-width: 900px) {
  .auth-grid { grid-template-columns: 1.15fr 1fr; }
}

.auth-signal {
  position: absolute;
  inset: auto 0 8% 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  opacity: .45;
}
.auth-signal .line {
  position: relative;
  width: 1px;
  height: 220px;
  background: var(--color-border);
}
.auth-signal .dot {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 40px;
  width: 1px;
  background: var(--color-sky);
  animation: signal 2.4s linear infinite;
}
`);

/* --------- Shared Auth layout --------- */
write("app/(auth)/layout.tsx", `import "./auth.css";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="auth-grid bg-[color:var(--color-canvas)]">{children}</div>;
}
`);

/* --------- Reusable Instrument panel (left side) --------- */
write("components/auth/InstrumentPanel.tsx", `import Link from "next/link";

export default function InstrumentPanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <aside className="relative hidden overflow-hidden hairline-b lg:block">
      <div className="pointer-events-none absolute inset-0 topo opacity-90" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[720px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-sky)_25%,transparent),transparent_60%)] blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="mono text-[13px] font-semibold tracking-[0.16em]">ATLAS</span>
          </Link>
          <span className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Atlas ? v1.0
          </span>
        </header>

        <div className="max-w-md">
          <p className="mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            Alpine instrument
          </p>
          <h1 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {subtitle}
          </p>
        </div>

        <footer className="flex items-center justify-between mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">
          <span>TRACE 0042 ? READY</span>
          <span>ERROR ? TRACE ? UNDERSTAND</span>
        </footer>
      </div>

      <div className="auth-signal">
        <div className="line">
          <span className="dot" />
        </div>
      </div>
    </aside>
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
`);

/* --------- Auth form shell (client) --------- */
write("components/auth/AuthCard.tsx", `"use client";

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
`);

/* --------- Auth pages --------- */
write("app/(auth)/login/page.tsx", `import InstrumentPanel from "@/components/auth/InstrumentPanel";
import AuthCard from "@/components/auth/AuthCard";

export const metadata = { title: "Sign in ? Atlas" };

export default function LoginPage() {
  return (
    <>
      <InstrumentPanel
        title="Welcome back to the instrument."
        subtitle="Sign in to continue tracing errors, exploring the atlas, and building understanding."
      />
      <AuthCard
        mode="login"
        title="Sign in"
        hint="Continue with your email or GitHub account."
      />
    </>
  );
}
`);

write("app/(auth)/signup/page.tsx", `import InstrumentPanel from "@/components/auth/InstrumentPanel";
import AuthCard from "@/components/auth/AuthCard";

export const metadata = { title: "Create account ? Atlas" };

export default function SignupPage() {
  return (
    <>
      <InstrumentPanel
        title="Set the instrument to your name."
        subtitle="Create an Atlas account and start building your debugging memory."
      />
      <AuthCard
        mode="signup"
        title="Create your account"
        hint="It takes ten seconds. No credit card. No noise."
      />
    </>
  );
}
`);

write("app/(auth)/forgot/page.tsx", `import InstrumentPanel from "@/components/auth/InstrumentPanel";
import AuthCard from "@/components/auth/AuthCard";

export const metadata = { title: "Reset password ? Atlas" };

export default function ForgotPage() {
  return (
    <>
      <InstrumentPanel
        title="Lost the signal."
        subtitle="Enter your email and we will send you instructions to reset your password."
      />
      <AuthCard
        mode="forgot"
        title="Reset password"
        hint="We will send a magic link. Close this tab if you did not request it."
      />
    </>
  );
}
`);

console.log("\\nAuth shell (login/signup/forgot) painted.");

try {
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync('git commit -m "feat(auth): modern auth shell ? cinematic split, floating labels, mock sign-in, guest bypass, gold success flash"', { stdio: "inherit" });
  } catch { console.log("(nothing to commit)"); }
  execSync("git push", { stdio: "inherit" });
} catch (e) { console.error("Git step:", e.message); }
