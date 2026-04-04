# Sprint 1: About & Experience Section

**Workstream:** `about-and-experience`
**Spec:** `docs/_specs/about-and-experience/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Objective

Implement the About section with a personal narrative, experience
timeline, and education block. The section links to `#about` in the
navbar and renders below `<ProjectsSection />`.

---

## Scope

### In Scope

- Create `lib/about-data.ts` with typed data (Singleton pattern)
- Create `components/sections/about-section.tsx`
- Add `<AboutSection />` to `app/page.tsx` below `<ProjectsSection />`
- Write `__tests__/about.test.tsx`
- Run full verification stack

### Out of Scope

- Developer headshot/photo
- Resume PDF upload or link
- Additional experience entries beyond confirmed role
- Certifications
- Social links (separate footer concern)

---

## Task Breakdown

### Task 1: Create `lib/about-data.ts`

#### Interfaces

```ts
export interface AboutInfo {
  headline: string;
  paragraphs: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  details: string[];
}
```

#### Confirmed Data

```ts
export const aboutInfo: AboutInfo = {
  headline: "About Me",
  paragraphs: [
    "Senior Web Information Systems student at NJIT graduating in May 2026. Currently a Software Engineering Intern at YU & Associates, building full-stack web applications and AI-powered developer tools.",
    "Focused on clean architecture, type-safe code, and polished user experiences. Experienced with React, Node.js, TypeScript, Python, and modern cloud tooling.",
  ],
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "YU & Associates",
    location: "Remote",
    startDate: "2025",
    endDate: "Present",
    description: [
      "Develop and maintain full-stack web applications using modern frameworks and cloud services.",
      "Collaborate with engineering teams on code reviews, testing, and deployment workflows.",
      "Build internal tools and automation to improve developer productivity.",
    ],
  },
];

export const education: Education = {
  degree: "B.S. Web Information Systems",
  school: "New Jersey Institute of Technology",
  location: "Newark, NJ",
  graduationDate: "May 2026",
  details: [],
};
```

**Content note:** The paragraphs and description bullets use confirmed
facts from `agent.md` and `lib/constants.ts`. The YU & Associates
description bullets are general intern responsibilities — the developer
should refine these with specific achievements. The `details` array for
education is empty; add relevant coursework or distinctions if the
developer provides them.

---

### Task 2: Create `components/sections/about-section.tsx`

#### Component Structure

```
<section id="about" className="section-padding relative overflow-x-clip">
  <!-- Atmospheric glow div (aria-hidden) -->
  <div className="section-container relative z-10">
    <!-- Section header: h2 + subtitle (motion stagger) -->
    <!-- About narrative: paragraphs (motion stagger) -->
    <!-- Experience subsection -->
    <!--   h3 "Experience" -->
    <!--   Timeline list (motion stagger) -->
    <!-- Education subsection -->
    <!--   h3 "Education" -->
    <!--   Education block (motion fadeUp) -->
  </div>
</section>
```

#### Design Decisions

1. **Section heading.** `h2` with text "About Me". Subtitle:
   "Background, experience, and education." This follows the
   established heading + subtitle pattern from skills and projects.

2. **No heading for narrative.** The `h2` covers the narrative block.
   Sub-headings start at the "Experience" and "Education" areas.

3. **Timeline layout.** Uses `border-l-2 border-border/50` with
   dot markers (`bg-accent rounded-full w-3 h-3`). Dot position:
   `absolute -left-[7px] top-1.5` to center on the 2px border.
   This creates a clean vertical timeline without requiring a
   third-party component.

4. **Timeline container.** Each experience item:

   ```
   <div className="relative border-l-2 border-border/50 pl-6">
     <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
     <h4 className="font-display text-display-4">{role}</h4>
     <p className="text-sm text-muted-foreground">{company} — {location}</p>
     <p className="font-mono text-xs text-muted-foreground">{startDate} — {endDate}</p>
     <ul className="mt-2 space-y-1">
       {description.map(bullet => <li className="text-sm text-muted-foreground">• {bullet}</li>)}
     </ul>
   </div>
   ```

5. **Education block.** Same visual pattern as experience (border-l
   with dot), but simpler — no bullet list unless `details` has items.

6. **`section-container` and `section-padding`.** Mandatory utility
   classes for consistent section spacing.

7. **`overflow-x-clip`.** Applied to `<section>` to prevent atmospheric
   glow from causing horizontal overflow. Matches hero, skills, and
   projects.

