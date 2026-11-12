# Cloudflare Pages + direct Gmail enquiries

The frontend and its design are unchanged. Cloudflare Pages does not run the
Replit Express server. The new backend is a private Worker, reached by a Pages
Function through an `ENQUIRY_API` service binding:

`POST /api/contact-enquiries → Pages Function → verdisol-enquiries Worker → Gmail API`

**Adding or pushing this code alone does not authorize Gmail or deploy the
Worker. Complete the following steps before claiming the live form is fixed.**
No Replit connector identity, App Storage credential or session secret is needed.

## 1. Authorize the Gmail account independently

Use a Google Cloud project owned by the business:

1. Enable the **Gmail API**.
2. Configure the Google Auth Platform OAuth consent screen. Use the appropriate
   audience for the business account, and comply with Google's verification
   requirements. For initial testing, add the sending account as a test user.
3. Create an OAuth client with application type **Web application**.
4. For a one-time setup using Google's OAuth 2.0 Playground, add exactly
   `https://developers.google.com/oauthplayground` as an authorized redirect URI.
5. Open <https://developers.google.com/oauthplayground/>. In its settings, enable
   **Use your own OAuth credentials**, enter the client ID and client secret
   directly into Google's tool, and select offline access.
6. Authorize only `https://www.googleapis.com/auth/gmail.send`. Sign in as
   **verdisolagro@gmail.com**, not a personal or unrelated account.
7. Exchange the authorization code for tokens. Enter the refresh token directly
   into Cloudflare's encrypted Worker secret settings in step 3.

**Never paste the client secret, refresh token, authorization code or access token
into chat, GitHub, frontend variables or committed files.** Do not use Playground's
default shared OAuth client for production. Use your own client as above.

External OAuth applications in Google's **Testing** mode commonly receive refresh
tokens that expire after seven days for Gmail scopes. Complete the appropriate
production publishing/verification process; do not depend on testing-mode
credentials for an unattended production form. Revocation also stops delivery.

References:
- <https://developers.google.com/identity/protocols/oauth2/web-server#offline>
- <https://developers.google.com/workspace/gmail/api/guides/sending>
- <https://developers.google.com/identity/protocols/oauth2#expiration>

## 2. Build and verify locally

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm run verify
pnpm --filter @workspace/verdisol run cf:check
```

`cf:check` only builds/dry-runs; it does not publish or send email.
Automated email tests use fake credentials and mock Google responses.

## 3. Create the private Worker and configure its secrets

Review `artifacts/verdisol/cloudflare/wrangler.jsonc` before deploying.
The configured production origin is `https://verdisol-agro-website.pages.dev`.
If a custom domain is later used, update `ALLOWED_ORIGIN` to that exact origin.

### Monorepo deployment target

The existing Workers application is **`artifacts/verdisol/cloudflare/`**.
Its entry point is `worker.ts` and its configuration is `wrangler.jsonc` in
that same directory. Its owning package is `@workspace/verdisol`, declared
in **`artifacts/verdisol/package.json`**; the `cloudflare` directory does not
need a separate package or a duplicate backend.

Do **not** run bare `npx wrangler deploy` at the repository root. The root
`wrangler.jsonc` belongs to **Pages**, not this Worker, and automatic workspace
application detection is not the deployment path for this project.
`artifacts/api-server` is the separate Replit Express server and is not the
Cloudflare Workers target.

From the repository root, the explicit Worker deployment command is:

```sh
pnpm run deploy:worker
```

This selects `@workspace/verdisol` and runs
`cd cloudflare && wrangler deploy --config wrangler.jsonc` from that package.
Wrangler therefore executes inside `artifacts/verdisol/cloudflare/` with the
existing Worker configuration, rather than detecting an app at workspace root.

For a **separate Workers Builds project** connected to this repository, use:

| Setting | Value |
| --- | --- |
| Root directory | `artifacts/verdisol` |
| Build command | `pnpm run cf:worker:check` |
| Deploy command | `pnpm run cf:worker:deploy` |
| Dependency installation | Install the pnpm workspace from the repository root using `pnpm install --frozen-lockfile` |

The build command only bundles locally with `--dry-run`; it does not deploy.
The deploy script enters the nested Worker directory explicitly. Retain access
to the complete repository and its shared `lib/` packages during installation
and bundling. Do not install this package as an isolated copy.

These are **Worker settings only**. Do not replace the existing Pages project
or change its frontend build/output settings to these commands. Worker
deployment does not upload the Pages frontend.

Using a trusted local terminal with Cloudflare access:

