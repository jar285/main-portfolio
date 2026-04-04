# Site Foundation — Spec QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec reviewed:** `docs/_specs/site-foundation/spec.md`
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
- [x] Sprint plan is present with discrete tasks
- [x] Future considerations documented
- [x] No `any` types referenced or implied
- [x] No hardcoded color values referenced
- [x] Dependency list matches `agent.md` tooling baseline

---

## Findings

No blocking issues found.

---

## Observations

1. **Aceternity UI omission is correct but worth noting.** The spec
   explicitly defers Aceternity UI to later workstreams. This is the
   right call — installing it now would be scope drift. However, the
   `design-system` spec should note that Aceternity adapter components
   need to be planned.

2. **CVA is listed as a dependency but has no usage in this sprint.**
   This is acceptable — it's a lightweight dependency (< 5 KB) that
   future workstreams need. The Factory pattern note in the spec
   correctly identifies it as "installed and ready." Worth watching
   that it doesn't become dead weight if the design system takes a
   different approach to variants.

3. **Bundle size threshold of 150 KB for scaffold is generous.** A
   Next.js App Router static export with Motion + GSAP stubs should
   land well under 100 KB. The 150 KB investigation threshold may
   never trigger. Consider whether the `design-system` workstream
   should set a tighter intermediate budget.

4. **`@gsap/react` listed as a dependency.** GSAP's React integration
   package provides `useGSAP` hook. This is the correct approach for
   React 19 cleanup vs raw `useEffect` + GSAP. Good call.

5. **Single smoke test is minimal but appropriate.** For a scaffold
   sprint, one passing test that proves the pipeline works is the
   right scope. Component-specific tests belong in their respective
   workstreams per `agent.md` rules.

6. **ESLint v9 flat config may have plugin compatibility friction.**
   Not all ESLint plugins have migrated to flat config. The sprint
   implementation should verify that `eslint-config-prettier` works
   correctly with flat config syntax. If not, the sprint doc should
   document the workaround.

7. **`next/font` specified for font loading.** Good — this prevents
   FOUT and CLS. The actual font choices are deferred to the
   `design-system` workstream, so this sprint should use a placeholder
   font via `next/font/google` that will be replaced later.

---

## Verdict

**PASS**

The spec is complete, well-structured, and aligned with `agent.md`
requirements. All design goals are verifiable. The dependency list
is justified. The sprint plan has sufficient granularity for
implementation. Proceed to sprint doc.
