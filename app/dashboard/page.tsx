"use client";
import { LogoutButton } from "@/app/ui/auth/LogoutButton";
import { useSession } from "next-auth/react";

export default function Page() {
  // react-query for backend /auth/me

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please log in</p>;

  return (
    <div className="mt-20">
      <h1>Welcome {session?.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}
