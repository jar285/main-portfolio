# Agent Guide — Portfolio Rebuild

**Version:** 1.0.0
**Last updated:** 2026-04-03
**Author:** Jesus Rosario

This file is the single entry document for any LLM, agent, or automation
system working in this repository.

Read this file completely before doing any work. Do not write code, create
files, or make changes until you have finished reading.

---

## Purpose

This repository is a personal developer portfolio for Jesus Rosario — a
senior Web Information Systems student at NJIT graduating May 2026. He
currently works as a Software Engineering Intern at YU & Associates.

The portfolio is a clean rebuild. A previous version accumulated visual
debt across six workstreams of incremental patches, producing regressions
that cost more to fix than the features were worth. This version starts
fresh with the same proven orchestration method but a tighter design
system, a defined visual reference point, and stricter QA standards.

The space/cosmic theme is retired. The new visual direction is defined in
the Design System section below.

---

## Current Tooling Baseline

Update this section whenever a dependency version changes.

| Tool                   | Version / Config                                |
| ---------------------- | ----------------------------------------------- |
| Next.js                | 16 (App Router, static export)                  |
| React                  | 19+                                             |
| TypeScript             | Strict mode (`"strict": true` in tsconfig.json) |
| Tailwind CSS           | v3                                              |
| Motion (Framer Motion) | Latest — UI transitions, layout, gestures       |
| GSAP + ScrollTrigger   | Latest — scroll-driven, timeline sequences      |
| shadcn/ui              | Latest — structural primitives (Radix-based)    |
| Aceternity UI          | Free tier — animated effect components          |
| Vitest                 | Unit + component testing                        |
| React Testing Library  | Component interaction testing                   |
| ESLint                 | v9, flat config (`eslint.config.mjs`)           |
| Prettier               | Formatting                                      |
| clsx + tailwind-merge  | Class composition via `cn()` utility            |
| Deployment             | Vercel                                          |

Lint command is `eslint .` (not `next lint`).

`lucide-react` excludes brand icons (GitHub, Figma, Twitter, etc.). For
brand marks, use an inline SVG component with `aria-hidden="true"`. See
`components/sections/projects-section.tsx` `GithubIcon` for the
established pattern.

---

## Read Order For Any New Agent

1. `agent.md` (this file)
2. `README.md`
3. `docs/_specs/README.md` — workstream status index
4. The relevant feature spec under `docs/_specs/{feature}/spec.md`
5. The relevant sprint doc under `docs/_specs/{feature}/sprints/`
6. Any existing implemented artifact the sprint depends on

If the work touches the design system, also read `tailwind.config.ts`
and `app/globals.css` before making visual changes.

---

## Non-Negotiable Process Rules

### 1. The Six-Step Workflow

For all foundational, ambiguous, high-impact, or multi-session work:

1. Write the spec
2. QA the spec
3. Write the sprint doc
4. QA the sprint doc
5. Implement the sprint
6. QA the implementation

Do not skip phases. Do not merge phases.

### 2. The Lightweight Path (Change Notes)

For narrow, low-risk, low-ambiguity fixes only. A valid Change Note
includes:

- Problem
- Scope
- Invariants
- Files expected to change
- Verification
- Outcome

Change Notes must be persisted as files in `docs/_changes/` with the
naming format `YYYY-MM-DD-{short-description}.md`. Change Notes
communicated only in chat are not valid — they break the audit trail.

If the work changes architecture, design tokens, component structure,
or any durable pattern, do not use the lightweight path.

When in doubt, choose the heavier path.

### 3. Specs Define What And Why

Feature specs live at `docs/_specs/{feature}/spec.md`.

Specs define:

- Problem statement
- Design goals
- Architecture (components, tokens, data flow)
- Applicable design patterns (see Engineering Standards)
- Accessibility requirements
- Performance budget (measurable targets, not vague goals)
- Testing strategy
- Sprint plan
- Future considerations

Specs are contracts. They do not contain guesses.

### 4. Sprint Docs Define Exact Execution

Sprint docs live at `docs/_specs/{feature}/sprints/sprint-N-*.md`.

Sprint docs must include:

- A clear goal
- Referenced spec sections
- Verified available assets (checked against live repo before implementation)
- Exact artifact targets with action verbs (Create / Modify / Delete)
- Task-by-task execution guidance
- Verify step for each task
- A completion checklist
- A QA deviations section

If a sprint doc is vague, fix the sprint doc before implementing.

### 5. QA Is Adversarial, Not Ceremonial

