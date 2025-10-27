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
    if (process.env.NODE_ENV !== "production") {
      console.info("[middleware] allowing public route", { pathname });
    }
    return;
  }

  const authResult = await auth();

  if (process.env.NODE_ENV !== "production") {
    console.info("[middleware] resolved auth", {
      pathname,
      userId: authResult.userId,
      hasSession: Boolean(authResult.sessionId),
    });
  }

  const { userId } = authResult;

  if (!userId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[middleware] unauthenticated access, redirecting to sign-in", {
        pathname,
      });
    }

    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("redirect_url", req.nextUrl.href);

    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
