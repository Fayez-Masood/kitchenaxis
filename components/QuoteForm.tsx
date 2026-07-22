"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, MessageCircle } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

const fieldCls =
  "h-11 w-full rounded-sm border border-charcoal-300 bg-white px-3.5 text-base text-charcoal-900 placeholder:text-charcoal-400 transition-colors hover:border-charcoal-400 focus:border-brand-500";
const labelCls = "mb-1.5 block text-sm font-medium text-charcoal-700";

export function QuoteForm({
  locale,
  dict,
  source = "contact-form",
}: {
  locale: Locale;
  dict: Dictionary;
  source?: string;
}) {
  const f = dict.form;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const cities = locale === "ar" ? site.citiesAr : site.cities;
  const services = dict.services.items;
  const serviceKeys = Object.keys(services) as (keyof typeof services)[];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          locale,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-xl">
        <CheckCircle2 className="size-12 text-success-500" aria-hidden />
        <h3 className="mt-4 text-h3 font-display text-charcoal-900">
          {f.successTitle}
        </h3>
        <p className="mt-2 text-charcoal-600">{f.successBody}</p>
        <a
          href={whatsappUrl(dict.emergency.whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
        >
          <MessageCircle className="size-4" aria-hidden />
          {dict.contact.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-6 shadow-xl sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="qf-name">
            {f.name} <span className="text-error-500">*</span>
          </label>
          <input id="qf-name" name="name" required autoComplete="name" placeholder={f.namePh} className={fieldCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-phone">
            {f.phone} <span className="text-error-500">*</span>
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            dir="ltr"
            autoComplete="tel"
            placeholder={f.phonePh}
            className={fieldCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-service">
            {f.service}
          </label>
          <select id="qf-service" name="service" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              {f.serviceSelect}
            </option>
            {serviceKeys.map((k) => (
              <option key={k} value={services[k].title}>
                {services[k].title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="qf-city">
            {f.city}
          </label>
          <select id="qf-city" name="city" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              {f.citySelect}
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className={labelCls}>{f.urgency}</legend>
        <div className="flex gap-3">
          {(["emergency", "scheduled"] as const).map((u, i) => (
            <label
              key={u}
              className="flex flex-1 cursor-pointer items-center gap-2 rounded-md border border-charcoal-300 px-3 py-2.5 text-sm font-medium text-charcoal-700 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800"
            >
              <input
                type="radio"
                name="urgency"
                value={u}
                defaultChecked={i === 1}
                className="accent-brand-700"
              />
              {f[u]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label className={labelCls} htmlFor="qf-message">
          {f.message}
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={3}
          placeholder={f.messagePh}
          className="min-h-[96px] w-full rounded-sm border border-charcoal-300 bg-white px-3.5 py-2.5 text-base leading-relaxed text-charcoal-900 placeholder:text-charcoal-400 transition-colors hover:border-charcoal-400 focus:border-brand-500"
        />
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-charcoal-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 accent-brand-700"
        />
        {f.consent}
      </label>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-md bg-error-50 px-3 py-2 text-sm text-error-700"
        >
          <AlertCircle className="size-4" aria-hidden />
          {f.errorBody}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-brand font-display text-base font-semibold text-white transition hover:brightness-105 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden />
            {f.submitting}
          </>
        ) : (
          f.submit
        )}
      </button>
      <p className="mt-3 text-center text-xs text-charcoal-500">{f.reassure}</p>
    </form>
  );
}
