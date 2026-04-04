# Sprint 1: Projects Section

**Workstream:** `projects-section`
**Spec:** `docs/_specs/projects-section/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Goal

Deliver the projects section with four project cards in a responsive
grid (1 col mobile, 2 col desktop), each showing title, description,
tech stack tags, outcome text, and action links. Populate
`projects-data.ts` with actual project entries. Render below the skills
section in `page.tsx`. All five verification commands must pass. Tests
cover rendering and content.

---

## Referenced Spec Sections

- Problem Statement
- Design Goals (outcome-focused, visual clarity, tech tags, links,
  atmospheric depth, choreographed entrance, mobile-first)
- Architecture → Component Tree
- Architecture → File Structure
- Architecture → Data Flow
- Architecture → Project Interface
- Architecture → Project Data
- Architecture → Link Strategy
- Architecture → Card Layout
- Applicable Design Patterns (Singleton, Composite, Factory, Strategy)
- Accessibility Requirements
- Testing Strategy

---

## Verified Available Assets

Checked against live repo on 2026-04-03:

- `lib/projects-data.ts` — stub with `Project` interface
  (`title`, `description`, `techStack`, `outcome`, `image`,
  `liveUrl?`, `repoUrl?`), empty `projects` array
- `lib/motion.ts` — `fadeUp`, `staggerFast`, `staggerSlow`,
  `useReducedMotion` available
- `lib/constants.ts` — `navLinks` includes
  `{ label: "Projects", href: "#projects" }` — section must have
  `id="projects"`
- `lib/utils.ts` — `cn()` utility available
- `app/globals.css` — `.section-container` and `.section-padding`
  utility classes available. Design tokens available.
- `tailwind.config.ts` — full token mapping
- `app/page.tsx` — renders `<HeroSection />` then `<SkillsSection />`,
  will add `<ProjectsSection />` below
- `components/sections/skills-section.tsx` — established pattern for
  sections with Motion `whileInView`, `staggerFast`, `fadeUp`,
  atmospheric glow, `section-container`, `section-padding`
- `__tests__/skills.test.tsx` — 5 tests, established testing pattern
- `vitest.setup.ts` — `IntersectionObserver` mock already present
- `package.json` — `lucide-react`, `motion` already installed

---

## Artifact Targets

| Action | File                                       |
| ------ | ------------------------------------------ |
| Modify | `lib/projects-data.ts`                     |
| Create | `components/sections/projects-section.tsx` |
| Modify | `app/page.tsx`                             |
| Create | `__tests__/projects.test.tsx`              |

---

## Design Decisions (from Spec QA)

1. **Keep `Project` interface unchanged — use `liveUrl` for all primary
   external links.** Per spec QA observation #1. The Figma link for
   Campus Companion goes in `liveUrl`. No `figmaUrl` field needed.
   The link label/icon will be determined by a simple conditional:
   if `liveUrl` contains "figma.com" → label "Design" with `PenTool`
   icon; otherwise → label "Live" with `ExternalLink` icon.

2. **`PenTool` icon for design links.** Per spec QA observation #2.
   Verified `PenTool` exists in `lucide-react`.

3. **No image area in Sprint 1 cards.** Per spec QA observation #3.
   The `image` field in the interface is preserved for future use but
   not rendered in Sprint 1. Cards are text-based with title,
   description, tags, outcome, and links.

4. **Project order: BlogTalk → MCP Discord → AI Toolkit → Campus
   Companion.** Per spec QA observation #4. Ordered by technical
   depth — full-stack production app first, then open-source tools,
   then design work.

5. **Section heading: "Featured Projects".** Per spec QA observation #5.
   Subtitle: "Things I've built and designed."

6. **Use `section-container` and `section-padding` utility classes.**
   Per spec QA observation #6. Consistent with hero and skills sections.

7. **Grid: `grid-cols-1 md:grid-cols-2 gap-4 md:gap-6`.** Per spec QA
   observation #9. Single column below 768px, two columns at md+.

8. **Link `aria-label` format standardized.** Per spec QA observation
   #10. Format: `"View {title} live site"`, `"View {title} on GitHub"`,
   `"View {title} design"`.

9. **All URLs fully qualified.** Per spec QA observation #7. Include
   `https://` scheme.

