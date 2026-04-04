# Design System — Spec QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec reviewed:** `docs/_specs/design-system/spec.md`
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
- [x] No hardcoded color values referenced in component code
- [x] Dependencies match `agent.md` tooling baseline

---

## Findings

No blocking issues found.

---

## Observations

1. **Playfair Display is a strong choice but carries weight risk.** The
   font has many weights and the variable font file can be large. The
   spec recommends subsetting to `latin` and potentially limiting to
   `wght@700` only. Implementation should verify the actual font payload
   after loading and document it. If it exceeds the estimated 25 KB per
   font, the sprint doc should note the measured value.

2. **Source Sans 3 was renamed from Source Sans Pro.** Google Fonts lists
   this as "Source Sans 3" — the implementation must use the correct
   import name from `next/font/google`. If the Next.js font loader
   doesn't recognize "Source Sans 3" by that exact name, implementation
   may need to check the Google Fonts API identifier (which is
   `Source_Sans_3`).

3. **Amber-gold accent on dark backgrounds — contrast needs verification.**
   The spec states `~40° 80-90% 55-65%` HSL for accent. At the lower
   end of that lightness range (55%), the contrast against the dark
   background (~6-8% lightness) will be very high, but the contrast
   against text _on_ an accent-colored button needs checking. White text
   on amber-gold may or may not meet WCAG AA depending on exact values.
   Implementation QA should verify specific contrast ratios.

4. **`--faint` token is new to the structure.** The `site-foundation`
   scaffold established `--foreground` and `--muted-foreground` but did
   not include `--faint`. The spec adds it as a third text tier for
   disabled/placeholder states. This is a clean extension — no existing
   code references it — but worth noting that it will need to be added
   to both `globals.css` and `tailwind.config.ts`.

5. **`--surface` and `--elevated` are new background tiers.** Same
   situation as `--faint` — the scaffold had only `--background`. These
   are clean additions. The shadcn/ui convention typically uses
   `--card`, `--popover`, etc. The spec's three-tier system
   (background/surface/elevated) is simpler and more semantic. shadcn
   components that reference `--card` will need to be mapped to
   `--surface` when they are installed in later sprints. This mapping
   should be documented.

6. **Section spacing tokens are CSS custom properties, not Tailwind theme
   tokens.** The spec defines `--section-py`, `--section-py-sm`, etc.
   as CSS variables. For these to be usable as Tailwind classes, they
   need entries in `tailwind.config.ts` under `theme.extend.spacing`
   or dedicated utility classes in `globals.css`. The sprint doc should
   clarify the consumption pattern.

7. **No grain texture or glow utility defined.** The `agent.md` design
   direction mentions "subtle grain textures" and "soft glow points" as
   atmospheric depth tools. The spec's shadow system includes
   `--shadow-glow` but doesn't define a grain texture approach. This is
   acceptable scope for Sprint 1 (tokens and typography are the
   priority), but the `hero-section` workstream will likely need grain
   and glow utilities. Worth flagging as a future gap.

8. **Motion enrichment scope is well-contained.** The spec enriches
   existing stubs without adding new dependencies. The `useReducedMotion`
   wrapper mentioned for `lib/motion.ts` uses Motion's built-in
   `useReducedMotion` hook — this is a re-export for convenience, not
   new functionality. Clean.

---

## Verdict

**PASS**

The spec is comprehensive, well-structured, and faithfully translates
`agent.md`'s design direction into concrete, implementable tokens. Color
palette direction, typography choices, and motion architecture are all
justified. Observations 3 (accent contrast), 5 (shadcn mapping), and 6
(spacing consumption) should be addressed in the sprint doc. Proceed.
