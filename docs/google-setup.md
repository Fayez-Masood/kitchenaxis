# KitchenAxis — Google Setup Guide

How to get the site indexed on Google, turn on analytics, and connect Google Ads
conversion tracking. **The code is already wired** — you just create the Google
accounts, copy a few IDs into `.env.local` (or your host's env settings), and
redeploy.

All of these read from environment variables. Nothing tracks until you set them,
so the site is safe to run locally/staging without leaking data.

```
# .env.local  (copy from .env.example)
NEXT_PUBLIC_GA_ID=                 # GA4 Measurement ID   → G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=         # Google Ads ID        → AW-XXXXXXXXXX
NEXT_PUBLIC_ADS_LEAD_LABEL=        # Ads lead conversion label
NEXT_PUBLIC_GSC_VERIFICATION=      # Search Console meta-tag token
```

> After editing env vars you must **rebuild/redeploy** — `NEXT_PUBLIC_*` values
> are baked into the client bundle at build time.

---

## 0. Prerequisite — get the domain live

1. Point `kitchenaxis.co` DNS at your host (Vercel is the easiest for Next.js —
   `vercel` → import the GitHub repo `Fayez-Masood/kitchenaxis` → add the domain).
2. Confirm `https://kitchenaxis.co/en` and `/ar` load over HTTPS.
3. Confirm these auto-generated routes work:
   - `https://kitchenaxis.co/robots.txt`
   - `https://kitchenaxis.co/sitemap.xml`  (should list `/en` and `/ar`)

---

## 1. Google Search Console (get indexed) — free

Search Console is how Google discovers, indexes, and reports your organic search
performance.

1. Go to **search.google.com/search-console** → **Add property**.
2. Choose **Domain** property (`kitchenaxis.co`) if you can add a DNS TXT record
   (covers http/https + all subdomains). Otherwise choose **URL prefix**
   (`https://kitchenaxis.co`) and use the **HTML tag** method below.
3. **HTML tag verification (works with this code):** Google shows a tag like
   `<meta name="google-site-verification" content="AbC123...">`. Copy **only the
   token** (`AbC123...`) into:
   ```
   NEXT_PUBLIC_GSC_VERIFICATION=AbC123...
   ```
   Redeploy → click **Verify** in Search Console. (The layout already outputs the
   verification meta tag when this env var is set.)
4. Once verified: **Sitemaps → Add a new sitemap →** enter `sitemap.xml` → Submit.
5. **URL Inspection →** paste `https://kitchenaxis.co/en` → **Request indexing**;
   repeat for `/ar`.
6. Check **International Targeting** later to confirm the `en`/`ar` hreflang pairs
   are detected with no errors.

**Also do Bing:** repeat at **bing.com/webmasters** (you can import directly from
Search Console). Bing/Edge has meaningful KSA desktop share.

---

## 2. Google Analytics 4 (site visits & behaviour) — free

1. Go to **analytics.google.com** → **Admin → Create → Property**
   (name "KitchenAxis", time zone **Riyadh (GMT+3)**, currency **SAR**).
2. Create a **Web data stream** for `https://kitchenaxis.co`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`) into:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   Redeploy. The `Analytics` component loads gtag automatically when this is set.
4. Verify: open the site, then in GA4 **Reports → Realtime** you should see
   yourself. Submit the lead form once — you'll see a **`generate_lead`** event
   (the form already fires it).
5. In **Admin → Events**, mark **`generate_lead`** as a **key event**
   (conversion) so it shows in conversion reports.
6. (Recommended) In **Admin → Property → Google Ads links**, link your Google Ads
   account so GA4 audiences/conversions can be shared.

**What you'll see:** visitors, sources (organic/ads/direct/referral), top pages,
devices, cities, and lead events — split by `/en` vs `/ar`.

---

## 3. Google Ads + conversion tracking

Full campaign strategy (structure, keywords, ad copy EN/AR, budgets, bidding) is
in **`docs/google-ads-plan.md`**. This section is just the *technical hookup*.

1. Create the account at **ads.google.com** — set **billing country Saudi Arabia,
   currency SAR, time zone Asia/Riyadh** (these can't be changed later).
2. **Tools → Conversions → New conversion action → Website.**
   - If it offers to scan the site, or asks for a tag: you already have gtag on
     the page via `NEXT_PUBLIC_GOOGLE_ADS_ID`, so choose to **use the existing
     Google tag** / set it up manually.
   - Create a **"Website Lead — Form"** action (category *Submit lead form*,
     value e.g. **SAR 150**, count **One**).
3. Google gives you a **Conversion ID** (`AW-XXXXXXXXXX`) and a **Conversion
   label** (`abcDEF123GhIjkl`). Put them in env:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
   NEXT_PUBLIC_ADS_LEAD_LABEL=abcDEF123GhIjkl
   ```
   Redeploy. **No other code change is needed** — on a successful form submit the
   site already fires the Ads `conversion` event with
   `send_to = AW-XXXXXXXXXX/abcDEF123GhIjkl` (see `lib/gtag.ts` → `trackLead`).
4. **Phone calls:** in Google Ads add a **Call asset** with `+966 53 548 9318`
   and enable **call reporting**; create a **"Phone Call — From Ads"** conversion.
   (This is configured entirely in Ads — no site code.)
5. **Verify before spending:** install the **Google Tag Assistant** browser
   extension, load `kitchenaxis.co/en`, submit a test lead, and confirm the
   conversion fires with the correct ID/label. Repeat on `/ar`.

**Optional extra conversions** (need one line of code each — ask me to wire them):
click-to-call on the website (`NEXT_PUBLIC_ADS_CALL_LABEL`) and WhatsApp clicks
(`NEXT_PUBLIC_ADS_WHATSAPP_LABEL`).

---

## 4. Google Business Profile (local maps + "near me") — free, high ROI

Not code, but the single biggest local-lead driver. Full checklist in
`docs/seo-strategy.md §3`. Short version:

1. **business.google.com** → create profile **KitchenAxis** (exact name, no
   keyword stuffing).
2. Set as a **Service-area business**; add service areas: Riyadh, Jeddah, Dammam,
   Makkah, Madinah.
3. Primary category **Appliance repair service** (or **Commercial refrigeration**);
   add relevant secondary categories.
4. Phone `+966 53 548 9318`, website `https://kitchenaxis.co`, hours (+ note the
   24/7 emergency line).
5. Add each service, the 3 AMC plans as products, and **20+ real job photos**.
6. Start collecting reviews (WhatsApp a review link after each job); reply to all.

---

## 5. Post-setup verification checklist

- [ ] `robots.txt` and `sitemap.xml` load on the live domain.
- [ ] Search Console verified; sitemap submitted; `/en` + `/ar` requested for indexing.
- [ ] Bing Webmaster verified + sitemap submitted.
- [ ] GA4 Realtime shows traffic; `generate_lead` marked as key event.
- [ ] GA4 ↔ Google Ads linked.
- [ ] Google Ads conversion(s) created; env `AW-` ID + label set + redeployed.
- [ ] Tag Assistant confirms the lead conversion fires on EN **and** AR.
- [ ] Google Business Profile live, verified, populated.

Once these are green, the site is discoverable, measurable, and ready for the
campaign in `docs/google-ads-plan.md`.
