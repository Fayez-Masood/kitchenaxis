# KitchenAxis — Design & UX Handoff

Distilled from a UX Researcher, Inclusive Visuals, and UI Designer pass, plus
the `ui-ux-pro-max` design engine. This is the reasoning behind the build.

## Brand at a glance
- **Name / domain:** KitchenAxis · kitchenaxis.co
- **Tagline:** Equipment · Service · Excellence
- **Positioning:** Commercial kitchen equipment maintenance, repair & installation, Saudi Arabia (KSA/GCC). B2B.
- **Pattern (design engine):** *Trust & Authority + Conversion* — credibility first (certs, response-time SLA, real numbers), low-friction conversion.

## Color (implemented in `app/globals.css`)
- **Charcoal** neutrals `#15171A → #F6F7F8` — structure & text.
- **Brand orange** `#F7941E → #E8641C` (gradient) — the *signal* accent only (CTAs, active states, keylines). Keep orange under ~10% of any viewport.
- **CS+ blue** `#1E5BFF / #0A3FD9` + red `+` `#FF3B2F` — **quarantined to the CS+ widget** (`.cs-scope`) so it reads as an embedded tool, never a clash.
- **WCAG AA safe pairs:** charcoal-800 on white (14.6:1 ✓); white on brand-700 (buttons ≥16px bold only); **never** use brand orange for small body text on white — use `brand-800/900`. Focus ring is blue (`#1E5BFF`) site-wide and reads as system UI.

## Typography
- **Latin display:** Sora · **Latin body:** Inter · **Arabic:** IBM Plex Sans Arabic · **CS+ only:** Space Grotesk. Loaded via `next/font` in `app/fonts.ts`; families swap automatically for `html[lang="ar"]`.

## Personas (who we design for)
1. **Restaurant owner/operator** — urgent, price-sensitive, decision-maker. Wants speed + "will they show up".
2. **Hotel / facility manager** — SLAs, coverage, AMC value, reporting.
3. **Café chain ops manager** — multi-site, single contract, consistency.
4. **Hospital catering manager** — uptime non-negotiable, compliance & references.

## Two journeys the site serves
- **Emergency ("equipment down NOW")** → phone/WhatsApp is the conversion. Never force a long form. The emergency strip, sticky phone, and the CS+ "Emergency" path all surface call/WhatsApp in one tap.
- **Planned / AMC procurement** → converts on trust + clarity: certs, brands serviced, coverage map, AMC tiers, low-pressure "request assessment".

## CS+ widget (customer support / booking)
- Floating launcher (bottom-end; flips to bottom-**left** in Arabic) → 2–3 step panel.
- **Step 1 intent:** Book a Service · Emergency Repair · Request a Quote · Ask a Question.
- **Step 2 details** (skipped for Emergency): service, city, preferred date, message.
- **Step 3 contact:** Name + Phone (only required fields) + optional email.
- Emergency intent elevates **Call now / WhatsApp** immediately.
- Every submission posts to `/api/lead` → email + Google Sheet.

## Secondary passive capture
- **"Request a callback" edge tab** (phone-only) — captures prospects who won't fill the full form or call. Source-tagged `callback-tab`.
- All leads carry a `source` field so you can see which path produced them.

## Inclusive visuals rules (for when real photos replace placeholders)
- **Style:** premium-industrial documentary — real technicians in branded workwear, real KSA kitchens, stainless steel, cold rooms, espresso machines. Orange only as an earned accent (glove, tool, warning light), not a filter.
- **Representation (KSA/GCC):** realistic field-service mix (Saudi + expatriate workers); client-side/decision-maker shots may include Saudi men in thobe/business attire and women professionals in modest business attire, shown with agency. **Don't** dress people wrong for the job, tokenize, or use AI-generated Arabic signage (it's gibberish — use real proofread Arabic).
- **Icons:** Lucide, 2px stroke, rounded — already used throughout.
- **RTL:** flip directional arrows/steppers only; never flip logos or photos. Numerals/phones stay LTR. Implemented via logical properties (`ps/pe/ms/me/start/end`) + `rtl:-scale-x-100` on arrows.
- **Alt text:** store in the i18n dictionary (EN/AR) — placeholders already carry bilingual labels.
- **Stock search terms:** "commercial kitchen technician repair", "refrigeration technician cold room", "commercial espresso machine service", "combi oven maintenance", + regional "Saudi/GCC hospitality kitchen".

## Motion
Subtle, premium: 150ms hovers, 200–320ms entrances, scroll-reveal once, stat count-up on view. All wrapped in `prefers-reduced-motion` guards.

---
See `design-system.md` for the raw `ui-ux-pro-max` engine output.
