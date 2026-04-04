# Projects Section — Spec QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec:** `docs/_specs/projects-section/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Checklist

- [x] Problem statement present and clear
- [x] Design goals defined (7 goals)
- [x] Architecture documented (component tree, files, data flow)
- [x] Design patterns identified and justified (4 patterns)
- [x] Accessibility requirements listed
- [x] Performance budget with measurable targets
- [x] Testing strategy defined (6 tests)
- [x] Sprint plan present
- [x] Future considerations documented

---

## Findings

No blocking issues.

---

## Observations

1. **`figmaUrl` adds interface bloat — use `liveUrl` instead.** The spec
   proposes adding `figmaUrl?: string` to the `Project` interface. This
   is narrow — if future projects have a demo video, docs site, or other
   link type, we'd keep adding fields. Recommendation: use `liveUrl` for
   the Figma link (it IS a URL to a live artifact). Change the link
   label/icon based on the URL domain or add a `linkLabel?: string`
   override field. Simpler: just keep the interface unchanged and use
   `liveUrl` for any primary external link.

2. **Figma icon substitute not finalized.** The spec says "use `Pen` or
   `PenTool`" or a text label. The sprint doc should pick one. Verify
   the chosen icon exists in `lucide-react`. `PenTool` is likely the
   better choice (it resembles a design pen).

3. **Card layout diagram omits image area.** The `image` field exists in
   the interface but the Sprint 1 card layout has no image region. This
   is acceptable for Sprint 1 (placeholder gradient deferred), but the
   spec should explicitly state that the `image` field is unused in
   Sprint 1. Currently it says "placeholder gradient" in the interface
   section but the card layout shows no visual area for it.

4. **Project order rationale.** Campus Companion (Figma-only) is listed
   first. A production full-stack app (BlogTalk) or an open-source tool
   (MCP Discord) might be a stronger lead for a developer portfolio.
   Recommendation: order by technical depth — BlogTalk → MCP Discord →
   AI Toolkit → Campus Companion. The sprint doc should finalize order.

5. **Section heading text implicit.** The testing strategy references
   "Featured Projects" but this text isn't stated in the design goals or
   card layout section. The sprint doc should explicitly declare the
   heading text.

6. **Missing `section-container` and `section-padding` mention.** The
   skills section QA caught this same gap. The projects section must use
   these utility classes for consistent spacing. The sprint doc should
   mandate their use.

7. **`liveUrl` values need full URLs.** The spec mentions
   "blogtalk-phi.vercel.app" without the `https://` scheme. All URLs in
   the data must be fully qualified.

8. **Outcome text could be stronger.** Content rule #1 says "measurable
   outcome or learning." The Campus Companion outcome ("End-to-end UX
   design") is vague compared to BlogTalk's ("Production blog with
   custom analytics pipeline"). The sprint doc should sharpen outcomes
   where possible.

9. **Grid responsive breakpoint unspecified.** The spec says "1 col
   mobile, 2 col desktop" without specifying the breakpoint. Use
   `grid-cols-1 md:grid-cols-2` for consistency with the responsive
   system (768px breakpoint).

10. **Link `aria-label` format unspecified.** The spec mentions
    `aria-label` for links but doesn't define the pattern. Use
    consistent format: `"View {title} on GitHub"`, `"View {title} live
site"`, `"View {title} design"`.

---

## Verdict

**PASS**

The spec covers all required sections with clear architecture and data
flow. No blocking issues. Observations 1, 4, 5, 6, and 9 should be
resolved in the sprint doc. The existing `Project` interface can be
preserved as-is by using `liveUrl` for any primary external link.
Proceed to sprint doc.
