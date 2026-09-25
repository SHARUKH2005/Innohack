"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/auth-context";
import { useBlockchain } from "@/lib/hooks/useBlockchain";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  Building2,
  Code2,
  Cpu,
  LogIn,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

export type RoleType = "Learner" | "Course Provider" | "Platform Provider / Developer";

interface AuthCardProps {
  initialMode?: "login" | "register";
  redirectUrl?: string;
  onSuccess?: () => void;
}

export function AuthCard({
  initialMode = "login",
  redirectUrl = "/dashboard",
  onSuccess,
}: AuthCardProps) {
  const router = useRouter();
  const { signInWithGoogle, loading: authLoading, error: contextError, setUserRole } = useAuth();
  const { connectWallet, isConnected, walletAddress } = useBlockchain();

  // Step 0: role-selection, Step 1: credentials, Step 2: connect-wallet
  const [step, setStep] = useState<"role-selection" | "credentials" | "connect-wallet">("role-selection");
  const [selectedRole, setSelectedRole] = useState<RoleType>("Learner");
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation / Error states
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const activeError = error || contextError;

  const rolesConfig: {
    id: RoleType;
    title: string;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
    badge: string;
    defaultRedirect: string;
  }[] = [
    {
      id: "Course Provider",
      title: "Course Provider",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200 hover:border-purple-500",
      description: "Create & publish courses, quiz builder, assignment grading, and track revenue.",
      badge: "Educator / University",
      defaultRedirect: "/",
    },
    {
      id: "Learner",
      title: "Learner",
      icon: GraduationCap,
      color: "text-[#0056D2]",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200 hover:border-[#0056D2]",
      description: "Enroll in Web3 courses, complete assignments, earn MX tokens & Soulbound NFTs.",
      badge: "Student / Developer",
      defaultRedirect: "/portfolio",
    },
    {
      id: "Platform Provider / Developer",
      title: "Platform Provider / Developer",
      icon: Code2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200 hover:border-emerald-500",
      description: "Protocol administration, smart contracts deployment, platform metrics & ecosystem ops.",
      badge: "Admin / Protocol Dev",
      defaultRedirect: "/dashboard?tab=blockchain",
    },
  ];

  const handleSelectRoleAndMode = (role: RoleType, selectedMode: "login" | "register") => {
    setSelectedRole(role);
    setMode(selectedMode);
    setError("");
    setStep("credentials");
  };

  const handleGoogleClick = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      if (setUserRole) {
        await setUserRole(selectedRole === "Platform Provider / Developer" ? "Course Provider" : selectedRole);
      }
    } catch (e: any) {
      setError("Google authentication error occurred.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    } else {
      if (!email.trim() || !email.includes("@")) {
        setError("Please enter your registered email address.");
        return;
      }
      if (!password) {
        setError("Please enter your password.");
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (setUserRole) {
        setUserRole(selectedRole === "Platform Provider / Developer" ? "Course Provider" : selectedRole);
      }
      // Advance to Connect Wallet step
      setStep("connect-wallet");
    }, 600);
  };

  const getTargetRedirect = () => {
    if (selectedRole === "Course Provider") return "/";
    if (selectedRole === "Platform Provider / Developer") return "/dashboard?tab=blockchain";
    return "/portfolio";
  };

  const handleWalletSelect = async (walletName: string) => {
    setSelectedWallet(walletName);
    setIsConnectingWallet(true);
    try {
      await connectWallet();
    } catch (err) {
      console.warn("Wallet connect warning:", err);
    } finally {
      setIsConnectingWallet(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(getTargetRedirect());
      }
    }
  };

  const handleSkipWallet = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push(getTargetRedirect());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 px-6 py-6 text-white text-center space-y-2 border-b border-slate-800 relative">
        <div className="flex justify-center mb-1">
          <Logo height={44} width={180} variant="dark" />
        </div>
        <p className="text-xs text-slate-300">
          Official Web3 Learning &amp; Soulbound Credential Platform
        </p>

        {/* 3 Step Progress Indicator */}
        <div className="flex items-center justify-center gap-2 pt-3">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === "role-selection"
                  ? "bg-[#0056D2] text-white"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {step === "role-selection" ? "1" : "✓"}
            </span>
            <span className={step === "role-selection" ? "text-white font-semibold" : "text-slate-400"}>
              Category
            </span>
          </div>

          <div className="w-6 h-0.5 bg-slate-700" />

          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === "credentials"
                  ? "bg-[#0056D2] text-white"
                  : step === "connect-wallet"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {step === "connect-wallet" ? "✓" : "2"}
            </span>
            <span className={step === "credentials" ? "text-white font-semibold" : "text-slate-500"}>
              {mode === "login" ? "Login" : "Register"}
            </span>
          </div>

          <div className="w-6 h-0.5 bg-slate-700" />

          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                step === "connect-wallet"
                  ? "bg-[#0056D2] text-white animate-pulse"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              3
            </span>
            <span className={step === "connect-wallet" ? "text-white font-semibold" : "text-slate-500"}>
              Wallet
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* STEP 0: ROLE SELECTION */}
        {step === "role-selection" && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0056D2] text-[11px] font-extrabold uppercase tracking-wider">
                Step 1 of 3: Choose Portal Category
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Select Your Account Type
              </h2>
              <p className="text-xs text-slate-500">
                Choose your category below to access the dedicated login or registration portal.
              </p>
            </div>

            {/* 3 Categories Grid */}
            <div className="space-y-4">
              {rolesConfig.map((role) => {
                const IconComp = role.icon;
                return (
                  <div
                    key={role.id}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-3 bg-white ${role.borderColor} hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${role.bgColor} ${role.color} flex items-center justify-center shrink-0`}>
                          <IconComp className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base">{role.title}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600">
                              {role.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dedicated Login & Sign Up buttons for this category */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      <Button
                        type="button"
                        onClick={() => handleSelectRoleAndMode(role.id, "login")}
                        className="h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl gap-1.5 shadow-sm"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Login
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleSelectRoleAndMode(role.id, "register")}
                        className="h-10 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl gap-1.5 shadow-sm"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Sign Up
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1: CREDENTIALS */}
        {step === "credentials" && (
          <>
            {/* Active Category Header Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Selected Category:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0056D2]/10 text-[#0056D2] text-xs font-bold">
                  {selectedRole === "Course Provider" && "👨‍🏫 "}
                  {selectedRole === "Learner" && "🎓 "}
                  {selectedRole === "Platform Provider / Developer" && "💻 "}
                  {selectedRole}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep("role-selection")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Change
              </button>
            </div>

            {/* Mode Switch Tabs (Login / Register) */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`py-2.5 rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white text-[#0056D2] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Login ({selectedRole})
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={`py-2.5 rounded-lg transition-all ${
                  mode === "register"
                    ? "bg-white text-[#0056D2] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Register ({selectedRole})
              </button>
            </div>

            {/* Google Sign-In Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isGoogleLoading || authLoading}
                className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs flex items-center justify-center gap-3 font-semibold text-xs text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {isGoogleLoading || authLoading ? (
                  <RefreshCw className="h-4 w-4 text-[#0056D2] animate-spin" />
                ) : (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{isGoogleLoading ? "Connecting to Google..." : `Continue with Google as ${selectedRole}`}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase absolute">
                  or continue with email
                </span>
              </div>
            </div>

            {activeError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{activeError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Sharukh Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 text-xs border-slate-300 focus:border-[#0056D2]"
                    required={mode === "register"}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="sharukh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-xs border-slate-300 focus:border-[#0056D2]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-xs border-slate-300 focus:border-[#0056D2]"
                  required
                />
              </div>

              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 text-xs border-slate-300 focus:border-[#0056D2]"
                    required={mode === "register"}
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md transition-all mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : mode === "register" ? (
                  <span className="flex items-center gap-1.5">
                    Register as {selectedRole}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Login as {selectedRole}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("role-selection")}
                className="font-semibold text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
              >
                ← Back to Portal Select
              </button>

              {mode === "register" ? (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="font-bold text-[#0056D2] hover:underline"
                  >
                    Login now
                  </button>
                </p>
              ) : (
                <p>
                  Need an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="font-bold text-[#0056D2] hover:underline"
                  >
                    Register now
                  </button>
                </p>
              )}
            </div>
          </>
        )}

        {/* STEP 2: CONNECT WALLET */}
        {step === "connect-wallet" && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0056D2] flex items-center justify-center mx-auto">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Connect Web3 Wallet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your Ethereum or Polygon wallet to claim $MX bounties &amp; mint Soulbound NFT certificates for{" "}
                <span className="font-bold text-[#0056D2]">{selectedRole}</span>.
              </p>
            </div>

            {/* Wallet Selection List */}
            <div className="space-y-2.5">
              {[
                { name: "MetaMask", badge: "Popular EVM Wallet", icon: "🦊" },
                { name: "Coinbase Wallet", badge: "Smart Wallet", icon: "🔵" },
                { name: "Phantom", badge: "Solana & EVM", icon: "👻" },
                { name: "WalletConnect", badge: "QR Code / Mobile", icon: "🔗" },
              ].map((w) => {
                const isSelected = selectedWallet === w.name;
                return (
                  <button
                    key={w.name}
                    onClick={() => handleWalletSelect(w.name)}
                    disabled={isConnectingWallet}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? "border-[#0056D2] bg-blue-50/80 shadow-sm"
                        : "border-slate-200 hover:border-[#0056D2] hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{w.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{w.name}</p>
                        <p className="text-[10px] text-slate-500">{w.badge}</p>
                      </div>
                    </div>

                    {isConnectingWallet && isSelected ? (
                      <RefreshCw className="h-4 w-4 text-[#0056D2] animate-spin" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <Button
                onClick={handleSkipWallet}
                className="w-full h-11 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md gap-2"
              >
                <span>Continue to {selectedRole} Portal ↗</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1"
              >
                ← Back to Credentials
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
