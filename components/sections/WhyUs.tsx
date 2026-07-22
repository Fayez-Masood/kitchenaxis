import {
  BadgeCheck,
  Clock,
  PackageCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Stat } from "@/components/Stat";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type PointKey = keyof Dictionary["why"]["points"];

const icons: Record<PointKey, LucideIcon> = {
  certified: BadgeCheck,
  response: Clock,
  parts: PackageCheck,
  warranty: ShieldCheck,
};

export function WhyUs({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const points = dict.why.points;
  const keys = Object.keys(points) as PointKey[];
  const s = dict.why.stats;
  const ar = locale === "ar";

  return (
    <section className="bg-charcoal-50">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <p className="eyebrow text-brand-700">{dict.why.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.why.title}
          </h2>
          <p className="mt-4 text-lg text-charcoal-600">{dict.why.intro}</p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {keys.map((key) => {
              const Icon = icons[key];
              const p = points[key];
              return (
                <li key={key} className="flex flex-col gap-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-white text-brand-700 shadow-sm ring-1 ring-charcoal-100">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-h4 font-display text-charcoal-900">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-charcoal-600">
                    {p.desc}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* framed real photo with a floating stat card */}
        <Reveal delay={0.1} className="relative flex items-center">
          <Photo
            src="/photos/tech-coldroom-fan.jpg"
            alt={
              ar
                ? "فني كيتشن أكسِس يصون وحدة تبريد في غرفة تبريد"
                : "KitchenAxis technician servicing a cold-room refrigeration unit"
            }
            ratio="aspect-[4/5]"
            className="w-full shadow-xl ring-1 ring-charcoal-900/5"
            scrim="bottom"
            zoom
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute inset-x-4 -bottom-6 rounded-2xl border border-charcoal-100 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:inset-x-6 sm:p-6">
            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              <Stat
                value={site.yearsExperience}
                suffix={s.years.suffix}
                label={s.years.label}
              />
              <Stat
                value={site.kitchensServed}
                suffix={s.kitchens.suffix}
                label={s.kitchens.label}
              />
              <Stat
                value={site.responseHours}
                suffix={s.response.suffix || "h"}
                label={s.response.label}
              />
              <Stat literal={s.support.value} label={s.support.label} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
