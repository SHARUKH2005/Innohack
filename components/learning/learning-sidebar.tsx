"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ArrowRight,
  PlayCircle,
  FileText,
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  BookOpen,
  Search,
  Check,
} from "lucide-react";
import { CourseCurriculum, LessonItem } from "@/lib/learning-data";

interface LearningSidebarProps {
  curriculum: CourseCurriculum;
  currentLessonId: string;
  completedLessonIds: string[];
  totalEarnedMX: number;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export function LearningSidebar({
  curriculum,
  currentLessonId,
  completedLessonIds,
  totalEarnedMX,
  isOpen,
  onCloseMobile,
}: LearningSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Track open state for each module
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    curriculum.modules.forEach((mod, idx) => {
      // Open all or open the module containing current lesson
      const hasCurrent = mod.lessons.some(
        (l) => l.id === currentLessonId || l.slug === currentLessonId
      );
      initial[mod.id] = hasCurrent || idx === 0;
    });
    return initial;
  });

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const allLessons = curriculum.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  const getTypeIcon = (type: LessonItem["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-3.5 w-3.5 shrink-0" />;
      case "lab":
        return <Code2 className="h-3.5 w-3.5 shrink-0" />;
      default:
        return <FileText className="h-3.5 w-3.5 shrink-0" />;
    }
  };

  return (
    <aside
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-80 sm:w-88 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* ── 1. SIDEBAR HEADER: Course Title & Back Button ── */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70">
        <Link
          href={`/courses/${curriculum.courseId}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0056D2] mb-3 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Course Overview</span>
        </Link>

        <div className="flex items-start gap-3">
          <span className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
            {curriculum.partnerLogo}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {curriculum.partner}
            </p>
            <h2 className="text-base font-black text-slate-900 leading-snug truncate">
              {curriculum.courseTitle}
            </h2>
          </div>
        </div>

        {/* ── 2. COURSE PROGRESS BAR ── */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Course Progress</span>
            <span className="text-[#0056D2]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0056D2] to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span>
              {completedCount} of {totalLessons} completed
            </span>
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {totalEarnedMX} MX Earned
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. SEARCH LESSONS FILTER ── */}
      <div className="p-3 border-b border-slate-100 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter lessons..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2]"
          />
        </div>
      </div>

      {/* ── 4. LESSONS LIST GROUPED BY MODULE ── */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {curriculum.modules.map((module) => {
          const filteredLessons = module.lessons.filter(
            (l) =>
              l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              module.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredLessons.length === 0) return null;

          const isModuleOpen = openModules[module.id] ?? true;
          const completedInModule = module.lessons.filter((l) =>
            completedLessonIds.includes(l.id) || completedLessonIds.includes(l.slug)
          ).length;

          return (
            <div key={module.id} className="bg-white">
              {/* Module Header Toggle */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {module.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {completedInModule}/{module.lessons.length} completed
                  </p>
                </div>
                <div className="text-slate-400 shrink-0">
                  {isModuleOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Lessons under this module */}
              {isModuleOpen && (
                <div className="divide-y divide-slate-50">
                  {filteredLessons.map((lesson) => {
                    const isCompleted =
                      completedLessonIds.includes(lesson.id) ||
                      completedLessonIds.includes(lesson.slug);
                    const isActive =
                      lesson.id === currentLessonId || lesson.slug === currentLessonId;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${curriculum.courseId}/${lesson.slug}`}
                        onClick={onCloseMobile}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                          isActive
                            ? "bg-blue-50/90 border-l-4 border-[#0056D2] text-[#0056D2]"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {/* Status Marker: ✓, →, or ○ */}
                        <div className="pt-0.5 shrink-0">
                          {isCompleted ? (
                            <span
                              className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shadow-xs"
                              title="Completed"
                            >
                              ✓
                            </span>
                          ) : isActive ? (
                            <span
                              className="w-5 h-5 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-black text-xs shadow-xs"
                              title="Current Lesson"
                            >
                              →
                            </span>
                          ) : (
                            <span
                              className="w-5 h-5 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs"
                              title="Upcoming Lesson"
                            >
                              ○
                            </span>
                          )}
                        </div>

                        {/* Title and metadata */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs leading-snug ${
                              isActive
                                ? "font-bold text-[#0056D2]"
                                : isCompleted
                                ? "font-medium text-slate-800"
                                : "text-slate-600"
                            }`}
                          >
                            {lesson.lessonIndex}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              {getTypeIcon(lesson.type)}
                              <span>{lesson.duration}</span>
                            </span>
                            <span>•</span>
                            <span className="text-amber-600 font-medium">
                              +{lesson.bountyMX} MX
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 5. SIDEBAR FOOTER: Soulbound NFT Credential status ── */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs">
        <div className="flex items-center gap-2.5">
          <Award className="h-5 w-5 text-purple-600 shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-slate-900 truncate">{curriculum.nftName}</p>
            <p className="text-[10px] text-slate-500">ERC-5192 Soulbound Degree</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
