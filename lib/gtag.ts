/**
 * Thin, typed wrapper around Google's gtag. No-ops when gtag isn't loaded
 * (e.g. locally, or before the analytics env vars are set).
 */
type Win = { gtag?: (...args: unknown[]) => void };

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as Win).gtag?.(...args);
}

/** Fire a lead conversion for GA4 and (if configured) Google Ads. */
export function trackLead(source: string, locale: string) {
  gtag("event", "generate_lead", { source, locale, currency: "SAR" });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_ADS_LEAD_LABEL;
  if (adsId && label) {
    gtag("event", "conversion", { send_to: `${adsId}/${label}` });
  }
}
