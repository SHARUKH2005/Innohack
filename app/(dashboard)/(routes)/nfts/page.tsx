"use client";

import { useState, useEffect } from "react";
import { Award, Image as ImageIcon, Wallet, Loader2, ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectWallet, getWalletAddress, getCertificates, getAvatarNFTs } from "@/lib/web3";

type NFTItem = {
  tokenId: string;
  tokenURI: string;
  type: "certificate" | "avatar";
  name: string;
  description: string;
  gradient: string;
  attributes?: { trait: string; value: string }[];
};

const MOCK_NFTS: NFTItem[] = [
  { tokenId: "42", tokenURI: "ipfs://QmXxx...", type: "certificate", name: "Solidity Master Certificate", description: "Awarded for completing Solidity Smart Contracts with an A+ grade", gradient: "from-violet-500 to-purple-700", attributes: [{ trait: "Grade", value: "A+" }, { trait: "Score", value: "96%" }, { trait: "Course", value: "Solidity 101" }] },
  { tokenId: "17", tokenURI: "ipfs://QmYyy...", type: "certificate", name: "JavaScript Pro Certificate", description: "Awarded for completing Advanced JavaScript with an A grade", gradient: "from-amber-500 to-orange-600", attributes: [{ trait: "Grade", value: "A" }, { trait: "Score", value: "88%" }, { trait: "Course", value: "Advanced JS" }] },
  { tokenId: "7", tokenURI: "ipfs://QmZzz...", type: "avatar", name: "Blockchain Pioneer Avatar", description: "Exclusive avatar earned for completing 2 blockchain courses", gradient: "from-cyan-500 to-blue-600", attributes: [{ trait: "Rarity", value: "Rare" }, { trait: "Type", value: "Pioneer" }] },
  { tokenId: "23", tokenURI: "ipfs://QmWww...", type: "avatar", name: "Code Wizard Avatar", description: "Special avatar for achieving 100+ study hours", gradient: "from-emerald-500 to-teal-600", attributes: [{ trait: "Rarity", value: "Epic" }, { trait: "Type", value: "Wizard" }] },
];

export default function NFTsPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "certificate" | "avatar">("all");
  const [selected, setSelected] = useState<NFTItem | null>(null);

  useEffect(() => {
    getWalletAddress().then((addr) => { if (addr) setWalletAddress(addr); });
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    const addr = await connectWallet();
    if (addr) setWalletAddress(addr);
    setConnecting(false);
  };

  const filtered = MOCK_NFTS.filter((n) => filter === "all" || n.type === filter);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-8 w-8 text-violet-500" /> My NFTs
          </h1>
          <p className="text-muted-foreground mt-1">Your on-chain certificates and avatar NFTs</p>
        </div>
        {!walletAddress ? (
          <Button onClick={handleConnect} disabled={connecting} className="gap-2">
            {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
            Connect Wallet
          </Button>
        ) : (
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-600 font-mono">
            ✓ {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total NFTs", value: MOCK_NFTS.length, color: "text-violet-500" },
          { label: "Certificates", value: MOCK_NFTS.filter((n) => n.type === "certificate").length, color: "text-amber-500" },
          { label: "Avatars", value: MOCK_NFTS.filter((n) => n.type === "avatar").length, color: "text-cyan-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "certificate", "avatar"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/50"
            }`}
          >
            {f === "all" ? "All NFTs" : f === "certificate" ? "Certificates" : "Avatars"}
          </button>
        ))}
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((nft) => (
          <div
            key={nft.tokenId}
            className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5 group"
            onClick={() => setSelected(nft)}
          >
            {/* NFT image area */}
            <div className={`aspect-square bg-gradient-to-br ${nft.gradient} flex items-center justify-center relative`}>
              <div className="text-white text-center p-4">
                {nft.type === "certificate" ? (
                  <Award className="h-12 w-12 mx-auto mb-2" />
                ) : (
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                )}
                <div className="text-xs font-bold opacity-90">#{nft.tokenId}</div>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/30 rounded text-white text-xs capitalize">
                {nft.type}
              </div>
            </div>

            <div className="p-3">
              <div className="text-sm font-semibold line-clamp-1">{nft.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{nft.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* NFT Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-background rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`aspect-video bg-gradient-to-br ${selected.gradient} flex items-center justify-center`}>
              {selected.type === "certificate" ? <Award className="h-20 w-20 text-white" /> : <ImageIcon className="h-20 w-20 text-white" />}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">{selected.type}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>

              {selected.attributes && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {selected.attributes.map((attr) => (
                    <div key={attr.trait} className="bg-muted/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-muted-foreground">{attr.trait}</div>
                      <div className="text-sm font-semibold">{attr.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-xs text-muted-foreground font-mono mb-4">
                Token ID: #{selected.tokenId} | {selected.tokenURI}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelected(null)} className="flex-1">Close</Button>
                <a href={`https://opensea.io/assets/${selected.tokenId}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full gap-1.5"><ExternalLink className="h-4 w-4" /> OpenSea</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
