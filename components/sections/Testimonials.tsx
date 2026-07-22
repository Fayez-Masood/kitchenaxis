import { Star, Quote } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

type TKey = keyof Dictionary["testimonials"]["items"];
const order: TKey[] = ["one", "two", "three"];

export function Testimonials({
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = dict.testimonials.items;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-700">{dict.testimonials.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.testimonials.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {order.map((key) => {
            const t = items[key];
            return (
              <figure
                key={key}
                className="reveal flex flex-col rounded-xl border border-charcoal-200 bg-white p-7 shadow-sm"
              >
                <Quote
                  className="size-8 text-brand-100 rtl:-scale-x-100"
                  aria-hidden
                />
                <div className="mt-3 flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-brand-500 text-brand-500"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-charcoal-100 pt-4">
                  <div className="text-sm font-semibold text-charcoal-900">
                    {t.name}
                  </div>
                  <div className="text-sm text-charcoal-500">
                    {t.role} · {t.company}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="reveal mt-6 text-center text-xs text-charcoal-400">
          {dict.testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
}
