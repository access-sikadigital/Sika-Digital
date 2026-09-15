# Sika Digital — Website (SIK-01)

Next.js 16 App Router, statically generated, built for Vercel.
Encoded from **Sika Digital — Website SEO & Build Scope** (13 Sep 2026).

---

## ⚠️ Read this first

**This project has never been compiled.** It was written file-by-file while the
build sandbox was unavailable, so `npm install`, `next build` and every runtime
check are still outstanding. Treat the first install as part of the setup, not
as a formality — expect to fix a version mismatch or two.

```bash
npm install
npm run typecheck   # do this before npm run dev — it fails fast and explains why
npm run dev
```

### Verify the dependency versions

Versions in `package.json` were chosen against the latest stable releases as of
**13 September 2026** — Next 16.3.4, React 19.3.0, Tailwind 4.3.3. The rest were
set from known-good ranges and **have not been resolved against the registry**.

Run this once and reconcile anything that looks wrong:

```bash
npm outdated
```

Three worth checking specifically, because their major versions moved recently:

| Package          | Why to check                                        |
| ---------------- | --------------------------------------------------- |
| `lenis`          | Renamed from `@studio-freight/lenis`; API changed    |
| `motion`         | Renamed from `framer-motion`; import is `motion/react` |
| `tailwind-merge` | v3 is the first version that understands Tailwind v4 |

---

## Stack

| Layer          | Choice                        | Why                                                                       |
| -------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router)       | Static generation → Core Web Vitals, which this site has to demonstrate    |
| Styling        | Tailwind CSS v4               | Tokens live in CSS (`@theme`), not a JS config                            |
| Motion         | GSAP 3.13 + ScrollTrigger     | `SplitText` is free from 3.13 — no Club licence needed                     |
| Smooth scroll  | Lenis                         | Driven by the GSAP ticker so the two never fight over the frame            |
| UI transitions | Motion (`motion/react`)       | Better than GSAP for mount/unmount and layout animation                    |
| Forms          | react-hook-form + Zod         | Uncontrolled inputs; one schema validates on client and server             |

---

## Structure

```
src/
├── app/                  routes, globals.css (design tokens), sitemap, robots
├── components/
│   ├── brand/            Logo + Logomark, inlined SVG, themeable
│   ├── layout/           Header, Footer
│   ├── motion/           SmoothScroll, Reveal, SplitLines, Marquee, Parallax
│   └── ui/               Container, Button
├── config/
│   ├── site.ts           contact, offer, founder — single source of truth
│   └── pages.ts          the full IA: 48 routes, keywords, titles, tiers
└── lib/                  fonts, gsap, metadata, utils
```

**`src/config/pages.ts` is the spine.** Every route reads its URL, title,
description, H1 and keyword from it. Never hardcode metadata in a page file — if
two places can disagree, eventually they will.

---

## Design system

Tokens are in `src/app/globals.css`. Two layers, and the distinction matters:

- **Primitives** — literal brand values (`--color-lime` is `#BDF031`, always)
- **Semantics** — roles (`--color-background`, `--color-accent`)

**Components use semantics only.** That is what lets any section invert by
adding `theme-light`, without a single component knowing both themes exist.

### Palette

| Token   | Hex       | Notes                                        |
| ------- | --------- | -------------------------------------------- |
| Ink     | `#0B0B0B` | Wordmark black; the default background       |
| Lime    | `#BDF031` | The asterisk. Accent — used sparingly        |
| Blue    | `#1A1BAC` | Secondary mark; the accent on light surfaces |
| Paper   | `#FFFFFF` |                                              |

> **Never put white text on lime.** It measures ~1.2:1 and is unreadable. Ink on
> lime is 14:1. Use `--color-on-accent`, which handles this.
>
> **Never use lime as text on white** — ~1.3:1. On light surfaces the accent
> role is played by the brand blue automatically.

### Type

Archivo (variable, **weight + width**) and Archivo Black, both OFL, both from
Sika's own brand kit. The width axis is what reaches the condensed display
setting the reference sites buy licensed faces for.

JetBrains Mono is the one addition — the mono-caps eyebrow is the texture that
keeps huge display type from shouting, and Archivo has no mono cut.

---

## Motion

Every primitive follows the same three rules:

1. **Transform and opacity only.** Both composite on the GPU. Animating
   `height`, `top` or `margin` forces layout every frame.
2. **`prefers-reduced-motion` is checked in JS**, not just CSS — no timeline is
   built at all, rather than a fast one.
3. **Nothing animates off-screen.** Loops pause when out of view.

| Component      | Use                                                       |
| -------------- | --------------------------------------------------------- |
| `SmoothScroll` | Wraps the app once in the root layout                     |
| `Reveal`       | Default section entrance                                  |
| `SplitLines`   | Headlines. Splits to **lines, not characters** — see file  |
| `Marquee`      | Ticker bands. Seamless via duplicate + exact −50%          |
| `Parallax`     | Scroll drift. `scrub: 0.4`, never `scrub: true`            |

---

## What is deliberately not built

Not oversights — each is blocked on a decision in the scope's Open Questions.

| Gap                        | Blocked on                                             |
| -------------------------- | ------------------------------------------------------ |
| Homepage copy / H1         | **Q1** — the positioning one-liner                      |
| Final CTA wording          | **Q2** — primary first-step offer                       |
| Results / case studies     | **Q3** — which client numbers can be published          |
| 46 remaining page templates| Design direction sign-off                               |
| Mega-menu + mobile panel   | Header is a working shell; full menu after templates    |
| Enquiry form + GHL wiring  | Field list is in the scope's Page Blueprint             |
| Redirect map               | Export of the current sikadigital.com URLs              |

**`GHL_WEBHOOK_URL` is unset.** Until it is, the enquiry form will accept a
submission and deliver nothing. Check it before launch.

---

## Two IA corrections applied

The workbook sitemap had Tier-1 pages sitting under Tier-2 parents:

- `/industries/` was Tier 2 with `/industries/tradies/` (Tier 1) beneath it
- `/guides/` was Tier 2 with four Tier-1 guides beneath it

Shipping a hub after its children means every breadcrumb on those children
points at a 404. Both promoted to Tier 1.

A `/services/` hub was also added — it was absent from the workbook, but the nav
has to point somewhere and the section needs a root.

`/seo/seo-audit/` is flagged `conversionOnly`: it targets "seo audit" at KD 73,
will not rank in year one, and should not be counted as an SEO miss.
