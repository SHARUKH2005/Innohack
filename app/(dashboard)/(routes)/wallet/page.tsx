"use client";

import { useState, useEffect } from "react";
import { Wallet as WalletIcon, Coins, ArrowUpRight, ArrowDownRight, RefreshCw, ExternalLink, Copy, CheckCircle, Loader2, TrendingUp, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectWallet, getWalletAddress, getMXBalance } from "@/lib/web3";
import Link from "next/link";

const MOCK_TX = [
  { id: "t1", type: "receive", label: "Course Completion Reward", amount: "+150 MX", date: "Aug 15, 2025", hash: "0xabc...def", status: "confirmed" },
  { id: "t2", type: "receive", label: "Assessment Bonus", amount: "+75 MX", date: "Aug 12, 2025", hash: "0x111...222", status: "confirmed" },
  { id: "t3", type: "send", label: "NFT Purchase", amount: "-50 MX", date: "Aug 6, 2025", hash: "0x333...444", status: "confirmed" },
  { id: "t4", type: "receive", label: "Streak Bonus", amount: "+25 MX", date: "Aug 3, 2025", hash: "0x555...666", status: "confirmed" },
  { id: "t5", type: "receive", label: "Community Reward", amount: "+30 MX", date: "Jul 28, 2025", hash: "0x777...888", status: "confirmed" },
];

export default function WalletPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [mxBalance, setMxBalance] = useState("0");
  const [ethBalance] = useState("0.042");
  const [connecting, setConnecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getWalletAddress().then(async (addr) => {
      if (addr) {
        setAddress(addr);
        setLoading(true);
        const bal = await getMXBalance(addr);
        setMxBalance(bal);
        setLoading(false);
      }
    });
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    const addr = await connectWallet();
    if (addr) {
      setAddress(addr);
      const bal = await getMXBalance(addr);
      setMxBalance(bal);
    }
    setConnecting(false);
  };

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mxNum = 420; // mock balance

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <WalletIcon className="h-8 w-8 text-indigo-500" /> Wallet
        </h1>
        <p className="text-muted-foreground mt-1">Manage your MX tokens and on-chain assets</p>
      </div>

      {/* Wallet card */}
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm opacity-80 mb-1">MX Token Balance</div>
              <div className="text-5xl font-black">
                {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : mxNum}
              </div>
              <div className="text-sm opacity-80 mt-1">MX Tokens</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80 mb-1">ETH Balance</div>
              <div className="text-2xl font-bold">{ethBalance}</div>
              <div className="text-sm opacity-80">ETH</div>
            </div>
          </div>

          {address ? (
            <div>
              <div className="text-xs opacity-70 mb-1">Wallet Address</div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <span className="font-mono text-sm flex-1 truncate">{address}</span>
                <button onClick={handleCopy} className="shrink-0 hover:text-white/70 transition-colors">
                  {copied ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:text-white/70">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <Button variant="secondary" onClick={handleConnect} disabled={connecting} className="w-full gap-2">
              {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <WalletIcon className="h-4 w-4" />}
              Connect MetaMask
            </Button>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Link href="/marketplace">
          <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1.5">
            <ShoppingBag className="h-5 w-5 text-violet-500" />
            <span className="text-xs">Marketplace</span>
          </Button>
        </Link>
        <Link href="/rewards">
          <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1.5">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            <span className="text-xs">Earn MX</span>
          </Button>
        </Link>
        <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1.5" onClick={handleCopy} disabled={!address}>
          <Copy className="h-5 w-5 text-blue-500" />
          <span className="text-xs">Copy Address</span>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Earned", value: "420 MX", trend: "+25%", color: "text-emerald-500" },
          { label: "Total Spent", value: "50 MX", trend: "-5%", color: "text-red-500" },
          { label: "NFTs Held", value: "4", trend: null, color: "text-violet-500" },
          { label: "MX Value (USD)", value: "$84.00", trend: "+12%", color: "text-blue-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            {s.trend && <div className={`text-xs mt-1 ${s.color}`}>{s.trend}</div>}
          </div>
        ))}
      </div>

      {/* Transaction history */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Transaction History</h2>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
        <div className="space-y-2">
          {MOCK_TX.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-border/70 transition-colors">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === "receive" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                {tx.type === "receive" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{tx.label}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{tx.date}</span>
                  <span className="text-xs font-mono text-muted-foreground">{tx.hash}</span>
                </div>
              </div>
              <div className={`text-sm font-bold shrink-0 ${tx.type === "receive" ? "text-emerald-500" : "text-red-500"}`}>
                {tx.amount}
              </div>
              <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
