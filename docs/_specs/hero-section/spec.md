# Hero Section — Feature Spec

**Workstream:** `hero-section`
**Priority:** P1
**Author:** AI Agent (governed by `agent.md` v1.0.0)
**Date:** 2026-04-03
**Status:** Draft

---

## Problem Statement

The portfolio currently renders a placeholder scaffold page (`page.tsx`)
with a centered h1, subtitle, and a design-system token badge. There is
no hero section — the first thing a visitor sees has no atmosphere, no
call to action, and no indication of the developer's value proposition.

Per `agent.md` content rule #3: "The hero communicates role and value
immediately. Headline, subtitle, and CTA must be legible within 2
seconds. Button labels describe their action."

The hero section is the highest-impact visual element on the page. It
must combine the atmospheric depth from the design system (layered
gradients, soft glows, choreographed motion) with concrete, fast-reading
content (name, role, subtitle, CTA buttons).

---

## Design Goals

1. **Immediate clarity.** Within 2 seconds a visitor sees: the
   developer's name, role, a one-line value statement, and two CTAs
   (View Projects, View Resume). No ambiguity.

2. **Atmospheric depth.** The hero background uses a layered radial
   gradient with a soft accent glow point to create volumetric depth —
   not a flat solid color. Per design principle #2: "Radial gradients,
   opacity layers, and soft glow points create dimensionality."

3. **Choreographed entrance.** Content elements stagger in with varied
   delays using Motion (Framer Motion). The headline enters first, then
   subtitle, then CTA buttons. Per design principle #3: "If multiple
   elements animate, they move at intentionally different rates and
   directions."

4. **Typography-first hierarchy.** The headline uses `font-display`
   (Playfair Display) at the largest scale (`text-display-1` mobile,
   `text-6xl` desktop). The subtitle uses `font-sans` (Source Sans 3).
   Role/tagline uses `font-mono` (JetBrains Mono) for a technical feel.

5. **Full viewport height.** The hero fills the viewport (`min-h-screen`)
   with content vertically centered, accounting for the fixed navbar
   height (h-16 / 4rem).

6. **Mobile-first from 320px.** All content readable and well-spaced at
   320px. No horizontal overflow. Typography scales up at `md` (768px).

---

## Architecture

### Component Tree

```
app/page.tsx
└── HeroSection (components/sections/hero-section.tsx) — "use client"
    ├── Background glow (CSS — radial gradient pseudo-element or div)
    ├── Headline (h1, font-display)
    ├── Role badge (span, font-mono)
    ├── Subtitle (p, font-sans)
    └── CTA group (div)
        ├── Primary CTA (a → #projects, styled as button)
        └── Secondary CTA (a → resume link, styled as outline button)
```

### File Structure

| File                                   | Type   | Purpose                     |
| -------------------------------------- | ------ | --------------------------- |
| `components/sections/hero-section.tsx` | Client | Hero section with motion    |
| `__tests__/hero.test.tsx`              | Test   | Hero render + content tests |

### Data Flow

1. `siteConfig` from `lib/constants.ts` provides the developer name,
   role, and description (Singleton pattern)
2. `HeroSection` imports motion variants from `lib/motion.ts`
   (Strategy pattern — Motion for declarative enter animations)
3. `page.tsx` renders `<HeroSection />` as the first section, replacing
   the current scaffold content

### Props Interface

```ts
interface HeroSectionProps {
  // No props — HeroSection is self-contained, reads from constants
}
```

### Background Implementation

The atmospheric background uses CSS only — no JS animation overhead:

- A `::before` pseudo-element (or a positioned div) with a radial
  gradient from `accent` at very low opacity (5-8%) centered in the
  upper portion of the hero, creating a warm glow point
- The base `background` token provides the dark foundation
- A second subtle radial gradient from a cool tone (slightly lighter
  than background) at the bottom for depth separation from the next
  section

This satisfies design principles #1 (atmospheric depth through layering)
and #2 (volumetric color) without adding JS animation cost or new
dependencies. The glow is static but atmospheric — per principle #4,
background effects should be "almost subconscious."

---

## Applicable Design Patterns

| Pattern   | Application                                           |
| --------- | ----------------------------------------------------- |
| Singleton | `siteConfig` from `lib/constants.ts` for hero content |
| Strategy  | Motion for hero entrance animations (declarative,     |
|           | spring-based). GSAP not needed — no scroll triggers   |
|           | or timelines in the hero.                             |
| Composite | HeroSection contains headline, subtitle, CTA group —  |
|           | nested component tree                                 |

---

## Accessibility Requirements

- **Heading hierarchy:** h1 for the developer name (only h1 on page)
- **CTA links:** Styled as buttons but are `<a>` elements with
  descriptive text ("View Projects", "View Resume")
- **Color contrast:** All text on the atmospheric background must meet
  WCAG AA. The foreground token (warm off-white) on the background
  token (dark blue-charcoal) yields ~15:1 — well above 4.5:1.
- **Reduced motion:** `useReducedMotion` check — if preferred, all
  elements appear instantly in their final position
- **No autoplaying video or complex animation** — the glow is CSS-only
  and static

---

## Performance Budget

From `agent.md`:

| Metric          | Target   |
| --------------- | -------- |
| FCP             | < 1.5s   |
| LCP             | < 2.5s   |
| Total bundle JS | < 200 KB |

**Hero-specific:**

- No images in the hero — text-only with CSS gradients. LCP will be
  the h1 text element.
- No new dependencies. Motion is already installed and loaded for the
  navbar — the hero reuses it with no additional bundle cost.
- CSS gradients have zero runtime cost — they are painted by the GPU.

---

## Testing Strategy

Per `agent.md`:

- **New component → smoke render test minimum**
- **Content verification** — hero text matches constants

Tests:

1. **HeroSection renders** — section element with `id="home"` exists
2. **Developer name visible** — h1 contains `siteConfig.name`
3. **Role visible** — `siteConfig.role` text present
4. **CTA links present** — "View Projects" and "View Resume" links
5. **Heading is h1** — proper heading hierarchy

---

## Sprint Plan

Single sprint:

### Sprint 1: Hero Section

**Goal:** Fully realized hero section with atmospheric background,
choreographed motion entrance, responsive typography, CTA buttons,
and proper semantic structure. Replaces the current scaffold content
in `page.tsx`.

---

## Future Considerations

- The `View Resume` CTA currently links to `#` as a placeholder. The
  actual resume URL will be set when the developer provides it. This
  can be a Change Note — no spec needed.
- If a profile photo or avatar is added later, it should be placed
  within the hero component as an optional prop. This workstream does
  not add images.
- The background glow could be enhanced with a subtle CSS animation
  (slow pulse or drift) in the `performance-and-a11y` workstream if
  it stays within the 60fps budget. For now, static is sufficient.
