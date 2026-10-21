# Zerith — About Page & Brand Guidelines

> **Where clarity meets possibility.**

This repo holds the Zerith "About" webpage (a scroll-driven 3D experience) and the final Zerith logo kit. This README is the single reference for the brand system, the page structure, and every animation and interaction used on the page.

- **Live preview:** https://claude.ai/artifact/4RMc5T3Dr23AtBcNZ4Lip2 (private; share from the page's Share menu)
- **Status:** Coming soon

---

## Contents

1. [Repository structure](#1-repository-structure)
2. [Running the page](#2-running-the-page)
3. [Brand foundations](#3-brand-foundations)
4. [The logo](#4-the-logo)
5. [Colour](#5-colour)
6. [Typography](#6-typography)
7. [Voice and copy](#7-voice-and-copy)
8. [Page structure](#8-page-structure)
9. [The 3D scene](#9-the-3d-scene)
10. [Scroll state system](#10-scroll-state-system)
11. [Animation catalogue](#11-animation-catalogue)
12. [Interactions](#12-interactions)
13. [Responsive behaviour](#13-responsive-behaviour)
14. [Accessibility](#14-accessibility)
15. [Editing cheatsheet](#15-editing-cheatsheet)

---

## 1. Repository structure

```
zerith-about/
├── index.html                 # The whole page: HTML, CSS and JS in one file
├── README.md                  # This document
└── brand/                     # Final logo kit (4-rings design)
    ├── README.txt             # Original kit notes
    ├── vector-svg/            # Scalable masters (use these first)
    │   ├── mark-dark-background.svg
    │   ├── mark-light-background.svg
    │   ├── horizontal-logo-dark-background.svg
    │   └── horizontal-logo-light-background.svg
    ├── transparent/           # PNG mark + horizontal logo, no background
    ├── dark-background/       # Navy ground, white point
    │   ├── square/            # app-icon-1024, profile-picture-1080, linkedin-logo-400
    │   ├── favicon/           # 512, 192, 180, 64, 32, 16
    │   └── banners/           # LinkedIn, X/Twitter, Facebook, YouTube, OG preview, horizontal
    └── light-background/      # White ground, navy point (same sub-folders)
```

## 2. Running the page

The page is a single static file with no build step.

- **Locally:** open `index.html` in a browser, or serve the folder:
  ```bash
  npx serve .
  ```
- **External dependencies** (both pinned):
  - Three.js `0.149.0` — `https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js`
  - Google Fonts — Poppins (400/500/600), Figtree (400/500/600), JetBrains Mono (400/500)
- **Note:** `index.html` is written in the Claude Artifact format (no `<!doctype>`, `<html>`, `<head>` or `<body>` tags; the Artifact host adds them). To host it elsewhere, such as GitHub Pages or Vercel, wrap it in a standard document shell:
  ```html
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  </head>
  <body>
    <!-- contents of index.html -->
  </body>
  </html>
  ```
  Without the viewport meta tag, phones render the page at desktop width.

---

## 3. Brand foundations

| | |
|---|---|
| **Name** | Zerith |
| **Tagline** | Where clarity meets possibility |
| **What Zerith does** | Builds intelligent tools that bring what an organisation already knows to the surface, so people can see it, ask it and act on it. |
| **Core idea** | Four layers (Data, Knowledge, Conversation, Clarity) all rising to one point of light. |
| **Personality** | Calm, precise, confident, quietly futuristic. Never loud or hype-driven. |

### The four layers

The logo and the page's story share one structure. Each ring maps to a layer:

| Ring | Colour | Layer | Line | Role |
|---|---|---|---|---|
| Outer (r 56) | Deep violet `#5B3FD6` | **01 Data** | Start from what's true. | The foundation |
| Second (r 40) | Violet `#7C5CF0` | **02 Knowledge** | Find what you already know. | The memory |
| Third (r 24) | Lavender `#B7A5FF` | **03 Conversation** | Remember what was said. | The voice |
| The point (r 10) | White `#FFFFFF` | **04 Clarity** | See it, then decide. | Where it all meets |

### Principles ("What we believe")

1. **Clarity is a feature.** Removing a step is worth more than adding a button.
2. **Your data stays yours.** Work inside the customer's boundaries and show where every answer came from.
3. **People make the call.** Tools prepare the decision; a person makes it.
4. **Small and sharp.** One tool people love beats ten they tolerate.
5. **Quiet by default.** Good software gets out of the way once the work is done.

---

## 4. The logo

### Final mark: "4-rings"

Four circles of decreasing size that all share **one tangent at the top**. Each layer rises toward the same point; the top circle is the "point of light".

### Construction (SVG units)

All four circles are centred on `x = 190` and touch the line `y = 44`.

| Circle | Centre Y | Radius | Fill (dark ground) | Fill (light ground) |
|---|---|---|---|---|
| Outer | 100 | 56 | `#5B3FD6` | `#5B3FD6` |
| Second | 84 | 40 | `#7C5CF0` | `#7C5CF0` |
| Third | 68 | 24 | `#B7A5FF` | `#B7A5FF` |
| Point | 54 | 10 | `#FFFFFF` | `#0B0B1A` |

- Radii step down by 16, 16, 14, which keeps the mark readable at 16 px.
- Rule: `centreY = 44 + radius`.
- Reference SVG (dark ground):
  ```html
  <svg viewBox="130 40 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="190" cy="100" r="56" fill="#5B3FD6"/>
    <circle cx="190" cy="84"  r="40" fill="#7C5CF0"/>
    <circle cx="190" cy="68"  r="24" fill="#B7A5FF"/>
    <circle cx="190" cy="54"  r="10" fill="#FFFFFF"/>
  </svg>
  ```

### Lockups

| Lockup | Use |
|---|---|
| **Mark only** | App icons, favicons, avatars, small spaces |
| **Horizontal** (mark + "Zerith") | Default lockup: headers, documents, slides |
| **Horizontal + tagline** | Banners, covers, launch material |

- Wordmark: **Poppins Medium (500)**, letter-spacing about −2%.
- Gap between mark and wordmark: about 0.3 × the mark's diameter.
- Wordmark cap height is about 45% of the mark's height, centred vertically on the mark.

### Colour variants

| Ground | Rings | Point | Wordmark | Tagline |
|---|---|---|---|---|
| Navy `#0B0B1A` | Deep violet / Violet / Lavender | White | White | Lavender `#A78BFA` |
| White `#FFFFFF` | Deep violet / Violet / Lavender | Navy | Navy | Deep violet `#5B3FD6` |

**Only the point changes colour.** The three rings never change.

### Clear space and minimum size

- **Clear space:** at least one outer-ring radius (56 units, half the mark's width) of empty space on every side.
- **Minimum size:** mark 16 px (favicon); horizontal lockup 96 px wide on screen, 25 mm in print.

### Do

- Use the SVG masters in `brand/vector-svg/` wherever possible.
- Keep the shared top tangent exact.
- Flip only the point between white (dark ground) and navy (light ground).
- Place the mark on navy, white or very dark violet photography.

### Don't

- Separate the rings or move the point off the tangent.
- Recolour the rings or use colours outside the palette.
- Add gradients, shadows, outlines or bevels to the **flat** mark. The 3D form is for motion and the web only.
- Rotate, skew, stretch or crop the mark.
- Put the mark on busy or mid-tone backgrounds where the outer ring loses contrast.

### Asset guide

| Need | File |
|---|---|
| Website header | `vector-svg/horizontal-logo-*.svg` |
| Favicon | `dark-background/favicon/favicon-32x32.png` (+ 16, 180, 192, 512) |
| App icon | `dark-background/square/app-icon-1024x1024.png` |
| LinkedIn page logo | `dark-background/square/linkedin-logo-400x400.png` |
| Link preview (Open Graph) | `dark-background/banners/og-link-preview-1200x630.png` |
| Social covers | `*/banners/` (LinkedIn, X, Facebook, YouTube) |

---

## 5. Colour

### Brand palette

| Name | Hex | RGB | Role |
|---|---|---|---|
| **Navy** | `#0B0B1A` | 11, 11, 26 | Primary ground; wordmark on light |
| **Deep violet** | `#5B3FD6` | 91, 63, 214 | Outer ring; depth, gradients |
| **Violet** | `#7C5CF0` | 124, 92, 240 | Second ring; **primary accent** |
| **Lavender** | `#B7A5FF` | 183, 165, 255 | Third ring; highlights and links on dark |
| **White** | `#FFFFFF` | 255, 255, 255 | The point; text on navy |

### UI tokens (from `index.html`)

```css
:root{
  --ink:#07070F;     /* deepest page ground, darker than navy */
  --navy:#0B0B1A;    /* brand navy */
  --deep:#5B3FD6;    /* outer ring */
  --violet:#7C5CF0;  /* second ring, accent */
  --lav:#B7A5FF;     /* third ring, highlight */
  --white:#FFFFFF;   /* the point */
  --fg:#F3F1FF;      /* body text on dark (violet-tinted white) */
  --muted:#A29CC9;   /* secondary text */
  --dim:#5E5885;     /* tertiary text, unlit words */
  --line:rgba(183,165,255,.16);  /* hairlines and borders */
  --glass:rgba(16,14,40,.55);    /* frosted panels (nav) */
}
```

### Usage ratios

- About **80%** navy/ink, **12%** violet family, **5%** white text, **3%** lavender highlights.
- The page is dark-first by design. Neutrals carry a violet tint; never use pure grey.
- Signature gradient (headline accent): `linear-gradient(100deg, #B7A5FF 10%, #7C5CF0 60%, #5B3FD6)`
- Ambient glow: `radial-gradient(rgba(91,63,214,.22), transparent 70%)`
- Semantic colours (do/don't only): success `#9BE7C4`, warning/stop `#FF9EB1`.

### Contrast

| Pair | Ratio | Use |
|---|---|---|
| White on Navy | ~19:1 | All text |
| Lavender on Navy | ~9:1 | Highlights, links, labels |
| Muted `#A29CC9` on Ink | ~7.5:1 | Body copy |
| Violet on Navy | ~3.8:1 | Large text and graphics only |
| White on Violet | ~5.1:1 | Buttons, badges |

---

## 6. Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| **Display / wordmark** | Poppins | 500 (Medium) | Headlines, wordmark, big numbers |
| **Body / UI** | Figtree | 400, 500, 600 | Paragraphs, buttons, interface |
| **Utility / labels** | JetBrains Mono | 400, 500 | Eyebrows, tags, hex codes, captions |

Fallback stacks: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` and `ui-monospace, SFMono-Regular, Menlo, monospace`.

### Type scale

| Element | Size | Line height | Tracking |
|---|---|---|---|
| Hero H1 | `clamp(46px, 8.4vw, 118px)` | 1.02 | −0.035em |
| Section H2 | `clamp(38px, 6vw, 88px)` | 1.02 | −0.035em |
| Statement | `clamp(30px, 4.4vw, 64px)` | 1.12 | −0.03em |
| Card H3 | `clamp(30px, 3.4vw, 46px)` | 1.02 | −0.035em |
| Lead | `clamp(17px, 1.5vw, 20px)` | 1.6 | 0 |
| Body | 17px (16px mobile) | 1.6 | 0 |
| Eyebrow / label | 12px mono, UPPERCASE | — | +0.14 to 0.18em |
| Closing wordmark | `clamp(90px, 25vw, 380px)` | 0.8 | −0.06em |

Rules: headings use `text-wrap: balance`; body text is kept to about 65 characters wide; uppercase labels always get extra letter-spacing.

---

## 7. Voice and copy

- **Plain and specific.** Say exactly what happens. "Meetings turn into decisions, owners and next steps."
- **Short sentences, active voice.**
- **Calm confidence.** No hype words ("revolutionary", "game-changing"), no exclamation marks.
- **People first.** Tools prepare; people decide.
- **Spelling:** British English on this page (organisation, colour).
- **Signature line structure:** a short claim followed by one concrete sentence. "Start from what's true. We connect to the systems a team already runs…"

---

## 8. Page structure

The page avoids grids and card layouts. It is one continuous night sky with a fixed 3D mark behind floating, asymmetric text.

| # | Section | ID | What happens |
|---|---|---|---|
| 1 | **Hero** | `#top` | "Coming soon" badge, H1 "Where clarity meets possibility.", lead, two buttons. 3D mark floats on the right. |
| 2 | **Statement** | `#story` | Large paragraph lights up word by word as you scroll. Mark moves left and tilts. |
| 3 | **Layers intro** | `#layers` | "Four layers. One point of light." Mark returns to front view. |
| 4–7 | **Layer cards** | — | Four glass cards (Data → Clarity) alternate left and right. Mark turns side-on, spreads into depth, and lights up one ring at a time. |
| 8 | **Beliefs** | `#beliefs` | Sticky section; vertical scroll moves five principle cards sideways along a curved track. |
| 9 | **The mark** | `#mark` | "Everything leads to one clear answer." Labelled layer diagram (Data, Knowledge, Conversation, Clarity), lockups, copyable swatches, type specimens, do/don't. 3D mark fades out. |
| 10 | **Close** | — | "Coming soon" badge, tagline, giant gradient "Zerith" wordmark, footer. Mark returns, centred. |

Fixed layers (bottom to top): `.sky` (gradient) → `#gl` (WebGL canvas) → `.grain` (film grain) → `.glow` (cursor light) → content → `.nav`.

---

## 9. The 3D scene

Built with **Three.js r149** in a full-screen fixed `<canvas id="gl">` with a transparent background.

### Camera

- `PerspectiveCamera`, FOV **24°** (narrow, so the front view stays close to the flat logo), position `z = 13`.

### The mark (4 spheres)

- Radii come from the logo: `[56, 40, 24, 10] / 56 × 1.2` → `1.2, 0.857, 0.514, 0.214`.
- Each sphere sits at `y = 1.2 − r`, so all spheres share the top tangent, exactly like the 2D logo.
- Depth offsets: `z = [0, 0.62, 1.12, 1.5] × spread`. Straight on, the spheres look like the flat logo; turned, they show their depth.
- **Layering:** `depthTest: false` with `renderOrder` 10→13 (largest first). This reproduces the logo's paint order from any front-facing angle.
- `SphereGeometry(r, 96, 64)`.

### Sphere shader (custom `ShaderMaterial`)

| Uniform | Purpose |
|---|---|
| `uColor` | Ring colour (`#5B3FD6`, `#7C5CF0`, `#B7A5FF`, `#FFFFFF`) |
| `uRim` | Fresnel rim colour (`#9C86FF`, `#C9BBFF`, `#FFFFFF`, `#B7A5FF`) |
| `uEmph` | 0–1 emphasis; dims colour to 28% and alpha to 50% when not in focus |
| `uOp` | Overall opacity per section |

Lighting: one key light from `(-0.35, 0.8, 0.55)`; diffuse `0.74 + 0.38·N·L`; Fresnel rim `pow(1 − N·V, 2.4) × 0.6`; specular `pow(R·V, 36) × 0.32`. This gives a soft, slightly glassy look that still reads as the brand's flat colours.

### Supporting objects

| Object | Details |
|---|---|
| **Halo** | Additive sprite, 7×7, radial gradient violet `rgba(124,92,240,.55)` → transparent |
| **Orbit ring A** | Line circle, radius 1.9, lavender, opacity 0.38, tilt `(1.18, 0, 0.22)`, spins `+0.25 rad/s` |
| **Orbit ring B** | Radius 2.35, opacity 0.16, tilt `(1.32, 0, −0.3)`, spins `−0.12 rad/s` |
| **Satellite** | White dot (r 0.05) travelling ring A at 0.6 rad/s |
| **Dust field** | 1,600 points (700 on mobile) in a 5–21 unit shell; soft round sprite; additive; drifts with scroll and pointer |

### Fallback

If WebGL or Three.js fails, `<html>` gets the class `no-gl` and a flat SVG mark is shown in the hero instead.

---

## 10. Scroll state system

Every section that controls the 3D mark has a `data-state` attribute with a JSON pose:

```html
<section data-state='{"x":0.46,"y":0.02,"ry":0,"rx":0,"spread":0.15,"scale":1.1,"op":1,"rings":1,"mx":0,"my":0.5,"mscale":0.85}'>
```

| Key | Meaning | Range |
|---|---|---|
| `x`, `y` | Position as a fraction of half the visible width/height | −1 … 1 |
| `rx`, `ry` | Rotation in radians (X tilt, Y turn) | ~ −1.2 … 1.2 |
| `spread` | Multiplier on sphere depth offsets (0 = flat logo, 1.7 = exploded) | 0 … 2 |
| `scale` | Size; 1 ≈ mark radius of 20% of viewport height | 0.3 … 1.3 |
| `op` | Opacity of the whole mark | 0 … 1 |
| `rings` | Opacity of orbit rings and satellite | 0 … 1 |
| `focus` | Index of the lit sphere (0 = outer … 3 = point); omit to light all | 0–3 |
| `mx`, `my`, `mop`, `mscale` | Mobile overrides for x, y, op, scale | — |

**How it works:** each frame, the script finds the two anchors either side of the viewport's middle line, blends their poses with a smoothstep curve, then eases the live pose toward that target (`lerp` factor 0.075; emphasis 0.09). On top of that it adds idle motion and pointer parallax.

### Current poses

| Section | Pose summary |
|---|---|
| Hero | Right side, front view, nearly flat (`spread 0.15`), large |
| Statement | Left, turned −0.55, spread 0.9, slightly faded |
| Layers intro | Right, front view, flat |
| 01 Data | Left, turned −1.05, exploded (1.7), outer ring lit |
| 02 Knowledge | Right, turned +1.05, second ring lit |
| 03 Conversation | Left, turned −1.05, third ring lit |
| 04 Clarity | Right, turned 0.35, spread 0.6, point lit |
| Beliefs | Small (0.42), top right, 55% opacity |
| The mark | Hidden (`op 0`) so the 2D layer diagram stands alone |
| Close | Centred, front view, full opacity |

---

## 11. Animation catalogue

Main easing curve: `--ease: cubic-bezier(.2, .7, .1, 1)` (fast start, long soft settle).

### Load sequence (hero)

| Element | Animation | Duration | Delay |
|---|---|---|---|
| "Coming soon" badge | `fade` (opacity 0→1, translateY 12px→0) | 1.0s | 0.2s |
| H1 line 1 | `rise` (translateY 105%→0, masked by overflow) | 1.1s | 0s |
| H1 line 2 | `rise` | 1.1s | 0.12s |
| H1 line 3 | `rise` | 1.1s | 0.24s |
| Lead paragraph | `fade` | 1.2s | 0.5s |
| Buttons | `fade` | 1.2s | 0.7s |

### Ambient loops

| Element | Animation | Timing |
|---|---|---|
| Film grain | `grain` (steps(4) jitter of a noise texture) | 1.2s, infinite |
| Scroll cue line | `drip` (scaleY 0→1, then fades) | 2.2s, infinite |
| "Coming soon" dot | `pulse` (scale 1→0.6, opacity 1→0.5) | 1.8s, ease-in-out, infinite |
| "Coming soon" sheen | `sheen` (white light sweep across the pill) | 3.2s, starts 1.2s, infinite |
| 3D idle float | `y += sin(t·0.8)·0.05` | continuous |
| 3D idle sway | `ry += sin(t·0.35)·0.12`, `rx += sin(t·0.27)·0.05` | continuous |
| Orbit rings + satellite | see §9 | continuous |

### Scroll-driven

| Element | Behaviour |
|---|---|
| 3D mark pose | Blends between `data-state` anchors (§10) |
| Statement words | Each word goes from dim `#5E5885` to white when it passes 66% of viewport height (0.5s colour transition). Highlighted phrases turn lavender with a glow. |
| Reveal blocks `.rv` | translateY 28px→0, opacity 0.55→1, 1.1s, when 18% visible (IntersectionObserver, runs once) |
| Layer cards `.card` | translateY 40px + scale 0.97 → none, opacity 0.35→1, 1s |
| Beliefs track | Vertical scroll → horizontal `translate3d`. Section height = viewport + track overflow. |
| Beliefs curvature | Each card `rotateY(−offset × 22°)` and `translateZ(−|offset| × 80px)` by its distance from screen centre, giving a curved carousel |
| Nav progress bar | `scaleX` = page scroll fraction |
| Nav active link | Highlights the section whose top passed 45% of the viewport |
| Dust field | Moves up slowly with scroll (`y = scrollY × 0.0009`) |

### Hover

| Element | Effect |
|---|---|
| Primary button | Lifts 2px, background turns lavender (0.35s) |
| Secondary button | Lifts 2px, border turns lavender |
| Belief card | 3D tilt follows the pointer (±10° X, ±12° Y); spotlight gradient follows the cursor; border brightens |
| Swatch | Lifts 6px; click copies the hex and shows a "Copied" chip for 1.4s |

---

## 12. Interactions

- **Pointer parallax:** the 3D mark turns up to ±0.18 rad (Y) and ±0.1 rad (X) toward the cursor; the dust field follows slightly.
- **Cursor light:** a 520px violet radial glow trails the mouse (eased, factor 0.12). Hidden on touch devices.
- **Copy to clipboard:** swatches use `navigator.clipboard.writeText`; if it fails, the hex text is selected instead.
- **Navigation:** floating frosted-glass pill nav with smooth-scroll anchors: Story, Layers, Beliefs, The mark.

---

## 13. Responsive behaviour

Breakpoint: **760px** (and any viewport narrower than 0.85 aspect ratio for the 3D layout).

| Area | Desktop | Mobile |
|---|---|---|
| 3D mark | Beside text (`x` from `data-state`) | Centred above text (`mx`, `my`), often faded (`mop`) behind cards |
| Mark size | 20% of viewport height × scale | Capped at 30% of viewport width |
| Hero | Text vertically centred | Mark on top, text at the bottom |
| Layer cards | Alternate left and right | All left, more opaque background for readability |
| Beliefs | Sticky horizontal track | Normal vertical stack |
| Nav | All links | Logo + "The mark" only |
| Dust particles | 1,600 | 700 |
| Side gutter | `max(16px, safe-area-inset)` | same |

---

## 14. Accessibility

- `prefers-reduced-motion: reduce` turns off all CSS animations and transitions, stops idle 3D motion, and snaps the 3D mark to each pose instead of easing.
- Content is readable at rest: reveal effects start at partial opacity, never 0.
- Visible focus ring: 2px lavender outline with 4px offset.
- The canvas and decorative SVGs are `aria-hidden`; the layer diagram has a text label.
- Text contrast meets WCAG AA (see §5).

---

## 15. Editing cheatsheet

| I want to… | Do this |
|---|---|
| Change a colour | Edit the `:root` tokens at the top of the `<style>` block |
| Move or turn the 3D mark in a section | Edit that section's `data-state` JSON (§10) |
| Light a different ring | Set `"focus": 0–3` in the section's `data-state` |
| Add a section that controls the mark | Give the new element a `data-state` attribute; it is picked up automatically in DOM order |
| Change the statement text | Edit `<p id="words">`; wrap phrases in `<span class="hl">` to highlight them |
| Add a principle card | Copy an `<article class="belief">` inside `#track` |
| Remove "Coming soon" | Delete the two `<span class="soon">` elements |
| Change animation speed | Edit durations in the keyframe rules, or the lerp factors `0.075` / `0.09` in `frame()` |
| Make the 3D mark flatter or deeper | Change the `Z` array `[0, .62, 1.12, 1.5]` in the script |

---

© 2026 Zerith. Where clarity meets possibility.
