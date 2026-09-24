"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Coins,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizData } from "@/lib/quiz-data";

interface QuizPassedViewProps {
  quiz: QuizData;
  scorePercent: number;
  correctAnswersCount: number;
  totalQuestions: number;
  isPassed: boolean;
  selectedAnswers: Record<number, number>;
  onRetake: () => void;
  txHash: string;
}

export function QuizPassedView({
  quiz,
  scorePercent,
  correctAnswersCount,
  totalQuestions,
  isPassed,
  selectedAnswers,
  onRetake,
  txHash,
}: QuizPassedViewProps) {
  const [showReview, setShowReview] = useState(false);
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* ── 1. MAIN PASS / FAIL CELEBRATION HERO ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center relative p-8 sm:p-12">
        
        {/* Glow blur background */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-3xl pointer-events-none ${
            isPassed
              ? "bg-gradient-to-b from-emerald-500/20 via-blue-500/10 to-transparent"
              : "bg-gradient-to-b from-red-500/20 via-amber-500/10 to-transparent"
          }`}
        />

        {/* Central Icon Badge */}
        <div className="relative mx-auto mb-6 w-24 h-24 rounded-3xl p-1.5 shadow-xl flex items-center justify-center">
          <div
            className={`w-full h-full rounded-[22px] flex items-center justify-center ${
              isPassed
                ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/30"
                : "bg-gradient-to-tr from-red-500 to-amber-500 text-white shadow-red-500/30"
            }`}
          >
            {isPassed ? (
              <CheckCircle2 className="h-12 w-12 text-white animate-bounce" style={{ animationDuration: "2s" }} />
            ) : (
              <XCircle className="h-12 w-12 text-white" />
            )}
          </div>
        </div>

        {/* Title: Quiz Passed */}
        <div className="space-y-2 mb-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isPassed
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isPassed ? "Assessment Complete" : "Passing Threshold: " + quiz.passingScorePercent + "%"}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isPassed ? "Quiz Passed" : "Needs Review"}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            {isPassed
              ? `Congratulations! You scored ${scorePercent}% and mastered the core knowledge objectives for ${quiz.courseTitle}.`
              : `You scored ${scorePercent}%. You need ${quiz.passingScorePercent}% to pass and unlock the reward.`}
          </p>
        </div>

        {/* ── 2. REWARD CARD: +50 MX ── */}
        {isPassed && (
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-yellow-500/10 border border-amber-300 shadow-xs mb-8">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                  Learner Reward Claimed
                </span>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-2 font-mono">
                  <Coins className="h-7 w-7 text-amber-500 fill-amber-500" />
                  +{quiz.rewardMX} MX
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  On-Chain Status
                </span>
                <p className="text-xs font-bold text-purple-700 flex items-center justify-end gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Polygon zkEVM
                </p>
              </div>
            </div>

            {/* Simulated Transaction Hash */}
            <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-600 font-mono">
              <span>Tx: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</span>
              <span className="text-emerald-700 font-bold">✓ Mint Verified</span>
            </div>
          </div>
        )}

        {/* Score Breakdown Bar */}
        <div className="max-w-md mx-auto grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center mb-8">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Score</p>
            <p className="text-xl font-black text-slate-900">{scorePercent}%</p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-400">Correct</p>
            <p className="text-xl font-black text-emerald-600">
              {correctAnswersCount} / {totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Result</p>
            <p className={`text-xl font-black ${isPassed ? "text-emerald-600" : "text-red-500"}`}>
              {isPassed ? "PASSED" : "FAILED"}
            </p>
          </div>
        </div>

        {/* ── 3. NEXT: ASSIGNMENT ── */}
        {isPassed && (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white text-left shadow-lg mb-6">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                <Layers className="h-4 w-4" />
                <span>Next Milestone</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {quiz.nextAssignment.bounty}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-2">
              {quiz.nextAssignment.title}
            </h3>

            <p className="text-xs text-blue-200/80 mb-5 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{quiz.nextAssignment.deadline}</span>
            </p>

            <Button
              asChild
              className="w-full py-6 text-sm font-bold bg-[#0056D2] hover:bg-[#00419e] text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Link href={quiz.nextAssignment.url}>
                <span>Next: Assignment</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}

        {/* Retake & Review toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setShowReview(!showReview)}
            className="border-slate-300 text-slate-700 text-xs font-bold gap-1.5 h-10 px-5"
          >
            <BookOpen className="h-4 w-4" />
            <span>{showReview ? "Hide Answer Review" : "Review Questions & Explanations"}</span>
            {showReview ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          <Button
            variant="ghost"
            onClick={onRetake}
            className="text-slate-600 hover:text-slate-900 text-xs font-bold gap-1.5 h-10 px-5"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Assessment</span>
          </Button>
        </div>

      </div>

      {/* ── 4. DETAILED QUESTION REVIEW ACCORDION ── */}
      {showReview && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Detailed Question Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Review correct solutions, your choices, and in-depth explanations for every concept.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {quiz.questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className="py-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {idx + 1}. {q.question}
                      </h4>
                    </div>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                        isCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {isCorrect ? `+${q.points} pts` : `0 / ${q.points} pts`}
                    </span>
                  </div>

                  {/* Options breakdown */}
                  <div className="space-y-1.5 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAnswer === optIdx;
                      const isRealCorrect = optIdx === q.correctAnswer;

                      let itemStyle = "border-slate-100 bg-slate-50/50 text-slate-600";
                      if (isRealCorrect) {
                        itemStyle = "border-emerald-300 bg-emerald-50/80 text-emerald-900 font-semibold";
                      } else if (isUserChoice && !isRealCorrect) {
                        itemStyle = "border-red-300 bg-red-50/80 text-red-900 line-through";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 ${itemStyle}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-bold">{optionLetters[optIdx]}.</span>
                            <span>{opt}</span>
                          </span>

                          <span className="text-[10px] uppercase font-bold shrink-0">
                            {isRealCorrect ? "✓ Correct Answer" : isUserChoice ? "Your Answer" : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="ml-8 p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-[#0056D2]">Concept Explanation:</p>
                    <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
