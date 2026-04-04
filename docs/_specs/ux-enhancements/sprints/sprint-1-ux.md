# Sprint 1: UX Enhancements (Hero Blob & Magnetic Hover)

**Workstream:** `ux-enhancements`
**Spec:** `docs/_specs/ux-enhancements/spec.md`
**Date:** 2026-04-03
**Status:** Complete

---

## Objective

Build and implement the generic `<MagneticHover>` wrapper framework alongside customizing the layout geometry of the `<HeroSection>` by adding a soft, organic animated background component beneath the existing atmospheric layer constraints.

---

## Scope

### In Scope

- Craft `<MagneticHover>` component mapping spring animations to X/Y offset values isolated to `MotionValue` bounds.
- Wrap main Desktop navigation links `<nav>` iteratively natively.
- Modify `tailwind.config.ts` exporting a new keyframe and animation loop sequence (`blob`).
- Insert `Blob` node into `<HeroSection>` ensuring perfect responsive centering mapping `inset-0`.

### Out of Scope

- Applying magnetic properties outside the `Navbar` bounds (Keep it scoped securely for this phase iteration to protect performance budget).
- Generating sharp vector-edged geometry (Keeping Blob soft).

---

## Task Breakdown

### Task 1: Add Animation Design Tokens (Blob Mechanics)

**Action:** Inject keyframes into the global Tailwind framework layer.

1. Modify `tailwind.config.ts`.
2. Within `theme.extend.keyframes`, create a `blob` animation mapping `transform: translate(), scale()` across 0%, 33%, 66%, and 100% ticks.
3. Within `theme.extend.animation`, attach it to a 7s infinite loop string mapping: `blob "blob 7s infinite"`.

_Verify:_ `npm run build` succeeds parsing configuration changes without CSS module ejection errors.

### Task 2: Build `MagneticHover` Utility Wrapper

**Action:** Scaffold the interactions wrapper safely capturing DOM rects.

1. Create `components/ui/magnetic-hover.tsx`.
2. Construct Framer components using `useMotionValue(0)` and `useSpring` intercepting bounds via `getBoundingClientRect()`.
3. Wrap functionality safely inside a media query match hook for `(pointer: fine)` checking client validity to bypass mobile execution.
4. Export the functional component encapsulating passing children cleanly via `cloneElement` or mapping a nested `motion.div`.

_Verify:_ `npm run typecheck` ensures Ref forwarding and prop interface mappings are strictly typed.

### Task 3: Update `Navbar` Integration

**Action:** Map the new utility across layout navigation vectors.

1. Navigate to `components/layout/navbar.tsx`.
2. Import `MagneticHover` logic.
3. Overwrite the iterative map producing the top nav loops inside the `<nav className="hidden... md:flex">` structure.
4. Supply a uniform `strength={20}` equivalent displacement variable.

_Verify:_ `npm run test` against Navbar ensures component hierarchy handles the wrapper rendering correctly.

### Task 4: Enhance `HeroSection` Geometry Layer

**Action:** Construct the soft visual Blob element directly underneath existing visuals.

1. Open up `components/sections/hero-section.tsx`.
2. Beneath the primary glow container, add an Absolute positioned `div` mapping `bg-accent/20 blur-3xl animate-blob`.
3. Wrap it alongside a `prefersReducedMotion` check hook mirroring global constants.

_Verify:_ Hero components properly isolate the blob without horizontal scroll triggering (`overflow-x-clip` still active).

### Task 5: Run Verification Stack

**Action:** Exhaustive CLI Pipeline validation against code additions formatting and typing checks.

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

---

## Verification Criteria

### Automated Tests

- Typechecker returns 0 structural errors across all mapped Ref integrations.
- Prettier auto-chains properly formatted `MagneticHover` logic hooks across the UI files structure.

### Manual Verification Target Breakpoints

1. **Desktop (1440px):**
   - Check that interacting with standard UI navigation bounds via mouse hover physically displaces the anchor node cleanly without text jitter.
   - Verify that exiting the component boundaries uniformly snaps the link text back exactly into its default flex gap positioning.
   - Inspect background visual properties confirming Blob rendering exists underneath text properties mapping blurred color tones smoothly.
2. **Tablet (768px):**
   - Verify scaling logic keeps Hero Blob tightly bounded without expanding page Width constraints (`w-full overflow-clip`).
3. **Mobile (375px):**
   - Verify that Mobile touch interfaces do NOT attempt to invoke `MagneticHover` ghost actions, checking `(pointer: fine)` overrides natively bypassing the Framer bounds execution correctly.
4. **Reduced Motion State:**
   - Modify OS rendering tools to disable motion properties and strictly verify `MagneticHover` and `HeroBlob` nodes strip iterative animation strings rendering plain links safely.

---

## Completion Checklist

- [x] `tailwind.config.ts` successfully extended with blob strings
- [x] `components/ui/magnetic-hover.tsx` mapped returning `motion.div`
- [x] Target coordinates derived via nested `ref.current.getBoundingClientRect()`
- [x] Hooks utilize `useSpring` scaling offset displacement properties efficiently.
- [x] `components/layout/navbar.tsx` loops anchor arrays safely around wrapper bounds.
- [x] Mobile bypass media bounds attached stopping execution on pointer-coarse.
- [x] `components/sections/hero-section.tsx` contains modified absolute blob layer wrapper.
- [x] `prefers-reduced-motion` strictly silences execution rendering standard links manually.
- [x] Breakpoint manual checks completed verifying visual UX bounds.
- [x] CLI format, Lint, Test checks execute flawlessly.

---

## QA Deviations

Minimal. Caught an initial ESLint error dictating state hooks mapping within useEffect synchronization limits inside `magnetic-hover.tsx`. Passed successfully after mitigating utilizing native `requestAnimationFrame` bounds completely bypassing render blocks gracefully.
Also successfully patched jsdom failures tracking window.matchMedia via `vitest.setup.ts`.
