"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
import { useBlockchain } from "@/lib/hooks/useBlockchain";
import {
  Search,
  Bell,
  Wallet,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Award,
  Coins,
  Briefcase,
  Settings,
  User as UserIcon,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { EcosystemFlowBar } from "@/components/shared/ecosystem-flow-bar";

interface NavbarProps {
  title?: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard", label: "My Learning" },
  { href: "/dashboard?tab=rewards", label: "Rewards" },
];

const NFT_DROPDOWN_ITEMS = [
  { href: "/collection", label: "🖼️ My NFT Collection" },
  { href: "/collection?tab=marketplace", label: "🛒 NFT Marketplace" },
  { href: "/collection?tab=achievements", label: "🏆 Achievement NFTs" },
  { href: "/collection?tab=certificates", label: "🎓 Certificate NFTs" },
];

const PROFILE_MENU = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin", icon: ShieldCheck, label: "Admin Control" },
  { href: "/dashboard", icon: BookOpen, label: "My Courses" },
  { href: "/collection?tab=certificates", icon: Award, label: "Certificates" },
  { href: "/collection", icon: ShieldCheck, label: "NFTs" },
  { href: "/dashboard?tab=rewards", icon: Coins, label: "Rewards" },
  { href: "/portfolio", icon: Briefcase, label: "Portfolio" },
  { href: "/dashboard?tab=settings", icon: Settings, label: "Settings" },
];

