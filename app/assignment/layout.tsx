import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Assignment | BlockLearnX",
  description: "Hands-on Web3 programming assignment and automated AI audit verification.",
};

export default function AssignmentLayout({
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
