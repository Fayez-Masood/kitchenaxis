import { Photo } from "@/components/ui/Photo";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * "Real work" proof gallery — an infinite, hover-pausable marquee of genuine
 * field photos. Grayscale-graded by default so the mismatched phone photos read
 * as one system; each tile blooms to full colour on hover. Pure-CSS animation
 * (see globals.css) with a reduced-motion fallback.
 */

const shots: { src: string; en: string; ar: string }[] = [
  { src: "/photos/hero-control-panel.jpg", en: "Technician servicing a kitchen control panel", ar: "فني يصلح لوحة تحكم مطبخ" },
  { src: "/photos/tech-coldroom-fan.jpg", en: "Cold-room evaporator maintenance", ar: "صيانة مبخر غرفة تبريد" },
  { src: "/photos/tech-wiring.jpg", en: "Wiring a refrigeration control box", ar: "توصيل صندوق تحكم تبريد" },
  { src: "/photos/coldroom-evaporators.jpg", en: "Walk-in cold room evaporators", ar: "مبخرات غرفة تبريد" },
  { src: "/photos/range-knobs.jpg", en: "Servicing a commercial cooking range", ar: "صيانة موقد طهي تجاري" },
  { src: "/photos/techs-griddle.jpg", en: "Two technicians servicing a griddle", ar: "فنيان يصلحان شواية" },
  { src: "/photos/mixer-install.jpg", en: "Commissioning a new dough mixer", ar: "تركيب خلاط عجين جديد" },
  { src: "/photos/motor-repair.jpg", en: "Motor and blower repair", ar: "إصلاح محرك ومنفاخ" },
  { src: "/photos/ice-machine.jpg", en: "Ice machine service", ar: "صيانة صانعة ثلج" },
  { src: "/photos/tech-dishwashers.jpg", en: "Rack-conveyor dishwasher service", ar: "صيانة غسالة أطباق" },
];

export function ProofGallery({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ar = locale === "ar";
  const track = [...shots, ...shots];

  return (
    <section className="overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
      <div className="mx-auto mb-10 max-w-[1200px] px-5 md:px-8">
        <p className="eyebrow text-brand-400">{dict.gallery.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-h2 font-display text-white">{dict.gallery.title}</h2>
          <p className="max-w-md text-charcoal-300">{dict.gallery.intro}</p>
        </div>
      </div>

      <div
        className="marquee-mask relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <ul className="animate-marquee flex w-max gap-4 px-2">
          {track.map((s, i) => (
            <li
              key={`${s.src}-${i}`}
              className="w-[260px] shrink-0 sm:w-[320px] md:w-[360px]"
            >
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10 [&_img]:grayscale [&_img]:transition-all [&_img]:duration-700 hover:[&_img]:grayscale-0">
                <Photo
                  src={s.src}
                  alt={ar ? s.ar : s.en}
                  ratio="aspect-[4/3]"
                  rounded="rounded-xl"
                  zoom
                  sizes="360px"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-[1200px] px-5 text-sm text-charcoal-400 md:px-8">
        {dict.gallery.note}
      </p>
    </section>
  );
}
