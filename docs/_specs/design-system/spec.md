# Design System — Feature Spec

**Workstream:** `design-system`
**Priority:** P0
**Author:** AI Agent (governed by `agent.md` v1.0.0)
**Date:** 2026-04-03
**Status:** Draft

---

## Problem Statement

The `site-foundation` workstream delivered a verified scaffold with
placeholder color tokens (achromatic HSL values), placeholder fonts
(Geist/Geist Mono), and stub motion utilities. The visual output is
currently a blank dark page with no personality.

Before any content workstream (navigation, hero, skills, projects) can
begin, the project needs a fully realized design token system that
implements the **dark editorial** visual direction defined in `agent.md`.
Without this, every subsequent workstream would make ad-hoc visual
decisions that diverge, creating the same visual debt that killed the
previous build.

This workstream establishes the single source of truth for color,
typography, spacing, shadows, radii, breakpoints, and motion — all
encoded as Tailwind tokens and CSS custom properties.

---

## Design Goals

1. **Token-driven styling.** Every visual property used in components
   must reference a token. No hardcoded hex, rgb, or hsl values in
   component files. This enforces consistency and makes future palette
   changes a single-file operation.

2. **Dark editorial atmosphere.** The palette must feel warm, deep, and
   volumetric — not cold, sterile, or flat. Backgrounds use layered
   tiers (base → surface → elevated) to create spatial depth per
   `agent.md` design principle #1.

3. **Distinctive typography.** A characterful display font for headlines,
   a highly readable body font for paragraphs, and a mono font for code
   and tech tags. No Inter, Roboto, Arial, or system-font defaults per
   `agent.md` typography rules.

4. **Motion system with reduced-motion respect.** Motion primitives in
   `lib/motion.ts` enriched with the design system's spring physics,
   stagger timing, and easing curves. `lib/gsap.ts` enhanced with
   scroll-trigger defaults. All animations must have
   `prefers-reduced-motion` fallbacks.

5. **shadcn/ui alignment.** The CSS custom property naming convention
   must remain compatible with shadcn/ui's expected token structure so
   that any shadcn component added later inherits the design system
   automatically.

6. **Mobile-first from 320px.** All spacing, typography scales, and
   breakpoint decisions start at 320px and scale upward.

---

## Architecture

### Color Token System

All colors are defined as HSL channel values in CSS custom properties
(`:root`) and consumed via `hsl(var(--token))` in `tailwind.config.ts`.
This is the pattern already established in `site-foundation` and
required by shadcn/ui.

#### Background Tiers

| Token          | Role                                            |
| -------------- | ----------------------------------------------- |
| `--background` | Page-level base — deepest layer                 |
| `--surface`    | Card and section backgrounds — one step lighter |
| `--elevated`   | Modals, dropdowns, tooltips — two steps lighter |

#### Text Tiers

| Token                | Role                                      |
| -------------------- | ----------------------------------------- |
| `--foreground`       | Primary text — headlines, body            |
| `--muted-foreground` | Secondary text — descriptions, timestamps |
| `--faint`            | Tertiary — disabled, placeholder          |

#### Accent

| Token                 | Role                                         |
| --------------------- | -------------------------------------------- |
| `--accent`            | Primary action — buttons, links, focus rings |
| `--accent-subtle`     | Hover states, borders, low-emphasis markers  |
| `--accent-foreground` | Text on accent backgrounds                   |

#### Semantic

| Token       | Role                |
| ----------- | ------------------- |
| `--success` | Positive indicators |
| `--warning` | Caution indicators  |
| `--error`   | Error states        |

#### Utility

| Token      | Role                  |
| ---------- | --------------------- |
| `--border` | Default border color  |
| `--ring`   | Focus ring color      |
| `--radius` | Default border radius |

#### Palette Direction

The palette draws from warm neutral undertones rather than pure gray.
The base background sits around `240° 6-10% 6-8%` — a very dark
blue-charcoal that reads as near-black but has warmth. Surface and
elevated tiers step up in lightness by 3-5% each. The accent color
is an amber-gold (`~40° 80-90% 55-65%`) that provides warmth and
high contrast against the dark foundation without feeling "techy blue."

This satisfies `agent.md` design direction: "warm enough to be
inviting, not cold and sterile."

### Typography System

Three font stacks loaded via `next/font/google`:

| Role    | Font                 | Fallback              | Why                                                                                                                                                                            |
| ------- | -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Display | **Playfair Display** | Georgia, serif        | Distinctive serif with personality — high contrast between thick/thin strokes creates editorial presence. Not commonly seen in developer portfolios, which makes it memorable. |
| Body    | **Source Sans 3**    | system-ui, sans-serif | Designed for UI readability at small sizes. Clean, professional, pairs well with serif display fonts. Better x-height than most alternatives.                                  |
| Mono    | **JetBrains Mono**   | monospace             | Developer-focused mono with ligatures. Excellent for code snippets and tech stack tags. Familiar to the target audience (engineering teams).                                   |

**Heading scale (mobile-first):**

| Level | Mobile          | Desktop (≥768px) | Weight | Tracking |
| ----- | --------------- | ---------------- | ------ | -------- |
| h1    | 2.25rem (36px)  | 3.75rem (60px)   | 700    | -0.025em |
| h2    | 1.875rem (30px) | 3rem (48px)      | 700    | -0.02em  |
| h3    | 1.5rem (24px)   | 2rem (32px)      | 600    | -0.015em |
| h4    | 1.25rem (20px)  | 1.5rem (24px)    | 600    | -0.01em  |
| body  | 1rem (16px)     | 1.125rem (18px)  | 400    | 0        |
| small | 0.875rem (14px) | 0.875rem (14px)  | 400    | 0.01em   |

