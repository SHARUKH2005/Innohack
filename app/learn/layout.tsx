import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Player | BlockLearnX",
  description: "Interactive Web3 and AI learning experience with verifiable blockchain credentials.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 antialiased selection:bg-[#0056D2] selection:text-white">
      {children}
    </div>
  );
}
