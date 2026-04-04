# Sprint 1: Hero Section — Sprint Doc QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Sprint doc:** `docs/_specs/hero-section/sprints/sprint-1-hero.md`
**Governing spec:** `docs/_specs/hero-section/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Checklist

- [x] Clear goal stated
- [x] Referenced spec sections listed
- [x] Available assets verified against live repo
- [x] Artifact targets listed with action verbs (Create/Modify/Delete)
- [x] Task-by-task execution guidance present
- [x] Verify step for each task
- [x] Completion checklist present
- [x] QA deviations section present

---

## Findings

No blocking issues found.

---

## Observations

1. **Inline style for radial gradient.** Task 2 specifies the glow div
   uses "inline style (CSS custom property values, not hardcoded hex)."
   This is the correct approach — Tailwind doesn't have a utility for
   arbitrary radial gradients with multiple stops. The inline style
   should reference CSS custom properties like
   `hsl(var(--accent) / 0.06)` rather than hex values. The
   implementation should be verified to ensure no hardcoded hex values
   sneak in.

2. **Smoke test update (Task 4) is necessary.** The existing smoke test
   in `__tests__/smoke.test.tsx` renders `<Home />` and checks for
   "Jesus Rosario". After the page.tsx change, `<Home />` will render
   `<HeroSection />` which is a client component using Motion. The test
   will need the `IntersectionObserver` mock (or Motion may not need it
   since it doesn't use IO). Actually — Motion's `useReducedMotion`
   uses `matchMedia`, not IntersectionObserver. The smoke test should
   still work since `matchMedia` is available in jsdom (returns false
   by default). If it doesn't, a minimal mock will be needed. The sprint
   doc correctly identifies this as a task to investigate.

3. **Button style convention established here.** This is the first time
   button styles appear in the project. The primary/secondary pattern
   defined in Design Decisions #7 will be reused across all future
   workstreams. If shadcn/ui Button component is added later, these
   styles should be migrated to CVA variants. For now, inline Tailwind
   classes on `<a>` tags are appropriate since there's no Button
   component yet.

4. **`staggerSlow` chosen over `staggerFast`.** The hero uses editorial
   pacing (0.15s stagger, 0.2s delay) which matches the design system's
   "editorial whitespace" principle. Good choice — the hero is the first
   thing visitors see, so a slower, more deliberate entrance is
   appropriate.

5. **No scroll-to behavior on CTA clicks.** The "View Projects" link
   uses `href="#projects"` which relies on native browser anchor
   scrolling. This is fine for now — smooth scroll behavior can be
   added in the `performance-and-a11y` workstream via
   `scroll-behavior: smooth` on the `html` element.

6. **`tagline` value is specific.** "Building polished web experiences
   with modern tools." is concise and professional. It can be changed
   later via a Change Note since it's in `lib/constants.ts`, not
   hardcoded in the component.

7. **Hero test file is separate from smoke test.** Good — keeps concerns
   separate. The smoke test verifies the page renders; the hero test
   verifies hero-specific content and structure.

---

## Verdict

**PASS**

The sprint doc is actionable, well-scoped, and addresses all spec QA
observations. The seven tasks have clear actions and verify steps.
Design decisions are documented. Proceed to implementation.
