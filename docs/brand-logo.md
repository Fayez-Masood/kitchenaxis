# KitchenAxis — Logo & Motion System

The logo is a **faithful vector rebuild** of the supplied KA artwork — no raster
image is used, so it stays crisp at every size and animates natively.

## Anatomy
- **K** — solid charcoal (`#23262b`), geometric, flat-cut terminals
- **A** — orange vertical-gradient "axis" peak (`#F9A33C → #F7941E → #E8641C`)
- **Swoosh** — metallic grey ribbon sweeping up-right through the monogram
- **Wordmark** — `KITCHEN` (charcoal) + `AXIS` (orange), tight geometric caps (Sora 700)
- **Tagline** — EQUIPMENT · SERVICE · EXCELLENCE with orange separators
- **Domain rule** — kitchenaxis.co flanked by rule lines (stacked variant only)

## Component API — `components/ui/Logo.tsx`
One source of truth; edit the mark once and it updates everywhere.

```tsx
<Logo />                       // horizontal lockup — used in the header
<Logo variant="mark" />        // KA monogram only — favicons, tight spaces
<Logo variant="stacked" />     // centered mark + wordmark + tagline + domain
<Logo inverse />               // white version for dark backgrounds (footer)
<LogoMark className="h-12" />  // raw monogram SVG at any size
```

Animated variant (draws itself in): `components/motion/MotionLogo.tsx` — used as
the hero watermark. Both share identical geometry, so static and animated marks
never drift.

## Static / downloadable assets — `/public/brand/`
| File | Use |
|------|-----|
| `ka-mark.svg` | Monogram, full colour (light backgrounds) |
| `ka-mark-white.svg` | Monogram for dark backgrounds |
| `ka-logo-horizontal.svg` | Full horizontal lockup + tagline |
| `ka-logo-stacked.svg` | Centered lockup + tagline + domain rule |
| `app/icon.svg` | Favicon / tab icon (charcoal tile, auto-served by Next) |

> The two `ka-logo-*.svg` files render the wordmark in a **system font** so they
> stay portable as standalone files. On the live site the wordmark is real Sora
> text (selectable, perfectly kerned). For pixel-exact print/social exports,
> export the on-page lockup or supply a font-outlined master.

## Motion system — Framer Motion (`motion` package)
Primitives in `components/motion/Motion.tsx`, all reduced-motion aware:
- `Reveal` — fade + rise into view on scroll
- `StaggerGroup` / `StaggerItem` — cascading entrances
- `MotionLogo` — self-drawing monogram

Applied so far: hero entrance timeline + floating trust badges + ghost-logo
watermark, self-drawing logo, staggered service cards with hover lift + gradient
accents, animated nav underline, logo entrance. Every animation collapses to a
static, fully-visible state under `prefers-reduced-motion: reduce`.

## Domain
Standardized on **kitchenaxis.co** — `lib/site.ts`, the `Logo.tsx` stacked
variant, and the brand SVGs all read `kitchenaxis.co`. (The supplied `logo.png`
raster in `public/images/` still shows `kitchenaxis.sa` and is unused by the
site; regenerate it if you need a raster master with the correct domain.)
