"use client";

import { GlobalNavbar } from "@/components/shared/global-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />
      {children}
    </div>
  )
}
