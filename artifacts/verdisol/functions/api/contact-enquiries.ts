interface PagesEnv {
  ENQUIRY_API?: { fetch(request: Request): Promise<Response> };
}

export async function onRequest({ request, env }: { request: Request; env: PagesEnv }): Promise<Response> {
  const unavailable = () => Response.json({
    error: "Email delivery is not configured. Please email verdisolagro@gmail.com directly.",
  }, { status: 503, headers: { "Cache-Control": "no-store" } });
  if (!env.ENQUIRY_API) return unavailable();
  try {
    return await env.ENQUIRY_API.fetch(request);
  } catch {
    return unavailable();
  }
}
