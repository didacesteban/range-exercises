# Range Exercises

A small Next.js app implementing a dual-handle range/slider component in two modes: a continuous numeric range and a discrete set of price tiers.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Playwright for e2e tests
- Biome for linting/formatting

## Getting started

```bash
npm install
npm run dev         # http://localhost:8080
npm run build
npm run test:e2e
```

## Project decisions

- **Dynamic route with an id param.** Exercises are served from a single `src/app/exercise/[exerciseId]/page.tsx` route (`/exercise/1`, `/exercise/2`) instead of separate `exercise-1` / `exercise-2` routes, to demonstrate a dynamic route segment driving which variant of the page is rendered.
- **MVVM for the `Range` component.** `Range.tsx` is a thin view: all state, drag/keyboard handling, and value formatting live in `useRangeViewModel` (`src/app/components/range/useRangeViewModel.ts`), with the contract described by `IRangeViewModel.ts`. The goal is a component that's easy to test and reason about, with the view free of logic.
- **Mocked HTTP API.** `src/app/api/exercise-1` and `src/app/api/exercise-2` are Next.js route handlers standing in for a real backend, returning `{ min, max }` and `{ rangeValues }` respectively. The exercise page fetches them server-side rather than hardcoding the values, to demonstrate consuming an external data source.
- **Shared response types.** `src/app/api/types.ts` types the mocked responses so the route handlers and the page consuming them share one contract instead of drifting independently.
