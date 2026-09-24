"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface QuizTimerProps {
  initialMinutes: number;
  onTimeExpired: () => void;
  isPaused?: boolean;
}

export function QuizTimer({ initialMinutes, onTimeExpired, isPaused = false }: QuizTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);

  useEffect(() => {
    if (isPaused) return;

    if (secondsRemaining <= 0) {
      onTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, isPaused, onTimeExpired]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isUrgent = secondsRemaining < 180; // under 3 minutes
  const isCritical = secondsRemaining < 60; // under 1 minute

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all border ${
        isCritical
          ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
          : isUrgent
          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
          : "bg-slate-800 text-slate-200 border-slate-700"
      }`}
      title="Remaining Time"
    >
      {isUrgent ? (
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
      ) : (
        <Clock className="h-4 w-4 text-[#0056D2] shrink-0" />
      )}
      <span>{formattedTime}</span>
    </div>
  );
}
