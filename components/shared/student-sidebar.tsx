"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronRight,
  Coins,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";

type SidebarItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const sections: { label: string; items: SidebarItem[] }[] = [
  {
    label: "",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Learn",
    items: [
      { href: "/browse", label: "Browse Courses", icon: Compass },
      { href: "/courses", label: "My Learning", icon: BookOpen },
      { href: "/quiz", label: "Assessments", icon: BarChart3 },
    ],
  },
  {
    label: "Earn",
    items: [
      { href: "/rewards", label: "Rewards", icon: Coins },
      { href: "/nfts", label: "Certificates", icon: Award },
    ],
  },
  {
    label: "Own",
    items: [
      { href: "/nfts", label: "My NFTs", icon: Sparkles },
      { href: "/portfolio", label: "Portfolio", icon: Award },
      { href: "/dashboard#wallet", label: "Wallet", icon: Wallet },
    ],
  },
  {
    label: "Trade",
    items: [{ href: "/marketplace", label: "Marketplace", icon: ShoppingBag }],
  },
  {
    label: "Community",
    items: [{ href: "/community#fund", label: "Community Fund", icon: Users }],
  },
  {
    label: "Profile",
    items: [
      { href: "/dashboard#profile", label: "My Profile", icon: GraduationCap },
      { href: "/dashboard#settings", label: "Settings", icon: Settings },
    ],
  },
];

function isItemActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/dashboard"
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);
}

export function StudentSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/dashboard" onClick={onClose} aria-label="BlockLearnX dashboard">
            <Logo height={38} width={170} />
          </Link>
          <button
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="hide-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.label || "dashboard"} className="mb-5">
              {section.label && (
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {section.label}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-blue-50 text-[#0056D2]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className={`h-[18px] w-[18px] ${active ? "text-[#0056D2]" : "text-slate-400 group-hover:text-slate-600"}`} />
                      <span>{item.label}</span>
                      {active && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-2xl bg-gradient-to-br from-[#0056D2] to-indigo-700 p-4 text-white">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Your journey
          </p>
          <p className="mt-2 text-sm font-bold">Learn. Earn. Own. Prove.</p>
          <p className="mt-1 text-xs leading-relaxed text-blue-100">
            Build a portfolio that travels with you.
          </p>
        </div>
      </aside>
    </>
  );
}

export function MobileSidebarButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Open navigation"
      onClick={onClick}
      className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50 lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
