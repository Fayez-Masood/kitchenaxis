import Image from "next/image";
import { cn } from "@/lib/cn";

type Scrim = "none" | "bottom" | "bottomStrong" | "left" | "top";

/**
 * Branded photo frame around real field photography.
 * Uses next/image (lazy, responsive, no layout shift). A consistent charcoal
 * grade + optional gradient scrim unifies the client's phone-shot photos into
 * one cinematic, on-brand system.
 */
export function Photo({
  src,
  alt,
  ratio = "aspect-[4/3]",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  scrim = "none",
  zoom = false,
  priority = false,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  scrim?: Scrim;
  zoom?: boolean;
  priority?: boolean;
  rounded?: string;
}) {
  const scrims: Record<Scrim, string> = {
    none: "",
    bottom:
      "bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/10 to-transparent",
    bottomStrong:
      "bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-charcoal-900/10",
    left: "bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/30 to-transparent",
    top: "bg-gradient-to-b from-charcoal-900/60 to-transparent",
  };

  return (
    <div
      className={cn(
        "group/photo relative overflow-hidden bg-charcoal-800",
        rounded,
        ratio,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "photo-grade object-cover",
          zoom &&
            "transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/photo:scale-[1.06]",
        )}
      />
      {scrim !== "none" && (
        <span
          aria-hidden
          className={cn("pointer-events-none absolute inset-0", scrims[scrim])}
        />
      )}
    </div>
  );
}
