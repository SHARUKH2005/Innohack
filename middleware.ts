import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the public routes explicitly
const publicPaths = ["/", "/sign-in", "/sign-up"];

function isPublicPath(path: string): boolean {
  return publicPaths.some(
    publicPath => path === publicPath || 
                  path.startsWith(`${publicPath}/`) ||
                  path.startsWith(`${publicPath}?`)
  );
}

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;
  
  // ALWAYS allow access to public paths without redirection
  if (isPublicPath(path)) {
    // Only redirect if it's the root path AND user is authenticated
    if (path === "/" && userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // For all other public paths, or root path with non-authenticated users
    // allow access without redirection - this ensures landing page is shown
    return NextResponse.next();
  }
  
  // Handle nested routes with special folders
  if (path.includes("(dashboard)") || path.includes("(routes)")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect authenticated users away from auth pages
  if ((path.startsWith("/sign-in") || path.startsWith("/sign-up")) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Handle protected routes - redirect to sign-in if not authenticated
  if (!userId && 
      (path.startsWith("/dashboard") || 
       path.startsWith("/browse") || 
       path.startsWith("/community") || 
       path.startsWith("/courses") || 
       path.startsWith("/progress"))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // For all other routes, allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all paths except...
    '/((?!.*\\..*|_next).*)',
    // Match root exactly
    '/',
    // Match API routes
    '/(api|trpc)(.*)'
  ],
};