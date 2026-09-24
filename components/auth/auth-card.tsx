"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Wallet, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Building2, 
  Cpu, 
  ChevronRight, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

interface AuthCardProps {
  initialMode?: "login" | "register";
  redirectUrl?: string;
  onSuccess?: () => void;
}

export type RoleType = "learner" | "provider" | "developer";

interface RoleOption {
  id: RoleType;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  portalUrl: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "learner",
    title: "Learner / Student",
    subtitle: "Take Web3 courses, earn $MX bounties & mint Soulbound NFT degrees",
    badge: "Student Portal",
    icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
    color: "text-blue-700",
    borderColor: "border-blue-300 hover:border-blue-600",
    bgColor: "bg-blue-50/80 hover:bg-blue-100/80",
    portalUrl: "/dashboard",
  },
  {
    id: "provider",
    title: "Course Provider / Educator",
    subtitle: "Create courses, upload lessons, set AI rubrics & earn royalties",
    badge: "Educator Portal",
    icon: <Building2 className="h-6 w-6 text-amber-600" />,
    color: "text-amber-800",
    borderColor: "border-amber-300 hover:border-amber-600",
    bgColor: "bg-amber-50/80 hover:bg-amber-100/80",
    portalUrl: "/provider",
  },
  {
    id: "developer",
    title: "Developer / Platform Admin",
    subtitle: "Manage smart contracts, platform rules, fund treasury & approvals",
    badge: "Admin Portal",
    icon: <Cpu className="h-6 w-6 text-purple-600" />,
    color: "text-purple-800",
    borderColor: "border-purple-300 hover:border-purple-600",
    bgColor: "bg-purple-50/80 hover:bg-purple-100/80",
    portalUrl: "/developer",
  },
];

export function AuthCard({ 
  initialMode = "login", 
  redirectUrl = "/dashboard",
  onSuccess 
}: AuthCardProps) {
  const router = useRouter();
  const { signInWithGoogle, loading: authLoading, error: contextError } = useAuth();
  
  // Steps: 1. select-role -> 2. auth-features -> 3. connect-wallet
  const [step, setStep] = useState<"select-role" | "auth-features" | "connect-wallet">("select-role");
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Error & loading states
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const activeError = error || contextError;

  const handleSelectRole = (role: RoleOption) => {
    setSelectedRole(role);
    setError("");
    // Save to local storage for persistence
    try {
      localStorage.setItem("blocklearnx_user_role", role.id);
    } catch (e) {}
    // Move to step 2 (auth features)
    setStep("auth-features");
  };

  const handleGoogleClick = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
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
      // Advance to Connect Wallet step
      setStep("connect-wallet");
    }, 600);
  };

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    setIsConnectingWallet(true);
    setTimeout(() => {
      setIsConnectingWallet(false);
      const target = selectedRole ? selectedRole.portalUrl : redirectUrl;
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(target);
      }
    }, 900);
  };

  const handleSkipWallet = () => {
    const target = selectedRole ? selectedRole.portalUrl : redirectUrl;
    if (onSuccess) {
      onSuccess();
    } else {
      router.push(target);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden font-sans">
      
      {/* Header Banner */}
      <div className="bg-slate-900 px-6 py-6 text-white text-center space-y-2 border-b border-slate-800 relative">
        <div className="flex justify-center mb-1">
          <Logo height={58} variant="dark" />
        </div>
        <p className="text-xs text-slate-300">
          Official Web3 Learning &amp; Soulbound Credential Platform
        </p>

        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center gap-2 pt-3">
          {/* Step 1: Role */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
              step === "select-role" 
                ? "bg-[#0056D2] text-white animate-pulse" 
                : "bg-emerald-500 text-white"
            }`}>
              {step === "select-role" ? "1" : "✓"}
            </span>
            <span className={step === "select-role" ? "text-white font-semibold" : "text-slate-400"}>
              Select Role
            </span>
          </div>

          <div className="w-6 h-0.5 bg-slate-700" />

          {/* Step 2: Auth Features */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
              step === "auth-features" 
                ? "bg-[#0056D2] text-white animate-pulse" 
                : step === "connect-wallet"
                ? "bg-emerald-500 text-white"
                : "bg-slate-800 text-slate-500"
            }`}>
              {step === "connect-wallet" ? "✓" : "2"}
            </span>
            <span className={step === "auth-features" ? "text-white font-semibold" : "text-slate-500"}>
              Login / Register
            </span>
          </div>

          <div className="w-6 h-0.5 bg-slate-700" />

          {/* Step 3: Wallet */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
              step === "connect-wallet" 
                ? "bg-[#0056D2] text-white animate-pulse" 
                : "bg-slate-800 text-slate-500"
            }`}>
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
        
        {/* STEP 1: ROLE SELECTION */}
        {step === "select-role" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-900">Select Your Role</h3>
              <p className="text-xs text-slate-500">
                Choose your primary role to unlock customized platform features
              </p>
            </div>

            <div className="space-y-3">
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(role)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${role.bgColor} ${role.borderColor} flex items-center justify-between group active:scale-[0.99]`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-200 shrink-0">
                      {role.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-black ${role.color}`}>{role.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shadow-2xs">
                          {role.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {role.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: AUTH FEATURES (UNLOCKED AFTER ROLE SELECTION) */}
        {step === "auth-features" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Selected Role Pill Header */}
            {selectedRole && (
              <div className={`p-3 rounded-2xl border ${selectedRole.bgColor} ${selectedRole.borderColor} flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-white shadow-2xs">
                    {selectedRole.icon}
                  </span>
                  <div>
                    <p className={`text-xs font-black ${selectedRole.color}`}>
                      Role: {selectedRole.title}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Will redirect to {selectedRole.badge}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("select-role")}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Change
                </button>
              </div>
            )}

            {/* Mode Switch Tabs (Login / Register) */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMode("login"); setError(""); }}
                className={`py-2.5 rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white text-[#0056D2] shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); setError(""); }}
                className={`py-2.5 rounded-lg transition-all ${
                  mode === "register"
                    ? "bg-white text-[#0056D2] shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Register
              </button>
            </div>

            {/* Official Google Sign-In Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isGoogleLoading || authLoading}
                className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs flex items-center justify-center gap-3 font-bold text-xs text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-all active:scale-[0.99] disabled:opacity-60"
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
                <span>{isGoogleLoading ? "Connecting to Google..." : `Login as ${selectedRole?.title.split("/")[0] || "User"} with Google`}</span>
              </button>

              <div className="relative flex items-center justify-center pt-2">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase absolute">
                  or login with email
                </span>
              </div>
            </div>

            {activeError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{activeError}</span>
              </div>
            )}

            {/* Email/Password Form */}
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
                    Create {selectedRole?.title.split("/")[0] || "User"} Account
                    <ArrowRight className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Login to {selectedRole?.title.split("/")[0] || "User"} Portal
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              {mode === "register" ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(""); }}
                    className="font-bold text-[#0056D2] hover:underline"
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("register"); setError(""); }}
                    className="font-bold text-[#0056D2] hover:underline"
                  >
                    Register now
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: CONNECT WALLET */}
        {step === "connect-wallet" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0056D2] flex items-center justify-center mx-auto">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Connect Web3 Wallet
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your Ethereum or Polygon wallet to claim $MX bounties &amp; mint Soulbound NFT certificates.
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
                    type="button"
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
                type="button"
                onClick={handleSkipWallet}
                className="w-full h-11 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md gap-2"
              >
                <span>Continue to {selectedRole?.badge || "Dashboard"} ↗</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <button
                type="button"
                onClick={() => setStep("auth-features")}
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
