import Script from "next/script";

/**
 * Google tag (gtag.js) for GA4 analytics + Google Ads conversion tracking.
 * Renders nothing unless an ID is configured, so the site works locally with
 * no tracking. Set the env vars in `.env.local` (see `.env.example`):
 *   NEXT_PUBLIC_GA_ID           — GA4 Measurement ID (G-XXXXXXX)
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   — Google Ads ID (AW-XXXXXXXXX)
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const primary = gaId || adsId;
  if (!primary) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primary}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaId ? `gtag('config', '${gaId}');` : ""}
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
