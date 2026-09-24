"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import {
  MobileSidebarButton,
  StudentSidebar,
} from "@/components/shared/student-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <MobileSidebarButton onClick={() => setSidebarOpen(true)} />
          <span className="text-sm font-bold text-slate-900">Student Dashboard</span>
        </div>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
