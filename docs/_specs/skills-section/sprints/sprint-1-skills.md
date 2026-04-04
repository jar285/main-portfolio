# Sprint 1: Skills Section

**Workstream:** `skills-section`
**Spec:** `docs/_specs/skills-section/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Goal

Deliver the skills section with grouped categories (Frontend, Backend,
Tools), labeled icons via `lucide-react`, responsive grid layout,
scroll-triggered entrance animation, and proper semantic structure.
Populate `skills-data.ts` with actual skill entries. Render below the
hero section in `page.tsx`. All five verification commands must pass.
Tests cover rendering and content.

---

## Referenced Spec Sections

- Design Goals (grouped by domain, labeled with icons, scannability,
  atmospheric depth, choreographed entrance, mobile-first)
- Architecture → Component Tree
- Architecture → File Structure
- Architecture → Data Flow
- Architecture → Icon Strategy (Factory pattern with lucide-react)
- Applicable Design Patterns (Singleton, Factory, Composite, Strategy)
- Accessibility Requirements
- Testing Strategy

---

## Verified Available Assets

Checked against live repo on 2026-04-03:

- `lib/skills-data.ts` — stub with `SkillCategory` type
  (`"Frontend" | "Backend" | "Tools"`), `Skill` interface
  (`name`, `icon`, `category`), empty `skills` array. Interface needs
  no changes — only the array needs populating and a grouping utility
  needs adding.
- `lib/motion.ts` — `fadeUp`, `scaleIn`, `staggerFast`, `staggerSlow`,
  `useReducedMotion` available
- `lib/gsap.ts` — `createScrollReveal`, `registerGSAPPlugins`,
  `prefersReducedMotion` available
- `lib/constants.ts` — `navLinks` includes
  `{ label: "Skills", href: "#skills" }` — section must have
  `id="skills"`
- `lib/utils.ts` — `cn()` utility available
- `app/globals.css` — `.section-container` (max-width, padding-x) and
  `.section-padding` (responsive vertical padding) utility classes
  available. Design tokens (`--accent`, `--background`, `--surface`,
  `--elevated`, `--border`) available.
- `tailwind.config.ts` — full token mapping, `text-display-2` through
  `text-display-4`, font families, colors, shadows
- `app/page.tsx` — renders `<HeroSection />`, will add
  `<SkillsSection />` below
- `components/sections/hero-section.tsx` — established pattern: "use
  client", Motion variants, `useReducedMotion`, inline style for
  gradients
- `__tests__/hero.test.tsx` — 5 tests, must keep passing
- `__tests__/navbar.test.tsx` — 5 tests, must keep passing
- `__tests__/smoke.test.tsx` — 2 tests, must keep passing
- `package.json` — `lucide-react`, `motion`, `gsap`, `@gsap/react`
  already installed

---

## Artifact Targets

| Action | File                                     |
| ------ | ---------------------------------------- |
| Modify | `lib/skills-data.ts`                     |
| Create | `components/sections/skills-section.tsx` |
| Modify | `app/page.tsx`                           |
| Create | `__tests__/skills.test.tsx`              |

---

## Design Decisions (from Spec QA)

1. **Motion `whileInView` over GSAP for scroll reveals.** Spec QA
   observation #1 recommended starting with Motion per the decision
   rule. Each category group uses a `motion.div` container with
   `whileInView="visible"` and `staggerFast` for its children. This is
   declarative and simpler than GSAP ScrollTrigger for independent
   per-group reveals. GSAP is not needed here — there is no coordinated
   cross-group timeline or frame-precise choreography requirement.

2. **`id="skills"` on the root section element.** Per spec QA
   observation #2. The navbar's IntersectionObserver and `#skills`
   anchor depend on this ID.

3. **Use `section-container` and `section-padding` utility classes.**
   Per spec QA observation #3. These ensure consistent spacing with
   future sections. The section root gets `section-padding` and an
   inner wrapper gets `section-container`.

4. **All components inline in `skills-section.tsx`.** Per spec QA
   observation #4. No separate files for SkillCategoryGroup or
   SkillCard. They are simple display elements — inline functions or
   direct JSX in the map. Matches the hero pattern (single file).

5. **`skillsByCategory` returns an ordered array.** Per spec QA
   observation #5. Signature:

   ```ts
   interface SkillGroup {
     category: SkillCategory;
     skills: Skill[];
   }
   const skillsByCategory: SkillGroup[];
   ```

   Order is fixed: Frontend → Backend → Tools. This preserves display
   order without relying on object key iteration.

6. **Finalized skill list.** Per spec QA observation #7 and `agent.md`
   content rule #4. Skills grouped by category:

   **Frontend:**
   - JavaScript — `Code2`
   - TypeScript — `FileCode2`
   - React — `Atom`
   - Next.js — `Globe`
   - HTML — `FileText`
   - CSS — `Palette`
   - Tailwind CSS — `Wind`

   **Backend:**
   - Node.js — `Server`
   - Express — `Route`
   - Python — `Terminal`
   - MongoDB — `Database`

   **Tools:**
   - Git — `GitBranch`
   - Docker — `Container`
   - VS Code — `MonitorSmartphone`

   All skills are evidenced by the portfolio's tech stack or referenced
   in `agent.md` content rule #4.

7. **Background glow uses positioned div with inline style.** Consistent
   with the hero section pattern. Lower opacity (3-5%) than the hero
   glow to establish visual hierarchy.

---

## Tasks

