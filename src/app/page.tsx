import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-8 py-24 text-center dark:bg-zinc-950">
      <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-zinc-600 shadow-sm dark:bg-zinc-900 dark:text-zinc-300">
        Instagram DM CRM MVP
      </span>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
        Keep every IG conversation organized and AI-assisted.
      </h1>
      <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
        Sign in to connect your Instagram Business account, manage incoming DMs, and let AI craft
        friendly-neutral summaries and suggested replies without leaving the browser.
      </p>
      <Link
        href="/sign-in"
        className="rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Sign in with Clerk
      </Link>
    </main>
  );
}
