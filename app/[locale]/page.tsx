import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { EmergencyStrip } from "@/components/sections/EmergencyStrip";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { AMCPlans } from "@/components/sections/AMCPlans";
import { Coverage } from "@/components/sections/Coverage";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={l} dict={dict} />
      <EmergencyStrip locale={l} dict={dict} />
      <Services locale={l} dict={dict} />
      <WhyUs locale={l} dict={dict} />
      <ProofGallery locale={l} dict={dict} />
      <Industries locale={l} dict={dict} />
      <Process locale={l} dict={dict} />
      <AMCPlans locale={l} dict={dict} />
      <Coverage locale={l} dict={dict} />
      <Testimonials locale={l} dict={dict} />
      <ContactCTA locale={l} dict={dict} />
    </>
  );
}
