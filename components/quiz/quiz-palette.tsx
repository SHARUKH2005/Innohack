"use client";

import { Flag, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizPaletteProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  selectedAnswers: Record<number, number>;
  flaggedQuestions: Record<number, boolean>;
  onSubmitQuiz: () => void;
}

export function QuizPalette({
  totalQuestions,
  currentQuestionIndex,
  onSelectQuestion,
  selectedAnswers,
  flaggedQuestions,
  onSubmitQuiz,
}: QuizPaletteProps) {
  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      
      {/* Summary Header */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-700">Quiz Progress</span>
          <span className="text-[#0056D2]">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#0056D2] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          {answeredCount} of {totalQuestions} questions answered
        </p>
      </div>

      {/* Questions Number Grid */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Question Navigator
        </p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isCurrent = currentQuestionIndex === idx;
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isFlagged = flaggedQuestions[idx];

            let cellClass = "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100";
            if (isCurrent) {
              cellClass = "border-[#0056D2] ring-2 ring-[#0056D2]/20 bg-blue-50 text-[#0056D2] font-black";
            } else if (isAnswered) {
              cellClass = "border-emerald-300 bg-emerald-50 text-emerald-700 font-bold";
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={`relative h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${cellClass}`}
              >
                <span>{idx + 1}</span>

                {/* Flag indicator dot */}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-100 border border-[#0056D2] inline-block" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400 inline-block" />
          <span>Flagged ({flaggedCount})</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          id="submit-quiz-btn"
          onClick={onSubmitQuiz}
          className="w-full bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs py-5 rounded-xl shadow-md transition-all"
        >
          Submit Quiz
        </Button>
      </div>

    </div>
  );
}
