"use client";

import { Flag, CheckCircle, Code } from "lucide-react";
import { QuizQuestion } from "@/lib/quiz-data";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  isFlagged,
  onToggleFlag,
}: QuestionCardProps) {
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header: Question Number, Points, Flag button */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0056D2] font-black text-xs uppercase tracking-wider">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {question.points} Points
          </span>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isFlagged
              ? "bg-amber-100 text-amber-800 border border-amber-300"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
          title="Flag question for review later"
        >
          <Flag className={`h-3.5 w-3.5 ${isFlagged ? "fill-amber-500 text-amber-500" : ""}`} />
          <span>{isFlagged ? "Flagged for Review" : "Flag for Review"}</span>
        </button>
      </div>

      {/* Question Prompt */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.question}
        </h2>

        {/* Optional Code Snippet */}
        {question.codeSnippet && (
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-sm">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-blue-400" />
                Code Reference
              </span>
              <span className="uppercase text-amber-400 text-[10px] font-bold">
                {question.codeSnippet.language}
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{question.codeSnippet.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Multiple Choice Options List */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select One Correct Answer:
        </p>

        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/90 border-[#0056D2] text-[#0056D2] shadow-xs"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700 bg-white"
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#0056D2] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  }`}
                >
                  {optionLetters[idx] || idx + 1}
                </div>

                {/* Option Text */}
                <span
                  className={`text-xs sm:text-sm leading-relaxed pt-1 flex-1 ${
                    isSelected ? "font-bold text-slate-900" : "font-normal text-slate-700"
                  }`}
                >
                  {option}
                </span>

                {/* Radio selection check indicator */}
                <div className="pt-1 shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#0056D2] bg-[#0056D2]"
                        : "border-slate-300 group-hover:border-slate-400"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
