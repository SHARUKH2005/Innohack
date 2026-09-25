import Link from "next/link";
import { ExternalLink, Sparkles, Award } from "lucide-react";
import { getStudentData } from "@/lib/student-data";

export default async function NFTsPage() {
  const { nfts, certificates, errors } = await getStudentData();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const items = [
    ...certificates.map((item: any) => ({
      id: String(item.certificate_id || item.id),
      rawId: String(item.id),
      title: item.courses?.title ? `${item.courses.title} Certificate` : "BlockLearnX Certificate",
      detail: item.certificate_id ? `ID: ${item.certificate_id}` : `Course ${item.course_id}`,
      date: item.issued_at,
      svgUrl: `${BACKEND_URL}/api/certificates/svg/${encodeURIComponent(item.certificate_id || item.id)}`,
      verifyUrl: `/verify/certificate/${encodeURIComponent(item.certificate_id || item.id)}`,
      type: "certificate",
      tokenId: item.token_id,
    })),
    ...nfts.map((item: any) => ({
      id: String(item.token_id || item.id),
      rawId: String(item.id),
      title: item.nft_type === "certificate" ? "Sepolia Certificate NFT" : item.nft_type || "BlockLearnX NFT",
      detail: `Token #${item.token_id || item.id}`,
      date: item.created_at || item.minted_at,
      svgUrl: `${BACKEND_URL}/api/certificates/svg/${encodeURIComponent(item.token_id || item.id)}`,
      verifyUrl: `/nfts/${encodeURIComponent(item.token_id || item.id)}`,
      type: "nft",
      tokenId: item.token_id,
    })),
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <header className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0056D2]">Own</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">NFT &amp; Certificate Collection</h1>
        <p className="mt-2 text-sm text-slate-500">View credentials and NFT records associated with your account.</p>
      </header>
      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Some NFT records are unavailable from the current database connection.
        </div>
      )}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
          <h2 className="mt-3 font-bold text-slate-900">Your collection is empty</h2>
          <p className="mt-2 text-sm text-slate-500">Complete learning milestones to receive credentials.</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative flex h-52 items-center justify-center bg-slate-950 overflow-hidden group">
                <img
                  src={item.svgUrl}
                  alt={item.title}
                  className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
                {item.tokenId && (
                  <span className="absolute top-3 right-3 rounded-full bg-blue-600/90 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm backdrop-blur-xs">
                    #{item.tokenId}
                  </span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0056D2]">
                    <Award className="h-4 w-4" />
                    <span>Verified Credential</span>
                  </div>
                  <h2 className="mt-2 font-bold text-slate-900 leading-snug">{item.title}</h2>
                  <p className="mt-1 text-xs font-mono text-slate-500 truncate">{item.detail}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    {item.date ? new Date(item.date).toLocaleDateString() : "Date unavailable"}
                  </p>
                  <Link
                    href={item.verifyUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056D2] hover:underline"
                  >
                    View details <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

