---
name: Cloudflare enquiry hosting
description: User's chosen frontend host and direct Gmail delivery requirement.
---

The user hosts the frontend on Cloudflare Pages and chose direct Gmail authorization for the enquiry backend.

**Why:** A static frontend upload did not include the Replit API, and Replit-managed Gmail authorization is not portable to Cloudflare.

**How to apply:** Preserve the existing form design and Gmail mailbox. Do not claim a GitHub push fixes live delivery: independent Google OAuth authorization, the Cloudflare backend and its Pages binding must be configured and delivery verified first. The user chose Gmail directly rather than a domain-based transactional provider.
