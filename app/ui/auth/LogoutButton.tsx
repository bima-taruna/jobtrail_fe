"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/app/ui/components/button";

export function LogoutButton() {
  const { data: session } = useSession();

  async function handleLogout() {
    try {
      const token = (session as any)?.accessToken;
      if (token) {
        // call your backend logout to blacklist jti
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: "GET", // your route uses GET
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Backend logout failed", err);
    } finally {
      // always clear client session
      signOut({ callbackUrl: "/login" });
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
