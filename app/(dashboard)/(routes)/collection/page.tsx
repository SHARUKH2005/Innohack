"use client";

import { useState, useEffect } from "react";
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  Filter, 
  Zap, 
  Layers, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Bot, 
  Compass, 
  Code2, 
  Trophy, 
  Crown, 
  Key, 
  Flame, 
  Share2, 
  Copy, 
  Check,
  Hexagon,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/shared/navbar";

// Type definition for NFT item
export type NFTItem = {
  id: string;
  name: string;
  category: "Avatars" | "Achievements" | "Rewards" | "Certificates";
  rarity: "Mythic" | "Legendary" | "Epic" | "Rare";
  tokenId: string;
  mintDate: string;
  network: string;
  contractType: string;
  contractAddress: string;
  ipfsHash: string;
  description: string;
  perks: string;
  gradient: string;
  glowColor: string;
  icon: React.ReactNode;
  attributes: { trait: string; value: string }[];
};

export default function NFTCollectionPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "rarity">("newest");
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 8 Total NFTs specified in requirements including AI Builder, Web3 Explorer, Solidity Master, Course Champion, Achievement
  const nftCollection: NFTItem[] = [
    {
      id: "ai-builder-avatar",
      name: "AI Builder",
      category: "Avatars",
      rarity: "Legendary",
      tokenId: "#0084",
      mintDate: "Sep 20, 2025",
      network: "Base Sepolia",
      contractType: "ERC-721",
      contractAddress: "0x7F2b...8b1C",
      ipfsHash: "bafybeiai5builder84920418491029481920481920",
      description: "Exclusive AI Master Avatar awarded for fine-tuning LLMs, prompt engineering, and deploying autonomous AI tutor agents in BlockLearnX.",
      perks: "+20% MX Token Reward Multiplier & AI Copilot Access",
      gradient: "from-purple-600 via-indigo-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.4)",
      icon: <Bot className="h-10 w-10 text-purple-200" />,
      attributes: [
        { trait: "Role", value: "AI Architect" },
        { trait: "XP Level", value: "Level 42" },
        { trait: "Power", value: "Neural Core v3" },
        { trait: "Edition", value: "Genesis Batch" }
      ]
    },
    {
      id: "web3-explorer-avatar",
      name: "Web3 Explorer",
      category: "Avatars",
      rarity: "Epic",
      tokenId: "#0042",
      mintDate: "Aug 15, 2025",
      network: "Base Sepolia",
      contractType: "ERC-721",
      contractAddress: "0x7F2b...8b1C",
      ipfsHash: "bafybeiw3explorer840192840192840192840192",
      description: "Dynamic Web3 Explorer Avatar unlocked by connecting non-custodial wallets, executing testnet transactions, and mastering decentralized identity.",
      perks: "Exclusive VIP Discord Role & Early Governance Voting",
      gradient: "from-cyan-500 via-blue-600 to-teal-400",
      glowColor: "rgba(6, 182, 212, 0.4)",
      icon: <Compass className="h-10 w-10 text-cyan-100" />,
      attributes: [
        { trait: "Role", value: "Chain Navigator" },
        { trait: "Network", value: "Base Sepolia" },
        { trait: "Stamina", value: "98/100" },
        { trait: "Edition", value: "Season 1" }
      ]
    },
    {
      id: "solidity-master-cert",
      name: "Solidity Master",
      category: "Certificates",
      rarity: "Legendary",
      tokenId: "#0108",
      mintDate: "Aug 28, 2025",
      network: "Base Sepolia",
      contractType: "Soulbound (ERC-5192)",
      contractAddress: "0x4B9a...12eA",
      ipfsHash: "bafybeisolidmaster901823901823901823901",
      description: "Verifiable On-Chain Graduate Certificate for mastering Smart Contract Security, Reentrancy Guarding, Gas Optimization, and Hardhat testing.",
      perks: "Verifiable Web3 Resume Credential & Employer Access",
      gradient: "from-amber-400 via-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.4)",
      icon: <Code2 className="h-10 w-10 text-emerald-100" />,
      attributes: [
        { trait: "Grade", value: "98.4% Honor Roll" },
        { trait: "Issuer", value: "BlockLearnX Academy" },
        { trait: "Type", value: "Non-Transferable SBT" },
        { trait: "Audited By", value: "CertiK Verified" }
      ]
    },
    {
      id: "course-champion-achievement",
      name: "Course Champion",
      category: "Achievements",
      rarity: "Rare",
      tokenId: "#0215",
      mintDate: "Jul 30, 2025",
      network: "Base Sepolia",
      contractType: "ERC-1155",
      contractAddress: "0x3E1d...99F2",
      ipfsHash: "bafybeicoursechamp3819203819203819203",
      description: "Awarded for completing 5 full Web3 & AI learning tracks with top-tier quiz ratings and project submission scores.",
      perks: "Free Access to Premium Workshops & Special Community Badge",
      gradient: "from-yellow-400 via-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.4)",
      icon: <Crown className="h-10 w-10 text-amber-100" />,
      attributes: [
        { trait: "Courses Cleared", value: "5 Tracks" },
        { trait: "Quiz Score", value: "100% Avg" },
        { trait: "Tier", value: "Gold League" },
        { trait: "Status", value: "Permanent" }
      ]
    },
    {
      id: "genesis-pioneer-achievement",
      name: "Genesis Pioneer",
      category: "Achievements",
      rarity: "Mythic",
      tokenId: "#0001",
      mintDate: "Jun 01, 2025",
      network: "Base Sepolia",
      contractType: "ERC-721",
      contractAddress: "0x7F2b...8b1C",
      ipfsHash: "bafybeigenesispioneer000182940182940182",
      description: "Ultra-rare founding member NFT minted by the very first 100 learners on BlockLearnX platform during initial Genesis launch.",
      perks: "Lifetime 1.5x Staking APY & Guaranteed Token Airdrop Allocation",
      gradient: "from-fuchsia-600 via-pink-600 to-rose-500",
      glowColor: "rgba(217, 70, 239, 0.5)",
      icon: <Trophy className="h-10 w-10 text-fuchsia-100" />,
      attributes: [
        { trait: "Genesis ID", value: "#0001 of 100" },
        { trait: "Badge Type", value: "Founders Edition" },
        { trait: "Airdrop Weight", value: "5x Boost" },
        { trait: "Rarity", value: "Mythic Tier" }
      ]
    },
    {
      id: "fullstack-dapp-certificate",
      name: "Full-Stack DApp Architect",
      category: "Certificates",
      rarity: "Epic",
      tokenId: "#0192",
      mintDate: "Sep 10, 2025",
      network: "Base Sepolia",
      contractType: "Soulbound (ERC-5192)",
      contractAddress: "0x4B9a...12eA",
      ipfsHash: "bafybeidapparchitect920192019201920192",
      description: "Certified proficiency in building full-stack Web3 applications combining Next.js, Wagmi, Ethers.js, and Supabase backend services.",
      perks: "Direct referral to Web3 hiring partner network & Guild Badge",
      gradient: "from-blue-600 via-indigo-600 to-cyan-500",
      glowColor: "rgba(79, 70, 229, 0.4)",
      icon: <Layers className="h-10 w-10 text-blue-100" />,
      attributes: [
        { trait: "Stack", value: "Next.js + Solidity" },
        { trait: "Projects", value: "3 Deployed" },
        { trait: "Verification", value: "On-Chain SBT" },
        { trait: "Honor", value: "Distinction" }
      ]
    },
    {
      id: "mx-staker-reward",
      name: "MX Token Vault Key",
      category: "Rewards",
      rarity: "Rare",
      tokenId: "#0350",
      mintDate: "Sep 18, 2025",
      network: "Base Sepolia",
      contractType: "ERC-1155",
      contractAddress: "0x9D4c...77A1",
      ipfsHash: "bafybeimxstakerkey391029301920391029",
      description: "High-yield reward NFT key that unlocks the MX Token Staking Vault with automated daily token distributions.",
      perks: "+50% MX Token Yield & Reduced Gas Fees",
      gradient: "from-emerald-500 via-teal-600 to-green-600",
      glowColor: "rgba(52, 211, 153, 0.4)",
      icon: <Key className="h-10 w-10 text-emerald-100" />,
      attributes: [
        { trait: "Vault Type", value: "High Yield" },
        { trait: "Multiplier", value: "1.5x APY" },
        { trait: "Lockup", value: "Flexible" },
        { trait: "Asset", value: "MX Token" }
      ]
    },
    {
      id: "code-samurai-achievement",
      name: "Code Samurai",
      category: "Achievements",
      rarity: "Rare",
      tokenId: "#0411",
      mintDate: "Aug 05, 2025",
      network: "Base Sepolia",
      contractType: "ERC-1155",
      contractAddress: "0x3E1d...99F2",
      ipfsHash: "bafybeicodesamurai4910294819204819204",
      description: "Awarded to relentless coders who maintain a 30-day streak of active lesson completion and coding submissions.",
      perks: "Streak Saver Shield & +100 Daily XP Bonus",
      gradient: "from-red-600 via-rose-600 to-orange-500",
      glowColor: "rgba(225, 29, 72, 0.4)",
      icon: <Flame className="h-10 w-10 text-red-100" />,
      attributes: [
        { trait: "Streak Length", value: "30 Days" },
        { trait: "Daily XP", value: "+100 Bonus" },
        { trait: "Discipline", value: "Flawless" },
        { trait: "Series", value: "Samurai 2025" }
      ]
    }
  ];

  // Category counts
  const categoryCounts = {
    All: nftCollection.length,
    Avatars: nftCollection.filter(item => item.category === "Avatars").length,
    Achievements: nftCollection.filter(item => item.category === "Achievements").length,
    Rewards: nftCollection.filter(item => item.category === "Rewards").length,
    Certificates: nftCollection.filter(item => item.category === "Certificates").length,
  };

  // Filtered and sorted NFTs
  const filteredNFTs = nftCollection.filter(nft => {
    const matchesCategory = activeFilter === "All" || nft.category === activeFilter;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nft.rarity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nft.tokenId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "rarity") {
      const rarityOrder = { Mythic: 4, Legendary: 3, Epic: 2, Rare: 1 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }
    return b.tokenId.localeCompare(a.tokenId);
  });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getRarityBadgeStyle = (rarity: NFTItem["rarity"]) => {
    switch (rarity) {
      case "Mythic":
        return "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 font-semibold";
      case "Legendary":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 font-semibold";
      case "Epic":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold";
      case "Rare":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar title="BlockLearnX" />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Top Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-background to-blue-900/40 border border-border p-6 md:p-8 mb-8 shadow-xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Key Differentiator: On-Chain Web3 Credentials
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Base Sepolia Verified
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                My NFT Collection
                <Hexagon className="h-7 w-7 text-primary animate-pulse" />
              </h1>

              <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
                Your earned badges, certificates, avatars, and staking keys stored immutably on IPFS and Base Sepolia testnet.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="bg-card/80 backdrop-blur border border-border/80 rounded-xl p-3.5 text-center min-w-[110px]">
                <p className="text-xs text-muted-foreground font-medium">Total NFTs</p>
                <p className="text-2xl font-black text-primary mt-0.5">8</p>
              </div>
              <div className="bg-card/80 backdrop-blur border border-border/80 rounded-xl p-3.5 text-center min-w-[110px]">
                <p className="text-xs text-muted-foreground font-medium">Network</p>
                <p className="text-sm font-bold text-emerald-400 mt-1.5">Base Sepolia</p>
              </div>
              <div className="bg-card/80 backdrop-blur border border-border/80 rounded-xl p-3.5 text-center min-w-[110px]">
                <p className="text-xs text-muted-foreground font-medium">Top Rarity</p>
                <p className="text-sm font-bold text-fuchsia-400 mt-1.5">Mythic #0001</p>
              </div>
              <div className="bg-card/80 backdrop-blur border border-border/80 rounded-xl p-3.5 text-center min-w-[110px]">
                <p className="text-xs text-muted-foreground font-medium">Estimated Value</p>
                <p className="text-sm font-bold text-amber-400 mt-1.5">3,450 MX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-8">
          {/* Category Filters: Avatars, Achievements, Rewards, Certificates */}
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Avatars", "Achievements", "Rewards", "Certificates"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              const count = categoryCounts[filter];
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                  }`}
                >
                  <span>{filter}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sorting Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NFTs or Traits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card border-border rounded-xl text-sm focus-visible:ring-primary"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center bg-card border border-border rounded-xl p-1">
              <button
                onClick={() => setSortBy("newest")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === "newest" ? "bg-accent text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Token ID
              </button>
              <button
                onClick={() => setSortBy("rarity")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === "rarity" ? "bg-accent text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Rarity
              </button>
            </div>
          </div>
        </div>

        {/* NFT Cards Grid */}
        {filteredNFTs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                onClick={() => setSelectedNFT(nft)}
                className="group relative bg-card border border-border/80 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Top Banner & Icon Display */}
                <div 
                  className={`relative h-52 bg-gradient-to-br ${nft.gradient} p-6 flex flex-col justify-between items-center overflow-hidden`}
                  style={{ boxShadow: `inset 0 0 40px ${nft.glowColor}` }}
                >
                  {/* Decorative Glass Overlay */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] group-hover:bg-transparent transition-all duration-300" />
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  {/* Header badges inside image area */}
                  <div className="relative z-10 w-full flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-black/40 backdrop-blur text-white border border-white/10">
                      {nft.tokenId}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border backdrop-blur ${getRarityBadgeStyle(nft.rarity)}`}>
                      {nft.rarity}
                    </span>
                  </div>

                  {/* Central Glowing Icon */}
                  <div className="relative z-10 p-5 rounded-2xl bg-black/30 backdrop-blur border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {nft.icon}
                  </div>

                  {/* Category & Network Footer Badge */}
                  <div className="relative z-10 w-full flex justify-between items-center">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur text-white">
                      {nft.category}
                    </span>
                    <span className="text-[10px] text-white/80 font-mono">
                      {nft.contractType}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {nft.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                      {nft.description}
                    </p>
                  </div>

                  {/* Perk Pill */}
                  <div className="p-2.5 rounded-lg bg-accent/50 border border-border/50 text-[11px] text-foreground flex items-center space-x-2">
                    <Zap className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                    <span className="truncate font-medium">{nft.perks}</span>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center text-emerald-500 font-medium text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> On-Chain Verified
                    </span>
                    <span className="group-hover:text-primary font-medium flex items-center transition-colors text-[11px]">
                      Inspect <ChevronRight className="h-3.5 w-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-card rounded-2xl border border-border">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-semibold text-foreground">No NFTs found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              No collectibles matched your selected filter or search terms.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* NFT Inspection Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative bg-card border border-border rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8">
            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-r ${selectedNFT.gradient} flex justify-between items-start text-white`}>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-black/30 backdrop-blur border border-white/20 shadow-xl">
                  {selectedNFT.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur font-mono">
                      {selectedNFT.tokenId}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur font-semibold">
                      {selectedNFT.rarity}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mt-1">{selectedNFT.name}</h2>
                  <p className="text-xs text-white/80 mt-0.5 font-medium">{selectedNFT.category} • {selectedNFT.contractType}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedNFT(null)}
                className="relative z-10 rounded-full p-2 bg-black/30 hover:bg-black/50 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Description & Perks */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-foreground leading-relaxed bg-accent/40 p-4 rounded-xl border border-border/50">
                  {selectedNFT.description}
                </p>
              </div>

              {/* Special Utility Perk */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-foreground flex items-center space-x-3">
                <Zap className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-500">Active Utility Perk</p>
                  <p className="text-xs font-medium text-foreground mt-0.5">{selectedNFT.perks}</p>
                </div>
              </div>

              {/* Traits / Attributes Grid */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On-Chain Attributes</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedNFT.attributes.map((attr, idx) => (
                    <div key={idx} className="p-3 bg-card border border-border rounded-xl text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{attr.trait}</p>
                      <p className="text-xs font-bold text-foreground mt-1 truncate">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical / Blockchain Verification */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blockchain Verification Details</h4>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-2.5 bg-accent/40 rounded-lg">
                    <span className="text-muted-foreground font-sans">Network:</span>
                    <span className="text-emerald-400 font-semibold flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {selectedNFT.network}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-accent/40 rounded-lg">
                    <span className="text-muted-foreground font-sans">Contract:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground">{selectedNFT.contractAddress}</span>
                      <button
                        onClick={() => handleCopy(selectedNFT.contractAddress, "contract")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {copiedField === "contract" ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-accent/40 rounded-lg">
                    <span className="text-muted-foreground font-sans">IPFS Metadata:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground truncate max-w-[200px]">ipfs://{selectedNFT.ipfsHash}</span>
                      <button
                        onClick={() => handleCopy(`ipfs://${selectedNFT.ipfsHash}`, "ipfs")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {copiedField === "ipfs" ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-accent/30 border-t border-border flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedNFT(null)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Button
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center space-x-2"
                onClick={() => {
                  window.open(`https://sepolia.basescan.org/token/${selectedNFT.contractAddress}?a=${selectedNFT.tokenId}`, "_blank");
                }}
              >
                <span>View on BaseScan</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
