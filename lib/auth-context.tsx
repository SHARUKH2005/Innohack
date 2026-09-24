"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "developer" | "provider" | "learner";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatarUrl?: string;
  badge: string;
  walletAddress?: string;
  portalUrl: string;
  capabilities: string[];
}

export const ROLE_ACCOUNTS: Record<UserRole, UserProfile> = {
  developer: {
    id: "dev-001",
    name: "Alex Vance (Platform Provider)",
    email: "provider.admin@blocklearnx.io",
    role: "developer",
    roleTitle: "Platform Provider & Protocol Controller",
    badge: "Platform Provider",
    walletAddress: "0x71C...49A2",
    portalUrl: "/developer",
    capabilities: [
      "Manage Smart Contracts (MXToken, NFTCert, Marketplace)",
      "Configure Automated Reward Rules & Policies",
      "Approve & Verify Course Providers",
      "NFT Studio & Soulbound Certificate Authority",
      "Community Fund & Multisig Treasury Management",
      "Platform Analytics & Security Circuit Breakers"
    ]
  },
  provider: {
    id: "prov-102",
    name: "Dr. Sarah Chen",
    email: "provider@blocklearnx.io",
    role: "provider",
    roleTitle: "Certified Course Provider & Educator",
    badge: "Course Provider",
    walletAddress: "0x39B...88D1",
    portalUrl: "/provider",
    capabilities: [
      "Create & Publish Web3 Courses",
      "Build AI-Powered Quizzes & Rubrics",
      "Upload Lesson Materials & Video Content",
      "Track Student Progress & Completion Rates",
      "Collect & Withdraw MX Token Royalty Revenue"
    ]
  },
  learner: {
    id: "learn-204",
    name: "Marcus Taylor",
    email: "learner@blocklearnx.io",
    role: "learner",
    roleTitle: "Web3 Student & Developer",
    badge: "Course Learner",
    walletAddress: "0x82A...11F4",
    portalUrl: "/dashboard",
    capabilities: [
      "Browse & Enroll in Web3 Courses",
      "Interactive Learning Player with Code Playground",
      "Take AI-Evaluated Assessments & Quizzes",
      "Earn & Mint Soulbound NFT Certificates",
      "Receive MX Token Rewards in MetaMask Wallet"
    ]
  }
};

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("learner");
  const [user, setUser] = useState<UserProfile | null>(ROLE_ACCOUNTS.learner);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("blocklearnx_user_role") as UserRole | null;
      if (savedRole && ROLE_ACCOUNTS[savedRole]) {
        setRole(savedRole);
        setUser(ROLE_ACCOUNTS[savedRole]);
      }
    } catch (e) {
      // Local storage not available in SSR
    }
  }, []);

  const loginAs = (newRole: UserRole) => {
    const profile = ROLE_ACCOUNTS[newRole];
    setRole(newRole);
    setUser(profile);
    try {
      localStorage.setItem("blocklearnx_user_role", newRole);
    } catch (e) {}
    router.push(profile.portalUrl);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("blocklearnx_user_role");
    } catch (e) {}
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return default learner context if outside provider
    return {
      user: ROLE_ACCOUNTS.learner,
      role: "learner" as UserRole,
      isAuthenticated: true,
      loginAs: () => {},
      logout: () => {},
    };
  }
  return context;
}
