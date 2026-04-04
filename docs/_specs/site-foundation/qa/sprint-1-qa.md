# Sprint 1: Scaffold — Sprint Doc QA Report

**Date:** 2026-04-03
**Reviewer:** AI Agent
**Sprint doc reviewed:** `docs/_specs/site-foundation/sprints/sprint-1-scaffold.md`
**Governing spec:** `docs/_specs/site-foundation/spec.md`
**Governing document:** `agent.md` v1.0.0

---

## Checklist

- [x] Clear goal stated
- [x] Referenced spec sections listed
- [x] Available assets verified against live repo
- [x] Artifact targets listed with action verbs (Create/Modify/Delete)
- [x] Task-by-task execution guidance present
- [x] Verify step for each task
- [x] Completion checklist present
- [x] QA deviations section present

---

## Findings

No blocking issues found.

---

## Observations

1. **Task 1 uses `create-next-app` flags that may vary by version.**
   Next.js 16 `create-next-app` may have different CLI flags than
   previous versions. The `--src-dir=false` flag and `--import-alias`
   flag should be verified at runtime. If the CLI prompts interactively
   instead of accepting flags, manual configuration after scaffolding
   is acceptable.

2. **Task 4 dependency list may need adjustment.** The ESLint ecosystem
   for v9 flat config is still settling. `typescript-eslint` v8+ provides
   its own flat config helper. The exact plugin set may need to be
   adjusted during implementation if compatibility issues arise. This is
   an expected deviation, not a spec violation.

3. **Task 8 shadcn/ui init may generate files.** Running `npx shadcn@latest init`
   may auto-create `lib/utils.ts` and modify `tailwind.config.ts` and
   `globals.css`. The sprint doc accounts for `lib/utils.ts` in Task 7
   (created before shadcn init). The implementation should handle
   potential overwrites by running shadcn init first or merging its
   output.

4. **Task 12 smoke test imports `@/app/page`.** This requires the path
   alias `@/*` to be resolved by Vitest. The `vitest.config.ts` in
   Task 6 must include path alias resolution matching `tsconfig.json`.
   This dependency between tasks is implicit — worth noting.

5. **Task ordering could be optimized.** Tasks 7 and 8 (cn utility +
   shadcn) should ideally run before Task 4 (ESLint) since shadcn may
   generate code that needs to pass linting. Current ordering works but
   may require a re-lint pass after shadcn init. Acceptable.

6. **Static export not explicitly mentioned in Task 1.** The spec
   requires `output: "export"` in `next.config.ts`. Task 1 delegates
   this to the generated config but should be verified. Task 2 or Task 13
   should ensure `next.config.ts` has `output: "export"` set.

7. **16 tasks for a scaffold sprint is appropriate scope.** Each task
   is discrete and verifiable. No task is overly broad.

---

## Verdict

**PASS**

The sprint doc is complete, actionable, and aligned with the spec.
Observations 3 (shadcn overwrites), 4 (Vitest path aliases), and
6 (static export config) should be addressed during implementation
but do not block sprint doc approval. Proceed to implementation.
