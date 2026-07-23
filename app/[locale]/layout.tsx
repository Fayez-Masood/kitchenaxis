import type { Metadata } from "next";
import "../globals.css";
import "../design-dark.css";
import { fontVariables } from "@/app/fonts";
import { getDictionary, isLocale, dir, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { CSWidget } from "@/components/cs/CSWidget";
import { CallbackTab } from "@/components/CallbackTab";
import { Analytics } from "@/components/analytics/Analytics";
import { site } from "@/lib/site";

const keywords: Record<string, string[]> = {
  en: [
    "commercial kitchen equipment maintenance Saudi Arabia",
    "kitchen equipment repair Riyadh",
    "restaurant equipment repair Jeddah",
    "walk-in cold room repair",
    "commercial refrigeration maintenance",
    "commercial oven and fryer repair",
    "annual maintenance contract kitchen equipment",
    "24/7 emergency kitchen equipment repair",
    "commercial kitchen installation Saudi Arabia",
  ],
  ar: [
    "صيانة معدات المطابخ التجارية السعودية",
    "إصلاح معدات المطاعم الرياض",
    "صيانة غرف التبريد",
    "صيانة التبريد التجاري",
    "إصلاح الأفران والقلايات التجارية",
    "عقود صيانة سنوية لمعدات المطابخ",
    "صيانة طوارئ معدات المطبخ 24 ساعة",
    "تركيب معدات المطابخ التجارية",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const l = isLocale(locale) ? locale : "en";
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: keywords[l],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: l === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <html lang={l} dir={dir(l)} className={`${fontVariables} h-full`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[1100] focus:m-3 focus:rounded-md focus:bg-charcoal-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {l === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>
        {children}
        <CallbackTab locale={l} dict={dict} />
        <CSWidget locale={l} dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
