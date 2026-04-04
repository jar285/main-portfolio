# Feature Spec: About & Experience Section

**Workstream:** `about-and-experience`
**Priority:** P2
**Status:** Draft
**Date:** 2026-04-03

---

## Problem Statement

The portfolio has no About section. The navbar links to `#about` which
does not exist. Visitors who have seen the developer's skills and
projects cannot learn who built them — their background, education, or
professional experience. This is the section that converts "interesting
portfolio" into "person I want to hire or collaborate with."

`agent.md` content rule #4 requires content to be current. Content
rule #5 requires every section to earn its place. The design reference
standard says about sections are judged on credibility, readability,
information order, and narrative relevance.

---

## Design Goals

1. **Credibility through specifics.** Name, role, school, graduation
   date, and employer — concrete facts, not vague descriptions.
2. **Readability through structure.** Distinct subsections: a personal
   intro, then experience, then education. Each scannable at a glance.
3. **Information order matches hiring context.** Lead with who the
   developer is and what they do now, then show professional history,
   then education — mirrors how a recruiter reads a resume.
4. **Narrative relevance.** Every sentence contributes to a hiring or
   collaboration decision. No personality trivia, no hobbies, no
   filler text — per content rule #5.
5. **Atmospheric depth.** Consistent background glow with other sections.
6. **Choreographed entrance.** Scroll-triggered staggered reveals
   consistent with the hero, skills, and projects sections.
7. **Mobile-first responsive.** Readable from 320px upward. Timeline
   elements stack cleanly on mobile.

---

## Architecture

### Component Tree

```
AboutSection
├── Background glow div (atmospheric, aria-hidden)
├── Section header (h2 + subtitle)
├── About narrative (paragraph block)
├── Experience timeline
│   └── ExperienceItem (×N)
│       ├── Role + company
│       ├── Date range
│       └── Description bullets
└── Education block
    ├── Degree + school
    ├── Graduation date
    └── Relevant details
```

### File Structure

| File                                    | Purpose                        |
| --------------------------------------- | ------------------------------ |
| `lib/about-data.ts`                     | Typed about/experience data    |
| `components/sections/about-section.tsx` | Section component              |
| `app/page.tsx`                          | Renders section below Projects |
| `__tests__/about.test.tsx`              | Render + content tests         |

### Data Flow

```
about-data.ts (Singleton)
  → aboutInfo, experiences, education
    → AboutSection reads data
      → renders narrative + timeline + education
```

### Data Interfaces

```ts
interface AboutInfo {
  headline: string;
  paragraphs: string[];
}

interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  details: string[];
}
```

### Content Data

**About narrative:**

- Headline: developer name or a one-line positioning statement
- 1-2 paragraphs: who they are, what they do, what drives them.
  Written from confirmed facts in `agent.md`: senior Web Information
  Systems student at NJIT, Software Engineering Intern at YU &
  Associates, graduating May 2026. Focus areas: full-stack web
  development, AI tooling, developer experience.

**Experience:**

1. **Software Engineering Intern — YU & Associates**
   - Current role as documented in `agent.md`
   - Location, date range, and description bullets will use confirmed
     information only. Placeholder bullets describe general intern
     responsibilities until the developer provides specifics.

**Education:**

1. **B.S. Web Information Systems — NJIT**
   - New Jersey Institute of Technology, Newark, NJ
   - Expected graduation: May 2026
   - Relevant details from confirmed project work

### Timeline Layout

Experience and education share a vertical timeline visual:

```
  ●  Role / Degree
  │  Company / New Jersey Institute of Technology — Newark, NJ
  │  Date range
  │
  │  • Description bullet
  │  • Description bullet
  │
  ●  Next entry
```

The timeline line uses `border-l-2 border-border/50`. The dot uses
`bg-accent rounded-full w-3 h-3` positioned on the left border.

### Section Layout

The section uses a single-column layout (no sidebar). Content reads
top-to-bottom: narrative → experience → education.

Subsection headings (`h3`) separate the three content areas:

1. "About" or no sub-heading — the narrative
2. "Experience" — the work timeline
3. "Education" — the academic timeline

---

## Applicable Design Patterns

| Pattern   | Application                                        |
| --------- | -------------------------------------------------- |
| Singleton | `about-data.ts` — single source of truth           |
| Composite | AboutSection > narrative + timeline + education    |
| Strategy  | Motion `whileInView` for scroll-triggered entrance |

---

## Accessibility Requirements

- Section has `id="about"` matching `navLinks` anchor
- `<h2>` section heading, `<h3>` per subsection — proper hierarchy
- Timeline uses `<ol>` or `<ul>` with semantic list items
- Dates/locations rendered as text — no accessibility issues
- Background glow div has `aria-hidden="true"`
- `prefers-reduced-motion` respected via `useReducedMotion`
- Experience descriptions in `<ul>` with `<li>` items

---

## Performance Budget

| Metric            | Target | Notes                         |
| ----------------- | ------ | ----------------------------- |
| Total JS increase | < 5 KB | Data + component, no new deps |
| Animation FPS     | 60fps  | CSS transitions + Motion      |
| Images            | 0 KB   | Text-only section             |

No new dependencies required. All needed libraries (Motion, lucide-react)
are already installed.

---

## Testing Strategy

1. **Section renders with id="about"**
2. **Section heading visible** — h2 with "About Me" or equivalent
3. **About narrative rendered** — at least one paragraph of text
4. **Experience entry visible** — "YU & Associates" or role text
5. **Education entry visible** — "NJIT" or degree text
6. **Timeline structure** — list elements present

---

## Sprint Plan

### Sprint 1: Core About & Experience Section

- Create `lib/about-data.ts` with typed data
- Create `components/sections/about-section.tsx` with narrative,
  timeline, and education
- Add to `page.tsx` below `<ProjectsSection />`
- Write tests
- Run full verification stack

---

## Future Considerations

- **Developer-provided bio.** The narrative paragraphs use confirmed
  facts only. The developer may want to refine the wording or add
  personal flavor.
- **Additional experience entries.** The interface supports multiple
  entries. New roles can be added to the data array.
- **Resume download.** The hero "View Resume" CTA could link to a PDF.
  This is a separate concern — not part of this section.
- **Headshot/photo.** A professional photo could enhance the about
  section. Currently text-only per Sprint 1 scope.
- **Certifications.** Could be added to the education block if the
  developer has relevant certifications.
