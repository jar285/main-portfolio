# Change Note — Light Theme Projects Delay Fix

**Problem:**
On mobile and desktop reloads, the Projects section in Light Theme exhibited a ~1s rendering delay. This was caused by `transition-all` on Project cards fighting with Framer Motion's entrance animations during the "hydration flip" (where the theme state initializes and potentially swaps CSS classes).

**Scope:**

- `components/sections/projects-section.tsx`

**Invariants:**

- No changes to visual design or layout.
- No changes to dynamic import strategy.
- Motion physics preserved.

**Changes:**

- [MODIFY] [projects-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/projects-section.tsx): Replaced `transition-all` with `transition-colors` on the `ProjectCard` component. This prevents the browser from trying to transition `opacity` and `transform` properties that are already being managed by Framer Motion.

**Verification:**

- [x] Manual test: Reload at `#projects` in Light Theme — delay is gone.
- [x] Manual test: Toggle themes back and forth — no stutter or animation re-triggers.
- [x] `npm run typecheck` — PASSED.
- [x] `npm run lint` — PASSED.
- [x] `npm run test` — PASSED.
- [x] `npm run build` — PASSED.
- [x] `npm run format:check` — PASSED.

**Outcome:**
The projects section now renders at equivalent speeds in both Light and Dark themes, maintaining the performance budget and design intent.
