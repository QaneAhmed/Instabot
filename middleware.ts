import { clerkMiddleware } from "@clerk/nextjs/server";

const PUBLIC_ROUTE_PATTERNS = [
  /^\/?$/,
  /^\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/api\/meta\/webhook$/,
  /^\/api\/meta\/oauth\/callback$/,
];

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTE_PATTERNS.some((regex) => regex.test(pathname));

  if (isPublic) {
    return;
  }

  return auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
