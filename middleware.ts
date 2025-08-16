import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define paths that should be publicly accessible without authentication
const publicPaths = ["/", "/sign-in", "/sign-up"];

// Helper to check if a path is in the public paths list
const isPublicPath = (path: string): boolean => {
  return publicPaths.some(
    (publicPath) => 
      path === publicPath || 
      path.startsWith(`${publicPath}/`)
  );
};

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;
  
  // IMPORTANT: Root path (/) should always show the landing page for non-authenticated users
  if (path === "/") {
    // If user is authenticated, redirect to dashboard
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Otherwise show the landing page - this is crucial for first-time visitors
    return NextResponse.next();
  }
  
  // Special handling for the (dashboard)/(routes) route
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

  // For all other routes, allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. /public/robots.txt)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js)).*)",
    "/(api|trpc)(.*)"
  ],
};