# Jesus Rosario — Developer Portfolio

Personal developer portfolio for Jesus Rosario — senior Web Information
Systems student at NJIT (graduating May 2026), Software Engineering
Intern at YU & Associates.

## Tech Stack

| Layer      | Tool                           |
| ---------- | ------------------------------ |
| Framework  | Next.js 16 (App Router, SSG)   |
| Language   | TypeScript (strict mode)       |
| Styling    | Tailwind CSS v3                |
| UI         | shadcn/ui (Radix-based)        |
| Animation  | Motion (Framer Motion), GSAP   |
| Testing    | Vitest + React Testing Library |
| Linting    | ESLint v9 (flat config)        |
| Formatting | Prettier                       |
| Deployment | Vercel                         |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script                 | Command              | Purpose                |
| ---------------------- | -------------------- | ---------------------- |
| `npm run dev`          | `next dev`           | Development server     |
| `npm run build`        | `next build`         | Production build (SSG) |
| `npm run typecheck`    | `tsc --noEmit`       | Type safety check      |
| `npm run lint`         | `eslint .`           | Code quality check     |
| `npm run test`         | `vitest run`         | Unit + component tests |
| `npm run format:check` | `prettier --check .` | Formatting check       |

## Project Structure

```
app/            → Next.js App Router pages and layout
components/
  layout/       → Navbar, Footer
  sections/     → Hero, Skills, Projects, About
  ui/           → shadcn/ui primitives + custom components
lib/            → Utilities, constants, data, animation primitives
docs/
  _specs/       → Feature specs, sprint docs, QA reports
  _changes/     → Persisted Change Notes
public/         → Static assets (icons, images)
```

## Documentation

- [`agent.md`](./agent.md) — Agent operating contract
- [`docs/_specs/README.md`](./docs/_specs/README.md) — Workstream status index

## Current Status

**Workstream:** `site-foundation` — Complete
**Workstream:** `design-system` — Complete
**Workstream:** `navigation` — Complete
**Workstream:** `hero-section` — Complete
**Workstream:** `skills-section` — Complete
**Workstream:** `projects-section` — Complete
**Workstream:** `about-and-experience` — Complete
**Workstream:** `ux-enhancements` — Complete
**Workstream:** `footer` — Complete
**Next:** `performance-and-a11y`
