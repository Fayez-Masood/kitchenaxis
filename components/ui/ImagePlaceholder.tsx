import { cn } from "@/lib/cn";

/**
 * Branded, intentional image placeholder — charcoal surface with a faint
 * KA monogram and a warm gradient wash. Fixed aspect ratio so swapping in a
 * real photo (via next/image) later causes zero layout shift.
 * Replace with real photography before launch (see docs/inclusive-visuals.md).
 */
export function ImagePlaceholder({
  className,
  ratio = "aspect-[4/3]",
  label,
}: {
  className?: string;
  ratio?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-charcoal-800",
        ratio,
        className,
      )}
      role="img"
      aria-label={label ?? "Photography placeholder"}
    >
      {/* warm gradient wash */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120% 120% at 80% 0%, rgba(247,148,30,0.5), transparent 55%)",
        }}
      />
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* faint KA monogram */}
      <svg
        viewBox="0 0 66 48"
        className="absolute inset-0 m-auto h-1/3 w-1/3 opacity-15"
        aria-hidden="true"
      >
        <g
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M9 6 V42" />
          <path d="M10 25 L26 7" />
          <path d="M13 24 L28 42" />
          <path d="M35 42 L47 8 L59 42" />
          <path d="M41 30 H53" />
        </g>
      </svg>
      {label && (
        <span className="absolute bottom-3 start-3 rounded bg-charcoal-900/50 px-2 py-1 text-[11px] font-medium text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
