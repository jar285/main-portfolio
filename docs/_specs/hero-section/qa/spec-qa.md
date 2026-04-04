# Hero Section — Spec QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec reviewed:** `docs/_specs/hero-section/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Checklist

- [x] Problem statement is clear and specific
- [x] Design goals are measurable or verifiable
- [x] Architecture section defines components, tokens, data flow
- [x] Applicable design patterns are identified with justification
- [x] Accessibility requirements are stated
- [x] Performance budget includes measurable targets
- [x] Testing strategy is defined
- [x] Sprint plan is present
- [x] Future considerations documented
- [x] No `any` types referenced or implied
- [x] No hardcoded color values referenced
- [x] Dependencies match `agent.md` tooling baseline

---

## Findings

No blocking issues found.

---

## Observations

1. **`siteConfig` lacks a `subtitle` or `tagline` field.** The hero
   needs a one-line value statement beyond name and role. The current
   `siteConfig` has `name`, `description`, `role`, and `graduation`.
   The `description` is long and metadata-oriented, not a punchy hero
   subtitle. The sprint doc should decide whether to: (a) add a
   `tagline` field to `siteConfig`, or (b) hardcode a short subtitle
   string in the hero component. Option (a) is cleaner and follows the
   Singleton pattern for content. The change to `lib/constants.ts` is
   minimal and within scope since the hero component needs it.

2. **"View Resume" CTA links to `#` placeholder.** The spec acknowledges
   this in Future Considerations. The sprint doc should ensure the
   placeholder link is visually indistinguishable from a real link —
   no broken UX. Using `href="#"` or `href="/resume.pdf"` (non-existent
   file) would both work. `href="#"` is simpler and won't cause a 404
   during static export.

3. **Background glow via CSS pseudo-element vs div.** The spec suggests
   either approach. The sprint doc should pick one. A positioned `div`
   is more testable and debuggable than a `::before` pseudo-element.
   However, a pseudo-element keeps the DOM cleaner. For a static glow,
   either works. Recommendation: use a positioned `div` with
   `aria-hidden="true"` so it's explicit and inspectable.

4. **Navbar overlap.** The hero fills `min-h-screen` with content
   centered. The fixed navbar (h-16, 4rem) overlaps the top of the
   hero. The spec mentions "accounting for the fixed navbar height" but
   doesn't specify how. The sprint doc should add `pt-16` (or
   equivalent) to the hero section to prevent content from being hidden
   under the navbar.

5. **`components/sections/.gitkeep` exists.** The sprint doc should
   delete this placeholder when creating the real hero component file,
   similar to how the navigation sprint deleted
   `components/layout/.gitkeep`.

6. **Two CTA buttons — primary and secondary.** The spec defines
   "View Projects" (primary, links to `#projects`) and "View Resume"
   (secondary, outline style). The sprint doc should define exact
   Tailwind classes for both button styles. Since this is the first
   button pattern in the project, it establishes the button style
   convention for all future workstreams.

7. **`id="home"` moves from page.tsx to hero-section.tsx.** Currently
   `page.tsx` has `<section id="home">`. When the hero component
   replaces this content, the `id="home"` must be on the hero's root
   element so the navbar's IntersectionObserver and `#home` anchor
   continue working. The sprint doc should explicitly state this.

8. **No GSAP in the hero — correct.** The spec correctly identifies
   that Motion handles the hero's declarative entrance animations.
   GSAP would be over-engineering since there are no scroll triggers,
   timelines, or multi-element sequences in the hero.

---

## Verdict

**PASS**

The spec is focused, well-justified by `agent.md` principles, and
correctly scoped. Observations 1 (tagline field), 4 (navbar overlap),
5 (.gitkeep cleanup), and 7 (id="home" placement) should be addressed
in the sprint doc. Proceed.
