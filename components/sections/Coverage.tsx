import { MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Coverage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cities = locale === "ar" ? site.citiesAr : site.cities;

  return (
    <section id="coverage" className="scroll-mt-20 bg-charcoal-800 on-dark">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <div className="reveal grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow text-brand-400">{dict.footer.coverageTitle}</p>
            <h2 className="mt-3 text-h2 font-display text-white">
              {locale === "ar"
                ? `نخدم ${site.citiesCount}+ مدن رئيسية في المملكة`
                : `Serving ${site.citiesCount}+ major cities across the Kingdom`}
            </h2>
            <p className="mt-4 max-w-md text-charcoal-200">
              {locale === "ar"
                ? "فرقنا الميدانية جاهزة للاستجابة أينما كان مطبخك. لا ترى مدينتك؟ تواصل معنا."
                : "Our field teams are ready to respond wherever your kitchen is. Don't see your city? Get in touch."}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cities.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              >
                <MapPin className="size-4 text-brand-400" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
