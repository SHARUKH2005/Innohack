import { Coins, Gift, History, Sparkles } from "lucide-react";
import { getStudentData } from "@/lib/student-data";

export default async function RewardsPage() {
  const { rewards, errors } = await getStudentData();
  const total = rewards.reduce((sum, reward) => sum + Number(reward.amount ?? 0), 0);
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <Header eyebrow="Earn" title="Rewards" description="Track MX rewards recorded for your learning activity." />
      {errors.length > 0 && <Notice />}
      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total MX earned" value={total} icon={Coins} />
        <Stat label="Reward records" value={rewards.length} icon={History} />
        <Stat label="Next milestone" value={rewards.length ? "Keep learning" : "Start a course"} icon={Sparkles} text />
      </section>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-900">Reward history</h2>
        <div className="mt-4 space-y-3">
          {rewards.length === 0 ? <Empty text="No rewards have been recorded for this account yet." /> : rewards.map((reward) => (
            <div key={String(reward.id)} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div><p className="font-semibold text-slate-900">{reward.reason || "Learning reward"}</p><p className="text-xs text-slate-500">{formatDate(reward.created_at || reward.granted_at)}</p></div>
              <span className="font-black text-emerald-700">+{Number(reward.amount)} MX</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Header({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="mb-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0056D2]">{eyebrow}</p><h1 className="mt-2 text-3xl font-black text-slate-900">{title}</h1><p className="mt-2 text-sm text-slate-500">{description}</p></header>;
}
function Stat({ label, value, icon: Icon, text }: { label: string; value: number | string; icon: typeof Coins; text?: boolean }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-[#0056D2]" /><p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className={`mt-2 font-black text-slate-900 ${text ? "text-lg" : "text-3xl"}`}>{typeof value === "number" ? `${value.toLocaleString()} MX` : value}</p></article>;
}
function Empty({ text }: { text: string }) { return <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">{text}</div>; }
function Notice() { return <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Some reward records are unavailable from the current database connection.</div>; }
function formatDate(value: string | null) { return value ? new Date(value).toLocaleString() : "Date unavailable"; }
