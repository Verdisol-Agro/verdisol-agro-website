import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = new Set();
const failures = [];

async function scan(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const filename = path.join(folder, entry.name);
    if (entry.isDirectory()) await scan(filename);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const source = await readFile(filename, "utf8");
      for (const match of source.matchAll(/@assets\/([^"'`)\s]+)/g)) {
        required.add(`attached_assets/${match[1]}`);
      }
    }
  }
}

await scan(path.join(root, "artifacts/verdisol/src"));
required.add("artifacts/verdisol/public/verdisol-logo.png");

for (const asset of required) {
  try {
    const info = await stat(path.join(root, asset));
    if (!info.isFile() || info.size === 0) failures.push(`Empty or invalid asset: ${asset}`);
  } catch {
    failures.push(`Missing website asset: ${asset}`);
  }
  const ignored = spawnSync("git", ["check-ignore", "-q", asset], { cwd: root });
  if (ignored.status === 0) failures.push(`Website asset excluded from GitHub: ${asset}`);
  else if (ignored.status !== 1) failures.push(`Could not check Git rules for ${asset}`);
}

const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" })
  .split("\0").filter(Boolean);
for (const filename of tracked) {
  if (/(^|\/)\.env(?:\..+)?$/.test(filename) && !filename.endsWith(".env.example")) {
    failures.push(`Local environment file must not be committed: ${filename}`);
  }
  try {
    if ((await stat(path.join(root, filename))).size >= 95 * 1024 * 1024) {
      failures.push(`File is too large for a normal GitHub upload: ${filename}`);
    }
  } catch {
    failures.push(`Tracked file missing from checkout: ${filename}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${required.size} website assets and ${tracked.length} tracked files.`);
}
