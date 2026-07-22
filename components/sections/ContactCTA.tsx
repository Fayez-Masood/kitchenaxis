import { Phone, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

export function ContactCTA({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="contact" className="scroll-mt-20 bg-charcoal-800 on-dark">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="reveal">
          <p className="eyebrow text-brand-400">{dict.contact.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-white">
            {dict.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-charcoal-200">
            {dict.contact.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phone}`}
              dir="ltr"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-charcoal-900 transition hover:bg-charcoal-100"
            >
              <Phone className="size-4" aria-hidden />
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl(dict.emergency.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="size-4" aria-hidden />
              {dict.contact.whatsapp}
            </a>
          </div>
          <p className="mt-6 text-sm text-charcoal-300">{dict.contact.orFill}</p>
        </div>

        <div className="reveal">
          <QuoteForm locale={locale} dict={dict} source="contact-section" />
        </div>
      </div>
    </section>
  );
}
