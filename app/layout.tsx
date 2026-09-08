import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Atlas ? Developer Error Atlas",
  description:
    "Understand the error. Fix the cause. Remember the lesson. Atlas turns cryptic developer errors into clear explanations, real solutions, and lasting lessons.",
};

const themeScript = `
try {
  var t = localStorage.getItem('atlas_theme') || 'dark';
  var c = document.documentElement.classList;
  c.toggle('light', t === 'light');
  c.toggle('dark', t !== 'light');
} catch (e) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="atlas-theme" strategy="beforeInteractive">{themeScript}</Script>
      </head>
      <body
        className={[
          inter.variable,
          jetbrains.variable,
          "min-h-screen font-sans antialiased flex flex-col",
        ].join(" ")}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
