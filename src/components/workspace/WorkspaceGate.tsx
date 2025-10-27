"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/lib/convex";

export const WorkspaceGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();
  const ensureWorkspace = useMutation(api.mutations.workspace.ensure);
  const workspaceState = useQuery(api.queries.me.getWorkspace);
  const [hasAttemptedEnsure, setHasAttemptedEnsure] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    if (workspaceState === undefined) {
      return;
    }

    if (workspaceState.status === "missing_workspace" && !hasAttemptedEnsure) {
      setHasAttemptedEnsure(true);
      ensureWorkspace()
        .then((result) => {
          if (result.status !== "ok") {
            setErrorMessage(`Workspace bootstrap failed: ${result.status}`);
          }
        })
        .catch((error) => {
          console.error("[workspace] ensure failed", error);
          setErrorMessage(error instanceof Error ? error.message : String(error));
        });
    }
  }, [ensureWorkspace, hasAttemptedEnsure, isSignedIn, workspaceState]);

  const isLoading = useMemo(() => {
    if (!isSignedIn) {
      return false;
    }

    if (workspaceState === undefined) {
      return true;
    }

    if (workspaceState.status === "missing_workspace" && !hasAttemptedEnsure) {
      return true;
    }

    return false;
  }, [hasAttemptedEnsure, isSignedIn, workspaceState]);

  if (!isSignedIn) {
    return <>{children}</>;
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
        <p className="font-medium">Could not set up your workspace</p>
        <p className="max-w-md text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
        <button
          type="button"
          className="rounded-full bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-500"
          onClick={() => {
            setErrorMessage(null);
            setHasAttemptedEnsure(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (isLoading || !workspaceState || workspaceState.status !== "ok") {
    return (
      <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-6 py-8 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
        <span className="flex h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-zinc-300 border-t-transparent dark:border-zinc-700" />
        <p className="text-sm">Preparing your workspace…</p>
      </div>
    );
  }

  return <>{children}</>;
};
