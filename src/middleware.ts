import { auth } from "@/auth";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from "./lib/constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  const isApiRouteRoute = pathname.startsWith(API_AUTH_PREFIX)
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  
  if (isApiRouteRoute) {
    return NextResponse.next()
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
    }
    return NextResponse.next()
  }

  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
