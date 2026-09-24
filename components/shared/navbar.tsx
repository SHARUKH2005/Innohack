"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

interface NavbarProps {
  title?: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/community", label: "Community" },
];

const PROFILE_MENU = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/my-courses", icon: BookOpen, label: "My Courses" },
  { href: "/certificates", icon: Award, label: "Certificates" },
  { href: "/nfts", icon: ShieldCheck, label: "My NFTs" },
  { href: "/rewards", icon: Coins, label: "MX Rewards" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/profile", icon: UserIcon, label: "Profile" },
  { href: "/progress", icon: Briefcase, label: "Progress" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Navbar({ title = "BlockLearnX" }: NavbarProps) {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
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

          {/* Wallet button */}
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors">
            <Wallet className="h-4 w-4 text-[#0056D2]" />
            <span className="hidden lg:inline">Connect Wallet</span>
          </button>

          {/* Auth: Profile or Login/Register */}
          {user || profile ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
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
          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">
              <Wallet className="h-4 w-4 text-[#0056D2]" />
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
