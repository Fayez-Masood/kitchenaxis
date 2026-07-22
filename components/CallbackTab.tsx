"use client";

import { useState } from "react";
import { PhoneCall, X, CheckCircle2, Loader2 } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Passive lead capture — a sticky edge tab that opens a phone-only "call me
 * back" form. Captures prospects who won't fill the full form or call.
 */
export function CallbackTab({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "callback-tab",
          urgency: "scheduled",
          locale,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setStatus("done");
    } catch {
      setStatus("done"); // fail soft — never block the user
    }
  }

  return (
    <>
      {/* Edge tab */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed top-1/2 z-[1040] -translate-y-1/2 items-center gap-2 rounded-b-md bg-charcoal-800 px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-charcoal-900",
          // vertical tab pinned to the start edge
          "hidden origin-top-left rotate-90 md:inline-flex ltr:left-0 ltr:-translate-x-1/2 rtl:right-0 rtl:translate-x-1/2 rtl:-rotate-90",
          open && "md:hidden",
        )}
        style={{ insetInlineStart: 0 }}
      >
        <PhoneCall className="size-3.5" aria-hidden />
        {dict.callback.tab}
      </button>

      {open && (
        <div className="fixed bottom-4 z-[1045] w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-charcoal-200 bg-white p-5 shadow-xl ltr:left-4 rtl:right-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.cs.close}
            className="absolute top-3 inline-flex size-8 items-center justify-center rounded-md text-charcoal-500 hover:bg-charcoal-100 ltr:right-3 rtl:left-3"
          >
            <X className="size-4" />
          </button>

          {status === "done" ? (
            <div className="flex flex-col items-center py-4 text-center">
              <CheckCircle2 className="size-10 text-success-500" aria-hidden />
              <p className="mt-3 text-sm font-medium text-charcoal-800">
                {dict.callback.success}
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 className="pe-6 text-h4 font-display text-charcoal-900">
                {dict.callback.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal-600">
                {dict.callback.desc}
              </p>
              <input
                name="name"
                placeholder={dict.form.namePh}
                autoComplete="name"
                className="mt-4 h-11 w-full rounded-sm border border-charcoal-300 px-3.5 text-base placeholder:text-charcoal-400 focus:border-brand-500"
              />
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                dir="ltr"
                required
                autoComplete="tel"
                placeholder={dict.form.phonePh}
                className="mt-3 h-11 w-full rounded-sm border border-charcoal-300 px-3.5 text-base placeholder:text-charcoal-400 focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-brand font-display text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  dict.callback.submit
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
