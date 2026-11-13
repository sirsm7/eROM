let supabaseClientInstance = null;
let clientInitPromise = null;
let activeChannel = null;
let activeClient = null;
let activePayloadHandler = null;
let activeSyncHandler = null;
let isSubscribed = false;
let isReconnecting = false;
let lifecycleListenersBound = false;

const timestampRegistry = new Map();

export function getActiveSchema() {
  const env = (typeof window !== 'undefined' && window.__ENV) ? window.__ENV : {};
  const schema = String(env.SUPABASE_SCHEMA || 'erom_ag').trim();
  if (!schema || schema.toLowerCase() === 'public') {
    return 'erom_ag';
  }
  return schema;
}

async function resolveCreateClient() {
  if (
    typeof window !== 'undefined' &&
    window.supabase &&
    typeof window.supabase.createClient === 'function'
  ) {
    return window.supabase.createClient;
  }

  const mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  if (mod && typeof mod.createClient === 'function') {
    return mod.createClient;
  }

  throw new Error('Supabase client library unavailable.');
}

function resolveRecordId(record) {
  if (!record || typeof record !== 'object') {
    return null;
  }
  const rawId = record.id ?? record.booking_id;
  if (rawId === undefined || rawId === null || rawId === '') {
    return null;
  }
  return String(rawId);
}

function createChannelSubscription(client) {
  if (!client || typeof client.channel !== 'function') {
    return null;
  }

  const targetSchema = getActiveSchema();

  return client
    .channel(`${targetSchema}:erom_bookings`)
    .on(
      'postgres_changes',
      { event: '*', schema: targetSchema, table: 'erom_bookings' },
      async (payload) => {
        const record = payload.new || payload.old;
        const recordId = resolveRecordId(record);

        if (record && !isLatestPayload(record)) {
          return;
        }

        if (payload.eventType === 'DELETE' && recordId) {
          timestampRegistry.delete(recordId);
        }

        if (typeof activePayloadHandler === 'function') {
          await activePayloadHandler(payload);
        }
      }
    )
    .subscribe();
}

async function removeChannelSafely(client, channel) {
  if (!channel || !client || typeof client.removeChannel !== 'function') {
    return;
  }
  try {
    await client.removeChannel(channel);
  } catch {}
}

async function handleResumeSync() {
  if (!isSubscribed || !activeClient || isReconnecting) {
    return;
  }

  isReconnecting = true;
  try {
    const channelState = activeChannel ? activeChannel.state : null;
    if (!activeChannel || channelState !== 'joined') {
      const staleChannel = activeChannel;
      activeChannel = null;
      await removeChannelSafely(activeClient, staleChannel);

      if (isSubscribed && activeClient) {
        activeChannel = createChannelSubscription(activeClient);
      }
    }

    if (isSubscribed && typeof activeSyncHandler === 'function') {
      await activeSyncHandler();
    }
  } finally {
    isReconnecting = false;
  }
}

function handleVisibilityChange() {
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    handleResumeSync();
  }
}

function handleNetworkOnline() {
  handleResumeSync();
}

function bindLifecycleListeners() {
  if (lifecycleListenersBound) {
    return;
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleNetworkOnline);
  }
  lifecycleListenersBound = true;
}

export function resetTimestampRegistry() {
  timestampRegistry.clear();
}

export async function getSupabaseClient() {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  if (clientInitPromise) {
    return clientInitPromise;
  }

  clientInitPromise = (async () => {
    try {
      if (typeof window !== 'undefined' && window.ENV_READY) {
        await window.ENV_READY;
      }
      const env = (typeof window !== 'undefined' && window.__ENV) ? window.__ENV : {};
      const url = String(env.SUPABASE_URL || '').trim();
      const key = String(env.SUPABASE_ANON_KEY || '').trim();
      const schema = getActiveSchema();
      if (!url || !key) {
        throw new Error('Supabase configuration credentials missing');
      }
      const createClient = await resolveCreateClient();
      supabaseClientInstance = createClient(url, key, {
        db: {
          schema
        }
      });
      return supabaseClientInstance;
    } finally {
      clientInitPromise = null;
    }
  })();

  return clientInitPromise;
}

export function isLatestPayload(record) {
  const id = resolveRecordId(record);
  if (!id) {
    return true;
  }
  const parsedTime = record.updated_at ? Date.parse(record.updated_at) : NaN;
  const incomingTime = Number.isNaN(parsedTime) ? Date.now() : parsedTime;
  const existingTime = timestampRegistry.get(id);

  if (existingTime && incomingTime < existingTime) {
    return false;
  }

  timestampRegistry.set(id, incomingTime);
  return true;
}

export async function teardownRealtime(client) {
  const targetClient = client || activeClient || supabaseClientInstance;
  const channelToRemove = activeChannel;

  isSubscribed = false;
  activeChannel = null;
  activePayloadHandler = null;
  activeSyncHandler = null;

  await removeChannelSafely(targetClient, channelToRemove);
}

export function subscribeBookingsRealtime(client, onPayload, onReconnectSync) {
  const targetClient = client || supabaseClientInstance;
  if (!targetClient || typeof targetClient.channel !== 'function') {
    return null;
  }

  const previousChannel = activeChannel;
  activeChannel = null;

  activeClient = targetClient;
  activePayloadHandler = typeof onPayload === 'function' ? onPayload : null;
  activeSyncHandler = typeof onReconnectSync === 'function' ? onReconnectSync : null;
  isSubscribed = true;

  bindLifecycleListeners();

  if (previousChannel) {
    removeChannelSafely(targetClient, previousChannel).then(() => {
      if (isSubscribed && activeClient === targetClient && !activeChannel) {
        activeChannel = createChannelSubscription(targetClient);
      }
    });
    return null;
  }

  activeChannel = createChannelSubscription(targetClient);
  return activeChannel;
}