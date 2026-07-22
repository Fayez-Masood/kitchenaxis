"use client";

import { useEffect, useRef, useState } from "react";

/** Animated count-up stat. Falls back to the final value if reduced-motion. */
export function Stat({
  value,
  suffix = "",
  label,
  literal,
}: {
  value?: number;
  suffix?: string;
  label: string;
  literal?: string; // e.g. "24/7" — shown as-is, no count-up
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(literal ? literal : "0");

  useEffect(() => {
    if (literal || value === undefined) return;
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(String(value));
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(String(Math.round(eased * value)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, literal]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-stat font-display tabular-nums text-charcoal-900">
        {display}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-charcoal-500">{label}</div>
    </div>
  );
}
