"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Clock, BookOpen, Star, Search, Filter, CheckCircle, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ENROLLED = [
  {
    id: "react-101",
    title: "React Fundamentals",
    description: "Master React hooks, components, and modern patterns",
    category: "Frontend",
    progress: 68,
    totalLessons: 24,
    completedLessons: 16,
    totalHours: 12.5,
    gradient: "from-blue-500 to-indigo-600",
    lastLesson: "useEffect Deep Dive",
    rating: 4.8,
    status: "in-progress",
  },
  {
    id: "node-backend",
    title: "Node.js & Express Backend",
    description: "Build scalable REST APIs with Node.js, Express, and PostgreSQL",
    category: "Backend",
    progress: 42,
    totalLessons: 30,
    completedLessons: 13,
    totalHours: 18,
    gradient: "from-emerald-500 to-teal-600",
    lastLesson: "Middleware Patterns",
    rating: 4.7,
    status: "in-progress",
  },
  {
    id: "solidity-101",
    title: "Solidity Smart Contracts",
    description: "Write, test, and deploy ERC-20 & ERC-721 contracts",
    category: "Blockchain",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    totalHours: 14,
    gradient: "from-violet-500 to-purple-600",
    lastLesson: "NFT Marketplace Deployment",
    rating: 4.9,
    status: "completed",
    certificateMinted: true,
  },
  {
    id: "css-animations",
    title: "CSS Animations & Motion Design",
    description: "Create stunning UI animations with CSS and Framer Motion",
    category: "Design",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    totalHours: 8,
    gradient: "from-pink-500 to-rose-600",
    lastLesson: null,
    rating: 4.6,
    status: "not-started",
  },
];

export default function MyCoursesPage() {
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed" | "not-started">("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_ENROLLED.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: MOCK_ENROLLED.length,
    inProgress: MOCK_ENROLLED.filter((c) => c.status === "in-progress").length,
    completed: MOCK_ENROLLED.filter((c) => c.status === "completed").length,
    avgProgress: Math.round(MOCK_ENROLLED.reduce((s, c) => s + c.progress, 0) / MOCK_ENROLLED.length),
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-1">Continue learning where you left off</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Enrolled", value: stats.total, color: "text-blue-500" },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-500" },
          { label: "Completed", value: stats.completed, color: "text-emerald-500" },
          { label: "Avg Progress", value: `${stats.avgProgress}%`, color: "text-violet-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "in-progress", "completed", "not-started"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {f === "not-started" ? "Not Started" : f === "in-progress" ? "In Progress" : f === "all" ? "All" : "Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group">
            {/* Color banner */}
            <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                </div>
                {course.status === "completed" && (
                  <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 ml-2" />
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${course.gradient} rounded-full transition-all`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {course.totalHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400" /> {course.rating}
                  </span>
                </div>
                <Link href={`/learn/${course.id}`}>
                  <Button size="sm" variant={course.status === "completed" ? "outline" : "default"} className="gap-1.5">
                    {course.status === "completed" ? (
                      <>Review <BookOpen className="h-3.5 w-3.5" /></>
                    ) : course.status === "not-started" ? (
                      <>Start <ArrowRight className="h-3.5 w-3.5" /></>
                    ) : (
                      <>Continue <Play className="h-3.5 w-3.5" /></>
                    )}
                  </Button>
                </Link>
              </div>

              {course.lastLesson && course.status !== "completed" && (
                <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  Last: <span className="text-foreground font-medium">{course.lastLesson}</span>
                </div>
              )}
              {course.certificateMinted && (
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Certificate NFT minted on-chain
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground text-sm mt-1">Try a different filter or browse the catalog</p>
          <Link href="/browse"><Button className="mt-4">Browse Courses</Button></Link>
        </div>
      )}
    </main>
  );
}
