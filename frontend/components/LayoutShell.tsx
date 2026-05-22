"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
