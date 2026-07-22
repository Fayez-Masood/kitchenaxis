# KitchenAxis — Design Brief (for AI design generation)

> Paste this whole document into a design AI. It is self-contained: brand,
> palette, type, voice, sitemap, and constraints are all specified with exact
> values. End goal: fresh visual design concepts (hero, sections, components)
> that stay on-brand and production-consistent with the existing site.

---

## 1. The ask
Design a modern, premium, **bilingual (Arabic RTL + English LTR)** marketing
website for **KitchenAxis**, a commercial-kitchen equipment service company in
Saudi Arabia. It must feel **industrial-precise, trustworthy, and fast** — not
playful, not "startup-cute." Think "the reliable engineering partner a
restaurant calls when a fryer dies mid-service." Deliver hero concepts, section
layouts, and component styling. Keep the logo, palette, and type below intact.

## 2. Company & value proposition
- **What:** Repair, preventive maintenance, installation & commissioning, and
  24/7 emergency callout for commercial kitchen equipment (fryers, ranges,
  ovens, walk-in chillers/freezers, refrigeration, espresso/beverage machines,
  dishwashers).
- **Market:** Saudi Arabia — Riyadh, Jeddah, Dammam, Makkah, Madinah.
- **Core promise:** technician **response within 2 hours**, certified techs,
  genuine spare parts, minimized downtime.
- **Tagline:** *Equipment · Service · Excellence*
- **Key trust figures:** 10+ years experience · 200+ kitchens served · 5 cities ·
  24/7 support · 2-hour response SLA.

## 3. Audience & mindset
- **Primary:** restaurant/hotel/catering owners & kitchen managers. Two modes:
  1. **Emergency** — equipment is down NOW, losing money every minute. Needs a
     phone number / WhatsApp / "call now" instantly, above the fold.
  2. **Planned** — evaluating an Annual Maintenance Contract (AMC). Needs proof
     of competence, coverage, and process.
- Decisions are trust- and speed-driven. Arabic-first for many users; Arabic must
  feel native, never a bolt-on translation.

## 4. Brand personality
Industrial precision · dependable · fast · honest · technical excellence.
Visual cues: sharp geometry, confident negative space, motion that feels
*engineered* (deliberate, eased) rather than bouncy. Avoid clip-art chefs,
cartoon flames, and generic stock gradients.

## 5. Logo & mark (keep — design around it)
- **KA monogram:** solid charcoal **K** (geometric, flat-cut terminals) + an
  orange vertical-gradient **A rendered as an "axis" peak** (open chevron apex,
  no crossbar) + a **metallic grey swoosh** sweeping up-right through the mark.
- **Wordmark:** `KITCHEN` (charcoal) + `AXIS` (orange), tight geometric caps.
- **Tagline lockup:** EQUIPMENT · SERVICE · EXCELLENCE with orange dot
  separators; stacked version adds `kitchenaxis.sa` flanked by rule lines.
- Variations available: horizontal, stacked, monogram-only, white/inverse.

## 6. Color palette (exact — brand-locked)
**Charcoal / slate (primary neutral)**
`50 #f6f7f8` · `100 #eceef0` · `200 #d5d9de` · `300 #b0b7c0` · `400 #828b97` ·
`500 #5c6470` · `600 #434a54` · `700 #333840` · `800 #23262b` · `900 #15171a`

