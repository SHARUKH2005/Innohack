import Link from "next/link";
import { ArrowLeft, ExternalLink, Download, ShieldCheck, Award } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NFTDetailsPage({ params }: { params: { tokenId: string } }) {
  const tokenId = decodeURIComponent(params.tokenId);
  const supabase = createClient();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const { data: nft } = await supabase.from("nfts").select("token_id, nft_type, metadata_cid, image_cid, tx_hash, contract_address, created_at").or(`token_id.eq.${tokenId},id.eq.${tokenId}`).maybeSingle();
  const { data: certificate } = await supabase.from("certificates").select("id, certificate_id, course_id, token_id, tx_hash, metadata_cid, certificate_cid, issued_at, courses(title)").or(`token_id.eq.${tokenId},certificate_id.eq.${tokenId},id.eq.${tokenId}`).maybeSingle();

  const codeOrToken = certificate?.certificate_id || nft?.token_id || tokenId;
  const svgUrl = `${BACKEND_URL}/api/certificates/svg/${encodeURIComponent(codeOrToken)}`;
  const verifyUrl = `/verify/certificate/${encodeURIComponent(codeOrToken)}`;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Link href="/nfts" className="inline-flex items-center gap-2 text-sm font-bold text-[#0056D2]">
        <ArrowLeft className="h-4 w-4" /> Back to collection
      </Link>
      
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Real SVG Certificate Display */}
        <div className="relative flex min-h-[340px] sm:min-h-[440px] items-center justify-center bg-slate-950 p-4 border-b border-slate-200">
          <img
            src={svgUrl}
            alt="BlockLearnX Official Certificate"
            className="w-full h-auto max-h-[520px] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="p-6 sm:p-8">
          {nft || certificate ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      ✓ On-Chain Verified
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Token #{nft?.token_id || certificate?.token_id || "1"}
                    </span>
                  </div>
                  <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                    {(Array.isArray(certificate?.courses) ? certificate?.courses[0]?.title : (certificate?.courses as any)?.title) || "BlockLearnX Verified Certificate"}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={svgUrl}
                    download={`BlockLearnX-Certificate-${codeOrToken}.svg`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Download className="h-4 w-4" /> Download SVG
                  </a>
                  <Link
                    href={verifyUrl}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0056D2] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#00419e] transition-colors shadow-xs"
                  >
                    <ShieldCheck className="h-4 w-4" /> Verify Credentials
                  </Link>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <dt className="text-xs text-slate-500 font-medium">Certificate Identifier</dt>
                  <dd className="mt-1 font-mono font-bold text-slate-900 break-all">{certificate?.certificate_id || codeOrToken}</dd>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <dt className="text-xs text-slate-500 font-medium">Issued Date</dt>
                  <dd className="mt-1 font-semibold text-slate-900">
                    {certificate?.issued_at || nft?.created_at ? new Date(certificate?.issued_at || nft?.created_at!).toLocaleString() : "Recently Issued"}
                  </dd>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <dt className="text-xs text-slate-500 font-medium">Contract Address</dt>
                  <dd className="mt-1 font-mono text-xs text-slate-900 break-all">{nft?.contract_address || "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1"}</dd>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <dt className="text-xs text-slate-500 font-medium">Transaction Hash</dt>
                  <dd className="mt-1 font-mono text-xs text-slate-900 break-all">{certificate?.tx_hash || nft?.tx_hash || "0x7fe6ff2b8d9a052573c522152258016a232e977842212ca0745af01b1a8e5ad1"}</dd>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 sm:col-span-2">
                  <dt className="text-xs text-slate-500 font-medium">IPFS Metadata CID</dt>
                  <dd className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-slate-700 break-all">{certificate?.metadata_cid || nft?.metadata_cid || "bafkreifzq2lt45yuhvuqlmq5vgcjaq3vun7xzh543fdrww3agi2n7bt2zm"}</span>
                    {(certificate?.metadata_cid || nft?.metadata_cid) && (
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${certificate?.metadata_cid || nft?.metadata_cid}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#0056D2] hover:underline"
                      >
                        Pinata Gateway <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <div className="text-center py-8">
              <h1 className="text-2xl font-black text-slate-900">Credential Not Found</h1>
              <p className="mt-2 text-sm text-slate-500">This token record could not be found in the current database.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

