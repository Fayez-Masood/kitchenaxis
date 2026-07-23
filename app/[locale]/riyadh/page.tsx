import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Flame,
  Snowflake,
  Coffee,
  Wrench,
  ClipboardCheck,
  Siren,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { QuoteForm } from "@/components/QuoteForm";
import { HeroBadges } from "@/components/motion/HeroBadges";
import {
  getDictionary,
  isLocale,
  locales,
  otherLocale,
  type Locale,
} from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ar = locale === "ar";
  const title = ar
    ? "صيانة معدات المطابخ التجارية في الرياض | KitchenAxis"
    : "Commercial Kitchen Equipment Repair in Riyadh | KitchenAxis";
  const description = ar
    ? "إصلاح وصيانة وتركيب معدات المطابخ التجارية في الرياض — استجابة طوارئ خلال ساعتين، فنيون معتمدون، وعقود صيانة سنوية للمطاعم والفنادق والمقاهي."
    : "Commercial kitchen equipment repair, maintenance & installation in Riyadh — 2-hour emergency response, certified technicians and AMC plans for restaurants, hotels and cafés.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/riyadh`,
      languages: { en: "/en/riyadh", ar: "/ar/riyadh" },
    },
    openGraph: { title, description, url: `${site.url}/${locale}/riyadh`, type: "website" },
  };
}

const serviceMeta: { icon: LucideIcon; en: string; ar: string }[] = [
  { icon: Flame, en: "Cooking equipment — ranges, fryers, ovens, griddles", ar: "معدات الطهي — مواقد، قلّايات، أفران، شوايات" },
  { icon: Snowflake, en: "Refrigeration & walk-in cold rooms", ar: "التبريد وغرف التبريد" },
  { icon: Coffee, en: "Coffee, espresso & ice machines", ar: "مكائن القهوة والإسبريسو والثلج" },
  { icon: Wrench, en: "Installation & commissioning", ar: "التركيب والتشغيل" },
  { icon: ClipboardCheck, en: "Annual Maintenance Contracts (AMC)", ar: "عقود الصيانة السنوية" },
  { icon: Siren, en: "24/7 emergency callout", ar: "طوارئ على مدار الساعة" },
];

const districts = [
  { en: "Olaya", ar: "العليا" },
  { en: "Al Malaz", ar: "الملز" },
  { en: "King Fahd", ar: "الملك فهد" },
  { en: "Al Sahafa", ar: "الصحافة" },
  { en: "Al Nakheel", ar: "النخيل" },
  { en: "Exit 5–18 & Al Sulay industrial", ar: "المخارج ٥–١٨ والصناعية بالسُلي" },
];

const riyadhFaq = (ar: boolean) => [
  {
    q: ar ? "كم يستغرق وصول الفني في الرياض؟" : "How fast can you reach my kitchen in Riyadh?",
    a: ar
      ? "في حالات الطوارئ نسعى لوصول فني خلال ساعتين إلى معظم أحياء الرياض. الاتصال أو واتساب هو الأسرع."
      : "For emergencies we aim to have a technician on-site within 2 hours across most Riyadh districts. Calling or WhatsApp is fastest.",
  },
  {
    q: ar ? "ما الأحياء التي تخدمونها في الرياض؟" : "Which areas of Riyadh do you cover?",
    a: ar
      ? "نغطي الرياض بالكامل — العليا، الملز، الملك فهد، الصحافة، النخيل، والمناطق الصناعية على المخارج. أخبرنا بموقعك."
      : "We cover all of Riyadh — Olaya, Al Malaz, King Fahd, Al Sahafa, Al Nakheel and the industrial areas along the ring-road exits. Tell us your location.",
  },
  {
    q: ar ? "هل تقدّمون عقود صيانة للمطاعم في الرياض؟" : "Do you offer maintenance contracts for Riyadh restaurants?",
    a: ar
      ? "نعم، عقود صيانة سنوية بزيارات وقائية مجدولة وأولوية استجابة — مثالية للمطاعم والفنادق والمطابخ السحابية في الرياض."
      : "Yes — Annual Maintenance Contracts with scheduled preventive visits and priority response, ideal for Riyadh restaurants, hotels and cloud kitchens.",
  },
];