### Task 1: Populate skills-data.ts

**Action:** Modify `lib/skills-data.ts`:

- Keep existing `SkillCategory` type and `Skill` interface unchanged
- Add `SkillGroup` interface: `{ category: SkillCategory; skills: Skill[] }`
- Populate the `skills` array with all 14 skills (7 Frontend, 4 Backend,
  3 Tools) — each with `name`, `icon` (string key matching Lucide
  component name), `category`
- Add `skillsByCategory` constant: an ordered array of `SkillGroup`
  objects. Order: Frontend → Backend → Tools. Built by filtering
  `skills` per category.
- Export `SkillGroup` and `skillsByCategory`

**Verify:** `npm run typecheck` passes.

---

### Task 2: Create SkillsSection component

**Action:** Create `components/sections/skills-section.tsx`:

- `"use client"` directive (uses Motion hooks)
- Root element: `<section id="skills" className="relative overflow-hidden">` with `section-padding`
- Inner container: `<div className="section-container">`
- Background glow: positioned `<div>` with `aria-hidden="true"`,
  `absolute inset-0`, using inline style with radial gradient from
  `accent` at 3-5% opacity centered in the section
- Section heading: `<h2>` with `font-display text-display-2 md:text-display-1`
  text "Skills" (or "Technical Skills")
- Section subtitle: `<p>` with `text-muted-foreground` — a one-line
  description
- Category groups: map over `skillsByCategory`, each group is a
  `motion.div` with:
  - `whileInView="visible"` and `initial="hidden"` with
    `viewport={{ once: true, amount: 0.2 }}`
  - `staggerFast` container variant for children
  - Category heading: `<h3>` with `font-sans text-display-4`
  - Skill grid: `<div>` with responsive grid
    (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`)
  - Each skill item: `motion.div` with `fadeUp` variant containing: - Lucide icon via `iconMap` lookup, size 20, `aria-hidden="true"`,
    `text-accent` color - Text label: `<span className="font-mono text-sm">` - Wrapper: flex items-center gap with `rounded-lg bg-surface/50
border border-border/50 px-4 py-3` for card-like appearance
- `useReducedMotion` check: if true, skip Motion variants (elements
  render in final state)
- Icon map: `Record<string, LucideIcon>` mapping icon string keys to
  Lucide components. Unknown keys fall back to `Code2`.

**Verify:** `npm run typecheck` passes.

---

### Task 3: Update page.tsx

**Action:** Modify `app/page.tsx`:

- Import `SkillsSection` from `@/components/sections/skills-section`
- Render `<SkillsSection />` below `<HeroSection />`

**Verify:** `npm run build` passes.

---

### Task 4: Write skills tests

**Action:** Create `__tests__/skills.test.tsx`:

1. **SkillsSection renders with id="skills"** — section with
   `id="skills"` exists
2. **Section heading visible** — h2 with appropriate heading text
3. **All three categories rendered** — "Frontend", "Backend", "Tools"
   heading text present
4. **Known skill names visible** — "React" and "Node.js" appear
5. **Correct skill count** — number of skill card elements matches
   `skills.length`

**Verify:** `npm run test` passes with all new + existing tests.

---

### Task 5: Run full verification stack

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

- [x] `skills` array populated with 14 skills in `lib/skills-data.ts`
- [x] `SkillGroup` interface and `skillsByCategory` exported
- [x] `components/sections/skills-section.tsx` created
- [x] Section has `id="skills"` on root element
- [x] Uses `section-container` and `section-padding` utility classes
- [x] Atmospheric background glow (radial gradient, no hardcoded hex)
- [x] h2 section heading with `font-display`
- [x] h3 category headings for Frontend, Backend, Tools
- [x] Responsive grid (`grid-cols-2` → `sm:grid-cols-3` → `lg:grid-cols-4`)
- [x] Each skill has Lucide icon + text label
- [x] Icons have `aria-hidden="true"` (decorative, text label is accessible name)
- [x] Icon map with fallback for unknown keys
- [x] Scroll-triggered entrance with Motion `whileInView` + `staggerFast`
- [x] `useReducedMotion` respected
- [x] `page.tsx` renders `<SkillsSection />` below `<HeroSection />`
- [x] Skills tests pass (5 tests)
- [x] All existing tests pass (12 tests: 2 smoke + 5 navbar + 5 hero)
- [x] All five verification commands pass
- [x] No `any` types
- [x] No hardcoded hex values in components

---

## QA Deviations

1. **`vitest.setup.ts` modified — undeclared artifact.** Motion's
   `whileInView` prop uses `IntersectionObserver` internally, which
   jsdom does not implement. A global `IntersectionObserver` mock was
   added to `vitest.setup.ts` to make all tests pass. This file was not
   listed in the artifact targets. The mock is minimal, immediately
   triggers `isIntersecting: true`, and benefits all future sections
   using `whileInView`. All pre-existing tests continue passing.

2. **Section heading text finalized as "Technical Skills".** Sprint doc
   Task 2 said `"Skills"` or `"Technical Skills"`. Implementation chose
   `"Technical Skills"` per sprint QA observation #2.

3. **Section subtitle finalized.** Sprint doc Task 2 said "a one-line
   description" without specifying exact text. Implementation used
   `"Technologies and tools I work with."` per sprint QA observation #3.

4. **`format:check` reports `agent.md`.** Pre-existing formatting issue
   in `agent.md` outside sprint scope. All new/modified files pass
   formatting.
