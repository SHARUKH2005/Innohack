"use client";

import Link from "next/link";
import Image from "next/image";
import { CourseItem } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Clock, Coins, Sparkles, Star, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ExploreCourseCardProps {
  course: CourseItem;
  onViewCourse?: (course: CourseItem) => void;
}

export function ExploreCourseCard({ course }: ExploreCourseCardProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#0056D2]/40 hover:-translate-y-1">

      {/* ── REAL PHOTO THUMBNAIL ── */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm">
            {course.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${levelColors[course.level]} bg-opacity-90`}>
            {course.level}
          </span>
        </div>

        {/* Bottom partner + rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-white text-xs font-semibold drop-shadow">
            <span>{course.partnerLogo}</span>
            <span className="truncate max-w-[120px]">{course.partner}</span>
          </span>
          <span className="flex items-center gap-1 text-amber-300 text-xs font-bold drop-shadow">
            <Star className="h-3.5 w-3.5 fill-current" />
            {course.rating}
          </span>
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div className="p-5 flex-1 flex flex-col gap-3">

        {/* Title + description */}
        <div>
          <h3 className="font-black text-base text-slate-900 group-hover:text-[#0056D2] transition-colors leading-snug mb-1">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor + Duration */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium truncate mr-2">{course.instructor}</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {course.duration}
          </span>
        </div>

        {/* Price & Reward */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</p>
            <p className="text-sm font-black text-slate-900 flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-slate-400" />
              {course.price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-0.5">Reward</p>
            <p className="text-sm font-black text-amber-600 flex items-center justify-end gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {course.reward}
            </p>
          </div>
        </div>

        {/* ── DROPDOWN BUTTON ── */}
        <div ref={dropRef} className="relative mt-auto">
          <div className="flex rounded-xl overflow-hidden shadow-sm border border-[#0056D2]">
            {/* Main action */}
            <Button
              asChild
              className="flex-1 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-10 rounded-none rounded-l-xl border-0"
            >
              <Link href={`/courses/${course.id}`} className="flex items-center justify-center gap-1.5">
                <span>View Course</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            {/* Chevron toggle */}
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="w-10 bg-[#0056D2] hover:bg-[#00419e] text-white border-l border-white/20 flex items-center justify-center rounded-r-xl transition-colors"
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Dropdown menu */}
          {dropOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-30">
              <Link
                href={`/courses/${course.id}`}
                onClick={() => setDropOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0056D2] transition-colors"
              >
                <span className="text-base">📖</span>
                View Full Details
              </Link>
              <Link
                href={`/courses/${course.id}#enroll`}
                onClick={() => setDropOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0056D2] transition-colors"
              >
                <span className="text-base">⚡</span>
                Enroll Now
              </Link>
              <Link
                href={`/courses/${course.id}`}
                onClick={() => setDropOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0056D2] transition-colors"
              >
                <span className="text-base">👁️</span>
                Preview Free Lessons
              </Link>
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold text-amber-700">Earn {course.reward} on completion</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
