"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/quiz/solidity-fundamentals-quiz");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#0056D2] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-300">Loading Assessment...</p>
      </div>
    </div>
  );
}
