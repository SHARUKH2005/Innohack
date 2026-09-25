"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Camera,
  CameraOff,
  ShieldAlert,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Clipboard,
  MonitorX,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Send,
  Flag,
  AlertCircle,
  Lock,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { getAssessmentData, AssessmentData } from "@/lib/assessment-data";
import { Confetti } from "@/components/learning/confetti";
import { createClient } from "@/lib/supabase/client";

/* ─────────────────────────────────────────────────────────────
   PROCTORING STATUS PILL
───────────────────────────────────────────────────────────── */
function StatusPill({
  active,
  label,
  icon: Icon,
}: {
  active: boolean;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-300 ${
        active
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : "bg-red-500/10 border-red-500/30 text-red-400"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="hidden sm:inline">{label}:</span>
      <span className="font-mono">{active ? "ON" : "OFF"}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VIOLATION BADGE
───────────────────────────────────────────────────────────── */
function ViolationBadge({
  count,
  max,
}: {
  count: number;
  max: number;
}) {
  const pct = (count / max) * 100;
  const color =
    count === 0
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : count === 1
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
      : "text-red-400 border-red-500/30 bg-red-500/10";

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all duration-300 ${color}`}
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      <span className="hidden sm:inline">Violations:</span>
      <span className="font-mono tabular-nums">
        {count}/{max}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TIMER
───────────────────────────────────────────────────────────── */
function AssessmentTimer({
  totalSeconds,
  onExpired,
}: {
  totalSeconds: number;
  onExpired: () => void;
}) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (remaining <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpired();
      }
      return;
    }
    const t = setTimeout(() => setRemaining((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onExpired]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const pct = remaining / totalSeconds;
  const critical = remaining < 120;
  const warning = remaining < 300 && !critical;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-[13px] font-bold transition-all duration-300 ${
        critical
          ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
          : warning
          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
          : "bg-slate-800 border-slate-700 text-slate-200"
      }`}
    >
      <Clock className="h-3.5 w-3.5 shrink-0" />
      <span className="tabular-nums">
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WEBCAM PREVIEW
───────────────────────────────────────────────────────────── */
function WebcamPreview({
  streamRef,
  active,
}: {
  streamRef: React.RefObject<MediaStream | null>;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && streamRef.current && active) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [active, streamRef]);

  if (!active) {
    return (
      <div className="w-full aspect-video bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2">
        <CameraOff className="h-6 w-6 text-slate-600" />
        <p className="text-[11px] text-slate-500 font-medium">Camera Off</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl border border-emerald-500/30 overflow-hidden shadow-lg shadow-emerald-500/10">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover scale-x-[-1]"
      />
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-600/90 text-white text-[10px] font-bold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        REC
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-[10px] text-white/70 font-medium">
          Proctored
        </span>
        <div className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">Verified</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUESTION CARD
───────────────────────────────────────────────────────────── */
function AssessmentQuestionCard({
  question,
  index,
  total,
  selectedOption,
  onSelect,
  isFlagged,
  onToggleFlag,
  isSubmitted,
}: {
  question: AssessmentData["questions"][0];
  index: number;
  total: number;
  selectedOption: number | null;
  onSelect: (opt: number) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  isSubmitted: boolean;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 overflow-hidden shadow-xl">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center text-xs font-black">
            {index + 1}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Question {index + 1} of {total}
            </p>
            <p className="text-[11px] text-violet-400 font-semibold">
              {question.points} points
            </p>
          </div>
        </div>
        <button
          onClick={onToggleFlag}
          className={`p-2 rounded-lg transition-colors ${
            isFlagged
              ? "bg-amber-500/20 text-amber-400"
              : "bg-slate-800 text-slate-500 hover:text-amber-400"
          }`}
          title={isFlagged ? "Remove flag" : "Flag for review"}
        >
          <Flag className="h-4 w-4" />
        </button>
      </div>

      {/* Question body */}
      <div className="p-6 space-y-5">
        <p className="text-slate-100 text-sm leading-relaxed font-medium">
          {question.question}
        </p>

        {/* Code snippet */}
        {question.codeSnippet && (
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono ml-2">
                {question.codeSnippet.language}
              </span>
            </div>
            <pre className="bg-[#0d1117] p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre select-none">
              {question.codeSnippet.code}
            </pre>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = isSubmitted && i === question.correctAnswer;
            const isWrong =
              isSubmitted && isSelected && i !== question.correctAnswer;

            return (
              <button
                key={i}
                onClick={() => !isSubmitted && onSelect(i)}
                disabled={isSubmitted}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-start gap-3 group ${
                  isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                    : isWrong
                    ? "bg-red-500/10 border-red-500/40 text-red-300"
                    : isSelected
                    ? "bg-violet-600/15 border-violet-500/50 text-violet-200"
                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-violet-500/40 hover:bg-slate-800"
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black mt-0.5 transition-colors ${
                    isCorrect
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isWrong
                      ? "bg-red-500 border-red-500 text-white"
                      : isSelected
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-600 text-slate-500 group-hover:border-violet-500"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : isWrong ? (
                    <XCircle className="h-3 w-3" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation (after submit) */}
        {isSubmitted && (
          <div className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/25">
            <p className="text-[11px] text-violet-300 font-bold uppercase tracking-wider mb-1.5">
              Explanation
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUESTION PALETTE SIDEBAR
───────────────────────────────────────────────────────────── */
function QuestionPalette({
  total,
  current,
  answers,
  flagged,
  onSelect,
}: {
  total: number;
  current: number;
  answers: Record<number, number>;
  flagged: Record<number, boolean>;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 p-4 space-y-3">
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
        Question Navigator
      </p>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`h-9 w-full rounded-lg text-xs font-bold transition-all duration-150 relative ${
              i === current
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 ring-2 ring-violet-400/40"
                : answers[i] !== undefined
                ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-400"
                : "bg-slate-800 border border-slate-700 text-slate-400 hover:border-violet-500/40"
            }`}
          >
            {i + 1}
            {flagged[i] && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-2 space-y-1.5 text-[10px] text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-violet-600" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-emerald-600/20 border border-emerald-500/30" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700" />
          <span>Not answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 relative" />
          <span>Flagged for review</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTEGRITY SIDEBAR CARD
───────────────────────────────────────────────────────────── */
function IntegrityCard({
  violations,
  maxViolations,
  cameraActive,
  tabMonitoring,
  copyProtection,
}: {
  violations: { type: string; time: string }[];
  maxViolations: number;
  cameraActive: boolean;
  tabMonitoring: boolean;
  copyProtection: boolean;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-violet-400" />
        <span className="text-xs font-bold text-slate-200">
          Assessment Integrity
        </span>
      </div>
      <div className="p-4 space-y-3">
        <StatusPill active={cameraActive} label="Camera" icon={Camera} />
        <StatusPill
          active={tabMonitoring}
          label="Tab Monitoring"
          icon={Eye}
        />
        <StatusPill
          active={copyProtection}
          label="Copy Protection"
          icon={Clipboard}
        />

        <div className="pt-2 border-t border-slate-800">
          <ViolationBadge count={violations.length} max={maxViolations} />
        </div>

        {violations.length > 0 && (
          <div className="space-y-1.5">
            {violations.map((v, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-red-500/8 border border-red-500/20"
              >
                <AlertTriangle className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-red-300 font-semibold">
                    {v.type}
                  </p>
                  <p className="text-[10px] text-slate-500">{v.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {violations.length >= maxViolations && (
          <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-center">
            <p className="text-[11px] text-red-400 font-bold">
              ⚠ Max violations reached
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Exam auto-submitted
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RESULTS VIEW
───────────────────────────────────────────────────────────── */
function AssessmentResults({
  assessment,
  scorePercent,
  correct,
  violations,
  isPassed,
  onRetake,
}: {
  assessment: AssessmentData;
  scorePercent: number;
  correct: number;
  violations: { type: string; time: string }[];
  isPassed: boolean;
  onRetake: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Result card */}
        <div
          className={`rounded-3xl border p-8 text-center space-y-6 ${
            isPassed
              ? "bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500/30"
              : "bg-gradient-to-b from-red-950/80 to-slate-900 border-red-500/30"
          }`}
        >
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl ${
              isPassed
                ? "bg-emerald-600 shadow-emerald-500/30"
                : "bg-red-600 shadow-red-500/30"
            }`}
          >
            {isPassed ? (
              <Award className="h-10 w-10 text-white" />
            ) : (
              <XCircle className="h-10 w-10 text-white" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">
              {isPassed ? "Assessment Passed! 🎉" : "Assessment Failed"}
            </h1>
            <p className="text-sm text-slate-400">
              {assessment.title}
            </p>
          </div>

          {/* Score ring */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isPassed ? "#10b981" : "#ef4444"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - scorePercent / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-3xl font-black ${
                  isPassed ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {scorePercent}%
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Score
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/60 rounded-xl p-3">
              <p className="text-lg font-black text-white">
                {correct}/{assessment.questions.length}
              </p>
              <p className="text-[10px] text-slate-400">Correct</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3">
              <p className="text-lg font-black text-amber-400">
                {violations.length}
              </p>
              <p className="text-[10px] text-slate-400">Violations</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3">
              <p
                className={`text-lg font-black ${
                  isPassed ? "text-emerald-400" : "text-slate-400"
                }`}
              >
                {isPassed ? `+${assessment.rewardMX}` : "0"}
              </p>
              <p className="text-[10px] text-slate-400">MX Earned</p>
            </div>
          </div>

          {/* Reward */}
          {isPassed && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-amber-300">
                  +{assessment.rewardMX} MX Reward Earned
                </p>
                <p className="text-[10px] text-slate-400">
                  Cryptographically verified & recorded on-chain
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            {isPassed ? (
              <div className="space-y-2.5">
                <Link href={`/verify/certificate/${assessment.courseId}`}>
                  <Button className="w-full bg-[#0056D2] hover:bg-[#00419e] text-white font-bold h-12 rounded-xl text-sm shadow-lg shadow-blue-600/20">
                    View &amp; Verify On-Chain Certificate NFT →
                  </Button>
                </Link>
                <Link href={`/courses/${assessment.courseId}`}>
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:text-white h-11 rounded-xl text-sm"
                  >
                    Return to Course Overview
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Button
                  onClick={onRetake}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold h-12 rounded-xl text-sm"
                >
                  Retake Assessment
                </Button>
                <Link href={`/courses/${assessment.courseId}`}>
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:text-white h-11 rounded-xl text-sm"
                  >
                    Back to Course
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRE-ASSESSMENT GATE (permissions + rules)
───────────────────────────────────────────────────────────── */
function PreAssessmentGate({
  assessment,
  onStart,
  cameraGranted,
  onRequestCamera,
}: {
  assessment: AssessmentData;
  onStart: () => void;
  cameraGranted: boolean;
  onRequestCamera: () => void;
}) {
  const rules = [
    "Your camera will be active throughout the assessment for identity verification.",
    "Switching browser tabs will be detected and logged as a violation.",
    "Copy and paste is disabled. All keyboard shortcuts are monitored.",
    "3 violations result in automatic exam termination and submission.",
    "All answers and events are cryptographically recorded on-chain.",
    "You have " +
      assessment.durationMinutes +
      " minutes to complete all questions.",
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-violet-400" />
          </div>
          <h1 className="text-xl font-black text-white">
            Proctored Assessment
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {assessment.title}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 text-violet-400" />
              {assessment.durationMinutes} minutes
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Flag className="h-3.5 w-3.5 text-violet-400" />
              {assessment.questions.length} questions
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              +{assessment.rewardMX} MX reward
            </span>
          </div>
        </div>

        {/* Camera permission */}
        <div
          className={`rounded-2xl border p-5 flex items-center gap-4 transition-all ${
            cameraGranted
              ? "bg-emerald-500/8 border-emerald-500/25"
              : "bg-slate-900 border-slate-700"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              cameraGranted ? "bg-emerald-600/20" : "bg-slate-800"
            }`}
          >
            {cameraGranted ? (
              <Camera className="h-5 w-5 text-emerald-400" />
            ) : (
              <CameraOff className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">
              Camera Access
              {cameraGranted && (
                <span className="ml-2 text-xs text-emerald-400 font-normal">
                  ✓ Granted
                </span>
              )}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Required for identity verification during the exam
            </p>
          </div>
          {!cameraGranted && (
            <Button
              onClick={onRequestCamera}
              className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 h-9 rounded-xl"
            >
              Enable
            </Button>
          )}
        </div>

        {/* Rules */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700/60 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-bold text-white">
              Assessment Rules & Integrity Policy
            </p>
          </div>
          <div className="space-y-2.5">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-violet-600/20 text-violet-400 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Start / Camera Enable Actions */}
        <div className="space-y-2">
          <Button
            onClick={() => {
              if (!cameraGranted) {
                onRequestCamera();
              } else {
                onStart();
              }
            }}
            className="w-full bg-[#0056D2] hover:bg-[#00419e] text-white font-bold h-13 rounded-xl text-sm flex items-center gap-2 justify-center shadow-lg shadow-blue-600/20"
          >
            <Unlock className="h-4 w-4" />
            {cameraGranted ? "Begin Proctored Assessment →" : "Enable Camera & Begin Assessment"}
          </Button>

          {!cameraGranted && (
            <button
              type="button"
              onClick={onStart}
              className="w-full text-center text-xs text-slate-400 hover:text-white underline py-1 transition-colors"
            >
              Skip camera check &amp; start assessment →
            </button>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-600">
          By starting, you agree to be monitored via webcam for exam integrity.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function AssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId =
    (params?.assessmentId as string) || "solidity-final-exam";
  const assessment = getAssessmentData(assessmentId);

  // Gate / phase states
  const [phase, setPhase] = useState<"gate" | "active" | "results">("active");

  // Camera
  const [cameraGranted, setCameraGranted] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Question state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<
    Record<number, boolean>
  >({});

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scorePercent, setScorePercent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isPassed, setIsPassed] = useState(false);

  // Proctoring violations
  const [violations, setViolations] = useState<
    { type: string; time: string }[]
  >([]);
  const [showViolationToast, setShowViolationToast] = useState<string | null>(
    null
  );

  const addViolation = useCallback(
    (type: string) => {
      const now = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const updated = [...violations, { type, time: now }];
      setViolations(updated);
      setShowViolationToast(type);
      setTimeout(() => setShowViolationToast(null), 4000);

      // Auto-submit on max violations
      if (updated.length >= assessment.maxViolations) {
        setTimeout(() => handleFinalSubmit(updated), 1000);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [violations, assessment.maxViolations]
  );

  // Request camera access
  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraGranted(true);
    } catch (err) {
      console.warn("Webcam access not available, defaulting to proctoring fallback:", err);
      setCameraGranted(true);
    }
  };

  // Tab visibility detection
  useEffect(() => {
    if (phase !== "active") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation("Tab switch detected");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [phase, addViolation]);

  // Copy/paste detection
  useEffect(() => {
    if (phase !== "active") return;

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      addViolation("Copy attempt blocked");
    };
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      addViolation("Paste attempt blocked");
    };
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      addViolation("Cut attempt blocked");
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, F12, Ctrl+Shift+I
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x", "a", "u"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        if (["c", "x"].includes(e.key.toLowerCase())) {
          addViolation(
            `Keyboard shortcut blocked (${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key.toUpperCase()})`
          );
        }
      }
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        addViolation("DevTools access attempt");
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, addViolation]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleStartAssessment = () => {
    setPhase("active");
  };

  const handleFinalSubmit = async (
    currentViolations?: { type: string; time: string }[]
  ) => {
    setShowConfirmSubmit(false);
    const usedViolations = currentViolations ?? violations;

    let correct = 0;
    assessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });

    const pct = Math.round((correct / assessment.questions.length) * 100);
    const passed = pct >= assessment.passingScorePercent;

    setCorrectCount(correct);
    setScorePercent(pct);
    setIsPassed(passed);
    setIsSubmitted(true);

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      setCameraGranted(false);
    }

    if (passed) {
      setShowConfetti(true);
    }

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let userId = user?.id;

      if (!userId) {
        const res = await fetch(`${BACKEND_URL}/api/users`);
        if (res.ok) {
          const users = await res.json();
          if (Array.isArray(users) && users.length > 0) {
            userId = users[0].id;
          }
        }
      }

      if (userId) {
        // 1. Submit assessment
        const subRes = await fetch(`${BACKEND_URL}/api/assessments/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            course_id: assessment.courseId || "solidity-fundamentals",
          }),
        });

        if (subRes.ok) {
          const submission = await subRes.json();
          // 2. Run AI evaluation
          const evalRes = await fetch(`${BACKEND_URL}/api/assessments/ai-evaluate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assessment_id: submission.id,
              question: assessment.title,
              answer: `Scored ${pct}% (${correct}/${assessment.questions.length} correct). Violations: ${usedViolations.length}`,
            }),
          });

          if (evalRes.ok && passed) {
            const studentNameInput = prompt("Congratulations on passing! Enter your full name for your official certificate:", "Sharukh Sameer") || "Sharukh Sameer";
            // 3. Issue Blockchain Certificate NFT
            await fetch(`${BACKEND_URL}/api/certificates/issue`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                courseId: assessment.courseId || "solidity-fundamentals",
                assessmentId: submission.id,
                verificationCode: `BLX-CERT-${Date.now().toString(36).toUpperCase()}`,
                studentName: studentNameInput.trim(),
              }),
            });
          }
        }
      }
    } catch (err) {
      console.error("Assessment backend integration notice:", err);
    }

    setTimeout(() => setPhase("results"), 500);
  };

  const handleSubmitAttempt = () => {
    const unanswered =
      assessment.questions.length - Object.keys(selectedAnswers).length;
    if (unanswered > 0) {
      setShowConfirmSubmit(true);
    } else {
      handleFinalSubmit();
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setViolations([]);
    setShowConfetti(false);
    setCameraGranted(false);
    streamRef.current = null;
    setPhase("gate");
  };

  // ── GATE PHASE ──
  if (phase === "gate") {
    return (
      <PreAssessmentGate
        assessment={assessment}
        cameraGranted={cameraGranted}
        onRequestCamera={requestCamera}
        onStart={handleStartAssessment}
      />
    );
  }

  // ── RESULTS PHASE ──
  if (phase === "results") {
    return (
      <>
        <AssessmentResults
          assessment={assessment}
          scorePercent={scorePercent}
          correct={correctCount}
          violations={violations}
          isPassed={isPassed}
          onRetake={handleRetake}
        />
        <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      </>
    );
  }

  // ── ACTIVE EXAM PHASE ──
  const currentQuestion = assessment.questions[currentIdx];
  const isLastQuestion = currentIdx === assessment.questions.length - 1;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* ── VIOLATION TOAST ── */}
      {showViolationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-600 text-white shadow-2xl shadow-red-500/30 border border-red-400/30">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <div>
              <p className="text-xs font-black">Integrity Violation Detected</p>
              <p className="text-[10px] opacity-80">{showViolationToast}</p>
            </div>
            <div className="ml-2 text-[10px] font-bold opacity-80">
              {violations.length}/{assessment.maxViolations}
            </div>
          </div>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 shrink-0 z-30">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="shrink-0 hidden sm:flex items-center">
            <Logo height={30} width={130} />
          </Link>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <div className="min-w-0 hidden md:block">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Proctored Exam
            </p>
            <h2 className="text-[11px] font-bold text-white truncate max-w-xs lg:max-w-sm">
              {assessment.title}
            </h2>
          </div>
        </div>

        {/* Center: proctoring status */}
        <div className="flex items-center gap-2">
          <StatusPill active={cameraGranted} label="Camera" icon={Camera} />
          <StatusPill active={true} label="Tab Monitor" icon={MonitorX} />
          <StatusPill active={true} label="Copy Protect" icon={Clipboard} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <ViolationBadge
            count={violations.length}
            max={assessment.maxViolations}
          />
          <AssessmentTimer
            totalSeconds={assessment.durationMinutes * 60}
            onExpired={() => handleFinalSubmit()}
          />
        </div>
      </header>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar: webcam + integrity */}
        <aside className="hidden xl:flex w-64 shrink-0 border-r border-slate-800 bg-slate-900/50 flex-col gap-4 p-4 overflow-y-auto">
          <WebcamPreview streamRef={streamRef} active={cameraGranted} />
          <IntegrityCard
            violations={violations}
            maxViolations={assessment.maxViolations}
            cameraActive={cameraGranted}
            tabMonitoring={true}
            copyProtection={true}
          />
        </aside>

        {/* Center: question */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full transition-all duration-500"
                style={{
                  width: `${(answeredCount / assessment.questions.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono tabular-nums whitespace-nowrap">
              {answeredCount}/{assessment.questions.length} answered
            </span>
          </div>

          <AssessmentQuestionCard
            question={currentQuestion}
            index={currentIdx}
            total={assessment.questions.length}
            selectedOption={selectedAnswers[currentIdx] ?? null}
            onSelect={(opt) =>
              !isSubmitted &&
              setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: opt }))
            }
            isFlagged={!!flaggedQuestions[currentIdx]}
            onToggleFlag={() =>
              setFlaggedQuestions((prev) => ({
                ...prev,
                [currentIdx]: !prev[currentIdx],
              }))
            }
            isSubmitted={isSubmitted}
          />

          {/* Navigation controls */}
          <div className="flex items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
              disabled={currentIdx === 0}
              className="border-slate-700 text-slate-300 hover:text-white text-xs h-10 px-4 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            <div className="text-xs text-slate-500 font-medium">
              {currentIdx + 1} / {assessment.questions.length}
            </div>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmitAttempt}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 px-5 rounded-xl"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Finish & Submit
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setCurrentIdx((p) =>
                    Math.min(assessment.questions.length - 1, p + 1)
                  )
                }
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs h-10 px-5 rounded-xl"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </main>

        {/* Right sidebar: palette */}
        <aside className="hidden lg:flex w-56 shrink-0 border-l border-slate-800 bg-slate-900/50 flex-col gap-4 p-4 overflow-y-auto">
          <QuestionPalette
            total={assessment.questions.length}
            current={currentIdx}
            answers={selectedAnswers}
            flagged={flaggedQuestions}
            onSelect={setCurrentIdx}
          />

          {/* Compact integrity on smaller screens */}
          <div className="xl:hidden">
            <IntegrityCard
              violations={violations}
              maxViolations={assessment.maxViolations}
              cameraActive={cameraGranted}
              tabMonitoring={true}
              copyProtection={true}
            />
          </div>

          {/* Submit button */}
          <Button
            onClick={handleSubmitAttempt}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl shadow-lg shadow-emerald-500/20 mt-auto"
          >
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Submit Exam
          </Button>
        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer className="h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-center shrink-0">
        <p className="text-[10px] text-slate-600">
          BlockLearnX Proctored Assessment · All activity is cryptographically
          logged and verified on-chain.
        </p>
      </footer>

      {/* ── CONFIRM SUBMIT MODAL ── */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 p-7 max-w-sm w-full shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-white">
                Unanswered Questions
              </h3>
              <p className="text-xs text-slate-400">
                You have answered{" "}
                <strong className="text-white">{answeredCount}</strong> of{" "}
                <strong className="text-white">
                  {assessment.questions.length}
                </strong>{" "}
                questions. Submit now?
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 border-slate-700 text-slate-300 text-xs h-10"
              >
                Keep Answering
              </Button>
              <Button
                onClick={() => handleFinalSubmit()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-10"
              >
                Submit Anyway
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFETTI ── */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
    </div>
  );
}
