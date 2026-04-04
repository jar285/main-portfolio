# Site Foundation — Feature Spec

**Workstream:** `site-foundation`
**Priority:** P0
**Author:** AI Agent (governed by `agent.md` v1.0.0)
**Date:** 2026-04-03
**Status:** Draft

---

## Problem Statement

The portfolio has no codebase. Before any visual work can begin, the
project needs a fully configured Next.js scaffold with strict TypeScript,
a styling pipeline, a testing pipeline, a linting/formatting pipeline,
and a directory structure that supports the remaining nine workstreams.

The previous build suffered from configuration drift and inconsistent
tooling. This foundation must be correct from day one so that every
subsequent workstream inherits a verified, passing baseline.

---

## Design Goals

1. **Zero-configuration start for future workstreams.** Any agent or
   developer picking up a workstream after this one should be able to
   clone, install, and run all five verification commands without errors.

2. **Strict type safety from the start.** TypeScript strict mode with no
   `any` types prevents the type erosion that plagued the previous build.

3. **Consistent code quality pipeline.** ESLint v9 flat config + Prettier
   integrated so that `lint` and `format:check` catch issues before they
   reach implementation QA.

4. **Test infrastructure ready.** Vitest + React Testing Library configured
   with at least one passing smoke test, proving the pipeline works.

5. **Design-system-ready configuration.** Tailwind config structured for
   token extension in the `design-system` workstream. shadcn/ui initialized
   so primitives are available immediately.

6. **Animation libraries installed.** Motion (Framer Motion) and GSAP +
   ScrollTrigger available as dependencies with utility modules stubbed.

---

## Architecture

### Directory Structure

```
app/
  layout.tsx          # Root layout — html, body, font providers
  page.tsx            # Home page — imports section components
  globals.css         # Tailwind directives + CSS custom properties
components/
  layout/             # Navbar, Footer (created in later workstreams)
  sections/           # Hero, Skills, Projects, About (later workstreams)
  ui/                 # shadcn/ui primitives + custom UI components
lib/
  utils.ts            # cn() utility (clsx + tailwind-merge)
  motion.ts           # Motion animation primitive exports (stubs)
  gsap.ts             # GSAP utility wrappers (stubs)
  constants.ts        # Site metadata, nav links, social links
  skills-data.ts      # Typed skill data (stub with type definitions)
  projects-data.ts    # Typed project data (stub with type definitions)
docs/
  _specs/
    README.md         # Workstream status index
  _changes/           # Persisted Change Notes
public/
  skills/             # Optimized SVG skill icons (populated later)
  projects/           # Project screenshots/visuals (populated later)
```

**Rationale:**

- `app/` uses Next.js App Router conventions. `layout.tsx` owns the
  HTML shell and font loading. `page.tsx` is the single-page entry point.
- `components/` separates concerns into three tiers: `layout/` for
  structural chrome, `sections/` for page-level content blocks, `ui/`
  for reusable primitives. This matches the Composite pattern (GoF) —
  sections compose UI primitives, layout composes sections.
- `lib/` isolates utilities, configuration, and data from components.
  This supports the Singleton pattern (GoF) — shared configuration
  (constants, tokens) is defined once and imported everywhere.
- `docs/` keeps planning artifacts out of source code directories.
- `public/` holds static assets organized by content type.

### Key Configuration Files

| File                 | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `tsconfig.json`      | TypeScript strict mode, path aliases           |
| `tailwind.config.ts` | Tailwind v3 config, prepared for design tokens |
| `postcss.config.mjs` | PostCSS with Tailwind + autoprefixer           |
| `eslint.config.mjs`  | ESLint v9 flat config                          |
| `.prettierrc`        | Prettier configuration                         |
| `.prettierignore`    | Files excluded from Prettier                   |
| `vitest.config.ts`   | Vitest configuration with React support        |
| `next.config.ts`     | Next.js config — static export enabled         |
| `components.json`    | shadcn/ui configuration                        |

---

## Dependency Justification

Every dependency solves a specific, documented problem:

