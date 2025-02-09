import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth: edgeAuth } = NextAuth(authConfig);

const protectedRoutes = ["/user-info", "/dashboard"];

export default async function middleware(request: NextRequest) {
  const session = await edgeAuth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if(isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};