# Spec: Project Case Studies (`project-case-studies`)

Transform the static projects section into a production-grade portfolio showcase focusing on impact and problem-solving through a two-tier "Case Study" layout.

## Goals

- Upgrade `projects-data.ts` to support high-impact metrics (Problem vs. Outcome).
- Implement a hierarchical layout (Featured vs. Other) to curate attention.
- Enhance project cards with typed tech badges and action-oriented links.

## User Review Required

> [!IMPORTANT]
> **Data Integrity**: The agent will use the content provided in the workstream request. No projects will be invented.
> **Layout Strategy**: "Featured" projects will be displayed as primary cards (larger/more detail), while "Other" projects will appear in a sub-grid.

## Proposed Changes

### 1. Data Model Expansion

#### [MODIFY] [projects-data.ts](file:///Users/Github/IS322/portfolio/lib/projects-data.ts)

- Add `problem: string` (One-line problem statement).
- Add `isFeatured: boolean` (Controls visibility in the primary tier).
- Refine `outcome` and `description` based on the provided table.

### 2. UI Component Architecture

#### [MODIFY] [projects-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/projects-section.tsx)

- **Two-Tier Filter**: Separate `projects` into `featuredProjects` and `otherProjects` based on the `isFeatured` flag.
- **Featured Layout**: Render featured projects as large cards with increased padding and potentially full-width on mobile.
- **Other Grid**: Render remaining projects in a compact 2-column or 3-column grid.
- **Refined Card Data**:
  - **Problem**: Show as a subtitled "The Challenge".
  - **Outcome**: Show as a highlighted "The Result" with a separate background/border for emphasis.

### 3. Motion & Interaction

- Maintain `fadeUp` and `staggerFast` entrance animations.
- Ensure all interactive links have high-contrast focus rings for WCAG AA compliance.

## Open Questions

- Do you have specific screenshots or placeholders for the "Featured" projects, or should I continue using atmospheric SVG backgrounds for now?

## Verification Plan

### Automated Tests

- `npm run build`: Verify First Load JS remains < 200 KB.
- `npx lighthouse`: Verify Accessibility score ≥ 90.

### Manual Verification

- Verify the layout correctly separates Featured from Other projects.
- Verify links open in new tabs with `rel="noopener noreferrer"`.
