"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Award,
  Sparkles,
  Search,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Layers,
  Users,
  Zap,
  Globe,
  Clock,
  Tag,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

type Listing = {
  id: string;
  type: "nft" | "certificate";
  tokenId?: string | number;
  certificateId?: string;
  title: string;
  description: string;
  owner: string;
  ownerWallet: string;
  network: string;
  standard: string;
  contractAddress: string;
  txHash?: string;
  mintedAt?: string;
  verified: boolean;
  category: string;
  rawId: string | number;
  courseName?: string;
};

type Stats = { totalNFTs?: number; totalCertificates?: number; totalUsers?: number };
type FilterType = "all" | "certificate" | "nft";

const GRADIENTS = [
  "from-blue-900 via-indigo-900 to-slate-900",
  "from-purple-900 via-violet-900 to-slate-900",
  "from-emerald-900 via-teal-900 to-slate-900",
  "from-amber-900 via-orange-900 to-slate-900",
  "from-rose-900 via-pink-900 to-slate-900",
  "from-cyan-900 via-sky-900 to-slate-900",
];

function truncateAddress(addr: string) {
  if (!addr || addr.length < 14) return addr;
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [copied, setCopied] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/marketplace`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setListings(data.listings || []);
      setStats(data.stats || {});
    } catch (e: any) {
      setError("Could not connect to the backend. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCopy = (val: string) => {
    navigator.clipboard?.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = listings.filter((l) => {
    const matchesType = filterType === "all" || l.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || l.title.toLowerCase().includes(q) || l.owner.toLowerCase().includes(q) || (l.courseName || "").toLowerCase().includes(q) || String(l.tokenId || "").includes(q);
    return matchesType && matchesSearch;
  });

  const certCount = listings.filter((l) => l.type === "certificate").length;
  const nftCount = listings.filter((l) => l.type === "nft").length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#060d1f 0%,#0d1b3e 50%,#050b18 100%)" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle,#2563eb 0%,transparent 70%)" }} />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle,#7c3aed 0%,transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 lg:px-8">

        {/* ─── Header ─── */}
        <header className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  <Zap className="h-3.5 w-3.5" />Live On-Chain
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  <Shield className="h-3.5 w-3.5" />Soulbound Verified
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                NFT{" "}
                <span style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Marketplace
                </span>
              </h1>
              <p className="mt-3 text-slate-400 text-sm max-w-lg leading-relaxed">
                Browse on-chain Soulbound certificates and NFT credentials minted by BlockLearnX learners. All records are cryptographically verified on Ethereum Sepolia.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Certificates", value: stats.totalCertificates ?? certCount, icon: Award, color: "text-blue-400" },
                { label: "NFTs", value: stats.totalNFTs ?? nftCount, icon: Layers, color: "text-purple-400" },
                { label: "Learners", value: stats.totalUsers ?? "—", icon: Users, color: "text-emerald-400" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <span className="text-2xl font-black text-white">{s.value}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ─── Search + Filter ─── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, course, token ID, owner…"
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
            {(["all", "certificate", "nft"] as FilterType[]).map((f) => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${filterType === f ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
                {f === "all" ? `All (${listings.length})` : f === "certificate" ? `Certs (${certCount})` : `NFTs (${nftCount})`}
              </button>
            ))}
          </div>
          <button onClick={fetchData} disabled={loading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 border border-white/10 hover:border-blue-500/40 hover:text-white transition-all disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {/* ─── Error ─── */}
        {error && (
          <div className="flex items-start gap-3 mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div><p className="font-bold">Backend Connection Error</p><p className="text-amber-400/80 text-xs mt-1">{error}</p></div>
          </div>
        )}

        {/* ─── Skeleton ─── */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-52 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 rounded bg-white/10" />
                  <div className="h-4 w-4/5 rounded bg-white/10" />
                  <div className="h-3 w-3/5 rounded bg-white/10" />
                  <div className="h-9 rounded-xl bg-white/10 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Empty ─── */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-slate-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-300">{searchQuery || filterType !== "all" ? "No results found" : "No listings yet"}</h2>
            <p className="text-sm text-slate-500 max-w-sm">
              {searchQuery ? `No items match "${searchQuery}".` : filterType !== "all" ? `No ${filterType === "certificate" ? "certificates" : "NFTs"} found.` : "Complete a course to earn your first certificate NFT!"}
            </p>
            {(searchQuery || filterType !== "all") && (
              <button onClick={() => { setSearchQuery(""); setFilterType("all"); }}
                className="px-4 py-2 rounded-xl text-sm font-bold text-blue-300 border border-blue-500/30 hover:bg-blue-500/10 transition-colors">
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* ─── Grid ─── */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="text-xs text-slate-500 mb-5">
              Showing <strong className="text-slate-300">{filtered.length}</strong> credential{filtered.length !== 1 ? "s" : ""} on-chain
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((listing, i) => {
                const grad = GRADIENTS[i % GRADIENTS.length];
                const svgSrc = `${BACKEND_URL}/api/certificates/svg/${encodeURIComponent(listing.certificateId || listing.rawId)}`;
                const verifyUrl = listing.type === "certificate"
                  ? `/verify/certificate/${encodeURIComponent(listing.certificateId || listing.rawId)}`
                  : `/nfts/${encodeURIComponent(listing.tokenId || listing.rawId)}`;

                return (
                  <article key={listing.id}
                    className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    style={{ background: "rgba(12,18,38,0.9)" }}>

                    {/* Top visual panel */}
                    <div className={`relative flex items-start justify-start bg-gradient-to-br ${grad} overflow-hidden`} style={{ minHeight: 210 }}>
                      {/* Verified badge */}
                      <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Shield className="h-3 w-3" />Verified
                      </span>

                      {listing.type === "certificate" ? (
                        <>
                          {/* QR Code — top-right corner */}
                          <div className="absolute top-3 right-3 z-10 bg-white rounded-xl p-1.5 shadow-lg border border-white/20" title="Scan to verify certificate">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=${encodeURIComponent(`${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/verify/certificate/${encodeURIComponent(listing.certificateId || listing.rawId)}`)}`}
                              alt="Verify QR"
                              className="w-9 h-9"
                            />
                          </div>

                          {/* Certificate SVG preview */}
                          <div className="absolute inset-0 flex items-end justify-center pb-4 pt-12 px-4">
                            <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center" style={{ height: 130 }}>
                              <img
                                src={svgSrc}
                                alt={listing.title}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        /* NFT visual */
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-xl">
                            <Award className="h-10 w-10 text-white/80" />
                          </div>
                          <p className="text-white/50 text-[11px] font-semibold">Soulbound Token</p>
                        </div>
                      )}

                      {listing.tokenId && (
                        <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/50 bg-black/30 rounded px-1.5 py-0.5 z-10">
                          #{listing.tokenId}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${listing.type === "certificate" ? "bg-blue-500/15 text-blue-300 border border-blue-500/25" : "bg-purple-500/15 text-purple-300 border border-purple-500/25"}`}>
                          {listing.type === "certificate" ? <><Award className="h-3 w-3" />Certificate NFT</> : <><Layers className="h-3 w-3" />Soulbound NFT</>}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {listing.title}
                      </h3>

                      {listing.courseName && (
                        <p className="text-[11px] text-slate-400 truncate">
                          <span className="text-slate-500">Course: </span>{listing.courseName}
                        </p>
                      )}

                      {/* Owner row */}
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-400 min-w-0">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0 ${listing.type === "certificate" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-purple-500 to-violet-600"}`}>
                            {listing.owner.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate">{listing.owner}</span>
                        </div>
                        <button onClick={() => handleCopy(listing.ownerWallet)}
                          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors font-mono shrink-0 ml-2">
                          {truncateAddress(listing.ownerWallet)}
                          {copied === listing.ownerWallet ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>

                      {/* Network + standard */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Globe className="h-3 w-3" /><span>{listing.network}</span>
                        </div>
                        <span className="font-mono text-blue-400 text-[10px] font-bold">{listing.standard}</span>
                      </div>

                      {listing.mintedAt && (
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(listing.mintedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className={`mt-auto pt-1 grid gap-2 ${listing.type === "certificate" ? "grid-cols-2" : "grid-cols-1"}`}>
                        <Link href={verifyUrl}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-2.5 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                          {listing.type === "certificate" ? "Verify" : "View Details"}
                        </Link>
                        {listing.type === "certificate" && (
                          <a href={svgSrc} download={`Certificate-${listing.certificateId || listing.rawId}.svg`}
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 hover:bg-white/10 text-white text-[11px] font-bold py-2.5 transition-colors">
                            <Tag className="h-3.5 w-3.5" />Download
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* ─── Footer ─── */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>All credentials are ERC-5192 Soulbound Tokens on Ethereum Sepolia</span>
          </div>
          <span className="font-mono">Contract: 0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1</span>
        </footer>
      </div>
    </div>
  );
}
