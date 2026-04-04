# Sprint 1: Design Tokens and Typography

**Workstream:** `design-system`
**Spec:** `docs/_specs/design-system/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Goal

Deliver the complete design token system (color, typography, spacing,
shadows, radii) in `globals.css` and `tailwind.config.ts`, wire the
real font stack into `app/layout.tsx`, enrich motion primitives, and
confirm the visual direction renders correctly at all breakpoints.
All five verification commands must pass.

---

## Referenced Spec Sections

- Architecture → Color Token System (all tiers)
- Architecture → Typography System (fonts, heading scale)
- Architecture → Spacing System
- Architecture → Shadow System
- Architecture → Motion Primitives
- Accessibility Requirements (contrast, focus, reduced motion)
- Performance Budget (font payload)

---

## Verified Available Assets

Checked against live repo on 2026-04-03:

- `tailwind.config.ts` — has placeholder HSL color tokens, empty
  `fontFamily`, `spacing`, `animation`, `keyframes` extension points
- `app/globals.css` — has achromatic placeholder CSS custom properties,
  Tailwind v3 directives, `@layer base` block
- `app/layout.tsx` — uses Geist/Geist_Mono placeholder fonts, needs
  replacement with Playfair Display / Source Sans 3 / JetBrains Mono
- `lib/motion.ts` — has stub variants (fadeIn, fadeUp, staggerContainer,
  springTransition, reducedMotionTransition)
- `lib/gsap.ts` — has registerGSAPPlugins(), ScrollTriggerConfig
  interface, defaultScrollTrigger
- `lib/utils.ts` — cn() utility, confirmed working
- `components.json` — shadcn/ui config, references `tailwind.config.ts`
  and `app/globals.css`
- `app/page.tsx` — minimal scaffold page using `text-muted-foreground`
- `__tests__/smoke.test.tsx` — 2 passing tests

---

## Artifact Targets

| Action | File                 |
| ------ | -------------------- |
| Modify | `app/globals.css`    |
| Modify | `tailwind.config.ts` |
| Modify | `app/layout.tsx`     |
| Modify | `app/page.tsx`       |
| Modify | `lib/motion.ts`      |
| Modify | `lib/gsap.ts`        |

No new files created. No new dependencies installed. All changes are
within existing files established by `site-foundation`.

---

## Tasks

### Task 1: Define color tokens in globals.css

**Action:** Replace the placeholder CSS custom properties in
`app/globals.css` `:root` with the full dark editorial palette.

Exact HSL values:

```
/* Background tiers */
--background: 240 8% 6%;        /* Deep blue-charcoal base */
--surface: 240 6% 10%;          /* Card/section backgrounds */
--elevated: 240 5% 15%;         /* Modals, dropdowns, tooltips */

/* Text tiers */
--foreground: 40 10% 92%;       /* Primary text — warm off-white */
--muted-foreground: 40 5% 55%;  /* Secondary text */
--faint: 240 5% 35%;            /* Disabled, placeholder */

/* Accent */
--accent: 38 90% 58%;           /* Amber-gold primary action */
--accent-subtle: 38 50% 25%;    /* Hover/border/low-emphasis */
--accent-foreground: 240 8% 6%; /* Text on accent backgrounds */

/* Semantic */
--success: 142 70% 45%;
--warning: 38 92% 50%;
--error: 0 84% 60%;

/* Utility */
--border: 240 6% 16%;
--ring: 38 90% 58%;
--radius: 0.5rem;

/* Shadows (used via token in tailwind config) */
--shadow-color: 240 8% 3%;

/* Section spacing */
--section-py: 5rem;
--section-py-sm: 3rem;
--container-max: 72rem;
--container-px: 1.5rem;
```

**Action:** Add utility classes in a `@layer components` block:

```css
@layer components {
  .section-container {
    @apply mx-auto w-full px-[var(--container-px)];
    max-width: var(--container-max);
  }
  .section-padding {
    padding-top: var(--section-py-sm);
    padding-bottom: var(--section-py-sm);
  }
  @media (min-width: 768px) {
    .section-padding {
      padding-top: var(--section-py);
      padding-bottom: var(--section-py);
    }
  }
}
```

**Action:** Add a `@layer base` rule for `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Verify:** `npm run build` passes — Tailwind processes tokens without
errors.

---

### Task 2: Update Tailwind config with full token mapping

**Action:** Replace the contents of `tailwind.config.ts` with the
complete token-mapped configuration:

- **colors**: Map all CSS custom properties — background, surface,
  elevated, foreground, muted (DEFAULT + foreground), faint, accent
  (DEFAULT + subtle + foreground), success, warning, error, border, ring
- **fontFamily**: `display` → Playfair Display variable, `sans` → Source
  Sans 3 variable, `mono` → JetBrains Mono variable
- **fontSize**: Custom scale entries for the heading hierarchy with
  line-height and tracking baked in
- **spacing**: Add `section` (var(--section-py)) and `section-sm`
  (var(--section-py-sm))
