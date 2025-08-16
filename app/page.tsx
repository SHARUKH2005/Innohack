"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, BarChart2, Calendar, Award, Users, Globe } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents hydration errors
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-emerald-500/10 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="leftPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
                <linearGradient id="rightPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="url(#leftPageGradient)" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="url(#rightPageGradient)" />
            </svg>
            <h1 className="text-2xl font-bold">Learnify</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Hero Content */}
      <section className="bg-gradient-to-b from-indigo-500/10 via-blue-500/5 to-transparent py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Elevate Your Learning Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500">Learnify</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                The all-in-one learning management platform designed to help you master new skills, track your progress, and achieve your educational goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sign-in">
                    Sign In to Your Account
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center gap-3 p-4 bg-background/80 rounded-md border border-border/50">
                    <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-full">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Your Progress</p>
                      <p className="text-lg font-semibold">85% Complete</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-4 bg-background/80 rounded-md border border-border/50">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full w-fit">
                      <Award className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                    <p className="text-lg font-semibold">8</p>
                  </div>
                  <div className="flex flex-col gap-3 p-4 bg-background/80 rounded-md border border-border/50">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full w-fit">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-muted-foreground">Courses</p>
                    <p className="text-lg font-semibold">12</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learnify provides all the tools and resources you need to take your learning experience to the next level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-full w-fit mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with detailed analytics and progress tracking tools.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full w-fit mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Course Library</h3>
              <p className="text-muted-foreground">
                Access a wide range of courses across multiple disciplines and skill levels.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full w-fit mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with fellow learners, share insights, and participate in discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-emerald-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of learners who have already transformed their skills and careers with Learnify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
              <Link href="/sign-up">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="footerLeftPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                  <linearGradient id="footerRightPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="url(#footerLeftPageGradient)" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="url(#footerRightPageGradient)" />
              </svg>
              <span className="text-lg font-bold">Learnify</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Learnify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
