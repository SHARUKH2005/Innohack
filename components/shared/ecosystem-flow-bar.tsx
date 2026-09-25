"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Award,
  Coins,
  Brain,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function EcosystemFlowBar() {
  const router = useRouter();
  const { profile, setUserRole } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const steps = [
    {
      num: 1,
      role: "Platform Admin",
      title: "1. Admin Verifies Provider",
      desc: "Admin accredits university & instructor accounts",
      target: "/admin",
      roleType: "Platform Admin" as const,
      icon: "🛡️",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
    {
      num: 2,
      role: "Course Provider",
      title: "2. Provider Creates Course",
      desc: "Instructor builds modules, video lessons & quizzes",
      target: "/",
      roleType: "Course Provider" as const,
      icon: "👨‍🏫",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    },
    {
      num: 3,
      role: "Learner",
      title: "3. Learner Learns & AI Assessed",
      desc: "Student takes proctored AI quizzes & code evaluations",
      target: "/dashboard",
      roleType: "Learner" as const,
      icon: "🎓",
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      num: 4,
      role: "Learner",
      title: "4. Earns MX & Unlocks Avatar NFT",
      desc: "Tokens issued to wallet + Avatar NFT unlocked",
      target: "/collection",
      roleType: "Learner" as const,
      icon: "🪙",
      color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    {
      num: 5,
      role: "Learner",
      title: "5. Mints Certificate & Portfolio",
      desc: "Soulbound NFT certificate added to verified public profile",
      target: "/portfolio",
      roleType: "Learner" as const,
      icon: "🖼️",
      color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    },
  ];

  const currentRole = profile?.role || "Learner";

  const handleRoleSwitch = async (roleType: "Learner" | "Course Provider" | "Platform Admin", targetUrl: string) => {
    if (setUserRole) {
      await setUserRole(roleType);
    }
    router.push(targetUrl);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 text-white font-sans text-xs">
      <div className="container mx-auto px-4 lg:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Active Role & Toggle */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Hackathon Demo Story
          </span>

          <div className="flex items-center gap-1 text-slate-300 font-semibold">
            <span>Active Role:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold border border-slate-700">
              {currentRole === "Course Provider" && "👨‍🏫 "}
              {currentRole === "Learner" && "🎓 "}
              {currentRole === "Platform Admin" && "🛡️ "}
              {currentRole}
            </span>
          </div>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] text-slate-400 font-semibold mr-1 shrink-0">Switch Portal:</span>
          <button
            onClick={() => handleRoleSwitch("Learner", "/portfolio")}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
              currentRole === "Learner"
                ? "bg-[#0056D2] text-white shadow-sm"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🎓 Learner Portal
          </button>
          <button
            onClick={() => handleRoleSwitch("Course Provider", "/")}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
              currentRole === "Course Provider"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            👨‍🏫 Provider Portal
          </button>
          <button
            onClick={() => handleRoleSwitch("Platform Admin", "/admin")}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
              currentRole === "Platform Admin"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🛡️ Admin Control
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-slate-400 hover:text-white underline text-[11px] font-semibold"
          >
            {expanded ? "Hide Story Flow ▲" : "View Story Flow ▼"}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Story Workflow Timeline */}
      {expanded && (
        <div className="bg-slate-950 border-t border-slate-800 p-4 animate-in fade-in">
          <div className="container mx-auto px-4 lg:px-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Complete Platform Lifecycle Workflow:</span>
              <span className="text-[11px] text-slate-500">Click any step to test that role's interface</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {steps.map((s) => (
                <div
                  key={s.num}
                  onClick={() => handleRoleSwitch(s.roleType, s.target)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] space-y-1.5 ${s.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{s.icon}</span>
                    <span className="text-[10px] font-mono font-bold opacity-80">Step {s.num}</span>
                  </div>
                  <h4 className="font-bold text-xs line-clamp-1">{s.title}</h4>
                  <p className="text-[10px] opacity-80 line-clamp-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
