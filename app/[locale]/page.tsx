import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SiteDark } from "@/components/SiteDark";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: dict.meta.description,
    url: `${site.url}/${l}`,
    telephone: site.phone,
    email: site.email,
    areaServed: site.cities.map((c) => ({ "@type": "City", name: c })),
    address: { "@type": "PostalAddress", addressCountry: "SA" },
    slogan: "Equipment · Service · Excellence",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: l,
    mainEntity: dict.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteDark locale={l} dict={dict} />
    </>
  );
}
