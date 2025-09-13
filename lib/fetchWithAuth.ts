import { getAccessToken, setAccessToken } from "./authToken";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = getAccessToken();

  if (!token) {
    // no token yet → let caller decide (don’t signOut here)
    throw new Error("No token available");
  }

  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // 🚨 If unauthorized, try refreshing session once
  if (res.status === 401) {
    console.warn("Token expired, trying refresh...");

    const session = await getSession(); // forces NextAuth refresh cycle
    const newToken = (session as any)?.accessToken;

    if (newToken) {
      setAccessToken(newToken); // update in-memory cache

      res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
      });
    }
  }

  // still unauthorized → force signout
  if (res.status === 401) {
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized, signed out");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText || "API Error");
  }

  return res.json();
}
