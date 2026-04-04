# Sprint 1: Hero Section

**Workstream:** `hero-section`
**Spec:** `docs/_specs/hero-section/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Goal

Deliver the hero section with atmospheric background, choreographed
motion entrance, responsive typography, two CTA buttons, and proper
semantic structure. Replace the current scaffold content in `page.tsx`.
All five verification commands must pass. Tests cover rendering and
content.

---

## Referenced Spec Sections

- Design Goals (immediate clarity, atmospheric depth, choreographed
  entrance, typography hierarchy, full viewport, mobile-first)
- Architecture → Component Tree
- Architecture → File Structure
- Architecture → Background Implementation
- Applicable Design Patterns (Singleton, Strategy, Composite)
- Accessibility Requirements
- Testing Strategy

---

## Verified Available Assets

Checked against live repo on 2026-04-03:

- `lib/constants.ts` — `siteConfig` with `name`, `role`, `description`,
  `graduation`. Currently lacks a `tagline` field — will add one.
- `lib/motion.ts` — `fadeUp`, `scaleIn`, `staggerSlow`,
  `useReducedMotion` available
- `lib/utils.ts` — `cn()` utility available
- `app/page.tsx` — scaffold content with `<section id="home">`, will be
  replaced with `<HeroSection />`
- `app/globals.css` — design tokens, `--accent`, `--background`,
  `--surface` available
- `tailwind.config.ts` — full token mapping, `text-display-1` through
  `text-display-4`, shadows, animations
- `components/sections/.gitkeep` — placeholder, will be deleted
- `components/layout/navbar.tsx` — fixed navbar at `h-16` (4rem),
  transparent over hero
- `__tests__/smoke.test.tsx` — existing smoke test references "Jesus
  Rosario" — will need updating since hero component renders that now
- `__tests__/navbar.test.tsx` — 5 existing tests, must keep passing
- `package.json` — `motion`, `lucide-react` already installed

---

## Artifact Targets

| Action | File                                   |
| ------ | -------------------------------------- |
| Create | `components/sections/hero-section.tsx` |
| Create | `__tests__/hero.test.tsx`              |
| Modify | `app/page.tsx`                         |
| Modify | `lib/constants.ts`                     |
| Modify | `__tests__/smoke.test.tsx`             |
| Delete | `components/sections/.gitkeep`         |

---

## Design Decisions (from Spec QA)

1. **Add `tagline` field to `siteConfig`.** A short, punchy hero
   subtitle belongs in the constants file (Singleton pattern). Value:
   `"Building polished web experiences with modern tools."` This keeps
   content out of the component and in the single source of truth.

2. **Navbar overlap — `pt-16` on hero.** The hero section gets `pt-16`
   (4rem) padding-top to account for the fixed navbar height. Content
   is then vertically centered in the remaining space.

3. **Background glow via positioned div.** A positioned `<div>` with
   `aria-hidden="true"` and a radial gradient creates the warm glow.
   More inspectable than a pseudo-element.

4. **`id="home"` on hero root element.** The hero's root `<section>`
   gets `id="home"` so the navbar's IntersectionObserver and `#home`
   anchor continue working.

5. **Delete `components/sections/.gitkeep`.** Replaced by the real
   hero component file.

6. **"View Resume" CTA links to `#`.** Placeholder until the developer
   provides a resume URL. Styled identically to a real link — no
   visual difference.

7. **Button style convention.** This sprint establishes two button
   styles:
   - **Primary:** `bg-accent text-accent-foreground` with hover
     darkening, rounded, font-medium
   - **Secondary/Outline:** `border border-border text-foreground` with
     hover `bg-surface`, rounded, font-medium

---

## Tasks

### Task 1: Add tagline to siteConfig

**Action:** Modify `lib/constants.ts`:

- Add `tagline: string` to the `SiteConfig` interface
- Set value: `"Building polished web experiences with modern tools."`

**Verify:** `npm run typecheck` passes.

---

### Task 2: Create HeroSection component

**Action:** Create `components/sections/hero-section.tsx`:

- `"use client"` directive (uses Motion hooks)
- Root element: `<section id="home" className="relative min-h-screen
flex flex-col items-center justify-center pt-16 px-4 overflow-hidden">`
- Background glow: positioned `<div>` with `aria-hidden="true"`,
  `absolute inset-0`, using a radial gradient via inline style (CSS
  custom property values, not hardcoded hex). The gradient is:
  - A soft `accent` glow (5-8% opacity) centered in upper third
  - A subtle lighter tone near the bottom for depth separation
