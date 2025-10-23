"use client";

import { useState } from "react";

const SAMPLE_CONTACTS = [
  { id: "1", handle: "@sample_client", lastMessageAt: "Just now" },
  { id: "2", handle: "@another_handle", lastMessageAt: "1h ago" },
];

export default function InboxPage() {
  const [selectedContact, setSelectedContact] = useState(SAMPLE_CONTACTS[0]?.id ?? null);

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col bg-zinc-950/5 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Inbox</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          This page will surface contacts, conversations, AI summaries, and follow-ups once the data
          layer is wired up.
        </p>
      </header>
      <div className="flex flex-1 divide-x divide-zinc-200 overflow-hidden dark:divide-zinc-800">
        <aside className="w-72 overflow-y-auto bg-white dark:bg-zinc-950">
          <div className="sticky top-0 border-b border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Contacts
          </div>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {SAMPLE_CONTACTS.map((contact) => (
              <li key={contact.id}>
                <button
                  type="button"
                  onClick={() => setSelectedContact(contact.id)}
                  className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                    selectedContact === contact.id ? "bg-zinc-100 dark:bg-zinc-900" : ""
                  }`}
                >
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {contact.handle}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    Last message · {contact.lastMessageAt}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
          <div className="flex h-full flex-col">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Conversation placeholder
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Messages from Convex will appear here once ingestMessage is implemented.
              </p>
            </div>
            <div className="flex-1 px-6 py-8">
              <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <p>
                  • Incoming messages from Instagram will be rendered in chronological order with
                  sender separation.
                </p>
                <p>• Outbound replies will call the Convex action to send text via the Graph API.</p>
              </div>
            </div>
            <form className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <textarea
                rows={3}
                className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                placeholder="Type a reply to send via Instagram..."
                disabled
              />
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Outbound messaging will be enabled after integrating Convex actions and Meta API.
              </p>
            </form>
          </div>
        </main>
        <section className="w-80 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
          <div className="border-b border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            AI & Follow-ups
          </div>
          <div className="space-y-6 px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Summary (pending)
              </h3>
              <p className="mt-2 text-sm">
                AI summaries, intents, and suggestions will populate here using the OpenAI pipeline.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Follow-ups
              </h3>
              <p className="mt-2 text-sm">Reminders created in Convex will be listed here.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
