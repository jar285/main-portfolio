# Spec — Content Updates (Certificate & Figma Projects)

**Status:** Draft
**Priority:** P1
**Workstream:** `content-updates`

## 1. Problem Statement

The portfolio currently lacks a direct link to the cybersecurity certification and does not showcase UI/UX design work. The goal is to:

1.  **Add a verifiable link** to the CodePath Cybersecurity certificate.
2.  **Add two Figma design projects** (Campus Companion & Cosmic Connect) to the "Other Projects" tier.
3.  **Refactor ProjectCard** to handle conditional GitHub links and custom link labels ("View Design").

---

## 2. Technical Goals

- **Verifiable Links**: Ensure all certificate and design links open in a new tab.
- **Conditional UI**: Only render GitHub links if a repo URL is present; otherwise, skip the button.
- **Responsive Design**: Ensure new project cards are consistent with existing cards across all breakpoints.

---

## 3. Architecture & Proposed Changes

### A. Data Layer (`lib/about-data.ts`, `lib/projects-data.ts`)

- **Modify `Education`**: Add `certificateUrl?: string`.
- **Modify `Project`**: Add `liveUrlLabel?: string`.
- **Update Data**: Link `codepath-cybersecurity-certificate.pdf` and add the two Figma projects.

### B. UI Components (`AboutSection`, `ProjectsSection`)

- **`AboutSection`**: Detect the "CodePath" certification in `education.details` and render it as a link with the `ExternalLinkIcon`.
- **`ProjectCard`**:
  - Switch the primary link label to `project.liveUrlLabel || "Live Demo"`.
  - Add a conditional check around the GitHub button: `{project.repoUrl && !project.isPrivate && ...}`.

---

## 4. Verification Plan

### Automated

- `npm run typecheck && npm run lint && npm run test && npm run build && npm run format:check`.

### Manual

- Verify mobile vs. desktop layout of the new project cards.
- Click all new links; ensure `target="_blank"` is correctly applied.

---

## 5. Sprint Plan

1.  **Modify Data Logic**: Update interfaces and add new project data.
2.  **Update UI**: Implement conditional rendering in `AboutSection` and `ProjectCard`.
3.  **Final Verification**: Run the full stack and check live layout.
