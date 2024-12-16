import baseConfig from "@/auth/baseConfig";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { getLocale, pathnameHasLocale } from "./lib/i18n";

const { auth } = NextAuth(baseConfig);

const publicRoutes = ["signin", "signup", "forgot-password", "reset-password"];

const publicRoutesRegex = new RegExp(
    `^(\/[a-z]{2}\-[A-Z]{2}\/)?(${publicRoutes.join("|")})$`,
);

export default auth((req) => {
    const { origin, pathname, search } = req.nextUrl;

    const locale = getLocale(req.headers);

    if (!pathnameHasLocale(pathname)) {
        // Construct the new URL with the correct locale
        const newUrl = new URL(`/${locale}/${pathname}`, origin);
        newUrl.search = search;
        return NextResponse.redirect(newUrl);
    }

    if (!req.auth && !publicRoutesRegex.test(pathname)) {
        const newUrl = new URL(`/${locale}/signin`, origin);
        newUrl.search = search;
        return Response.redirect(newUrl);
    }

    const response = NextResponse.next();
    response.headers.set("locale", locale);
    return response;
});

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public|.*.svg|.*.png|.*.json|.*.webp|.*.ico|.*.css).*)",
    ],
};
