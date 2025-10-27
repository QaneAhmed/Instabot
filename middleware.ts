import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTE_PATTERNS = [
  /^\/?$/,
  /^\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/api\/meta\/webhook$/,
  /^\/api\/meta\/oauth\/callback$/,
];

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTE_PATTERNS.some((regex) => regex.test(pathname));

  if (isPublic) {
    console.info("[middleware] allowing public route", { pathname });
    return;
  }

  const authResult = await auth();

  console.info("[middleware] resolved auth", {
    pathname,
    userId: authResult.userId,
    hasSession: Boolean(authResult.sessionId),
    sessionId: authResult.sessionId,
    orgRole: authResult.orgRole,
  });

  const { userId } = authResult;

  if (!userId) {
    console.warn("[middleware] unauthenticated access, redirecting to sign-in", {
      pathname,
      search: req.nextUrl.search,
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    });

    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("redirect_url", req.nextUrl.href);

    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
