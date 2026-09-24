"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Check,
  Award,
  Coins,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  BarChart2,
  Users,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXPLORE_COURSES } from "@/lib/courses-data";

/* ─── per-course extended data ────────────────── */
const COURSE_DETAILS: Record<string, {
  lessons: number;
  quizzes: number;
  assignments: number;
  projects: number;
  price: string;
  completionReward: string;
  nftName: string;
  nftId: string;
  hasCertificate: boolean;
  modules: { title: string; lessons: { title: string; duration: string; free?: boolean }[] }[];
  prerequisites: string[];
  about: string;
}> = {
  "solidity-fundamentals": {
    lessons: 12, quizzes: 4, assignments: 2, projects: 1,
    price: "250 MX", completionReward: "+100 MX",
    nftName: "Solidity Pioneer", nftId: "BLX-SOL-001", hasCertificate: true,
    about: "Build real smart contracts from zero using Solidity 0.8.x. Learn syntax, data types, mappings, events, modifiers, and deploy to a testnet.",
    prerequisites: ["Basic programming knowledge", "Understanding of blockchain concepts"],
    modules: [
      { title: "Getting Started", lessons: [
        { title: "What is Solidity?", duration: "8 min", free: true },
        { title: "Setting Up Remix IDE", duration: "10 min", free: true },
        { title: "Your First Smart Contract", duration: "20 min" },
      ]},
      { title: "Core Concepts", lessons: [
        { title: "Data Types & Variables", duration: "25 min" },
        { title: "Functions & Visibility", duration: "30 min" },
        { title: "Mappings & Arrays", duration: "28 min" },
        { title: "Events & Modifiers", duration: "22 min" },
      ]},
      { title: "Building dApps", lessons: [
        { title: "ERC-20 Token Standard", duration: "35 min" },
        { title: "Deploying to Testnet", duration: "25 min" },
        { title: "Testing with Hardhat", duration: "30 min" },
      ]},
      { title: "Capstone Project", lessons: [
        { title: "Project Brief & Requirements", duration: "10 min" },
        { title: "AI Audit & Submission", duration: "20 min" },
      ]},
    ],
  },
  "smart-contract-security": {
    lessons: 14, quizzes: 5, assignments: 3, projects: 2,
    price: "320 MX", completionReward: "+150 MX",
    nftName: "Security Auditor", nftId: "BLX-SEC-002", hasCertificate: true,
    about: "Detect and fix reentrancy, integer overflows, frontrunning, and access-control vulnerabilities using Slither, Foundry, and automated AI tools.",
    prerequisites: ["Solidity Fundamentals", "Basic EVM knowledge"],
    modules: [
      { title: "Threat Landscape", lessons: [
        { title: "Common Vulnerability Classes", duration: "20 min", free: true },
        { title: "Reentrancy Deep Dive", duration: "40 min" },
        { title: "Integer Over/Underflows", duration: "30 min" },
      ]},
      { title: "Tooling", lessons: [
        { title: "Slither Static Analyzer", duration: "35 min" },
        { title: "Foundry Fuzz Testing", duration: "45 min" },
        { title: "Echidna Property Testing", duration: "40 min" },
      ]},
      { title: "Advanced Attacks", lessons: [
        { title: "Frontrunning & MEV", duration: "35 min" },
        { title: "Flash Loan Exploits", duration: "40 min" },
        { title: "Access Control Bugs", duration: "30 min" },
      ]},
      { title: "Audit Report", lessons: [
        { title: "Writing a Formal Audit Report", duration: "25 min" },
        { title: "AI Audit Submission", duration: "20 min" },
        { title: "Capstone: Full Contract Audit", duration: "50 min" },
        { title: "Peer Review", duration: "20 min" },
      ]},
    ],
  },
  "autonomous-web3-ai-agents": {
    lessons: 16, quizzes: 5, assignments: 3, projects: 2,
    price: "380 MX", completionReward: "+180 MX",
    nftName: "AI Agent Architect", nftId: "BLX-AI-003", hasCertificate: true,
    about: "Build autonomous LLM agents that interact with smart contracts, execute DeFi strategies, and respond to on-chain oracle data in real-time.",
    prerequisites: ["Python basics", "REST API familiarity"],
    modules: [
      { title: "LLM Foundations", lessons: [
        { title: "How Large Language Models Work", duration: "20 min", free: true },
        { title: "LangChain Framework Intro", duration: "30 min" },
        { title: "ReAct Agent Pattern", duration: "35 min" },
      ]},
      { title: "On-Chain Integration", lessons: [
        { title: "Connecting Agents to Web3", duration: "40 min" },
        { title: "Chainlink Oracle Data Feeds", duration: "35 min" },
        { title: "Automated Transaction Signing", duration: "30 min" },
      ]},
      { title: "DeFi Strategies", lessons: [
        { title: "Arbitrage Detection Agents", duration: "45 min" },
        { title: "Yield Optimization Bots", duration: "40 min" },
        { title: "Risk Management Logic", duration: "35 min" },
      ]},
      { title: "Deployment & Security", lessons: [
        { title: "Production Deployment", duration: "30 min" },
        { title: "Agent Security Best Practices", duration: "25 min" },
        { title: "Capstone: Live DeFi Agent", duration: "60 min" },
        { title: "AI Audit Submission", duration: "20 min" },
        { title: "Peer Evaluation", duration: "15 min" },
        { title: "Final Assessment", duration: "30 min" },
      ]},
    ],
  },
};

