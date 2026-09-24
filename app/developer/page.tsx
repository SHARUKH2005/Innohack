"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Coins,
  Award,
  Sparkles,
  ShoppingBag,
  HeartHandshake,
  ArrowLeftRight,
  BarChart3,
  ShieldCheck,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Lock,
  Eye,
  ArrowUpRight,
  Flame,
  ShieldAlert,
  Cpu,
  Layers,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Activity,
  Check,
  Sliders,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

// SECTION KEYS
type AdminSection =
  | "dashboard"
  | "users"
  | "providers"
  | "courses"
  | "mxtoken"
  | "rewards"
  | "nftstudio"
  | "certificates"
  | "marketplace"
  | "community"
  | "transactions"
  | "analytics"
  | "security"
  | "auditlogs"
  | "settings";

export default function PlatformProviderControlCenter() {
  const { user, loginAs } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [emergencyPaused, setEmergencyPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // AUDIT LOGS STATE
  const [auditLogs, setAuditLogs] = useState([
    { id: "log-1", admin: "Platform Owner", action: "Approved Course Provider 'Dr. Elena Rostova'", time: "10:51 AM", type: "success" },
    { id: "log-2", admin: "Platform Owner", action: "Updated Assessment Reward Rule (90-100 → 30 MX)", time: "10:42 AM", type: "info" },
    { id: "log-3", admin: "System Auto-Engine", action: "Minted Soulbound Cert #4821 to 0x82A...11F4", time: "09:30 AM", type: "system" },
    { id: "log-4", admin: "Platform Owner", action: "Adjusted Marketplace Fee to 2.5%", time: "Yesterday", type: "info" },
    { id: "log-5", admin: "Platform Owner", action: "Approved Community Fund Request (100 MX to Rahul)", time: "Yesterday", type: "success" },
  ]);

  const addAuditLog = (action: string) => {
    const newLog = {
      id: `log-${Date.now()}`,
      admin: "Platform Owner",
      action,
      time: "Just now",
      type: "success"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. PROVIDERS STATE
  const [providers, setProviders] = useState([
    { id: "p1", name: "Alice Vance", courses: 12, students: "2,341", rating: 4.9, status: "Active", earnings: "14,250 MX" },
    { id: "p2", name: "Bob Martinez", courses: 8, students: "1,124", rating: 4.8, status: "Active", earnings: "8,920 MX" },
    { id: "p3", name: "Dr. Elena Rostova", courses: 2, students: "380", rating: 4.9, status: "Pending Review", earnings: "0 MX" },
    { id: "p4", name: "Dmitri Volkov", courses: 1, students: "0", rating: 0, status: "Pending Review", earnings: "0 MX" },
    { id: "p5", name: "Cipher Academy", courses: 5, students: "850", rating: 4.6, status: "Active", earnings: "5,400 MX" },
  ]);

  // 2. USERS STATE
  const [usersList, setUsersList] = useState([
    { id: "u1", name: "Marcus Taylor", email: "learner@blocklearnx.io", role: "Learner", wallet: "0x82A...11F4", mx: 420, certs: 3, nfts: 4, status: "Active" },
    { id: "u2", name: "Dr. Sarah Chen", email: "provider@blocklearnx.io", role: "Course Provider", wallet: "0x39B...88D1", mx: 3850, certs: 0, nfts: 2, status: "Active" },
    { id: "u3", name: "Alex Vance", email: "developer@blocklearnx.io", role: "Platform Owner", wallet: "0x71C...49A2", mx: 50000, certs: 10, nfts: 8, status: "Active" },
    { id: "u4", name: "Rahul Sharma", email: "rahul.s@edu.org", role: "Learner", wallet: "0x91F...AA21", mx: 80, certs: 1, nfts: 1, status: "Active" },
    { id: "u5", name: "Dev Suspended", email: "flagged@bot.xyz", role: "Learner", wallet: "0x111...0000", mx: 0, certs: 0, nfts: 0, status: "Suspended" },
  ]);

  // 3. COURSES STATE
  const [coursesList, setCoursesList] = useState([
    { id: "c1", title: "Solidity Smart Contract Development", provider: "Alice Vance", price: "Free", students: 1420, passRate: "92%", rewards: "7,100 MX", status: "Published" },
    { id: "c2", title: "DeFi Protocols & Liquidity Pools", provider: "Bob Martinez", price: "25 MX", students: 890, passRate: "86%", rewards: "4,450 MX", status: "Published" },
    { id: "c3", title: "Zero-Knowledge Proofs Masterclass", provider: "Dr. Elena Rostova", price: "50 MX", students: 0, passRate: "-", rewards: "0 MX", status: "Pending Approval" },
    { id: "c4", title: "NFT Marketplace Architecture", provider: "Alice Vance", price: "Free", students: 480, passRate: "89%", rewards: "2,400 MX", status: "Published" },
  ]);

  // 4. REWARD RULES STATE
  const [rewardRules, setRewardRules] = useState([
    { id: "r1", category: "Assessment", condition: "Score 90–100%", reward: "30 MX", active: true },
    { id: "r2", category: "Assessment", condition: "Score 80–89%", reward: "20 MX", active: true },
    { id: "r3", category: "Assessment", condition: "Score 70–79%", reward: "15 MX", active: true },
    { id: "r4", category: "Assessment", condition: "Score 60–69%", reward: "10 MX", active: true },
    { id: "r5", category: "Assessment", condition: "Score 50–59%", reward: "5 MX", active: true },
    { id: "r6", category: "Course Completion", condition: "Complete Course (100% lessons)", reward: "50 MX", active: true },
    { id: "r7", category: "Assignment", condition: "Assignment Grade ≥ 80%", reward: "20 MX", active: true },
    { id: "r8", category: "Certification", condition: "Course Complete + Assessment Passed", reward: "Cert NFT + 30 MX", active: true },
    { id: "r9", category: "Achievement", condition: "Complete 5 Web3 Courses", reward: "Master NFT + 100 MX", active: true },
  ]);

  // 5. COMMUNITY FUND REQUESTS
  const [supportRequests, setSupportRequests] = useState([
    { id: "req-1", student: "Rahul Sharma", reason: "Course fee sponsorship for Advanced DeFi", requested: "100 MX", status: "Pending" },
    { id: "req-2", student: "Fatima Al-Mansoor", reason: "Hardware grant for zk-Rollup research module", requested: "250 MX", status: "Pending" },
    { id: "req-3", student: "Leo Chen", reason: "First-generation learner Web3 onboarding", requested: "50 MX", status: "Approved" },
  ]);

  // 6. BLOCKCHAIN TRANSACTIONS
  const [transactions, setTransactions] = useState([
    { id: "tx-1", type: "Reward", user: "Rahul Sharma", amount: "20 MX", status: "Success", hash: "0x89f2b1a8d0c91726354e...821" },
    { id: "tx-2", type: "NFT Mint", user: "Arun Patel", amount: "Avatar #142", status: "Success", hash: "0x33a19b8821ec90141f22...419" },
    { id: "tx-3", type: "Certificate", user: "Priya Nair", amount: "Soulbound #981", status: "Success", hash: "0x11e479ac98024fa82110...772" },
    { id: "tx-4", type: "Donation", user: "Community Supporter #42", amount: "100 MX", status: "Success", hash: "0xbb70321a00941dfa9201...120" },
    { id: "tx-5", type: "Marketplace", user: "Alex Vance", amount: "250 MX", status: "Success", hash: "0xfa9102c910385920ba11...098" },
    { id: "tx-6", type: "Reward", user: "Marcus Taylor", amount: "30 MX", status: "Success", hash: "0x61a809fec9182374619a...331" },
  ]);

  // ACTION HANDLERS
  const handleApproveProvider = (id: string, name: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: "Active" } : p));
    addAuditLog(`Approved Course Provider: ${name}`);
    showNotice(`Provider '${name}' approved successfully!`);
  };

  const handleSuspendProvider = (id: string, name: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: "Suspended" } : p));
    addAuditLog(`Suspended Course Provider: ${name}`);
    showNotice(`Provider '${name}' suspended.`);
  };

  const handleApproveCourse = (id: string, title: string) => {
    setCoursesList(prev => prev.map(c => c.id === id ? { ...c, status: "Published" } : c));
    addAuditLog(`Published & Approved Course: ${title}`);
    showNotice(`Course '${title}' published to public catalog!`);
  };

  const handleToggleUserStatus = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    addAuditLog(`${nextStatus === "Suspended" ? "Suspended" : "Restored"} user account: ${name}`);
    showNotice(`User '${name}' is now ${nextStatus}.`);
  };

  const handleApproveFund = (id: string, student: string, amt: string) => {
    setSupportRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    addAuditLog(`Approved Community Fund distribution of ${amt} to ${student}`);
    showNotice(`Distributed ${amt} to ${student} via Community Multisig!`);
  };

  const handleRejectFund = (id: string, student: string) => {
    setSupportRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
    addAuditLog(`Rejected Community Fund request for ${student}`);
    showNotice(`Fund request for ${student} rejected.`);
  };

  const handleToggleEmergencyPause = () => {
    const next = !emergencyPaused;
    setEmergencyPaused(next);
    addAuditLog(next ? "EMERGENCY PAUSE TRIGGERED across all contracts" : "Emergency Pause lifted. Protocol operational");
    showNotice(next ? "CRITICAL: All smart contracts & reward engines PAUSED!" : "All smart contracts resumed.");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* TOP STATUS BAR */}
      <header className="h-16 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wide text-white flex items-center gap-1.5">
                BLOCKLEARNX
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 uppercase font-semibold">
                  Platform Control Center
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Global Action & Indicator */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={emergencyPaused ? "destructive" : "outline"}
            onClick={handleToggleEmergencyPause}
            className={`text-xs font-semibold h-8 border ${
              emergencyPaused
                ? "bg-red-600 text-white animate-pulse"
                : "border-red-500/40 text-red-400 hover:bg-red-500/10"
            }`}
          >
            {emergencyPaused ? (
              <>
                <Play className="w-3.5 h-3.5 mr-1.5" /> RESUME PROTOCOL
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 mr-1.5" /> EMERGENCY PAUSE
              </>
            )}
          </Button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Base / Polygon Amoy</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs">
              PO
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold text-slate-200">Alex Vance</div>
              <div className="text-[10px] text-slate-400">Platform Owner</div>
            </div>
          </div>
        </div>
      </header>

      {/* NOTICE TOAST */}
      {notice && (
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-semibold px-4 py-2 text-center shadow-lg transition-all animate-in fade-in sticky top-16 z-30">
          {notice}
        </div>
      )}

      {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-slate-800 bg-[#0A0E1A] shrink-0 hidden md:flex flex-col justify-between py-4 px-3 overflow-y-auto">
          <div className="space-y-6">
            {/* GROUP 1: OVERVIEW */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                OVERVIEW
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "dashboard"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Platform Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveSection("users")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "users"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>User Management</span>
                </button>

                <button
                  onClick={() => setActiveSection("providers")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "providers"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Course Providers</span>
                  <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">2</span>
                </button>

                <button
                  onClick={() => setActiveSection("courses")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "courses"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Course Catalog Hub</span>
                </button>
              </div>
            </div>

            {/* GROUP 2: WEB3 & ECONOMY */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                WEB3 & ECONOMY
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection("mxtoken")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "mxtoken"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>MX Token Control</span>
                </button>

                <button
                  onClick={() => setActiveSection("rewards")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "rewards"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Reward Rules Engine</span>
                </button>

                <button
                  onClick={() => setActiveSection("nftstudio")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "nftstudio"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>NFT Studio</span>
                </button>

                <button
                  onClick={() => setActiveSection("certificates")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "certificates"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Certificates System</span>
                </button>

                <button
                  onClick={() => setActiveSection("marketplace")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "marketplace"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-pink-400" />
                  <span>Marketplace Rules</span>
                </button>

                <button
                  onClick={() => setActiveSection("community")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "community"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                  <span>Community Fund</span>
                  <span className="ml-auto text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold">2</span>
                </button>
              </div>
            </div>

            {/* GROUP 3: OPERATIONS & AUDIT */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                OPERATIONS & AUDIT
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection("transactions")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "transactions"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Blockchain Transactions</span>
                </button>

                <button
                  onClick={() => setActiveSection("analytics")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "analytics"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Platform Analytics</span>
                </button>

                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "security"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Security Center</span>
                </button>

                <button
                  onClick={() => setActiveSection("auditlogs")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "auditlogs"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>Audit Logs</span>
                </button>

                <button
                  onClick={() => setActiveSection("settings")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === "settings"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Platform Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <Link href="/" className="block">
              <Button size="sm" variant="outline" className="w-full text-xs border-slate-700 bg-slate-900 text-slate-300 hover:text-white">
                ← Public Homepage
              </Button>
            </Link>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 bg-[#0B0F19] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* MOBILE SECTION SWITCHER */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(["dashboard", "users", "providers", "courses", "mxtoken", "rewards", "nftstudio", "certificates", "marketplace", "community", "transactions", "analytics", "security", "auditlogs", "settings"] as AdminSection[]).map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                  activeSection === s ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ========================================================= */}
          {/* 1. PLATFORM DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Platform Overview</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Master administrative telemetries, smart contract reserves & ecosystem activity
                </p>
              </div>

              {/* 8 Metric KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Total Users</span>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">12,540</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">↑ +840 this week</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Courses Live</span>
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">284</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">12 pending review</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>MX Distributed</span>
                    <Coins className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">8,425,000 <span className="text-xs text-slate-400 font-normal">MX</span></div>
                  <div className="text-[11px] text-amber-400 font-medium mt-1">of 50,000,000 Total</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>NFTs Minted</span>
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">8,421</div>
                  <div className="text-[11px] text-purple-400 font-medium mt-1">Avatars & Achievements</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Course Providers</span>
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">86</div>
                  <div className="text-[11px] text-amber-400 font-medium mt-1">2 pending approval</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Certificates Issued</span>
                    <FileText className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">4,821</div>
                  <div className="text-[11px] text-teal-400 font-medium mt-1">100% On-Chain Soulbound</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Marketplace Trades</span>
                    <ShoppingBag className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">1,293</div>
                  <div className="text-[11px] text-pink-400 font-medium mt-1">2.5% protocol fee active</div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Community Fund</span>
                    <HeartHandshake className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">52,400 <span className="text-xs text-slate-400 font-normal">MX</span></div>
                  <div className="text-[11px] text-rose-400 font-medium mt-1">31,250 MX distributed</div>
                </div>
              </div>

              {/* Two Panel Grid: Automated Reward Engine + Live Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* AUTOMATED REWARD ENGINE CARD */}
                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h2 className="font-bold text-sm text-white">Automated Reward Engine</h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 font-mono">
                    <div className="text-slate-400">Flow: Assessment Complete → Backend AI Verification → Criteria Check → Smart Contract Mint → Wallet Deposit</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Triggered Today</div>
                      <div className="text-xl font-bold text-white mt-1">428</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-xs text-emerald-400">Successful</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1">421</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-xs text-red-400">Pending / Failed</div>
                      <div className="text-xl font-bold text-amber-400 mt-1">7</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                    <span>MX Distributed Today: <strong className="text-white">8,240 MX</strong></span>
                    <button onClick={() => setActiveSection("rewards")} className="text-red-400 hover:underline">
                      Configure Rules →
                    </button>
                  </div>
                </div>

                {/* LIVE RECENT TRANSACTIONS */}
                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <h2 className="font-bold text-sm text-white">Recent Protocol Activity</h2>
                    </div>
                    <button onClick={() => setActiveSection("transactions")} className="text-xs text-slate-400 hover:text-white">
                      View all ({transactions.length})
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/80">
                    {transactions.slice(0, 4).map(tx => (
                      <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            tx.type === "Reward" ? "bg-amber-500/20 text-amber-400" :
                            tx.type === "Certificate" ? "bg-teal-500/20 text-teal-400" :
                            tx.type === "NFT Mint" ? "bg-purple-500/20 text-purple-400" :
                            "bg-rose-500/20 text-rose-400"
                          }`}>
                            {tx.type}
                          </span>
                          <span className="font-medium text-slate-200">{tx.user}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-300 font-semibold">{tx.amount}</span>
                          <span className="text-emerald-400">✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. USER MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Learners, Course Providers, Admins, wallets, and account status controls
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">
                    Total: {usersList.length} Accounts
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Wallet</th>
                        <th className="py-3 px-4">MX Balance</th>
                        <th className="py-3 px-4">NFTs / Certs</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400">{u.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{u.wallet}</td>
                          <td className="py-3 px-4 font-bold text-amber-400">{u.mx} MX</td>
                          <td className="py-3 px-4">{u.nfts} NFTs • {u.certs} Certs</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              u.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleUserStatus(u.id, u.name, u.status)}
                              className={`h-7 text-[11px] ${
                                u.status === "Active"
                                  ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                  : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                              }`}
                            >
                              {u.status === "Active" ? "Suspend" : "Restore"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. COURSE PROVIDER MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "providers" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Course Provider Management</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Approve, reject, suspend, and monitor educators & course publishing quality
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Provider</th>
                        <th className="py-3 px-4">Courses</th>
                        <th className="py-3 px-4">Students</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4">Total Earnings</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Approval Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {providers.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                          <td className="py-3 px-4 font-mono">{p.courses}</td>
                          <td className="py-3 px-4">{p.students}</td>
                          <td className="py-3 px-4 text-amber-400">{p.rating > 0 ? `${p.rating} ★` : "-"}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{p.earnings}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              p.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                              p.status === "Suspended" ? "bg-red-500/10 text-red-400" :
                              "bg-amber-500/10 text-amber-400"
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {p.status === "Pending Review" ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveProvider(p.id, p.name)}
                                  className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSuspendProvider(p.id, p.name)}
                                  className="h-7 text-[11px] border-red-500/30 text-red-400 hover:bg-red-500/10"
                                >
                                  Reject
                                </Button>
                              </>
                            ) : p.status === "Active" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSuspendProvider(p.id, p.name)}
                                className="h-7 text-[11px] border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                Suspend
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApproveProvider(p.id, p.name)}
                                className="h-7 text-[11px] border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                              >
                                Restore
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. COURSE MANAGEMENT */}
          {/* ========================================================= */}
          {activeSection === "courses" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Course Management</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Complete visibility across all courses, pass rates, rewards distributed, and publish status
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Course Title</th>
                        <th className="py-3 px-4">Provider</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Students</th>
                        <th className="py-3 px-4">Pass Rate</th>
                        <th className="py-3 px-4">MX Distributed</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {coursesList.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">{c.title}</td>
                          <td className="py-3 px-4 text-slate-400">{c.provider}</td>
                          <td className="py-3 px-4 font-bold text-amber-400">{c.price}</td>
                          <td className="py-3 px-4 font-mono">{c.students}</td>
                          <td className="py-3 px-4 text-emerald-400">{c.passRate}</td>
                          <td className="py-3 px-4">{c.rewards}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              c.status === "Published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {c.status === "Pending Approval" ? (
                              <Button
                                size="sm"
                                onClick={() => handleApproveCourse(c.id, c.title)}
                                className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                Approve & Publish
                              </Button>
                            ) : (
                              <span className="text-[11px] text-slate-500">Live</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. MX TOKEN CONTROL CENTER */}
          {/* ========================================================= */}
          {activeSection === "mxtoken" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">MX Token Control Center</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Ecosystem tokenomics, reward pools, treasury reserves, and distribution policies
                </p>
              </div>

              {/* 5 Pool Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Total Supply</div>
                  <div className="text-xl font-black text-white mt-1">50,000,000</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Fixed Hard Cap</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-emerald-400">Distributed</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">8,425,000</div>
                  <div className="text-[10px] text-emerald-400/70 mt-0.5">16.85% to Learners</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Remaining</div>
                  <div className="text-xl font-black text-slate-200 mt-1">41,575,000</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Unminted / In Reserve</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-amber-400">Treasury Vault</div>
                  <div className="text-xl font-black text-amber-400 mt-1">30,000,000</div>
                  <div className="text-[10px] text-amber-400/70 mt-0.5">Multisig Secured</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-purple-400">Rewards Pool</div>
                  <div className="text-xl font-black text-purple-400 mt-1">10,000,000</div>
                  <div className="text-[10px] text-purple-400/70 mt-0.5">Automated Engine</div>
                </div>
              </div>

              {/* Policy & Security Note */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  Security Governance Notice
                </div>
                <p className="text-slate-300 leading-relaxed">
                  As per BlockLearnX security guidelines, arbitrary manual transfers to individual addresses are disabled from the UI.
                  All token distributions must flow through verified <strong>Reward Rules</strong> or the <strong>Multisig Community Fund</strong>.
                </p>
              </div>

              {/* Token Contract Details */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-white">Smart Contract Technical Data</h3>
                <div className="grid md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Contract Address:</span>
                    <span className="text-amber-400">0x5FbDB2315678afecb367f032d93F642f64180aa3</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Decimals / Standard:</span>
                    <span>18 Decimals • ERC-20 with Burn Mechanism</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. REWARD RULES */}
          {/* ========================================================= */}
          {activeSection === "rewards" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Reward Rules Engine</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Automated smart contract payout brackets for quiz scores, course milestones, and achievements
                  </p>
                </div>
                <Button size="sm" onClick={() => showNotice("Rule creation modal: define criteria & MX reward")} className="bg-red-600 hover:bg-red-700 text-white text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Create New Rule
                </Button>
              </div>

              {/* Reward Rules Table */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Evaluation Condition</th>
                      <th className="py-3 px-4">Automated Reward</th>
                      <th className="py-3 px-4">Engine Status</th>
                      <th className="py-3 px-4 text-right">Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {rewardRules.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white">{r.category}</td>
                        <td className="py-3 px-4 font-mono text-slate-200">{r.condition}</td>
                        <td className="py-3 px-4 font-bold text-amber-400">{r.reward}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            r.active ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                          }`}>
                            {r.active ? "ACTIVE" : "DISABLED"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setRewardRules(prev => prev.map(item => item.id === r.id ? { ...item, active: !item.active } : item));
                              addAuditLog(`Toggled reward rule '${r.condition}'`);
                              showNotice("Reward rule status updated.");
                            }}
                            className="h-7 text-[11px] text-slate-400 hover:text-white"
                          >
                            {r.active ? "Disable" : "Enable"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. NFT STUDIO */}
          {/* ========================================================= */}
          {activeSection === "nftstudio" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">NFT Studio</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Design and configure official Achievement, Avatar, and Special Event NFTs
                  </p>
                </div>
                <Button size="sm" onClick={() => showNotice("NFT Designer launched: define metadata & artwork")} className="bg-red-600 hover:bg-red-700 text-white text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Mint New Collection
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                    🏆
                  </div>
                  <h3 className="font-bold text-white text-sm">Blockchain Master (Achievement)</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>✓ Complete Blockchain Fundamentals</div>
                    <div>✓ Score ≥ 80% on Final Exam</div>
                    <div className="text-amber-400 font-semibold pt-1">Reward: NFT + 30 MX</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                    🧙‍♂️
                  </div>
                  <h3 className="font-bold text-white text-sm">Cyber Scholar Avatar</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>✓ Study streak of 14 consecutive days</div>
                    <div>✓ Complete 3 course evaluations</div>
                    <div className="text-amber-400 font-semibold pt-1">Reward: 3D Avatar NFT</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                    ⚡
                  </div>
                  <h3 className="font-bold text-white text-sm">Hackathon Genesis NFT</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>✓ Submit project to BlockLearnX Arena</div>
                    <div>✓ Peer reviewed by 3 educators</div>
                    <div className="text-amber-400 font-semibold pt-1">Reward: Limited NFT + 150 MX</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. CERTIFICATES */}
          {/* ========================================================= */}
          {activeSection === "certificates" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Certificate Management</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Non-transferable Soulbound ERC-721 credentials, IPFS metadata, and revocation authority
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Total Issued</div>
                  <div className="text-2xl font-black text-white mt-1">4,821</div>
                  <div className="text-xs text-teal-400 mt-1">Soulbound Non-Transferable</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Verification</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">14</div>
                  <div className="text-xs text-slate-400 mt-1">Awaiting IPFS pinning</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Revoked</div>
                  <div className="text-2xl font-black text-red-400 mt-1">2</div>
                  <div className="text-xs text-slate-400 mt-1">Plagiarism flags</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-3 text-xs">
                <h3 className="font-bold text-white text-sm">Certificate Verification Engine</h3>
                <p className="text-slate-400">
                  Every certificate contains a cryptographic SHA-256 hash of the learner identity, course completion timestamp, and grade rubric.
                </p>
                <div className="font-mono text-emerald-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  Contract: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 • Standard: ERC-721 Soulbound
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 9. MARKETPLACE RULES */}
          {/* ========================================================= */}
          {activeSection === "marketplace" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Marketplace Management</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Control secondary trading policies, platform fee collection, and reported item moderation
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-slate-400">Protocol Trade Fee</span>
                  <div className="text-xl font-bold text-white mt-1">2.5%</div>
                  <span className="text-emerald-400">Sent to Treasury Vault</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-slate-400">Auto-Burn Rate</span>
                  <div className="text-xl font-bold text-white mt-1">1.0%</div>
                  <span className="text-amber-400">Deflationary mechanism</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-slate-400">Active Listings</span>
                  <div className="text-xl font-bold text-white mt-1">184</div>
                  <span className="text-slate-400">Avatars & Badges</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-slate-400">Reported Items</span>
                  <div className="text-xl font-bold text-emerald-400 mt-1">0</div>
                  <span className="text-emerald-400">All listings clean</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 10. COMMUNITY FUND */}
          {/* ========================================================= */}
          {activeSection === "community" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Community Fund & Micro-Grants</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage student support requests, tuition fee sponsorships, and donor contributions
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Fund Balance</div>
                  <div className="text-2xl font-black text-rose-400 mt-1">52,400 MX</div>
                  <div className="text-xs text-slate-400 mt-1">+184 Donated NFTs</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Total Distributed</div>
                  <div className="text-2xl font-black text-white mt-1">31,250 MX</div>
                  <div className="text-xs text-emerald-400 mt-1">To 142 students in need</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Requests</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{supportRequests.filter(r => r.status === "Pending").length}</div>
                  <div className="text-xs text-amber-400/80 mt-1">Awaiting multisig review</div>
                </div>
              </div>

              {/* Requests Table */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-white">Student Support Applications</h3>
                <div className="divide-y divide-slate-800">
                  {supportRequests.map(req => (
                    <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-white">{req.student}</div>
                        <div className="text-slate-400 mt-0.5">{req.reason}</div>
                        <div className="text-amber-400 font-bold mt-0.5">Requested: {req.requested}</div>
                      </div>
                      <div>
                        {req.status === "Pending" ? (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleApproveFund(req.id, req.student, req.requested)} className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white">
                              Approve Grant
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectFund(req.id, req.student)} className="h-7 text-[11px] border-red-500/30 text-red-400 hover:bg-red-500/10">
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            req.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 11. BLOCKCHAIN TRANSACTIONS */}
          {/* ========================================================= */}
          {activeSection === "transactions" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Blockchain Transactions</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Immutable record of all on-chain transfers, NFT mints, and reward distributions
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Event Type</th>
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Asset / Amount</th>
                      <th className="py-3 px-4">Tx Hash</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Explorer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-sans font-semibold text-white">{t.type}</td>
                        <td className="py-3 px-4 font-sans">{t.user}</td>
                        <td className="py-3 px-4 font-bold text-amber-400">{t.amount}</td>
                        <td className="py-3 px-4 text-slate-400">{t.hash}</td>
                        <td className="py-3 px-4 font-sans text-emerald-400 font-semibold">✓ {t.status}</td>
                        <td className="py-3 px-4 text-right font-sans">
                          <button onClick={() => showNotice(`Opening block explorer for ${t.hash}...`)} className="text-red-400 hover:underline inline-flex items-center gap-1">
                            BaseScan <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 12. ANALYTICS */}
          {/* ========================================================= */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Platform Analytics</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Retention rates, completion metrics, and token circulation velocity
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                  <div className="text-slate-400">Course Completion Rate</div>
                  <div className="text-3xl font-black text-white">74.2%</div>
                  <div className="text-emerald-400 font-medium">Industry average is 12%</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                  <div className="text-slate-400">Average Quiz Score</div>
                  <div className="text-3xl font-black text-amber-400">83.5%</div>
                  <div className="text-slate-400">Across 14,800 AI assessments</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                  <div className="text-slate-400">Platform Token Velocity</div>
                  <div className="text-3xl font-black text-purple-400">4.2x</div>
                  <div className="text-slate-400">Learned → Staked / Traded</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 13. SECURITY CENTER */}
          {/* ========================================================= */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Security Center</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Access control, emergency circuit breakers, and multisig treasury governance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    Protocol Emergency Circuit Breaker
                  </h3>
                  <p className="text-slate-300">
                    Triggers a global pause on the MXToken transfer hook, CertificateNFT minting, and marketplace settlements.
                  </p>
                  <Button
                    onClick={handleToggleEmergencyPause}
                    variant={emergencyPaused ? "default" : "destructive"}
                    className="w-full text-xs font-bold"
                  >
                    {emergencyPaused ? "LIFT EMERGENCY PAUSE" : "ENGAGE EMERGENCY PROTOCOL PAUSE"}
                  </Button>
                </div>

                <div className="p-6 rounded-2xl bg-[#111827] border border-slate-800 space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    Treasury Multisig Policy
                  </h3>
                  <p className="text-slate-300">
                    Treasury transfers above 5,000 MX require 2-of-3 signatures from designated platform provider keyholders.
                  </p>
                  <div className="font-mono text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    Signers: 0x71C...49A2 (Alex) • 0x39B...88D1 (Sarah) • 0x88F...BC10 (Hardware)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 14. AUDIT LOGS */}
          {/* ========================================================= */}
          {activeSection === "auditlogs" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Audit Logs</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Traceable chronological register of all administrative and protocol events
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="divide-y divide-slate-800 font-mono text-xs">
                  {auditLogs.map(log => (
                    <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="font-bold text-slate-200 font-sans">{log.admin}:</span>
                        <span className="text-slate-300 font-sans">{log.action}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] shrink-0 font-sans">
                        {log.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 15. PLATFORM SETTINGS */}
          {/* ========================================================= */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Platform Settings</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Configure global network parameters, default contracts, and platform branding
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-5 text-xs max-w-2xl">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase text-[10px]">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="BlockLearnX Protocol"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase text-[10px]">Default EVM Network</label>
                  <input
                    type="text"
                    defaultValue="Polygon Amoy / Base Sepolia (Chain ID: 80002)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold uppercase text-[10px]">Default Daily Reward Ceiling</label>
                  <input
                    type="text"
                    defaultValue="500 MX per learner per 24 hours"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <Button onClick={() => showNotice("Settings saved successfully!")} className="bg-red-600 hover:bg-red-700 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
