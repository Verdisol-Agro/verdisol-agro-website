---
name: GitHub media inclusion
description: Prevent uploaded website media from disappearing in repository copies.
---

Do not assume an uploaded file will be included in GitHub just because the website loads it in the workspace.

**Why:** Workspace-wide Git ignore rules excluded newly uploaded photographs even while the live website could load them. A repository clone would have lacked required media.

**How to apply:** When adding uploaded website media, verify its inclusion with `git check-ignore` and the website asset check. Preserve explicit exceptions for required media without broadly including unrelated uploads.
