"use client";

import { usePathname, useRouter } from "next/navigation";
import { otherLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LanguageToggle({
  locale,
  targetLabel,
  aria,
  className,
}: {
  locale: Locale;
  targetLabel: string;
  aria: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const next = otherLocale(locale);

  function switchLocale() {
    // Replace the leading /<locale> segment with the target locale
    const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
    const nextPath = `/${next}${rest || ""}`;
    // Remember the choice for the proxy
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(nextPath);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={aria}
      lang={next}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full border border-charcoal-200 px-3 text-sm font-semibold text-charcoal-700 transition-colors hover:border-charcoal-400 hover:text-charcoal-900",
        className,
      )}
    >
      {targetLabel}
    </button>
  );
}