QA is not a rubber stamp. A QA pass that returns `PASS (0 issues)` with
no observations across every phase is not credible. This was a failure
mode in the previous build.

Every QA pass must include:

- **Findings**: Blocking issues that must be fixed
- **Observations**: Non-blocking notes — edge cases considered, minor
  style inconsistencies, things worth watching, potential tech debt.
  This section must never be empty. Even excellent work has observations.
- **Verdict**: PASS, CONDITIONAL PASS (with required follow-ups), or FAIL

QA must:

- Read the governing spec
- Read the sprint doc
- Read every changed file
- Audit against actual requirements
- Run verification commands
- Perform visual inspection at 320px, 375px, 768px, and 1440px

After implementation QA passes, mark the sprint doc completion checklist
items as done (`- [x]`). Do not leave them unchecked.

---

## Engineering Standards

### Code Architecture — Gang of Four + SOLID

One component, one job. Follow SOLID principles. When you see
duplication, extract it. Use GoF patterns where they solve real problems
in this project:

| Pattern   | Application in this portfolio                        |
| --------- | ---------------------------------------------------- |
| Strategy  | Animation systems — swap between Motion and GSAP     |
|           | strategies per component based on complexity needs   |
| Observer  | Scroll-based interactions via IntersectionObserver   |
|           | and GSAP ScrollTrigger                               |
| Composite | Nested UI component trees — Section > Card > Badge   |
| Factory   | Component variant creation via CVA                   |
|           | (class-variance-authority)                           |
| Singleton | Shared configuration — design tokens, motion config, |
|           | site metadata                                        |
| Adapter   | Aceternity UI components adapted to local design     |
|           | system tokens and interfaces                         |

Do not use patterns just to use them. Every pattern choice must be
justified by a concrete problem it solves in the spec.

### TypeScript

- Strict mode, no exceptions
- No `any` types
- Props must have explicit interfaces with descriptive names
- Default values where appropriate

### Verification — Kent Beck

Nothing is done until it passes objective checks. Every sprint ends with
the full verification stack passing:

```bash
npm run typecheck    # Type safety
npm run lint         # Code pattern compliance (eslint .)
npm run test         # Unit and component tests
npm run build        # Production build succeeds
npm run format:check # Consistent formatting
```

Standing rule: the full verification stack must be green before starting
any new work. If any command fails, nothing else moves until it is fixed.

### When To Add Tests

- A new component is created → smoke render test minimum
- A component's behavior changes → update existing tests
- A bug is fixed → regression test
- The sprint doc explicitly requires tests
- Interactive behavior (toggle, menu, form) → interaction test

### Performance Budget

| Metric                   | Target     |
| ------------------------ | ---------- |
| Lighthouse Perf          | ≥ 90       |
| First Contentful Paint   | < 1.5s     |
| Largest Contentful Paint | < 2.5s     |
| Total bundle JS          | < 200 KB   |
| Individual image         | < 100 KB   |
| Skill/tech icons         | < 10 KB ea |
| Animation FPS            | 60fps min  |

If a sprint introduces assets or libraries that risk these targets,
the spec must acknowledge and justify the cost.

---

## Design System

### Visual Direction

The previous space/cosmic theme is retired. The new direction is:

**Dark editorial — refined, atmospheric, typographically led.**

Reference attributes (not a specific site to copy — a set of qualities
the design must exhibit):

- **Dark foundation**: Deep neutrals (not pure black) with considered
  accent colors. The palette should feel warm enough to be inviting,
  not cold and sterile.
- **Typography-first hierarchy**: Headlines do the heavy lifting.
  Strong size contrast between display and body text. The typeface
  pairing should have personality — a distinctive display font paired
  with a highly readable body font. Do not use Inter, Roboto, Arial,
  or system fonts.
- **Atmospheric depth**: Backgrounds should feel volumetric, not flat.
  Layered gradients, subtle grain textures, or soft glow points create
  dimension. No solid `#000` backgrounds.
- **Choreographed motion**: Elements enter with staggered, spring-based
  timing at intentionally varied speeds and directions. Nothing appears
  all at once. Nothing moves uniformly.
- **Editorial whitespace**: Generous spacing. Content breathes. Sections
  earn their screen space through clear information hierarchy, not
  through cramming.
- **Purposeful interaction**: Hover states, micro-interactions, and
  scroll-triggered reveals should feel designed, not decorative. Every
  animation answers the question "what does this help the user
  understand?"

### Design Principles

These translate the visual direction into verifiable criteria:

1. **Atmospheric depth through layering.** Multiple visual layers at
   different opacities and motion rates create volume. A single flat
   gradient is not atmospheric.

