# AGENTS.md

pnpm ^11.20 monorepo (see README for setup/API overview). Apps: `@venedle/backend` (Express 5, ts-node, pg-promise), `@venedle/frontend` (Vite + React 19 + Tailwind v4), `@venedle/shared` (types only). No CI, no root lint/format scripts.

## Commands

- `pnpm dev` does NOT start both apps: `dev:backend` (nodemon) blocks forever, so the frontend never launches. Run `pnpm dev:backend` and `pnpm dev:frontend` in separate terminals.
- Tests: `pnpm --filter @venedle/backend test`. Gotcha: jest's `testMatch` also picks up compiled tests, so if `apps/backend/dist/` exists, jest runs `dist/apps/backend/tests/*.test.js` and the suite fails. Delete `apps/backend/dist/` before running tests (it is not gitignored).
- `pnpm --filter @venedle/backend lint` is broken out of the box — `eslint` is not a dependency of the backend package. Use `pnpm --filter @venedle/frontend lint` or run eslint via the frontend workspace.
- `pnpm --filter @venedle/shared lint` = `tsc --noEmit` (shared has no build step; it is consumed from `src/` directly — backend via tsconfig `paths`, frontend via Vite alias).
- Backend tests mock `CharacterService`; no database needed for unit tests. The game guess flow itself requires a live Postgres `characters` table.

## Backend gotchas

- Dev flow is ts-node only. `pnpm --filter @venedle/backend build` emits to `apps/backend/dist/apps/backend/src/...` (tsconfig `rootDir` is the repo root) and `start` (`node dist/server.js`) points at the wrong path; compiled output also cannot resolve `@venedle/shared` at runtime. Don't rely on build/start.
- No migrations exist. The `characters` table (snake_case: `birth_year`, `state_of_origin`, `international_reach`, `peak_era`, `discipline_genre`, `image_url`) must be created and seeded manually; `character.repository.ts` maps rows to the camelCase `Character` type.
- DB connection comes from `DATABASE_URL` (`src/config/config.ts`); `config.db` falls back to a placeholder string if unset.
- The daily answer is deterministic: SHA-256 of the current date string in the `America/Caracas` timezone, then `seed % characters.length` (`src/utils/dailySeed.ts`).

## Frontend conventions

- UI strings and shared category values (`packages/shared/src/types/characters.ts`) are in Spanish (e.g. "Deportista", "Vivo", "Fallecido"). Keep new UI text in Spanish.
- `fetch` calls hardcode `http://localhost:3000` (backend default port). `API_BASE_URL` in `packages/shared/src/index.ts` points at stale `:3001` and is unused — do not wire new code to it.
- Prettier config (`.prettierrc`): single quotes, semicolons, trailing commas — but there is no format script and existing code is inconsistent. Match the surrounding file.
- A `frontend-design` skill lives in `.agents/skills/` (locked via `skills-lock.json`) — consult it before building or reshaping UI.