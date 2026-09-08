import InstrumentPanel from "@/components/auth/InstrumentPanel";
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
