import InstrumentPanel from "@/components/auth/InstrumentPanel";
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
