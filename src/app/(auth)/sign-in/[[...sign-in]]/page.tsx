"use client";

import Link from "next/link";
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
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          StreamerPulse CRM
        </Link>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account? <Link href="/sign-up" className="font-medium text-zinc-900 underline dark:text-zinc-100">Sign up</Link>
        </p>
      </header>
      <div className="grid flex-1 gap-10 px-6 pb-12 pt-4 lg:grid-cols-2 lg:px-16">
        <section className="hidden flex-col justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-white shadow-xl lg:flex">
          <h1 className="text-3xl font-semibold leading-tight">
            Welcome back to your AI-powered Instagram inbox.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/80">
            Connect your Instagram Business account, track conversations, automate follow-ups, and let friendly-neutral AI summaries keep every lead moving forward.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li>• Unified DM inbox with real-time ingestion</li>
            <li>• AI summaries and suggested replies powered by GPT-4o-mini</li>
            <li>• Follow-up reminders so no client slips through</li>
          </ul>
        </section>
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <h2 className="text-2xl font-semibold">Sign in to your workspace</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Continue managing conversations, AI replies, and follow-ups for your Instagram clients.
            </p>
            <div className="mt-6">
              <SignIn appearance={{ elements: { card: "shadow-none", formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500" } }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
