/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const accessibleRoutes = ["/login", "/register"];
const isAccessible = (route: string) => accessibleRoutes.includes(route);

const unaccessibleRoutes = ["/", "/home", "/profile"];
const isUnaccessible = (route: string) => unaccessibleRoutes.includes(route);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sky_session")?.value || null;

  console.log(token);

  if (!token && isUnaccessible(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAccessible(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/home",
    "/profile",
    "/login",
    "/register",
  ],
};
