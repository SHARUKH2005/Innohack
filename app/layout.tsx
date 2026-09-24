import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/supabase/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockLearnX | Learn. Prove. Earn. — Web3 Proof-of-Skill Platform",
  description: "Master Solidity, Rust & ZK protocols. Pass AI-powered smart contract evaluations, mint Soulbound NFT credentials, and earn crypto bounties.",
  icons: {
    icon: [
      {
        url: "/book-open.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/book-open.svg"],
    apple: [
      {
        url: "/book-open.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/book-open.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}