Heading hierarchy uses size, weight, AND tracking — not only color —
per `agent.md` typography rules.

### Spacing System

Tailwind's default spacing scale (0.25rem increments) is sufficient.
This workstream adds named section-level spacing tokens:

| Token             | Value  | Use                           |
| ----------------- | ------ | ----------------------------- |
| `--section-py`    | 5rem   | Vertical padding for sections |
| `--section-py-sm` | 3rem   | Vertical padding on mobile    |
| `--container-max` | 72rem  | Max content width (1152px)    |
| `--container-px`  | 1.5rem | Horizontal content padding    |

### Shadow System

Shadows use layered, warm-tinted values for atmospheric depth:

| Token           | Use                        |
| --------------- | -------------------------- |
| `--shadow-sm`   | Subtle card elevation      |
| `--shadow-md`   | Hover state elevation      |
| `--shadow-lg`   | Modal / overlay elevation  |
| `--shadow-glow` | Accent glow on focus/hover |

### Breakpoint Conventions

Standard Tailwind breakpoints, documented for consistency:

| Name | Width  | Use                             |
| ---- | ------ | ------------------------------- |
| sm   | 640px  | Large phones landscape          |
| md   | 768px  | Tablets, typography scale shift |
| lg   | 1024px | Small desktops, grid changes    |
| xl   | 1280px | Large desktops                  |
| 2xl  | 1536px | Ultra-wide                      |

Mobile-first: all base styles target 320px+. Breakpoints add overrides.

### Motion Primitives

Enrichment of existing `lib/motion.ts` and `lib/gsap.ts` stubs:

**Motion (lib/motion.ts):**

- Spring physics tuned to the design direction (softer, more organic)
- Multiple stagger patterns with varied delays for choreographed feel
- `fadeIn`, `fadeUp`, `fadeDown`, `scaleIn` variants
- `useReducedMotion` hook wrapper for component-level fallbacks
- Container variant with configurable stagger timing

**GSAP (lib/gsap.ts):**

- Scroll-triggered reveal defaults with design-system easing
- Text reveal utilities (for future character/word stagger)
- Standard `scrub` and `snap` configurations

**Reduced motion:**

- All Motion variants include a `reducedMotion` key that sets
  `duration: 0` and removes transforms
- GSAP utilities check `window.matchMedia("(prefers-reduced-motion: reduce)")`
  before creating ScrollTrigger instances

---

## Applicable Design Patterns

| Pattern   | Application in This Workstream                         |
| --------- | ------------------------------------------------------ |
| Singleton | All token definitions live in exactly two files:       |
|           | `globals.css` (CSS custom properties) and              |
|           | `tailwind.config.ts` (Tailwind mappings). Imported     |
|           | everywhere, defined once.                              |
| Strategy  | Motion primitives in `lib/motion.ts` vs `lib/gsap.ts`  |
|           | — components pick the animation strategy that fits     |
|           | their complexity.                                      |
| Factory   | CVA is available but not actively used in this sprint. |
|           | Component variants will be created in later            |
|           | workstreams. The token system enables CVA's class      |
|           | composition.                                           |

---

## Accessibility Requirements

- **Color contrast:** All text/background combinations must meet WCAG AA
  (4.5:1 for body text, 3:1 for large text). The warm amber accent on
  dark backgrounds must be verified.
- **Focus indicators:** Focus ring uses `--ring` token, visible at 2px
  offset. Must work on both dark and accent backgrounds.
- **Reduced motion:** All motion primitives respect
  `prefers-reduced-motion: reduce`. Animated elements show their final
  state instantly when reduced motion is preferred.
- **Font sizing:** Base body text ≥ 16px. No text below 14px. Heading
  hierarchy through size+weight+tracking, not color alone.

---

## Performance Budget

From `agent.md`:

| Metric                 | Target   |
| ---------------------- | -------- |
| Lighthouse Perf        | ≥ 90     |
| First Contentful Paint | < 1.5s   |
| Total bundle JS        | < 200 KB |

**Design-system-specific considerations:**

- **Fonts:** Three Google Fonts loaded via `next/font`. Each adds
  ~15-25 KB. Total font payload: ~60-75 KB. This is acceptable as
  fonts are preloaded, self-hosted, and cached. Subset to `latin` only.
- **No new JS dependencies** in this workstream. Token changes are
  CSS-only. Motion utility enrichments don't add bundle weight beyond
  what Motion and GSAP already contribute.
- **No images** added in this workstream.

---

## Testing Strategy

- **Existing smoke test** (`__tests__/smoke.test.tsx`) must continue
  passing — it renders the Home page which uses design token classes.
- **No new component tests** — this workstream produces configuration
  and utility files, not components. Tests will be added when components
  are created in subsequent workstreams.
- **Verification is via the five-command stack** — typecheck confirms
  the TypeScript in motion/gsap utilities compiles, build confirms
  Tailwind processes the tokens, lint/format confirm code quality.

---

## Sprint Plan

This workstream is a single sprint:

### Sprint 1: Design Tokens and Typography

**Goal:** Fully realized design token system in `globals.css` and
`tailwind.config.ts`, typography via `next/font`, enriched motion
primitives, and `app/layout.tsx` wired to the real font stack.

---

## Future Considerations

- The `navigation` workstream (P1) will be the first consumer of the
  token system for interactive states (hover, active, focus).
- The `hero-section` workstream will use motion primitives extensively
  and may need additional GSAP utilities.
- Aceternity UI components (added in later workstreams) must be adapted
  to these tokens via the Adapter pattern — their default values cannot
  override the design system.
- If the font payload exceeds 80 KB total, consider loading the display
  font only at `wght@700` and body font at `wght@400;600`.
