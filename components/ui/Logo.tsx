import { cn } from "@/lib/cn";

/* ============================================================================
   KitchenAxis brand mark — faithful vector rebuild of the supplied KA logo.

   Anatomy (matches the client artwork):
     • "K"      — solid charcoal, geometric, flat-cut terminals
     • "A"      — orange vertical-gradient "axis" peak (open chevron apex)
     • swoosh   — metallic grey ribbon sweeping up-right through the monogram
     • wordmark — KITCHEN (charcoal) + AXIS (orange), tight geometric caps
     • tagline  — EQUIPMENT · SERVICE · EXCELLENCE with orange separators
     • domain   — kitchenaxis.co flanked by rule lines (stacked variant only)

   One source of truth: change the mark here and it updates everywhere
   (header, footer, hero, CS+ widget, favicon export).
   ========================================================================== */

type Variant = "horizontal" | "mark" | "stacked";

const CHARCOAL = "#23262b";
const WHITE = "#ffffff";

/** The KA monogram only (K + A peak + swoosh). Scales to any size. */
export function LogoMark({
  className,
  inverse = false,
  title,
}: {
  className?: string;
  inverse?: boolean;
  title?: string;
}) {
  const letter = inverse ? WHITE : CHARCOAL;
  return (
    <svg
      viewBox="0 0 240 156"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("block h-auto", className)}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="ka-orange" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#F9A33C" />
          <stop offset="0.55" stopColor="#F7941E" />
          <stop offset="1" stopColor="#E8641C" />
        </linearGradient>
        <linearGradient
          id={inverse ? "ka-swoosh-inv" : "ka-swoosh"}
          x1="0"
          y1="1"
          x2="1"
          y2="0"
        >
          {inverse ? (
            <>
              <stop offset="0" stopColor="#5b626c" />
              <stop offset="1" stopColor="#aeb4bc" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#8a919b" />
              <stop offset="0.6" stopColor="#b3b9c1" />
              <stop offset="1" stopColor="#d7dbe0" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* metallic swoosh — behind the letters */}
      <path
        d="M40 126 C96 104 150 92 206 62 C160 96 104 116 50 138 Z"
        fill={`url(#${inverse ? "ka-swoosh-inv" : "ka-swoosh"})`}
      />

      {/* K — charcoal, flat terminals, mitered joins */}
      <g
        stroke={letter}
        strokeWidth="23"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      >
        <path d="M34 20 V138" />
        <path d="M46 80 L106 20" />
        <path d="M46 78 L106 138" />
      </g>

      {/* A — orange axis peak (open chevron apex) */}
      <path
        d="M130 138 L173 20 L216 138"
        fill="none"
        stroke="url(#ka-orange)"
        strokeWidth="23"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/**
 * KitchenAxis logo.
 *  • `horizontal` (default) — mark + KITCHENAXIS wordmark, for the header/nav
 *  • `mark`                 — monogram only (favicon, avatars, tight spaces)
 *  • `stacked`              — centered mark + wordmark + tagline + domain rule
 */
export function Logo({
  className,
  inverse = false,
  variant = "horizontal",
  markClassName,
}: {
  className?: string;
  inverse?: boolean;
  variant?: Variant;
  markClassName?: string;
}) {
  const kitchen = inverse ? "text-white" : "text-charcoal-800";

  if (variant === "mark") {
    return (
      <LogoMark
        className={cn("h-9", markClassName, className)}
        inverse={inverse}
        title="KitchenAxis"
      />
    );
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center", className)}>
        <LogoMark
          className={cn("h-16", markClassName)}
          inverse={inverse}
          title="KitchenAxis"
        />
        <span className="mt-3 font-display text-[1.7rem] font-bold leading-none tracking-[-0.02em]">
          <span className={kitchen}>KITCHEN</span>
          <span className="text-gradient-brand">AXIS</span>
        </span>
        <span
          className={cn(
            "mt-2 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
            inverse ? "text-charcoal-300" : "text-charcoal-500",
          )}
        >
          <span>Equipment</span>
          <span className="text-brand-500" aria-hidden>
            ·
          </span>
          <span>Service</span>
          <span className="text-brand-500" aria-hidden>
            ·
          </span>
          <span>Excellence</span>
        </span>
        <span
          className={cn(
            "mt-2.5 flex items-center gap-2.5 text-[0.72rem] tracking-wide",
            inverse ? "text-charcoal-400" : "text-charcoal-500",
          )}
          dir="ltr"
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-6",
              inverse ? "bg-charcoal-500" : "bg-charcoal-300",
            )}
          />
          kitchenaxis.co
          <span
            aria-hidden
            className={cn(
              "h-px w-6",
              inverse ? "bg-charcoal-500" : "bg-charcoal-300",
            )}
          />
        </span>
      </span>
    );
  }

  // horizontal (default)
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={cn("h-9", markClassName)}
        inverse={inverse}
        title="KitchenAxis"
      />
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-[-0.02em]">
        <span className={kitchen}>KITCHEN</span>
        <span className="text-gradient-brand">AXIS</span>
      </span>
    </span>
  );
}
