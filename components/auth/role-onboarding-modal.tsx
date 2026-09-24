"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/supabase/auth-context";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RoleOnboardingModal() {
  const router = useRouter();
  const { profile, showRoleModal, setUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"Learner" | "Course Provider">("Learner");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showRoleModal || !profile) {
    return null;
  }

  const handleConfirmRole = async () => {
    setIsSubmitting(true);
    await setUserRole(selectedRole);
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo height={44} width={180} />
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0056D2] text-xs font-bold uppercase tracking-wider">
            First-Time Account Setup
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            Welcome, {profile.full_name.split(" ")[0]}!
          </h3>
          <p className="text-xs text-slate-600">
            Please select your primary role on the BlockLearnX Web3 Platform.
          </p>
        </div>

        {/* Role Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Option 1: Learner */}
          <div
            onClick={() => setSelectedRole("Learner")}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 relative ${
              selectedRole === "Learner"
                ? "border-[#0056D2] bg-blue-50/60 shadow-md scale-[1.02]"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            {selectedRole === "Learner" && (
              <CheckCircle2 className="h-5 w-5 text-[#0056D2] absolute top-3 right-3" />
            )}
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0056D2] flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Learner</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Enroll in university specializations, earn $MX bounties, and mint Soulbound NFT degrees.
              </p>
            </div>
          </div>

          {/* Option 2: Course Provider */}
          <div
            onClick={() => setSelectedRole("Course Provider")}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 relative ${
              selectedRole === "Course Provider"
                ? "border-[#0056D2] bg-blue-50/60 shadow-md scale-[1.02]"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            {selectedRole === "Course Provider" && (
              <CheckCircle2 className="h-5 w-5 text-[#0056D2] absolute top-3 right-3" />
            )}
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Course Provider</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Publish university curricula, manage student AI audits, and fund protocol bounties.
              </p>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <Button
          onClick={handleConfirmRole}
          disabled={isSubmitting}
          className="w-full h-12 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-sm rounded-xl shadow-md gap-2"
        >
          <span>Complete Setup &amp; Enter Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

      </div>
    </div>
  );
}
