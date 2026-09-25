"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  BookOpen, 
  Coins, 
  Sparkles, 
  Award, 
  Filter, 
  CheckCircle2, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  EXPLORE_COURSES, 
  COURSE_CATEGORIES, 
  CourseCategory, 
  CourseItem 
} from "@/lib/courses-data";
import { ExploreCourseCard } from "@/components/courses/explore-course-card";
import { CourseDetailModal } from "@/components/courses/course-detail-modal";
import Link from "next/link";

export default function ExploreCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>("All");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter courses based on Category and Search Query
  const filteredCourses = useMemo(() => {
    return EXPLORE_COURSES.filter((course) => {
      // Category filter
      const matchesCategory = 
        selectedCategory === "All" || course.category === selectedCategory;

      // Search query filter (title, description, skills, instructor)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.skills.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 pb-20">
      
      {/* ========================================================
          1. HEADER SECTION
          ======================================================== */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-12 shadow-xs">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="h-3.5 w-3.5" />
                Verified Web3 Curriculum
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Explore Courses
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Discover courses, build skills, and earn MX rewards.
              </p>
            </div>

            {/* Quick Balance & Learner Passport Card */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 font-bold text-xl">
                <Coins className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Available Learner Balance
                </span>
                <p className="text-lg font-black font-mono text-slate-900">
                  2,450 <span className="text-xs font-bold text-amber-600">MX</span>
                </p>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Up to +220 MX available per course
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. SEARCH & CATEGORIES CONTROLS BAR
          ======================================================== */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs py-4">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input: 🔍 Search courses... */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search courses..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2] focus:bg-white focus:ring-2 focus:ring-[#0056D2]/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Showing <strong>{filteredCourses.length}</strong> of {EXPLORE_COURSES.length} courses</span>
            </div>

          </div>

          {/* Categories Pill Bar:
              All | Blockchain | Web3 | AI & ML | Smart Contracts | Development */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {COURSE_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#0056D2] text-white shadow-sm shadow-[#0056D2]/30 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                  }`}
                >
                  {category === "All" && "✦"}
                  {category === "Blockchain" && "⚡"}
                  {category === "Web3" && "🌐"}
                  {category === "AI & ML" && "🤖"}
                  {category === "Smart Contracts" && "📜"}
                  {category === "Development" && "💻"}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. COURSE CARDS GRID
          ======================================================== */}
      <main className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8">
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <ExploreCourseCard
                key={course.id}
                course={course}
                onViewCourse={handleOpenCourse}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm my-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-black text-slate-900">
              No matching courses found
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We couldn&apos;t find any course matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try another keyword or switch category.
            </p>
            <Button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              variant="outline"
              className="text-xs font-bold border-slate-300 h-10 px-5"
            >
              Reset Filters
            </Button>
          </div>
        )}

      </main>

      {/* ========================================================
          4. INTERACTIVE COURSE DETAIL MODAL
          ======================================================== */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />

    </div>
  );
}
