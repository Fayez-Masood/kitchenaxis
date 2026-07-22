"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Animated KitchenAxis monogram: the swoosh sweeps in, the K draws, and the
 * orange "axis" peak rises to its apex. Geometry is identical to
 * `LogoMark` so the static and animated marks stay in lock-step.
 * Falls back to a static, fully-drawn mark under reduced-motion.
 */
export function MotionLogo({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  const reduce = useReducedMotion();
  const letter = inverse ? "#ffffff" : "#23262b";
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const draw = (delay: number) =>
    reduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: {
            pathLength: { duration: 0.9, ease, delay },
            opacity: { duration: 0.2, delay },
          },
        };

  return (
    <motion.svg
      viewBox="0 0 240 156"
      role="img"
      aria-label="KitchenAxis"
      className={cn("block h-auto", className)}
      initial="hidden"
    >
      <defs>
        <linearGradient id="ka-orange-anim" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#F9A33C" />
          <stop offset="0.55" stopColor="#F7941E" />
          <stop offset="1" stopColor="#E8641C" />
        </linearGradient>
        <linearGradient id="ka-swoosh-anim" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={inverse ? "#5b626c" : "#8a919b"} />
          <stop offset="1" stopColor={inverse ? "#aeb4bc" : "#d7dbe0"} />
        </linearGradient>
      </defs>

      {/* swoosh */}
      <motion.path
        d="M40 126 C96 104 150 92 206 62 C160 96 104 116 50 138 Z"
        fill="url(#ka-swoosh-anim)"
        initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        animate={
          reduce
            ? { opacity: 1, x: 0 }
            : {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease },
              }
        }
      />

      {/* K */}
      <g
        stroke={letter}
        strokeWidth="23"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      >
        <motion.path d="M34 20 V138" initial={{ pathLength: 0, opacity: 0 }} animate={draw(0.15)} />
        <motion.path d="M46 80 L106 20" initial={{ pathLength: 0, opacity: 0 }} animate={draw(0.35)} />
        <motion.path d="M46 78 L106 138" initial={{ pathLength: 0, opacity: 0 }} animate={draw(0.5)} />
      </g>

      {/* A — axis peak */}
      <motion.path
        d="M130 138 L173 20 L216 138"
        fill="none"
        stroke="url(#ka-orange-anim)"
        strokeWidth="23"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={draw(0.65)}
      />
    </motion.svg>
  );
}
