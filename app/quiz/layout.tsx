import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessment Quiz | BlockLearnX",
  description: "Knowledge check and skill evaluation with on-chain verification.",
};

export default function QuizLayout({
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
