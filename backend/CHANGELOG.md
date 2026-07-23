# Backend Changelog

Chronological log of backend work on Ai-Adviser, kept for continuity between
sessions (this is a two-computer project - Windows does `frontend/`, this
machine does `backend/` - see root `README.md`). Frontend-side milestones are
noted in *italics* for context only; they are not this log's responsibility.

## 2026-07-22

- **Scaffolded Express server** (`server.js`, `src/app.js`, `src/routes`,
  `src/middleware`, `src/utils/logger.js`): health check, CORS, JSON body
  parsing, centralized error handling, request logging.
- **Imported Uzbekistan mahalla/district reference data.** Cleaned two Excel
  exports (all-mahalla socio-economic stats: population, poverty tier,
  unemployment, NPL, specializations, per-sector credit; and a district-level
  credit-program summary dated 01.05.2026) into `backend/data/*.json`.
  Region/district codes in the source were unreliable (duplicated region
  codes, inconsistent district codes), so canonical IDs were derived from
  region/district **names** instead, with an alias table for spelling
  variants between the two source files. Served via a `geoData.service.js` +
  `geo.routes.js` pair: `/api/regions`, `/api/districts`, `/api/mahallalar`,
  `/api/kredit-statistika`.
- **Added the onboarding questionnaire (anketa) API.** Stateless -
  `GET /api/anketa/savollar` returns the question schema (hudud -> tuman ->
  mahalla cascading selects, ixtisoslashuv, loyiha maqsadi, faoliyat joyi,
  garov bor/turi/qiymati with conditional-required logic, kredit mahsuloti);
  `POST /api/anketa/javoblar` validates and echoes back normalized answers.
  No persistence yet (no DB, no auth to attach an answer to).
- *(Frontend, for context: redesigned as a full React/Vite/Tailwind app,
  added i18n (uz/en/ru), rewrote wizard.js to match this anketa schema.)*
- **Restructured the geo API into repository -> service -> controller ->
  route layers** (`src/repositories/geo.repository.js`,
  `src/services/geo.service.js`) so a future Postgres swap only touches the
  repository. Added REST-style nested endpoints (`/api/regions/:id`,
  `/api/regions/:id/districts`, `/api/districts/:id`,
  `/api/districts/:id/mahallas`, `/api/mahallas/:id`) alongside the existing
  flat/filterable ones. Added `src/config/database.js` (pg Pool factory,
  prepared but unused at the time) and `validateIdParam` middleware.
- **Imported real map boundary data** from a GIS export ("7. Харита.zip",
  Web Mercator projected, converted to WGS84). Produced
  `backend/data/hudud-chegaralari.geojson` (14 regions) and
  `tuman-chegaralari.geojson` (206 districts), matched to existing
  region/district records by name (same alias-table approach as the mahalla
  data). Served via `/api/xarita/hududlar`, `/api/xarita/tumanlar?regionId=`,
  `/api/regions/:id/chegara`, `/api/districts/:id/chegara`.
- *(Frontend, for context: built the actual interactive map -
  `frontend/src/features/map/` - using MapLibre GL against these endpoints,
  with region -> district -> mahalla drill-down.)*

## 2026-07-23

- Added a root `package.json` (+ `concurrently`) so `npm run dev` from the
  repo root runs backend and frontend together; documented both the
  combined and cd-in-and-run-each options in the root `README.md`.
- *(Frontend, for context: found and fixed a real bug on their own -
  Fargona viloyati's boundary had disconnected exclaves exported as a single
  `Polygon` with extra rings, which MapLibre GL renders as holes, collapsing
  the fill. Correct fix: store it as a `MultiPolygon`.)*
- **Mistake made and corrected same day:** re-investigated the Fargona bug
  independently without checking recent git history first, and re-generated
  `hudud-chegaralari.geojson` / `tuman-chegaralari.geojson` from scratch -
  producing a naive `Polygon`-with-holes version that overwrote the
  frontend's already-correct `MultiPolygon` fix. Caught before push, reverted
  to the frontend's version. Lesson recorded: always check `git log` for
  recent commits from the other session before starting an independent
  investigation into a reported bug.
- **Set up PostgreSQL.** Installed locally (Homebrew, Postgres 16), created
  the `ai_adviser` database, wired `DATABASE_URL` into `.env`/`.env.example`.
  `GET /api/health` now actually runs `SELECT 1` against it and reports
  `connected` / `error` / `not_configured`. No tables exist yet - repositories
  still read the static JSON in `backend/data`; the first feature that needs
  real persistence (most likely auth) will add the first migration.
- **Added `GET /api/mahallas/:id/chegara`**, matching the exact contract the
  frontend documented in
  `frontend/src/features/map/api/API_REQUIREMENTS.md`. No mahalla-level
  geometry source exists (the GIS export only had region/district layers), so
  it honestly 404s for every mahalla for now rather than fabricating
  coordinates - the frontend already handles this as a "boundary not yet
  available" state. Unlocking this needs a real data source (even just a
  centroid per mahalla).
- *(Frontend, for context: wired the Business Idea wizard to the real
  `GET /api/anketa/savollar` / `POST /api/anketa/javoblar` endpoints, replacing
  the old hardcoded mock questions.)*
- **Moved anketa questions from static JSON into Postgres**, since the
  questionnaire schema being a flat file (not admin-editable via the
  database) was flagged as wrong for where this project is headed. Added
  `npm run migrate` (`src/db/migrate.js`, tracks applied migrations in
  `schema_migrations`) and the first migration
  (`anketa_savollari` + `anketa_savol_options`), plus a one-time
  `npm run db:seed:anketa` that loads the existing `anketa-savollari.json`
  into them. `anketa.repository.js` now reads from Postgres;
  `anketa.service.js`/its controller are async but the public API contract
  is unchanged (re-verified with the same requests as before).
- **Integrated Google Gemini AI** (`@google/genai`, official SDK). Added
  `src/config/gemini.config.js` (lazy client, reads `GEMINI_API_KEY`/
  `GEMINI_MODEL`), `src/services/gemini.service.js` (low-level wrapper:
  text generation, structured JSON generation, stateless chat sessions), and
  `src/services/ai.service.js` (per-endpoint prompts on top of it). Six
  endpoints: `POST /api/ai/{chat,generate,summarize,title,improve,ideas}`,
  each validated by a new reusable `validateBody` middleware. No real API key
  is configured yet - every endpoint correctly 503s with a clear message
  instead of crashing; `GET /api/health` now also reports `ai:
  configured|not_configured`. These are generic utility endpoints, not yet
  wired to the anketa answers for grounded business-idea generation - that's
  the natural next step once an idea-generation feature is designed.
- **Fixed the Gemini model name after the real key was added:** the pinned
  `gemini-2.5-flash` model returned `404 ... no longer available to new
  users` for this API key/project even though it's still listed by
  `models.list()` (Google restricts some dated model names per-project).
  Switched the default to the `gemini-flash-latest` alias, which Google
  keeps pointing at whatever their current recommended flash model is -
  avoids this breaking again the next time a dated model gets retired. All
  six `/api/ai/*` endpoints verified working end-to-end with a real key
  (chat history round-trip included).

## Open items / known gaps

- No mahalla-level location data (point or polygon) - blocks full zoom-to-
  mahalla on the map. Needs a new data source.
- Auth, user-attached anketa history, and PDF export are all designed-for
  but not yet built (see product flow in memory). These will need their own
  Postgres tables/migrations.
- Gemini is integrated as generic AI utility endpoints; nothing yet combines
  anketa answers + geo data + Gemini into the actual "business idea"
  generation feature described in the product flow.
