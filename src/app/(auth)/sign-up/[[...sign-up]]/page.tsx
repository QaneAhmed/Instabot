"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignUpPage() {
  if (!publishableKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 text-center text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
        Clerk is not configured yet. Provide NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to enable sign-up.
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
          Already have an account? <Link href="/sign-in" className="font-medium text-zinc-900 underline dark:text-zinc-100">Sign in</Link>
        </p>
      </header>
      <div className="grid flex-1 gap-10 px-6 pb-12 pt-4 lg:grid-cols-2 lg:px-16">
        <section className="hidden flex-col justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-white shadow-xl lg:flex">
          <h1 className="text-3xl font-semibold leading-tight">
            Open the door to a smarter Instagram CRM.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/80">
            Link your first Instagram Business account and let AI summaries, intents, and reminders organize your DMs while you focus on closing deals.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li>• Secure Clerk authentication per workspace</li>
            <li>• Automated AI analysis of every conversation</li>
            <li>• In-app follow-up reminders and audit logs</li>
          </ul>
        </section>
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <h2 className="text-2xl font-semibold">Create your workspace</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Start receiving Instagram DMs, AI summaries, and follow-ups tailored to beauty and service creators.
            </p>
            <div className="mt-6">
              <SignUp appearance={{ elements: { card: "shadow-none", formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500" } }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
