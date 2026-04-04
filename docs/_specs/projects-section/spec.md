# Feature Spec: Projects Section

**Workstream:** `projects-section`
**Priority:** P1
**Status:** Draft
**Date:** 2026-04-03

---

## Problem Statement

The portfolio has no projects section. The hero CTA "View Projects"
links to `#projects` which does not exist. Visitors cannot evaluate
the developer's work, which is the primary purpose of a portfolio.
`agent.md` content rule #1 requires each project to show outcomes,
not just descriptions.

---

## Design Goals

1. **Outcome-focused cards.** Each project card communicates what was
   built, what stack was used, and what the outcome or learning was —
   per content rule #1.
2. **Visual clarity and comparison ease.** Cards use a consistent
   layout so visitors can scan and compare projects quickly — per
   design reference standard for project sections.
3. **Tech stack as tags.** Technology names appear as inline tags for
   quick scanning.
4. **Actionable links.** Each card links to the live project, source
   repo, or design artifact where available.
5. **Atmospheric depth.** Subtle background glow consistent with the
   hero and skills sections.
6. **Choreographed entrance.** Cards animate in with scroll-triggered
   staggered reveals.
7. **Mobile-first responsive.** Single column on mobile, two columns
   on desktop. Cards stack cleanly at all breakpoints.

---

## Architecture

### Component Tree

```
ProjectsSection
├── Background glow div (atmospheric, aria-hidden)
├── Section header (h2 + subtitle)
└── Project grid
    └── ProjectCard (×4)
        ├── Card header (title + description)
        ├── Tech stack tags
        ├── Outcome text
        └── Action links (live / repo / design)
```

### File Structure

| File                                       | Purpose                        |
| ------------------------------------------ | ------------------------------ |
| `lib/projects-data.ts`                     | Typed project data (Singleton) |
| `components/sections/projects-section.tsx` | Section component              |
| `app/page.tsx`                             | Renders section below Skills   |
| `__tests__/projects.test.tsx`              | Render + content tests         |

### Data Flow

```
projects-data.ts (Singleton)
  → projects array
    → ProjectsSection reads data
      → maps to ProjectCard elements
```

### Project Interface

The existing `Project` interface in `lib/projects-data.ts` defines:

```ts
interface Project {
  title: string;
  description: string;
  techStack: string[];
  outcome: string;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}
```

This interface needs one addition:

- `figmaUrl?: string` — for projects that have a design artifact
  (Campus Companion) rather than a live deployment

The `image` field will use a placeholder gradient for Sprint 1. Actual
project screenshots can be added in a future polish sprint without
changing the data contract.

### Project Data

Four projects, ordered by relevance and recency:

1. **Campus Companion**
   - Description: A UX-focused campus navigation and scheduling app
     designed in Figma for university students.
   - Tech stack: Figma, UX Design, Prototyping
   - Outcome: End-to-end UX design with interactive prototyping for
     a multi-screen campus utility app.
   - Links: Figma design (figmaUrl)

2. **BlogTalk**
   - Description: A full-stack personal blog with analytics, auth,
     and MCP integration built on Next.js and Supabase.
   - Tech stack: Next.js, TypeScript, Supabase, Prisma, NextAuth
   - Outcome: Production blog with custom analytics pipeline and
     MCP tool integration for AI-assisted content management.
   - Links: GitHub repo, live site (blogtalk-phi.vercel.app)

3. **AI Toolkit**
   - Description: An autonomous research CLI that fetches, summarizes,
     and organizes web sources for AI agents.
   - Tech stack: Python, Clean Architecture, CLI, DuckDuckGo API
   - Outcome: CLI tool following Clean Architecture with automated
     research workflows and citation management.
   - Links: GitHub repo

4. **MCP Discord**
   - Description: A Model Context Protocol server that gives AI agents
     full Discord bot capabilities.
   - Tech stack: TypeScript, Discord.js, MCP, Node.js
   - Outcome: Open-source MCP server enabling AI agents to manage
     Discord servers, channels, forums, and webhooks.
   - Links: GitHub repo

