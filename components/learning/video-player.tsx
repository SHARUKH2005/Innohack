"use client";

import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  CheckCircle,
  Clock,
  Sparkles,
  Tv,
} from "lucide-react";
import { LessonItem } from "@/lib/learning-data";

interface VideoPlayerProps {
  lesson: LessonItem;
  onLessonCompletePrompt?: () => void;
  isCompleted?: boolean;
}

export function VideoPlayer({ lesson, onLessonCompletePrompt, isCompleted }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [watchedPercent, setWatchedPercent] = useState(0);

  const speeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
        isTheater ? "max-w-none" : "max-w-5xl mx-auto"
      }`}
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full pb-[56.25%] bg-black">
        {/* Real Embedded YouTube Video Player */}
        <iframe
          src={`${lesson.videoUrl}${lesson.videoUrl.includes("?") ? "&" : "?"}enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />

        {/* Video watermark / header overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-semibold shadow-md pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="truncate max-w-[200px] sm:max-w-md">{lesson.title}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
              1080p HD
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/90 text-white text-xs font-bold shadow-sm">
                <CheckCircle className="h-3.5 w-3.5" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sleek bottom control toolbar */}
      <div className="bg-slate-900/95 border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-300 text-xs">
        
        {/* Left: Duration and Type */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-4 w-4 text-[#0056D2]" />
            <span className="font-semibold">{lesson.duration}</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-medium">{lesson.moduleTitle}</span>
        </div>

        {/* Right: Controls & Speed */}
        <div className="flex items-center gap-3">
          {/* Speed Selector */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
              title="Playback Speed"
            >
              <span>{playbackSpeed}x</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 z-30 flex flex-col gap-0.5 min-w-[70px]">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setPlaybackSpeed(s);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-3 py-1 text-left rounded text-xs font-semibold transition-colors ${
                      playbackSpeed === s
                        ? "bg-[#0056D2] text-white"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theater Mode Toggle */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${
              isTheater ? "text-[#0056D2]" : "text-slate-400 hover:text-white"
            }`}
            title={isTheater ? "Normal View" : "Theater View"}
          >
            <Tv className="h-4 w-4" />
          </button>

          {/* Reward Bounty Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>+{lesson.bountyMX} MX Reward</span>
          </div>
        </div>

      </div>
    </div>
  );
}
