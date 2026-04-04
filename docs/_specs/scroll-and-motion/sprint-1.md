# Sprint 1: Scroll and Motion (`scroll-and-motion`)

**Goal:** Implement a cohesive motion system with line-by-line hero reveals, scroll-triggered section entrances, and robust scroll-spy navigation.

## Execution Roadmap

### Task 1: Hero Staggered Reveal

- [ ] 1.1: Refactor `HeroSection.tsx` to wrap Name, Role, and Tagline in motion-aware container spans.
- [ ] 1.2: Implement sequential line-reveal variants (`y` offset + opacity).
- [ ] 1.3: Tune `staggerChildren` to ensure total sequence duration is < 1.2s.

### Task 2: Section Entrance Reveals

- [ ] 2.1: Implement `SectionReveal` wrapper component using `useInView` and `fadeUp` variant.
- [ ] 2.2: Wrap `SkillsSection`, `ProjectsSection`, `AboutSection`, and `Footer` in the reveal wrapper.
- [ ] 2.3: Configure `viewport={{ once: true, amount: 0.2 }}` for early engagement.

### Task 3: Scroll-Spy Navigation

- [ ] 3.1: Refactor `Navbar.tsx` to use `useScroll` and `useMotionValue` for scroll tracking.
- [ ] 3.2: Implement intersection logic that calculates the active section based on scroll progress and section offsets.
- [ ] 3.3: Ensure smooth active indicator transitions in both Desktop and Mobile nav.

### Task 4: Verification

- [ ] 4.1: Perform `npm run build` and bundle audit (Target < 200 KB).
- [ ] 4.2: Verify `prefers-reduced-motion` compliance (static fallbacks).
- [ ] 4.3: Audit 60fps performance on mobile viewport.

## Verification Checklist

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run format:check`
- Bundle size: < 200 KB initial JS
- Accessibility: ≥ 90 Lighthouse
- Performance: 60fps animations