**Orange (brand accent — the "AXIS" gradient)**
`50 #fff6ed` · `100 #ffe9d2` · `200 #fdd0a6` · `300 #fbb06e` · `400 #f98f3c` ·
`500 #f7941e` · `600 #ec7a17` · `700 #e8641c` · `800 #bc4e15` · `900 #7a3410`
Signature gradient: **linear-gradient(90deg, #f7941e → #e8641c)** (135° for fills).

**Status:** success `#039855` · warning `#dc6803` · error `#d92d20`.

**Usage rules:** charcoal for text/structure; white/light backgrounds dominant;
orange used *sparingly* as accent, CTA, and highlight (never large flat fills of
orange). Emergency actions may use error-red. Maintain WCAG AA contrast.

## 7. Sub-brand: CS+ (quarantined)
An embedded AI support/booking widget with its **own identity** — electric blue
`#1e5bff` (gradient to `#0a3fd9`) with a red "+" accent `#ff3b2f`, typeface
**Space Grotesk**. It appears as a floating launcher only. **CS+ blue must never
mix with the orange KitchenAxis palette** — keep it visually separate.

## 8. Typography
- **Display / headings (Latin):** Sora (500/600/700) — geometric grotesk.
- **Body (Latin):** Inter (400–700), tabular figures for stats/prices.
- **Arabic (all text):** IBM Plex Sans Arabic (400–700) — engineered geometry
  that harmonizes with Sora/Inter.
- **CS+ widget only:** Space Grotesk.
- **Type scale (rem):** display 3.5 / h1 2.5 / h2 2.0 / h3 1.5 / h4 1.25 /
  eyebrow 0.8125 (uppercase, 0.12em tracking) / stat 3.0.
- Display uses tight tracking (−0.02em) and line-height ~1.05–1.15.
- **Arabic rule:** never uppercase, never negative tracking; weight-up instead.

## 9. Design language / tokens
- **Radius:** sm .375 / md .5 / lg .75 / xl 1 / 2xl 1.5 rem. Cards ~lg; badges ~xl.
- **Shadows (charcoal-tinted):** subtle by default; `shadow-brand` =
  `0 8px 20px -6px rgba(232,100,28,.4)` for orange CTAs on hover.
- **Container:** max-width 1200px; generous section padding (~py 96–112px desktop).
- **Motion (Framer Motion in build):** ease-out-expo `cubic-bezier(.16,1,.3,1)`.
  Reveal-on-scroll (fade + 18px rise), staggered card entrances, self-drawing
  logo, floating badges, animated nav underline. **All motion must have a
  reduced-motion fallback** (static, fully visible).

## 10. Bilingual & RTL requirements
- Full mirror for Arabic (`dir=rtl`): layout, icons, arrows flip; logo does NOT
  mirror. Phone numbers stay LTR.
- Copy is not literal-translated — it is localized for tone. Provide layouts that
  work in both directions (avoid designs that break when text expands/mirrors).

## 11. Sitemap / sections to design (single long landing page)
1. **Header** — logo, nav (Services, Maintenance Plans, Who We Serve, Coverage,
   Contact), phone, Emergency button, language toggle, "Get a Free Quote" CTA.
2. **Hero** — headline ("Keep your kitchen running. Always."), subtext, primary
   + secondary CTA, trust chips (2h response, 24/7, certified), supporting
   image, floating trust badges.
3. **Emergency strip** — high-contrast band: "Equipment down? We respond within
   2 hours" + Call / WhatsApp.
4. **Services** — 6 cards: cooking, refrigeration/cold rooms, coffee & beverage,
   installation & commissioning, annual maintenance contracts, 24/7 emergency.
5. **Why KitchenAxis** — certified techs, fast response, genuine parts, warranty
   + an animated stat block (years / kitchens / response / 24-7).
6. **Industries** — restaurants, hotels, catering, cafés, cloud kitchens, etc.
7. **Process** — how a job runs (contact → diagnose → repair → verify).
8. **AMC plans** — tiered maintenance-contract pricing/comparison.
9. **Coverage** — the 5 cities / Kingdom-wide map feel.
10. **Testimonials** — client proof.
11. **Contact / CTA + lead form** — name + phone required, captures every lead.
12. **Footer** — brand, services, coverage, contact; charcoal/dark with a thin
    orange gradient top rule.
13. **CS+ floating widget** — separate blue identity (see §7).

## 12. Imagery direction
Real commercial-kitchen environments and technicians at work — stainless steel,
clean industrial detail, KSA-appropriate settings. Warm neutral grade; avoid
staged/smiley stock. Use branded placeholder slots with zero layout shift until
real photography is supplied.

## 13. Accessibility & quality bar
- WCAG 2.1 AA contrast; visible focus rings (blue `#1e5bff` halo); keyboard-
  navigable; screen-reader-friendly; respects reduced motion.
- Fully responsive (mobile-first); no horizontal scroll in either language.

## 14. What I want back from you
1. 2–3 distinct **hero** directions (layout + type + motion notes).
2. Refined **service card** and **stat block** component treatments.
3. **AMC pricing** section concept.
4. **Emergency strip** and **footer** styling.
5. Notes on how each concept adapts to **Arabic RTL**.
6. Anything that makes it "stand out" while staying inside the palette/type above.

## 15. Constraints (do not change)
- Keep the logo, the charcoal+orange palette, and Sora/Inter/Plex-Arabic type.
- Keep CS+ blue quarantined.
- Orange is an accent, not a flood.
- Every animation needs a reduced-motion fallback.
- Tech stack it must translate to: **Next.js 16 (App Router) + React 19 +
  Tailwind v4 + Framer Motion**, bilingual with RTL.

---
*Note: current logo artwork reads `kitchenaxis.sa`; site config uses
`kitchenaxis.co` — confirm the correct domain before finalizing.*