```sh
pnpm --filter @workspace/verdisol exec wrangler login
pnpm run deploy:worker
```

This creates `verdisol-enquiries` and its SQLite-backed `EnquiryGuard` Durable
Object. It has no public workers.dev URL; Pages reaches it privately.

In **Cloudflare → Workers & Pages → verdisol-enquiries → Settings → Variables
and Secrets**, add these as **encrypted secrets**:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`

Alternatively use interactive secret prompts from a trusted local terminal:

```sh
pnpm --filter @workspace/verdisol exec wrangler secret put GOOGLE_CLIENT_ID --config cloudflare/wrangler.jsonc
pnpm --filter @workspace/verdisol exec wrangler secret put GOOGLE_CLIENT_SECRET --config cloudflare/wrangler.jsonc
pnpm --filter @workspace/verdisol exec wrangler secret put GOOGLE_REFRESH_TOKEN --config cloudflare/wrangler.jsonc
```

Do not pass secret values on the command line or save them in the Wrangler file.
Both sender and recipient are fixed server-side to `verdisolagro@gmail.com`.
The visitor's validated optional email is used only as Reply-To.

## 4. Deploy Pages Functions, not only static assets

Keep the Pages production branch as `main`. Choose the instructions matching your
existing Pages **Root directory**:

| Root directory | Build command | Output directory |
| --- | --- | --- |
| Repository root / blank | `pnpm --filter @workspace/verdisol run build` | `artifacts/verdisol/dist/public` |
| `artifacts/verdisol` | `pnpm run build` | `dist/public` |

Use Node 24 and pnpm 10.26.1. Both roots have a `wrangler.jsonc` and a
`functions/api/contact-enquiries.ts` entry point. They declare a production
service binding named **ENQUIRY_API** to **verdisol-enquiries**.

Deploy the Worker **before** redeploying Pages, so its binding can resolve.
Use a Git-integrated Pages build, or Wrangler from the selected project root:

```sh
# From the repository root, after the frontend build:
pnpm --filter @workspace/verdisol exec wrangler pages deploy dist/public --project-name verdisol-agro-website --branch main
```

The command runs inside the web package and uses that package's Pages config and
Functions directory. A dashboard drag-and-drop upload of static files alone does
not install this backend.

`public/_routes.json` restricts Pages Function invocation to the enquiry endpoint.
Do not replace it with an SPA catch-all that swallows `/api/contact-enquiries`.
Production uses the service binding; preview intentionally has **no production
email binding**, and returns 503 instead of emailing real customers. Use an
explicit separate Worker and test mailbox for a fully authorized staging setup.

Review any pre-existing dashboard settings before adopting the checked-in
Wrangler configuration: it becomes the configuration source of truth.

## 5. Verify before announcing success

1. `GET /api/contact-enquiries` should return **405 JSON**, not website HTML.
   This checks routing without sending an email.
2. Confirm the Worker has all three encrypted secrets. A configured health
   response only checks presence, not whether Google authorization is valid.
3. Run one explicitly approved real enquiry and verify the message reaches
   `verdisolagro@gmail.com`. Check that Reply-To opens a reply to the visitor.
4. Check Cloudflare request status logs for the Worker and Pages Function. The
   code does not log enquiry contents, Google responses or credentials.
5. Confirm failures leave every typed field intact.

Success is returned only after Gmail returns a message ID. Gmail acceptance is
not an inbox-delivery guarantee.

## Reliability and safety

- Shared OpenAPI/Zod validation, actual 32 KB body limit, fixed recipient and JSON
  errors; no general-purpose email relay.
- Strict shared 30-attempt/15-minute mailbox cap in one Durable Object, not
  per-instance memory. Invalid input is rejected before the sending quota.
- Form-generated UUID stays the same for retries of identical details in the same
  mounted form. The Worker stores only a digest, state and timestamp for 24 hours.
- Successful duplicates return the same acceptance result without another send.
  A send whose response was lost is **not** automatically retried. The form asks
  the visitor to contact the mailbox rather than risk duplicate messages.
- Reloading or editing a form creates a new submission identity. This is not
  exactly-once email delivery across reloads; Gmail has no send-idempotency key.
- OAuth refresh failures occur before sending and can be retried safely.
- No customer-message database or video migration is required. The Durable
  Object's limited metadata is for rate limiting and duplicate protection only.
- Origin checking is not bot authentication. Consider Turnstile separately if
  public-form spam becomes a problem; do not expose a public unrestricted Worker.
- Do not remove the working Replit development handler until Cloudflare delivery
  has been verified. Reverting the Pages deployment is the rollback path.
