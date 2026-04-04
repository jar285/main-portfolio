# Sprint 1 — Hydration & Layout Fixes

**Goal:** Resolve critical light-theme blank screen and mobile hero layout space.

---

## Technical Targets

### 1. Hero Section Visibility (`components/sections/hero-section.tsx`)

- **Modify**: Set `initial={false}` on the main `motion.div` container.
- **Modify**: Change `min-h-screen` to `min-h-[100dvh]`.
- **Modify**: Adjust `pt-16` to `pt-12` (mobile) and `md:pt-16`.
- **Verify**: Hero is visible on first paint in Light Theme. Headline top edge `< 250px` on mobile.

### 2. Section Reveal Guard (`components/ui/section-reveal.tsx`)

- **Modify**: Add a 2-second safety timeout.
- **Logic**:
  ```tsx
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsFallbackVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  ```
- **Verify**: Content appears after 2s even if hydration or IntersectionObserver fails.

### 3. Verification Stack

- **Run**: `npm run typecheck && npm run lint && npm run test && npm run build && npm run format:check`.
- **Manual**: Verification of live behaviour in browser tool (simulated mobile).

---

## Tasks

1.  [x] **Modify HeroSection**
2.  [x] **Modify SectionReveal**
3.  [x] **Full Verification**
4.  [x] **Final QA**
