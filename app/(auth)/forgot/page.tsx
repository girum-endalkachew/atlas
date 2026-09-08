import InstrumentPanel from "@/components/auth/InstrumentPanel";
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
