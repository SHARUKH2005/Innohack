"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Filter,
  Search,
  ExternalLink,
  Copy,
  CheckCircle2,
  Lock,
  Zap,
  ShoppingBag,
  Layers,
  ArrowRight,
  ChevronRight,
  Info,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NFTItem {
  id: string;
  name: string;
  category: "Avatars" | "Achievements" | "Rewards" | "Certificates";
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  badge: string;
  description: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  mintDate: string;
  attributes: { trait: string; value: string }[];
  isLocked?: boolean;
  price?: string;
  isSoulbound?: boolean;
}

const NFT_COLLECTION: NFTItem[] = [
  {
    id: "nft-1",
    name: "AI Builder",
    category: "Avatars",
    rarity: "Legendary",
    badge: "AI Master",
    description: "Granted for deploying and integrating an AI-assisted smart contract evaluator.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tokenId: "#1094",
    contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    mintDate: "Sep 12, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Role", value: "AI Developer" },
      { trait: "Level", value: "Tier 3" },
      { trait: "Multiplier", value: "1.5x MX Rewards" },
    ],
  },
  {
    id: "nft-2",
    name: "Web3 Explorer",
    category: "Avatars",
    rarity: "Rare",
    badge: "Pioneer",
    description: "Issued for completing 5 full dApp interaction workflows and wallet authentications.",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    tokenId: "#2041",
    contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    mintDate: "Aug 28, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Network", value: "Polygon / Hardhat" },
      { trait: "Level", value: "Tier 2" },
      { trait: "XP Bonus", value: "+250 XP" },
    ],
  },
  {
    id: "nft-3",
    name: "Solidity Master",
    category: "Certificates",
    rarity: "Epic",
    badge: "Verified Skill",
    description: "Official Soulbound Certificate confirming 89%+ assessment grade in Solidity Smart Contracts.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    tokenId: "#3019",
    contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    mintDate: "Sep 20, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Exam Score", value: "89%" },
      { trait: "Verifier", value: "BlockLearnX DAO" },
      { trait: "Status", value: "Verified On-Chain" },
    ],
  },
  {
    id: "nft-4",
    name: "Course Champion",
    category: "Achievements",
    rarity: "Rare",
    badge: "Top 5%",
    description: "Awarded for completing 12 complete courses with top tier distinction.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80",
    tokenId: "#4088",
    contractAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    mintDate: "Aug 15, 2026",
    isSoulbound: false,
    attributes: [
      { trait: "Courses Cleared", value: "12" },
      { trait: "Rank", value: "Champion" },
      { trait: "Badge Power", value: "High" },
    ],
  },
  {
    id: "nft-5",
    name: "Streak Centurion",
    category: "Achievements",
    rarity: "Epic",
    badge: "42 Days",
    description: "Consecutive daily learning streak maintained for over 40 days straight.",
    imageUrl: "https://images.unsplash.com/photo-1614680376593-902f749f7b6c?auto=format&fit=crop&w=600&q=80",
    tokenId: "#5512",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    mintDate: "Sep 01, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Streak Length", value: "42 Days" },
      { trait: "Consistency", value: "100%" },
      { trait: "Reward Boost", value: "+20%" },
    ],
  },
  {
    id: "nft-6",
    name: "BlockLearnX Pioneer",
    category: "Rewards",
    rarity: "Mythic",
    badge: "Early Genesis",
    description: "Exclusive Genesis badge granted to early adopters and top hackathon platform contributors.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    tokenId: "#0007",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    mintDate: "Jul 10, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Edition", value: "Genesis #7/100" },
      { trait: "DAO Voting Power", value: "500 VP" },
      { trait: "Rarity Rank", value: "Mythic #1" },
    ],
  },
  {
    id: "nft-7",
    name: "Blockchain Fundamentals Certificate",
    category: "Certificates",
    rarity: "Legendary",
    badge: "94% Score",
    description: "Soulbound proof of mastery for Blockchain Architecture & Cryptographic Primitives.",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=600&q=80",
    tokenId: "#7721",
    contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    mintDate: "Sep 18, 2026",
    isSoulbound: true,
    attributes: [
      { trait: "Grade", value: "94% Honor Pass" },
      { trait: "Issuer", value: "BlockLearnX Protocol" },
      { trait: "Standard", value: "ERC-721 Soulbound" },
    ],
  },
  {
    id: "nft-8",
    name: "DAO Governance Leader",
    category: "Rewards",
    rarity: "Rare",
    badge: "Governor",
    description: "Earned by participating in 10+ protocol proposal reviews and course validation votes.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tokenId: "#8192",
    contractAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    mintDate: "Sep 05, 2026",
    isSoulbound: false,
    attributes: [
      { trait: "Governance Votes", value: "14" },
      { trait: "Reputation", value: "+450" },
      { trait: "Category", value: "Protocol Leader" },
    ],
  },
];

