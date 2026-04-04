# Spec: Scroll and Motion (`scroll-and-motion`)

Implement a cohesive motion system that guides user attention through scroll-triggered reveals and provides spatial orientation via sticky scroll-spy navigation.

## Goals

- **Section Reveals**: major sections (Skills, Projects, About, Footer) slide into view on scroll.
- **Scroll-Spy Nav**: Navbar accurately reflects the section currently in the viewport.
- **Hero Headline**: Word-by-word staggered reveal upon initial load.

## User Review Required

> [!IMPORTANT]
> **Reduced Motion**: All animations will instantly fall back to static states if `prefers-reduced-motion` is detected.
> **Performance**: Animations are restricted to `transform` and `opacity` to maintain 60fps across devices. No layout-altering properties will be animated.

## Proposed Changes

### 1. Hero Headline Animation

#### [MODIFY] [hero-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/hero-section.tsx)

- Wrap individual lines (Name → Role → Tagline) in motion-aware container spans.
- Apply a sequential staggered reveal using `staggerChildren` with a total sequence duration < 1.2s.
- Variants will use a subtle `y` offset and `opacity` transition to create an editorial "landing" effect.

### 2. Section Entrance Reveals

#### [MODIFY] [skills-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/skills-section.tsx)

#### [MODIFY] [projects-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/projects-section.tsx)

#### [MODIFY] [about-section.tsx](file:///Users/Github/IS322/portfolio/components/sections/about-section.tsx)

- Wrap section contents in a `motion.div` using `whileInView="visible"` and `initial="hidden"`.
- Use the `fadeUp` variant from `lib/motion.ts`.
- Set `viewport={{ once: true, amount: 0.2 }}` to ensure the animation triggers early but doesn't repeat.

### 3. Scroll-Spy Navigation

#### [MODIFY] [navbar.tsx](file:///Users/Github/IS322/portfolio/components/layout/navbar.tsx)

- Replace static threshold logic with a robust `useScroll` hook to track scroll progression.
- Refine the active section detection to highlight the nav link corresponding to the largest visible section area.
- Desktop: Ensure the active indicator transition is smooth (using Motion's `layoutId` if applicable).

## Open Questions

- For the Hero reveal, do you prefer a word-by-word reveal (standard tech aesthetic) or a line-by-line reveal (more editorial)?

## Verification Plan

### Automated Tests

- `npm run build`: Verify First Load JS remains < 200 KB.
- `npx lighthouse`: Verify Accessibility score ≥ 90 (Reduced Motion check).

### Manual Verification

- Scroll slowly through the page to confirm each section animates exactly once.
- Verify the Navbar active state updates as each section header passes the 30% scroll threshold.