- Content wrapper: `<motion.div>` with `staggerSlow` container variant
  for choreographed entrance
- Content elements in order:
  1. **Role badge:** `<motion.span>` with `fadeUp` variant,
     `font-mono text-sm text-accent` — displays `siteConfig.role`
  2. **Headline:** `<motion.h1>` with `fadeUp` variant,
     `font-display text-display-1 md:text-6xl` — displays
     `siteConfig.name`
  3. **Subtitle:** `<motion.p>` with `fadeUp` variant,
     `text-lg md:text-xl text-muted-foreground` — displays
     `siteConfig.tagline`
  4. **CTA group:** `<motion.div>` with `fadeUp` variant, contains:
     - Primary CTA: `<a href="#projects">` styled as primary button
     - Secondary CTA: `<a href="#">` styled as outline button
- `useReducedMotion` check: if true, pass no variants (elements render
  in final state immediately)

**Verify:** `npm run typecheck` passes.

---

### Task 3: Update page.tsx

**Action:** Modify `app/page.tsx`:

- Remove all scaffold content (h1, p, span)
- Import and render `<HeroSection />`
- The `<section id="home">` wrapper moves into `HeroSection` — page.tsx
  is now a thin shell

**Verify:** `npm run build` passes.

---

### Task 4: Update smoke test

**Action:** Modify `__tests__/smoke.test.tsx`:

- The existing smoke test renders `<Home />` and checks for "Jesus
  Rosario". Since HeroSection is a client component using Motion, the
  test environment may need the IntersectionObserver mock (already in
  navbar tests). Add the mock if needed.
- Verify both tests still pass.

**Verify:** `npm run test` passes.

---

### Task 5: Write hero tests

**Action:** Create `__tests__/hero.test.tsx`:

1. **HeroSection renders with id="home"** — section with `id="home"`
2. **Developer name in h1** — heading contains `siteConfig.name`
3. **Role is visible** — `siteConfig.role` text present
4. **Tagline is visible** — `siteConfig.tagline` text present
5. **CTA links present** — "View Projects" and "View Resume" links

**Verify:** `npm run test` passes with all new + existing tests.

---

### Task 6: Delete .gitkeep placeholder

**Action:** Delete `components/sections/.gitkeep`.

**Verify:** File is gone.

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

- [x] `tagline` field added to `SiteConfig` and `siteConfig`
- [x] `components/sections/hero-section.tsx` created
- [x] Hero has `id="home"` on root section
- [x] Atmospheric background glow (radial gradient, no hardcoded hex)
- [x] `pt-16` accounts for fixed navbar
- [x] h1 uses `font-display` with `text-display-1` / `md:text-6xl`
- [x] Role badge uses `font-mono text-accent`
- [x] Subtitle uses `text-muted-foreground`
- [x] Primary CTA ("View Projects") links to `#projects`
- [x] Secondary CTA ("View Resume") links to `#` (placeholder)
- [x] Choreographed entrance with `staggerSlow` + `fadeUp`
- [x] `useReducedMotion` respected
- [x] `page.tsx` renders `<HeroSection />` (scaffold content removed)
- [x] `components/sections/.gitkeep` deleted
- [x] Smoke test updated and passing
- [x] Hero tests pass (5 tests)
- [x] All five verification commands pass
- [x] No `any` types
- [x] No hardcoded hex values in components

---

## QA Deviations

1. **Smoke test did not need updating.** Task 4 anticipated potential issues
   with Motion in jsdom. In practice, `useReducedMotion` uses `matchMedia`
   which returns false by default in jsdom — no mock needed. The smoke test
   passes unchanged.

2. **Background glow uses inline `style` attribute.** Tailwind has no utility
   for multi-stop radial gradients with custom ellipse sizes. The inline style
   uses CSS custom properties (`var(--accent)`, `var(--surface)`) — no
   hardcoded hex. Acceptable deviation from the all-Tailwind preference.

3. **`pt-16` couples hero to navbar height.** If navbar height changes, hero
   padding must also change. Acceptable for a portfolio with stable dimensions.
   A `--navbar-height` custom property could decouple them in the future.
