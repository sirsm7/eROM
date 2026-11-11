window.ENV_READY = (async function initializeConfig() {
  try {
    const response = await fetch('/api/config', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error fetching config: ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid configuration payload received.');
    }

    const resolvedConfig = {
      SUPABASE_URL: String(data.SUPABASE_URL || '').trim(),
      SUPABASE_ANON_KEY: String(data.SUPABASE_ANON_KEY || '').trim(),
      GAS_ENDPOINT_URL: String(data.GAS_ENDPOINT_URL || '').trim()
    };

    window.__ENV = Object.freeze(resolvedConfig);
    return window.__ENV;
  } catch (err) {
    window.__ENV = Object.freeze({
      SUPABASE_URL: '',
      SUPABASE_ANON_KEY: '',
      GAS_ENDPOINT_URL: ''
    });
    throw err;
  }
})();