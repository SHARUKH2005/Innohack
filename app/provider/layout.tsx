"use client";

import { GlobalNavbar } from "@/components/shared/global-navbar";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />
      <div className="border-b border-border bg-gradient-to-r from-rose-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-600 rounded-full text-xs font-medium">Provider Portal</span>
            <span>Manage your courses and content</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