export function Navbar({ title = "BlockLearnX" }: NavbarProps) {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const { isConnected, walletAddress, mxBalance, isLoading, error: walletError, connectWallet, connectDemoWallet, disconnectWallet } = useBlockchain();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nftOpen, setNftOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const nftRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (nftRef.current && !nftRef.current.contains(e.target as Node)) setNftOpen(false);
      if (walletRef.current && !walletRef.current.contains(e.target as Node)) setWalletOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* ── LEFT: Logo ── */}
        <Link href="/" className="shrink-0 flex items-center">
          <Logo height={40} width={180} />
        </Link>

        {/* ── CENTER: Nav Links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#0056D2] bg-blue-50 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* NFTs Dropdown */}
          <div ref={nftRef} className="relative">
            <button
              onClick={() => setNftOpen(!nftOpen)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                pathname.startsWith("/collection")
                  ? "text-[#0056D2] bg-blue-50 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>🖼️ NFTs</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>

            {nftOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  NFT Credentials
                </div>
                {NFT_DROPDOWN_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setNftOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-[#0056D2] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Link */}
          <Link
            href="/portfolio"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
              isActive("/portfolio")
                ? "text-[#0056D2] bg-blue-50 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <span>👤 Portfolio</span>
          </Link>
        </nav>

        {/* ── RIGHT: Actions ── */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Search toggle (desktop) */}
          <div className="hidden md:flex items-center">
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                  placeholder="Search courses..."
                  className="w-56 pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all"
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); setWalletOpen(false); }}
              className="relative p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0056D2]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                <div className="flex justify-between items-center px-4 py-2 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-900">Notifications</span>
                  <button className="text-xs text-[#0056D2] font-medium hover:underline">Mark all read</button>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="px-4 py-3 hover:bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">🎉 Quiz Grade: 100%</p>
                    <p className="text-xs text-slate-500 mt-0.5">You earned +50 MX and unlocked Module 4.</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">📜 Soulbound NFT Issued</p>
                    <p className="text-xs text-slate-500 mt-0.5">Certificate #BLX-ARCH-9942 minted on Polygon.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Wallet Component ── */}
          <div ref={walletRef} className="relative hidden sm:block">
            {isConnected && walletAddress ? (
              <button
                onClick={() => { setWalletOpen(!walletOpen); setProfileOpen(false); setNotifOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition-all text-xs font-bold text-emerald-950 shadow-xs"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold">
                  {Number(mxBalance).toLocaleString()} MX
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-emerald-700" />
              </button>
            ) : (
              <button
                onClick={() => { setWalletOpen(!walletOpen); setProfileOpen(false); setNotifOpen(false); }}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#0056D2]/30 bg-blue-50 hover:bg-[#0056D2] hover:text-white text-xs font-bold text-[#0056D2] transition-all shadow-xs disabled:opacity-50 group"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Wallet className="h-4 w-4" />
                )}
                <span>{isLoading ? "Connecting..." : "Connect Wallet"}</span>
              </button>
            )}

            {/* Wallet Dropdown Modal */}
            {walletOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in space-y-3 font-sans">
                {isConnected && walletAddress ? (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-wide">Web3 Wallet Connected</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Chain #31337
                      </span>
                    </div>

                    {/* Address Box */}
                    <div className="bg-slate-800/80 rounded-xl p-3 space-y-1.5 border border-slate-700/60">
                      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
                        <span>Account Address</span>
                        <button
                          onClick={handleCopyAddress}
                          className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
                        >
                          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="font-mono text-xs font-bold text-white break-all">{walletAddress}</p>
                    </div>

                    {/* Token Balance Box */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">Platform Token Balance</p>
                        <p className="text-xl font-black text-amber-300 mt-0.5">{Number(mxBalance).toLocaleString()} <span className="text-xs text-amber-400 font-bold">MX</span></p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-1 pt-1">
                      <Link
                        href="/dashboard?tab=blockchain"
                        onClick={() => setWalletOpen(false)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                          View Blockchain Smart Contracts
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <button
                        onClick={() => { setWalletOpen(false); disconnectWallet(); }}
                        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 border border-red-500/20 transition-colors mt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Disconnect Wallet
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-sm font-bold text-white">🦊 Connect Your Wallet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Choose a provider to connect to BlockLearnX</p>
                    </div>

                    {/* Error display */}
                    {walletError && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 text-[11px] text-red-400 font-medium">
                        ⚠️ {walletError}
                      </div>
                    )}

                    {/* MetaMask real connection */}
                    <button
                      onClick={async () => { try { await connectWallet(); setWalletOpen(false); } catch {} }}
                      disabled={isLoading}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 transition-all disabled:opacity-50"
                    >
                      <span className="text-2xl">🦊</span>
                      <div className="text-left flex-1">
                        <p className="text-xs font-bold text-white">MetaMask</p>
                        <p className="text-[10px] text-slate-400">Connect your real MetaMask wallet</p>
                      </div>
                      {isLoading ? <RefreshCw className="w-4 h-4 text-orange-400 animate-spin" /> : <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />}
                    </button>

                    {/* Demo wallet */}
                    <button
                      onClick={async () => { await connectDemoWallet(); setWalletOpen(false); }}
                      disabled={isLoading}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all disabled:opacity-50"
                    >
                      <span className="text-2xl">🎭</span>
                      <div className="text-left flex-1">
                        <p className="text-xs font-bold text-white">Demo Wallet</p>
                        <p className="text-[10px] text-slate-400">Use a pre-funded demo wallet (no extension needed)</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
                    </button>

                    <p className="text-[10px] text-slate-500 text-center pt-1">
                      MetaMask requires the browser extension installed.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Auth: Profile or Login/Register */}
          {user || profile ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); setWalletOpen(false); }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#0056D2]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#0056D2] text-white font-bold flex items-center justify-center text-xs">
                    {profile?.full_name?.substring(0, 2).toUpperCase() || "BX"}
                  </div>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name || user?.email?.split("@")[0]}</p>
                    <p className="text-xs text-slate-500 truncate">{profile?.email || user?.email}</p>
                    {profile?.role && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0056D2]">
                        {profile.role}
                      </span>
                    )}
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    {PROFILE_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0056D2] transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-slate-400" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="outline" className="h-8 text-xs font-semibold border-slate-300 px-4">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="h-8 text-xs font-semibold bg-[#0056D2] hover:bg-[#00419e] text-white px-4">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 md:hidden transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1 shadow-md">
          {/* Mobile search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2]"
            />
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-blue-50 text-[#0056D2] font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth buttons on mobile */}
          {!(user || profile) && (
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full text-sm font-semibold">
                <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="w-full bg-[#0056D2] text-white text-sm font-semibold">
                <Link href="/register" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </Button>
            </div>
          )}

          {/* Wallet on mobile */}
          <div className="pt-2 border-t border-slate-100 mt-2">
            {isConnected && walletAddress ? (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-emerald-950">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                  <span className="bg-emerald-200 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded">
                    {mxBalance} MX
                  </span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); disconnectWallet(); }}
                  className="w-full text-center text-xs font-bold text-red-600 hover:underline pt-1"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => { connectWallet(); setMobileOpen(false); }}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#0056D2] bg-[#0056D2] text-white text-sm font-bold shadow-md"
              >
                <Wallet className="h-4 w-4" />
                {isLoading ? "Connecting Wallet..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
