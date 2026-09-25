import Link from "next/link";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NFTDetailsPage({ params }: { params: { tokenId: string } }) {
  const tokenId = decodeURIComponent(params.tokenId);
  const supabase = createClient();
  const { data: nft } = await supabase.from("nfts").select("token_id, type, metadata_cid, minted_at").eq("token_id", tokenId).maybeSingle();
  const { data: certificate } = await supabase.from("certificates").select("id, course_id, issued_at").eq("nft_token_id", tokenId).maybeSingle();
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <Link href="/nfts" className="inline-flex items-center gap-2 text-sm font-bold text-[#0056D2]"><ArrowLeft className="h-4 w-4" /> Back to collection</Link>
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"><Award className="h-24 w-24 text-amber-300" /></div>
        <div className="p-6">
          {nft || certificate ? <><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056D2]">{nft?.type || "Certificate"}</p><h1 className="mt-2 text-2xl font-black text-slate-900">{tokenId}</h1><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Course</dt><dd className="font-semibold text-slate-900">{certificate?.course_id ?? "Not linked"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Issued</dt><dd className="font-semibold text-slate-900">{certificate?.issued_at || nft?.minted_at ? new Date(certificate?.issued_at || nft?.minted_at).toLocaleString() : "Unavailable"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Metadata</dt><dd className="max-w-[65%] truncate font-mono text-xs text-slate-700">{nft?.metadata_cid || "Unavailable"}</dd></div></dl>{nft?.metadata_cid && <a href={`https://ipfs.io/ipfs/${nft.metadata_cid}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0056D2]">View metadata <ExternalLink className="h-4 w-4" /></a>}</> : <><h1 className="text-2xl font-black text-slate-900">Credential not found</h1><p className="mt-2 text-sm text-slate-500">This token is not present in the connected database.</p></>}
        </div>
      </section>
    </main>
  );
}
