# VerdiSol Agro

Agricultural consultancy website for Zimbabwe and Africa. Includes service details,
project filters, photo slideshows, Google Drive video embeds and an enquiry form.

## Requirements

- Node.js 24 and pnpm 10.26.1
- Linux x64 (the workspace currently excludes other native build targets)
- Install from the repository root, not from an individual app folder.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run verify
```

`verify` checks all TypeScript packages, verifies required website assets, runs
isolated enquiry API tests and builds the API server and website. Tests mock email
delivery; they do not send Gmail messages or require mailbox credentials.

## Development

On Replit, use the existing website and API workflows. They supply routing and
runtime settings. For a local checkout:

```sh
# Terminal 1: web, default port 5173 and base path /
pnpm --filter @workspace/verdisol run dev

# Terminal 2: API
PORT=8080 pnpm --filter @workspace/api-server run dev
```

Serve the frontend and API behind the same origin: route `/api/*` to port 8080 and
other requests to the web server. The frontend calls `/api/contact-enquiries`.
Do not point visitors' browsers at localhost or expose development servers in production.

## Build and hosting

```sh
pnpm --filter @workspace/verdisol run build
pnpm --filter @workspace/api-server run build
```

- Frontend output: `artifacts/verdisol/dist/public`
- API output: `artifacts/api-server/dist/index.mjs`
- Start API: `PORT=8080 NODE_ENV=production pnpm --filter @workspace/api-server run start`
- The frontend host must serve `index.html` for SPA routes such as `/about`,
  `/services`, `/projects` and `/contact`.
- A non-root frontend path requires `BASE_PATH` with a leading and trailing slash
  at build time. The API remains available on `/api`.
- GitHub stores the source; uploading code does not publish the app.
  GitHub Pages alone cannot run the Express server or send enquiry emails.

## Email delivery and private configuration

The website sends enquiries to **verdisolagro@gmail.com** through Replit's managed
Gmail connector. The sender is the connected VerdiSol Gmail account. The visitor's
email, when supplied, is used as Reply-To.

**Gmail authorization is not stored in GitHub and does not move with a clone.**
The managed connector must remain connected in the Replit runtime. Hosting outside
that runtime needs a separately configured server-side email provider/authentication
adapter; that external setup is not included. Never put Gmail tokens, passwords or
other credentials into source code or GitHub.

Google Drive media must remain publicly viewable by link. Google controls video
availability and playback. Imported local images are under `attached_assets/`;
include the required assets when committing. `pnpm run check:assets` detects missing
or ignored website images.

The Soil Analysis and Farm Valuation Assessment videos are served directly from
Replit App Storage through `/api/media/soil-analysis.mp4` and
`/api/media/farm-valuation.mp4`, with byte-range support for playback and seeking.
They are H.264/AAC web-optimized copies of the supplied Drive videos, not Drive iframes.
App Storage authorization and the video object do not transfer with a GitHub clone;
external hosting needs the video migrated to suitable storage and this route adapted.

The enquiry endpoint validates and trims input, uses a fixed recipient, reports
provider failures and caps submissions at 30 per 15 minutes per server instance.
This is basic protection, not a CAPTCHA or a distributed anti-spam service.

## GitHub preparation

1. Run `pnpm run verify`.
2. Review `git status` and include the website source, lockfile and required images.
3. Do not upload `.env` files, local credentials, `node_modules` or generated builds.
4. Commit to your intended repository. Check its visibility before sharing:
   the repository contains your selected company photographs and maps.
5. GitHub Actions runs the same verification on pushes and pull requests.

## Project structure

- `artifacts/verdisol`: React / Vite website
- `artifacts/api-server`: Express API and enquiry regression tests
- `artifacts/mockup-sandbox`: existing component-preview workspace
- `lib/api-spec`: OpenAPI contract and code generation
- `lib/api-client-react`, `lib/api-zod`: generated API clients and validation
- `scripts/check-website-assets.mjs`: GitHub asset checks

Edit the OpenAPI contract before changing API inputs or outputs, then run:

```sh
pnpm --filter @workspace/api-spec run codegen
```
