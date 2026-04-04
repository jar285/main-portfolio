# Sprint 1: Deployment (`deployment`)

**Goal:** Finalize the production-ready portfolio and deploy to a live URL.

## Execution Roadmap

### Task 1: Version Control (Git)

- [ ] 1.1: `git init` and `git branch -M main`.
- [ ] 1.2: Verify `.gitignore` (node_modules, .next, .env*, out, .vercel).
- [ ] 1.3: Commit: `feat: complete portfolio — ready for deployment`.
- [ ] 1.4: Push to `git@github:jar285/main-portfolio.git`.

### Task 2: Metadata & Social Branding

- [ ] 2.1: Update `app/layout.tsx` metadata (Open Graph, Twitter, title/description).
- [ ] 2.2: Generate `app/opengraph-image.png` (1200x630, dark editorial).
- [ ] 2.3: Generate `app/favicon.ico` (32x32 monogram).
- [ ] 2.4: Generate `app/apple-icon.png` (180x180 touch icon).

### Task 3: Vercel Static Deployment

- [ ] 3.1: Confirm `next.config.ts` has `output: "export"`.
- [ ] 3.2: Manually set `NEXT_PUBLIC_SITE_URL` in Vercel dashboard.
- [ ] 3.3: Perform production build and verify the `out/` directory for `opengraph-image.png`.

### Task 4: Documentation & Verification

- [ ] 4.1: Update `README.md` with live URL and final tech stack.
- [ ] 4.2: Update `docs/_specs/README.md` to mark `deployment` as Complete.
- [ ] 4.3: Final production Lighthouse audit (Performance/A11y ≥ 90).

## Verification Checklist

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run format:check`
- [ ] `npm run build`
- [ ] `out/` contains `opengraph-image.png` and meta-correct HTML.
- [ ] Success 200 on `jar285/main-portfolio` on GitHub.
