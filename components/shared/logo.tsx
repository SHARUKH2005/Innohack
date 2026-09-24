"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  showTagline?: boolean;
  variant?: "light" | "dark" | "auto";
}

export function Logo({
  className = "",
  height = 52,
  width = 220,
  variant = "auto",
}: LogoProps) {
  return (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt="BlockLearnX - Learn • Build • Beyond"
        width={width}
        height={height}
        priority
        className={`object-contain transition-transform hover:scale-[1.03] ${
          variant === "dark" 
            ? "invert brightness-200" 
            : "mix-blend-multiply dark:mix-blend-screen dark:invert"
        }`}
        style={{ width: "auto", height: `${height}px`, maxHeight: `${height * 1.25}px` }}
      />
    </div>
  );
}

export function BrandLogoLink({
  height = 52,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <Logo height={height} width={220} />
    </Link>
  );
}
