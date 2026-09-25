"use client";

import { CourseItem } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Award, 
  Clock, 
  Coins, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface CourseDetailModalProps {
  course: CourseItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  const [enrolled, setEnrolled] = useState(false);

  if (!isOpen || !course) return null;

  const handleEnroll = () => {
    setEnrolled(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header Strip */}
        <div className={`p-6 bg-gradient-to-r ${course.thumbnailGradient} text-white relative flex justify-between items-start`}>
          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white">
                {course.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/90">
                {course.level}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <span>{course.partnerLogo}</span> {course.partner}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="h-3.5 w-3.5 fill-current" /> {course.rating} ({course.ratingCount} reviews)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Duration</span>
              <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                <Clock className="h-4 w-4 text-[#0056D2]" /> {course.duration}
              </p>
            </div>
            <div className="space-y-0.5 border-x border-slate-200 px-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Price</span>
              <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                <Coins className="h-4 w-4 text-slate-700" /> {course.price}
              </p>
            </div>
            <div className="space-y-0.5 pl-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Completion Bounty</span>
              <p className="text-sm font-black text-amber-600 flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> {course.reward}
              </p>
            </div>
          </div>

          {/* About Course */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              About This Specialization
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {course.summary}
            </p>
          </div>

          {/* Skills Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skills You Will Acquire &amp; Verify On-Chain
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0056D2] font-semibold text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0056D2]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soulbound NFT Credential Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">
                Soulbound NFT Degree Included
              </span>
              <p className="text-xs font-bold text-white">
                ERC-5192 Tamper-Proof Cryptographic Certificate
              </p>
            </div>
            <Award className="h-6 w-6 text-amber-300" />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500">Protocol Escrow Guarantee</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Refundable within 7 Days
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs font-bold border-slate-300 h-10 px-4"
            >
              Cancel
            </Button>
            
            {enrolled ? (
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-6 gap-2"
              >
                <Link href="/dashboard">
                  <span>Enrolled! Open in Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                onClick={handleEnroll}
                className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-10 px-6 gap-2 shadow-md"
              >
                <span>Enroll Course ({course.price})</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
