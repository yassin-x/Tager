import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Pages, Routes } from "./constants/enums";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = pathname.startsWith(`/${Routes.Auth}`);
    const protectedPage = [Routes.Dashboard, Routes.Profile];
    const isProtectedPage = protectedPage.some((route) =>
      pathname.startsWith(`/${route}`)
    );

    if (isProtectedPage && !isAuth) {
      return NextResponse.redirect(
        new URL(`/${Routes.Auth}/${Pages.Login}`, req.url)
      );
    }

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL(`${Routes.Root}`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};