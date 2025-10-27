import { clerkMiddleware } from "@clerk/nextjs/server";

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

    return authResult.redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
