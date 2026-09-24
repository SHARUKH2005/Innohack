// ============================================================
// LOCAL DEV MOCK — replaces @clerk/nextjs/server exports
// Used by middleware and server components
// ============================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mock clerkMiddleware — pass-through, no auth checks
export function clerkMiddleware(
  handler: (auth: () => { userId: string | null }, req: NextRequest) => Response | void
) {
  return (req: NextRequest) => {
    const mockAuth = () => ({ userId: "demo_student_001" });
    const result = handler(mockAuth, req);
    return result ?? NextResponse.next();
  };
}

// Mock auth() for server components / server actions
export function auth() {
  return {
    userId: "demo_student_001",
    sessionId: "demo-session-id",
    sessionClaims: {},
    protect: () => {},
    redirectToSignIn: () => NextResponse.redirect("/sign-in"),
  };
}

// Mock currentUser for server components
export async function currentUser() {
  return {
    id: "demo_student_001",
    firstName: "Demo",
    lastName: "User",
    fullName: "Demo User",
    emailAddresses: [{ emailAddress: "demo@blocklearnx.local" }],
    imageUrl: "",
  };
}

export default { clerkMiddleware, auth, currentUser };
