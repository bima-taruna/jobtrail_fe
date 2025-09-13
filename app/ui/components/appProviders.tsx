"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { setAccessToken } from "@/lib/authToken";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

// Outer provider to wrap your app
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // refetchInterval causes the client to re-request the session periodically
    // so when server-side refresh happens, client session updates.
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <InnerProviders>{children}</InnerProviders>
    </SessionProvider>
  );
}

function InnerProviders({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // default queryFn: queryKey -> [url, opts?]
            queryFn: ({ queryKey }) => {
              const [url, opts] = queryKey as [string, RequestInit?];
              return fetchWithAuth(url, opts);
            },
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  // update in-memory token whenever NextAuth session changes
  useEffect(() => {
    setAccessToken((session as any)?.accessToken);
  }, [session]);

  // if server-side refresh failed, NextAuth sets session.error -> force sign out
  useEffect(() => {
    if ((session as any)?.error === "RefreshAccessTokenError") {
      console.log("failed");
      // you can optionally show a toast before signOut
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
