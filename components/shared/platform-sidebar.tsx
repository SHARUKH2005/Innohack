"use client";

import Link from "next/link";
import { BarChart3, BookOpen, Settings, ShieldCheck, Users, X } from "lucide-react";

const items = [
  { href: "/platform", label: "Overview", icon: BarChart3 },
  { href: "/platform#courses", label: "Courses", icon: BookOpen },
  { href: "/platform#users", label: "Users", icon: Users },
  { href: "/platform#governance", label: "Governance", icon: ShieldCheck },
  { href: "/platform#settings", label: "Settings", icon: Settings },
];

export function PlatformSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <button
          aria-label="Close platform navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-5 transition-transform lg:sticky lg:top-0 lg:flex lg:h-screen lg:translate-x-0 lg:flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/platform" className="text-lg font-black text-slate-900">
            BlockLearn<span className="text-[#0056D2]">X</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Platform provider
            </span>
          </Link>
          <button
            aria-label="Close platform navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#0056D2]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
          Platform controls cover learning operations and reward records. Blockchain treasury and minting controls will appear when connected.
        </div>
      </aside>
    </>
  );
}

export function PlatformMobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Open platform navigation"
      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
      onClick={onClick}
    >
      Menu
    </button>
  );
}