10. **Outcome text sharpened.** Per spec QA observation #8. Each outcome
    includes a concrete deliverable or technical achievement.

---

## Finalized Project Data

### 1. BlogTalk

- **title:** "BlogTalk"
- **description:** "A full-stack personal blog with analytics, auth, and MCP integration built on Next.js and Supabase."
- **techStack:** ["Next.js", "TypeScript", "Supabase", "Prisma", "NextAuth"]
- **outcome:** "Production blog with custom analytics pipeline and MCP tool integration for AI-assisted content management."
- **image:** "" (deferred)
- **liveUrl:** "https://blogtalk-phi.vercel.app/"
- **repoUrl:** "https://github.com/jar285/blogtalk"

### 2. MCP Discord

- **title:** "MCP Discord"
- **description:** "A Model Context Protocol server that gives AI agents full Discord bot capabilities."
- **techStack:** ["TypeScript", "Discord.js", "MCP", "Node.js"]
- **outcome:** "Open-source MCP server enabling AI agents to manage Discord servers, channels, forums, and webhooks."
- **image:** "" (deferred)
- **repoUrl:** "https://github.com/jar285/mcp-discord"

### 3. AI Toolkit

- **title:** "AI Toolkit"
- **description:** "An autonomous research CLI that fetches, summarizes, and organizes web sources for AI agents."
- **techStack:** ["Python", "Clean Architecture", "CLI", "DuckDuckGo API"]
- **outcome:** "CLI tool following Clean Architecture with automated research workflows, citation management, and structured output."
- **image:** "" (deferred)
- **repoUrl:** "https://github.com/jar285/ai-toolkit"

### 4. Campus Companion

- **title:** "Campus Companion"
- **description:** "A UX-focused campus navigation and scheduling app designed in Figma for university students."
- **techStack:** ["Figma", "UX Design", "Prototyping"]
- **outcome:** "End-to-end UX design with interactive prototyping for a multi-screen campus utility app."
- **image:** "" (deferred)
- **liveUrl:** "https://www.figma.com/design/vIh7oksGDMljicrzth29bm/Campus-Companion?node-id=21911-234988&t=jHsBTXVQ6b4h3gvU-0"

---

## Tasks

### Task 1: Populate projects-data.ts

**Action:** Modify `lib/projects-data.ts`:

- Keep existing `Project` interface unchanged
- Populate the `projects` array with all 4 projects in the finalized
  order (BlogTalk → MCP Discord → AI Toolkit → Campus Companion)
- Each entry uses the exact data from the Finalized Project Data section

**Verify:** `npm run typecheck` passes.

---

### Task 2: Create ProjectsSection component

**Action:** Create `components/sections/projects-section.tsx`:

- `"use client"` directive (uses Motion hooks)
- Root element: `<section id="projects" className="section-padding relative overflow-x-clip">`
- Inner container: `<div className="section-container">`
- Background glow: positioned `<div>` with `aria-hidden="true"`,
  `pointer-events-none absolute inset-0`, using inline style with
  radial gradient from `accent` at 3-4% opacity
- Section heading: `<h2>` with `font-display text-display-2
md:text-display-1` — text "Featured Projects"
- Section subtitle: `<p>` with `text-muted-foreground` — "Things I've
  built and designed."
