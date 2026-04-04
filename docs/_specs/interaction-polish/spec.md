# Feature Spec: Interaction Polish

**Workstream:** `interaction-polish`
**Priority:** P2
**Status:** Draft
**Date:** 2026-04-03

---

## Problem Statement

While the portfolio foundation is technically robust, it requires a layer of tactical interaction to signify "completion" and professional polish. Specifically:

1. **Interactive Presence**: The portfolio should communicate active development status to visitors.
2. **Tactile Projects**: Project cards lack physical feedback, making the "Case Studies" feel static.
3. **Navigation Utility**: Long-scroll exploration of case studies necessitates a quick return path to the navigation layer.

---

## Design Goals

1. **Subtle Tactility**: Hover effects must feel "magnetic" and reactive without being loud or distracting.
2. **Clear Availability**: Direct status communication using established industry patterns (green "Available" or "Building" dot).
3. **Zero Dependencies**: Leverage existing Motion (@motion/react) primitives to maintain the < 200 KB performance budget. No GSAP.
4. **Editorial Pacing**: All reveals and transitions must follow the established spring-physics tokens.

---

## Architecture

### Component Targets

| Component               | Change                                                                        | Implementation          |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------- |
| `ProjectCard`           | Implement subtle lift (`y: -4`) and border-glow on hover.                     | `whileHover`            |
| `StatusIndicator` (NEW) | Pulse animation (green dot) + "Building AI-powered tools at YU & Associates". | `Navbar` / `MobileMenu` |
| `BackToTop` (NEW)       | Floating action button (FAB) targeting the scroll threshold (> 400px).        | `layout.tsx`            |

### Integration Strategy

- **Status Indicator (Desktop)**: Injected into the `Navbar` component, beside the developer's name/logo.
- **Status Indicator (Mobile)**: Specifically placed **inside the Mobile Menu panel** to avoid overcrowding the 320px header. It will appear at the bottom of the navigation list.
- **Hover Physics**: Standardize on `stiffness: 300, damping: 30` (snap) for tactile responses.
- **Back-to-Top**: Managed via `AnimatePresence` and `useScroll` to ensure smooth entry/exit. Positioned at **bottom-right**.

---

## Accessibility Requirements (AA)

- **Reduced Motion**: All hover lifts and pulsing dots must cease animation if `prefers-reduced-motion` is active.
- **Contrast**: The green status dot must maintain WCAG AA contrast against both Champagne Ivory and Dark surfaces.
- **Interactive Role**: The Back-to-Top button must be an actual `<button>` element with an `aria-label="Back to top"`.

---

## Performance Budget

| Metric      | Target   | Note                                                                 |
| ----------- | -------- | -------------------------------------------------------------------- |
| FPS         | 60       | Motion animations are GPU-accelerated.                               |
| Bundle Size | +0 KB JS | Zero new dependencies. Logic is strictly additive in existing files. |

---

## Testing Strategy

1. **Visibility Logic**: Verify Back-to-Top button only appears after the defined scroll threshold.
2. **Hover Consistency**: Ensure the "border glow" on cards works in both Light (Champagne) and Dark modes.
3. **Keyboard Nav**: Verify the Back-to-Top button is reachable and functional via the Tab key.

---

## Sprint Plan

### Sprint 1: Interaction Layer

- Create `StatusIndicator` and `BackToTop` components.
- Enhance `ProjectCard` with Motion lift/glow logic.
- Verify 5-part verification stack (Typecheck, Lint, Test, Format, Build).
