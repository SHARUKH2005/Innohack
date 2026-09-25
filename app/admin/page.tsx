"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import {
  ShieldCheck,
  Users,
  Building2,
  BookOpen,
  Award,
  Coins,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  DollarSign,
  Activity,
  Layers,
  Settings,
  ExternalLink,
  Shield,
  FileCheck,
  UserCheck,
  Ban,
  Check,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "providers" | "courses" | "nfts" | "marketplace" | "transactions" | "finance"
  >("overview");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Platform Metrics
  const stats = [
    { title: "Total Users", value: "25,420", icon: Users, color: "text-blue-400", change: "+12.4% this mo" },
    { title: "Learners", value: "22,100", icon: Users, color: "text-emerald-400", change: "+14.1%" },
    { title: "Course Providers", value: "3,280", icon: Building2, color: "text-purple-400", change: "+8.2%" },
    { title: "Total Courses", value: "1,240", icon: BookOpen, color: "text-[#0056D2]", change: "+45 new" },
    { title: "NFTs Issued", value: "18,500", icon: Award, color: "text-amber-400", change: "+2.1k soulbound" },
    { title: "Transactions", value: "42,350", icon: Activity, color: "text-cyan-400", change: "+100% on-chain" },
    { title: "Platform Revenue", value: "₹18.5L", icon: DollarSign, color: "text-emerald-400", change: "15% platform fee" },
  ];

  // Course Approval Moderation Queue
  const [pendingCourses, setPendingCourses] = useState([
    {
      id: "course-mod-1",
      title: "Solidity Advanced Security & Flashloan Exploits",
      provider: "CryptoSec University",
      category: "Blockchain",
      price: "150 MX",
      submittedDate: "Sep 24, 2026",
      status: "Pending Review",
      modules: 10,
    },
    {
      id: "course-mod-2",
      title: "Zero Knowledge Proofs & Circom Circuits",
      provider: "ZK Academy",
      category: "Cryptography",
      price: "250 MX",
      submittedDate: "Sep 23, 2026",
      status: "Pending Review",
      modules: 14,
    },
    {
      id: "course-mod-3",
      title: "AI Agentic Development with LangChain & Next.js",
      provider: "AI Masters Guild",
      category: "Artificial Intelligence",
      price: "100 MX",
      submittedDate: "Sep 22, 2026",
      status: "Pending Review",
      modules: 8,
    },
  ]);

  // Provider Verification Queue
  const [providersList, setProvidersList] = useState([
    { id: "prov-1", name: "IIT Madras Web3 Lab", email: "web3@iitm.ac.in", coursesCount: 8, status: "Verified", rating: 4.9 },
    { id: "prov-2", name: "Vitalik Code Academy", email: "info@vitalikacademy.org", coursesCount: 12, status: "Verified", rating: 4.8 },
    { id: "prov-3", name: "CyberSec Guild India", email: "contact@cybersec.in", coursesCount: 3, status: "Pending Verification", rating: 4.5 },
    { id: "prov-4", name: "DeFi Research Institute", email: "admin@defiresearch.io", coursesCount: 5, status: "Pending Verification", rating: 4.7 },
  ]);

  const approveCourse = (id: string) => {
    setPendingCourses(pendingCourses.filter((c) => c.id !== id));
    setActionSuccess("Course approved successfully! Published to platform catalog.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const rejectCourse = (id: string) => {
    setPendingCourses(pendingCourses.filter((c) => c.id !== id));
    setActionSuccess("Course returned to provider with feedback notes.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const toggleVerifyProvider = (id: string) => {
    setProvidersList(
      providersList.map((p) =>
        p.id === id ? { ...p, status: p.status === "Verified" ? "Pending Verification" : "Verified" } : p
      )
    );
    setActionSuccess("Provider verification status updated.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-[#0056D2] selection:text-white pb-16">
      <Navbar />

      {/* Hero Header */}
      <div className="relative border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 py-10 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5" />
                Ecosystem Administration Portal
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
                🛡️ Platform Admin Control Center
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
                Manage global platform users, provider verification, course moderation approvals, protocol tokenomics, and marketplace integrity.
              </p>
            </div>

            {/* Quick Demo Ecosystem Flow Indicator */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-md shrink-0 space-y-2 max-w-md">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block">
                ⚡ Interactive Role Flow
              </span>
              <div className="text-xs text-slate-300 font-mono space-y-1">
                <div>🛡️ Admin verifies Provider → 👨‍🏫 Provider creates Course → 🎓 Learner learns &amp; earns → 🔗 Blockchain verifies</div>
              </div>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="mt-8 flex items-center gap-2 border-b border-slate-800/80 pb-px overflow-x-auto">
            {[
              { id: "overview", label: "📊 Overview" },
              { id: "courses", label: "📚 Course Moderation Queue" },
              { id: "providers", label: "👨‍🏫 Provider Verification" },
              { id: "users", label: "👥 User Management" },
              { id: "nfts", label: "🖼️ NFT & Soulbound Protocol" },
              { id: "marketplace", label: "🛒 Marketplace Moderation" },
              { id: "finance", label: "💰 Platform Revenue & Fees" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#0056D2] text-[#0056D2] bg-blue-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 py-8 flex-1 space-y-8">
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {actionSuccess}
            </span>
            <button onClick={() => setActionSuccess(null)}>✕</button>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 7 Key Admin Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">{s.title}</span>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-white">{s.value}</div>
                    <span className="text-[11px] text-slate-500 font-mono block">{s.change}</span>
                  </div>
                );
              })}
            </div>

            {/* Moderation Quick Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Moderation Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-purple-400" /> Pending Course Submissions ({pendingCourses.length})
                  </h3>
                  <button onClick={() => setActiveTab("courses")} className="text-xs font-semibold text-[#0056D2] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {pendingCourses.slice(0, 2).map((c) => (
                    <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-white text-sm">{c.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">By {c.provider} • Submitted {c.submittedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => approveCourse(c.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-8 px-3">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => rejectCourse(c.id)} className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-8 px-3">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Provider Verification Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" /> Provider Verification Status
                  </h3>
                  <button onClick={() => setActiveTab("providers")} className="text-xs font-semibold text-[#0056D2] hover:underline">
                    Manage →
                  </button>
                </div>

                <div className="space-y-3">
                  {providersList.map((p) => (
                    <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-white text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{p.email} • {p.coursesCount} Courses</p>
                      </div>
                      <button
                        onClick={() => toggleVerifyProvider(p.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                          p.status === "Verified"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {p.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COURSES MODERATION TAB */}
        {activeTab === "courses" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Course Moderation Queue</h2>
              <p className="text-xs text-slate-400 mt-1">Review provider curriculum submissions before live deployment to platform.</p>
            </div>

            <div className="space-y-4">
              {pendingCourses.map((c) => (
                <div key={c.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase">
                        {c.category}
                      </span>
                      <span className="text-xs text-slate-500">{c.modules} Modules</span>
                    </div>
                    <h3 className="font-bold text-white text-base">{c.title}</h3>
                    <p className="text-xs text-slate-400">Provider: {c.provider} • Pricing: {c.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={() => approveCourse(c.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1">
                      <Check className="w-4 h-4" /> Approve &amp; Publish
                    </Button>
                    <Button variant="outline" onClick={() => rejectCourse(c.id)} className="border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs gap-1">
                      <XCircle className="w-4 h-4" /> Reject Submission
                    </Button>
                  </div>
                </div>
              ))}

              {pendingCourses.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  🎉 No pending course submissions. Moderation queue is clear!
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROVIDER VERIFICATION TAB */}
        {activeTab === "providers" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Course Provider Accreditation</h2>
              <p className="text-xs text-slate-400 mt-1">Verify university &amp; guild instructor accounts to issue soulbound certificates.</p>
            </div>

            <div className="space-y-3">
              {providersList.map((p) => (
                <div key={p.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{p.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{p.email} • Rating: ⭐ {p.rating} • {p.coursesCount} Published Courses</p>
                  </div>

                  <Button
                    onClick={() => toggleVerifyProvider(p.id)}
                    className={p.status === "Verified" ? "bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs" : "bg-[#0056D2] text-white hover:bg-[#00419e] text-xs font-bold"}
                  >
                    {p.status === "Verified" ? "Revoke Verification" : "Verify Provider Account"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVENUE & FINANCE TAB */}
        {activeTab === "finance" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Platform Finance &amp; Protocol Fee Split</h2>
              <p className="text-xs text-slate-400 mt-1">Automated smart contract fee distribution metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Provider Share (85%)</span>
                <div className="text-2xl font-bold text-emerald-400">₹15.72L</div>
                <p className="text-[11px] text-slate-500">Distributed to course instructors</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Protocol Treasury (10%)</span>
                <div className="text-2xl font-bold text-blue-400">₹1.85L</div>
                <p className="text-[11px] text-slate-500">Platform maintenance &amp; gas subsidies</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">Learner MX Pool (5%)</span>
                <div className="text-2xl font-bold text-amber-400">₹0.92L</div>
                <p className="text-[11px] text-slate-500">Funded for quiz bounties</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
