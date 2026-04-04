# Sprint 1: Theme Toggle (`theme-toggle`)

**Goal:** Implement a production-grade theme toggle with a warm editorial light mode and zero-flicker hydration.

## Theme Palette Shootout (Warm Editorial)

Based on your feedback to move into the 30-60 hue range, here are the proposed background tokens for the light mode:

| Option                  | HSL Value    | Rationale                                                                                       | Recommendation |
| :---------------------- | :----------- | :---------------------------------------------------------------------------------------------- | :------------- |
| **A: Champagne Ivory**  | `45 25% 97%` | High-luminosity cream. Provides a premium "Vogue-style" editorial look.                         | **Approved**   |
| **B: Desert Parchment** | `35 15% 96%` | Deeper warm-grey tint. Mimics high-end tactile paper found in design monographs.                | High Contrast  |
| **C: Linen White**      | `45 10% 98%` | Near-neutral warm white. Minimalist and clean, with just enough warmth to avoid clinical vibes. | Safe/Modern    |

_All options will use the existing **Vibrant Orange** (`38 90% 58%`) for accents._

---

## Execution Roadmap

### Task 1: Style Token Migration

- [x] 1.1: Refactor `globals.css` to move current variables into a `.dark` class.
- [x] 1.2: Implement the `:root` (Light Mode) variables using the **Option A** palette.
- [x] 1.3: Update `tailwind.config.ts` to ensure `darkMode: 'class'` is correctly mapped.

### Task 2: Flicker Prevention (Head Script)

- [x] 2.1: Implement an inline `<script>` in the `<head>` of `layout.tsx`.
- [x] 2.2: Script Logic:
  - Check `localStorage.theme`.
  - Fall back to `window.matchMedia('(prefers-color-scheme: dark)').matches`.
  - Immediately apply `.dark` or remove it from `document.documentElement`.
- [x] 2.3: Verify script execution occurs before the first paint (No FOUT).

### Task 3: Theme Provider & Persistence

- [x] 3.1: Create `ThemeProvider.tsx` client component to manage `theme` state.
- [x] 3.2: Implement `setTheme` function that updates both `localStorage` and the DOM class.
- [x] 3.3: Add a system-preference listener to sync theme if the user hasn't explicitly set an override.

### Task 4: UI Toggle & Navigation

- [x] 4.1: Build the `ThemeToggle` component using the `Sun` and `Moon` icons from the local registry.
- [x] 4.2: Implement a staggered Framer Motion transition for the toggle icon (rotation + opacity).
- [x] 4.3: Integrate the toggle into both Desktop and Mobile navigation in `Navbar.tsx`.

### Task 5: Verification

- [x] 5.1: Perform `npm run build` and verify First Load JS remains < 200 KB.
- [x] 5.2: Audit WCAG AA contrast ratios for the new light palette.
- [x] 5.3: Verify persistence across page refreshes and browser sessions.

## Verification Checklist

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run format:check`
- [x] `npm run build`
- [x] No theme flicker on reload (FOUT)
- [x] Correct system preference detection
- [x] Contrast ratio ≥ 4.5:1 for all primary text
