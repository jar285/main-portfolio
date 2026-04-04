# Sprint 1: Hero Section — Implementation QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Sprint doc:** `docs/_specs/hero-section/sprints/sprint-1-hero.md`
**Governing spec:** `docs/_specs/hero-section/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Verification Commands

| Command                | Result | Notes                                     |
| ---------------------- | ------ | ----------------------------------------- |
| `npm run typecheck`    | PASS   | Zero errors                               |
| `npm run lint`         | PASS   | Zero errors                               |
| `npm run test`         | PASS   | 12/12 tests (2 smoke + 5 navbar + 5 hero) |
| `npm run build`        | PASS   | Static export, 2 routes                   |
| `npm run format:check` | PASS   | All files formatted                       |

---

## Artifact Audit

### lib/constants.ts — Modified

- [x] `tagline: string` added to `SiteConfig` interface
- [x] `tagline` value set: "Building polished web experiences with
      modern tools."
- [x] No other fields changed — existing consumers unaffected

### components/sections/hero-section.tsx — Created

- [x] `"use client"` directive present
- [x] Root element: `<section id="home">` with `min-h-screen`,
      `overflow-hidden`, `pt-16` (navbar clearance)
- [x] Atmospheric background glow div:
  - `aria-hidden="true"`, `pointer-events-none`, `absolute inset-0`
  - Radial gradient using `hsl(var(--accent) / 0.06)` — no hardcoded hex
  - Second gradient using `hsl(var(--surface) / 0.4)` for bottom depth
- [x] Content wrapper: `motion.div` with `staggerSlow` container
- [x] Role badge: `motion.span`, `font-mono text-sm text-accent`,
      reads `siteConfig.role`
- [x] Headline: `motion.h1`, `font-display text-display-1 md:text-6xl`,
      reads `siteConfig.name`
- [x] Subtitle: `motion.p`, `text-muted-foreground`, reads
      `siteConfig.tagline`
- [x] CTA group: `motion.div` with two links:
  - Primary: `href="#projects"`, `bg-accent text-accent-foreground`,
    hover `bg-accent/90`
  - Secondary: `href="#"`, `border border-border text-foreground`,
    hover `bg-surface`
- [x] All content elements use `fadeUp` variant for staggered entrance
- [x] `useReducedMotion`: if true, no variants applied — elements
      render in final state immediately
- [x] No `any` types
- [x] No hardcoded hex values

### app/page.tsx — Modified

- [x] Scaffold content fully removed
- [x] Imports and renders `<HeroSection />`
- [x] Thin shell — no business logic

### **tests**/hero.test.tsx — Created

- [x] Test 1: `id="home"` section present
- [x] Test 2: h1 contains developer name
- [x] Test 3: Role text visible
- [x] Test 4: Tagline text visible
- [x] Test 5: "View Projects" and "View Resume" links present

### **tests**/smoke.test.tsx — Unchanged

- [x] Existing 2 tests still pass after page.tsx change
- [x] No mock needed — Motion works in jsdom without
      IntersectionObserver mock

### components/sections/.gitkeep — Deleted

- [x] File removed, replaced by real component

---

## Visual Inspection

| Viewport | Result | Notes                                             |
| -------- | ------ | ------------------------------------------------- |
| 320px    | PASS   | Content centered, CTA buttons stack in flex-wrap, |
|          |        | no horizontal overflow, fonts load correctly      |
| 375px    | PASS   | Content fits, readable, glow visible              |
| 768px    | PASS   | h1 scales to text-6xl, buttons side by side       |
| 1440px   | PASS   | Content centered in max-w-2xl, glow atmospheric   |

---

## Findings

No blocking issues.

---

## Observations

1. **Smoke test did not need updating.** The sprint doc (Task 4)
   anticipated potential issues with the smoke test after the page.tsx
   change. In practice, Motion components render fine in jsdom — the
   smoke test passes without any mocks or changes. The `matchMedia`
   used by `useReducedMotion` returns false by default in jsdom, so
   Motion animations are technically "enabled" in tests but don't
   affect DOM assertions. This is a non-issue.

2. **Background glow uses inline `style` attribute.** This is the one
   place where inline styles appear in the component. It's justified
   because Tailwind has no utility for multi-stop radial gradients with
   custom ellipse sizes. The values use CSS custom properties
   (`var(--accent)`, `var(--surface)`) — no hardcoded hex. If this
   pattern repeats in future sections, extracting it to a utility class
   in `globals.css` via `@layer components` would reduce duplication.

3. **Button style convention established.** This is the first appearance
   of button-like elements. The primary (`bg-accent`) and secondary
   (`border border-border`) patterns are now the reference for future
   workstreams. When shadcn/ui Button is eventually added, these styles
   should be migrated to CVA variants for consistency. For now, inline
   Tailwind classes on `<a>` tags are clean and sufficient.

4. **`hover:bg-accent/90` on primary CTA.** Tailwind's opacity modifier
   (`/90`) creates a subtle darkening hover effect. This works because
   the color token uses `hsl()` format which supports the `/` opacity
   syntax. If the token format changes, this will break — but the
   design system spec locks the HSL format.

5. **CTA `flex-wrap` handles narrow viewports.** At 320px, if both
   buttons don't fit side by side, `flex-wrap` allows them to stack.
   With `px-6 py-3 text-sm`, both buttons fit at 320px, but the
   wrapping is a safety net for even narrower content or longer labels.

6. **`pt-16` is coupled to navbar height.** The hero section uses
   `pt-16` (4rem) to clear the fixed navbar (`h-16`). If the navbar
   height changes, the hero padding must also change. This coupling is
   acceptable for a portfolio — both are simple components with stable
   dimensions. A CSS custom property (e.g., `--navbar-height`) could
   decouple them in the future if needed.

7. **`staggerSlow` creates editorial pacing.** With `delayChildren: 0.2`
   and `staggerChildren: 0.15`, the entrance sequence takes roughly
   0.2 + (4 × 0.15) = 0.8 seconds before the last element starts
   animating. Combined with the spring transition (stiffness 100,
   damping 20), the full entrance completes in ~1.3 seconds. This is
   within the "legible within 2 seconds" requirement from `agent.md`.

8. **No GSAP used — correct.** The hero's entrance is purely
   declarative via Motion variants. No scroll triggers, no timelines.
   GSAP would be over-engineering here.

---

## Verdict

**PASS**

All sprint tasks completed. All six artifact targets handled (2 created,
2 modified, 1 unchanged/verified, 1 deleted). All five verification
commands pass. 12/12 tests pass. Hero section delivers atmospheric
depth through layered radial gradients, choreographed motion entrance
via staggerSlow + fadeUp, typography-first hierarchy, and two CTAs.
Content reads from `siteConfig` (Singleton pattern). No `any` types.
No hardcoded hex values. Ready for the `skills-section` workstream.
