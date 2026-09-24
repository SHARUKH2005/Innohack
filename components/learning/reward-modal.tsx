"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Coins, ArrowRight, ShieldCheck, Award, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonItem, CourseCurriculum } from "@/lib/learning-data";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: LessonItem;
  curriculum: CourseCurriculum;
  nextLesson: LessonItem | null;
  completedCount: number;
  totalLessons: number;
  onContinueNext: () => void;
}

export function RewardModal({
  isOpen,
  onClose,
  lesson,
  curriculum,
  nextLesson,
  completedCount,
  totalLessons,
  onContinueNext,
}: RewardModalProps) {
  const [txHash, setTxHash] = useState<string>("");
  const isCourseComplete = completedCount >= totalLessons;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  useEffect(() => {
    if (isOpen) {
      // Generate a realistic random transaction hash
      const randomHex = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      setTxHash(`0x${randomHex}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-center relative p-6 sm:p-8">
        
        {/* Glow backdrop behind badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-gradient-to-b from-blue-500/20 via-amber-500/15 to-transparent blur-2xl pointer-events-none" />

        {/* Celebration icon badge */}
        <div className="relative mx-auto mb-5 w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 p-1 shadow-lg shadow-amber-500/25 flex items-center justify-center animate-bounce duration-1000">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
            {isCourseComplete ? (
              <Award className="h-10 w-10 text-amber-400" />
            ) : (
              <Sparkles className="h-10 w-10 text-amber-400" />
            )}
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-1.5 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {isCourseComplete ? "Course Completed!" : "Lesson Completed!"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isCourseComplete ? "Specialization Mastered!" : "Bounty Earned!"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
            {isCourseComplete
              ? `Congratulations! You have completed all lessons in ${curriculum.courseTitle}!`
              : `Great job completing "${lesson.title}". Your reward has been credited.`}
          </p>
        </div>

        {/* Reward Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-blue-500/10 border border-amber-200/80 mb-5">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Learner Reward Bounty
              </span>
              <p className="text-2xl font-black text-slate-900 flex items-center gap-1.5 font-mono">
                <Coins className="h-6 w-6 text-amber-500 fill-amber-500" />
                +{isCourseComplete ? 100 : lesson.bountyMX} MX
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Network
              </span>
              <p className="text-xs font-bold text-purple-700 flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Polygon zkEVM
              </p>
            </div>
          </div>

          {/* Transaction Simulation Hash */}
          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-600 font-mono">
            <span>Tx: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</span>
            <span className="text-emerald-700 font-bold">100% Confirmed</span>
          </div>
        </div>

        {/* Course Progress Bar */}
        <div className="mb-6 space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Course Progress</span>
            <span className="text-[#0056D2]">{completedCount} of {totalLessons} Lessons ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0056D2] to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Special NFT Certificate Banner if Course Completed */}
        {isCourseComplete && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-amber-400 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Soulbound NFT Unlocked</p>
                <p className="text-sm font-bold text-white">{curriculum.nftName}</p>
                <p className="text-xs text-slate-300 mt-0.5">ERC-5192 verifiable certificate ready to mint to your wallet.</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {isCourseComplete ? (
            <Button
              asChild
              className="w-full py-6 text-sm font-bold bg-[#0056D2] hover:bg-[#00419e] text-white rounded-xl shadow-lg shadow-blue-600/25"
            >
              <Link href="/dashboard" onClick={onClose}>
                <span>View Certificate on Dashboard</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : nextLesson ? (
            <Button
              onClick={() => {
                onClose();
                onContinueNext();
              }}
              className="w-full py-6 text-sm font-bold bg-[#0056D2] hover:bg-[#00419e] text-white rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <span>Continue to Next Lesson</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onClose}
              className="w-full py-6 text-sm font-bold bg-[#0056D2] hover:bg-[#00419e] text-white rounded-xl"
            >
              Return to Course
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Stay on This Lesson
          </Button>
        </div>

      </div>
    </div>
  );
}