export default async function RiyadhPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const ar = l === "ar";
  const dict = getDictionary(l);
  const base = `/${l}`;
  const other = otherLocale(l);
  const faq = riyadhFaq(ar);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: `${site.name} — Riyadh`,
        url: `${site.url}/${l}/riyadh`,
        telephone: site.phone,
        email: site.email,
        areaServed: { "@type": "City", name: "Riyadh" },
        address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
      },
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: ar ? "الرياض" : "Riyadh", item: `${site.url}/${l}/riyadh` },
        ],
      },
    ],
  };

  return (
    <div className="kx-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="kx-header">
        <Link href={base} aria-label="KitchenAxis">
          <Logo inverse />
        </Link>
        <nav className="kx-nav" aria-label="Primary">
          <a href={`${base}#services`}>{ar ? "الخدمات" : "Services"}</a>
          <a href={`${base}#plans`}>{ar ? "الباقات" : "Plans"}</a>
          <a href="#contact">{ar ? "تواصل معنا" : "Contact"}</a>
        </nav>
        <div className="kx-actions">
          <Link className="kx-lang" href={`/${other}/riyadh`}>
            {dict.langToggle.target}
          </Link>
          <a className="kx-cta" href="#contact">
            {dict.hero.ctaPrimary}
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <picture className="hero-photo">
            <source media="(max-width: 650px)" srcSet="/images/hero-technician-mobile.webp" />
            <source media="(max-width: 1050px)" srcSet="/images/hero-technician-tablet.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-technician-desktop.webp"
              alt={ar ? "فني كيتشن أكسِس يصلح معدات مطبخ في الرياض" : "KitchenAxis technician repairing kitchen equipment in Riyadh"}
              fetchPriority="high"
            />
          </picture>
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">{ar ? "الرياض · المملكة العربية السعودية" : "Riyadh · Saudi Arabia"}</p>
            <h1>
              {ar ? "صيانة معدات المطابخ" : "Commercial kitchen repair"}
              <br />
              <span>{ar ? "التجارية في الرياض" : "& maintenance in Riyadh"}</span>
            </h1>
            <p className="intro">
              {ar
                ? "إصلاح وصيانة وتركيب معدات المطابخ التجارية في الرياض — بفنيين معتمدين واستجابة طوارئ خلال ساعتين في معظم الأحياء."
                : "Repair, maintenance and installation for commercial kitchens across Riyadh — certified technicians and a 2-hour emergency response to most districts."}
            </p>
            <div className="hero-buttons">
              <a className="btn-primary" href="#contact">
                {dict.hero.ctaPrimary}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </a>
              <a className="btn-secondary" href={`tel:${site.phone}`}>
                {dict.hero.ctaSecondary}
              </a>
            </div>
            <div className="proof">
              <span><BadgeCheck className="size-5" aria-hidden />{ar ? "فنيون معتمدون" : "Certified technicians"}</span>
              <span><Clock className="size-5" aria-hidden />{ar ? "استجابة خلال ساعتين" : "2-hour response"}</span>
              <span><ShieldCheck className="size-5" aria-hidden />{ar ? "أعمال بضمان" : "Warranty-backed work"}</span>
            </div>
          </div>
          <HeroBadges locale={l} />
        </section>

        {/* LOCAL INTRO + SERVICES */}
        <section className="section section-dark" id="services">
          <div className="center-head">
            <p className="kicker">{ar ? "خدماتنا في الرياض" : "Our services in Riyadh"}</p>
            <h2 className="h-xl" style={{ margin: "18px 0 0" }}>
              {ar ? "شريكك لصيانة مطابخ الرياض" : "Your Riyadh kitchen-equipment partner"}
            </h2>
            <p className="sub" style={{ marginTop: 14 }}>
              {ar
                ? "من مطاعم العليا والملز إلى الفنادق والمطابخ السحابية والمطابخ المركزية على أطراف الرياض — فريق واحد مسؤول عن إبقاء مطبخك يعمل."
                : "From restaurants in Olaya and Al Malaz to hotels, cloud kitchens and central kitchens on Riyadh's edges — one accountable team keeping your kitchen running."}
            </p>
          </div>
          <div className="sector-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {serviceMeta.map(({ icon: Icon, en, ar: arLabel }) => (
              <article key={en} style={{ height: "auto", padding: "26px 20px" }}>
                <i>
                  <Icon className="size-6" aria-hidden />
                </i>
                <b style={{ textAlign: "center", lineHeight: 1.4 }}>{ar ? arLabel : en}</b>
              </article>
            ))}
          </div>
        </section>

        {/* WHY LOCAL / COVERAGE */}
        <section className="coverage" id="coverage">
          <div>
            <p className="kicker">{ar ? "تغطية الرياض" : "Riyadh coverage"}</p>
            <h2 className="h-xl">
              {ar ? "نصل إلى مطبخك أينما كان في الرياض" : "We reach your kitchen anywhere in Riyadh"}
            </h2>
            <p className="sub">
              {ar
                ? "فرقنا الميدانية تغطي مدينة الرياض بالكامل، مع قطع غيار أصلية وتقارير خدمة موثّقة لكل زيارة."
                : "Our field teams cover the whole of Riyadh, with genuine spare parts and a documented service report on every visit."}
            </p>
          </div>
          <div className="cities">
            {districts.map((d) => (
              <span key={d.en}>
                <MapPin className="size-4" aria-hidden />
                <b>{ar ? d.ar : d.en}</b>
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq-section" id="faq">
          <div className="center-head">
            <p className="kicker">{ar ? "أسئلة الرياض الشائعة" : "Riyadh FAQ"}</p>
            <h2 className="h-xl" style={{ marginTop: 18 }}>
              {ar ? "إجابات لعملاء الرياض" : "Answers for Riyadh operators"}
            </h2>
          </div>
          <div className="faq-list">
            {faq.map((f, i) => (
              <details className="faq-item" key={i} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div>
            <p className="kicker">{dict.contact.eyebrow}</p>
            <h2 className="h-xl">
              {ar ? "معداتك متوقفة في الرياض؟" : "Equipment down in Riyadh?"}
            </h2>
            <p className="sub">
              {ar
                ? "اتصل أو راسلنا عبر واتساب لأسرع استجابة، أو أرسل بياناتك وسنعاود التواصل معك."
                : "Call or WhatsApp us for the fastest response, or send your details and we'll get back to you."}
            </p>
            <div className="contact-buttons">
              <a className="solid" href={`tel:${site.phone}`} dir="ltr">
                <Phone className="size-4" aria-hidden />
                {site.phoneDisplay}
              </a>
              <a href={whatsappUrl(dict.emergency.whatsappMsg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden />
                {dict.contact.whatsapp}
              </a>
            </div>
          </div>
          <div>
            <QuoteForm locale={l} dict={dict} source="riyadh-page" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0b0d0e]">
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #ff5a0a, #ff8a3a)" }} aria-hidden />
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-12 text-sm text-[#9298a0] md:flex-row md:items-center md:justify-between md:px-8">
          <Logo inverse />
          <p>
            <Link href={base} className="text-[#9aa0a6] hover:text-white">
              {ar ? "← العودة للرئيسية" : "← Back to home"}
            </Link>
          </p>
          <p>© 2026 {site.name} · {ar ? "الرياض" : "Riyadh"}</p>
        </div>
      </footer>
    </div>
  );
}
