# Feature Spec: Deployment (`deployment`)

**Workstream:** `deployment`
**Priority:** P3
**Status:** Draft
**Date:** 2026-04-03

---

## Problem Statement

The portfolio exists in a local development environment. To be accessible to recruiters and hiring managers, it must be deployed to a high-performance production environment with robust social sharing preview cards and optimized static delivery.

---

## Deployment Strategy

### 1. Version Control (Git)
- Single source of truth: `main` branch.
- Remote: `jar285/main-portfolio` (GitHub).
- CI/CD: Vercel integration for automated builds on `git push`.

### 2. Social Meta (OG Tags)
- **Metadata API**: Next.js App Router Metadata implementation in `layout.tsx`.
- **Dynamic Base**: `process.env.NEXT_PUBLIC_SITE_URL` with fallbacks for Vercel preview environments.
- **Static Assets**:
  - `opengraph-image.png`: 1200x630 (Branded editorial).
  - `favicon.ico`: 32x32 (Monogram).
  - `apple-icon.png`: 180x180 (High-res touch).

---

## Architecture & Configuration

### Static Export
- **Engine**: `next.config.ts` configured with `output: "export"`.
- **Images**: `unoptimized: true` to support external CDN scaling.
- **Budget**: First Load JS remains < 200 KB.

### Security & Invariants
- **No API Routes**: Static-only deployment (Hobby Tier compliance).
- **Environment Isolation**: `.env.local` strictly excluded from Git.
- **Production URL**: Controlled via `metadataBase`.

---

## Accessibility & SEO Targets (AA)

- **Performance**: ≥ 90 (Lighthouse Production).
- **A11y**: ≥ 90 (Lighthouse Production).
- **SEO**: Meta tags and semantic structure verified for indexing.
- **Pace**: FCP < 1.5s, LCP < 2.5s.

---

## Verification Plan

### Deployment QA
- **OG Card Audit**: Verify `<meta>` tags on production URL.
- **Link Quality**: Success 200 on all social sharing platforms (LinkedIn, Slack, Discord).
- **Lighthouse**: Final production audit against the live URL.

### Fallback Plan
- If Vercel build fails due to static export configuration, revert `output: "export"` and audit for dynamic features (e.g., `useSearchParams` without Suspense).
