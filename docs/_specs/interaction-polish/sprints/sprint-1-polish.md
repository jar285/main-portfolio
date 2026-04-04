# Sprint 1: Interaction Polish (`interaction-polish`)

**Goal:** Implement premium Motion-only haptics, a real-time status indicator, and a global scroll utility.

## Execution Roadmap

### Task 1: Status Indicator Component

- [ ] 1.1: Create `components/ui/status-indicator.tsx`.
- [ ] 1.2: Implement `bg-success` pulsing dot with `animate-ping` (absolute) + `animate-pulse` (base).
- [ ] 1.3: Set text to "Building AI-powered tools at YU & Associates".
- [ ] 1.4: Inject into `Navbar.tsx` (Desktop) beside the logo.
- [ ] 1.5: Inject into `MobileMenu.tsx` (Mobile) at the bottom of the nav list.

### Task 2: Back-to-Top Utility

- [ ] 2.1: Create `components/ui/back-to-top.tsx` using `useScroll` and `AnimatePresence`.
- [ ] 2.2: Implement show/hide logic for `scrollY > 400px`.
- [ ] 2.3: Style as a floating `<button>` at the bottom-right with standard spring transitions.
- [ ] 2.4: Inject into `app/layout.tsx` at the root level.

### Task 3: Project Card Haptics

- [ ] 3.1: Modify `components/sections/projects-section.tsx`'s `ProjectCard`.
- [ ] 3.2: Add `whileHover={{ y: -4, borderColor: "hsl(var(--accent) / 0.4)" }}`.
- [ ] 3.3: Ensure `transition={snapTransition}` for tactile feedback.

### Task 4: Verification

- [ ] 4.1: Perform `npm run build` and verify bundle budget (< 200 KB).
- [ ] 4.2: Verify status indicator visibility in the mobile menu at 320px.
- [ ] 4.3: Verify Back-to-Top button accessibility (Tab index + ARIA label).

## Verification Checklist

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run format:check`
- [ ] `npm run build`
- [ ] Status indicator hidden in header @ 320px, visible in menu.
- [ ] Back-to-Top button fades in after 400px scroll.
- [ ] Project cards exhibit subtle lift + accent border on hover.
