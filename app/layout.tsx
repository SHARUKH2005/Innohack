import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockLearnX",
  description: "Master new skills, track your progress, and achieve your learning goals with BlockLearnX.",
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
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}