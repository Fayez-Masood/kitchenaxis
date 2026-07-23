# KitchenAxis — Launch Checklist

Everything to do before and around going live. Grouped by owner/area. Companion
docs: `google-setup.md`, `seo-strategy.md`, `google-ads-plan.md`,
`content-recommendations.md`.

Legend: ✅ done in code · ⬜ needs your action/data.

---

## 1. Real business data (edit `lib/site.ts` + dictionaries)

- ✅ Phone / WhatsApp — `+966 53 548 9318`
- ✅ Emails — `sales@kitchenaxis.co`, `support@kitchenaxis.co`
- ✅ Domain — standardized on `kitchenaxis.co`
- ⬜ **CR number** (Commercial Registration) → `site.crNumber` (shown in footer/legal)
- ⬜ **VAT number** → `site.vatNumber`
- ⬜ **Confirm cities covered** — currently Riyadh, Jeddah, Dammam, Makkah, Madinah
- ⬜ **Confirm response-time SLA** — currently 2 hours (drives copy everywhere via `site.responseHours`)
- ⬜ **Confirm stats** — 10+ years, 200+ kitchens (`yearsExperience`, `kitchensServed`)
- ⬜ **Real testimonials** — the 3 in `en.ts`/`ar.ts` are flagged samples; replace with attributed client quotes
- ⬜ **Social links** — `site.social` (Instagram/LinkedIn/X) empty; fill or leave blank
- ⬜ **AMC pricing** — add "from SAR X" anchoring if you want it (see content doc §3)

## 2. Content & brand

- ✅ Bilingual EN/AR + RTL, dark client-approved design
- ✅ Arabic dual-form grammar fix ("ساعتين"); EN "costs you covers" typo fix
- ⬜ Review `docs/content-recommendations.md` and approve the copy upgrades you want (stronger hero, FAQ section, trust strip, better meta). Say the word and I'll apply them.
- ⬜ **FAQ section** — recommended add (big SEO/AEO + Ads-quality win); copy is written in the content doc
- ⬜ Replace the AI-generated hero/section images with real ones if brand-authenticity matters (some current images are AI/stock; `field-team.jpg`, `service.jpg`, `fabrication.jpg` are real)
- ⬜ Regenerate `public/images/logo.png` raster if you need a correct-domain master (it still shows `.sa`; unused by the site)

## 3. Hosting & infrastructure

- ⬜ **Deploy to production** (Vercel recommended — import `Fayez-Masood/kitchenaxis`)
- ⬜ Point `kitchenaxis.co` DNS at the host; verify HTTPS on `/en` and `/ar`
- ⬜ Set **environment variables** on the host (see below), then redeploy
- ⬜ Confirm `robots.txt` + `sitemap.xml` load on the live domain

### Environment variables (see `.env.example`)
- ⬜ `SMTP_*` + `LEAD_TO_EMAIL` — so leads are emailed (otherwise logged server-side only)
- ⬜ `GOOGLE_SHEET_WEBHOOK_URL` (+ `GOOGLE_SHEET_TOKEN`) — to log leads to a Google Sheet (`docs/google-apps-script.gs`)
- ⬜ `NEXT_PUBLIC_GA_ID` — GA4
- ⬜ `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_ADS_LEAD_LABEL` — Ads conversions
- ⬜ `NEXT_PUBLIC_GSC_VERIFICATION` — Search Console

## 4. Technical / SEO (in code)

- ✅ `sitemap.xml` (en/ar + hreflang) and `robots.txt`
- ✅ hreflang alternates, per-locale canonical, OG metadata, `lang`/`dir`
- ✅ LocalBusiness JSON-LD, bilingual keywords, `robots: index,follow`
- ✅ GA4 + Google Ads gtag wired; lead form fires `generate_lead` (+ Ads `conversion` when IDs set)
- ⬜ Add **FAQPage** + **Service** + **Organization** JSON-LD (see `seo-strategy.md §4`) — ask me to implement
- ⬜ Track **call-click** and **WhatsApp-click** as events/conversions (recommended; one line each)
- ⬜ Per-locale **OG/Twitter share image** (WhatsApp preview matters in KSA)
- ⬜ Core Web Vitals pass on mobile (hero LCP, font CLS) — check PageSpeed after deploy
- ⬜ Descriptive **alt text** on all images in EN **and** AR

## 5. Google presence (see `google-setup.md`)

- ⬜ **Search Console** verified; sitemap submitted; `/en` + `/ar` indexed
- ⬜ **Bing Webmaster** verified + sitemap submitted
- ⬜ **GA4** property live; Realtime confirmed; `generate_lead` marked key event; linked to Ads
- ⬜ **Google Business Profile** created, verified, fully populated (categories, 5 service areas, hours, services, 20+ real photos)
- ⬜ Start review generation (post-job WhatsApp review link)

## 6. Google Ads (see `google-ads-plan.md`)

- ⬜ Account created (SAR, Asia/Riyadh)
- ⬜ Conversion actions created; `AW-` ID + lead label added to env; **verified via Tag Assistant on EN + AR before any spend**
- ⬜ Call asset + call reporting; call conversion created
- ⬜ Campaigns/ad groups/keywords built (Emergency, Repair&Maintenance, AMC&Installation × EN/AR)
- ⬜ `KA-Master-Negatives` shared list applied
- ⬜ RSAs (EN + AR) + extensions/assets loaded
- ⬜ Location = 5 cities, **Presence**; Emergency scheduled 24/7
- ⬜ Bidding = Maximize Clicks + CPC cap at launch; budgets ~SAR 220-260/day
- ⬜ Go live → daily search-terms review → add negatives

## 7. Lead capture — test end to end

- ⬜ Submit the on-site form → confirm email arrives / Google Sheet row appends
- ⬜ Confirm `generate_lead` in GA4 Realtime and Ads conversion in Tag Assistant
- ⬜ Test **Call now**, **WhatsApp**, and the **CS+ widget** flows on mobile (EN + AR)
- ⬜ Test the **callback tab** submission

## 8. Pre-launch QA

- ⬜ Cross-browser + mobile (iOS Safari, Android Chrome), EN and AR
- ⬜ RTL has no horizontal overflow; phone numbers render LTR
- ⬜ All links/anchors work; 404 behaves; favicon shows
- ⬜ Accessibility pass (focus states, contrast, tap targets ≥48px)
- ⬜ Spellcheck real data once entered (CR/VAT/testimonials)

---

### Quickest path to "live and getting leads"
1. Fill CR/VAT + confirm data → 2. Deploy to Vercel + set SMTP/Sheet env → 3. Search Console + GA4 + GBP → 4. Approve content upgrades (hero + FAQ) → 5. Build Google Ads from `google-ads-plan.md` and verify tracking → **go live.**
