import "./auth.css";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="auth-grid bg-[color:var(--color-canvas)]">{children}</div>;
}
