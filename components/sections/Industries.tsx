import {
  UtensilsCrossed,
  Building2,
  Coffee,
  Croissant,
  HeartPulse,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

type IndKey = keyof Dictionary["industries"]["items"];

const icons: Record<IndKey, LucideIcon> = {
  restaurants: UtensilsCrossed,
  hotels: Building2,
  cafes: Coffee,
  bakeries: Croissant,
  hospitals: HeartPulse,
  catering: Truck,
};

export function Industries({
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = dict.industries.items;
  const keys = Object.keys(items) as IndKey[];

  return (
    <section id="industries" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-700">{dict.industries.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.industries.title}
          </h2>
          <p className="mt-4 text-lg text-charcoal-600">
            {dict.industries.intro}
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {keys.map((key) => {
            const Icon = icons[key];
            return (
              <div
                key={key}
                className="group flex flex-col items-center gap-3 rounded-lg border border-charcoal-200 bg-white p-6 text-center transition duration-200 hover:-translate-y-1 hover:border-charcoal-300 hover:shadow-md"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-charcoal-50 text-charcoal-700 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-charcoal-800">
                  {items[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
