# Skills Section — Feature Spec

**Workstream:** `skills-section`
**Priority:** P1
**Author:** AI Agent (governed by `agent.md` v1.0.0)
**Date:** 2026-04-03
**Status:** Draft

---

## Problem Statement

The portfolio has no skills section. After the hero, visitors have no way
to scan the developer's technical capabilities. Per `agent.md` content
rule #2: "Skills are grouped and labeled. Technology icons have text
labels. Groupings (Frontend, Backend, Tools) are visible in the UI."

Per the design reference standards in `agent.md`: "Skills sections should
be judged on grouping, label clarity, scannability, and icon/text
balance."

The skills section must communicate technical breadth at a glance —
grouped by domain, each skill labeled with an icon, scannable in under
5 seconds. It sits directly below the hero and above the future projects
section.

---

## Design Goals

1. **Grouped by domain.** Skills are organized into three visible
   categories: Frontend, Backend, and Tools. Each group has a clear
   heading. Per Refactoring UI: grouping reduces cognitive load and
   creates scannable structure.

2. **Labeled with icons.** Every skill has a text label and an icon.
   Icons are from `lucide-react` (already installed) — no new
   dependencies, no external icon CDN, no image files. Per `agent.md`
   performance budget: skill/tech icons < 10 KB each. Lucide icons are
   inline SVGs at ~1-2 KB — well within budget.

3. **Scannability.** The section uses a responsive grid layout. At
   mobile (320px), skills display in a 2-column grid. At `md` (768px),
   3 columns. At `lg` (1024px), skills within each category spread
   across a comfortable grid. The layout prioritizes fast visual
   scanning — Refactoring UI's principle of consistent, aligned items
   in a grid over a loose list.

4. **Atmospheric depth.** The section background uses a subtle gradient
   or glow to maintain visual continuity with the hero. Per design
   principle #1: "Multiple visual layers at different opacities create
   volume." A soft radial glow anchors the section without competing
   with the skill content.

5. **Choreographed entrance.** Each category group staggers in on
   scroll using GSAP ScrollTrigger. Within each group, individual skill
   items stagger with a fast cadence. Per design principle #3:
   "Intentionally different rates and directions." This is a
   scroll-driven multi-element sequence — GSAP is the right tool per
   the motion architecture decision rule.

6. **Mobile-first from 320px.** All content readable and well-spaced at
   320px. No horizontal overflow. Grid collapses gracefully.

---

## Architecture

### Component Tree

```
app/page.tsx
└── SkillsSection (components/sections/skills-section.tsx) — "use client"
    ├── Section heading (h2, font-display)
    ├── Section subtitle (p, font-sans, muted)
    └── Category groups (mapped from grouped data)
        └── SkillCategoryGroup (per category)
            ├── Category heading (h3, font-sans)
            └── Skill grid
                └── SkillCard (per skill)
                    ├── Icon (lucide-react)
                    └── Label (span, font-mono)
```

### File Structure

| File                                     | Type   | Purpose                                    |
| ---------------------------------------- | ------ | ------------------------------------------ |
| `components/sections/skills-section.tsx` | Client | Skills section with GSAP scroll animation  |
| `lib/skills-data.ts`                     | Data   | Typed skill entries (modify existing stub) |
| `__tests__/skills.test.tsx`              | Test   | Skills render + content tests              |

### Data Flow

1. `lib/skills-data.ts` exports the typed `skills` array and a
   `skillsByCategory` utility that groups skills by their `category`
   field (Singleton pattern — single source of truth for skill data)
2. `SkillsSection` imports `skillsByCategory` and maps over categories
   to render grouped grids
3. Icons are resolved by mapping skill `icon` string identifiers to
   `lucide-react` components via a lookup object (Factory pattern —
   component creation from data)
4. `page.tsx` renders `<SkillsSection />` below `<HeroSection />`

### Props Interface

```ts
// SkillsSection — no props, self-contained, reads from skills-data
interface SkillsSectionProps {}

// SkillCard — receives individual skill data
interface SkillCardProps {
  name: string;
  icon: string;
}
```

### Icon Strategy

Lucide-react icons are tree-shaken inline SVGs. A lookup map in the
skills section maps the `icon` string from skill data to the
corresponding Lucide component:

```ts
import { Code2, Server, Wrench, ... } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  react: Code2,
  node: Server,
  // ...
};
```

This is the Factory pattern: the `icon` string acts as a key, and the
map produces the correct component. Unknown keys render a fallback icon.

