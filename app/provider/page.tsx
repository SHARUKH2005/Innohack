import Link from "next/link";
import {
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  FilePlus2,
  GraduationCap,
  Plus,
  Users,
} from "lucide-react";

import { ProviderDashboardShell } from "./shell";
import { createClient } from "@/lib/supabase/server";

type Course = {
  id: string | number;
  title: string;
  status: string | null;
};

type Enrollment = {
  id: string | number;
  course_id: string | number;
  user_id: string | number;
  enrolled_at: string | null;
};

type Activity = {
  id: string;
  name: string;
  course: string;
  label: string;
  timestamp: string | null;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatRelativeTime(value: string | null) {
  if (!value) return "Time unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Time unavailable";
  const minutes = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

function statusLabel(status: string | null) {
  return status?.toLowerCase() === "published" ? "Published" : "Draft";
}

export default async function ProviderPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const providerId = user?.id ?? "";
  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .select("id, title, status")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });
  const courses = (courseData ?? []) as Course[];
  const courseIds = courses.map((course) => course.id);

  const [{ data: enrollmentData, error: enrollmentError }, { data: assessmentData, error: assessmentError }, { data: progressData, error: progressError }] =
    await Promise.all([
      courseIds.length
        ? supabase.from("enrollments").select("id, course_id, user_id, enrolled_at").in("course_id", courseIds)
        : Promise.resolve({ data: [], error: null }),
      courseIds.length
        ? supabase.from("assessments").select("id, course_id").in("course_id", courseIds)
        : Promise.resolve({ data: [], error: null }),
      courseIds.length
        ? supabase.from("progress").select("id, course_id, user_id, last_updated").in("course_id", courseIds).order("last_updated", { ascending: false }).limit(8)
        : Promise.resolve({ data: [], error: null }),
    ]);

  const enrollments = (enrollmentData ?? []) as Enrollment[];
  const assessments = (assessmentData ?? []) as Array<{ id: string | number; course_id: string | number }>;
  const progress = (progressData ?? []) as Array<{ id: string | number; course_id: string | number; user_id: string | number; last_updated: string | null }>;
  const studentIds = [...new Set([...enrollments.map((row) => row.user_id), ...progress.map((row) => row.user_id)])];
  const { data: studentData } = studentIds.length
    ? await supabase.from("users").select("id, name").in("id", studentIds)
    : { data: [] };
  const students = new Map((studentData ?? []).map((student) => [String(student.id), student.name || "Learner"]));
  const courseNames = new Map(courses.map((course) => [String(course.id), course.title]));

  const recentActivity: Activity[] = [
    ...enrollments.slice().sort((a, b) => new Date(b.enrolled_at ?? 0).getTime() - new Date(a.enrolled_at ?? 0).getTime()).slice(0, 5).map((row) => ({
      id: `enrollment-${row.id}`,
      name: students.get(String(row.user_id)) ?? "Learner",
      course: courseNames.get(String(row.course_id)) ?? "Your course",
      label: "Enrolled in course",
      timestamp: row.enrolled_at,
    })),
    ...progress.slice(0, 5).map((row) => ({
      id: `progress-${row.id}`,
      name: students.get(String(row.user_id)) ?? "Learner",
      course: courseNames.get(String(row.course_id)) ?? "Your course",
      label: "Updated course progress",
      timestamp: row.last_updated,
    })),
  ].sort((a, b) => new Date(b.timestamp ?? 0).getTime() - new Date(a.timestamp ?? 0).getTime()).slice(0, 6);

  const publishedCount = courses.filter((course) => statusLabel(course.status) === "Published").length;
  const draftCount = courses.length - publishedCount;
  const uniqueStudents = new Set(enrollments.map((row) => String(row.user_id))).size;
  const queryFailed = [courseError, enrollmentError, assessmentError, progressError].some(Boolean);

  return (
    <ProviderDashboardShell>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0056D2]">Course Provider</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Provider Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Manage your courses, learners, and assessments.</p>
          </div>
          <Link href="/provider#create-course" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0056D2] px-4 py-3 text-sm font-bold text-white hover:bg-[#00419e]">
            <Plus className="h-4 w-4" /> Create Course
          </Link>
        </section>

        {queryFailed && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Some provider data could not be loaded. Values shown are limited to records available for this account.
          </div>
        )}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <Stat label="Students" value={uniqueStudents} icon={Users} />
          <Stat label="Courses" value={courses.length} icon={BookOpen} />
          <Stat label="Published" value={publishedCount} icon={CheckCircle2} />
          <Stat label="Drafts" value={draftCount} icon={FilePlus2} />
          <Stat label="Enrollments" value={enrollments.length} icon={GraduationCap} />
          <Stat label="Assessments" value={assessments.length} icon={ClipboardList} />
        </section>

        <section id="courses" className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Courses</p><h2 className="mt-1 text-xl font-bold text-slate-900">Your Courses</h2></div>
            <Link href="/provider#create-course" className="text-sm font-bold text-[#0056D2]">Create course</Link>
          </div>
          {courses.length === 0 ? (
            <EmptyState text="No courses belong to this provider yet." href="#create-course" action="Create your first course" />
          ) : (
            <div className="space-y-3">
              {courses.map((course) => {
                const courseEnrollments = enrollments.filter((row) => String(row.course_id) === String(course.id)).length;
                const courseAssessments = assessments.filter((row) => String(row.course_id) === String(course.id)).length;
                return (
                  <div key={String(course.id)} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{course.title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{courseEnrollments} enrollments · {courseAssessments} assessments</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusLabel(course.status) === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{statusLabel(course.status)}</span>
                      <Link href={`/provider#assessments-${course.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Assessments</Link>
                      <Link href={`/provider#course-${course.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Edit</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <article id="students" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><Users className="h-5 w-5 text-[#0056D2]" /><div><h2 className="font-bold text-slate-900">Recent Learner Activity</h2><p className="text-xs text-slate-500">Only learners enrolled in your courses</p></div></div>
            {recentActivity.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No learner activity has been recorded yet.</p> : <div className="space-y-3">{recentActivity.map((item) => <div key={item.id} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0056D2]" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900">{item.name}</p><p className="text-xs text-slate-500">{item.label} · {item.course}</p></div><time className="shrink-0 text-xs text-slate-400">{formatRelativeTime(item.timestamp)}</time></div>)}</div>}
          </article>

          <article id="assessments" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div id="questions" />
            <div id="ai-criteria" />
            <div id="results" />
            <div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Assessments</h2><p className="text-xs text-slate-500">Assessments attached to your courses</p></div><ClipboardList className="h-5 w-5 text-[#0056D2]" /></div>
            {assessments.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No assessments have been created yet.</p> : <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{assessments.length} assessments are available across your courses.</div>}
          </article>
        </section>

        <section id="create-course" className="mb-8 rounded-2xl border border-dashed border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Courses</p><h2 className="mt-1 text-xl font-bold text-slate-900">Create a course</h2><p className="mt-1 text-sm text-slate-500">Course creation and publishing will save records under your provider account.</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0056D2] px-4 py-3 text-sm font-bold text-[#0056D2]"><Plus className="h-4 w-4" /> Start course draft</button></div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <UnavailablePanel id="certificates" title="Certificates" icon={Award} text="Certificate records and issuance requests will appear here when connected." />
          <UnavailablePanel id="nft-requests" title="Achievement requests" icon={Award} text="Submit achievement proposals for platform approval when this workflow is available." />
          <UnavailablePanel id="earnings" title="Earnings" icon={CircleDollarSign} text="Provider revenue and transactions are not stored in the current database schema." />
        </section>
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <UnavailablePanel id="transactions" title="Transactions" icon={CircleDollarSign} text="Provider transaction records will appear when course sales and payouts are stored." />
          <UnavailablePanel id="profile" title="Profile and settings" icon={Users} text="Provider profile controls will appear here without exposing platform-wide settings." />
        </section>
      </main>
    </ProviderDashboardShell>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Users }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><Icon className="h-4 w-4 text-[#0056D2]" /></div><p className="mt-4 text-3xl font-black text-slate-900">{formatNumber(value)}</p></article>;
}

function EmptyState({ text, href, action }: { text: string; href: string; action: string }) {
  return <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">{text} <Link href={href} className="font-bold text-[#0056D2]">{action}</Link>.</div>;
}

function UnavailablePanel({ id, title, icon: Icon, text }: { id: string; title: string; icon: typeof Award; text: string }) {
  return <article id={id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-slate-400" /><h2 className="mt-3 font-bold text-slate-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p></article>;
}