- **boxShadow**: Define `sm`, `md`, `lg`, `glow` using warm shadow color
- **borderRadius**: Keep existing lg/md/sm radius tokens
- **animation** + **keyframes**: Add a subtle `float` animation for
  atmospheric elements and a `fade-in` keyframe for CSS-only fallbacks

**Verify:** `npm run typecheck` passes (config is TypeScript).
`npm run build` passes (Tailwind resolves all tokens).

---

### Task 3: Wire fonts in layout.tsx

**Action:** Replace Geist/Geist_Mono imports with:

```ts
import { Playfair_Display } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
```

Configure each with:

- `subsets: ["latin"]`
- `variable` set to `--font-display`, `--font-sans`, `--font-mono`
- `display: "swap"` for performance
- Playfair: `weight: ["400", "700"]` (display needs bold; 400 for
  italic emphasis if used later)
- Source Sans 3: `weight: ["400", "600"]` (body + semi-bold)
- JetBrains Mono: `weight: ["400"]` (mono text is single weight)

**Action:** Apply all three CSS variable classes to `<html>`.

**Action:** Verify `<body>` uses `font-sans` class (which maps to
Source Sans 3 via Tailwind config).

**Verify:** `npm run build` passes. Dev server shows correct fonts
rendering.

---

### Task 4: Update page.tsx to showcase tokens

**Action:** Modify `app/page.tsx` to use design tokens as a visual
verification page. Keep it minimal — this is scaffold content, not the
real hero section:

- `<h1>` uses `font-display` class (Playfair Display)
- Body text uses default `font-sans` (Source Sans 3)
- A small code-styled element uses `font-mono` (JetBrains Mono)
- Background renders the `--background` token
- Text uses `--foreground` and `--muted-foreground` tokens
- A small accent element demonstrates the `--accent` token

No hardcoded colors. All via Tailwind token classes.

**Verify:** Visual inspection at 320px, 375px, 768px, 1440px. No
horizontal overflow. Fonts load. Colors render.

---

### Task 5: Enrich motion primitives

**Action:** Modify `lib/motion.ts`:

- Update `springTransition` to softer, more organic values:
  `stiffness: 100, damping: 20, mass: 0.5`
- Add `fadeDown` variant (opacity 0, y: -20 → visible)
- Add `scaleIn` variant (opacity 0, scale: 0.95 → visible)
- Add `slideInLeft` / `slideInRight` variants for directional reveals
- Update `staggerContainer` with two presets:
  - `staggerFast`: `staggerChildren: 0.06`
  - `staggerSlow`: `staggerChildren: 0.15`
- Export a `motionConfig` object that bundles all variants for easy import
- Re-export `useReducedMotion` from `motion/react` for component use

**Verify:** `npm run typecheck` passes. All exports are properly typed.

---

### Task 6: Enrich GSAP utilities

**Action:** Modify `lib/gsap.ts`:

- Add `createScrollReveal` function that builds a GSAP from-to tween
  with ScrollTrigger defaults matching the design system's easing
- Add `prefersReducedMotion()` utility that checks
  `window.matchMedia("(prefers-reduced-motion: reduce)")`
- Update `defaultScrollTrigger` with design-system-appropriate values
- Add `easings` object with named easing curves

**Verify:** `npm run typecheck` passes.

---

### Task 7: Run full verification stack

**Action:** Run all five commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
```

**Verify:** All five pass with zero errors.

---

## Completion Checklist

- [x] Color tokens defined in globals.css (background tiers, text tiers,
      accent, semantic, utility)
- [x] Tailwind config maps all CSS custom properties
- [x] Playfair Display loaded and assigned to `font-display`
- [x] Source Sans 3 loaded and assigned to `font-sans`
- [x] JetBrains Mono loaded and assigned to `font-mono`
- [x] Heading scale defined in Tailwind config
- [x] Shadow tokens defined
- [x] Section spacing tokens defined and consumable
- [x] page.tsx showcases all three fonts and key tokens
- [x] Motion primitives enriched with design-system values
- [x] GSAP utilities enriched with design-system easing
- [x] Reduced motion handled in CSS and motion utilities
- [x] All five verification commands pass
- [x] No `any` types
- [x] No hardcoded hex values in component files

---

## QA Deviations

1. **`muted.DEFAULT` maps to `--surface` instead of a dedicated `--muted`
   token.** The site-foundation scaffold had a `--muted` CSS variable. The
   design-system replaced it with the three-tier background system. Tailwind's
   `muted.DEFAULT` now maps to `hsl(var(--surface))` for shadcn/ui backward
   compatibility. This is a semantic mapping, not a regression.

2. **`staggerContainer` removed, replaced by `staggerFast`/`staggerSlow`.**
   No existing code imported the old name — non-breaking rename.

3. **`defaultScrollTrigger.start` changed from `top 80%` to `top 85%`.**
   Elements reveal slightly earlier during scroll. Intentional design-system
   tuning for the editorial reveal feel.
