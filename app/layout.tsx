import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnify",
  description: "Master new skills, track your progress, and achieve your learning goals with Learnify.",
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
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Sign in to Learnify",
            subtitle: "to continue to your learning dashboard"
          }
        },
        signUp: {
          start: {
            title: "Create your Learnify account",
            subtitle: "to start your learning journey"
          }
        }
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/book-open.svg" type="image/svg+xml" />
        </head>
        <body className={`${inter.className} h-full`}>{children}</body>
      </html>
    </ClerkProvider>

  )
}