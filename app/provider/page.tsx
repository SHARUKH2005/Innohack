"use client";

import Link from "next/link";
import { BookOpen, Users, Star, TrendingUp, PlusCircle, BarChart3, DollarSign, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROVIDER_COURSES = [
  { id: "solidity-101", title: "Solidity Smart Contracts", students: 1420, rating: 4.9, revenue: 2840, status: "published", gradient: "from-violet-500 to-purple-600" },
  { id: "defi-basics", title: "DeFi Fundamentals", students: 890, rating: 4.7, revenue: 1780, status: "published", gradient: "from-blue-500 to-indigo-600" },
  { id: "nft-dev", title: "NFT Development Masterclass", students: 234, rating: 4.8, revenue: 468, status: "draft", gradient: "from-pink-500 to-rose-600" },
];

const STATS = [
  { label: "Total Students", value: "2,544", icon: <Users className="h-5 w-5 text-blue-500" />, change: "+12%" },
  { label: "Total Revenue", value: "$5,088", icon: <DollarSign className="h-5 w-5 text-emerald-500" />, change: "+8%" },
  { label: "Avg Rating", value: "4.8 ★", icon: <Star className="h-5 w-5 text-amber-500" />, change: "+0.1" },
  { label: "Active Courses", value: "2", icon: <BookOpen className="h-5 w-5 text-violet-500" />, change: null },
];

export default function ProviderDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and track performance</p>
        </div>
        <Link href="/provider/courses/create">
          <Button className="gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
            <PlusCircle className="h-4 w-4" /> Create Course
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">{s.icon}</div>
              {s.change && <span className="text-xs text-emerald-500 font-medium">{s.change}</span>}
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course list */}
      <div>
        <h2 className="font-semibold text-lg mb-4">Your Courses</h2>
        <div className="space-y-3">
          {PROVIDER_COURSES.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{c.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.students.toLocaleString()} students</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-400" /> {c.rating}</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-500" /> ${c.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/provider/courses/${c.id}/assessments`}>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Assessments
                  </Button>
                </Link>
                <Link href={`/provider/courses/${c.id}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue chart placeholder */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" /> Revenue Overview
        </h2>
        <div className="h-40 flex items-end gap-2">
          {[40, 65, 80, 55, 90, 75, 85, 95, 60, 70, 100, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-rose-500/60 to-pink-500/60 hover:from-rose-500 hover:to-pink-500 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </main>
  );
}
