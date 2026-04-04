# Sprint 1: Navbar — Sprint Doc QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Sprint doc:** `docs/_specs/navigation/sprints/sprint-1-navbar.md`
**Governing spec:** `docs/_specs/navigation/spec.md`
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

1. **Existing smoke test depends on text content, not HTML tag.** The
   sprint doc notes concern about changing `<main>` to `<section>` in
   `page.tsx`. Reviewing `__tests__/smoke.test.tsx`, the test uses
   `getByText` and `getByRole("heading")` — neither depends on the
   `<main>` element. However, after the layout change, the `Home`
   component will render inside a `<main>` from `layout.tsx`, so the
   DOM structure is still semantically correct. No test update needed.

2. **IntersectionObserver in tests.** The Navbar component uses
   `IntersectionObserver` which is not available in jsdom. The test
   file should mock `IntersectionObserver` globally in the test setup
   or within the test file itself to prevent runtime errors. The sprint
   doc's test list doesn't mention this — implementation should add a
   mock.

3. **`scroll` event in tests.** Similarly, the scroll-aware background
   logic uses `window.scrollY` which defaults to 0 in jsdom. The tests
   don't need to test scroll behavior directly (that's a visual/e2e
   concern), but the component should not throw during render in a
   test environment. The `typeof window !== "undefined"` guard in the
   scroll listener should suffice.

4. **Task 4 layout change introduces `<main>` at layout level.** This
   is correct — `<main>` should be in the layout, not repeated in each
   page. But the `id="main-content"` on `<main>` means only one `<main>`
   per page (which is the HTML spec anyway). Good.

5. **Body scroll lock cleanup.** The sprint doc specifies cleanup on
   close and on unmount. Implementation should use a `useEffect` return
   function to guarantee cleanup even if the component unmounts while
   the menu is open (e.g., during navigation). This is a reliability
   concern, not a blocker.

6. **Mobile menu animation variants are well-chosen.** Using `staggerFast`
   for the container and `fadeUp` for children creates a natural reveal
   pattern that matches the design system's editorial pacing. The full
   overlay approach (rather than a slide-from-side drawer) is appropriate
   for a portfolio — it gives the menu presence and avoids partial-state
   visual complexity.

7. **`components/layout/.gitkeep` deletion is listed.** Good — cleanup
   of placeholder files when they're replaced by real content keeps the
   repo clean.

8. **Five test cases cover the essentials.** Smoke render, link presence,
   developer name, skip-to-content, and toggle aria state. These match
   `agent.md` testing rules (smoke render minimum + interaction tests
   for toggles). More detailed interaction tests (Escape key, focus
   management) would be valuable but are acceptable as future additions
   in the `performance-and-a11y` workstream.

---

## Verdict

**PASS**

The sprint doc is specific, actionable, and well-scoped. All eight tasks
have clear actions and verify steps. Design decisions from spec QA are
documented. The IntersectionObserver mock (observation #2) should be
handled during implementation. Proceed.
