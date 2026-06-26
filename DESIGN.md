# ELUCITHERIX — Design System

> A Hoften Studios house. Source of truth for brand, web, and product.
> Default constraint for every screen and every garment. Diverge only on purpose.

---

## 1. The Memorable Thing

**"A biker gang that went luxury."**

Everything is black, high-gloss **WAX** (proprietary leather-like material). The feeling
in the first three seconds is **expensive menace** — avant-garde, brutalist, unisex,
metrosexual-meets-biker. Rick Owens / Balenciaga / Fear of God tier, with a gothic
chrome-heart soul. NLE Choppa is the face.

Every design decision serves that one feeling. If a choice makes it look friendly,
soft, or generic, it's wrong.

## 2. Positioning

- **Avant-garde luxury streetwear**, built on the WAX material no one else can touch.
- **Unisex / head-to-toe.** Same world for men and women; women's pieces (corset, mini
  skirt, knee-high boots, body chain, opera gloves) live in the same all-black WAX vocabulary.
- **Signature branding:** debossed **LOVE** and the **♡ heart** motif on the material;
  the **EX** monogram as the stamp.

## 3. Color

Black is the brand. Color is near-absent on purpose — restraint reads as money.

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` (dark) | `#0a0a0a` | Default background. The void. |
| `--bg` (light) | `#f3f3f1` | Bone white — alt mode, black product floats on it |
| `--ink` | `#ededed` | Primary text on dark |
| `--dim` | `#7c7c7c` | Secondary text |
| `--dimmer` | `#4a4a4a` | Tertiary / hairlines text |
| `--line` | `#1c1c1c` | Hairline dividers |
| `--chrome` | `#cfcfcf` | Chrome/steel accent (logo, steel UI) |
| Chrome gradient | `#fafbfc → #a7adb5 → #eef0f2` | Polished-steel buttons, heart glyph, foil text |

Rules: no third color. No purple, no neon, no warm accents. Silver/chrome is the only
"shine." White-on-black is the default; the white/black toggle flips the whole system.

## 4. Typography

Two-font system. Gothic for identity, clean grotesque for everything you read.

- **Display / logo / wordmark — Blackletter gothic.** `Lazare Gothic` (premium) or free
  alts `Cloister Black` / `UnifrakturCook`. This is the Chrome-Hearts-adjacent gothic
  stamp — used for the ELUCITHERIX wordmark, big chest/back prints, drop headers. Used
  sparingly and large.
- **Luxe alt (optional) — `Cinzel`.** Engraved Roman caps. Use when a piece should feel
  "old-money fashion house" instead of streetwear.
- **Body / UI / buttons / nav — `Archivo`.** Weights 200–700. Heavy letter-spacing
  (`.2em–.42em`), uppercase for labels. This is the whole website's working font.
- **Numerals / prices / technical — `Space Mono`.** Prices, order numbers, the LIQ/spec feel.

Never: Inter, Roboto, Arial, system fonts as a brand voice.

## 5. Logo System

Original marks (NOT Chrome Hearts — that's a reference genre, never a copy).

- **Primary glyph:** the **chrome heart** — a polished liquid-silver heart with thorn/wing
  flourishes and an `E` at center. Lives in the nav as an inline SVG with the chrome gradient.
- **Monogram stamp:** interlocked **EX** in heavy blackletter. The garment/hardware deboss
  mark (caps, totes, boots, body chains). Scales tiny, debosses clean.
- **Wordmark:** `ELUCITHERIX`, uppercase, letter-spaced. Blackletter for hero/identity,
  Archivo tracked-out for UI.
- **Full lockup:** heart glyph above the wordmark, centered, generous space.
- **Patch/tag seal:** EX inside a thin circle.

Logo source files live in `assets/logo/`. Use black-on-transparent or chrome-on-black.

## 6. Material & Product Language

- **WAX**: high-gloss, leather-like, always black. Every garment reads wet/polished.
- **Branding on product:** debossed `LOVE` band, tonal `♡` heart motif, `EX` monogram,
  silver hardware. Branding is *debossed/tonal*, never loud printed logos.
- **Silhouettes:** brutalist, oversized, architectural. Flares, ruched boot-pants, oversized
  hoodies/sweaters, cutoff tanks, corsetry, knee-high boots, chunky lug soles.
- **Product shots:** cut out, floating on the background (no boxes), heavy drop shadow.
  Studio or smoky-industrial runway lighting. See `assets/cutouts/`.
- **Jewelry/hardware:** polished sterling/chrome — wallet chains, body chains, heart + EX charms.

## 7. Layout & Web

The site is **Yeezy-minimal**: stark, product floats in negative space, no clutter.

- Floating product grid, hairline dividers, no card chrome.
- Cinematic **video splash** → soft-slow logo fade → enter. Looping runway video background.
- Nav: theme toggle (left) · chrome-heart wordmark (center) · cart (right).
- **Steel/chrome** treatment for premium surfaces (capture forms, CTAs): brushed-metal
  gradient buttons, hairline top highlight, moving sheen on hover.
- Generous `--pad: clamp(18px,4vw,56px)`. Square corners (brutalist), not rounded.
- Mobile-first; portrait video on phones, landscape on desktop.

## 8. Motion

- Quiet and slow. `--ease: cubic-bezier(.16,1,.3,1)`.
- Logo enters **soft and slow** (blur → focus, ~2.9s).
- Hover: products lift + scale slightly; steel buttons sweep a sheen; letter-spacing widens.
- No bounce, no spin, no playful motion. Luxury moves calm.

## 9. Voice

Few words. Confident, cold, exclusive. "EXCLUSIVE WAX MATERIAL." "DROP 001 · COMING SOON."
"NO ONE ELSE HAS ACCESS." Never chatty, never salesy, never emoji-heavy (the single 🖤 is allowed).

## 10. Don'ts

- No second color, no gradients except chrome/steel.
- No rounded-friendly UI, no drop-shadow cards, no generic SaaS layouts.
- No loud printed logos — branding is debossed/tonal.
- No copying Chrome Hearts (or any house) trademarks. Original marks only.
- No font outside the two-font system for brand surfaces.

---

*Live reference: the website (`index.html` / `styles.css`) is the canonical implementation
of tokens 3, 4, 7, 8. When in doubt, match the site.*
