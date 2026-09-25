"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import {
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Copy,
  Sparkles,
  Share2,
  Edit3,
  Flame,
  Coins,
  Layers,
  Code,
  Github,
  Globe,
  TrendingUp,
  Star,
  Zap,
  Calendar,
  Check,
  FileCheck,
  Brain,
  CheckSquare,
  Lock,
  ChevronRight,
  BarChart3,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [selectedVerification, setSelectedVerification] = useState<any | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const walletAddress = "0x82f9B841A0293e8841B9240A9188412891A91942";

  const copyWallet = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sharePortfolio = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // Assessment Performance Scores
  const assessmentScores = [
    { subject: "Blockchain", score: 92, color: "from-blue-500 to-indigo-600" },
    { subject: "Solidity", score: 84, color: "from-[#0056D2] to-cyan-500" },
    { subject: "Web3", score: 90, color: "from-purple-500 to-pink-500" },
    { subject: "Smart Contracts", score: 87, color: "from-amber-500 to-orange-500" },
    { subject: "AI Integration", score: 94, color: "from-emerald-500 to-teal-500" },
  ];

  // Skills attached to verified assessment scores
  const skillsList = [
    { name: "Solidity", stars: 5, verifiedScore: "87% verified score", testCount: "14 tests" },
    { name: "Blockchain", stars: 5, verifiedScore: "92% verified score", testCount: "12 tests" },
    { name: "Web3", stars: 4, verifiedScore: "90% verified score", testCount: "8 tests" },
    { name: "Smart Contracts", stars: 4, verifiedScore: "87% verified score", testCount: "10 tests" },
    { name: "JavaScript / TS", stars: 4, verifiedScore: "89% verified score", testCount: "6 tests" },
    { name: "AI & Machine Learning", stars: 4, verifiedScore: "94% verified score", testCount: "5 tests" },
  ];

  // Verified Courses
  const verifiedCourses = [
    {
      id: "course-1",
      title: "Blockchain Fundamentals & Cryptography",
      score: 94,
      date: "Sep 2026",
      txHash: "0xa81f9b...38e1",
      certId: "BLX-CERT-9941",
      instructor: "Dr. Satoshi Nakamoto",
      modules: 8,
    },
    {
      id: "course-2",
      title: "Solidity Development & EVM Deep Dive",
      score: 89,
      date: "Sep 2026",
      txHash: "0xb72c41...89a2",
      certId: "BLX-CERT-9942",
      instructor: "Vitalik B.",
      modules: 12,
    },
    {
      id: "course-3",
      title: "Advanced Smart Contract Security & Auditing",
      score: 92,
      date: "Aug 2026",
      txHash: "0xc93d12...47f3",
      certId: "BLX-CERT-9943",
      instructor: "OpenZeppelin Security Team",
      modules: 10,
    },
    {
      id: "course-4",
      title: "Web3 Fullstack Engineering with Next.js & Ethers",
      score: 90,
      date: "Jul 2026",
      txHash: "0xd04e55...91b4",
      certId: "BLX-CERT-9944",
      instructor: "BlockLearnX Guild",
      modules: 14,
    },
  ];

  // Achievements
  const achievements = [
    { title: "First Course Completed", icon: "🏆", desc: "Finished first accredited Web3 track", nftUnlocked: true },
    { title: "30 Day Learning Streak", icon: "🔥", desc: "Maintained daily active learning for a month", nftUnlocked: true },
    { title: "10 Assessments Completed", icon: "⚡", desc: "Passed 10 hard-level AI-graded quizzes", nftUnlocked: true },
    { title: "90%+ Average Score", icon: "🧠", desc: "Sustained high distinction grade average", nftUnlocked: true },
    { title: "Solidity Specialist", icon: "💻", desc: "Deployed 5 verified smart contract labs", nftUnlocked: true },
    { title: "Web3 Explorer", icon: "🌐", desc: "Interacted with 5+ dApps on testnet", nftUnlocked: true },
  ];

  // Showcase Projects
  const projects = [
    {
      title: "Decentralized Voting DApp",
      tech: ["Solidity", "React", "Web3.js", "Hardhat"],
      description: "A quadratic voting smart contract system with zero-knowledge proof voter privacy.",
      github: "https://github.com/alexkumar/decentralized-voting",
      demo: "https://voting-dapp-demo.vercel.app",
      txHash: "0x771a9...4820",
    },
    {
      title: "AI Assignment Evaluator",
      tech: ["Python", "AI / LLM", "FastAPI", "Ethers.js"],
      description: "Automated AI evaluator for smart contract code syntax, security flaws, and test coverage.",
      github: "https://github.com/alexkumar/ai-evaluator",
      demo: "https://ai-evaluator-demo.vercel.app",
      txHash: "0x882b0...1931",
    },
    {
      title: "Learn-to-Earn Staking Vault",
      tech: ["Solidity", "Next.js", "TailwindCSS", "ERC-20"],
      description: "Vault contract rewarding course completion with yield-generating MX ERC-20 tokens.",
      github: "https://github.com/alexkumar/l2e-vault",
      demo: "https://l2e-vault-demo.vercel.app",
      txHash: "0x993c1...8422",
    },
  ];

  // NFT Collection Preview
  const previewNFTs = [
    { name: "AI Builder", rarity: "Legendary", badge: "[AI Builder]", color: "from-amber-400 to-orange-500" },
    { name: "Web3 Explorer", rarity: "Rare", badge: "[Web3 Explorer]", color: "from-blue-500 to-cyan-500" },
    { name: "Solidity Master", rarity: "Epic", badge: "[Solidity Master]", color: "from-purple-600 to-indigo-600" },
    { name: "Course Champion", rarity: "Rare", badge: "[Course Champion]", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-[#0056D2] selection:text-white pb-16">
      <Navbar />

      {/* ── SECTION 1: PORTFOLIO HEADER (LinkedIn/GitHub Style) ── */}
      <div className="relative border-b border-slate-800 bg-slate-900 overflow-hidden">
        {/* Banner Cover Image */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute bottom-4 right-6 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-mono text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified On-Chain Profile
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20">
            {/* Avatar & User Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-slate-950 border-4 border-slate-900 shadow-2xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Alex Kumar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 bg-[#0056D2] text-white p-1.5 rounded-full shadow-lg border-2 border-slate-900"
                  title="Verified Learner"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Alex Kumar</h1>
                  <span className="px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Fullstack Web3 Dev
                  </span>
                </div>
                <p className="text-slate-300 font-semibold text-sm md:text-base">
                  Blockchain Developer | Web3 Learner & AI Practitioner
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">📍 India</span>
                  <span className="flex items-center gap-1 font-mono">
                    🔗 Wallet:{" "}
                    <span className="text-slate-200">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                    </span>
                    <button onClick={copyWallet} className="ml-1 text-blue-400 hover:text-blue-300">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold gap-2"
                onClick={() => alert("Profile editor open")}
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </Button>
              <Button
                onClick={sharePortfolio}
                className="bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-semibold gap-2 shadow-lg shadow-blue-500/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                {shareSuccess ? "Link Copied!" : "Share Portfolio"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 py-10 space-y-12">
        {/* ── SECTION 2: CANDIDATE PERFORMANCE (MEASURABLE ACHIEVEMENTS) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#0056D2]" /> Candidate Performance
            </h2>
            <span className="text-xs text-slate-400">Measurable on-chain achievements record</span>
          </div>

          {/* 4 Key Measurable Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Courses Completed</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mt-2">12</div>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> 100% Accredited
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Assessments Completed</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mt-2">38</div>
              <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1 font-medium">
                <Brain className="w-3 h-3" /> AI Proctored
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Avg Assessment Score</div>
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 mt-2">91%</div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Top 3% Platform Rank</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Tasks Completed</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mt-2">84</div>
              <p className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1 font-medium">
                <CheckSquare className="w-3 h-3" /> Verified Labs
              </p>
            </div>
          </div>

          {/* Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Achievement Score</span>
                <span className="text-sm font-extrabold text-amber-400">9,240 XP</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🪙</span>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Total Rewards</span>
                <span className="text-sm font-extrabold text-blue-400">3,850 MX</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Certificates</span>
                <span className="text-sm font-extrabold text-white">12 Verified</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🖼️</span>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">NFTs Owned</span>
                <span className="text-sm font-extrabold text-purple-400">18 Soulbound</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3 col-span-2 sm:col-span-1">
              <span className="text-2xl">🔥</span>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Learning Streak</span>
                <span className="text-sm font-extrabold text-orange-400">42 Days</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: ASSESSMENT PERFORMANCE ── */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Assessment Performance
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically calculated from learner's 38 actual graded smart contract assessments & quizzes.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold self-start sm:self-center">
              ✓ Verified On-Chain Evaluation
            </span>
          </div>

          <div className="space-y-4">
            {assessmentScores.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-200">{item.subject}</span>
                  <span className="font-bold font-mono text-white">{item.score}%</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: SKILLS ATTACHED TO VERIFIED ASSESSMENTS ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" /> Skills & Assessment Attachments
            </h2>
            <span className="text-xs text-slate-400">Verifiable skill rating with exam evidence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{skill.name}</h3>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < skill.stars ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {skill.verifiedScore}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{skill.testCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: VERIFIED COURSES & CERTIFICATES ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Verified Courses & Certificates
            </h2>
            <span className="text-xs text-slate-400">Soulbound ERC-721 Certificates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Instructor: {course.instructor} • {course.modules} Modules
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs shrink-0">
                    {course.score}% Grade
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Completed {course.date}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-blue-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Blockchain Verified
                    </span>
                  </div>

                  <Button
                    size="sm"
                    className="bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs gap-1.5"
                    onClick={() => setSelectedCert(course)}
                  >
                    🎓 View Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: ACHIEVEMENTS & UNLOCKED NFTS ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Platform Achievements
            </h2>
            <span className="text-xs text-slate-400">Automatically unlocks NFT Credentials</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex items-start gap-4"
              >
                <div className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                  {ach.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">{ach.title}</h3>
                  <p className="text-xs text-slate-400">{ach.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mt-1">
                    <Lock className="w-2.5 h-2.5" /> NFT Unlocked & Minted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: PROJECTS SHOWCASE ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" /> Verified Projects Showcase
            </h2>
            <span className="text-xs text-slate-400">GitHub + Live Web3 Deployments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-base">{proj.title}</h3>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#0056D2] hover:text-blue-300 flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 8: NFT COLLECTION PREVIEW ── */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" /> NFT Collection Preview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Top 4 owned credentials out of 18 total NFTs</p>
            </div>
            <Link href="/collection">
              <Button variant="outline" className="border-slate-700 text-blue-400 hover:bg-slate-800 text-xs font-semibold gap-1">
                View all NFTs <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {previewNFTs.map((nft, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-2 hover:border-purple-500/50 transition-all group"
              >
                <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${nft.color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform`}>
                  {nft.badge}
                </div>
                <h3 className="font-bold text-white text-xs truncate">{nft.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono block">{nft.rarity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 9: LEARNING ANALYTICS ── */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" /> Learning Analytics & Activity
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Track growth, monthly course velocity, and assessment history</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">Total Hours: 148 hrs</span>
          </div>

          {/* Simple Clean Progress Visualizer */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Course Completion Growth (2026)</h4>
            <div className="h-40 flex items-end justify-between gap-2 pt-6 px-4 bg-slate-950 rounded-2xl border border-slate-800">
              {[
                { month: "Jan", count: 2 },
                { month: "Feb", count: 4 },
                { month: "Mar", count: 6 },
                { month: "Apr", count: 8 },
                { month: "May", count: 10 },
                { month: "Jun", count: 12 },
              ].map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.count}
                  </span>
                  <div
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#0056D2] to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                    style={{ height: `${(m.count / 12) * 100}%` }}
                  />
                  <span className="text-[11px] font-mono text-slate-400">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 10: BLOCKCHAIN VERIFICATION BANNER ── */}
        <section className="bg-gradient-to-r from-blue-900/40 via-indigo-950 to-slate-900 border border-blue-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Instant Employers & Recruiter Verification
            </h3>
            <p className="text-slate-300 text-xs md:text-sm">
              All courses, 38 assessments, and 12 certificates on this profile carry cryptographic signatures on Hardhat / Polygon blockchain.
            </p>
          </div>
          <Button
            className="bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs gap-2 shrink-0"
            onClick={() => setSelectedVerification({ type: "Full Profile Verification", hash: "0x9812a...74bf" })}
          >
            <ExternalLink className="w-4 h-4" /> Verify Full Profile On Explorer
          </Button>
        </section>
      </main>

      {/* 🎓 Certificate View Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="text-center space-y-2 border-b border-slate-800 pb-4">
              <span className="text-3xl">🎓</span>
              <h2 className="text-xl font-extrabold text-white">Soulbound Certificate</h2>
              <p className="text-xs text-blue-400 font-mono">{selectedCert.certId}</p>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient</span>
                <span className="text-white font-bold">Alex Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Course</span>
                <span className="text-white font-bold">{selectedCert.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Final Grade Score</span>
                <span className="text-emerald-400 font-bold">{selectedCert.score}% (Honor Pass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issued On</span>
                <span className="text-slate-200">{selectedCert.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction Hash</span>
                <span className="text-blue-400 font-mono">{selectedCert.txHash}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs gap-2"
                onClick={() => window.open("http://localhost:8545", "_blank")}
              >
                <ExternalLink className="w-4 h-4" /> Verify on Explorer
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs" onClick={() => setSelectedCert(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 🔗 Full Verification Modal */}
      {selectedVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setSelectedVerification(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">On-Chain Cryptographic Proof</h3>
                <p className="text-xs text-slate-400">BlockLearnX Smart Contract Registry</p>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div>Network: Hardhat Localhost (Chain ID: 31337)</div>
              <div>Contract: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0</div>
              <div>Status: CONFIRMED (12 Blocks)</div>
              <div>Signature: ed25519_verified_valid</div>
            </div>
            <Button
              className="w-full bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-semibold"
              onClick={() => setSelectedVerification(null)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
