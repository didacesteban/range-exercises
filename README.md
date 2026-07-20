# Range Exercises

A small Next.js app implementing a dual-handle range/slider component in two modes: a continuous numeric range and a discrete set of price tiers.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vitest + React Testing Library for unit tests
- Playwright for e2e tests
- Biome for linting/formatting
- Lefthook for git hooks
- Storybook for isolated component development

## Getting started

```bash
npm install
npm run dev         # http://localhost:8080
npm run build
npm run test        # unit tests
npm run test:e2e
npm run storybook   # http://localhost:6006
```

## Agents

This repo defines two Claude Code subagents under `.claude/agents/`, meant to run proactively after adding or changing code, before it's committed:

- **`code-reviewer`** — reviews the current diff for correctness bugs, deviations from the project's MVVM/testing conventions (thin views, colocated tests/stories, dark-mode variants, shared API types), and missing test coverage.
- **`a11y-reviewer`** — reviews components under `src/app/components/` for accessibility compliance: semantic HTML, ARIA roles/state on custom widgets, keyboard operability, accessible names/labeling, focus visibility, and color-contrast risk.

Both start from `git diff` (falling back to a full review if nothing is staged/unstaged) and report findings grouped by severity with file:line references and suggested fixes.

## Project decisions

- **Dynamic route with an id param.** Exercises are served from a single `src/app/exercise/[exerciseId]/page.tsx` route (`/exercise/1`, `/exercise/2`) instead of separate `exercise-1` / `exercise-2` routes, to demonstrate a dynamic route segment driving which variant of the page is rendered.
- **MVVM for the `Range` component.** `Range.tsx` is a thin view: all state, drag/keyboard handling, and value formatting live in `useRangeViewModel` (`src/app/components/range/useRangeViewModel.ts`), with the contract described by `IRangeViewModel.ts`. The goal is a component that's easy to test and reason about, with the view free of logic.
- **Mocked HTTP API.** `src/app/api/range-limits` and `src/app/api/range-values` are Next.js route handlers standing in for a real backend, returning `{ min, max }` and `{ rangeValues }` respectively — named after the shape of the data they return rather than which exercise consumes them. The exercise page fetches them server-side rather than hardcoding the values, to demonstrate consuming an external data source.
- **Shared response types.** `src/app/api/types.ts` types the mocked responses so the route handlers and the page consuming them share one contract instead of drifting independently.
- **Colocated unit tests.** `useRangeViewModel.test.ts` lives next to `useRangeViewModel.ts` in `src/app/components/range/`, so a test never gets orphaned when the feature it covers is renamed or moved.
- **Git hooks via Lefthook.** `lefthook.yml` runs Biome, `tsc --noEmit`, and the unit tests on `pre-commit`, and the full Playwright suite on `pre-push`. e2e is kept out of `pre-commit` since it needs to boot a dev server and a real browser, which is too slow for every commit.
- **Storybook for component isolation.** Every presentational component under `src/app/components/` has a colocated `*.stories.tsx`, letting `Range`'s continuous/discrete modes and all the small building blocks be developed and reviewed independently of the app's routes. `.storybook/preview.tsx` imports the real `globals.css` and wires a light/dark toolbar toggle using the same `.dark`-class mechanism as the actual app, so stories always match production styling.
