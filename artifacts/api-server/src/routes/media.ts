import { Router, type IRouter } from "express";
import { publicVideoFile } from "../lib/public-video";

const router: IRouter = Router();

router.get(["/media/soil-analysis.mp4", "/media/farm-valuation.mp4"], async (req, res): Promise<void> => {
  try {
    const video = req.path === "/media/farm-valuation.mp4" ? "farm-valuation" : "soil-analysis";
    const file = publicVideoFile(video);
    const [metadata] = await file.getMetadata();
    const size = Number(metadata.size);
    if (!Number.isSafeInteger(size) || size < 1) throw new Error("Invalid video");
    res.set({
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    });

    let start = 0;
    let end = size - 1;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2])) {
        res.status(416).set("Content-Range", `bytes */${size}`).end();
        return;
      }
      if (!match[1]) {
        start = Math.max(0, size - Number(match[2]));
      } else {
        start = Number(match[1]);
        if (match[2]) end = Math.min(Number(match[2]), size - 1);
      }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) ||
          start > end || start >= size) {
        res.status(416).set("Content-Range", `bytes */${size}`).end();
        return;
      }
      res.status(206).set("Content-Range", `bytes ${start}-${end}/${size}`);
    }
    res.set("Content-Length", String(end - start + 1));
    if (req.method === "HEAD") { res.end(); return; }
    const stream = file.createReadStream({ start, end });
    stream.on("error", () => {
      req.log.error("Public video stream failed");
      res.destroy();
    });
    res.on("close", () => stream.destroy());
    stream.pipe(res);
  } catch {
    req.log.error("Public video could not be loaded");
    if (!res.headersSent) {
      res.status(503).removeHeader("Content-Length");
      res.removeHeader("Accept-Ranges");
      res.set({ "Cache-Control": "no-store", "Content-Type": "application/json" });
      res.json({ error: "The video is temporarily unavailable. Please try again." });
    }
  }
});

export default router;
