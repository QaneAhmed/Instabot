import Link from "next/link";

export default function ConnectPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Connect Instagram
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Start the Meta OAuth flow to authorize Instagram messaging. Once connected, new DMs will
          sync into your inbox automatically.
        </p>
      </header>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <ol className="space-y-4 text-zinc-700 dark:text-zinc-200">
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
              1
            </span>
            <p>Review your Meta App credentials in the project settings.</p>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
              2
            </span>
            <p>Click the connect button below to launch Meta OAuth.</p>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
              3
            </span>
            <p>After a successful exchange you will be redirected to the inbox.</p>
          </li>
        </ol>
        <form action="/api/meta/oauth/start" className="mt-8">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Connect Instagram
          </button>
        </form>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Need help?{" "}
        <Link href="/settings" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          Check webhook status in settings
        </Link>
        .
      </p>
    </div>
  );
}
