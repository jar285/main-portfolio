# Spec — Core Hydration & Hero Layout Fixes

**Status:** Draft
**Priority:** P0 (Critical Production Bug)
**Workstream:** `performance-and-a11y` / `site-foundation`

## 1. Problem Statement

### Bug 1: Light Theme "Hydration Lock"

On mobile devices, particularly in Light Theme, the entire site content remains invisible for 10–15 seconds during reload. Only the Navbar and Back-to-Top button (static/shell components) are visible.

- **Root Cause**: Above-the-fold content is wrapped in Motion components with `initial="hidden"`. The transition to `animate="visible"` depends on hydration and the resolution of the `useReducedMotion` hook. On mobile, the thread is blocked during "theme flip" re-styling, stalling the animation trigger and leaving the site in a blank (opacity: 0) state.

### Bug 2: Hero Layout Inefficiency

The Hero section headline is pushed below the fold on standard mobile viewports (e.g., iPhone SE/14).

- **Root Cause**: The section uses `min-h-screen` flex-centering combined with a fixed `pt-16`. The padding pushes the centered content into the bottom third of the viewport.

---

## 2. Technical Goals

- **Zero-Wait Content**: Above-the-fold content (Hero) must be visible immediately via SSR/Hydration without waiting for JS-driven animation variants.
- **Stable Theme State**: Synchronize `ThemeProvider` and the blocking `head` script to avoid redundant re-renders.
- **Mobile-First Fold**: Ensure the main headline is visible within the top 50% of the mobile viewport.

---

## 3. Architecture & Proposed Changes

### A. Motion Hydration Strategy (`HeroSection`)

- **Change**: Set `initial={false}` for the primary `HeroSection` motion container.
- **Effect**: This prevents Framer Motion from resetting the opacity to 0 on mount. The element renders its `animate` (visible) state immediately upon hydration, ensuring LCP is not blocked.
- **Progressive Enhancement**: Staggered child animations will still be defined via variants to allow for graceful entrance if triggered post-hydration, but the initial state will be "visible" to bypass the 10s blank screen trap.

### B. `SectionReveal` Interaction & Fallback

- **Change**: Implement a concrete fallback mechanism for scroll reveals.
- **Logic**: If the `IntersectionObserver` callback (via `whileInView`) has not fired within **2 seconds** of the component mounting, the section must automatically default to its `visible` state. This prevents content from being permanently "trapped" at 0 opacity due to hydration stalls or observer failure.

### C. Hero Layout Refactoring (`hero-section.tsx`)

- **Change**: Switch from `min-h-screen` to `min-h-[100dvh]` to better handle mobile toolbars.
- **Change**: Reduce `pt-16` to `pt-12` (mobile-adjusted) and pull the headline upward into the top half of the viewport.

---

## 4. Performance & A11y

- **Performance**: Reducing the hydration-blocked period significantly improves TTI and LCP.
- **A11y**: Preserving `prefers-reduced-motion` support is mandatory.

---

## 5. Verification Plan

### Full Stack Verification

Every task implementation must pass the full suite:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. `npm run format:check`

### Manual (Adversarial QA)

- **Device**: Simulated Mobile (320px, 375px) in Browser Tool.
- **Condition**: Throttled CPU or immediate reload in Light Theme.
- **Success Criteria**: Headline visible < 200ms after shell appears.
- **Layout**: Headline top edge must be at `y < 300px` on mobile.
- **Fallback**: Simulate high main-thread load; verify `SectionReveal` sections appear after 2 seconds even if not "in view" or if observer stalls.

---

## 6. Sprint Plan

1.  **Modify `HeroSection`**: Implement `initial={false}` and layout adjustments.
2.  **Audit `SectionReveal`**: Update visibility strategy for below-the-fold sections with 2s fallback.
3.  **Refine `ThemeProvider`**: Ensure state transitions are silent if the theme already matches the DOM class.
4.  **Final Verification**: Run the full stack and verify live URL behavior.
