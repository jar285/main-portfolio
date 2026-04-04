# Feature Spec: UX Enhancements (Hero Blob & Magnetic Hover)

**Workstream:** `ux-enhancements`
**Priority:** P2
**Status:** Draft
**Date:** 2026-04-03

---

## Problem Statement

The portfolio successfully implements foundational layout and structure, but requires an additional layer of polish to stand out as a premium engineering product. Specifically:

1. The Hero Section atmospheric layer feels static. A subtle, organic "Blob" animation will add breathing depth, making the interface feel alive upon first impression.
2. The Navbar lacks micro-interactions beyond basic hover color changes. A magnetic cursor attraction effect for the navigation links creates a tactical, engaging user experience that demonstrates advanced front-end engineering proficiency.

---

## Design Goals

1. **Organic Depth:** The hero blob must be softly blurred without hard geometric edges to harmonize with the existing atmospheric `radial-gradient` glow.
2. **Tactile Interaction:** The navbar links should physically pull towards the user's cursor seamlessly without breaking the flexbox layout bounds.
3. **Accessibility First (A-11y):** Both interactions (the blob animation and the magnetic physics) **must absolutely cease** if `prefers-reduced-motion: reduce` is active. The blob should remain as a static element for visual depth, and the links should behave normally without displacement.
4. **Reusability:** The magnetic interaction must be built as a wrapper primitive (`<MagneticHover>`) so it can be applied to buttons, cards, or social links in the future without duplicating physics logic.

---

## Architecture

### Component Tree

```
Navbar
└── MagneticHover (Wrapper Component)
    └── link elements (Home, Skills, Projects, About)

HeroSection
└── Atmospheric Background Wrapper
    ├── Background static gradient
    └── Blob (Animated div, blurred)
```

### File Structure

| File                                   | Purpose                                        |
| -------------------------------------- | ---------------------------------------------- |
| `components/ui/magnetic-hover.tsx`     | New reusable framer-motion interaction wrapper |
| `components/layout/navbar.tsx`         | Modification: Inject MagneticHover on links    |
| `components/sections/hero-section.tsx` | Modification: Add background blob node         |
| `app/globals.css`                      | Modification: Add arbitrary keyframes for blob |

---

## Applicable Design Patterns

| Pattern      | Application                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Strategy** | `MagneticHover` logic allows for dynamic, injected `strength` configuration coefficients on a per-element basis (e.g. `0.2` vs `0.4` magnetism). |
| **Observer** | The `MagneticHover` component explicitly tracks the `X` and `Y` coordinate displacement fields relative to `onMouseMove` events via React Refs.  |

---

## Accessibility Requirements

- **Strict Fallback Layer:** Utilizing `useReducedMotion()`.
  - If reduced: Blob node renders statically, stripped of css iteration count instructions.
  - If reduced: `MagneticHover` returns early and renders child statically, avoiding hook generation entirely.
- The Blob element must carry the `aria-hidden="true"` attribute to prevent screen readers from seeing an empty `div`.
- The Navbar `MagneticHover` wrappers must securely proxy down focus outlines and `href` tab-targeting without swallowing events.

---

## Performance Budget

| Metric          | Target    | Mitigation Notes                                                                                                                                                                                                                                             |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GPU Compositing | < 50ms JS | The blob utilizes `filter: blur()` and arbitrary scale morphing which can cause repaint stuttering on low-end devices. Mitigation via CPU hardware acceleration `will-change-transform`.                                                                     |
| Event Listeners | Minimal   | `onMouseMove` event dispatching fires 60 times a second on hover. We encapsulate physics into `useSpring` and isolate the state into continuous Framer `MotionValues` rather than React component state (`useState`) to avoid massive re-rendering cascades. |
| Bundle Size     | < 2 KB    | Using existing `@motion/react` package; no new dependencies.                                                                                                                                                                                                 |

---

## Testing Strategy

1. **Component Verification:** Verify `<MagneticHover>` wrapper correctly outputs child DOM nodes and forwards Refs properly.
2. **Navbar Structure:** Ensure `<Navbar>` desktop links have not broken CSS layout bounding-rects.
3. **Responsive Degradation:** Verify that on mobile (`375px`), the magnetic physics handle touch-screen behavior gracefully (or are purposefully disabled via standard cursor detection).
4. **Blob Placement:** Verify `overflow-x-clip` on Hero still successfully prevents the blob from widening the viewport scale causing horizontal scrollbars.

---

## Sprint Plan

### Sprint 1: UX Enhancements Component Build

- Build `components/ui/magnetic-hover.tsx` utilizing Framer Motion hooks.
- Apply `<MagneticHover>` to the generic Desktop mapping array in `navbar.tsx`.
- Modify `app/globals.css` to add custom breathing animation frames.
- Inject the Blob node within `hero-section.tsx`.
- Conduct QA at breakpoints.
