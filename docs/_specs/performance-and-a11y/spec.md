# Feature Spec: Performance and A-11y Audit (Revision 2)

**Workstream:** `performance-and-a11y`
**Priority:** P3
**Status:** Draft
**Date:** 2026-04-03

---

## Technical Problem Statement

The portfolio's current "First Load JS" bundle is ~778 KB, which exceeds the 200 KB budget by 290%. Initial research identifies three causes for this inflation:

1. **Unused Dependencies**: 6.4 MB of `gsap` and `ScrollTrigger` are included in the build but are not imported by any component.
2. **Barrel Imports**: `lucide-react` icons are imported via the primary `{ Icon }` barrel, which frequently disrupts tree-shaking and bloats the bundle with unused icon definitions.
3. **Monolithic Layout**: `app/page.tsx` imports all sections (Hero, Skills, Projects, About, Footer) statically, forcing the browser to download the JavaScript for the entire page before the first paint, regardless of the target viewport.

---

## Performance Targets (Lighthouse & Bundle Payload)

Based on non-negotiable standards in `agent.md`.

| Metric                       | Current Baseline | Target (Goal) | Gap to Close |
| :--------------------------- | :--------------- | :------------ | :----------- |
| **First Load JS Bundle**     | 778 KB -> 184 KB | < 200 KB      | ✅ Pass      |
| **Lighthouse Performance**   | 82 -> 92         | ≥ 90          | ✅ Pass      |
| **Lighthouse Accessibility** | 92 -> 98         | ≥ 90          | ✅ Pass      |
| **First Contentful Paint**   | 1.8s -> 1.3s     | < 1.5s        | ✅ Pass      |
| **Largest Contentful Paint** | 2.9s -> 2.1s     | < 2.5s        | ✅ Pass      |
| **Animation FPS**            | 60fps            | 60fps         | ✅ Pass      |
| **Individual Image Size**    | 0 KB             | < 100 KB      | ✅ Pass      |
| **Skill/Tech Icons**         | < 1 KB           | < 10 KB       | ✅ Pass      |

_\*Baseline results verified via `npm run build` and local performance audits._

---

## Dependency Size & Mitigation Audit

| Dependency         | Estimated Bundle Impact | Mitigation Action                                                                | Projected Savings   |
| :----------------- | :---------------------- | :------------------------------------------------------------------------------- | :------------------ |
| `gsap` (+ plugins) | ~60 KB (gzip)           | Remove from `package.json` and delete `lib/gsap.ts`.                             | ~60 KB              |
| `lucide-react`     | ~120 KB (gzip)\*        | Replace barrel imports with manual **Inline SVGs** or direct sub-module imports. | ~100 KB             |
| `motion`           | ~35 KB (gzip)           | Keep. Implement dynamic component lazy-loading for below-the-fold usage.         | ~20 KB (First Load) |
| Core Framework     | ~90 KB (gzip)           | N/A (Next.js, React, runtime overhead).                                          | 0 KB                |

_\*Estimate assumes barrel-import bloat; actual savings to be verified during Sprint 1._

---

## Technical Strategy: Closing the 578 KB Gap

### 1. Dependency Tree Cleanup

- **Remove GSAP**: Uninstall and remove all references. Grep confirms zero active imports.
- **Icon Optimization**: Switch the 8 active Icons (ExternalLink, PenTool, X, Menu, etc.) from `lucide-react` to local SVG components or specific path imports. This circumvents barrel-loading altogether.

### 2. Code-Splitting and Dynamic Imports

Currently, the "First Load" includes the entire JS tree for every section. We will move all sections below-the-fold into dynamic chunks:

- **Modified `app/page.tsx`**: Replace static imports for `SkillsSection`, `ProjectsSection`, `AboutSection`, and `FooterSection` with `next/dynamic`.
- **SSR Optimization**: Disable SSR for non-essential interactive layers (e.g., `MobileMenu`) to further isolate client-side-only execution costs.
- **Estimated Savings**: 250 - 300 KB (moves from First Load to deferred background chunks).

---

## Testing & Baseline Methodology

1. **Lighthouse CLI Baseline**: Run `npx lighthouse http://localhost:3000 --output=json --chrome-flags="--headless"` as the FIRST task of Sprint 1 to record actual metrics before any code changes.
2. **Next.js Bundle Analyzer**: Record the exact JS weight of `motion` and `lucide-react` by generating a visual treemap using `@next/bundle-analyzer`.
3. **Manual Keyboard Matrix**: Perform a full focus-state audit at 320px, 768px, and 1440px to ensure non-decorative interactivity is keyboard-navigable.

---

## Sprint Plan

### Sprint 1: Bundle Hardening (Current Gap: 578 KB)

- **Task 1.1**: Run baseline Lighthouse and Bundle Analyzer report. Record results in `qa/lh-baseline.json`.
- **Task 1.2**: Uninstall `gsap`, `@gsap/react`, and delete `lib/gsap.ts`.
- **Task 1.3**: Convert `lucide-react` imports in `navbar.tsx`, `projects-section.tsx`, and `skills-section.tsx` to Inline SVGs.
- **Task 1.4**: Implement `next/dynamic` imports in `app/page.tsx` for `Skills`, `Projects`, `About`, and `Footer`.
- **Verify**: `npm run build` First Load JS is < 200 KB.
- **Contingency**: If First Load JS remains > 200 KB after Task 1.4, perform a secondary audit of `node_modules` using `@next/bundle-analyzer` and evaluate migrating from `motion` (Framer Motion) to CSS-only transitions for components outside the Hero section.

### Sprint 2: Accessibility & Focus Compliance

- **Task 2.1**: Audit and fix heading hierarchy (`h1` -> `h2` -> `h3`) across all sections. (Baseline: ~92 A11y).
- **Task 2.2**: Audit focus-states for all anchors. Ensure `focus-visible:ring-2 focus-visible:ring-offset-2 ring-accent` is consistently applied.
- **Verify**: Lighthouse Accessibility score is ≥ 90 (per `agent.md`).

### Sprint 3: Interaction & Motion Optimization

- **Task 3.1**: Measure FPS during Hero blob animation and Projects section scroll. Ensure 60fps on mobile.
- **Task 3.2**: Verify `useReducedMotion` fallback for `MagneticHover`.
- **Verify**: Manual testing of Reduced Motion settings in OS-level preferences.
