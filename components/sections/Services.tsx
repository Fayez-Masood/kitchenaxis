"use client";

import {
  Flame,
  Snowflake,
  Coffee,
  Wrench,
  ClipboardCheck,
  Siren,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Motion";
import { Photo } from "@/components/ui/Photo";
import type { Dictionary, Locale } from "@/lib/i18n";

type ServiceKey = keyof Dictionary["services"]["items"];

const icons: Record<ServiceKey, LucideIcon> = {
  cooking: Flame,
  refrigeration: Snowflake,
  beverage: Coffee,
  installation: Wrench,
  amc: ClipboardCheck,
  emergency: Siren,
};

const photos: Record<ServiceKey, string> = {
  cooking: "/photos/combi-oven.jpg",
  refrigeration: "/photos/coldroom-evaporators.jpg",
  beverage: "/photos/merchandiser.jpg",
  installation: "/photos/mixer-install.jpg",
  amc: "/photos/tech-dishwashers.jpg",
  emergency: "/photos/tech-orange-oven.jpg",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Services({ dict }: { locale: Locale; dict: Dictionary }) {
  const items = dict.services.items;
  const keys = Object.keys(items) as ServiceKey[];
  const reduce = useReducedMotion();

  const group = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const card = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      };

  return (
    <section id="services" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brand-700">{dict.services.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-lg text-charcoal-600">{dict.services.intro}</p>
        </Reveal>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {keys.map((key) => {
            const Icon = icons[key];
            const item = items[key];
            return (
              <motion.article
                key={key}
                variants={card}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-brand-300 hover:shadow-xl"
              >
                <div className="relative">
                  <Photo
                    src={photos[key]}
                    alt={item.title}
                    ratio="aspect-[16/10]"
                    rounded="rounded-none"
                    scrim="bottom"
                    zoom
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute bottom-3 start-3 inline-flex size-11 items-center justify-center rounded-xl bg-white/95 text-brand-700 shadow-md backdrop-blur transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h4 font-display text-charcoal-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-charcoal-600">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <Reveal className="mt-10" delay={0.1}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {dict.services.learnMore}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              aria-hidden
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
