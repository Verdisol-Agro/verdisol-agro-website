import { Storage } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
// Replit's sidecar supplies storage authentication; no credentials are exported.
const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export function soilAnalysisVideoFile() {
  const prefix = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(",")[0]?.trim();
  if (!prefix) throw new Error("Public media storage is not configured");
  const [bucket, ...parts] = prefix.replace(/^\/+/, "").split("/");
  if (!bucket) throw new Error("Invalid public media storage configuration");
  return storage.bucket(bucket).file([...parts, "soil-analysis-v1.mp4"].join("/"));
}
