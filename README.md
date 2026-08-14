# Venedle

A daily guessing game where players try to identify a famous Venezuelan person based on categorical hints (field, gender, birth year, state of origin, status, international reach, peak era, and discipline/genre).

One person is selected per day (deterministic based on the date in the **America/Caracas** timezone). You get up to 8 guesses — after each guess you see which categories match the hidden answer, and a birth year hint points you up or down.

## Structure

This is a pnpm monorepo:

```
apps/
  backend/   Express + TypeScript API (character & game endpoints)
  frontend/  React + Vite + Tailwind app (game UI, autocomplete, stats)
packages/
  shared/    Shared TypeScript types (Character, guesses)
```

## Requirements

- Node.js
- pnpm `^11`
- PostgreSQL (see `apps/backend/src/config/config.ts`)

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure the database. The backend uses `DATABASE_URL`, for example:

   ```bash
   DATABASE_URL=postgres://user:password@localhost:5432/venedle
   ```

3. Create a `characters` table (snake_case columns, e.g. `birth_year`, `state_of_origin`, `international_reach`, `peak_era`, `discipline_genre`, `image_url`) and seed it with famous Venezuelan figures.

4. Run the app:

   ```bash
   pnpm dev
   ```

   This starts both the backend (`http://localhost:3000`) and the frontend dev server. You can also run them separately:

   ```bash
   pnpm dev:backend
   pnpm dev:frontend
   ```

## API

- `GET /api/characters` — all characters
- `GET /api/characters/names` — all character names (for autocomplete)
- `GET /api/characters/:name` — a single character
- `POST /api/game/guess` — evaluate a guess (body: `{ "guessedName": string }`), returns category comparisons and the answer if correct

## Tests / Lint

```bash
pnpm --filter @venedle/backend test
pnpm --filter @venedle/backend lint
pnpm --filter @venedle/frontend lint
```