"use client";

import { SignIn } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignInPage() {
  if (!publishableKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 text-center text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
        Clerk is not configured yet. Provide NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to enable sign-in.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <SignIn appearance={{ elements: { card: "shadow-lg" } }} />
    </div>
  );
}
