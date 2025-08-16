import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;
  
  // Special handling for the root/index route
  if (path === "/") {
    // If user is authenticated, redirect to dashboard
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Otherwise show the landing page
    return NextResponse.next();
  }
  
  // Special handling for the (dashboard)/(routes) route - unlikely to match directly in URL
  if (path.includes("(dashboard)") || path.includes("(routes)")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is on an auth page but already signed in, redirect to dashboard
  if ((path.startsWith("/sign-in") || path.startsWith("/sign-up")) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is on a protected route but not signed in, redirect to sign-in
  if ((path.startsWith("/dashboard") || 
       path.startsWith("/browse") || 
       path.startsWith("/community") || 
       path.startsWith("/courses") || 
       path.startsWith("/progress")) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};