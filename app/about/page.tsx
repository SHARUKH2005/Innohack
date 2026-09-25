"use client";

import Link from "next/link";
import { ShieldCheck, Award, Zap, Users, BookOpen, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalNavbar } from "@/components/shared/global-navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GlobalNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 px-4 text-center overflow-hidden border-b border-border/40">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              About BlockLearnX
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
              Empowering the Next Generation of <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Web3 Builders</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              BlockLearnX is a decentralized learning ecosystem combining AI-driven adaptive education, verified soulbound credentials, and micro-scholarship rewards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/browse">
                <Button size="lg" className="font-semibold shadow-lg shadow-primary/25">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/provider">
                <Button size="lg" variant="outline">
                  Become an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Why BlockLearnX?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Traditional education platforms issue certificates that are easy to forge and hard to verify. We build education on-chain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Soulbound Certificates</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Earn non-transferable ERC-721 credentials permanently verifiable on Polygon & Ethereum networks.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Learn-to-Earn (MX Tokens)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get directly rewarded in MX utility tokens upon completing modules, passing quizzes, and submitting verified code.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Evaluations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Instant smart feedback and rubric scoring powered by Google Gemini AI directly inside every assignment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 border-t border-border/40">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">12+</div>
              <div className="text-sm text-muted-foreground mt-1">Specialized Courses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">5,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Certificates Minted</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">250,000</div>
              <div className="text-sm text-muted-foreground mt-1">MX Tokens Distributed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">On-Chain Verifiability</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <p>© 2026 BlockLearnX. Empowering decentralized education worldwide.</p>
      </footer>
    </div>
  );
}
