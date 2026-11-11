import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let supabaseClientInstance = null;
let activeChannel = null;
const timestampRegistry = new Map();

export async function getSupabaseClient() {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }
  if (window.ENV_READY) {
    await window.ENV_READY;
  }
  const env = window.__ENV || {};
  const url = env.SUPABASE_URL || '';
  const key = env.SUPABASE_ANON_KEY || '';
  if (!url || !key) {
    throw new Error('Supabase configuration credentials missing');
  }
  supabaseClientInstance = createClient(url, key);
  return supabaseClientInstance;
}

export function isLatestPayload(record) {
  if (!record || !record.booking_id) {
    return true;
  }
  const id = String(record.booking_id);
  const incomingTime = record.updated_at ? new Date(record.updated_at).getTime() : Date.now();
  const existingTime = timestampRegistry.get(id);

  if (existingTime && incomingTime < existingTime) {
    return false;
  }

  timestampRegistry.set(id, incomingTime);
  return true;
}

export function teardownRealtime(client) {
  const targetClient = client || supabaseClientInstance;
  if (activeChannel && targetClient && typeof targetClient.removeChannel === 'function') {
    targetClient.removeChannel(activeChannel);
    activeChannel = null;
  }
}

export function subscribeBookingsRealtime(client, onPayload) {
  const targetClient = client || supabaseClientInstance;
  if (!targetClient || typeof targetClient.channel !== 'function') {
    return null;
  }

  if (activeChannel) {
    teardownRealtime(targetClient);
  }

  activeChannel = targetClient.channel('public:erom_bookings')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'erom_bookings' },
      async (payload) => {
        const record = payload.new || payload.old;
        if (record && !isLatestPayload(record)) {
          return;
        }
        if (payload.eventType === 'DELETE' && record && record.booking_id) {
          timestampRegistry.delete(String(record.booking_id));
        }
        if (typeof onPayload === 'function') {
          await onPayload(payload);
        }
      }
    )
    .subscribe();

  return activeChannel;
}