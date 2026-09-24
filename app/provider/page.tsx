"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen, Users, Star, TrendingUp, PlusCircle, BarChart3,
  DollarSign, Eye, EyeOff, Edit, ArrowRight, AlertCircle,
  Loader2, CheckCircle2, Clock, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  price_mx: number;
  thumbnail_url: string | null;
  created_at: string;
  enrollments?: { count: number }[];
}

interface ProviderStats {
  totalStudents: number;
  totalRevenueMx: number;
  publishedCourses: number;
  draftCourses: number;
}

const GRADIENT_MAP: Record<number, string> = {
  0: "from-violet-500 to-purple-600",
  1: "from-blue-500 to-indigo-600",
  2: "from-emerald-500 to-teal-600",
  3: "from-rose-500 to-pink-600",
  4: "from-amber-500 to-orange-600",
  5: "from-cyan-500 to-sky-600",
};

export default function ProviderDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<ProviderStats>({
    totalStudents: 0,
    totalRevenueMx: 0,
    publishedCourses: 0,
    draftCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerName, setProviderName] = useState("Provider");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("name, full_name")
          .eq("id", user.id)
          .single();
        if (profile) {
          setProviderName(
            (profile as { name?: string; full_name?: string }).name ||
            (profile as { name?: string; full_name?: string }).full_name ||
            user.email?.split("@")[0] || "Provider"
          );
        }
      } else {
        setProviderName("Demo Provider");
      }

      let query = supabase
        .from("courses")
        .select(`id, title, description, status, price_mx, thumbnail_url, created_at, enrollments(count)`)
        .order("created_at", { ascending: false });

      if (user) query = query.eq("provider_id", user.id);

      const { data: courseData, error: courseError } = await query;

      if (courseError) {
        setCourses([]);
        setStats({ totalStudents: 0, totalRevenueMx: 0, publishedCourses: 0, draftCourses: 0 });
      } else {
        const arr = (courseData || []) as Course[];
        setCourses(arr);
        let totalStudents = 0, totalRevenueMx = 0, publishedCourses = 0, draftCourses = 0;
        for (const c of arr) {
          const n = (c.enrollments?.[0] as { count?: number })?.count || 0;
          totalStudents += n;
          if (c.status === "published") { totalRevenueMx += n * (c.price_mx || 0); publishedCourses++; }
          if (c.status === "draft") draftCourses++;
        }
        setStats({ totalStudents, totalRevenueMx, publishedCourses, draftCourses });
      }
    } catch {
      setError("Unable to connect to the database. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const statCards = [
    {
      label: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      sub: "Enrolled across all courses",
      icon: <Users className="h-6 w-6" />,
      iconBg: "bg-blue-50 border-blue-200 text-blue-600",
    },
    {
      label: "Revenue (MX)",
      value: stats.totalRevenueMx.toLocaleString(),
      sub: "Total MX tokens earned",
      icon: <DollarSign className="h-6 w-6" />,
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    },
    {
      label: "Published Courses",
      value: stats.publishedCourses.toString(),
      sub: `${stats.draftCourses} draft${stats.draftCourses !== 1 ? "s" : ""} pending`,
      icon: <BookOpen className="h-6 w-6" />,
      iconBg: "bg-violet-50 border-violet-200 text-violet-600",
    },
    {
      label: "Avg. Rating",
      value: "N/A",
      sub: "Across all published courses",
      icon: <Star className="h-6 w-6" />,
      iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 pb-20">

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                  Provider Portal
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  • Course Management Dashboard
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Welcome, {providerName}
              </h1>
              <p className="text-slate-600 text-sm max-w-xl">
                Manage your courses, track student enrollment, and grow your teaching impact on BlockLearnX.
              </p>
            </div>
            <Link href="/provider/courses/create">
              <Button className="gap-2 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold shadow-sm">
                <PlusCircle className="h-4 w-4" /> Create New Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 pt-10 space-y-10">

        {/* ── Error ───────────────────────────────────────────── */}
        {error && (
          <div className="bg-white rounded-xl border border-red-200 p-5 flex items-start gap-3 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-bold">Could not load dashboard data</p>
              <p className="text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* ── Stats ───────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {loading
                    ? <span className="inline-block h-7 w-20 bg-slate-100 rounded animate-pulse" />
                    : s.value}
                </div>
                <p className="text-xs text-slate-500">{s.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${s.iconBg}`}>
                {s.icon}
              </div>
            </div>
          ))}
        </section>

        {/* ── Courses ─────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Courses</h2>
              <p className="text-xs text-slate-500 mt-0.5">All courses you have created on BlockLearnX.</p>
            </div>
            <Link href="/provider/courses">
              <Button variant="outline" size="sm" className="text-xs font-bold text-[#0056D2] border-[#0056D2]/30 hover:bg-blue-50">
                View All →
              </Button>
            </Link>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              <span className="ml-3 text-slate-500 text-sm">Loading your courses…</span>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#0056D2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No courses yet</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
                Create your first course and start sharing your knowledge with learners on BlockLearnX.
              </p>
              <Link href="/provider/courses/create">
                <Button className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold gap-2">
                  <PlusCircle className="h-4 w-4" /> Create Your First Course
                </Button>
              </Link>
            </div>
          )}

          {!loading && courses.length > 0 && (
            <div className="space-y-4">
              {courses.map((c, idx) => {
                const enrollCount = (c.enrollments?.[0] as { count?: number })?.count || 0;
                const gradient = GRADIENT_MAP[idx % 6];
                return (
                  <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
                    {/* Strip */}
                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <span>📚</span>
                        <span>BlockLearnX Course</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">
                          Created {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        c.status === "published" ? "bg-emerald-100 text-emerald-800"
                        : c.status === "archived" ? "bg-slate-100 text-slate-600"
                        : "bg-amber-100 text-amber-800"
                      }`}>
                        {c.status === "published" ? <><Eye className="h-3 w-3 inline mr-1" />Published</>
                        : c.status === "archived" ? <><EyeOff className="h-3 w-3 inline mr-1" />Archived</>
                        : <><Clock className="h-3 w-3 inline mr-1" />Draft</>}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex items-center gap-5">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                        <BookOpen className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                        {c.description && (
                          <p className="text-xs text-slate-500 line-clamp-1">{c.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1 font-medium">
                            <Users className="h-3.5 w-3.5" />
                            {enrollCount.toLocaleString()} student{enrollCount !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                            {c.price_mx > 0 ? `${c.price_mx} MX` : "Free"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Link href={`/provider/courses/${c.id}/assessments`}>
                          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold border-slate-300 hover:bg-slate-50">
                            <BarChart3 className="h-3.5 w-3.5" /> Assessments
                          </Button>
                        </Link>
                        <Link href={`/provider/courses/${c.id}/edit`}>
                          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold border-slate-300 hover:bg-slate-50">
                            <Edit className="h-3.5 w-3.5" /> Edit
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {c.status === "published" ? `${enrollCount} learners enrolled` : "Not yet visible to learners"}
                      </span>
                      <Link href={`/provider/courses/${c.id}/edit`} className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1">
                        Manage Course <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Quick Actions ───────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <PlusCircle className="h-6 w-6" />, title: "Create a Course", desc: "Build and publish a new course for BlockLearnX learners.", href: "/provider/courses/create", iconBg: "bg-blue-50 border-blue-200 text-[#0056D2]" },
              { icon: <GraduationCap className="h-6 w-6" />, title: "Manage Assessments", desc: "Add quizzes and assignments to evaluate student progress.", href: "/provider/courses", iconBg: "bg-violet-50 border-violet-200 text-violet-600" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "View Analytics", desc: "Track enrollment trends and student performance.", href: "/provider/courses", iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600" },
            ].map((action) => (
              <Link key={action.title} href={action.href}>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3 group cursor-pointer h-full">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${action.iconBg} group-hover:scale-105 transition-transform`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0056D2] transition-colors">{action.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{action.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Provider Tips ───────────────────────────────────── */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">BlockLearnX Provider Guide</span>
          </div>
          <h3 className="text-lg font-bold">Maximize your course reach and earnings</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Add detailed descriptions, structured lessons, and comprehensive assessments to increase enrollment.
            Published courses with MX token pricing are discoverable by all BlockLearnX learners globally.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/provider/courses/create">
              <Button className="bg-white text-[#0056D2] hover:bg-slate-100 font-bold text-xs gap-2">
                <PlusCircle className="h-4 w-4" /> Create Course
              </Button>
            </Link>
            <Link href="/provider/courses">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-xs gap-2">
                <BookOpen className="h-4 w-4" /> View All Courses
              </Button>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
