# Spec: Theme Toggle (`theme-toggle`)

Implement a production-grade theming system that supports system preference detection, manual override persistence, and a complementary "warm editorial" light mode.

## Goals

- **Light Mode Palette**: Define a light theme that maintains the portfolio's premium feel.
- **Persistence**: Save theme preference in `localStorage`.
- **Flicker Prevention**: Execute theme detection logic in the document head during hydration.
- **UI Toggle**: Add an interactive Sun/Moon toggle to the main navigation.

## User Review Required

> [!IMPORTANT]
> **No External Libraries**: This will be implemented using native `localStorage`, `matchMedia`, and Tailwind's `class` strategy to maintain the < 200 KB bundle budget.
> **Contrast Ratios**: All text/background combinations will be audited for WCAG AA compliance in both themes.

## Proposed Changes

### 1. Style Token Expansion

#### [MODIFY] [globals.css](file:///Users/Github/IS322/portfolio/app/globals.css)

- Refactor current `:root` variables into a `.dark` class.
- Implement a new `:root` (Light Mode) palette:
  - `background`: `210 20% 98%` (Warm off-white)
  - `foreground`: `222 47% 11%` (Deep Obsidian)
  - `surface`: `210 20% 94%`
  - `elevated`: `210 20% 91%`
  - `accent`: `38 90% 58%` (Preserve orange branding)
  - `border`: `214 32% 91%`
  - `muted-foreground`: `215 16% 47%`

### 2. Theme Orchestration

#### [NEW] [ThemeProvider.tsx](file:///Users/Github/IS322/portfolio/components/theme/theme-provider.tsx)

- Create a lightweight client component that manages the `theme` state and applies the `.dark` class to `document.documentElement`.
- Handle `matchMedia` listeners to sync with OS-level theme changes.

#### [MODIFY] [layout.tsx](file:///Users/Github/IS322/portfolio/app/layout.tsx)

- Inject a blocking inline `<script>` in the `<head>` to read `localStorage` and apply the correct class before the first paint, preventing "flash of unstyled theme" (FOUT).

### 3. Interaction

#### [NEW] [ThemeToggle.tsx](file:///Users/Github/IS322/portfolio/components/theme/theme-toggle.tsx)

- Implement a Sun/Moon toggle using the custom `IconRegistry`.
- Staggered motion transition between states using Framer Motion's `layout` prop.

#### [MODIFY] [navbar.tsx](file:///Users/Github/IS322/portfolio/components/layout/navbar.tsx)

- Integrate the `ThemeToggle` into the desktop and mobile navigation bars.

## Open Questions

- Do you have a preference for the light-mode background tint (e.g., more "warm/cream" vs. "cool/blue-grey")?

## Verification Plan

### Automated Tests

- `npm run build`: Verify First Load JS remains < 200 KB.
- `npx lighthouse`: Audit contrast and accessible labeling for the toggle.

### Manual Verification

- Toggle themes and refresh the page to confirm persistence.
- Change OS theme preference and verify the application syncs automatically.
