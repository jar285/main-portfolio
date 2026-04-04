# Spec QA - Deployment

**Date:** 2026-04-03
**Workstream:** `deployment`

## Findings

- **Static Asset Automation**: Verified that Next.js App Router automatically handles `opengraph-image.png` and `apple-icon.png` in the `app/` directory. No manual `<meta>` tag injection is required in `layout.tsx` for these assets.
- **Git Strategy**: The remote `jar285/main-portfolio` is pre-identified. `git init` and `git remote add` are the correct operations.
- **Vercel Compatibility**: `output: "export"` in `next.config.ts` is the most reliable path for the Vercel Hobby tier, provided all dynamic features are appropriately handled (e.g., no server-side `cookies()` or `headers()`).

## Observations

- **MetadataBase Logic**: The proposed `metadataBase` handling using `process.env.VERCEL_URL` is critical for ensuring OG images resolve correctly in Vercel preview environments.
- **OG PNG Size**: 1200x630 is the industry standard for Slack/LinkedIn/Twitter.
- **Build Verification**: Explicitly check the `out/` directory post-build to ensure `opengraph-image.png` is generated and correctly referenced in the `index.html` meta tags.

## Verdict: PASS

Spec is technically sound. Proceed to Sprint Doc.
