"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  variant?: "light" | "dark" | "auto";
}

export function Logo({
  className = "",
  height = 62,
  variant = "auto",
}: LogoProps) {
  const invertClass = variant === "dark" 
    ? "invert brightness-200 contrast-200" 
    : variant === "light" 
    ? "" 
    : "dark:invert";

  return (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="BlockLearnX - LEARN • BUILD • BEYOND"
        style={{ height: `${height}px`, width: "auto" }}
        className={`object-contain transition-all duration-200 select-none ${invertClass}`}
      />
    </div>
  );
}

export function BrandLogoLink({
  height = 62,
  className = "",
  variant = "auto",
}: {
  height?: number;
  className?: string;
  variant?: "light" | "dark" | "auto";
}) {
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <Logo height={height} variant={variant} />
    </Link>
  );
}
