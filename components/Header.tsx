"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const base = `/${locale}`;
  const links = [
    { href: `${base}#services`, label: dict.nav.services },
    { href: `${base}#amc`, label: dict.nav.amc },
    { href: `${base}#industries`, label: dict.nav.industries },
    { href: `${base}#coverage`, label: dict.nav.coverage },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-[1020] transition-shadow",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md border-b border-charcoal-100"
          : "bg-white/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-5 md:h-18 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={base}
            className="inline-flex shrink-0 rounded-md py-1 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="KitchenAxis home"
          >
            <Logo />
          </Link>
        </motion.div>

        <nav className="ms-1 hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-charcoal-700 transition-colors hover:text-charcoal-900"
            >
              {l.label}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg border border-charcoal-200 px-3 py-1.5 text-sm font-semibold text-charcoal-800 transition-colors hover:border-brand-300 hover:text-brand-700 xl:flex"
            aria-label={`${dict.nav.emergency}: ${site.phoneDisplay}`}
            dir="ltr"
          >
            <Phone className="size-4 text-brand-600" aria-hidden />
            {site.phoneDisplay}
          </a>

          <LanguageToggle
            locale={locale}
            targetLabel={dict.langToggle.target}
            aria={dict.langToggle.aria}
          />

          <Button
            href={`${base}#contact`}
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          >
            {dict.nav.getQuote}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md text-charcoal-800 hover:bg-charcoal-100 xl:hidden"
            aria-label={open ? dict.cs.close : "Menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="xl:hidden">
          <button
            className="fixed inset-0 top-16 z-[1010] bg-charcoal-900/30"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed inset-x-0 top-16 z-[1015] max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-charcoal-100 bg-white p-5 shadow-lg"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base font-medium text-charcoal-800 hover:bg-charcoal-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t border-charcoal-100 pt-4">
              <a
                href={`tel:${site.phone}`}
                dir="ltr"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-charcoal-300 px-4 py-2.5 text-sm font-semibold text-charcoal-800"
              >
                <Phone className="size-4" aria-hidden />
                {site.phoneDisplay}
              </a>
              <Button
                href={`${base}#contact`}
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {dict.nav.getQuote}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
