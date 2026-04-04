# Performance and A-11y Spec — QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec:** `docs/_specs/performance-and-a11y/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Status

**PASS**

The spec is technically sound and provides a verifiable roadmap to close the ~578 KB bundle gap. It identifies exactly where the current bloat originates (unused GSAP, barrel imports, monolithic page structure) and proposes actionable mitigations (dynamic imports, SVGs).

---

## Checklist

- [x] Problem statement present and clear
- [x] Design goals defined
- [x] Architecture documented (component tree, files)
- [x] Design patterns identified and justified (Adapter for Reduced Motion)
- [x] Accessibility requirements listed (Heading hierarchy, focus rings)
- [x] Performance budget with measurable targets (Lighthouse ≥ 90, Bundle < 200 KB)
- [x] Testing strategy defined (Lighthouse CLI, Bundle Analyzer)
- [x] Sprint plan present with discrete tasks
- [x] No filler language or adverbs

---

## Observations & Issues Caught

1. **Lighthouse CLI Reliability**: The environment used for the baseline audit (Next.js 16 + Turbopack) can sometimes cause Lighthouse CLI Puppeteer timeouts. If Task 1.1 fails, the fallback must be a manual Lighthouse report via the `browser_subagent` or developer browser tools to ensure we record the baseline as the absolute first entry.
2. **Dynamic Load-States and CLS**: While the spec proposes `next/dynamic` for background sections, it does not specify a `loading` component. To prevent **Cumulative Layout Shift (CLS)** during hydration, we should implement a lightweight `<SectionSkeleton />` for each dynamically-imported component that preserves the vertical height of the section header. This will protect the "100/100" Best Practices category in Lighthouse.
3. **SVG File Location**: If we extract icons from `lucide-react` into Inline SVGs, we should create a central icons registry (e.g., `components/ui/icons/` or similar) to prevent duplicating SVG paths across multiple section files.
4. **Agent.md Synchronization**: The spec identifies `lucide-react` as a 38MiB dependency. This is its _source_ size on disk. The actual _minified_ bundle contribution must be the primary metric used in the Sprint 1 report to ensure we are tracking valid browser-shipping costs.

---

## Verdict

**PASS**

The spec addresses the technical debt from earlier phases and aligns perfectly with the current project architecture. Proceed to Phase 3 (Write Sprint Doc) after user review.
