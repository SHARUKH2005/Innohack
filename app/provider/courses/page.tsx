"use client";

import Link from "next/link";
import { BookOpen, Plus, Edit, BarChart3, Users, Star, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const COURSES = [
  { id: "solidity-101", title: "Solidity Smart Contracts", category: "Blockchain", students: 1420, rating: 4.9, lessons: 20, status: "published", gradient: "from-violet-500 to-purple-600" },
  { id: "defi-basics", title: "DeFi Fundamentals", category: "Blockchain", students: 890, rating: 4.7, lessons: 18, status: "published", gradient: "from-blue-500 to-indigo-600" },
  { id: "nft-dev", title: "NFT Development Masterclass", category: "Blockchain", students: 234, rating: 4.8, lessons: 14, status: "draft", gradient: "from-pink-500 to-rose-600" },
];

export default function ProviderCoursesPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-1">Manage and update your course library</p>
        </div>
        <Link href="/provider/courses/create">
          <Button className="gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
            <Plus className="h-4 w-4" /> New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {COURSES.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-5">
            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                  {c.status === "published" ? <Eye className="h-3 w-3 inline mr-1" /> : <EyeOff className="h-3 w-3 inline mr-1" />}
                  {c.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{c.category} · {c.lessons} lessons</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1.5">
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.students.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-400" /> {c.rating}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
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
    </main>
  );
}
