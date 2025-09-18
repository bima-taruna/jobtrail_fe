import { LogoutButton } from "@/app/ui/auth/LogoutButton";
import { useSession } from "next-auth/react";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  // react-query for backend /auth/me

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-20 px-3 ">
      <h1>Welcome {session?.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}
