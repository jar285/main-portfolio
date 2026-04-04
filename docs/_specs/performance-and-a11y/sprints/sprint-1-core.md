# Sprint 1: Bundle Reduction and A-11y Baseline

**Workstream:** `performance-and-a11y`
**Goal:** Reduce "First Load JS" from 778 KB to < 200 KB while achieving ≥ 90 Lighthouse scores.
**Status:** Draft

---

## Referenced Spec Sections

- [Baseline Metrics Table](file:///Users/Github/IS322/portfolio/docs/_specs/performance-and-a11y/spec.md#baseline-metrics-current-vs-target)
- [Dependency Audit](file:///Users/Github/IS322/portfolio/docs/_specs/performance-and-a11y/spec.md#dependency-audit--mitigation-strategy)
- [Technical Strategy](file:///Users/Github/IS322/portfolio/docs/_specs/performance-and-a11y/spec.md#technical-strategy-closing-the-578-kb-gap)

---

## Verified Assets

- [x] Baseline build log confirmed (778 KB bundle).
- [x] Dependency inventory confirmed (`gsap` unused).
- [x] Sections identified for dynamic import (`Skills`, `Projects`, `About`, `Footer`).

---

## Artifact Targets

### [DELETE] [gsap.ts](file:///Users/Github/IS322/portfolio/lib/gsap.ts)

### [MODIFY] [package.json](file:///Users/Github/IS322/portfolio/package.json)

### [MODIFY] [page.tsx](file:///Users/Github/IS322/portfolio/app/page.tsx)

### [MODIFY] [projects-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/projects-section.tsx)

### [MODIFY] [skills-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/skills-section.tsx)

### [NEW] [icons.tsx](file:///Users/Github/IS322/portfolio/components/ui/icons.tsx)

---

## Task Execution Guidance

### Task 1: Record Clean Baseline

- **Execution**: Run `npm run build`. Note the JS bundle sizes for `/`.
- **Execution**: Run local Lighthouse audit. Save `qa/lh-baseline.json`.
- **Verify**: Update the `spec.md` metrics table with confirmed baseline data.

### Task 2: Dependency Stripping

- **Execution**: `npm uninstall gsap @gsap/react`.
- **Execution**: Delete `lib/gsap.ts`.
- **Verify**: `npm run build` fails cleanly or succeeds with a slightly smaller `/` entry.

### Task 3: Section Chunking

- **Execution**: Modify `app/page.tsx`. Implement `next/dynamic` for:
  - `SkillsSection`
  - `ProjectsSection`
  - `AboutSection`
  - `FooterSection`
- **Execution**: Disable `ssr` for sections that are purely client-animated if they don't impact SEO. (Wait, `Projects` and `About` impact SEO; keep `ssr: true`).
- **Verify**: Next.js build output shows `/` page weight reduced, with new `chunks/` generated for each section.

### Task 4: Icon Registry & De-barrelling

- **Execution**: Create `components/ui/icons.tsx`. Export direct `svg` components for:
  - `ExternalLink`
  - `PenTool`
  - `X`
  - `Menu`
- **Execution**: Update `navbar.tsx`, `projects-section.tsx`, and `skills-section.tsx` to use these local components.
- **Verify**: `npm run build` shows `lucide-react` is no longer a major contributor to the initial chunk.

### Task 5: Accessibility Sweep

- **Execution**: Audit `hero-section.tsx`, `footer-section.tsx`, and `projects-section.tsx`.
- **Execution**: Ensure every `<a>` has `focus-visible:ring-2 focus-visible:ring-offset-2 ring-accent focus-visible:outline-none`.
- **Verify**: Manual keyboard-only pass (Tab key) confirms visible focus rings on all interactive elements.

---

## Completion Checklist

- [ ] Lighthouse baseline recorded.
- [ ] `gsap` removed from tree.
- [ ] Below-the-fold sections lazily loaded.
- [ ] `lucide-react` barrel-imports removed.
- [ ] First Load JS < 200 KB.
- [ ] Lighthouse A11y ≥ 90.

---

## QA Deviations

_(To be filled after implementation)_
