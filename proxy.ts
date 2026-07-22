import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

/**
 * Next.js 16 "Proxy" (formerly Middleware).
 * Redirects any non-localized path to the best-matching locale prefix.
 */
function pickLocale(request: NextRequest): string {
  // 1) Remembered preference
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  // 2) Accept-Language header (Arabic-first market, but honour the browser)
  const accept = request.headers.get("accept-language") ?? "";
  if (/(^|,)\s*ar\b/i.test(accept)) return "ar";
  if (/(^|,)\s*en\b/i.test(accept)) return "en";

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (assets)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
