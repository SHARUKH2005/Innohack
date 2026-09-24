"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronRight,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";

type SidebarItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const sections: { label: string; items: SidebarItem[] }[] = [
  {
    label: "",
    items: [{ href: "/provider", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Courses",
    items: [
      { href: "/provider#courses", label: "My Courses", icon: BookOpen },
      { href: "/provider#create-course", label: "Create Course", icon: FolderKanban },
      { href: "/provider#resources", label: "Course Resources", icon: Briefcase },
    ],
  },
  {
    label: "Assessments",
    items: [
      { href: "/provider#assessments", label: "Assessments", icon: BarChart3 },
      { href: "/provider#questions", label: "Questions", icon: FileText },
      { href: "/provider#ai-criteria", label: "AI Criteria", icon: Sparkles },
      { href: "/provider#results", label: "Results", icon: Award },
    ],
  },
  {
    label: "Learners",
    items: [
      { href: "/provider#students", label: "Students", icon: Users },
      { href: "/provider#progress", label: "Progress", icon: BarChart3 },
    ],
  },
  {
    label: "Certificates",
    items: [{ href: "/provider#certificates", label: "Certificates", icon: Award }],
  },
  {
    label: "Achievements",
    items: [{ href: "/provider#nft-requests", label: "NFT Requests", icon: Sparkles }],
  },
  {
    label: "Earnings",
    items: [
      { href: "/provider#earnings", label: "Earnings", icon: Wallet },
      { href: "/provider#transactions", label: "Transactions", icon: FileText },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/provider#profile", label: "Profile", icon: GraduationCap },
      { href: "/provider#settings", label: "Settings", icon: Settings },
    ],
  },
];

function isItemActive(pathname: string, href: string) {
  const actual = href.split("#")[0];
  return pathname === actual || pathname.startsWith(`${actual}/`);
}

export function ProviderSidebar({
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
          <Link href="/provider" onClick={onClose} aria-label="BlockLearnX provider dashboard">
            <Logo height={34} width={150} />
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
            Provider mode
          </p>
          <p className="mt-2 text-sm font-bold">Create. Teach. Earn.</p>
          <p className="mt-1 text-xs leading-relaxed text-blue-100">
            You manage your own courses, assessments, and learner outcomes without touching platform-wide controls.
          </p>
        </div>
      </aside>
    </>
  );
}

export function MobileProviderSidebarButton({ onClick }: { onClick: () => void }) {
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
