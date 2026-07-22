"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "motion/react";

/* ============================================================================
   Motion primitives (Framer Motion / `motion`).
   Every primitive degrades to a plain, fully-visible element when the user
   has `prefers-reduced-motion: reduce` — no exceptions.
   ========================================================================== */

// ease-out-expo, matches design tokens
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type As = keyof React.JSX.IntrinsicElements;

type RevealProps = {
  as?: As;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Fade + rise into view once, on scroll. */
export function Reveal({
  as = "div",
  delay = 0,
  y = 18,
  once = true,
  amount = 0.25,
  className,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as as "div"] as typeof motion.div;

  if (reduce) {
    const Plain = as as "div";
    return (
      <Plain className={className} {...(rest as object)}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* --------------------------------------------------------------------------
   Staggered groups: wrap a set of children, each `StaggerItem` cascades in.
   -------------------------------------------------------------------------- */

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type GroupProps = {
  as?: As;
  className?: string;
  once?: boolean;
  amount?: number;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerGroup({
  as = "div",
  className,
  once = true,
  amount = 0.2,
  children,
  ...rest
}: GroupProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as as "div"] as typeof motion.div;

  if (reduce) {
    const Plain = as as "div";
    return (
      <Plain className={className} {...(rest as object)}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  as = "div",
  className,
  children,
  ...rest
}: {
  as?: As;
  className?: string;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduce = useReducedMotion();
  const Comp = motion[as as "div"] as typeof motion.div;

  if (reduce) {
    const Plain = as as "div";
    return (
      <Plain className={className} {...(rest as object)}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp className={className} variants={itemVariants} {...rest}>
      {children}
    </Comp>
  );
}
