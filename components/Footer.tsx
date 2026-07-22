import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026;
  const cities = locale === "ar" ? site.citiesAr : site.cities;

  const serviceLinks = Object.values(dict.services.items).map((s) => s.title);

  return (
    <footer className="on-dark bg-charcoal-800 text-charcoal-200">
      <div className="h-0.5 w-full bg-gradient-brand" aria-hidden />
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-300">
              {dict.footer.blurb}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {dict.footer.colServices}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href={`${base}#services`}
                    className="text-charcoal-300 transition-colors hover:text-white"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {dict.footer.coverageTitle}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-charcoal-300">
              {cities.map((c) => (
                <li key={c} className="inline-flex items-center gap-2">
                  <MapPin className="size-3.5 text-charcoal-400" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {dict.footer.colContact}
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-charcoal-300 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-brand-400" aria-hidden />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(dict.emergency.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-charcoal-300 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-brand-400" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-charcoal-300 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-brand-400" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-charcoal-400">
                <Clock className="size-4 text-brand-400" aria-hidden />
                {dict.footer.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-charcoal-700 pt-6 text-xs text-charcoal-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="text-charcoal-500">{dict.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
