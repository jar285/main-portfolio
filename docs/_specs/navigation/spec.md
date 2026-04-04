# Navigation — Feature Spec

**Workstream:** `navigation`
**Priority:** P1
**Author:** AI Agent (governed by `agent.md` v1.0.0)
**Date:** 2026-04-03
**Status:** Draft

---

## Problem Statement

The portfolio currently has no navigation. The page renders a centered
scaffold with no way to move between sections. As content workstreams
(hero, skills, projects, about) are implemented, users need a persistent
navigation system that:

1. Provides wayfinding across sections on a single-page portfolio
2. Works on all devices from 320px upward
3. Meets accessibility requirements from `agent.md` (keyboard navigation,
   `aria-current`, `aria-expanded`, skip-to-content, focus indicators)
4. Uses the design system tokens established in the `design-system`
   workstream

This is the first component workstream — it introduces the component
creation pattern (file structure, props interfaces, testing, animation)
that all subsequent workstreams will follow.

---

## Design Goals

1. **Transparent-to-opaque scroll behavior.** The navbar starts
   transparent over hero content and gains a `surface` background with
   a subtle border on scroll. This avoids competing with the hero's
   atmospheric design while remaining readable when content scrolls
   behind it.

2. **Mobile-first responsive.** At `<768px`, nav links collapse into a
   hamburger-triggered mobile menu. At `≥768px`, links display inline.
   The transition is a clean breakpoint swap, not a JS-driven resize
   listener.

3. **Animated mobile menu.** The mobile menu slides in with Motion
   (Framer Motion) using `AnimatePresence` for mount/unmount. Menu items
   stagger using the design system's `staggerFast` container variant.

4. **Active section tracking.** As the user scrolls, the current section
   is highlighted in the nav via `aria-current="page"` and an accent
   underline or color shift. This uses IntersectionObserver (Observer
   pattern per `agent.md`).

5. **Skip-to-content link.** A visually hidden link that becomes visible
   on focus, jumping past the navbar to the main content area. Required
   by `agent.md` accessibility rules.

6. **Choreographed entrance.** The navbar enters with a `fadeDown`
   variant on initial page load, with nav items staggering in sequence.
   Respects `prefers-reduced-motion`.

---

## Architecture

### Component Tree

```
app/layout.tsx
├── SkipToContent          (components/layout/skip-to-content.tsx)
├── Navbar                 (components/layout/navbar.tsx) — "use client"
│   ├── NavLogo            (inline — site name as link)
│   ├── NavLinks (desktop) (inline — mapped from navLinks constant)
│   ├── MobileMenuButton   (inline — hamburger/close toggle)
│   └── MobileMenu         (components/layout/mobile-menu.tsx) — "use client"
│       └── NavLinks       (mapped from navLinks constant)
└── <main id="main-content">
    └── {children}
```

### File Structure

| File                                    | Type   | Purpose                       |
| --------------------------------------- | ------ | ----------------------------- |
| `components/layout/navbar.tsx`          | Client | Main navbar with scroll logic |
| `components/layout/mobile-menu.tsx`     | Client | Animated mobile menu overlay  |
| `components/layout/skip-to-content.tsx` | Server | Skip-to-content a11y link     |
| `__tests__/navbar.test.tsx`             | Test   | Navbar render + interaction   |

### Data Flow

1. `navLinks` from `lib/constants.ts` is the single source of truth for
   navigation items (Singleton pattern)
2. `Navbar` component imports `navLinks` and renders them
3. Scroll position tracked via `useState` + scroll event listener in
   `Navbar` — controls transparent/opaque state
4. Active section tracked via `IntersectionObserver` in `Navbar` —
   sets `activeSection` state (Observer pattern)
5. Mobile menu state managed via `useState` in `Navbar` — passed to
   `MobileMenu` as prop
6. `MobileMenu` uses `AnimatePresence` + motion variants for
   enter/exit animation

### Props Interfaces

```ts
interface NavbarProps {
  // No props — Navbar is self-contained, reads from constants
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}
```

---

## Applicable Design Patterns

| Pattern   | Application                                            |
| --------- | ------------------------------------------------------ |
| Singleton | `navLinks` from `lib/constants.ts` — single source of  |
|           | truth for nav items, never duplicated                  |
| Observer  | `IntersectionObserver` tracks which section is in      |
|           | viewport to set active nav state                       |
| Strategy  | Motion (Framer Motion) for navbar/menu animations.     |
|           | GSAP not needed — Motion handles this declaratively.   |
| Composite | Navbar > MobileMenu > NavLinks — nested component tree |

---

## Accessibility Requirements

Per `agent.md`:

- **Skip-to-content link:** Visually hidden, visible on focus, targets
  `#main-content`
- **Keyboard navigable:** All nav links and the mobile menu toggle
  reachable via Tab
- **Focus indicators:** Visible on all interactive elements using the
  `--ring` token (already in `globals.css` via `:focus-visible`)
- **`aria-expanded`:** On mobile menu toggle button, reflects menu state
- **`aria-current="page"`:** On the active section's nav link
- **`aria-label`:** On the `<nav>` element ("Main navigation") and
  mobile menu button ("Toggle menu")
- **Escape key:** Closes mobile menu when open
- **Focus trap (light):** When mobile menu is open, Tab cycles through
  menu items. Focus returns to toggle button on close.
- **Reduced motion:** AnimatePresence and motion variants respect
  `prefers-reduced-motion` via `useReducedMotion`

---

## Performance Budget

From `agent.md`:

| Metric          | Target   |
| --------------- | -------- |
| Total bundle JS | < 200 KB |
| Animation FPS   | 60fps    |

**Navigation-specific:**

- Navbar component is client-side (`"use client"`) due to scroll/state
  logic. Bundle impact is minimal — it uses Motion (already loaded) and
  no new dependencies.
- `IntersectionObserver` is native browser API — zero bundle cost.
- No new npm packages required. All dependencies already installed.

---

## Testing Strategy

Per `agent.md` rules:

- **New component → smoke render test minimum**
- **Interactive behavior (toggle, menu) → interaction test**

Tests for this sprint:

1. **Navbar renders** — smoke test confirming nav element in DOM
2. **Nav links present** — all 4 nav items from `navLinks` render
3. **Skip-to-content link** — present in DOM with correct `href`
4. **Mobile menu toggle** — clicking toggle sets `aria-expanded`
5. **Developer name visible** — logo/name link is present

---

## Sprint Plan

Single sprint:

### Sprint 1: Navbar, Mobile Menu, Skip-to-Content

**Goal:** Fully functional responsive navigation with mobile menu,
active section tracking, skip-to-content link, entrance animation,
and scroll-aware background. All verification commands pass. Tests
cover rendering and interaction.

---

## Future Considerations

- The `hero-section` workstream will need the navbar to be transparent
  over its atmospheric background. The transparent → opaque scroll
  behavior established here supports that.
- The `footer` workstream may share `navLinks` for a footer nav.
- If page sections acquire `id` attributes in later sprints, the
  `IntersectionObserver` in Navbar will automatically track them — no
  changes needed to the navbar component itself.
- Resume/CTA button in the navbar is not in scope for this sprint. It
  can be added via a Change Note or in the `hero-section` workstream.
