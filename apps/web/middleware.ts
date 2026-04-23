import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Split auth config into a separate lightweight file to avoid
// importing the full NextAuth instance in the edge runtime
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // 1. Tenant Resolution — read host header
  const hostname = req.headers.get("host") || "";
  const platformDomain = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "localhost:3000";

  let storeSlug: string | null = null;

  // Handle /s/[slug] path-based resolution (for testing/dev)
  if (pathname.startsWith("/s/")) {
    const segments = pathname.split("/");
    storeSlug = segments[2] || null;
  } 
  // Handle hostname-based resolution
  else if (hostname !== platformDomain && hostname !== `www.${platformDomain}`) {
    if (hostname.endsWith(`.${platformDomain}`)) {
      storeSlug = hostname.replace(`.${platformDomain}`, "");
    } else {
      storeSlug = hostname; // Custom domain
    }
  }

  const requestHeaders = new Headers(req.headers);
  if (storeSlug) {
    requestHeaders.set("x-tenant-slug", storeSlug);
  }

  // 2. Fast JWT read — does NOT call any database, just decodes the cookie
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const role = (token?.role as string) ?? null;

  // 3. Route guards
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isAuthRoute && isAuthenticated) {
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    if (role === "VENDOR") {
      return NextResponse.redirect(new URL("/vendor/dashboard", nextUrl));
    }
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl));
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/403", nextUrl));
    }
  }

  if (pathname.startsWith("/vendor")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl));
    }
    if (role !== "VENDOR" && role !== "SUPER_ADMIN") {
      return NextResponse.rewrite(new URL("/403", nextUrl));
    }
  }

  if (pathname.startsWith("/account")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl));
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico
     * - public assets (images, fonts, etc.)
     * This is more specific than before to avoid running middleware on assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