| Dependency                  | Problem It Solves                                                        |
| --------------------------- | ------------------------------------------------------------------------ |
| `next` (v16)                | SSG framework with App Router, file-based routing, React 19 support      |
| `react` / `react-dom`       | UI rendering library (required by Next.js)                               |
| `typescript`                | Static type checking — prevents type erosion                             |
| `tailwindcss`               | Utility-first CSS — token-driven styling without CSS files per component |
| `postcss` + `autoprefixer`  | CSS processing pipeline required by Tailwind                             |
| `clsx`                      | Conditional class string composition                                     |
| `tailwind-merge`            | Intelligent Tailwind class deduplication                                 |
| `motion` (Framer Motion)    | Declarative React animations, layout, gestures                           |
| `gsap` + `@gsap/react`      | Scroll-driven sequences, complex timelines, frame-precise control        |
| `@radix-ui/*` (via shadcn)  | Accessible, unstyled UI primitives                                       |
| `class-variance-authority`  | Component variant definitions (Factory pattern)                          |
| `lucide-react`              | Icon library (used by shadcn/ui components)                              |
| `eslint` (v9)               | Code quality enforcement via flat config                                 |
| `prettier`                  | Consistent formatting across all files                                   |
| `eslint-config-prettier`    | Disables ESLint rules that conflict with Prettier                        |
| `vitest`                    | Fast, modern test runner with native ESM support                         |
| `@testing-library/react`    | Component interaction testing                                            |
| `@testing-library/jest-dom` | DOM assertion matchers                                                   |
| `@vitejs/plugin-react`      | React support in Vitest (JSX transform)                                  |
| `jsdom`                     | DOM environment for component tests                                      |

---

## Applicable Design Patterns

Referenced from `agent.md` pattern table:

| Pattern   | Application in This Workstream                        |
| --------- | ----------------------------------------------------- |
| Singleton | `lib/constants.ts` — single source for site metadata, |
|           | nav links, social links. Imported, never duplicated.  |
| Composite | Directory structure — sections compose UI primitives, |
|           | layout composes sections. Established by folder       |
|           | conventions even before components are built.         |
| Factory   | CVA installed and ready for component variant         |
|           | creation in future workstreams.                       |
| Strategy  | `lib/motion.ts` and `lib/gsap.ts` — animation         |
|           | utilities separated by strategy. Components choose    |
|           | the appropriate animation system per complexity.      |

---

## Accessibility Baseline

This workstream establishes the structural accessibility foundation:

- Root `<html>` element has `lang="en"`
- Proper `<head>` metadata via Next.js `metadata` export
- `globals.css` includes base focus-visible styles
- Color scheme meta tag set for dark mode
- Font loading uses `next/font` (no layout shift from FOUT)
- No accessibility regressions from scaffold — the page must be
  navigable with keyboard from the start

Full accessibility audit is deferred to the `performance-and-a11y`
workstream, but the foundation must not create obstacles.

---

## Performance Budget

From `agent.md`:

| Metric                   | Target     |
| ------------------------ | ---------- |
| Lighthouse Perf          | ≥ 90       |
| First Contentful Paint   | < 1.5s     |
| Largest Contentful Paint | < 2.5s     |
| Total bundle JS          | < 200 KB   |
| Individual image         | < 100 KB   |
| Skill/tech icons         | < 10 KB ea |
| Animation FPS            | 60fps min  |

**Foundation-specific targets:**

- The scaffold with no content sections should produce a static export
  under 100 KB total JS (well within the 200 KB budget)
- No images in this workstream — budget applies to future workstreams
- GSAP and Motion are tree-shakeable; importing stubs should not
  significantly increase bundle size. If the build exceeds 150 KB JS
  at scaffold stage, investigate and document the cause.

---

## Testing Strategy

- **Smoke test:** One test that renders `<Home />` (the root page
  component) and asserts it mounts without crashing. This proves:
  - Vitest is configured correctly
  - React Testing Library works
  - JSX transform is functional
  - The test pipeline is operational

- **Future workstreams** will add component-specific tests per the
  rules in `agent.md` (new component → smoke test, behavior change →
  update test, bug fix → regression test).

---

## Sprint Plan

This workstream is a single sprint:

### Sprint 1: Project Scaffold

**Goal:** A fully configured, verified Next.js project that passes all
five verification commands with zero errors.

**Tasks:**

1. Initialize Next.js 16 project with App Router
2. Configure TypeScript strict mode
3. Configure Tailwind CSS v3 with token-ready config
4. Configure ESLint v9 flat config
5. Configure Prettier + ESLint integration
6. Install and configure Vitest + React Testing Library
7. Create cn() utility with clsx + tailwind-merge
8. Initialize shadcn/ui
9. Install Motion (Framer Motion) and GSAP + ScrollTrigger
10. Create project directory structure with stub files
11. Create data type definitions and stub data files
12. Write smoke test
13. Add verification scripts to package.json
14. Run all five verification commands — all must pass
15. Create docs/\_specs/README.md workstream index

---

## Future Considerations

- The `design-system` workstream (P0) will extend `tailwind.config.ts`
  with the full color token palette, typography scale, and spacing system.
  The config created here must be structured to accept those extensions
  without restructuring.

- The `navigation` workstream (P1) will be the first to create components
  in `components/layout/`. The directory structure must exist before that
  workstream begins.

- Aceternity UI components are not installed in this workstream. They
  will be added per-component in the workstreams that need them, adapted
  to local design tokens via the Adapter pattern.

- CVA is installed here but not used until components with variants are
  created in later workstreams.
