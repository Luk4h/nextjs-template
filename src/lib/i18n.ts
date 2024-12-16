import type { Locale } from "@/types/Locale";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const i18n = {
    defaultLocale: "en-US",
    locales: ["en-US", "pt-BR"],
} as const;

export function getLocale(headers: Headers): Locale {
    const headerLocale = headers.get("Locale");
    if (headerLocale) {
        return headerLocale as Locale;
    }

    const negotiatorHeaders: Record<string, string> = {};
    for (const [key, value] of headers.entries()) {
        negotiatorHeaders[key] = value;
    }

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales,
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale as Locale;
}

// Check if the pathname already starts with a locale
export const pathnameHasLocale = (pathname: string) =>
    i18n.locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );
