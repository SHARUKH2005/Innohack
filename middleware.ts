import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// LOCAL DEV MODE: Auth bypass — no Clerk API keys required
// All routes are accessible; auth is mocked.
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js)).*)",
    "/(api|trpc)(.*)"
  ],
};