"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";

import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { Button } from "@/app/ui/components/button";
import { useActionState } from "react";
import { authenticate } from "@/lib/auth/actions";
import { useRouter, useSearchParams } from "next/navigation";
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMesssage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Please Log in to your account</CardTitle>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email : </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password : </Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          {errorMesssage && <p className="text-red-500">{errorMesssage}</p>}
        </CardContent>
        <CardFooter className="flex-col mt-3 gap-2">
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button type="submit" className="w-full" aria-disabled={isPending}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
