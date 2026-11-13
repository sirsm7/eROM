window.ENV_READY = (async function initializeConfig() {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 10000) : null;

  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    };

    if (controller) {
      fetchOptions.signal = controller.signal;
    }

    const response = await fetch('/api/config', fetchOptions);

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const serverMessage = data && typeof data.error === 'string' && data.error.trim()
        ? data.error.trim()
        : `HTTP error fetching config: ${response.status}`;
      throw new Error(serverMessage);
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid configuration payload received.');
    }

    const resolvedConfig = {
      SUPABASE_URL: String(data.SUPABASE_URL || '').trim(),
      SUPABASE_ANON_KEY: String(data.SUPABASE_ANON_KEY || '').trim(),
      SUPABASE_SCHEMA: String(data.SUPABASE_SCHEMA || 'erom_ag').trim() || 'erom_ag',
      GAS_ENDPOINT_URL: String(data.GAS_ENDPOINT_URL || '').trim()
    };

    if (!resolvedConfig.SUPABASE_URL || !resolvedConfig.SUPABASE_ANON_KEY) {
      throw new Error('Missing required SUPABASE_URL or SUPABASE_ANON_KEY configuration.');
    }

    if (resolvedConfig.SUPABASE_SCHEMA.toLowerCase() === 'public') {
      throw new Error('Invalid SUPABASE_SCHEMA configuration. Public schema is disallowed.');
    }

    try {
      const parsedUrl = new URL(resolvedConfig.SUPABASE_URL);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        throw new Error('Invalid SUPABASE_URL protocol.');
      }
    } catch {
      throw new Error('Invalid SUPABASE_URL format received from configuration.');
    }

    window.__ENV = Object.freeze(resolvedConfig);
    return window.__ENV;
  } catch (err) {
    window.__ENV = Object.freeze({
      SUPABASE_URL: '',
      SUPABASE_ANON_KEY: '',
      SUPABASE_SCHEMA: 'erom_ag',
      GAS_ENDPOINT_URL: ''
    });

    if (err && err.name === 'AbortError') {
      throw new Error('Configuration request timed out.');
    }
    throw err;
  } finally {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  }
})();