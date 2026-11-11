export async function onRequestGet(context) {
  const env = context.env || {};
  const config = {
    SUPABASE_URL: env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || "",
    GAS_ENDPOINT_URL: env.GAS_ENDPOINT_URL || ""
  };

  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}