### Link Strategy

Each card can have up to three link types:

| Link type | Icon           | Label    | Condition         |
| --------- | -------------- | -------- | ----------------- |
| Live      | `ExternalLink` | "Live"   | `liveUrl` exists  |
| Source    | `Github`       | "Source" | `repoUrl` exists  |
| Design    | `Figma`        | "Design" | `figmaUrl` exists |

Links open in new tabs with `target="_blank" rel="noopener noreferrer"`.
The `Figma` icon is not in `lucide-react`. Use `Pen` or `PenTool` as a
substitute, or render a simple text label "Design" without an icon.

### Card Layout

Each card is a self-contained unit:

```
┌─────────────────────────────────┐
│  Title                          │
│  Description (1-2 lines)        │
│                                 │
│  [tag] [tag] [tag] [tag]        │
│                                 │
│  Outcome text (italic/muted)    │
│                                 │
│  [Live] [Source] [Design]       │
└─────────────────────────────────┘
```

Card styling:

- `rounded-lg border border-border/50 bg-surface/50`
- Padding: `p-5 md:p-6`
- Hover: `hover:border-accent/30 hover:bg-surface/80 hover:shadow-md`
  with `transition-all duration-300`

Tech tags:

- `rounded-full bg-elevated/50 px-3 py-1 text-xs font-mono
text-muted-foreground`

---

## Applicable Design Patterns

| Pattern   | Application                                        |
| --------- | -------------------------------------------------- |
| Singleton | `projects-data.ts` — single source of truth        |
| Composite | ProjectsSection > ProjectCard > tags + links       |
| Factory   | CVA or conditional rendering for link types        |
| Strategy  | Motion `whileInView` for scroll-triggered entrance |

---

## Accessibility Requirements

- Section has `id="projects"` matching `navLinks` anchor
- `<h2>` section heading, `<h3>` per project title — proper hierarchy
- Links have descriptive accessible names (e.g., "View BlogTalk source
  on GitHub") via `aria-label`
- `target="_blank"` links include `rel="noopener noreferrer"`
- Tech tags are inline text — no accessibility issues
- Background glow div has `aria-hidden="true"`
- Decorative icons have `aria-hidden="true"`
- `prefers-reduced-motion` respected via `useReducedMotion`

---

## Performance Budget

| Metric            | Target    | Notes                          |
| ----------------- | --------- | ------------------------------ |
| Total JS increase | < 5 KB    | Data + component, no new deps  |
| Animation FPS     | 60fps     | CSS transitions + Motion       |
| Images            | 0 KB (S1) | Placeholder gradient, no files |

No new dependencies required. All needed libraries (Motion, lucide-react)
are already installed.

---

## Testing Strategy

1. **Section renders with id="projects"**
2. **Section heading visible** — h2 with "Featured Projects"
3. **All four project titles rendered**
4. **Tech tags visible** — at least one known tag per project
5. **Project count matches data** — card count equals `projects.length`
6. **Links render with correct attributes** — `target="_blank"`,
   `rel="noopener noreferrer"`

---

## Sprint Plan

### Sprint 1: Core Projects Section

- Populate `projects-data.ts` with 4 projects
- Create `projects-section.tsx` with card grid
- Add to `page.tsx` below `<SkillsSection />`
- Write tests
- Run full verification stack

---

## Future Considerations

- **Project screenshots.** Replace placeholder gradients with actual
  images when available. The `image` field in the interface is ready.
- **Project detail pages.** If the portfolio grows, individual project
  pages with case studies could be added. The current card links to
  external resources.
- **Filtering.** A tag filter (e.g., "Show only Python projects")
  could be added if the project count exceeds 6-8.
- **Card hover effects.** Enhanced micro-interactions (tilt, parallax)
  could be added via Aceternity UI components in a polish sprint.
