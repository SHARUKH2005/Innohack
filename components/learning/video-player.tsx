"use client";

import { useState, useRef, useEffect } from "react";
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

const speeds = [0.75, 1, 1.25, 1.5, 2];

interface VideoPlayerProps {
  lesson: LessonItem;
  onLessonCompletePrompt?: () => void;
  onVideoEnded?: () => void;
  isCompleted?: boolean;
}

export function VideoPlayer({ lesson, onLessonCompletePrompt, onVideoEnded, isCompleted }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [hasEnded, setHasEnded] = useState(!!isCompleted);

  // YouTube API listener for video completion
  useEffect(() => {
    if (isCompleted) {
      setHasEnded(true);
      return;
    }

    setHasEnded(false);

    // Message listener for postMessage events from YouTube iframe
    const handleMessage = (event: MessageEvent) => {
      try {
        let data = event.data;
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
            // Not a JSON string
          }
        }

        if (!data) return;

        // Check for YouTube state change to ENDED (0) or progress reaching 95%+ / end time across all payload formats
        const isEndedState =
          (data.event === "onStateChange" && data.info === 0) ||
          (data.event === "infoDelivery" && data.info && data.info.playerState === 0) ||
          (data.info && data.info.playerState === 0) ||
          (data.playerState === 0) ||
          (data.state === 0) ||
          (data.info &&
            typeof data.info.currentTime === "number" &&
            typeof data.info.duration === "number" &&
            data.info.duration > 0 &&
            (data.info.currentTime >= data.info.duration - 45 || data.info.currentTime / data.info.duration >= 0.95));

        if (isEndedState) {
          console.log("🎥 YouTube Video ENDED / 95%+ watched event detected for lesson:", lesson.title);
          setHasEnded(true);
          if (onVideoEnded) onVideoEnded();
        }
      } catch (e) {
        // ignore errors
      }
    };

    window.addEventListener("message", handleMessage);

    // Send listening handshake to YouTube iframe so it posts events back
    const timer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
            "*"
          );
        } catch (e) {
          // ignore
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timer);
    };
  }, [lesson.id, isCompleted, onVideoEnded]);

  const handleSimulateEnded = () => {
    console.log("🎥 Manual Finish Video triggered for lesson:", lesson.title);
    setHasEnded(true);
    if (onVideoEnded) onVideoEnded();
  };

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
          ref={iframeRef}
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
            {(hasEnded || isCompleted) ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/90 text-white text-xs font-bold shadow-sm">
                <CheckCircle className="h-3.5 w-3.5" />
                Video Finished
              </span>
            ) : (
              <button
                onClick={handleSimulateEnded}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm transition-colors cursor-pointer"
                title="Click to finish watching video & unlock next lesson"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Finish Video
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sleek bottom control toolbar */}
      <div className="bg-slate-900/95 border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-300 text-xs">
        
        {/* Left: Duration, Type, and Quick Finish Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-4 w-4 text-[#0056D2]" />
            <span className="font-semibold">{lesson.duration}</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-medium">{lesson.moduleTitle}</span>

          {!(hasEnded || isCompleted) && (
            <button
              onClick={handleSimulateEnded}
              className="ml-2 px-3 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Finish Video &amp; Unlock Next</span>
            </button>
          )}
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
