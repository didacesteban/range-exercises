@AGENTS.md

# CLAUDE.md

Conventions for this repo: a Next.js (App Router) + TypeScript app implementing a dual-handle range/slider component. See [README.md](README.md) for stack, setup, and project decisions.

## Architecture

- **MVVM for components.** View components (e.g. `Range.tsx`) stay free of state/business logic. State, drag/keyboard handling, and value formatting live in a `useXViewModel` hook (e.g. `useRangeViewModel.ts`), with the contract described by an `IXViewModel.ts` interface. Don't let calculations, branching on domain values, or clamping leak into the view.
- **Naming/structure.** Components live in their own folder: `src/app/components/<kebab-name>/<PascalName>.tsx`. Match this pattern for new components.
- **Types.** No `any`. Shared API response shapes belong in `src/app/api/types.ts` and are reused by both the route handler and its consumer, not duplicated.
- **Mocked HTTP API.** Route handlers under `src/app/api/` stand in for a real backend. Name them after the shape of data they return, not which page/exercise consumes them.

## Testing

- **Colocated unit tests.** `*.test.ts(x)` lives next to the file it covers (Vitest + React Testing Library). New or changed logic in a hook, service, or utility needs one.
- **Playwright e2e.** New or changed user-visible behavior needs a spec in `e2e/`.
- **Storybook.** Every presentational component under `src/app/components/` has a colocated `*.stories.tsx`.

## Styling

- Tailwind CSS. Dark mode uses the `.dark` class toggle (see `src/app/layout.tsx`'s theme-init script and `.storybook/preview.tsx`).
- Follow the project's inverted-scale convention for any new color/border/background utility: e.g. `gray-800` text → `dark:gray-100`, `gray-200` borders → `dark:gray-800`, surfaces one shade lighter than the page background. Every light-mode color utility needs a matching `dark:` variant.

## Accessibility

- Semantic HTML first — real `<button>`, `<a>`, `<input>`, etc., not `<div>`/`<span>` with an `onClick`.
- Icon-only controls need an `aria-label` or visually-hidden text; links need discernible text.
- Custom widgets that aren't native elements (e.g. `Range`) need the correct ARIA role and state (`role="slider"`, `aria-valuenow`/`aria-valuemin`/`aria-valuemax`) kept in sync with actual value, plus keyboard handling.
- Never suppress focus outlines (`outline-none`) without a replacement focus style (`focus-visible:ring-*`).
- Heading levels shouldn't skip, and use landmark elements (`<nav>`, `<main>`, `<header>`, `<footer>`) over generic divs.
- The document `lang` and all accessible names/labels should be in one consistent language (English).

## Git hooks (Lefthook)

- `pre-commit` runs Biome, `tsc --noEmit`, and unit tests.
- `pre-push` runs the full Playwright suite.
- Don't bypass these with `--no-verify`.

## Agents

Two Claude Code subagents live under `.claude/agents/`, meant to run proactively after adding or changing code, before it's committed:

- **`code-reviewer`** — reviews the current diff for correctness bugs, deviations from the conventions above, and missing test coverage.
- **`a11y-reviewer`** — reviews components under `src/app/components/` for accessibility compliance.