const MARKETPLACE_ITEMS: NFTItem[] = [
  {
    id: "mkt-1",
    name: "Cyber Nomad Avatar",
    category: "Avatars",
    rarity: "Legendary",
    badge: "Special Edition",
    description: "Exclusive Web3 identity avatar with custom platform animation theme.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tokenId: "#9901",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    mintDate: "Sep 2026",
    price: "150 MX",
    attributes: [
      { trait: "Theme", value: "Neon Synth" },
      { trait: "FX", value: "Glow Outline" },
    ],
  },
  {
    id: "mkt-2",
    name: "DeFi Architect Badge",
    category: "Achievements",
    rarity: "Epic",
    badge: "Mastery",
    description: "Unlocks advanced yield farming and liquidity pool simulator courses.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    tokenId: "#9902",
    contractAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    mintDate: "Sep 2026",
    price: "250 MX",
    attributes: [
      { trait: "Access Level", value: "DeFi Tier 1" },
      { trait: "Bonus", value: "Free Retakes" },
    ],
  },
];

export default function NFTCollectionPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTab) {
      if (["marketplace", "achievements", "certificates"].includes(initialTab)) {
        setActiveTab(initialTab);
      }
    }
  }, [initialTab]);

  const filteredNFTs = NFT_COLLECTION.filter((nft) => {
    // Filter by tab / category
    let matchesCategory = true;
    if (activeCategory !== "all") {
      matchesCategory = nft.category.toLowerCase() === activeCategory.toLowerCase();
    }

    if (activeTab === "achievements") {
      matchesCategory = nft.category === "Achievements";
    } else if (activeTab === "certificates") {
      matchesCategory = nft.category === "Certificates";
    }

    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.badge.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getRarityBadge = (rarity: NFTItem["rarity"]) => {
    switch (rarity) {
      case "Mythic":
        return "bg-gradient-to-r from-amber-500 via-purple-600 to-pink-500 text-white border-amber-300 shadow-amber-500/20";
      case "Legendary":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-300";
      case "Epic":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300";
      case "Rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-300";
      default:
        return "bg-slate-700 text-slate-200 border-slate-600";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-[#0056D2] selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-10 pb-12 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0056D2]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Verified On-Chain Credentials
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                My NFT Collection
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
                Your verifiable Web3 achievements, soulbound course certificates, avatar identity badges, and reward tokens stored immutably on the blockchain.
              </p>
            </div>

            {/* Total NFTs Counter Badge */}
            <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shrink-0 shadow-2xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0056D2] to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Total NFTs</span>
                <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                  {NFT_COLLECTION.length}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    100% Soulbound Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Sub-tabs: My Collection | NFT Marketplace | Achievement NFTs | Certificate NFTs */}
          <div className="mt-8 flex items-center gap-2 border-b border-slate-800/80 pb-px overflow-x-auto">
            <button
              onClick={() => { setActiveTab("all"); setActiveCategory("all"); }}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "all"
                  ? "border-[#0056D2] text-[#0056D2] bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              My NFT Collection ({NFT_COLLECTION.length})
            </button>
            <button
              onClick={() => { setActiveTab("marketplace"); }}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "marketplace"
                  ? "border-[#0056D2] text-[#0056D2] bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              🛒 NFT Marketplace
            </button>
            <button
              onClick={() => { setActiveTab("achievements"); setActiveCategory("Achievements"); }}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "achievements"
                  ? "border-[#0056D2] text-[#0056D2] bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Award className="w-4 h-4" />
              🏆 Achievement NFTs
            </button>
            <button
              onClick={() => { setActiveTab("certificates"); setActiveCategory("Certificates"); }}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "certificates"
                  ? "border-[#0056D2] text-[#0056D2] bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              🎓 Certificate NFTs
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="container mx-auto px-4 lg:px-8 py-8 flex-1">
        {/* Marketplace View */}
        {activeTab === "marketplace" ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 p-6 rounded-2xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  NFT Marketplace & Rewards Exchange
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Redeem your earned 🪙 <strong>MX Tokens</strong> for exclusive avatar cosmetics, premium course unlock passes, and rarity upgrades.
                </p>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-700 text-sm font-semibold text-amber-400 flex items-center gap-2 shrink-0">
                <span>Your Balance:</span>
                <span className="text-white font-bold text-lg">3,850 MX</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MARKETPLACE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRarityBadge(item.rarity)}`}>
                        {item.rarity}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">{item.tokenId}</span>
                      <Button size="sm" className="bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Redeem with MX
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Collection Grid View */
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                <span className="text-xs font-bold uppercase text-slate-500 mr-2 flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Filters:
                </span>
                {[
                  { label: "All NFTs", val: "all" },
                  { label: "Avatars", val: "Avatars" },
                  { label: "Achievements", val: "Achievements" },
                  { label: "Rewards", val: "Rewards" },
                  { label: "Certificates", val: "Certificates" },
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => setActiveCategory(f.val)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      activeCategory.toLowerCase() === f.val.toLowerCase()
                        ? "bg-[#0056D2] text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search NFTs..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0056D2]"
                />
              </div>
            </div>

            {/* Quick Badge Highlight Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold self-center mr-2">Featured NFTs:</span>
              {["[AI Builder]", "[Web3 Explorer]", "[Solidity Master]", "[Course Champion]", "[Achievement]"].map(
                (badge, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs font-semibold"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>

            {/* NFT Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {filteredNFTs.map((nft) => (
                <div
                  key={nft.id}
                  onClick={() => setSelectedNFT(nft)}
                  className="group bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-950">
                    <img
                      src={nft.imageUrl}
                      alt={nft.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border tracking-wider ${getRarityBadge(nft.rarity)}`}>
                        {nft.rarity}
                      </span>
                      {nft.isSoulbound && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Soulbound
                        </span>
                      )}
                    </div>

                    {/* Category Label bottom overlay */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-slate-300 text-xs font-semibold border border-slate-700">
                        {nft.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {nft.name}
                        </h3>
                        <span className="text-xs font-mono font-semibold text-slate-500">{nft.tokenId}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{nft.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Minted: {nft.mintDate}</span>
                      <span className="text-xs text-[#0056D2] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNFTs.length === 0 && (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-300">No NFTs found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your category filter or search query.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedNFT(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="relative aspect-video bg-slate-950">
              <img src={selectedNFT.imageUrl} alt={selectedNFT.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase border ${getRarityBadge(selectedNFT.rarity)}`}>
                    {selectedNFT.rarity}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">{selectedNFT.name}</h2>
                </div>
                <span className="text-sm font-mono font-bold text-slate-400 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
                  {selectedNFT.tokenId}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed">{selectedNFT.description}</p>

              {/* Attributes Grid */}
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3">Attributes & On-Chain Traits</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedNFT.attributes.map((attr, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">{attr.trait}</span>
                      <span className="text-xs font-bold text-blue-400 mt-0.5 block truncate">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Metadata */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Contract Address</span>
                  <div className="flex items-center gap-1 text-slate-300 font-mono">
                    <span>{selectedNFT.contractAddress.substring(0, 8)}...{selectedNFT.contractAddress.substring(34)}</span>
                    <button onClick={() => copyToClipboard(selectedNFT.contractAddress)} className="text-blue-400 hover:text-blue-300">
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Token Standard</span>
                  <span className="text-slate-200 font-semibold">{selectedNFT.isSoulbound ? "ERC-721 (Soulbound Token)" : "ERC-721 NFT"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Blockchain Network</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Hardhat Localhost (31337)
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs gap-2"
                  onClick={() => window.open(`http://localhost:8545`, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" /> Verify on Blockchain Explorer
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs" onClick={() => setSelectedNFT(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
