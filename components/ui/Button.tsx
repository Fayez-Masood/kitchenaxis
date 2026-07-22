import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gradient" | "secondary" | "ghost" | "ghostBrand";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold whitespace-nowrap transition-[background,box-shadow,transform,color] duration-150 ease-out select-none cursor-pointer disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 hover:shadow-brand hover:-translate-y-px active:translate-y-0 disabled:bg-charcoal-200 disabled:text-charcoal-400",
  gradient:
    "bg-gradient-brand text-white hover:brightness-105 hover:shadow-brand hover:-translate-y-px active:translate-y-0 active:brightness-95",
  secondary:
    "bg-white text-charcoal-800 border border-charcoal-300 hover:bg-charcoal-50 hover:border-charcoal-400 active:bg-charcoal-100",
  ghost:
    "bg-transparent text-charcoal-700 hover:bg-charcoal-100 active:bg-charcoal-200",
  ghostBrand:
    "bg-transparent text-brand-700 hover:text-brand-800 hover:bg-brand-50 active:bg-brand-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } =
      rest as AnchorProps & { external?: boolean };
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(anchorRest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
