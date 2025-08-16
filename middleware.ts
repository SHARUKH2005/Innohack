import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;
  
  // Handle the landing page route
  if (path === "/") {
    // If user is authenticated, redirect to dashboard
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // If not authenticated, show the landing page
    return NextResponse.next();
  }
  
  // Handle other public routes
  if (path.startsWith("/sign-in") || path.startsWith("/sign-up")) {
    // If user is already authenticated and on auth routes, redirect to dashboard
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
  
  // For protected routes, make sure the user is authenticated
  auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};