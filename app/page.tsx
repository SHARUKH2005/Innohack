"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, ArrowRight, Award, Coins, ShieldCheck, Cpu,
  Star, Play, RefreshCw, X, Check, ChevronRight,
  GraduationCap, ChevronDown, Sparkles, Users, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { Navbar } from "@/components/shared/navbar";
import { Logo } from "@/components/shared/logo";

/* ─── DATA ──────────────────────────────────────── */
const BENEFITS = [
  { icon: <BookOpen className="h-6 w-6 text-[#0056D2]" />, bg: "bg-blue-50", title: "Learn Web3 Skills", desc: "Master Solidity, Rust, ZK proofs, and AI agents through hands-on interactive labs." },
  { icon: <Cpu className="h-6 w-6 text-purple-600" />, bg: "bg-purple-50", title: "Build Practical Projects", desc: "Complete real-world capstone projects and pass AI-powered security evaluations." },
  { icon: <Coins className="h-6 w-6 text-amber-600" />, bg: "bg-amber-50", title: "Earn Rewards", desc: "Get instant $MX token payouts for every milestone, quiz, and completed module." },
  { icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />, bg: "bg-emerald-50", title: "Get Verified Credentials", desc: "Mint tamper-proof Soulbound NFT certificates verified on Ethereum and Polygon." },
];

const FEATURED_COURSES = [
  {
    id: "solidity-fundamentals",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=340&fit=crop&auto=format",
    partner: "Stanford Online", partnerLogo: "🌲",
    title: "Blockchain & Smart Contract Security",
    desc: "Build and audit production-grade smart contracts from top university professors.",
    level: "Intermediate", duration: "3–6 months", rating: "4.9", reward: "+180 MX",
  },
  {
    id: "autonomous-web3-ai-agents",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=340&fit=crop&auto=format",
    partner: "DeepLearning.AI", partnerLogo: "🤖",
    title: "Autonomous Web3 AI Agents",
    desc: "Design on-chain AI agents, oracle integrations, and LangChain automation.",
    level: "All Levels", duration: "2–4 months", rating: "4.95", reward: "+240 MX",
  },
  {
    id: "zero-knowledge-cryptography",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop&auto=format",
    partner: "MIT Cryptography Lab", partnerLogo: "🏛️",
    title: "Zero-Knowledge Proofs with Circom",
    desc: "Master ZK-SNARKs, Groth16, and Plonk from MIT cryptography researchers.",
    level: "Advanced", duration: "3–5 months", rating: "4.98", reward: "+300 MX",
  },
  {
    id: "defi-amm-architecture",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop&auto=format",
    partner: "Uniswap Foundation", partnerLogo: "🦄",
    title: "DeFi AMM & Liquidity Architecture",
    desc: "Build Uniswap V4 hooks, liquidity pools, and MEV-resistant AMM protocols.",
    level: "Advanced", duration: "3–6 months", rating: "4.92", reward: "+250 MX",
  },
];

const HOW_IT_WORKS = [
  { step: "01", label: "Learn", desc: "Interactive courses from leading universities and Web3 labs." },
  { step: "02", label: "Build", desc: "Deploy capstone dApps and pass automated test suites." },
  { step: "03", label: "Prove", desc: "AI evaluator audits your code for security and performance." },
  { step: "04", label: "Earn", desc: "Receive $MX rewards and mint your Soulbound NFT certificate." },
];

