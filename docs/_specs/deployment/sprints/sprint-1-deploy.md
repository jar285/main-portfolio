# Sprint 1: Deployment (`deployment`)

**Goal:** Finalize the production-ready portfolio and deploy to a live URL.

## Execution Roadmap

### Task 1: Version Control (Git)

- [x] 1.1: `git init` and `git branch -M main`.
- [x] 1.2: Verify `.gitignore` (node_modules, .next, .env\*, out, .vercel).
- [x] 1.3: Commit: `feat: complete portfolio — ready for deployment`.
- [x] 1.4: Push to `git@github:jar285/main-portfolio.git`.

### Task 2: Metadata & Social Branding

- [x] 2.1: Update `app/layout.tsx` metadata (Open Graph, Twitter, title/description).
- [x] 2.2: Generate `app/opengraph-image.png` (1200x630, dark editorial).
- [x] 2.3: Generate `app/favicon.ico` (32x32 monogram).
- [x] 2.4: Generate `app/apple-icon.png` (180x180 touch icon).

### Task 3: Vercel Static Deployment

- [x] 3.1: Confirm `next.config.ts` has `output: "export"`.
- [x] 3.2: Manually set `NEXT_PUBLIC_SITE_URL` in Vercel dashboard.
- [x] 3.3: Perform production build and verify the `out/` directory for `opengraph-image.png`.

### Task 4: Documentation & Verification

- [x] 4.1: Update `README.md` with live URL and final tech stack.
- [x] 4.2: Update `docs/_specs/README.md` to mark `deployment` as Complete.
- [x] 4.3: Final production Lighthouse audit (Performance/A11y ≥ 90).

## Verification Checklist

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run format:check`
- [x] `npm run build`
- [x] `out/` contains `opengraph-image.png` and meta-correct HTML.
- [x] Success 200 on `jar285/main-portfolio` on GitHub.
