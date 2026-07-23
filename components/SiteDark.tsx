"use client";

import Link from "next/link";
import {
  Flame,
  Snowflake,
  Coffee,
  Wrench,
  ClipboardCheck,
  Siren,
  BadgeCheck,
  Clock,
  PackageCheck,
  ShieldCheck,
  Utensils,
  BedDouble,
  ChefHat,
  Stethoscope,
  Truck,
  Phone,
  Search,
  Check,
  MapPin,
  Mail,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Motion";
import { HeroBadges } from "@/components/motion/HeroBadges";
import { otherLocale, type Dictionary, type Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

type ServiceKey = keyof Dictionary["services"]["items"];
type PointKey = keyof Dictionary["why"]["points"];
type SectorKey = keyof Dictionary["industries"]["items"];
type StepKey = keyof Dictionary["process"]["steps"];

const serviceMeta: { key: ServiceKey; Icon: LucideIcon; img: string }[] = [
  { key: "cooking", Icon: Flame, img: "/images/service.jpg" },
  { key: "refrigeration", Icon: Snowflake, img: "/images/refrigeration-v2.webp" },
  { key: "beverage", Icon: Coffee, img: "/images/kitchen.jpg" },
  { key: "installation", Icon: Wrench, img: "/images/fabrication.jpg" },
  { key: "amc", Icon: ClipboardCheck, img: "/images/field-team-v2.webp" },
  { key: "emergency", Icon: Siren, img: "/images/installation-v2.webp" },
];

const benefitMeta: { key: PointKey; Icon: LucideIcon }[] = [
  { key: "certified", Icon: BadgeCheck },
  { key: "response", Icon: Clock },
  { key: "parts", Icon: PackageCheck },
  { key: "warranty", Icon: ShieldCheck },
];

const sectorMeta: { key: SectorKey; Icon: LucideIcon }[] = [
  { key: "restaurants", Icon: Utensils },
  { key: "hotels", Icon: BedDouble },
  { key: "cafes", Icon: Coffee },
  { key: "bakeries", Icon: ChefHat },
  { key: "hospitals", Icon: Stethoscope },
  { key: "catering", Icon: Truck },
];

const stepMeta: { key: StepKey; Icon: LucideIcon }[] = [
  { key: "book", Icon: Phone },
  { key: "diagnose", Icon: Search },
  { key: "service", Icon: Wrench },
  { key: "report", Icon: ClipboardCheck },
];

const planOrder = ["basic", "pro", "enterprise"] as const;
const workStrip = [
  "field-team-v2.webp",
  "fabrication.jpg",
  "service.jpg",
  "refrigeration-v2.webp",
  "installation-v2.webp",
];

export function SiteDark({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ar = locale === "ar";
  const base = `/${locale}`;
  const other = otherLocale(locale);
  const cities = ar ? site.citiesAr : site.cities;
  const s = dict.why.stats;
  const serviceTitles = Object.values(dict.services.items).map((x) => x.title);

  const nav = [
    { id: "services", label: ar ? "الخدمات" : "Services" },
    { id: "why", label: ar ? "لماذا نحن" : "Why us" },
    { id: "work", label: ar ? "أعمالنا" : "Work" },
    { id: "plans", label: ar ? "الباقات" : "Plans" },
    { id: "contact", label: ar ? "تواصل معنا" : "Contact" },
  ];
  const k = (n: string, txt: string) => `${n} / ${txt}`;

  return (
    <div className="kx-site">
      {/* HEADER */}
      <header className="kx-header">
        <Link href={base} aria-label="KitchenAxis">
          <Logo inverse />
        </Link>
        <nav className="kx-nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="kx-actions">
          <Link className="kx-lang" href={`/${other}`} aria-label={dict.langToggle.aria}>
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
          <div className="hero-photo" />
          <div className="hero-shade" />
          <StaggerGroup as="div" className="hero-content">
            <StaggerItem as="p" className="eyebrow">
              {dict.hero.eyebrow}
            </StaggerItem>
            <StaggerItem as="h1">
              {dict.hero.titleLead}
              <br />
              <span>{dict.hero.titleAccent}</span>
            </StaggerItem>
            <StaggerItem as="p" className="intro">
              {dict.hero.subtitle}
            </StaggerItem>
            <StaggerItem as="div" className="hero-buttons">
              <a className="btn-primary" href="#contact">
                {dict.hero.ctaPrimary}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </a>
              <a className="btn-secondary" href={`tel:${site.phone}`}>
                {dict.hero.ctaSecondary}
              </a>
            </StaggerItem>
            <StaggerItem as="div" className="proof">
              <span>
                <BadgeCheck className="size-5" aria-hidden />
                {dict.hero.trust[0]}
              </span>
              <span>
                <Clock className="size-5" aria-hidden />
                {dict.hero.trust[1]}
              </span>
              <span>
                <ShieldCheck className="size-5" aria-hidden />
                {dict.hero.trust[2]}
              </span>
            </StaggerItem>
          </StaggerGroup>
          <HeroBadges locale={locale} />
        </section>

        {/* SERVICES */}
        <section className="section section-dark" id="services">
          <Reveal as="div" className="section-head">
            <p className="kicker">{k("01", dict.services.eyebrow)}</p>
            <h2 className="h-xl">{dict.services.title}</h2>
            <p className="sub">{dict.services.intro}</p>
          </Reveal>
          <StaggerGroup as="div" className="service-cards">
            {serviceMeta.map(({ key, Icon, img }) => {
              const it = dict.services.items[key];
              return (
                <StaggerItem as="article" key={key}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={it.title} loading="lazy" />
                  <div className="card-icon">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <div className="body">
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* WHY */}
        <section className="why" id="why">
          <Reveal as="div" className="why-copy">
            <p className="kicker">{k("02", dict.why.eyebrow)}</p>
            <h2 className="h-xl">{dict.why.title}</h2>
            <p className="lead">{dict.why.intro}</p>
            <div className="benefits">
              {benefitMeta.map(({ key, Icon }) => {
                const p = dict.why.points[key];
                return (
                  <article key={key}>
                    <i>
                      <Icon className="size-5" aria-hidden />
                    </i>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </article>
                );
              })}
            </div>
          </Reveal>
          <Reveal as="div" className="why-image" delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/refrigeration-v2.webp"
              alt={
                ar
                  ? "فني كيتشن أكسِس يصون معدات تبريد تجارية"
                  : "KitchenAxis technician servicing commercial refrigeration"
              }
              loading="lazy"
            />
            <div className="stats">
              <div>
                <b>
                  {site.yearsExperience}
                  {s.years.suffix}
                </b>
                <span>{s.years.label}</span>
              </div>
              <div>
                <b>
                  {site.kitchensServed}
                  {s.kitchens.suffix}
                </b>
                <span>{s.kitchens.label}</span>
              </div>
              <div>
                <b>
                  {site.responseHours}
                  {s.response.suffix || "h"}
                </b>
                <span>{s.response.label}</span>
              </div>
              <div>
                <b>{s.support.value}</b>
                <span>{s.support.label}</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WORK */}
        <section className="work" id="work">
          <Reveal as="div" className="work-head">
            <div>
              <p className="kicker">{k("03", dict.gallery.eyebrow)}</p>
              <h2 className="h-xl" style={{ marginTop: 16 }}>
                {dict.gallery.title}
              </h2>
            </div>
            <p className="sub">{dict.gallery.intro}</p>
          </Reveal>
          <StaggerGroup as="div" className="work-strip">
            {workStrip.map((x, i) => (
              <StaggerItem as="figure" key={x}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/${x}`}
                  alt={`${ar ? "عمل ميداني" : "On-site field work"} ${i + 1}`}
                  loading="lazy"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* SECTORS */}
        <section className="section section-dark" id="sectors">
          <Reveal as="div" className="center-head">
            <p className="kicker">{k("04", dict.industries.eyebrow)}</p>
            <h2 className="h-xl" style={{ margin: "18px 0 0" }}>
              {dict.industries.title}
            </h2>
            <p className="sub" style={{ marginTop: 14 }}>
              {dict.industries.intro}
            </p>
          </Reveal>
          <StaggerGroup as="div" className="sector-grid">
            {sectorMeta.map(({ key, Icon }) => (
              <StaggerItem as="article" key={key}>
                <i>
                  <Icon className="size-6" aria-hidden />
                </i>
                <b>{dict.industries.items[key]}</b>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* PROCESS */}
        <section className="process" id="process">
          <Reveal as="div" className="center-head">
            <p className="kicker">{k("05", dict.process.eyebrow)}</p>
            <h2 className="h-xl" style={{ margin: "18px 0 0" }}>
              {dict.process.title}
            </h2>
            <p style={{ marginTop: 14, color: "#555d61", fontSize: 18 }}>
              {dict.process.intro}
            </p>
          </Reveal>
          <StaggerGroup as="div" className="steps">
            {stepMeta.map(({ key, Icon }, i) => {
              const st = dict.process.steps[key];
              return (
                <StaggerItem as="article" key={key}>
                  <div className="step-mark">
                    <i>
                      <Icon className="size-6" aria-hidden />
                    </i>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* PLANS */}
        <section className="section plan-section" id="plans">
          <Reveal as="div" className="center-head">
            <p className="kicker">{k("06", dict.amc.eyebrow)}</p>
            <h2 className="h-xl" style={{ margin: "18px 0 0" }}>
              {dict.amc.title}
            </h2>
            <p className="sub" style={{ marginTop: 14 }}>
              {dict.amc.intro}
            </p>
          </Reveal>
          <StaggerGroup as="div" className="plan-grid">
            {planOrder.map((key) => {
              const p = dict.amc.plans[key];
              const featured = key === "pro";
              return (
                <StaggerItem
                  as="article"
                  key={key}
                  className={featured ? "featured" : ""}
                >
                  {featured && <span className="popular">{dict.amc.popular}</span>}
                  <h3>{p.name}</h3>
                  <p className="plan-note">{p.priceNote}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check className="size-4 shrink-0" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="plan-btn" href="#contact">
                    {featured ? dict.amc.cta : dict.amc.contactCta}
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* VOICES */}
        <section className="section voices" id="voices">
          <Reveal as="div" className="center-head">
            <p className="kicker">{k("07", dict.testimonials.eyebrow)}</p>
            <h2 className="h-xl" style={{ marginTop: 18 }}>
              {dict.testimonials.title}
            </h2>
          </Reveal>
          <StaggerGroup as="div" className="quote-grid">
            {(["one", "two", "three"] as const).map((key) => {
              const q = dict.testimonials.items[key];
              return (
                <StaggerItem as="article" key={key}>
                  <div className="stars" aria-hidden>
                    ★★★★★
                  </div>
                  <blockquote>“{q.quote}”</blockquote>
                  <footer>
                    <b>{q.name}</b>
                    <span>
                      {q.role} · {q.company}
                    </span>
                  </footer>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* COVERAGE */}
        <section className="coverage" id="coverage">
          <Reveal as="div">
            <p className="kicker">{k("08", ar ? "التغطية" : "Coverage")}</p>
            <h2 className="h-xl">
              {ar
                ? `نخدم ${site.citiesCount}+ مدن رئيسية في المملكة`
                : `Serving ${site.citiesCount}+ major cities across the Kingdom`}
            </h2>
            <p className="sub">
              {ar
                ? "فرقنا الميدانية جاهزة للاستجابة أينما كان مطبخك. لا ترى مدينتك؟ تواصل معنا."
                : "Our field teams are ready to respond wherever your kitchen is. Don’t see your city? Get in touch."}
            </p>
          </Reveal>
          <StaggerGroup as="div" className="cities">
            {cities.map((c) => (
              <StaggerItem as="span" key={c}>
                <MapPin className="size-4" aria-hidden />
                <b>{c}</b>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <Reveal as="div">
            <p className="kicker">{k("09", dict.contact.eyebrow)}</p>
            <h2 className="h-xl">{dict.contact.title}</h2>
            <p className="sub">{dict.contact.subtitle}</p>
            <div className="contact-buttons">
              <a className="solid" href={`tel:${site.phone}`} dir="ltr">
                <Phone className="size-4" aria-hidden />
                {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl(dict.emergency.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden />
                {dict.contact.whatsapp}
              </a>
            </div>
          </Reveal>
          <Reveal as="div" delay={0.1}>
            <QuoteForm locale={locale} dict={dict} source="contact-dark" />
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0b0d0e]">
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, #ff5a0a, #ff8a3a)" }}
          aria-hidden
        />
        <Reveal as="div" className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
            {/* Brand */}
            <div>
              <Logo inverse />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9298a0]">
                {dict.footer.blurb}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-display text-sm font-semibold text-white">
                {dict.footer.colServices}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {serviceTitles.map((title) => (
                  <li key={title}>
                    <Link
                      href={`${base}#services`}
                      className="text-[#9aa0a6] transition-colors hover:text-white"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coverage */}
            <div>
              <h3 className="font-display text-sm font-semibold text-white">
                {dict.footer.coverageTitle}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[#9aa0a6]">
                {cities.map((c) => (
                  <li key={c} className="inline-flex items-center gap-2">
                    <MapPin className="size-3.5 text-[#ff5a0a]" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-sm font-semibold text-white">
                {dict.footer.colContact}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={`tel:${site.phone}`}
                    dir="ltr"
                    className="inline-flex items-center gap-2 text-[#9aa0a6] transition-colors hover:text-white"
                  >
                    <Phone className="size-4 text-[#ff5a0a]" aria-hidden />
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl(dict.emergency.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#9aa0a6] transition-colors hover:text-white"
                  >
                    <MessageCircle className="size-4 text-[#ff5a0a]" aria-hidden />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-[#9aa0a6] transition-colors hover:text-white"
                  >
                    <Mail className="size-4 text-[#ff5a0a]" aria-hidden />
                    {site.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-[#7f858b]">
                  <Clock className="size-4 text-[#ff5a0a]" aria-hidden />
                  {dict.footer.hours}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#7f858b] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 {site.name}. {dict.footer.rights}
            </p>
            <p>{dict.footer.tagline}</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
