# Change Note — Certificate & Figma Design Projects

**Problem:**
Verifiable proof for the CodePath Cybersecurity certificate was missing, and the portfolio lacked representation of UI/UX design work.

**Scope:**

- `lib/about-data.ts`
- `lib/projects-data.ts`
- `components/sections/about-section.tsx`
- `components/sections/projects-section.tsx`

**Invariants:**

- Featured projects (YU-SurveySite, Blogtalk) remain unchanged.
- No new dependencies added.
- Project card layout preserved; only link visibility and labeling updated.

**Changes:**

- [MODIFY] [about-data.ts](file:///Users/Github/IS322/portfolio/lib/about-data.ts): Added `certificateUrl` to education details.
- [MODIFY] [projects-data.ts](file:///Users/Github/IS322/portfolio/lib/projects-data.ts): Added `liveUrlLabel` and two Figma projects (Campus Companion, Cosmic Connect).
- [MODIFY] [about-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/about-section.tsx): Rendered the certification detail as a clickable link with an icon.
- [MODIFY] [projects-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/projects-section.tsx): Support custom link labels and conditional GitHub link rendering.

**Verification:**

- [x] Manual test: Certificate link opens PDF.
- [x] Manual test: Figma cards show "View Design" and NO GitHub link.
- [x] `npm run build && npm run typecheck`.

**Outcome:**
The portfolio now explicitly showcases verifiable technical certifications and professional design capability.
