"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Award, 
  Coins, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  ExternalLink, 
  ChevronRight, 
  Star, 
  Check, 
  Copy, 
  X, 
  Layers, 
  Zap, 
  GraduationCap,
  Calendar,
  Share2,
  Download,
  FileCheck,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";
import { getStudentData } from "@/lib/student-data";

export default function LearnerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Learner");
  const [walletAddr, setWalletAddr] = useState<string | null>(null);
  const [balanceMX, setBalanceMX] = useState(0);
  const [claimedDaily, setClaimedDaily] = useState(false);
  const [activeTab, setActiveTab] = useState<"in-progress" | "completed" | "certificates">("in-progress");
  
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [rewardsList, setRewardsList] = useState<any[]>([]);
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [nftsList, setNftsList] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  // Certificate inspection modal
  const [selectedCert, setSelectedCert] = useState<{
    id: string;
    title: string;
    university: string;
    instructor: string;
    network: string;
    tokenId: string;
    score: string;
    date: string;
    hash: string;
    skills: string[];
    grade: string;
    certCid?: string;
    metaCid?: string;
  } | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let userId = user?.id;

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      if (!userId) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/users`);
          if (res.ok) {
            const users = await res.json();
            if (Array.isArray(users) && users.length > 0) {
              const student = users.find((u: any) => u.role === "learner") || users[0];
              userId = student.id;
              setUserName(student.name || "Student Learner");
              setWalletAddr(student.wallet_address || null);
            }
          }
        } catch (e) {
          console.error("Failed to fetch default user:", e);
        }
      } else {
        setUserName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student Learner");
      }

      if (userId) {
        const studentData = await getStudentData(userId);
        setBalanceMX(Number(studentData.balance || 0));
        if (studentData.walletAddress) setWalletAddr(studentData.walletAddress);
        setRewardsList(studentData.rewards || []);
        setCertificatesList(studentData.certificates || []);
        setNftsList(studentData.nfts || []);
        setEnrolledCourses(studentData.enrollments || []);
      }

      try {
        const cRes = await fetch(`${BACKEND_URL}/api/courses`);
        if (cRes.ok) {
          const cData = await cRes.json();
          setAllCourses(Array.isArray(cData) ? cData : []);
        }
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const handleClaimDaily = () => {
    if (!claimedDaily) {
      setBalanceMX((prev) => prev + 25);
      setClaimedDaily(true);
    }
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const currentCourses = [
    {
      id: "blockchain-specialization",
      partner: "Stanford Online & Ethereum Foundation",
      partnerLogo: "🌲",
      category: "Blockchain",
      title: "Blockchain & Smart Contract Security Specialization",
      type: "Specialization (4 Courses)",
      progress: 65,
      currentLesson: "Course 3 of 4: Reentrancy Defense & Auditing",
      nextAssignment: "Programming Assignment: Deploy Reentrancy-Safe Vault",
      deadline: "Due Sun, Oct 5, 11:59 PM PDT",
      grade: "Grade: 98.4%",
      hoursLeft: "Approx. 3 hours left",
      totalLessons: "18 of 28 items complete",
      bountyReward: "+100 MX upon completion",
      bannerColor: "bg-gradient-to-r from-blue-900 to-indigo-900",
    },
    {
      id: "ai-agents-specialization",
      partner: "DeepLearning.AI & Decentralized AI Lab",
      partnerLogo: "🤖",
      category: "AI Basics",
      title: "AI Basics & Autonomous Web3 Agents Specialization",
      type: "Professional Certificate (3 Courses)",
      progress: 32,
      currentLesson: "Course 1 of 3: LangChain Autonomous Agent Execution",
      nextAssignment: "Lab: Build an AI Smart Contract Oracle",
      deadline: "Due Wed, Oct 8, 11:59 PM PDT",
      grade: "Grade: 95.0%",
      hoursLeft: "Approx. 6 hours left",
      totalLessons: "8 of 24 items complete",
      bountyReward: "+150 MX upon completion",
      bannerColor: "bg-gradient-to-r from-slate-900 to-blue-950",
    },
  ];

  const recentRewards = [
    {
      id: "r1",
      amount: "+20 MX",
      reason: "Daily Security Challenge Solved",
      timestamp: "12 mins ago",
      type: "challenge",
      badge: "Honors Streak",
    },
    {
      id: "r2",
      amount: "+50 MX",
      reason: "Smart Contract Reentrancy Quiz (100% Score)",
      timestamp: "2 hours ago",
      type: "quiz",
      badge: "Grade A+",
    },
    {
      id: "r3",
      amount: "+100 MX",
      reason: "DeFi AMM Capstone Lab Passed AI Audit",
      timestamp: "Yesterday",
      type: "milestone",
      badge: "AI Audited",
    },
    {
      id: "r4",
      amount: "+350 MX",
      reason: "Soulbound NFT Credential Mint Bounty",
      timestamp: "3 days ago",
      type: "nft",
      badge: "On-Chain Mint",
    },
  ];

  const certificates = [
    {
      id: "cert-1",
      title: "Senior Smart Contract Architect Specialization",
      university: "Stanford Online",
      instructor: "Prof. Dan Boneh & Dr. Tim Roughgarden",
      network: "Polygon zkEVM",
      tokenId: "#BLX-ARCH-9942",
      score: "99.4%",
      grade: "Grade Achieved: 99.4% (With Honors)",
      date: "September 18, 2025",
      hash: "0x8a92f7c19b4e33910cba71d88204b",
      skills: ["Solidity", "Security Auditing", "Gas Optimization", "Foundry", "EVM Bytecode"],
      sealColor: "text-[#0056D2]",
    },
    {
      id: "cert-2",
      title: "Autonomous AI Agent Developer Professional Certificate",
      university: "DeepLearning.AI",
      instructor: "Andrew Ng & Decentralized AI Team",
      network: "Arbitrum One",
      tokenId: "#BLX-AGNT-8831",
      score: "98.1%",
      grade: "Grade Achieved: 98.1%",
      date: "September 04, 2025",
      hash: "0x3f18a2e88a01cd79b1824409bb421",
      skills: ["LangChain", "Autonomous Oracles", "Python Web3", "ElizaOS", "LLM Fine-Tuning"],
      sealColor: "text-indigo-600",
    },
    {
      id: "cert-3",
      title: "Zero-Knowledge Circuit Engineering Specialization",
      university: "MIT Cryptography Lab",
      instructor: "Prof. Shafi Goldwasser & ZK Research Group",
      network: "Ethereum Mainnet",
      tokenId: "#BLX-ZK-7740",
      score: "99.8%",
      grade: "Grade Achieved: 99.8% (With Honors)",
      date: "August 22, 2025",
      hash: "0xd49bc816fa301183cfa61803719da",
      skills: ["Circom", "SnarkJS", "Groth16 Verifiers", "ZK-Rollups", "PLONK"],
      sealColor: "text-emerald-600",
    },
    {
      id: "cert-4",
      title: "DeFi Liquidity & Automated Market Maker Engineering",
      university: "Uniswap Foundation Academy",
      instructor: "Hayden Adams & DeFi Research Fellow",
      network: "Base Network",
      tokenId: "#BLX-DEFI-6619",
      score: "97.5%",
      grade: "Grade Achieved: 97.5%",
      date: "August 10, 2025",
      hash: "0x789ac910b23fe8841029cba483921",
      skills: ["Uniswap v4 Hooks", "Flash Loans", "Yield Farming", "ERC-4626 Vaults"],
      sealColor: "text-amber-600",
    },
  ];

  const recommendedCourses = [
    {
      id: "zk-specialization",
      partner: "MIT Cryptography Lab",
      title: "Zero-Knowledge Proofs & ZK-Rollup Engineering",
      type: "Specialization (4 Courses)",
      bounty: "+300 MX Bounty",
      level: "Advanced",
      duration: "3 - 6 Months • 8 hours/week",
      rating: "4.98",
      reviews: "(14.2k reviews)",
      skills: "Circom, SnarkJS, Groth16, Rollups",
      logo: "🏛️",
    },
    {
      id: "rust-solana",
      partner: "Solana Foundation Academy",
      title: "Rust & High-Performance Solana Program Development",
      type: "Professional Certificate",
      bounty: "+190 MX Bounty",
      level: "Intermediate",
      duration: "2 - 4 Months • 6 hours/week",
      rating: "4.88",
      reviews: "(9.8k reviews)",
      skills: "Rust, Anchor Framework, Sealevel",
      logo: "⚡",
    },
    {
      id: "cross-chain",
      partner: "Chainlink & LayerZero Labs",
      title: "Cross-Chain Interoperability & Oracle Architecture",
      type: "Specialization (3 Courses)",
      bounty: "+220 MX Bounty",
      level: "Advanced",
      duration: "2 - 3 Months • 7 hours/week",
      rating: "4.89",
      reviews: "(8.4k reviews)",
      skills: "CCIP, Relayers, Omnichain dApps",
      logo: "🌐",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 pb-20">
      
      {/* ========================================================
          1. COURSERA WELCOME BANNER & LEARNING GOAL TRACKER
          ======================================================== */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Greeting & Learning Streak */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-[#0056D2]">
                  BlockLearnX Plus Member
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  • Stanford &amp; DeepLearning.AI Scholar
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Welcome back, Sharukh
              </h1>

              <p className="text-slate-600 text-sm max-w-xl">
                You&apos;re on track! <strong className="text-slate-900 font-semibold">4 of 5 learning days completed</strong> this week. Keep up the momentum to earn your weekly streak bonus.
              </p>
            </div>

            {/* Daily Streak & Quick Claim Action */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 font-black text-xl">
                  🔥
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Learning Streak</p>
                  <p className="text-lg font-bold text-slate-900">14 Days Active</p>
                </div>
              </div>

              <div className="border-l border-slate-200 pl-4">
                <Button
                  onClick={handleClaimDaily}
                  disabled={claimedDaily}
                  className={`font-semibold text-xs px-4 py-2 h-auto rounded-lg transition-all ${
                    claimedDaily
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-[#0056D2] hover:bg-[#00419e] text-white shadow-xs"
                  }`}
                >
                  {claimedDaily ? "✓ +25 MX Claimed" : "Claim +25 MX"}
                </Button>
              </div>
            </div>

          </div>

          {/* Coursera-style Tab Filter Navigation */}
          <div className="flex items-center gap-8 border-b border-slate-200 mt-8 -mb-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === "in-progress"
                  ? "border-[#0056D2] text-[#0056D2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              In Progress (2)
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === "completed"
                  ? "border-[#0056D2] text-[#0056D2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Completed (2)
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === "certificates"
                  ? "border-[#0056D2] text-[#0056D2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Accomplishments &amp; Certificates (8)
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================
          2. MAIN DASHBOARD CONTENT AREA
          ======================================================== */}
      <main className="container mx-auto px-4 lg:px-8 pt-10 space-y-10">
        
        {/* ========================================================
            3. COURSERA METRICS STATS BAR
            MX Balance (2,450 MX) | Courses (4) | NFTs (8)
            ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: MX Token Balance */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                MX Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-mono">
                  {balanceMX.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-amber-600">MX</span>
              </div>
              <p className="text-xs text-emerald-600 font-medium">
                ≈ $612.50 USD • <span className="font-semibold">+18.4% this week</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Coins className="h-6 w-6" />
            </div>
          </div>

          {/* Card 2: Enrolled Courses */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Courses
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-mono">
                  4
                </span>
                <span className="text-xs text-slate-500">Enrolled</span>
              </div>
              <p className="text-xs text-slate-500">
                2 in progress • 2 completed with honors
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0056D2]">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>

          {/* Card 3: NFTs & Certificates */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                NFTs &amp; Certificates
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-mono">
                  8
                </span>
                <span className="text-xs text-slate-500">Credentials</span>
              </div>
              <p className="text-xs text-emerald-600 font-medium">
                100% Verified on Ethereum &amp; Polygon
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Award className="h-6 w-6" />
            </div>
          </div>

        </section>

        {/* ========================================================
            4. CURRENT COURSES (Blockchain 65%, AI Basics 32%) & RECENT REWARDS
            ======================================================== */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left: Coursera In-Progress Course Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Continue Learning
                </h2>
                <p className="text-xs text-slate-500">
                  Pick up right where you left off in your specializations.
                </p>
              </div>
              <Link 
                href="/courses" 
                className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1"
              >
                View all enrolled courses →
              </Link>
            </div>

            {/* Coursera Course List */}
            <div className="space-y-5">
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  {/* Partner Header Strip */}
                  <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <span className="text-base">{course.partnerLogo}</span>
                      <span>{course.partner}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{course.type}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-amber-100 text-amber-800">
                      {course.bountyReward}
                    </span>
                  </div>

                  {/* Course Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                          [{course.category}]
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {course.currentLesson}
                        </p>
                      </div>

                      {/* Grade Badge */}
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {course.grade}
                        </span>
                      </div>
                    </div>

                    {/* Next Assignment / Deadline Box */}
                    <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-2 font-semibold text-blue-900">
                        <Clock className="h-4 w-4 text-[#0056D2]" />
                        <span>{course.nextAssignment}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 pl-6">
                        <span>{course.deadline}</span>
                        <span>{course.hoursLeft}</span>
                      </div>
                    </div>

                    {/* Progress Bar & Metric */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{course.progress}% Complete</span>
                        <span className="text-slate-500 font-normal">{course.totalLessons}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-[#0056D2] rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coursera Action Footer */}
                  <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Next up: 1 Video (12 min) • 1 Practice Lab
                    </span>
                    <Button
                      asChild
                      className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs px-5 py-2 h-auto rounded-md shadow-xs"
                    >
                      <Link href={`/learn/${course.id === "blockchain-specialization" ? "solidity-fundamentals" : course.id === "ai-agents-specialization" ? "autonomous-web3-ai-agents" : course.id}`}>
                        Resume Course
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recent Rewards (+20 MX, +50 MX, +100 MX) & Weekly Goals */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coursera Recent Rewards Ledger */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Recent Rewards
              </h2>
              <p className="text-xs text-slate-500">
                Learner protocol rewards earned on-chain.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
              {recentRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">
                      {reward.reason}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200 font-semibold">
                        {reward.badge}
                      </span>
                      <span>•</span>
                      <span>{reward.timestamp}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black font-mono text-amber-600">
                      {reward.amount}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold text-[#0056D2] border-[#0056D2]/30 hover:bg-blue-50"
                >
                  View Complete Reward History
                </Button>
              </div>
            </div>

            {/* BlockLearnX Career & Hiring Passport Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  BlockLearnX Talent Passport
                </span>
              </div>
              <h3 className="text-lg font-bold">
                Share your verified credentials with Web3 recruiters
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your 8 Soulbound certificates and AI audit scores are visible to top hiring partners at Polygon, Uniswap, and Arbitrum.
              </p>
              <Button
                asChild
                className="w-full bg-white text-[#0056D2] hover:bg-slate-100 font-bold text-xs"
              >
                <Link href="#nft-certificates">
                  View Shareable Profile
                </Link>
              </Button>
            </div>

          </div>

        </div>

        {/* ========================================================
            5. BLOCKLEARNX VERIFIED CERTIFICATES & SOULBOUND NFTS (UNIQUE UI/UX)
            ======================================================== */}
        <section id="nft-certificates" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-100 text-[#0056D2] mb-2">
                <FileCheck className="h-3.5 w-3.5" />
                Official BlockLearnX Verified Certificates &amp; NFTs
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Earned Certificates &amp; NFT Rewards
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl">
                Cryptographically signed certificates issued by partner universities, verified on-chain via Soulbound (ERC-5192) standard.
              </p>
            </div>

            <span className="text-xs text-slate-500">
              8 Total Credentials Earned
            </span>
          </div>

          {/* Certificate Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(certificatesList.length > 0 ? [
              ...certificatesList.map((item: any) => ({
                id: item.certificate_id || String(item.id),
                title: item.courses?.title ? `${item.courses.title} Certificate` : "BlockLearnX Verified Certificate",
                university: "BlockLearnX University Academy",
                instructor: "BlockLearnX AI Auditor & Smart Contract Engine",
                network: "Ethereum Sepolia",
                tokenId: `#${item.token_id || "1"}`,
                score: "100%",
                grade: "Grade Achieved: 100% (Passed)",
                date: item.issued_at ? new Date(item.issued_at).toLocaleDateString() : "Recently Issued",
                hash: item.tx_hash || "0x7fe6ff2b8d9a052573c522152258016a232e977842212ca0745af01b1a8e5ad1",
                skills: ["Solidity", "Smart Contract Security", "EVM Architecture", "AI Verification"],
                sealColor: "text-[#0056D2]",
                certCid: item.certificate_id || String(item.id),
                svgUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/certificates/svg/${encodeURIComponent(item.certificate_id || item.id)}`,
              })),
              ...certificates.map(c => ({ ...c, svgUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/certificates/svg/${encodeURIComponent(c.id)}` })),
            ] : certificates.map(c => ({ ...c, svgUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/certificates/svg/${encodeURIComponent(c.id)}` }))).map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert as any)}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col group relative overflow-hidden"
              >
                {/* ── Certificate Preview Panel with QR aligned top-right ── */}
                <div className="relative w-full bg-slate-950 overflow-hidden rounded-t-xl border-b border-slate-200" style={{ minHeight: "180px" }}>
                  {/* Certificate SVG — fills the panel */}
                  <img
                    src={cert.svgUrl}
                    alt={cert.title}
                    className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    style={{ display: "block", minHeight: "180px", maxHeight: "200px" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
                  />
                  {/* QR code — top-right corner, neatly inset */}
                  <div className="absolute top-2.5 right-2.5 bg-white rounded-xl p-1.5 shadow-xl border border-slate-100 z-10" title="Scan to verify on-chain">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`http://localhost:3000/verify/certificate/${encodeURIComponent(cert.certCid || cert.id)}`)}`}
                      alt="Verify QR"
                      className="w-10 h-10 rounded-lg"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  {/* Verified badge — top-left */}
                  <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200 backdrop-blur-sm">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                  {/* Token ID — bottom-left */}
                  {cert.tokenId && (
                    <span className="absolute bottom-2 left-2.5 z-10 font-mono text-[10px] text-white/70 bg-black/50 rounded px-1.5 py-0.5">
                      {cert.tokenId}
                    </span>
                  )}
                </div>

                {/* ── Card Body ── */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {cert.university}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0056D2] transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-700">
                    {cert.grade}
                  </p>
                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Network: <strong className="text-slate-800">{cert.network}</strong></span>
                      <span className="font-mono text-[#0056D2] font-bold">SBT</span>
                    </div>
                    <div className="flex items-center justify-between text-[#0056D2] font-bold group-hover:underline">
                      <span>Inspect Certificate &amp; SVG</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. RECENT ACHIEVEMENTS & MILESTONES
            ======================================================== */}
        <section className="space-y-6 pt-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Recent Achievements
            </h2>
            <p className="text-xs text-slate-500">
              Honors badges, streak milestones, and verified competency awards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Bug Hunter Honors",
                desc: "Identified 5 security vulnerabilities in test contracts",
                icon: "⚡",
                badge: "Specialist",
                bg: "bg-blue-50 border-blue-200 text-[#0056D2]",
              },
              {
                title: "Dean's Honors List",
                desc: "Maintained >98% average on all university exams",
                icon: "🎓",
                badge: "Top Tier",
                bg: "bg-purple-50 border-purple-200 text-purple-700",
              },
              {
                title: "14-Day Streak Master",
                desc: "Consecutive daily lessons and smart contract commits",
                icon: "🔥",
                badge: "Active",
                bg: "bg-amber-50 border-amber-200 text-amber-700",
              },
              {
                title: "Top 5% Global Rank",
                desc: "Ranked #42 among 10,000+ registered Web3 developers",
                icon: "💎",
                badge: "Elite",
                bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
              },
            ].map((ach, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border ${ach.bg} shadow-2xs space-y-3 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ach.icon}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                    {ach.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            7. RECOMMENDED SPECIALIZATIONS
            ======================================================== */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Recommended Specializations for Sharukh
              </h2>
              <p className="text-xs text-slate-500">
                Explore popular degrees, certificates, and bounty programs from leading institutions.
              </p>
            </div>
            <Link href="/browse" className="text-xs font-bold text-[#0056D2] hover:underline">
              Explore All Specializations →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-lg bg-slate-50 border border-slate-100">
                      {rec.logo}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                      {rec.bounty}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-500">
                    {rec.partner}
                  </p>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0056D2] transition-colors leading-snug">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Skills: {rec.skills}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      {rec.rating}
                    </span>
                    <span className="text-slate-400">{rec.reviews}</span>
                    <span>•</span>
                    <span>{rec.level}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{rec.duration}</span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold px-4 rounded-md"
                  >
                    <Link href="/browse">
                      Enroll Free
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ========================================================
          8. OFFICIAL BLOCKLEARNX VERIFIED CERTIFICATE MODAL
          ======================================================== */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full border border-slate-300 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Generated Vector SVG Certificate View */}
            <div className="rounded-xl border border-slate-300 bg-slate-950 p-3 text-center overflow-hidden">
              <img
                src={(selectedCert as any).svgUrl || `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/certificates/svg/${encodeURIComponent(selectedCert.certCid || selectedCert.id || selectedCert.tokenId)}`}
                alt="Official Certificate SVG"
                className="w-full h-auto max-h-[420px] object-contain mx-auto"
              />
            </div>

            {/* Certificate Header Box */}
            <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {selectedCert.university}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {selectedCert.grade}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-slate-600">
                Instructors: {selectedCert.instructor} • Issued: {selectedCert.date}
              </p>
            </div>

            {/* On-Chain Soulbound Specs */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Token Standard:</span>
                <span className="font-bold text-slate-800">ERC-5192 (Soulbound Token)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Network:</span>
                <span className="font-bold text-slate-800">{selectedCert.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Token ID:</span>
                <span className="font-bold text-[#0056D2]">{selectedCert.tokenId}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">On-Chain Hash:</span>
                <button
                  onClick={() => handleCopyHash(selectedCert.hash)}
                  className="text-[#0056D2] font-bold hover:underline flex items-center gap-1"
                >
                  {selectedCert.hash.slice(0, 16)}...
                  {copiedHash ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Skills & Action Buttons */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">Verified Competencies:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-blue-50 text-[#0056D2] border border-blue-200 text-xs font-semibold">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={(selectedCert as any).svgUrl || `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/certificates/svg/${encodeURIComponent(selectedCert.certCid || selectedCert.id || selectedCert.tokenId)}`}
                  download={`Certificate-${selectedCert.id}.svg`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold py-3"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate (SVG)
                </a>
                <Link
                  href={`/verify/certificate/${encodeURIComponent(selectedCert.certCid || selectedCert.id || selectedCert.tokenId)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold py-3"
                >
                  <Share2 className="h-4 w-4" />
                  Verify On-Chain Page
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}


    </div>
  );
}
