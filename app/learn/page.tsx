"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LearnIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/learn/solidity-fundamentals/what-is-solidity");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#0056D2] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-300">Opening Learning Workspace...</p>
      </div>
    </div>
  );
}
