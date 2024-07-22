import { NextResponse } from 'next/server';
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { defaultLoginRedirect, apiRoutePrefix, publicRoutes, authRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req, event) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(defaultLoginRedirect, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL(defaultLoginRedirect, nextUrl);
    loginUrl.searchParams.set('redirect', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

// this will not invoke Middleware on some path
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
