import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proctored Assessment | BlockLearnX",
  description:
    "Secure, AI-monitored proctored examination with on-chain result verification.",
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 antialiased text-slate-100 selection:bg-violet-600 selection:text-white">
      {children}
    </div>
  );
}
