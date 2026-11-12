# VerdiSol Agro

Agricultural consultancy website serving Zimbabwe and Africa.
See `README.md` for GitHub setup, hosting requirements and email configuration.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (managed port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build the website and API
- `pnpm run verify` — typecheck, asset checks, isolated API tests and production builds
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- The current enquiry flow does not use the database. Do not push database schema changes for email-only work.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod 4
- API codegen: Orval (from OpenAPI spec)
- Build: Vite frontend and esbuild ESM API bundle

## Where things live

- Website: `artifacts/verdisol`
- Enquiry API and tests: `artifacts/api-server`
- OpenAPI source: `lib/api-spec/openapi.yaml`
- Theme: `artifacts/verdisol/src/index.css`
- Required uploaded media: `attached_assets`

## Architecture decisions

The frontend and API use the same origin, with API requests routed under `/api`.
Email authentication is provided by the managed Gmail connector and is not exported to GitHub.

## Product

Company information, service details, project filtering, image slideshows, embedded videos and a direct enquiry form.

## User preferences

Preserve the existing design and supplied media when making reliability fixes.

## Gotchas

Run `pnpm run verify` before sharing changes. Required website media must not be
excluded from version control. Automated tests must mock email delivery.

## Pointers

- See `README.md` for setup and `lib/api-spec/openapi.yaml` for the API contract.