If a skill's technology has no suitable Lucide match, a generic icon
(e.g., `Code2`) is used. No external icon libraries or image files are
added.

### Background Implementation

A subtle section-level atmospheric glow using CSS — consistent with the
hero's approach:

- A positioned `<div>` with `aria-hidden="true"` and a soft radial
  gradient from `accent` at very low opacity (3-5%) centered in the
  section, creating warm continuity with the hero glow
- The base `background` token provides the dark foundation
- Lower opacity than the hero glow to establish visual hierarchy —
  the hero is the focal point, skills is supporting content

---

## Applicable Design Patterns

| Pattern   | Application                                            |
| --------- | ------------------------------------------------------ |
| Singleton | `skills-data.ts` as single source of truth for skills  |
| Factory   | Icon lookup map — maps data string to Lucide component |
| Composite | SkillsSection > SkillCategoryGroup > SkillCard         |
| Strategy  | GSAP for scroll-triggered staggered reveals (escalated |
|           | from Motion because this is a multi-element scroll     |
|           | sequence across grouped categories)                    |

---

## Accessibility Requirements

- **Heading hierarchy:** h2 for section title ("Skills"), h3 for each
  category group ("Frontend", "Backend", "Tools"). No heading levels
  skipped — hero has h1.
- **Icon accessibility:** All Lucide icons get `aria-hidden="true"` since
  each skill has an adjacent text label. The text label is the accessible
  name. Icons are decorative.
- **Reduced motion:** `prefers-reduced-motion` check — if preferred, all
  elements appear instantly in their final position. GSAP animations are
  skipped via `prefersReducedMotion()` from `lib/gsap.ts`.
- **Keyboard:** No interactive elements in the skills section (display
  only). No focus management needed.
- **Color contrast:** Skill labels use `foreground` on `background` —
  ~15:1 ratio, well above WCAG AA 4.5:1 minimum. Category headings
  use `muted-foreground` on `background` — verified above 4.5:1.

---

## Performance Budget

From `agent.md`:

| Metric           | Target       |
| ---------------- | ------------ |
| Skill/tech icons | < 10 KB each |
| Total bundle JS  | < 200 KB     |
| Animation FPS    | 60fps min    |

**Skills-specific:**

- No images. Lucide icons are inline SVGs (~1-2 KB each, tree-shaken).
  Well within the 10 KB per icon budget.
- No new dependencies. `lucide-react` is already installed.
- GSAP is already installed and loaded. ScrollTrigger registration adds
  minimal overhead. The scroll-triggered reveals are lightweight — no
  complex timelines, no pinning, no scrubbing.
- Grid layout is CSS-only. No layout JS.

---

## Testing Strategy

Per `agent.md`:

- **New component → smoke render test minimum**
- **Content verification** — skills data renders correctly

Tests:

1. **SkillsSection renders** — section element with `id="skills"` exists
2. **Section heading visible** — h2 with "Skills" text present
3. **All three categories rendered** — "Frontend", "Backend", "Tools"
   headings present
4. **Skill names visible** — at least one known skill name (e.g.,
   "React") appears in the document
5. **Correct number of skills rendered** — total skill cards match
   `skills.length` from data

---

## Sprint Plan

Single sprint:

### Sprint 1: Skills Section

**Goal:** Fully realized skills section with grouped categories, labeled
icons, responsive grid, scroll-triggered GSAP entrance animation, and
proper semantic structure. Populates `skills-data.ts` with actual skill
entries. Renders below the hero section.

---

## Skill Data

Per `agent.md` content rule #4, the developer's current skills are:
React, Node.js, Express, MongoDB, Python, Docker.

Additional skills the developer may have based on the tech stack of this
portfolio and typical NJIT Web Information Systems curriculum:
TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Next.js, Git.

The sprint doc will finalize the exact skill list grouped by category.
Skills not confirmed by the developer should be limited to those clearly
evidenced by this portfolio's tech stack.

---

## Future Considerations

- Skill proficiency levels (beginner/intermediate/advanced) could be
  added as a visual indicator (e.g., subtle bar or dot scale). This
  workstream does not add proficiency indicators — they require developer
  input on self-assessment.
- If the skill count grows significantly (>20), a filter/toggle by
  category could improve UX. For the current count (~12-15), a single
  scrollable view is sufficient.
- The icon map could be extracted to a shared utility if other sections
  (e.g., project tech tags) need the same icon resolution. For now, it
  lives in the skills section component.
- Hover effects on skill cards (subtle glow, scale) could be added in a
  future polish pass. This sprint focuses on structure, content, and
  scroll animation.
