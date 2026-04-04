# Scroll and Motion Spec — QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec:** `docs/_specs/scroll-and-motion/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Status

**PASS**

The spec defines a clean, performant, and accessible motion system that aligns with the "No New Dependencies" rule. It prioritizes WCAG AA compliance through static fallbacks for reduced-motion users.

---

## Checklist

- [x] Problem statement present and clear
- [x] Design goals defined (Section reveals, Sticky nav, Hero stagger)
- [x] Architecture documented (Motion wrappers, Viewport observer)
- [x] Design patterns identified (Word-reveal stagger)
- [x] Accessibility requirements listed (Reduced motion fallbacks)
- [x] Performance budget maintained (Opacity/Transform animations only)
- [x] Testing strategy defined (Build, Lighthouse)
- [x] No filler language or adverbs ("perfectly," "smoothly")

---

## Observations & Issues Caught

1. **Word-Reveal and SEO**: The Hero headline word-by-word reveal must ensure that search robots still parse the text as a single coherent line. We will use `aria-hidden="true"` on the animated spans and include the full text in a visually hidden `h1`.
2. **Scroll-Spy Accuracy**: On hybrid devices (e.g., touch laptops), the `useScroll` calculation must account for header height and offset to ensure the Navbar indicator reflects the section at the top of the viewport rather than just "intersecting" any part of it.
3. **Viewport Threshold Consistency**: Section entrance reveals should trigger at `amount: 0.2` (20% visible) to provide immediate feedback as the user scrolls, preventing a "dead zone" at the top of long sections.
4. **Performance Safety**: The spec identifies `whileInView` for major sections. This is safe, but we must ensure each section has an `initial="hidden"` property to prevent brief flashes of unstyled content (FOUC) during hydration.

---

## Verdict

**PASS**

The spec is technically sound and adheres to all project constraints. Proceed to Phase 3 (Write Sprint Doc) after user approval.
