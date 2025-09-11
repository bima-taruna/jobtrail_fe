import { poppins } from "@/app/ui/fonts";
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

export default function Page() {
  return (
    <div className="items-center justify-items-center min-h-screen p-20 pb-20 gap-16 md:p-8">
      <main className="mt-20 md:mt-0 flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className={`${poppins.className} text-2xl text-center font-bold`}>
          Welcome back
        </h1>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Please Log in to your account</CardTitle>
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email : </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password : </Label>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
