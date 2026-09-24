"use client";

import { useState } from "react";
import { MobileProviderSidebarButton, ProviderSidebar } from "@/components/shared/provider-sidebar";

export function ProviderDashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <ProviderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 lg:px-7">
              <div className="flex items-center gap-3"><MobileProviderSidebarButton onClick={() => setSidebarOpen(true)} /><span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0056D2] sm:inline">Course Provider</span></div>
              <span className="text-xs font-semibold text-slate-500">Own courses and learners only</span>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
