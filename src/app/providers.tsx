"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo, useState } from "react";

const getConvexUrl = () => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("NEXT_PUBLIC_CONVEX_URL is not set. Convex client disabled.");
    }
    return null;
  }
  return url;
};

const useConvexClient = () => {
  const url = getConvexUrl();
  const convexClientFactory = () =>
    url ? new ConvexReactClient(url, { unsavedChangesWarning: false }) : null;

  const [client] = useState(convexClientFactory);

  return client;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  const client = useConvexClient();
  const content = useMemo(() => children, [children]);

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <>{content}</>;
  }

  if (!client) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={client} useAuth={useAuth}>
        {content}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
