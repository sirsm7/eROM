export async function onRequestGet(context) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  try {
    const env = (context && context.env) ? context.env : {};
    const supabaseUrl = String(env.SUPABASE_URL || "").trim();
    const supabaseAnonKey = String(env.SUPABASE_ANON_KEY || "").trim();
    const gasEndpointUrl = String(env.GAS_ENDPOINT_URL || "").trim();

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Server configuration missing required environment secrets."
        }),
        {
          status: 500,
          headers
        }
      );
    }

    return new Response(
      JSON.stringify({
        SUPABASE_URL: supabaseUrl,
        SUPABASE_ANON_KEY: supabaseAnonKey,
        GAS_ENDPOINT_URL: gasEndpointUrl
      }),
      {
        status: 200,
        headers
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Unexpected edge runtime error while loading configuration."
      }),
      {
        status: 500,
        headers
      }
    );
  }
}