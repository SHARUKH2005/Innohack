"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { getQuizData, QuizData } from "@/lib/quiz-data";
import { QuizTimer } from "@/components/quiz/quiz-timer";
import { QuestionCard } from "@/components/quiz/question-card";
import { QuizPalette } from "@/components/quiz/quiz-palette";
import { QuizPassedView } from "@/components/quiz/quiz-passed-view";
import { Confetti } from "@/components/learning/confetti";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = (params?.quizId as string) || "solidity-fundamentals-quiz";

  const quiz: QuizData = getQuizData(quizId);

  // Assessment States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  
  // Submission & Results
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [txHash, setTxHash] = useState("");

  // Result metrics
  const [scorePercent, setScorePercent] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isPassed, setIsPassed] = useState(false);

  // Load any previously completed state or reset
  useEffect(() => {
    // Check if previously passed
    const stored = localStorage.getItem(`quiz_passed_${quizId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedAnswers(parsed.selectedAnswers || {});
        setScorePercent(parsed.scorePercent);
        setCorrectAnswersCount(parsed.correctAnswersCount);
        setIsPassed(parsed.isPassed);
        setTxHash(parsed.txHash || "0x9f8c...32b1");
        setIsSubmitted(true);
      } catch (e) {}
    }
  }, [quizId]);

  // Answer selection handler
  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Flag toggle handler
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  // Calculation & Submit
  const handleFinalSubmit = () => {
    setShowConfirmSubmit(false);

    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / quiz.questions.length) * 100);
    const passed = percent >= quiz.passingScorePercent;

    setCorrectAnswersCount(correct);
    setScorePercent(percent);
    setIsPassed(passed);

    // Generate random tx hash
    const randomHex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const generatedHash = `0x${randomHex}`;
    setTxHash(generatedHash);

    if (passed) {
      setShowConfetti(true);

      // Save reward & state to localStorage
      try {
        // Update total MX balance
        const currentBalance = parseInt(localStorage.getItem("blocklearnx_mx_balance") || "2450", 10);
        localStorage.setItem("blocklearnx_mx_balance", (currentBalance + quiz.rewardMX).toString());

        // Save quiz completion
        localStorage.setItem(
          `quiz_passed_${quizId}`,
          JSON.stringify({
            scorePercent: percent,
            correctAnswersCount: correct,
            isPassed: true,
            selectedAnswers,
            txHash: generatedHash,
            completedAt: new Date().toISOString(),
          })
        );
      } catch (e) {}
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check unanswered before submitting
  const handleSubmitAttempt = () => {
    const unansweredCount = quiz.questions.length - Object.keys(selectedAnswers).length;
    if (unansweredCount > 0) {
      setShowConfirmSubmit(true);
    } else {
      handleFinalSubmit();
    }
  };

  // Handle Retake
  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setShowConfetti(false);
    localStorage.removeItem(`quiz_passed_${quizId}`);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col justify-between">
      
      {/* ── TOP APP BAR ── */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
        
        {/* Left: Brand + Course Context */}
        <div className="flex items-center gap-4 min-w-0">
          <Link href={`/courses/${quiz.courseId}`} className="shrink-0 flex items-center">
            <Logo height={32} width={135} />
          </Link>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="min-w-0 hidden md:block">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {quiz.partnerLogo} {quiz.partner}
            </p>
            <h2 className="text-xs font-bold text-white truncate max-w-xs lg:max-w-md">
              {quiz.title}
            </h2>
          </div>
        </div>

        {/* Right: Timer & Reward status */}
        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <QuizTimer
              initialMinutes={quiz.durationMinutes}
              onTimeExpired={handleFinalSubmit}
            />
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>+{quiz.rewardMX} MX</span>
          </div>

          <Link
            href={`/courses/${quiz.courseId}`}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 transition-colors"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {isSubmitted ? (
          /* ========================================================
             RESULT SCREEN: Quiz Passed +50 MX & Next Assignment
             ======================================================== */
          <QuizPassedView
            quiz={quiz}
            scorePercent={scorePercent}
            correctAnswersCount={correctAnswersCount}
            totalQuestions={quiz.questions.length}
            isPassed={isPassed}
            selectedAnswers={selectedAnswers}
            onRetake={handleRetake}
            txHash={txHash}
          />
        ) : (
          /* ========================================================
             ACTIVE QUIZ SCREEN: Questions, Multiple choice, Progress
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Current Question Card & Navigation */}
            <div className="lg:col-span-8 space-y-6">
              
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={quiz.questions.length}
                selectedOption={selectedAnswers[currentQuestionIndex] ?? null}
                onSelectOption={handleSelectOption}
                isFlagged={!!flaggedQuestions[currentQuestionIndex]}
                onToggleFlag={handleToggleFlag}
              />

              {/* Bottom Question Navigation Controls */}
              <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="border-slate-300 text-slate-700 font-semibold text-xs h-10 px-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="text-xs font-semibold text-slate-500">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmitAttempt}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md transition-all"
                  >
                    Finish &amp; Submit
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(quiz.questions.length - 1, prev + 1)
                      )
                    }
                    className="bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs h-10 px-5 rounded-xl shadow-sm"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>

            </div>

            {/* Right 4 Cols: Progress & Palette */}
            <div className="lg:col-span-4 space-y-6">
              
              <QuizPalette
                totalQuestions={quiz.questions.length}
                currentQuestionIndex={currentQuestionIndex}
                onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
                selectedAnswers={selectedAnswers}
                flaggedQuestions={flaggedQuestions}
                onSubmitQuiz={handleSubmitAttempt}
              />

              {/* Reward info card */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Award className="h-4 w-4" />
                  <span>Certification Bounty</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pass this assessment with <strong className="text-white">{quiz.passingScorePercent}% or higher</strong> to earn <strong>+{quiz.rewardMX} MX</strong> and immediately unlock the <strong>{quiz.nextAssignment.title.split(":")[0]}</strong>.
                </p>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* ── FOOTER BAR ── */}
      <footer className="border-t border-slate-800 bg-slate-900 py-3 text-center text-xs text-slate-500">
        BlockLearnX Decentralized Learning Protocol · All assessments cryptographically verified.
      </footer>

      {/* ── CONFIRM SUBMIT MODAL (if unanswered questions exist) ── */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                Unanswered Questions Remaining
              </h3>
              <p className="text-xs text-slate-600">
                You have answered {Object.keys(selectedAnswers).length} of {quiz.questions.length} questions. Are you sure you want to submit your quiz now?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 text-xs font-bold border-slate-300 h-10"
              >
                Keep Answering
              </Button>
              <Button
                onClick={handleFinalSubmit}
                className="flex-1 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold h-10 shadow-md"
              >
                Submit Anyway
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFETTI BURST ── */}
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

    </div>
  );
}
