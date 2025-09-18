import { poppins } from "@/app/ui/fonts";
import LoginForm from "../ui/auth/LoginForm";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="items-center justify-items-center min-h-screen p-20 pb-20 gap-16 md:p-8">
      <div className="mt-20 md:mt-0 flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className={`${poppins.className} text-2xl text-center font-bold`}>
          Welcome back
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
