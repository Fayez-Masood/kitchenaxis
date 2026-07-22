import { Siren, Phone, MessageCircle } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

export function EmergencyStrip({
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-charcoal-800 on-dark">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-5 py-5 md:flex-row md:px-8">
        <div className="flex items-center gap-3 text-center md:text-start">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700/20 text-brand-400">
            <Siren className="size-5" aria-hidden />
          </span>
          <p className="text-white">
            <span className="font-semibold">{dict.emergency.label}</span>{" "}
            <span className="text-charcoal-200">{dict.emergency.text}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 md:ms-auto">
          <a
            href={`tel:${site.phone}`}
            dir="ltr"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            <Phone className="size-4" aria-hidden />
            {dict.emergency.call}
          </a>
          <a
            href={whatsappUrl(dict.emergency.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="size-4" aria-hidden />
            {dict.emergency.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