8. **Semantic HTML.**
   - Experience list uses `<div>` with `role` attributes (since it's a
     visual timeline, not a true ordered list). Each item is self-
     contained with heading + body text.
   - Education uses a `<div>` since there's typically one entry.

9. **Content layout.** Single-column, max-width. The narrative,
   experience, and education flow top-to-bottom with `space-y-12`
   between subsections.

10. **Subsection headings.** `h3` for "Experience" and "Education"
    with `font-display text-display-3` class. Same token as project
    card titles for visual consistency within the hierarchy.

11. **Responsive behavior.** The single-column layout inherently works
    on all viewport widths. No grid changes needed. Timeline border
    and dots are visible from 320px upward.

#### Atmospheric Glow

Same pattern as established sections:

```tsx
<div
  className="pointer-events-none absolute inset-0"
  aria-hidden="true"
  style={{
    background:
      "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.04) 0%, transparent 70%)",
  }}
/>
```

#### Motion Choreography

```
Section header (staggerFast)
  → h2 (fadeUp)
  → subtitle (fadeUp)

Narrative block (staggerFast, separate whileInView)
  → paragraph 1 (fadeUp)
  → paragraph 2 (fadeUp)

Experience section (staggerFast, separate whileInView)
  → h3 (fadeUp)
  → each experience item (fadeUp)

Education section (staggerFast, separate whileInView)
  → h3 (fadeUp)
  → education block (fadeUp)
```

Each group has its own `whileInView` trigger with `viewport={{ once: true, amount: 0.2 }}` so animations fire as the user scrolls through the section.

---

### Task 3: Update `app/page.tsx`

```tsx
import { AboutSection } from "@/components/sections/about-section";
// ... existing imports

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
    </>
  );
}
```

---

### Task 4: Write `__tests__/about.test.tsx`

Six tests following the established pattern:

```ts
describe("AboutSection", () => {
  it("renders with id='about'");
  it("displays the section heading");
  it("renders about narrative paragraphs");
  it("displays experience role and company");
  it("displays education degree and school");
  it("renders experience description bullets");
});
```

---

### Task 5: Run Verification Stack

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
```

All five must pass with zero errors in new code.

---

## Verification Criteria

- [ ] `lib/about-data.ts` created with typed exports
- [ ] `AboutInfo`, `Experience`, `Education` interfaces exported
- [ ] About narrative uses confirmed facts from `agent.md`
- [ ] Experience entry for YU & Associates present
- [ ] Education entry for NJIT present
- [ ] `components/sections/about-section.tsx` created
- [ ] Section has `id="about"` on root element
- [ ] Uses `section-container` and `section-padding` utility classes
- [ ] `overflow-x-clip` on root `<section>`
- [ ] Atmospheric background glow (no hardcoded hex)
- [ ] `h2` section heading "About Me" with `font-display`
- [ ] `h3` subsection headings for "Experience" and "Education"
- [ ] Timeline visual with `border-l-2` and accent dots
- [ ] Experience description as bullet list
- [ ] Scroll-triggered entrance with Motion `whileInView` + stagger
- [ ] `useReducedMotion` respected
- [ ] `page.tsx` renders `<AboutSection />` below `<ProjectsSection />`
- [ ] About tests pass (6 tests)
- [ ] All existing tests pass (23 tests)
- [ ] All five verification commands pass
- [ ] No `any` types
- [ ] No hardcoded hex values in components

---

## Completion Checklist

- [x] `lib/about-data.ts` created with typed exports
- [x] `AboutInfo`, `Experience`, `Education` interfaces exported
- [x] About narrative uses confirmed facts from `agent.md`
- [x] Experience entry for YU & Associates present
- [x] Education entry for NJIT present
- [x] `components/sections/about-section.tsx` created
- [x] Section has `id="about"` on root element
- [x] Uses `section-container` and `section-padding` utility classes
- [x] `overflow-x-clip` on root `<section>`
- [x] Atmospheric background glow (no hardcoded hex)
- [x] `h2` section heading "About Me" with `font-display`
- [x] `h3` subsection headings for "Experience" and "Education"
- [x] Timeline visual with `border-l-2` and accent dots
- [x] Experience description as bullet list
- [x] Scroll-triggered entrance with Motion `whileInView` + stagger
- [x] `useReducedMotion` respected
- [x] `page.tsx` renders `<AboutSection />` below `<ProjectsSection />`
- [x] About tests pass (6 tests)
- [x] All existing tests pass (23 tests)
- [x] All five verification commands pass
- [x] No `any` types
- [x] No hardcoded hex values in components

---

## QA Deviations

None detected. The implementation precisely matches the specification.