2. **Volumetric color, not flat color.** Backgrounds should suggest
   depth and light source. Radial gradients, opacity layers, and soft
   glow points create dimensionality.

3. **Choreographed motion, not uniform motion.** If multiple elements
   animate, they move at intentionally different rates and directions.
   Staggered drift speeds feel organic. Uniform slide-ins feel robotic.

4. **Motion as atmosphere, not as feature.** Background animation should
   be almost subconscious. If a visitor watches the animation instead
   of reading content, it is too prominent.

5. **Information hierarchy over decoration.** Every section communicates
   something concrete about the developer. If a section exists only for
   atmosphere with no portfolio-relevant content, remove it.

6. **Mobile-first responsive.** All components work from 320px upward.
   No fixed-width containers. No horizontal overflow.

### Design Reference Standards

Use recognized design and usability references when making section-level
UI decisions, but only when they directly support a concrete choice in
this portfolio. Do not name-drop authorities without tying them to an
actual implementation decision.

Primary references:

- **Refactoring UI** — spacing, visual hierarchy, density, alignment,
  card composition, polish, and component-level visual decisions
- **Nielsen Norman Group (NN/g)** — usability heuristics, content
  hierarchy, scanning behavior, CTA clarity, and section-level UX
  decisions
- **W3C WCAG + ARIA Authoring Practices** — accessibility behavior,
  semantics, keyboard interaction, focus management, and motion
  fallbacks
- **Best-in-class portfolio patterns** — used as comparative references
  for structure and communication quality, never as templates to copy

Application rule:

- Hero sections should be judged on immediate role/value clarity, visual
  hierarchy, CTA clarity, and above-the-fold scan quality
- About sections should be judged on credibility, readability,
  information order, and narrative relevance
- Skills sections should be judged on grouping, label clarity,
  scannability, and icon/text balance
- Project sections should be judged on outcomes, evidence, visual
  clarity, and comparison ease

Do not copy a named site or product. Extract the underlying design
decision and justify why it fits this portfolio.

### Color Tokens

All colors must be defined as Tailwind config tokens or CSS custom
properties. No hardcoded hex values in components.

The palette must include:

- Background tiers (base, surface, elevated)
- Text tiers (primary, secondary, muted)
- Accent (primary action color)
- Accent subtle (hover states, borders, low-emphasis indicators)
- Semantic (success, warning, error — for any interactive states)

### Typography

- Display font: distinctive, characterful — for headlines and hero
- Body font: highly readable, clean — for paragraphs and UI text
- Mono font: for code snippets and tech tags
- Do not default to Inter, Roboto, or system fonts
- Heading hierarchy through size, weight, AND spacing — not only color

### Motion Architecture

Two animation libraries serve complementary roles:

**Motion (Framer Motion)** — default for:

- Component enter/exit transitions
- Layout animations
- Gesture-based interactions (hover, tap, drag)
- `AnimatePresence` for mount/unmount
- Spring-based easing on UI elements

**GSAP + ScrollTrigger** — reserved for:

- Scroll-driven reveal sequences
- Complex multi-element timelines
- Pinned scroll sections
- Text splitting and staggered character reveals
- Any animation requiring frame-precise control

Decision rule: start with Motion. Escalate to GSAP only when Motion
cannot express the sequence declaratively.

All animations must respect `prefers-reduced-motion`. Animated layers
must have a static fallback that still looks complete and intentional.

### Component Architecture

Components use shadcn/ui primitives for structural elements (buttons,
dialogs, navigation) and Aceternity UI for premium visual effects
(spotlight, glow, parallax cards) where they earn their weight.

Aceternity components must be adapted to local design tokens — do not
use their default color values. Wrap them in adapter components that
map to the project's token system.

### Accessibility

- Meaningful alt text on every image
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Keyboard navigable — all interactive elements reachable via Tab
- Focus indicators visible on all interactive elements
- Sufficient color contrast (WCAG AA minimum)
- `aria-expanded` on all toggles
- `aria-current="page"` on active nav links
- Skip-to-content link
- `prefers-reduced-motion` respected on all animations

---

## Scope Discipline

- Do not add unrelated features
- Do not refactor adjacent systems without explicit sprint authorization
- Do not add dependencies unless the sprint explicitly requires them
- Do not rewrite broad sections when a local fix solves the problem
- Do not treat "helpful expansion" as harmless — it is drift
- Do not rename or restructure files outside the current sprint's scope
- If an upgrade or fix forces changes outside declared scope, pause and
  flag the deviation before implementing

