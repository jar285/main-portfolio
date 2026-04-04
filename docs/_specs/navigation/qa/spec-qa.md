# Navigation — Spec QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec reviewed:** `docs/_specs/navigation/spec.md`
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

1. **`MobileMenuProps.activeSection` is a string, but `navLinks[].href`
   includes the `#` prefix.** The IntersectionObserver will need to
   resolve section IDs (e.g., `"skills"`) to match against
   `navLinks[].href` values (e.g., `"#skills"`). The sprint doc should
   clarify the comparison logic — either strip the `#` from `href` or
   prepend `#` to the observed section ID.

2. **Focus trap described as "light."** The spec says "Tab cycles through
   menu items" when the mobile menu is open but doesn't specify a full
   focus trap (preventing Tab from escaping the menu entirely). A full
   focus trap typically requires a library like `focus-trap-react` or
   manual implementation. The "light" approach — closing the menu on
   outside interaction — is pragmatic for a portfolio and avoids a new
   dependency. The sprint doc should explicitly state which approach is
   taken and why.

3. **Transparent-to-opaque scroll threshold not specified.** The spec
   says the navbar gains a background "on scroll" but doesn't define the
   pixel threshold. A value like 50px or 100px should be decided in the
   sprint doc. Too low and it flickers on small scroll movements; too
   high and content overlaps the transparent navbar.

4. **No "Home" section ID exists on the page.** The `navLinks` array
   includes `{ label: "Home", href: "#home" }`. The current `page.tsx`
   doesn't have an element with `id="home"`. The sprint doc should
   address this — either the main content wrapper gets `id="home"` or
   the Home link scrolls to top (which is a different behavior than
   anchor navigation).

5. **`IntersectionObserver` depends on section IDs that don't exist yet.**
   The Skills, Projects, and About sections will be created in later
   workstreams. The spec correctly notes in Future Considerations that
   "the IntersectionObserver will automatically track them." But during
   this sprint, only `#home` (if added) will be observable. The active
   section tracking should gracefully handle having only one observable
   section — defaulting to "Home" when no other section is intersecting.

6. **`MobileMenu` as a separate file is good separation.** The menu
   has its own animation logic and state concerns. Keeping it separate
   from `navbar.tsx` follows SRP and keeps file sizes manageable.

7. **No body scroll lock when mobile menu is open.** When the mobile
   menu overlay is open, the user could still scroll the background
   page. The sprint doc should decide whether to lock body scroll
   (via `overflow: hidden` on body) when the menu is open. For a
   single-page portfolio, this is a minor concern, but it affects the
   feel of the interaction.

8. **Skip-to-content is a server component — correct.** It has no
   interactivity, no state, no event handlers. It's pure HTML/CSS.
   Keeping it as a server component avoids unnecessary JS.

---

## Verdict

**PASS**

The spec is well-structured and covers all requirements from `agent.md`.
Component architecture is clean, design patterns are justified, and
accessibility is comprehensive. Observations 1 (href matching), 3
(scroll threshold), 4 (Home section ID), and 7 (body scroll lock) should
be addressed in the sprint doc. Proceed.
