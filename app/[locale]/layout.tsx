import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/app/fonts";
import { getDictionary, isLocale, dir, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CSWidget } from "@/components/cs/CSWidget";
import { CallbackTab } from "@/components/CallbackTab";
import { RevealInit } from "@/components/RevealInit";
import { site } from "@/lib/site";

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
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      type: "website",
    },
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
      <body className="min-h-full flex flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[1100] focus:m-3 focus:rounded-md focus:bg-charcoal-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {l === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>
        <Header locale={l} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={l} dict={dict} />
        <CallbackTab locale={l} dict={dict} />
        <CSWidget locale={l} dict={dict} />
        <RevealInit />
      </body>
    </html>
  );
}
