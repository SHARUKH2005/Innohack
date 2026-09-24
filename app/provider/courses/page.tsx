"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen, Plus, Edit, BarChart3, Users, Eye, EyeOff,
  Clock, AlertCircle, Loader2, DollarSign, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  price_mx: number;
  created_at: string;
  enrollments?: { count: number }[];
}

const GRADIENT_MAP: Record<number, string> = {
  0: "from-violet-500 to-purple-600",
  1: "from-blue-500 to-indigo-600",
  2: "from-emerald-500 to-teal-600",
  3: "from-rose-500 to-pink-600",
  4: "from-amber-500 to-orange-600",
  5: "from-cyan-500 to-sky-600",
};

export default function ProviderCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      let query = supabase
        .from("courses")
        .select(`id, title, description, status, price_mx, created_at, enrollments(count)`)
        .order("created_at", { ascending: false });

      if (user) query = query.eq("provider_id", user.id);

      const { data, error: err } = await query;
      if (err) {
        setCourses([]);
      } else {
        setCourses((data || []) as Course[]);
      }
    } catch {
      setError("Unable to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 pb-20">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                  Provider Portal
                </span>
                <span className="text-xs text-slate-500 font-medium">• My Courses</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Courses</h1>
              <p className="text-slate-600 text-sm">Manage and update your full course library on BlockLearnX.</p>
            </div>
            <Link href="/provider/courses/create">
              <Button className="gap-2 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold shadow-sm">
                <Plus className="h-4 w-4" /> New Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 pt-10 space-y-6">

        {/* Error */}
        {error && (
          <div className="bg-white rounded-xl border border-red-200 p-5 flex items-start gap-3 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-bold">Failed to load courses</p>
              <p className="text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            <span className="ml-3 text-slate-500 text-sm">Loading courses…</span>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && courses.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-[#0056D2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No courses yet</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
              Start by creating your first course. It will appear here once created.
            </p>
            <Link href="/provider/courses/create">
              <Button className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold gap-2">
                <Plus className="h-4 w-4" /> Create Your First Course
              </Button>
            </Link>
          </div>
        )}

        {/* Courses List */}
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
                      <span className="text-slate-500 font-normal">
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
                      {c.status === "published"
                        ? `${enrollCount} learners currently enrolled`
                        : "Not yet visible to learners"}
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
      </main>
    </div>
  );
}