/* Fallback detail for courses without explicit data */
function buildFallbackDetail(course: typeof EXPLORE_COURSES[0]) {
  return {
    lessons: course.modulesCount * 3,
    quizzes: course.modulesCount,
    assignments: 2,
    projects: 1,
    price: course.price,
    completionReward: course.reward,
    nftName: `${course.title.split(" ")[0]} Expert`,
    nftId: `BLX-${course.id.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`,
    hasCertificate: true,
    about: course.summary,
    prerequisites: ["Basic programming knowledge"],
    modules: Array.from({ length: course.modulesCount }, (_, i) => ({
      title: `Module ${i + 1}`,
      lessons: [
        { title: "Introduction", duration: "15 min", free: i === 0 },
        { title: "Core Concepts", duration: "30 min" },
        { title: "Hands-on Lab", duration: "45 min" },
      ],
    })),
  };
}

/* ─── COMPONENT ────────────────────────────────── */
export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const course = EXPLORE_COURSES.find((c) => c.id === courseId || c.slug === courseId);
  const detail = COURSE_DETAILS[courseId] ?? (course ? buildFallbackDetail(course) : null);

  const [openModule, setOpenModule] = useState<number | null>(0);
  const [enrolled, setEnrolled] = useState(false);

  if (!course || !detail) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-slate-800">Course Not Found</p>
          <Link href="/courses">
            <Button className="bg-[#0056D2] text-white">Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* ── HERO THUMBNAIL ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
        {/* Real course photo */}
        <div className="absolute inset-0">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-900/80" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl py-12 sm:py-16">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl sm:text-5xl p-3 bg-white/15 rounded-2xl backdrop-blur-sm shrink-0">
              {course.icon}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                  {course.partnerLogo} {course.partner}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColors[course.level]} bg-opacity-90`}>
                  {course.level}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {course.title}
              </h1>
            </div>
          </div>

          <p className="text-white/85 text-base max-w-2xl leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Quick stats bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <strong className="text-white">{course.rating}</strong>
              <span>({course.ratingCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {detail.lessons} Lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {course.ratingCount} students
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── LEFT: Course content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">About this Course</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{detail.about}</p>

              {/* Skills */}
              <div className="mt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills You'll Gain</p>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-[#0056D2]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* At a Glance */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Course at a Glance</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: BookOpen, label: "Lessons", value: detail.lessons, color: "text-[#0056D2] bg-blue-50" },
                  { icon: FileText, label: "Quizzes", value: detail.quizzes, color: "text-purple-600 bg-purple-50" },
                  { icon: Layers, label: "Assignments", value: detail.assignments, color: "text-amber-600 bg-amber-50" },
                  { icon: Zap, label: "Projects", value: detail.projects, color: "text-emerald-600 bg-emerald-50" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-black text-slate-900">{item.value}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Course Curriculum</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {detail.modules.length} modules · {detail.lessons} lessons · {course.duration}
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {detail.modules.map((mod, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => setOpenModule(openModule === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">{mod.title}</span>
                        <span className="text-xs text-slate-400">{mod.lessons.length} lessons</span>
                      </div>
                      {openModule === idx
                        ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                        : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                      }
                    </button>

                    {openModule === idx && (
                      <div className="divide-y divide-slate-50 bg-slate-50/60">
                        {mod.lessons.map((lesson, li) => {
                          const lessonSlug = lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          return (
                            <Link
                              key={li}
                              href={`/learn/${courseId}/${lessonSlug}`}
                              className="flex items-center justify-between px-6 py-3 hover:bg-blue-50/60 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.free ? (
                                  <BookOpen className="h-4 w-4 text-[#0056D2] shrink-0" />
                                ) : (
                                  <Lock className="h-4 w-4 text-slate-300 group-hover:text-[#0056D2] shrink-0 transition-colors" />
                                )}
                                <span className={`text-sm group-hover:text-[#0056D2] transition-colors ${lesson.free ? "text-slate-800 font-medium" : "text-slate-600"}`}>
                                  {lesson.title}
                                </span>
                                {lesson.free && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-slate-400 group-hover:text-[#0056D2] shrink-0 font-medium flex items-center gap-1">
                                {lesson.duration} →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0056D2] text-white font-black text-xl flex items-center justify-center shrink-0">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{course.instructor}</p>
                  <p className="text-sm text-[#0056D2] font-medium">{course.partner}</p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Expert practitioner and educator with deep experience in Web3 development, published research, and hands-on industry projects.
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {course.rating} Rating</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.ratingCount} students</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {detail.modules.length} modules</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            {detail.prerequisites.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Prerequisites</h2>
                <ul className="space-y-2">
                  {detail.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* ── RIGHT: Enrollment card ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md sticky top-20 overflow-hidden">

              {/* Pricing block */}
              <div className="p-6 border-b border-slate-100 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Course Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">{detail.price}</span>
                    <span className="text-sm text-slate-500">one-time</span>
                  </div>
                </div>

                {enrolled ? (
                  <Button
                    asChild
                    className="w-full py-6 text-base font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Link href={`/learn/${courseId}`}>
                      <span className="flex items-center gap-2">
                        <Check className="h-5 w-5" /> Start Learning Now →
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    id="enroll-btn"
                    onClick={() => setEnrolled(true)}
                    className="w-full py-6 text-base font-bold rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Enroll Now
                  </Button>
                )}

                <p className="text-xs text-slate-500 text-center">
                  30-day money-back guarantee · Lifetime access
                </p>
              </div>

              {/* Reward breakdown */}
              <div className="p-6 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">What You'll Earn</p>

                <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <Coins className="h-4 w-4 text-amber-500" />
                    Completion Reward
                  </span>
                  <span className="text-sm font-bold text-amber-700">{detail.completionReward}</span>
                </div>

                <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-purple-500" />
                    NFT Credential
                  </span>
                  <span className="text-sm font-bold text-purple-700">{detail.nftName}</span>
                </div>

                <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <Award className="h-4 w-4 text-[#0056D2]" />
                    Certificate
                  </span>
                  <span className={`text-sm font-bold ${detail.hasCertificate ? "text-emerald-600" : "text-slate-400"}`}>
                    {detail.hasCertificate ? "✓ Included" : "Not included"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <BarChart2 className="h-4 w-4 text-slate-400" />
                    Difficulty
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* NFT preview */}
              <div className="mx-6 mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white">
                <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1">
                  Soulbound NFT · ERC-5192
                </p>
                <p className="text-sm font-bold">{detail.nftName}</p>
                <p className="text-xs text-blue-300 mt-1 font-mono">{detail.nftId}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span className="text-xs text-emerald-400 font-medium">Polygon zkEVM · Non-Transferable</span>
                </div>
              </div>

              {/* Duration & format */}
              <div className="px-6 pb-6 space-y-2">
                {[
                  { icon: Clock, label: "Total Duration", value: course.duration },
                  { icon: BookOpen, label: "Format", value: "Self-paced, online" },
                  { icon: Users, label: "Students Enrolled", value: course.ratingCount },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </span>
                    <span className="font-semibold text-slate-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
