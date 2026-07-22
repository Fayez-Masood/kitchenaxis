# KitchenAxis

Modern, bilingual (Arabic RTL + English) marketing & service website for
**KitchenAxis** — commercial kitchen equipment maintenance, repair & installation
in Saudi Arabia. Rebrand of *ProjectCare*.

Built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4**, with an
embedded **CS+** support/booking widget and a lead-capture pipeline
(**email + Google Sheet**).

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (see "Lead capture" below)
npm run dev                  # http://localhost:3000  → redirects to /en or /ar
npm run build && npm start   # production
```

The site is fully functional **without** any env vars — leads are logged to the
server console. Configure email + Sheet (below) to actually receive them.

---

## What's included

- **Bilingual AR/EN** with automatic RTL. Language toggle in the header; the
  proxy (`proxy.ts`) redirects `/` to the visitor's best locale and remembers it.
- **Homepage sections:** hero, emergency strip, services, why-us (animated stats),
  industries, process, AMC plans, coverage, testimonials, contact + lead form.
- **CS+ widget** (`components/cs/CSWidget.tsx`): floating launcher → intent
  (Book / Emergency / Quote / Question) → details → contact (Name + Phone only
  required). Emergency path surfaces call/WhatsApp instantly.
- **Passive callback capture** (`components/CallbackTab.tsx`): a sticky edge tab
  for prospects who won't fill the full form.
- **Lead API** (`app/api/lead/route.ts`): validates, emails the team, and appends
  to a Google Sheet. Every lead is tagged with a `source` so you can see which
  path produced it.
- **SEO:** per-locale metadata, `hreflang` alternates, and LocalBusiness JSON-LD.
- **Accessibility:** WCAG-AA color pairs, visible focus rings, keyboard support,
  skip link, `prefers-reduced-motion` respected.

## Project structure

```
app/
  [locale]/            # all pages — locale is "en" | "ar"
    layout.tsx         # root layout: fonts, dir/lang, header/footer/widgets
    page.tsx           # homepage (composes the sections)
  api/lead/route.ts    # lead capture endpoint
  fonts.ts             # next/font (Sora, Inter, Space Grotesk, IBM Plex Arabic)
  globals.css          # design tokens (Tailwind v4 @theme) + base styles
components/            # Header, Footer, sections/, cs/CSWidget, forms
lib/
  i18n.ts              # locales, getDictionary, dir()
  dictionaries/en.ts   # ← ALL English copy
  dictionaries/ar.ts   # ← ALL Arabic copy
  site.ts              # ← contact details & key figures (EDIT THIS)
proxy.ts               # locale routing (Next 16 "middleware")
docs/                  # design system, UX/visual guidance, Apps Script
```

---

## Lead capture setup

### 1. Email (SMTP)
Put SMTP credentials in `.env.local` (see `.env.example`). Works with Gmail
App Passwords, Zoho, Microsoft 365, Amazon SES, Resend SMTP, etc. New leads are
emailed to `LEAD_TO_EMAIL`.

### 2. Google Sheet
1. Create a Google Sheet.
2. **Extensions → Apps Script**, paste `docs/google-apps-script.gs`.
3. Run `setup()` once (authorize), then **Deploy → Web app** (execute as *Me*,
   access *Anyone*). Copy the `/exec` URL into `GOOGLE_SHEET_WEBHOOK_URL`.
4. (Recommended) set a matching secret in both the script (`SECRET`) and
   `GOOGLE_SHEET_TOKEN`.

Every submission is appended as a row with a reference number, source, urgency,
and all fields. Leads flow in whether or not the customer also calls.

> **Reliability:** if email + Sheet are both configured but all fail, the API
> returns an error so the visitor is prompted to call. If neither is configured,
> it logs the lead and returns success (dev mode).

---

## ⚠️ Before launch — replace placeholder content

| Where | What to update |
|-------|----------------|
| `lib/site.ts` | **Real phone, WhatsApp, email, response-time SLA, years, kitchens served, cities, CR & VAT numbers.** The response-time number drives the hero, emergency strip, and CS+ copy. |
| `lib/dictionaries/en.ts` & `ar.ts` | Review all copy; replace the **sample testimonials** with real, attributed quotes. |
| `components/ui/Logo.tsx` | Vector placeholder mark — drop in the final logo asset. |
| Imagery | All visuals are branded placeholders. Add real photography (see `docs/design-and-ux.md` for art direction & stock search terms) using `next/image`; the placeholders already lock aspect ratios for zero layout shift. |
| Legal | Add Privacy Policy & Terms pages (links exist in the footer copy). |
| Default locale | `defaultLocale` in `lib/i18n.ts` (currently `en`; switch to `ar` if preferred for the KSA market). |

---

## Deploy

- **Vercel** (recommended for Next.js): import the repo, add the env vars, deploy.
- **Any Node host:** `npm run build` then `npm start` (needs Node 20+; built on 24).
- Point `kitchenaxis.co` at the host and set `site.url` accordingly.

## Docs
- `docs/design-and-ux.md` — brand, personas, journeys, CS+ flow, visual & a11y rules.
- `docs/design-system.md` — raw design-engine output.
- `docs/google-apps-script.gs` — the Sheet collector script.
