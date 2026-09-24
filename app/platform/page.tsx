import { createClient } from "@/lib/supabase/server";
import { BarChart3, BookOpen, Coins, GraduationCap, HeartHandshake, Image as ImageIcon, ListChecks, Users } from "lucide-react";
import { PlatformDashboardShell } from "./shell";

type Activity = {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
};

type QueryState<T> = {
  value: T;
  error?: string;
};

async function countRows(
  table: string,
  filter?: { column: string; value: string },
): Promise<QueryState<number>> {
  const supabase = createClient();
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = query.eq(filter.column, filter.value);
  const { count, error } = await query;
  return error
    ? { value: 0, error: `${table}: ${error.message}` }
    : { value: count ?? 0 };
}

async function sumColumn(table: string, column: string): Promise<QueryState<number>> {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).select(column);
  if (error) return { value: 0, error: `${table}: ${error.message}` };
  const rows = (data ?? []) as unknown as Array<Record<string, unknown>>;
  const total = rows.reduce((sum, row) => sum + Number(row[column] ?? 0), 0);
  return { value: total };
}

async function recentActivity(): Promise<QueryState<Activity[]>> {
  const supabase = createClient();
  const sources = [
    { table: "users", timestamp: "created_at", label: "New user registered", detail: "A learner joined BlockLearnX." },
    { table: "enrollments", timestamp: "enrolled_at", label: "Course enrollment created", detail: "A learner enrolled in a course." },
    { table: "assessments", timestamp: "created_at", label: "Assessment created", detail: "A course assessment was added." },
    { table: "rewards", timestamp: "granted_at", label: "MX reward recorded", detail: "A reward record was added." },
    { table: "certificates", timestamp: "issued_at", label: "Certificate issued", detail: "A learning certificate was issued." },
    { table: "nfts", timestamp: "minted_at", label: "NFT record created", detail: "An NFT record was added." },
    { table: "donations", timestamp: "donated_at", label: "Donation received", detail: "A community donation was recorded." },
  ];

  const results = await Promise.all(
    sources.map(async (source) => {
      const { data, error } = await supabase
        .from(source.table)
        .select("*")
        .order(source.timestamp, { ascending: false })
        .limit(3);
      return { source, data: data as unknown as Array<Record<string, unknown>> | null, error };
    }),
  );
  const errors = results.filter((result) => result.error).map((result) => `${result.source.table}: ${result.error?.message}`);
  const activity = results.flatMap((result) =>
    (result.data ?? []).map((row) => ({
      id: `${result.source.table}-${String(row.id ?? row[result.source.timestamp])}`,
      label: result.source.label,
      detail: result.source.detail,
      timestamp: String(row[result.source.timestamp]),
    })),
  );
  activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return { value: activity.slice(0, 8), error: errors.length ? errors.join(" | ") : undefined };
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function formatRelativeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";
  const minutes = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

export default async function PlatformPage() {
  const [users, courses, providers, enrollments, rewards, nfts, certificates, donations, progress, assessments, activeListings, activity] =
    await Promise.all([
      countRows("users"),
      countRows("courses"),
      countRows("users", { column: "role", value: "provider" }),
      countRows("enrollments"),
      sumColumn("rewards", "amount"),
      countRows("nfts"),
      countRows("certificates"),
      sumColumn("donations", "amount"),
      countRows("progress"),
      countRows("assessments"),
      countRows("marketplace_listings", { column: "status", value: "ACTIVE" }),
      recentActivity(),
    ]);

  const errors = [users, courses, providers, enrollments, rewards, nfts, certificates, donations, progress, assessments, activeListings, activity]
    .flatMap((query) => (query.error ? [query.error] : []));

  const cards = [
    { label: "Total Users", value: users.value, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Courses", value: courses.value, icon: BookOpen, color: "text-indigo-600 bg-indigo-50" },
    { label: "Providers", value: providers.value, icon: GraduationCap, color: "text-violet-600 bg-violet-50" },
    { label: "Enrollments", value: enrollments.value, icon: ListChecks, color: "text-emerald-600 bg-emerald-50" },
    { label: "MX Rewards Issued", value: rewards.value, icon: Coins, color: "text-amber-600 bg-amber-50" },
    { label: "NFTs Issued", value: nfts.value, icon: ImageIcon, color: "text-fuchsia-600 bg-fuchsia-50" },
    { label: "Certificates Issued", value: certificates.value, icon: GraduationCap, color: "text-cyan-600 bg-cyan-50" },
    { label: "Donations Received", value: donations.value, icon: HeartHandshake, color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <PlatformDashboardShell>
      <main className="min-h-screen bg-[#F5F7FA] px-4 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#0056D2]">Platform Overview</p>
            <h1 className="text-3xl font-black text-slate-900">Real-time platform statistics</h1>
            <p className="mt-2 text-sm text-slate-500">Learning activity and reward distribution from the connected database.</p>
          </header>

          {errors.length > 0 && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Some metrics are unavailable from the current database permissions or schema. Unavailable queries are shown as zero until they can be connected.
            </div>
          )}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                    <span className={`rounded-xl p-2 ${card.color}`}><Icon className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-5 text-3xl font-black text-slate-900">{formatNumber(card.value)}</p>
                </article>
              );
            })}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-xl bg-blue-50 p-2 text-blue-600"><BarChart3 className="h-5 w-5" /></span>
                <div><h2 className="font-bold text-slate-900">Learning Activity</h2><p className="text-xs text-slate-500">Recorded learning data</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Metric label="Enrollments" value={enrollments.value} />
                <Metric label="Assessments" value={assessments.value} />
                <Metric label="Progress records" value={progress.value} />
                <Metric label="Completed courses" value={certificates.value} />
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div><h2 className="font-bold text-slate-900">Recent Platform Activity</h2><p className="text-xs text-slate-500">Latest records across learning tables</p></div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Database</span>
              </div>
              <div className="space-y-4">
                {activity.value.length === 0 ? (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No platform activity has been recorded yet.</p>
                ) : activity.value.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0056D2]" />
                    <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{item.label}</p><p className="text-xs text-slate-500">{item.detail}</p></div>
                    <time className="shrink-0 text-xs text-slate-400">{formatRelativeTime(item.timestamp)}</time>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section id="courses" className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Active Marketplace Listings</h2>
            <p className="mt-2 text-3xl font-black text-slate-900">{formatNumber(activeListings.value)}</p>
            <p className="mt-1 text-sm text-slate-500">Completed sales are not reported until marketplace transactions are recorded.</p>
          </section>
        </div>
      </main>
    </PlatformDashboardShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-900">{formatNumber(value)}</p></div>;
}
