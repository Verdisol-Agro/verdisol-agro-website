---
name: Video playback verification
description: Avoid mistaking Google Drive link access for working video playback.
---

A successful public Drive preview request is not evidence that the embedded player works.

**Why:** The Soil Analysis file was public, but Drive displayed “Unable to load video.” Its original used HEVC; a browser-compatible H.264/AAC copy loaded successfully through the website's native player.

**How to apply:** For video complaints, inspect the actual file's codecs and verify the served media, not only the preview page. Preserve the user's chosen footage. Prefer direct H.264/AAC MP4 playback with fast-start metadata and range support when Drive playback fails. Store durable video assets in App Storage rather than Git.

For Soil Analysis and Farm Valuation Assessment, the user explicitly requested playback through their Google Drive links rather than the hosted copies.

**Why:** The user requested the Google Drive player after being told that the website used an optimized hosted copy.

**How to apply:** Keep these cards on the chosen Drive embeds unless the user requests another change. Explain any Drive playback limitation rather than silently substituting hosted playback.
