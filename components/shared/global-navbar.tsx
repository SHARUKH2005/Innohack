"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen, BarChart3, Award, Coins, Users, Building2, ShoppingBag,
  ChevronDown, Menu, X, Wallet, GraduationCap, Globe, Star, FileText,
  Zap, Play, Trophy, Home, ShieldAlert, Cpu, Layers, LogOut, User,
} from "lucide-react";
import { useAuth } from "@/lib/supabase/auth-context";
import { Logo } from "@/components/shared/logo";

interface NavCategory {
  label: string;
  icon: React.ReactNode;
  color: string;
  items: { href: string; label: string; icon: React.ReactNode; description: string }[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "Learn",
    icon: <BookOpen className="h-4 w-4" />,
    color: "from-blue-500 to-indigo-600",
    items: [
      { href: "/browse", label: "Browse Courses", icon: <Globe className="h-4 w-4" />, description: "Discover all available courses" },
      { href: "/courses", label: "Course Catalog", icon: <BookOpen className="h-4 w-4" />, description: "Full course library" },
      { href: "/my-courses", label: "My Courses", icon: <Play className="h-4 w-4" />, description: "Your enrolled courses" },
      { href: "/about", label: "About BlockLearnX", icon: <Star className="h-4 w-4" />, description: "Our mission & platform story" },
    ],
  },
  {
    label: "Track",
    icon: <BarChart3 className="h-4 w-4" />,
    color: "from-emerald-500 to-teal-600",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4" />, description: "Your learning overview" },
      { href: "/progress", label: "Progress", icon: <BarChart3 className="h-4 w-4" />, description: "Analytics & learning metrics" },
      { href: "/certificates", label: "Certificates", icon: <FileText className="h-4 w-4" />, description: "Your earned credentials" },
      { href: "/rewards", label: "Rewards", icon: <Trophy className="h-4 w-4" />, description: "MX token reward history" },
    ],
  },
  {
    label: "Web3",
    icon: <Zap className="h-4 w-4" />,
    color: "from-violet-500 to-purple-600",
    items: [
      { href: "/nfts", label: "My NFTs", icon: <Award className="h-4 w-4" />, description: "Avatar & achievement NFTs" },
      { href: "/wallet", label: "Wallet", icon: <Wallet className="h-4 w-4" />, description: "MX balance & transactions" },
      { href: "/collection", label: "NFT Collection", icon: <GraduationCap className="h-4 w-4" />, description: "On-chain certificate inspector" },
    ],
  },
  {
    label: "Community",
    icon: <Users className="h-4 w-4" />,
    color: "from-orange-500 to-amber-600",
    items: [
      { href: "/community", label: "Community Hub", icon: <Users className="h-4 w-4" />, description: "Discussions, Q&A & resources" },
      { href: "/aboutus", label: "About Us", icon: <Globe className="h-4 w-4" />, description: "The story behind BlockLearnX" },
    ],
  },
  {
    label: "Provider",
    icon: <Building2 className="h-4 w-4" />,
    color: "from-amber-500 to-orange-600",
    items: [
      { href: "/provider", label: "Provider Dashboard", icon: <BarChart3 className="h-4 w-4" />, description: "Course analytics overview" },
      { href: "/provider/courses", label: "Manage Courses", icon: <BookOpen className="h-4 w-4" />, description: "All your published courses" },
      { href: "/provider/courses/create", label: "Create Course", icon: <Zap className="h-4 w-4" />, description: "Build a new course" },
    ],
  },
  {
    label: "Admin",
    icon: <ShieldAlert className="h-4 w-4" />,
    color: "from-red-500 to-rose-600",
    items: [
      { href: "/developer", label: "Operations Center", icon: <Cpu className="h-4 w-4" />, description: "Smart contracts & system health" },
      { href: "/admin", label: "Admin Panel", icon: <Layers className="h-4 w-4" />, description: "Platform management" },
      { href: "/platform", label: "Platform Settings", icon: <Users className="h-4 w-4" />, description: "Configure platform rules" },
    ],
  },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || "BX";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-2xs">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 py-2">
            <Logo height={64} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            {/* Direct Home Link */}
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-accent text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Home className="h-4 w-4 text-indigo-500" />
              <span>Home</span>
            </Link>

            {/* Direct About Us Link */}
            <Link
              href="/aboutus"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === "/aboutus" || pathname === "/about"
                  ? "bg-accent text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Globe className="h-4 w-4 text-emerald-500" />
              <span>About Us</span>
            </Link>

            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.label} className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown(cat.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(activeDropdown === cat.label ? null : cat.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeDropdown === cat.label
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${activeDropdown === cat.label ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                {activeDropdown === cat.label && (
                  <div
                    onMouseEnter={() => setActiveDropdown(cat.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-72 bg-background border border-border rounded-xl shadow-2xl p-2 z-50"
                  >
                    {/* Category header */}
                    <div className={`rounded-lg bg-gradient-to-r ${cat.color} p-3 mb-2`}>
                      <div className="flex items-center gap-2 text-white">
                        {cat.icon}
                        <span className="font-semibold">{cat.label}</span>
                      </div>
                    </div>
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors group ${
                          pathname === item.href ? "bg-accent" : ""
                        }`}
                      >
                        <span className="mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/wallet"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            >
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              <span>MX Wallet</span>
            </Link>

            {user || profile ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                      {initials}
                    </div>
                  )}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-background border border-border shadow-xl py-2 z-50">
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-border">
                      <p className="text-sm font-bold truncate">{profile?.full_name || user?.email?.split("@")[0]}</p>
                      <p className="text-xs text-muted-foreground truncate">{profile?.email || user?.email}</p>
                      {profile?.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                          {profile.role}
                        </span>
                      )}
                    </div>

                    {/* Quick links */}
                    <div className="py-1">
                      {[
                        { href: "/dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
                        { href: "/my-courses", icon: <BookOpen className="h-4 w-4" />, label: "My Courses" },
                        { href: "/rewards", icon: <Coins className="h-4 w-4" />, label: "MX Rewards" },
                        { href: "/wallet", icon: <Wallet className="h-4 w-4" />, label: "Wallet" },
                        { href: "/nfts", icon: <Award className="h-4 w-4" />, label: "My NFTs" },
                        { href: "/profile", icon: <User className="h-4 w-4" />, label: "Profile" },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <span className="text-muted-foreground">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-1">
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
                <Link
                  href="/login"
                  className="text-xs font-bold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                >
                  Login
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <div className="p-2 space-y-1 border-b border-border">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
            >
              <Home className="h-4 w-4 text-indigo-500" />
              Home
            </Link>
            <Link
              href="/aboutus"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
            >
              <Globe className="h-4 w-4 text-emerald-500" />
              About Us
            </Link>
          </div>
          {NAV_CATEGORIES.map((cat) => (
            <div key={cat.label} className="border-b border-border/50">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === cat.label ? null : cat.label)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  {cat.icon}
                  {cat.label}
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === cat.label ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === cat.label && (
                <div className="pb-2">
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {!(user || profile) && (
            <div className="p-3 border-t border-border flex flex-col gap-2">
              <Link href="/login" className="w-full text-center text-sm font-bold py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
