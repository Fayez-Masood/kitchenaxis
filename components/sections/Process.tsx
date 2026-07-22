import { CalendarCheck, Stethoscope, Wrench, FileCheck, type LucideIcon } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

type StepKey = keyof Dictionary["process"]["steps"];

const icons: Record<StepKey, LucideIcon> = {
  book: CalendarCheck,
  diagnose: Stethoscope,
  service: Wrench,
  report: FileCheck,
};

export function Process({ dict }: { locale: Locale; dict: Dictionary }) {
  const steps = dict.process.steps;
  const keys = Object.keys(steps) as StepKey[];

  return (
    <section className="bg-charcoal-50">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-700">{dict.process.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.process.title}
          </h2>
          <p className="mt-4 text-lg text-charcoal-600">{dict.process.intro}</p>
        </div>

        <ol className="reveal mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {keys.map((key, i) => {
            const Icon = icons[key];
            const step = steps[key];
            return (
              <li key={key} className="relative flex flex-col items-start">
                {/* connector line (desktop) */}
                {i < keys.length - 1 && (
                  <span
                    className="absolute top-7 hidden h-px w-full bg-charcoal-200 lg:block ltr:start-14 rtl:end-14"
                    aria-hidden
                  />
                )}
                <div className="relative flex items-center gap-3">
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="text-stat font-display text-charcoal-200">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-h4 font-display text-charcoal-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-charcoal-600">
                  {step.desc}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