---

## Content Rules

### Portfolio Content Principles

1. **Projects show outcomes, not just descriptions.** Each project card
   includes: a visual, a one-line hook, the tech stack as tags, and a
   measurable outcome or learning.

2. **Skills are grouped and labeled.** Technology icons have text labels.
   Groupings (Frontend, Backend, Tools) are visible in the UI.

3. **The hero communicates role and value immediately.** Headline,
   subtitle, and CTA must be legible within 2 seconds. Button labels
   describe their action (e.g., "View Resume", not "Learn More").

4. **Content is current.** The portfolio reflects 2026 graduation,
   current skills (React, Node.js, Express, MongoDB, Python, Docker),
   and current role (Software Engineering Intern at YU & Associates).

5. **No filler sections.** Every section earns its place.

---

## Accuracy Rules

- Verify commands against `package.json` before documenting them
- Verify file paths against the live repository before referencing them
- Verify current implementation state before writing about it
- Do not describe planned technologies as already implemented
- Do not list skills or experience the developer has not confirmed

---

## Repository Documentation

- `README.md` — landing document: what the project is, how to run it,
  current state, links to deeper docs. Keep this current.
- `docs/_specs/` — planning artifacts (specs, sprints, QA reports)
- `docs/_changes/` — persisted Change Notes
- `docs/` — additional reference material as needed

Do not collapse these layers. Update README.md whenever a workstream
completes.

---

## No False Authority

- Do not imply AI output is correct because it sounds polished
- Do not use named frameworks or practitioners as status markers without
  tying them to a concrete decision
- Do not claim a feature is "best practice" without explaining why it
  applies to this specific context
- Do not declare work complete until verification commands pass

---

## Secrets And Sensitive Files

- Do not expose secrets from `.env.local` or any environment file
- Do not print private values into logs, docs, commits, or chat output
- Do not include personal contact information (phone, personal email,
  physical address) in code or public docs unless explicitly requested

---

## Commit Conventions

| Type        | Use                                    |
| ----------- | -------------------------------------- |
| `feat:`     | Sprint implementation                  |
| `fix:`      | QA fixes after implementation          |
| `docs:`     | Sprint doc QA fixes, README updates    |
| `chore:`    | Cleanup, non-functional maintenance    |
| `style:`    | Formatting-only changes                |
| `refactor:` | Code restructuring, no behavior change |
| `test:`     | Adding or updating tests               |

Commit only files relevant to the current sprint or request.

---

## Suggested Workstreams

| Workstream             | Priority | Covers                                                          |
| ---------------------- | -------- | --------------------------------------------------------------- |
| `site-foundation`      | P0       | Next.js scaffold, TS strict, Tailwind config, ESLint + Prettier |
|                        |          | Vitest setup, project structure, verification pipeline          |
| `design-system`        | P0       | Color tokens, typography, spacing, motion primitives,           |
|                        |          | breakpoints, cn() utility, shadcn/ui init, base globals.css     |
| `navigation`           | P1       | Responsive navbar, mobile menu, active states, skip-to-content  |
| `hero-section`         | P1       | Hero layout, headline, CTA, atmospheric background, motion      |
| `skills-section`       | P1       | Labeled skill groups, icons, responsive grid                    |
| `projects-section`     | P1       | Project cards, tech tags, outcomes, responsive grid             |
| `about-and-experience` | P2       | About section, experience timeline, education                   |
| `ux-enhancements`      | P2       | Blob Hero layout injection, Global Magnetic Hover integration   |
| `footer`               | P2       | Responsive footer, dynamic year, contact links                  |
| `performance-and-a11y` | P3       | Lighthouse audit, WCAG pass, image optimization                 |
| `deployment`           | P3       | Vercel deployment, CI/CD, quality gates                         |

Priority order is a recommendation. The developer sets actual execution
order. Each workstream follows the full six-step workflow.

---

## Expected Agent Behavior

- Read before writing
- Verify before claiming completion
- Persist all artifacts (specs, sprint docs, QA reports, Change Notes)
- Keep scope tight to the current sprint or Change Note
- Prefer explicit evidence over confidence
- Never expand scope because expansion "seems helpful"
- Never skip verification because the code "looks right"
- Ask for clarification when the request is ambiguous
- QA must produce observations, not just verdicts

---

## Primary Reference Files

When there is a conflict between a loose assumption and one of these
verified artifacts, the artifact wins:

- `agent.md` (this file)
- `README.md`
- `docs/_specs/README.md`
- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
