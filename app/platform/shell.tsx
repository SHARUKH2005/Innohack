"use client";

import { useState } from "react";
import { PlatformMobileMenuButton, PlatformSidebar } from "@/components/shared/platform-sidebar";

export function PlatformDashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <PlatformSidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <PlatformMobileMenuButton onClick={() => setOpen(true)} />
          <span className="text-sm font-bold text-slate-900">Platform Provider</span>
        </div>
        {children}
      </div>
    </div>
  );
}
