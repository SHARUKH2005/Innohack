"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  showTagline?: boolean;
  variant?: "light" | "dark" | "auto";
}

export function Logo({
  className = "",
  height = 40,
}: LogoProps) {
  return (
    <div className={`relative flex items-center shrink-0 gap-2.5 ${className}`}>
      <div 
        className="rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105"
        style={{ width: `${height}px`, height: `${height}px` }}
      >
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          BlockLearnX
        </span>
      </div>
    </div>
  );
}

export function BrandLogoLink({
  height = 40,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <Logo height={height} />
    </Link>
  );
}
