"use client";
// ============================================================
// LOCAL DEV MOCK — replaces @clerk/nextjs client exports
// All Clerk UI components are replaced with no-op/demo versions
// ============================================================
import React from "react";

// Mock UserButton — shows a simple avatar dropdown
export function UserButton({ afterSignOutUrl: _ }: { afterSignOutUrl?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Demo User"
      >
        D
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 44,
            background: "#1e1e2e",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "8px 0",
            minWidth: 180,
            zIndex: 9999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ padding: "8px 16px", color: "#a1a1aa", fontSize: 12 }}>
            demo@blocklearnx.local
          </div>
          <hr style={{ borderColor: "#333", margin: "4px 0" }} />
          <button
            onClick={() => setOpen(false)}
            style={{
              width: "100%",
              padding: "8px 16px",
              background: "none",
              border: "none",
              color: "#f87171",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Sign out (demo)
          </button>
        </div>
      )}
    </div>
  );
}

// Mock SignIn — redirect-style placeholder
export function SignIn({ routing: _, path: __ }: { routing?: string; path?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 16,
      }}
    >
      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #333",
          borderRadius: 16,
          padding: 40,
          width: 360,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 16 }}>🔐</div>
        <h2 style={{ color: "#f4f4f5", marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
          Sign in to BlockLearnX
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, marginBottom: 24 }}>
          Running in <strong style={{ color: "#6366f1" }}>demo mode</strong> — no auth needed
        </p>
        <a
          href="/dashboard"
          style={{
            display: "block",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continue to Dashboard →
        </a>
      </div>
    </div>
  );
}

// Mock SignUp — same pattern
export function SignUp({ routing: _, path: __ }: { routing?: string; path?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 16,
      }}
    >
      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #333",
          borderRadius: 16,
          padding: 40,
          width: 360,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 16 }}>✨</div>
        <h2 style={{ color: "#f4f4f5", marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
          Create your BlockLearnX account
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: 14, marginBottom: 24 }}>
          Running in <strong style={{ color: "#6366f1" }}>demo mode</strong> — no auth needed
        </p>
        <a
          href="/dashboard"
          style={{
            display: "block",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continue to Dashboard →
        </a>
      </div>
    </div>
  );
}

// Mock ClerkProvider — just passes children through
export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Mock hooks
export function useUser() {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: "demo_student_001",
      firstName: "Demo",
      lastName: "User",
      fullName: "Demo User",
      emailAddresses: [{ emailAddress: "demo@blocklearnx.local" }],
      imageUrl: "",
    },
  };
}

export function useAuth() {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: "demo_student_001",
    sessionId: "demo-session-id",
    signOut: async () => {},
  };
}

export function useClerk() {
  return {
    signOut: async () => {},
    openSignIn: () => {},
    openSignUp: () => {},
  };
}

export function useSession() {
  return {
    isLoaded: true,
    isSignedIn: true,
    session: { id: "demo-session-id" },
  };
}

// Default export for any wildcard imports
export default {
  UserButton,
  SignIn,
  SignUp,
  ClerkProvider,
  useUser,
  useAuth,
  useClerk,
  useSession,
};
