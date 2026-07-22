"use client";

import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, Clock, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { MotionLogo } from "@/components/motion/MotionLogo";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const reduce = useReducedMotion();
  const ar = locale === "ar";

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      };

  return (
    <section className="relative isolate overflow-hidden bg-charcoal-900 text-white">
      {/* full-bleed field photo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src="/photos/hero-control-panel.jpg"
            alt={
              ar
                ? "فني كيتشن أكسِس يعمل على لوحة تحكم كهربائية لمعدات مطبخ"
                : "KitchenAxis technician working on a commercial kitchen control panel"
            }
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* legibility scrim — darker on the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/85 to-charcoal-900/40 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-charcoal-900/30" />
        {/* warm brand glow */}
        <div
          aria-hidden
          className="absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, #f7941e 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1200px] flex-col justify-center px-5 py-20 md:px-8 md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <MotionLogo inverse className="h-9 w-auto" />
            <span className="h-5 w-px bg-white/25" />
            <span className="eyebrow text-brand-400">{dict.hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-h1 font-display font-bold leading-[1.05] sm:text-[3.25rem] lg:text-[4rem]"
          >
            {dict.hero.titleLead}{" "}
            <span className="text-gradient-brand">{dict.hero.titleAccent}</span>{" "}
            {dict.hero.titleTail}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-200"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={`${base}#contact`} variant="gradient" size="lg" className="group">
              {dict.hero.ctaPrimary}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                aria-hidden
              />
            </Button>
            <Button
              href={`tel:${site.phone}`}
              external
              size="lg"
              className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Phone className="size-5" aria-hidden />
              {ar ? "اتصل الآن" : "Call now"}
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {dict.hero.trust.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-100"
              >
                <Check className="size-4 text-brand-400" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* floating glass stat badges */}
        <div className="pointer-events-none mt-12 flex flex-wrap gap-4 lg:absolute lg:bottom-14 lg:end-8 lg:mt-0 lg:flex-col lg:items-end">
          <motion.div
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-xl backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Clock className="size-5" aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-xl font-bold">{site.responseHours}h</div>
              <div className="text-[11px] font-medium text-charcoal-200">
                {ar ? "زمن الاستجابة" : "response time"}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-xl backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1 }}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-white">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold">
                {ar ? "فنيون معتمدون" : "Certified technicians"}
              </div>
              <div className="text-[11px] font-medium text-charcoal-200">
                {ar ? "قطع غيار أصلية" : "genuine spare parts"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
