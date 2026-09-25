"use client";

import Image from "next/image";
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
  width = 220,
  variant = "auto",
}: LogoProps) {
  const invertClass =
    variant === "dark"
      ? "invert brightness-200 contrast-200"
      : variant === "light"
        ? ""
        : "mix-blend-multiply dark:mix-blend-screen dark:invert";

  return (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt="BlockLearnX - LEARN • BUILD • BEYOND"
        width={width}
        height={height}
        priority
        className={`object-contain transition-all duration-200 select-none ${invertClass}`}
        style={{ width: "auto", height: `${height}px`, maxHeight: `${height * 1.25}px` }}
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
      <Logo height={height} width={220} variant={variant} />
    </Link>
  );
}
