# Change Note: Vercel Analytics

**Date:** 2026-04-04
**Problem:** No visibility into portfolio traffic.
**Outcome:** Visitor tracking enabled via Vercel dashboard.

## Changes

### 1. Dependency

- **Added**: `@vercel/analytics` (~1 KB).

### 2. Root Layout (`app/layout.tsx`)

- **Import**: `import { Analytics } from "@vercel/analytics/react"` (updated to the standard `@vercel/analytics/react` to ensure compatibility).
- **Injection**: Injected `<Analytics />` at the very end of the `<body>` tag, following `{children}` and `<BackToTop />`.

## Invariants

- **No public-facing UI**: No visible visitor counters or dashboards.
- **Privacy**: Vercel Analytics is privacy-focused by default.
- **Performance**: Site remains under **200 KB** First Load JS budget.

## Verification

- `npm run build` confirmed zero impact on the global layout or interaction layer.
- `typecheck` and `lint` passed.
