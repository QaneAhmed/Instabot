import { ReactNode } from "react";
import Link from "next/link";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Link href="/inbox" className="text-base font-semibold">
          Insta DM CRM
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/inbox">Inbox</Link>
          <Link href="/connect">Connect</Link>
          <Link href="/settings">Settings</Link>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-6xl flex-1 pb-12">{children}</main>
    </div>
  );
}