/* ─── SPLIT DROPDOWN BUTTON ─────────────────────── */
function SplitDropButton({
  id, label, icon, mainAction, dropItems, variant = "primary",
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  mainAction: () => void;
  dropItems: { label: string; emoji: string; action: () => void }[];
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const base = variant === "primary"
    ? "bg-[#0056D2] hover:bg-[#00419e] text-white border-[#0056D2]"
    : "bg-white hover:bg-slate-50 text-slate-800 border-slate-300";
  const divider = variant === "primary" ? "border-white/25" : "border-slate-200";

  return (
    <div ref={ref} className="relative z-30">
      <div className={`flex rounded-xl overflow-hidden border shadow-md ${variant === "primary" ? "border-[#0056D2]" : "border-slate-300"}`}>
        <button
          id={id}
          onClick={mainAction}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm transition-colors ${base}`}
        >
          {label}
          {icon}
        </button>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-11 flex items-center justify-center border-l transition-colors ${base} ${divider}`}
          title="Toggle Options"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 py-1 divide-y divide-slate-100 text-left animate-in fade-in slide-in-from-top-2 duration-150">
          {dropItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { item.action(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0056D2] transition-colors text-left"
            >
              <span className="text-base shrink-0">{item.emoji}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────── */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<"login" | "register">("register");
  const [aiAuditState, setAiAuditState] = useState<"idle" | "running" | "completed">("idle");
  const [aiAuditProgress, setAiAuditProgress] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const openAuth = (mode: "login" | "register") => { setAuthInitialMode(mode); setAuthModalOpen(true); };

  const runAiDemo = () => {
    setAiAuditState("running"); setAiAuditProgress(20);
    const interval = setInterval(() => {
      setAiAuditProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setAiAuditState("completed"); return 100; }
        return prev + 25;
      });
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      {/* ══ 1. HERO ══════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 pt-20 pb-28">
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format"
            alt="Technology background"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-indigo-950/90" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6">
            <GraduationCap className="h-3.5 w-3.5" />
            The Web3 Learning & Credential Platform
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            Learn. Prove. <span className="text-blue-400">Earn.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Build verified Web3 skills through practical learning, AI evaluation,
            and blockchain credentials. Earn crypto rewards as you grow.
          </p>

          {/* DROPDOWN HERO BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="w-full sm:w-auto min-w-[220px]">
              <SplitDropButton
                id="hero-start-btn"
                label="Start Learning"
                icon={<ArrowRight className="h-4 w-4" />}
                mainAction={() => openAuth("register")}
                dropItems={[
                  { emoji: "🆓", label: "Start Free Course", action: () => openAuth("register") },
                  { emoji: "🎓", label: "View Dashboard", action: () => window.location.href = "/dashboard" },
                  { emoji: "📚", label: "Browse All Courses", action: () => window.location.href = "/courses" },
                  { emoji: "🔑", label: "Login to Account", action: () => openAuth("login") },
                ]}
                variant="primary"
              />
            </div>

            <div className="w-full sm:w-auto min-w-[220px]">
              <SplitDropButton
                id="hero-courses-btn"
                label="View Courses"
                mainAction={() => window.location.href = "/courses"}
                dropItems={[
                  { emoji: "⚡", label: "Blockchain & Solidity", action: () => window.location.href = "/courses" },
                  { emoji: "🤖", label: "AI Agents & Oracles", action: () => window.location.href = "/courses" },
                  { emoji: "🛡️", label: "Zero-Knowledge Proofs", action: () => window.location.href = "/courses" },
                  { emoji: "💎", label: "DeFi Protocols", action: () => window.location.href = "/courses" },
                ]}
                variant="outline"
              />
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-5 flex-wrap">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> 100% Online & Self-Paced</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Soulbound NFT Certificates</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Protocol $MX Rewards</span>
          </p>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "$1.25M+", label: "Paid to Learners", icon: <Coins className="h-4 w-4 text-amber-400" /> },
              { value: "150+", label: "Courses Available", icon: <BookOpen className="h-4 w-4 text-blue-400" /> },
              { value: "99.4%", label: "AI Audit Accuracy", icon: <Cpu className="h-4 w-4 text-purple-400" /> },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">{s.icon}<span className="text-xs text-slate-400">{s.label}</span></div>
                <p className="text-2xl font-black text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. BENEFITS ══════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Why BlockLearnX?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A complete ecosystem for learning, proving, and monetizing your Web3 skills.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mb-4`}>{b.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. FEATURED COURSES (REAL PHOTOS) ═══════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">Featured Courses</h2>
              <p className="text-slate-500 text-sm">Top-rated specializations from leading universities.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0056D2] hover:underline shrink-0">
              View All Courses <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COURSES.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col group overflow-hidden">
                {/* Real Photo */}
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{c.reward}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <span className="text-white text-xs font-semibold drop-shadow">{c.partnerLogo} {c.partner}</span>
                    <span className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                      <Star className="h-3 w-3 fill-current" />{c.rating}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0056D2] transition-colors mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                    <span className="font-semibold text-[#0056D2]">{c.level}</span>
                    <span className="text-slate-300">•</span>
                    <span>{c.duration}</span>
                  </div>

                  {/* Dropdown button on featured course card */}
                  <div className="relative" id={`feat-drop-${c.id}`}>
                    <FeaturedCourseDropBtn courseId={c.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ══════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500">Four simple steps from beginner to verified Web3 professional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm h-full">
                <span className="text-xs font-mono font-bold text-[#0056D2] block mb-3">{step.step}</span>
                <h3 className="text-xl font-black text-slate-900 mb-2">{step.label}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. AI EVALUATOR DEMO ═════════════════════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block mb-4 w-fit">AI-Powered Evaluation</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Automated Code & Security Auditor</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Every submission is automatically graded by AI — checking reentrancy, gas optimization, and security vulnerabilities before issuing your credential.</p>
                <Button id="ai-demo-btn" onClick={runAiDemo} disabled={aiAuditState === "running"}
                  className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-sm px-6 py-5 rounded-xl w-fit flex items-center gap-2">
                  {aiAuditState === "running" ? <><RefreshCw className="h-4 w-4 animate-spin" /> Auditing ({aiAuditProgress}%)…</> : <><Play className="h-4 w-4 fill-current" /> Run Demo Audit</>}
                </Button>
              </div>
              <div className="bg-slate-900 p-8 lg:p-10 font-mono text-xs text-slate-300 min-h-[260px] flex flex-col justify-center">
                <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-2 mb-4">
                  <span>VaultSecurity.sol</span>
                  <span className={aiAuditState === "completed" ? "text-emerald-400" : "text-slate-500"}>{aiAuditState === "completed" ? "✓ PASSED" : "READY"}</span>
                </div>
                {aiAuditState === "idle" && <p className="text-slate-500 text-center py-4">Click "Run Demo Audit" to start.</p>}
                {(aiAuditState === "running" || aiAuditState === "completed") && (
                  <div className="space-y-2">
                    <p className="text-blue-400">[1/3] Parsing Solidity AST… <span className="text-emerald-400">✓ PASS</span></p>
                    {aiAuditProgress >= 50 && <p className="text-purple-400">[2/3] Checking Reentrancy… <span className="text-emerald-400">✓ PASS</span></p>}
                    {aiAuditProgress >= 100 && <div className="mt-3 p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300"><p className="font-bold">✓ AUDIT COMPLETE: 98.4% — With Honors</p><p className="text-xs text-slate-400 mt-1">Soulbound NFT being issued…</p></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. CREDENTIALS ═══════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-4">Verified Credentials</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Credentials That Can't Be Faked</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Soulbound NFTs (ERC-5192) are permanently tied to your wallet — non-transferable, cryptographically verified, and instantly shareable with employers and DAOs.</p>
              {[
                "Cryptographic proof of your actual code submissions",
                "1-click sharing to LinkedIn and Web3 portfolios",
                "On-chain verification with IPFS metadata",
                "Zero-Knowledge skill attestation proofs",
              ].map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 mb-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />{pt}
                </div>
              ))}
              <div className="mt-6">
                <SplitDropButton
                  id="cred-learn-btn"
                  label="Learn About Credentials"
                  icon={<ArrowRight className="h-4 w-4" />}
                  mainAction={() => openAuth("register")}
                  dropItems={[
                    { emoji: "📜", label: "View My Certificates", action: () => window.location.href = "/dashboard" },
                    { emoji: "🏆", label: "Browse NFT Credentials", action: () => window.location.href = "/dashboard" },
                    { emoji: "🔗", label: "Verify on Blockchain", action: () => openAuth("register") },
                  ]}
                  variant="primary"
                />
              </div>
            </div>
            {/* Credential card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block mb-1">Soulbound Certificate · ERC-5192</span>
                  <h3 className="text-xl font-black">Senior Smart Contract Architect</h3>
                </div>
                <Award className="h-8 w-8 text-amber-400 shrink-0 mt-1" />
              </div>
              <div className="space-y-2 text-sm text-blue-200">
                {[
                  { label: "Institution", value: "Stanford Online", cls: "text-white" },
                  { label: "Audit Grade", value: "98.4% — With Honors", cls: "text-amber-300" },
                  { label: "Network", value: "Polygon zkEVM", cls: "text-white" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between">
                    <span>{r.label}</span><span className={`font-semibold ${r.cls}`}>{r.value}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />Mainnet Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. MARKETPLACE ═══════════════════════════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-4">Web3 Bounty Marketplace</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Protocols Hire Verified Graduates</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Top Web3 protocols post exclusive bounties and grants for BlockLearnX certified developers. Connect your credentials and start earning.</p>
              <SplitDropButton
                id="marketplace-btn"
                label="View Marketplace"
                icon={<ArrowRight className="h-4 w-4" />}
                mainAction={() => window.location.href = "/community"}
                dropItems={[
                  { emoji: "💰", label: "Open Bounties", action: () => window.location.href = "/community" },
                  { emoji: "🏗️", label: "Project Grants", action: () => window.location.href = "/community" },
                  { emoji: "🤝", label: "Hiring Partners", action: () => window.location.href = "/community" },
                ]}
                variant="primary"
              />
            </div>
            <div className="space-y-3">
              {/* Real photo + bounty cards */}
              <div className="relative h-40 rounded-xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=250&fit=crop&auto=format" alt="Team collaboration" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm">Connect Your Credentials to Global Web3 Protocols</p>
                  <p className="text-slate-300 text-xs mt-0.5">Polygon · Uniswap · Arbitrum · Chainlink hiring verified graduates</p>
                </div>
              </div>
              {[
                { badge: "OPEN BOUNTY • $2,500 USDC", sponsor: "Uniswap DAO", title: "Build V4 Dynamic Fee Hook", req: "Requires: Smart Contract Architect Certificate" },
                { badge: "OPEN BOUNTY • $1,800 USDC", sponsor: "Arbitrum Foundation", title: "Stylus Rust Benchmarks", req: "Requires: Rust & EVM Certificate" },
              ].map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{b.badge}</span>
                    <span className="text-xs text-slate-500">{b.sponsor}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">{b.title}</h4>
                  <p className="text-xs text-slate-500">{b.req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. FINAL CTA ═════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=700&fit=crop&auto=format" alt="Learning community" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0056D2]/90" />
        </div>
        <div className="relative container mx-auto px-4 max-w-2xl text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Start Learning with BlockLearnX</h2>
          <p className="text-blue-100 text-base mb-10 leading-relaxed">Join thousands of developers earning verified Web3 credentials. Your first course is free.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full sm:w-auto min-w-[220px]">
              <SplitDropButton
                id="cta-start-btn"
                label="Get Started Free"
                icon={<ArrowRight className="h-4 w-4" />}
                mainAction={() => openAuth("register")}
                dropItems={[
                  { emoji: "🆓", label: "Start Free Course", action: () => openAuth("register") },
                  { emoji: "🔑", label: "Login to Account", action: () => openAuth("login") },
                  { emoji: "📚", label: "Browse Courses First", action: () => window.location.href = "/courses" },
                ]}
                variant="outline"
              />
            </div>
            <Link href="/courses" className="text-white/80 hover:text-white text-sm font-semibold underline underline-offset-4 transition-colors">
              Browse All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 9. FOOTER ════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 pt-12 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <Logo height={34} variant="dark" />
              <p className="text-xs leading-relaxed text-slate-500 max-w-xs">The leading Web3 learning platform with on-chain credentials and protocol rewards.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white mb-3">Platform</h4>
              {[{ label: "Courses", href: "/courses" }, { label: "Dashboard", href: "/dashboard" }, { label: "Marketplace", href: "/community" }].map((l) => (
                <Link key={l.label} href={l.href} className="block text-xs hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white mb-3">Community</h4>
              {[{ label: "Learners Hub", href: "/community" }, { label: "NFT Credentials", href: "/dashboard" }, { label: "GitHub Labs", href: "https://github.com" }].map((l) => (
                <a key={l.label} href={l.href} className="block text-xs hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white mb-3">Protocol</h4>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> Ethereum & Polygon Live</p>
              <p className="text-xs">ERC-5192 Soulbound Standard</p>
              <p className="text-xs">Privacy Policy & Terms</p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-600">© 2025 BlockLearnX Protocol. All rights reserved.</div>
        </div>
      </footer>

      {/* ══ AUTH MODAL ═══════════════════════════════ */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button onClick={() => setAuthModalOpen(false)}
              className="absolute -top-3 -right-3 z-50 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center shadow-lg border border-slate-700">
              <X className="h-4 w-4" />
            </button>
            <AuthCard initialMode={authInitialMode} onSuccess={() => { setAuthModalOpen(false); window.location.href = "/dashboard"; }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* Small inline dropdown for featured course cards */
function FeaturedCourseDropBtn({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <div className="flex rounded-lg overflow-hidden border border-[#0056D2]">
        <Link href={`/courses/${courseId}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-9 transition-colors">
          View Course <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <button onClick={() => setOpen(!open)}
          className="w-9 bg-[#0056D2] hover:bg-[#00419e] text-white border-l border-white/20 flex items-center justify-center transition-colors">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-30">
          <Link href={`/courses/${courseId}`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0056D2]"><span>📖</span> View Details</Link>
          <Link href={`/courses/${courseId}#enroll`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0056D2]"><span>⚡</span> Enroll Now</Link>
          <Link href={`/courses/${courseId}`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0056D2]"><span>👁️</span> Preview Free</Link>
        </div>
      )}
    </div>
  );
}
