# Change Note: Skills Section Blend + Hover Effects

**Date:** 2026-04-03
**Type:** Visual polish

---

## Problem

1. A visible seam/line appeared at the boundary between the hero section
   and the skills section. Root cause: the hero's atmospheric glow div
   used `absolute inset-0`, confining the bottom radial gradient
   (surface-colored) exactly to the hero's bounds. Where that gradient
   terminated, the skills section's plain background began — the color
   discontinuity created a visible edge. Additionally, `overflow-hidden`
   clipped any potential vertical bleed.

2. Skill cards had no hover interaction — static display only. Per
   design principle #6 ("Purposeful interaction"), hover states should
   communicate interactivity and draw attention.

## Scope

- `components/sections/hero-section.tsx` — glow bleed fix
- `components/sections/skills-section.tsx` — overflow fix + hover effects

## Invariants

- No new dependencies
- No design token changes
- No heading hierarchy changes
- All 17 existing tests must continue passing
- `prefers-reduced-motion` still respected (hover transitions use CSS
  `transition-*` which the global safety net in `globals.css` overrides)

## Files Changed

| File                                     | Change                                                             |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `components/sections/hero-section.tsx`   | `overflow-hidden` → `overflow-x-clip`                              |
| `components/sections/skills-section.tsx` | `overflow-hidden` → `overflow-x-clip`, card hover + icon animation |

## Verification

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run test` — PASS (17/17)
- `npm run build` — PASS

## Outcome

1. **Seam fixed.** `overflow-x-clip` clips horizontal overflow (preventing
   scrollbars from wide gradients) while allowing vertical overflow. The
   hero's bottom glow now bleeds naturally into the skills section,
   eliminating the hard edge.

2. **Hover effects added.** Skill cards now have:
   - `hover:border-accent/30` — subtle accent border glow
   - `hover:bg-surface/80` — background shift for depth
   - `hover:shadow-md` — elevation shadow
   - `transition-all duration-300` — smooth 300ms transition
   - Icon: `group-hover:rotate-12 group-hover:scale-110` — playful
     rotation + scale on the Lucide icon
   - All via CSS `group` + `group-hover` — no JS, no new Motion usage
