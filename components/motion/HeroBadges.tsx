"use client";

import { Clock, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Floating glass stat badges over the hero photo (Framer Motion entrance). */
export function HeroBadges({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <div className="pointer-events-none absolute bottom-8 end-5 z-[3] hidden flex-col items-end gap-4 md:bottom-12 md:end-8 md:flex">
      <motion.div
        {...rise(0.7)}
        className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-xl backdrop-blur-md"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#ff5a0a] text-white">
          <Clock className="size-5" aria-hidden />
        </span>
        <div className="leading-tight">
          <div className="font-display text-xl font-bold text-white">
            {site.responseHours}h
          </div>
          <div className="text-[11px] font-medium text-white/70">
            {ar ? "زمن الاستجابة" : "response time"}
          </div>
        </div>
      </motion.div>

      <motion.div
        {...rise(0.9)}
        className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-xl backdrop-blur-md"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-white">
          <ShieldCheck className="size-5" aria-hidden />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">
            {ar ? "فنيون معتمدون" : "Certified technicians"}
          </div>
          <div className="text-[11px] font-medium text-white/70">
            {ar ? "قطع غيار أصلية" : "genuine spare parts"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
