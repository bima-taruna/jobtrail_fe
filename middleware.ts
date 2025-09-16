import { auth } from "./app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*"],
};
