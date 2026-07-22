"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  CalendarClock,
  Siren,
  ReceiptText,
  MessageSquare,
  Phone,
  MessageCircle,
  CheckCircle2,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

type Intent = "schedule" | "emergency" | "quote" | "question";
type Step = "intent" | "details" | "contact" | "done";

const intentIcons: Record<Intent, LucideIcon> = {
  schedule: CalendarClock,
  emergency: Siren,
  quote: ReceiptText,
  question: MessageSquare,
};

const field =
  "h-11 w-full rounded-md border border-charcoal-300 bg-white px-3.5 text-base text-charcoal-900 placeholder:text-charcoal-400 focus:border-cs-500";
const label = "mb-1.5 block text-sm font-medium text-charcoal-700";

/** CS+ logomark — "CS" wordmark + red "+" accent. */
function CSMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-cs font-semibold leading-none", className)}>
      CS<span className="text-cs-plus">+</span>
    </span>
  );
}

export function CSWidget({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.cs;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intent");
  const [intent, setIntent] = useState<Intent | null>(null);
  const [sending, setSending] = useState(false);
  const [errorRef, setErrorRef] = useState(false);
  const [ref, setRef] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // form state (persists across steps)
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const cities = locale === "ar" ? site.citiesAr : site.cities;
  const services = dict.services.items;
  const serviceKeys = Object.keys(services) as (keyof typeof services)[];

  const flow: Step[] =
    intent === "emergency" ? ["intent", "contact"] : ["intent", "details", "contact"];
  const stepIndex = flow.indexOf(step);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function reset() {
    setStep("intent");
    setIntent(null);
    setService("");
    setCity("");
    setDate("");
    setMessage("");
    setName("");
    setPhone("");
    setEmail("");
    setErrorRef(false);
    setRef("");
  }

  function chooseIntent(i: Intent) {
    setIntent(i);
    setStep(i === "emergency" ? "contact" : "details");
  }

  function back() {
    const prev = flow[stepIndex - 1];
    if (prev) setStep(prev);
  }

  async function submit() {
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    setErrorRef(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          city,
          preferredDate: date,
          message,
          urgency: intent === "emergency" ? "emergency" : "scheduled",
          intent,
          source: "cs-plus",
          consent: "on",
          locale,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ref?: string };
      if (!res.ok) throw new Error("bad");
      setRef(data.ref ?? "");
      setStep("done");
    } catch {
      setErrorRef(true);
    } finally {
      setSending(false);
    }
  }

  const total = flow.length;

  return (
    <div className="cs-scope">
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.launcher}
          className="group fixed bottom-5 z-[1055] inline-flex size-14 items-center justify-center rounded-full text-white ltr:right-5 rtl:left-5"
          style={{
            background: "var(--cs-gradient)",
            animation: "cs-pulse 8s ease-in-out infinite",
          }}
        >
          <CSMark className="text-xl" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t.headerTitle}
          className="fixed z-[1060] flex flex-col overflow-hidden rounded-xl bg-white shadow-xl
                     bottom-4 max-h-[min(640px,calc(100vh-2rem))] w-[380px] max-w-[calc(100vw-2rem)]
                     ltr:right-4 rtl:left-4"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 p-4 text-white"
            style={{ background: "var(--cs-gradient)" }}
          >
            {step !== "intent" && step !== "done" && (
              <button
                type="button"
                onClick={back}
                aria-label={t.back}
                className="inline-flex size-8 items-center justify-center rounded-md text-white/90 hover:bg-white/15"
              >
                <ChevronLeft className="size-5 rtl:-scale-x-100" />
              </button>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-cs text-base font-semibold">
                {t.headerTitle}
              </div>
              <div className="truncate text-xs text-white/80">{t.headerSub}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="ms-auto inline-flex size-8 items-center justify-center rounded-md text-white/90 hover:bg-white/15"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Progress dots */}
          {step !== "done" && (
            <div className="flex items-center gap-1.5 px-4 pt-3" aria-hidden>
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    i <= stepIndex ? "bg-cs-500" : "bg-charcoal-200",
                  )}
                />
              ))}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4">
            {step === "intent" && (
              <>
                <p className="mb-3 text-sm font-medium text-charcoal-700">
                  {t.intentPrompt}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(t.intents) as Intent[]).map((i) => {
                    const Icon = intentIcons[i];
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => chooseIntent(i)}
                        className="flex flex-col items-start gap-2 rounded-lg border border-charcoal-200 p-3 text-start transition hover:border-cs-500 hover:bg-cs-50"
                      >
                        <span className="inline-flex size-9 items-center justify-center rounded-md bg-cs-50 text-cs-600">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className="text-sm font-semibold text-charcoal-900">
                          {t.intents[i]}
                        </span>
                        <span className="text-xs leading-snug text-charcoal-500">
                          {t.intentDesc[i]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === "details" && (
              <div className="flex flex-col gap-4">
                {(intent === "schedule" || intent === "quote") && (
                  <>
                    <div>
                      <label className={label} htmlFor="cs-service">
                        {dict.form.service}
                      </label>
                      <select
                        id="cs-service"
                        className={field}
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option value="">{dict.form.serviceSelect}</option>
                        {serviceKeys.map((k) => (
                          <option key={k} value={services[k].title}>
                            {services[k].title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label} htmlFor="cs-city">
                        {dict.form.city}
                      </label>
                      <select
                        id="cs-city"
                        className={field}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="">{dict.form.citySelect}</option>
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {intent === "schedule" && (
                  <div>
                    <label className={label} htmlFor="cs-date">
                      {dict.form.preferredDate}
                    </label>
                    <input
                      id="cs-date"
                      type="date"
                      dir="ltr"
                      className={field}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label className={label} htmlFor="cs-msg">
                    {dict.form.message}
                  </label>
                  <textarea
                    id="cs-msg"
                    rows={3}
                    className="min-h-[84px] w-full rounded-md border border-charcoal-300 bg-white px-3.5 py-2.5 text-base leading-relaxed text-charcoal-900 placeholder:text-charcoal-400 focus:border-cs-500"
                    placeholder={dict.form.messagePh}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md font-cs text-base font-semibold text-white"
                  style={{ background: "var(--cs-gradient)" }}
                >
                  {t.next}
                </button>
              </div>
            )}

            {step === "contact" && (
              <div className="flex flex-col gap-4">
                {intent === "emergency" && (
                  <div className="rounded-lg border border-cs-200 bg-cs-50 p-3">
                    <p className="text-sm font-medium text-cs-800">
                      {t.emergencyBanner}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <a
                        href={`tel:${site.phone}`}
                        dir="ltr"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-cs-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cs-700"
                      >
                        <Phone className="size-4" aria-hidden />
                        {t.callNow}
                      </a>
                      <a
                        href={whatsappUrl(dict.emergency.whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-cs-300 px-3 py-2 text-sm font-semibold text-cs-700 hover:bg-cs-100"
                      >
                        <MessageCircle className="size-4" aria-hidden />
                        {t.whatsapp}
                      </a>
                    </div>
                  </div>
                )}
                <p className="text-sm font-medium text-charcoal-700">
                  {t.contactPrompt}
                </p>
                <div>
                  <label className={label} htmlFor="cs-name">
                    {dict.form.name} <span className="text-cs-plus">*</span>
                  </label>
                  <input
                    id="cs-name"
                    className={field}
                    autoComplete="name"
                    placeholder={dict.form.namePh}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="cs-phone">
                    {dict.form.phone} <span className="text-cs-plus">*</span>
                  </label>
                  <input
                    id="cs-phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    autoComplete="tel"
                    className={field}
                    placeholder={dict.form.phonePh}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="cs-email">
                    {dict.form.email}
                  </label>
                  <input
                    id="cs-email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    placeholder={dict.form.emailPh}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errorRef && (
                  <p role="alert" className="text-sm text-error-600">
                    {dict.form.errorBody}
                  </p>
                )}
                <button
                  type="button"
                  onClick={submit}
                  disabled={sending || !name.trim() || !phone.trim()}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md font-cs text-base font-semibold text-white disabled:opacity-60"
                  style={{ background: "var(--cs-gradient)" }}
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      {t.submitting}
                    </>
                  ) : (
                    t.submit
                  )}
                </button>
              </div>
            )}

            {step === "done" && (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="size-14 text-success-500" aria-hidden />
                <h3 className="mt-4 text-h4 font-display text-charcoal-900">
                  {t.successTitle}
                </h3>
                <p className="mt-2 text-sm text-charcoal-600">{t.successBody}</p>
                {ref && (
                  <p className="mt-3 text-xs text-charcoal-500">
                    {t.successRef}: <span className="font-mono">{ref}</span>
                  </p>
                )}
                <a
                  href={whatsappUrl(dict.emergency.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-105"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  {t.whatsapp}
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 text-sm font-medium text-cs-600 hover:text-cs-700"
                >
                  {t.newRequest}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== "done" && (
            <div className="border-t border-charcoal-100 px-4 py-2.5 text-center">
              <span className="text-xs text-charcoal-400">
                {t.poweredBy}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
