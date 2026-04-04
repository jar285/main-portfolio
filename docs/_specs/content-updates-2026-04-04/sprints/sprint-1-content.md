# Sprint 1 — Content Updates (Certificate & Figma Projects)

**Goal:** Resolve link verifiability and showcase design capability by adding specific certification and UI/UX projects.

---

## Technical Targets

### 1. Data Layer Enhancements

- **Modify**: `lib/about-data.ts` (Add `certificateUrl`).
- **Modify**: `lib/projects-data.ts` (Add `liveUrlLabel`).
- **Verify**: Type safety is maintained throughout the build.

### 2. UI Enhancements

- **Modify**: `components/sections/about-section.tsx` (Add direct link to certificate).
- **Modify**: `components/sections/projects-section.tsx` (Implement conditional GitHub buttons and "View Design" labels).
- **Verify**: Mobile layout is consistent.

### 3. Verification Stack

- **Run**: `npm run typecheck && npm run lint && npm run test && npm run build && npm run format:check`.
- **Manual**: Verification of clickable links and new project cards.

---

## Tasks

1.  [ ] **Modify About & Project Data Types**
    - Target: `lib/about-data.ts`, `lib/projects-data.ts`.
    - Action: Add `certificateUrl` and `liveUrlLabel` to respective interfaces.

2.  [ ] **Populate Content**
    - Target: `lib/about-data.ts`, `lib/projects-data.ts`.
    - Action: Add the certificate path and the two Figma projects.

3.  [ ] **Update AboutSection UI**
    - Target: `components/sections/about-section.tsx`.
    - Action: Render the certificate detail as a verifiable link with an icon.

4.  [ ] **Update ProjectsSection UI**
    - Target: `components/sections/projects-section.tsx`.
    - Action: Implement conditional GitHub logic and label binding.

5.  [ ] **Final Verification**
    - Run the full stack and check live behavior.
