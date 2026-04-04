# Theme Toggle Spec — QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Spec:** `docs/_specs/theme-toggle/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Status

**PASS**

The spec defines a robust, lightweight theming system that leverages Tailwind's native `darkMode: 'class'` strategy. It successfully avoids external dependencies like `next-themes` by using a custom inline script for flicker prevention, maintaining the strict < 200 KB bundle budget.

---

## Checklist

- [x] Problem statement present and clear
- [x] Design goals defined (Light mode, Persistence, NO flicker)
- [x] Architecture documented (Inline script, Custom provider)
- [x] Design patterns identified (Blocking script in `<head>`)
- [x] Accessibility requirements listed (WCAG AA contrast)
- [x] Performance budget maintained (No new libraries)
- [x] Testing strategy defined (Build, contrast audit)
- [x] No filler language or adverbs ("perfectly," "smoothly")

---

## Observations & Issues Caught

1. **Inline Script Location**: To prevent the Flash of Unstyled Theme (FOUT), the inline script MUST be placed _before_ the `<body />` tag in `layout.tsx`. This ensures the `.dark` class is applied to `document.documentElement` before the browser begins the first paint.
2. **Contrast Audit**: The proposed light-mode `muted-foreground` (`215 16% 47%`) and `accent` (`38 90% 58%`) must be tested together. While orange on white is generally safe, we must ensure small text remains legible. We may need a slightly darker `accent-foreground` for the light theme to pass AA.
3. **SVG Identity**: The `Sun/Moon` toggle will use the existing `IconRegistry`. This ensures no redundant SVGs are added to the bundle.
4. **Hydration Consistency**: The `ThemeToggle` component must account for the mismatch between server-side (no theme) and client-side (local preference) rendering. We will use a `mounted` state check or a purely CSS-driven toggle fallback to prevent hydration errors.

---

## Verdict

**PASS**

The spec is sound. Proceed to Phase 3 (Write Sprint Doc) after user approval.
