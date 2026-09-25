"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  created_at: string;
  last_login_at: string;
  role: "Learner" | "Course Provider" | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isNewUser: boolean;
  showRoleModal: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUserRole: (role: "Learner" | "Course Provider") => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // 1. Initial Session Check & Local Storage Fallback
    const initSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.warn("Supabase session check notice:", sessionError.message);
        }

        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await fetchOrCreateProfile(session.user);
        } else {
          // Check local storage for persistent mock session if Supabase env is not yet configured
          const storedProfile = localStorage.getItem("blocklearnx_user_profile");
          if (storedProfile) {
            try {
              const parsed = JSON.parse(storedProfile);
              setProfile(parsed);
              setUser({
                id: parsed.id,
                email: parsed.email,
                user_metadata: {
                  full_name: parsed.full_name,
                  avatar_url: parsed.avatar_url,
                },
                app_metadata: {},
                aud: "authenticated",
                created_at: parsed.created_at,
              } as unknown as User);
            } catch (e) {
              localStorage.removeItem("blocklearnx_user_profile");
            }
          }
        }
      } catch (err: any) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // 2. Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        setUser(currentSession.user);
        await fetchOrCreateProfile(currentSession.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        localStorage.removeItem("blocklearnx_user_profile");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper to sync user profile into state & database/localStorage
  const fetchOrCreateProfile = async (authUser: User) => {
    const now = new Date().toISOString();
    const meta = authUser.user_metadata || {};

    const fullName = meta.full_name || meta.name || authUser.email?.split("@")[0] || "BlockLearnX Learner";
    const avatarUrl = meta.avatar_url || meta.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    // Try fetching from Supabase 'profiles' table if available
    try {
      const { data: existingProfile, error: fetchErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (existingProfile && !fetchErr) {
        // Update last login
        const updatedProfile: UserProfile = {
          ...existingProfile,
          last_login_at: now,
        };
        setProfile(updatedProfile);
        localStorage.setItem("blocklearnx_user_profile", JSON.stringify(updatedProfile));

        // Update database last_login_at asynchronously
        supabase.from("profiles").update({ last_login_at: now }).eq("id", authUser.id);

        if (!existingProfile.role) {
          setIsNewUser(true);
          setShowRoleModal(true);
        }
        return;
      }
    } catch (e) {
      // Ignore database table errors if table not created yet
    }

    // Default or initial profile creation
    const newProfile: UserProfile = {
      id: authUser.id,
      full_name: fullName,
      email: authUser.email || "",
      avatar_url: avatarUrl,
      created_at: authUser.created_at || now,
      last_login_at: now,
      role: null,
    };

    setProfile(newProfile);
    localStorage.setItem("blocklearnx_user_profile", JSON.stringify(newProfile));
    setIsNewUser(true);
    setShowRoleModal(true);

    // Save to Supabase DB if enabled
    try {
      await supabase.from("profiles").upsert(newProfile);
    } catch (e) {
      // Graceful fallback to local session state
    }
  };

  // Google OAuth Trigger
  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
      const redirectTo = `${appUrl}/auth/callback?redirect=/dashboard`;

      // Check if real Supabase keys exist
      const hasRealSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project");

      if (hasRealSupabase) {
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (oauthError) {
          if (oauthError.message.includes("cancelled") || oauthError.message.includes("canceled")) {
            setError("Google sign-in was cancelled.");
          } else {
            setError(`Authentication failed: ${oauthError.message}`);
          }
        }
      } else {
        // Fallback local test mode for Google Sign-In when Supabase keys aren't added yet
        setTimeout(() => {
          const mockUser: User = {
            id: `google-user-${Date.now()}`,
            email: "sharukh.google@blocklearnx.edu",
            user_metadata: {
              full_name: "Sharukh Khan (Google)",
              avatar_url: "https://lh3.googleusercontent.com/a/ACg8ocI8K...=s96-c",
            },
            app_metadata: {},
            aud: "authenticated",
            created_at: new Date().toISOString(),
          } as unknown as User;

          setUser(mockUser);
          fetchOrCreateProfile(mockUser);
          setLoading(false);
        }, 1000);
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("Network error occurred during Google sign-in. Please try again.");
      setLoading(false);
    }
  };

  // Set User Role (Onboarding)
  const setUserRole = async (role: "Learner" | "Course Provider") => {
    if (!profile) return;

    const updatedProfile: UserProfile = {
      ...profile,
      role,
    };

    setProfile(updatedProfile);
    localStorage.setItem("blocklearnx_user_profile", JSON.stringify(updatedProfile));
    setShowRoleModal(false);

    try {
      await supabase.from("profiles").update({ role }).eq("id", profile.id);
    } catch (e) {
      // Local state updated
    }
  };

  // Sign out / Logout
  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    } finally {
      setUser(null);
      setProfile(null);
      setSession(null);
      localStorage.removeItem("blocklearnx_user_profile");
      setLoading(false);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        error,
        isNewUser,
        showRoleModal,
        signInWithGoogle,
        logout,
        setUserRole,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
