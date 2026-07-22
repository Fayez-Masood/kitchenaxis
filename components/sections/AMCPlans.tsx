import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Dictionary, Locale } from "@/lib/i18n";

type PlanKey = keyof Dictionary["amc"]["plans"];
const order: PlanKey[] = ["basic", "pro", "enterprise"];

export function AMCPlans({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const plans = dict.amc.plans;

  return (
    <section id="amc" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-700">{dict.amc.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-display text-charcoal-900">
            {dict.amc.title}
          </h2>
          <p className="mt-4 text-lg text-charcoal-600">{dict.amc.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {order.map((key) => {
            const plan = plans[key];
            const popular = key === "pro";
            return (
              <div
                key={key}
                className={
                  "reveal relative flex flex-col rounded-xl bg-white p-8 " +
                  (popular
                    ? "border-2 border-brand-500 shadow-lg"
                    : "border border-charcoal-200 shadow-sm")
                }
              >
                {popular && (
                  <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white rtl:translate-x-1/2">
                    {dict.amc.popular}
                  </span>
                )}
                <h3 className="text-h3 font-display text-charcoal-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal-500">{plan.priceNote}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[15px] text-charcoal-700"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-success-600"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={`${base}#contact`}
                  variant={popular ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {popular ? dict.amc.cta : dict.amc.contactCta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
