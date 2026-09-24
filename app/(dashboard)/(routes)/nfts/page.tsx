import Link from "next/link";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import { getStudentData } from "@/lib/student-data";

export default async function NFTsPage() {
  const { nfts, certificates, errors } = await getStudentData();
  const items = [
    ...certificates.map((item) => ({ id: String(item.id), title: "Certificate", detail: `Course ${item.course_id}`, date: item.issued_at })),
    ...nfts.map((item) => ({ id: String(item.token_id), title: item.type || "NFT", detail: item.token_id, date: item.minted_at })),
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <header className="mb-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0056D2]">Own</p><h1 className="mt-2 text-3xl font-black text-slate-900">NFT Collection</h1><p className="mt-2 text-sm text-slate-500">View credentials and NFT records associated with your account.</p></header>
      {errors.length > 0 && <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Some NFT records are unavailable from the current database connection.</div>}
      {items.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Sparkles className="mx-auto h-8 w-8 text-slate-400" /><h2 className="mt-3 font-bold text-slate-900">Your collection is empty</h2><p className="mt-2 text-sm text-slate-500">Complete learning milestones to receive credentials.</p></div> : <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"><Award className="h-16 w-16 text-amber-300" /></div><div className="p-5"><h2 className="font-bold text-slate-900">{item.title}</h2><p className="mt-1 text-xs text-slate-500">{item.detail}</p><p className="mt-3 text-xs text-slate-400">{item.date ? new Date(item.date).toLocaleDateString() : "Date unavailable"}</p><Link href={`/nfts/${encodeURIComponent(item.id)}`} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0056D2]">View details <ExternalLink className="h-3.5 w-3.5" /></Link></div></article>)}</section>}
    </main>
  );
}
