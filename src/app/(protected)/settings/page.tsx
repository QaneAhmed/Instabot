export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          This area will surface integration health, webhook delivery status, and token expiry
          details.
        </p>
      </header>
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Integration status
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Fetch and display the connected Page, Instagram business account, and long-lived token
          expiry using Convex queries.
        </p>
      </section>
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Webhook activity</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Store the timestamp of the most recent webhook in Convex and render it here to confirm the
          ingestion pipeline remains healthy.
        </p>
      </section>
    </div>
  );
}