- Project grid: `<div>` with `grid grid-cols-1 md:grid-cols-2 gap-4
md:gap-6`
- Each project card: `motion.div` with `fadeUp` variant, containing:
  - `<h3>` with `font-display text-display-3` for project title
  - `<p>` with `text-muted-foreground text-sm` for description
  - Tech tags: flex wrap container with `rounded-full bg-elevated/50
px-3 py-1 text-xs font-mono text-muted-foreground` per tag
  - Outcome: `<p>` with `text-sm italic text-muted-foreground`
  - Links row: flex container with link buttons
    - GitHub link: `Github` icon + "Source" label (if `repoUrl`)
    - Live link: `ExternalLink` icon + "Live" label, OR `PenTool`
      icon + "Design" label if URL contains "figma.com" (if `liveUrl`)
    - Links styled as subtle inline anchors:
      `text-sm text-accent hover:text-accent/80 transition-colors`
      with `target="_blank" rel="noopener noreferrer"` and `aria-label`
- Card styling: `rounded-lg border border-border/50 bg-surface/50
p-5 md:p-6 transition-all duration-300 hover:border-accent/30
hover:bg-surface/80 hover:shadow-md`
- Container `motion.div` wrapping the grid with `staggerFast` +
  `whileInView` + `viewport={{ once: true, amount: 0.2 }}`
- `useReducedMotion` check: skip Motion variants if true
- Import icons from `lucide-react`: `Github`, `ExternalLink`, `PenTool`

**Verify:** `npm run typecheck` passes.

---

### Task 3: Update page.tsx

**Action:** Modify `app/page.tsx`:

- Import `ProjectsSection` from `@/components/sections/projects-section`
- Render `<ProjectsSection />` below `<SkillsSection />`

**Verify:** `npm run build` passes.

---

### Task 4: Write projects tests

**Action:** Create `__tests__/projects.test.tsx`:

1. **ProjectsSection renders with id="projects"** — section with
   `id="projects"` exists
2. **Section heading visible** — h2 with "Featured Projects"
3. **All four project titles rendered** — "BlogTalk", "MCP Discord",
   "AI Toolkit", "Campus Companion"
4. **Tech tags visible** — at least "TypeScript" and "Python" present
5. **Project count matches data** — card count equals `projects.length`
6. **Links have correct attributes** — at least one link with
   `target="_blank"` and `rel="noopener noreferrer"`

**Verify:** `npm run test` passes with all new + existing tests.

---

### Task 5: Run full verification stack

**Action:** Run all five commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
```

**Verify:** All five pass with zero errors.

---

## Completion Checklist

- [x] `projects` array populated with 4 projects in `lib/projects-data.ts`
- [x] `Project` interface unchanged (no new fields)
- [x] `components/sections/projects-section.tsx` created
- [x] Section has `id="projects"` on root element
- [x] Uses `section-container` and `section-padding` utility classes
- [x] Atmospheric background glow (radial gradient, no hardcoded hex)
- [x] h2 section heading "Featured Projects" with `font-display`
- [x] h3 project titles for each card
- [x] Responsive grid (`grid-cols-1 md:grid-cols-2`)
- [x] Tech stack tags rendered per project
- [x] Outcome text rendered per project
- [x] Action links with `target="_blank"` and `rel="noopener noreferrer"`
- [x] Links have `aria-label` attributes
- [x] Figma link renders with "Design" label
- [x] GitHub links render with "Source" label
- [x] Live links render with "Live" label
- [x] Card hover effects (border glow, bg shift, shadow)
- [x] Scroll-triggered entrance with Motion `whileInView` + stagger
- [x] `useReducedMotion` respected
- [x] `page.tsx` renders `<ProjectsSection />` below `<SkillsSection />`
- [x] Projects tests pass (6 tests)
- [x] All existing tests pass (23 total)
- [x] All five verification commands pass
- [x] No `any` types
- [x] No hardcoded hex values in components

---

## QA Deviations

1. **GitHub icon.** Sprint doc specified `Github` from `lucide-react`.
   `lucide-react` excludes brand icons. Implemented as a local
   `GithubIcon` inline SVG component using the official Octicon path.
   No new dependencies added. No visual difference.

2. **Test count.** Sprint doc stated "17 existing tests". Actual count
   is 17 existing + 6 new = 23 total. All pass.
