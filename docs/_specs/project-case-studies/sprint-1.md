# Sprint 1: Project Case Studies (`project-case-studies`)

**Goal:** Transform the projects section into a production-grade portfolio showcase with a two-tier layout (Featured/Other) and impact-focused content (Problem/Outcome).

## Execution Roadmap

### Task 1: Data Model Expansion

- [x] 1.1: Add `problem: string` and `isFeatured: boolean` to `Project` interface in `lib/projects-data.ts`.
- [x] 1.2: Migrate the current project list to the comprehensive Case Study data provided by the user.
- [x] 1.3: Set `BlogTalk` and `gINT Log Converter` as **Featured** projects.

### Task 2: Component Architecture (Tiered Layout)

- [x] 2.1: Refactor `ProjectsSection` in `projects-section.tsx` to handle `featuredProjects` and `otherProjects` filtering.
- [x] 2.2: Implement the `FeaturedGrid` for priority projects with 1-column layout and increased padding.
- [x] 2.3: Implement the `SecondaryGrid` for other projects in a compact 2-column or 3-column format.

### Task 3: Case Study Card Polish

- [x] 3.1: Upgrade cards to show high-contrast "Problem" and "Outcome" labels.
- [x] 3.2: Map tech tags to semantic Tailwind badges.
- [x] 3.3: Ensure action links (GitHub/Live) have distinctive focus rings.

### Task 4: Verification

- [x] 4.1: Perform `npm run build` and bundle audit (Target < 200 KB).
- [x] 4.2: Verify layout shift (CLS) remains at 0 during page navigation.

## Verification Checklist

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run format:check`
- Bundle size: < 200 KB initial JS
- Accessibility: ≥ 90 Lighthouse
