"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coins, TrendingUp, Award, ArrowUpRight, ArrowDownRight, Wallet, ExternalLink, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMXBalance, connectWallet, getWalletAddress } from "@/lib/web3";

const MOCK_REWARDS = [
  { id: "r1", type: "earned", label: "Course Completed: Solidity 101", amount: 150, date: "Aug 15, 2025", txHash: "0xabc...def" },
  { id: "r2", type: "earned", label: "Assessment Passed: React Fundamentals (A+)", amount: 75, date: "Aug 12, 2025", txHash: "0x123...456" },
  { id: "r3", type: "earned", label: "7-Day Study Streak Bonus", amount: 25, date: "Aug 10, 2025", txHash: "0xfed...cba" },
  { id: "r4", type: "earned", label: "Community Contribution Reward", amount: 30, date: "Aug 8, 2025", txHash: "0x789...012" },
  { id: "r5", type: "spent", label: "NFT Avatar Purchase", amount: -50, date: "Aug 6, 2025", txHash: "0xaaa...bbb" },
  { id: "r6", type: "earned", label: "Course Completed: Node.js Backend", amount: 120, date: "Jul 28, 2025", txHash: "0xccc...ddd" },
  { id: "r7", type: "earned", label: "First Course Enrollment Bonus", amount: 20, date: "Jul 5, 2025", txHash: "0xeee...fff" },
];

const UPCOMING = [
  { label: "Complete React Hooks Module", reward: 50, progress: 60 },
  { label: "7-Day Streak (3 days remaining)", reward: 25, progress: 57 },
  { label: "Pass Node.js Assessment", reward: 75, progress: 42 },
];

export default function RewardsPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [mxBalance, setMxBalance] = useState<string>("0");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    getWalletAddress().then(async (addr) => {
      if (addr) {
        setWalletAddress(addr);
        const bal = await getMXBalance(addr);
        setMxBalance(bal);
      }
    });
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    const addr = await connectWallet();
    if (addr) {
      setWalletAddress(addr);
      const bal = await getMXBalance(addr);
      setMxBalance(bal);
    }
    setConnecting(false);
  };

  const totalEarned = MOCK_REWARDS.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const totalSpent = Math.abs(MOCK_REWARDS.filter((r) => r.amount < 0).reduce((s, r) => s + r.amount, 0));
  const balance = totalEarned - totalSpent;

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Coins className="h-8 w-8 text-amber-500" /> MX Rewards
        </h1>
        <p className="text-muted-foreground mt-1">Earn MX tokens by learning, completing courses, and contributing to the community</p>
      </div>

      {/* Balance cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Total MX Balance</span>
          </div>
          <div className="text-4xl font-black mb-1">{balance}</div>
          <div className="text-sm opacity-80">MX Tokens</div>
          {walletAddress ? (
            <div className="mt-4 px-3 py-1.5 bg-white/20 rounded-lg text-xs font-mono truncate">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            <Button size="sm" variant="secondary" className="mt-4 w-full" onClick={handleConnect} disabled={connecting}>
              <Wallet className="h-3.5 w-3.5 mr-1" />
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-500 mb-3">
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-sm font-medium">Total Earned</span>
          </div>
          <div className="text-3xl font-bold text-emerald-500">{totalEarned}</div>
          <div className="text-sm text-muted-foreground mt-1">MX tokens earned</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-red-500 mb-3">
            <ArrowDownRight className="h-5 w-5" />
            <span className="text-sm font-medium">Total Spent</span>
          </div>
          <div className="text-3xl font-bold text-red-500">{totalSpent}</div>
          <div className="text-sm text-muted-foreground mt-1">MX tokens spent</div>
        </div>
      </div>

      {/* On-chain balance if connected */}
      {walletAddress && (
        <div className="bg-gradient-to-r from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <div className="font-medium">On-Chain MX Balance</div>
              <div className="text-2xl font-bold text-violet-500">{parseFloat(mxBalance).toFixed(2)} MX</div>
            </div>
          </div>
          <Link href="/wallet">
            <Button variant="outline" size="sm" className="gap-1.5">
              View Wallet <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-6">
        {/* Transaction history */}
        <div className="md:col-span-3">
          <h2 className="font-semibold text-lg mb-4">Reward History</h2>
          <div className="space-y-2">
            {MOCK_REWARDS.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-border/80 transition-colors">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${r.amount > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                  {r.amount > 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.label}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <div className={`text-sm font-bold shrink-0 ${r.amount > 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {r.amount > 0 ? "+" : ""}{r.amount} MX
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming rewards */}
        <div className="md:col-span-2">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-500" /> Upcoming Rewards
          </h2>
          <div className="space-y-3">
            {UPCOMING.map((u, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium flex-1 pr-2">{u.label}</div>
                  <div className="text-amber-500 font-bold text-sm shrink-0">+{u.reward} MX</div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${u.progress}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{u.progress}% complete</div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-500" /> How to Earn More MX
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>✅ Complete a course: <strong>+100–200 MX</strong></li>
              <li>✅ Pass an assessment: <strong>+50–100 MX</strong></li>
              <li>✅ 7-day learning streak: <strong>+25 MX</strong></li>
              <li>✅ Community contribution: <strong>+10–50 MX</strong></li>
              <li>✅ Refer a learner: <strong>+30 MX</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
