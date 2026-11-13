const DB_NAME = 'erom_db';
const DB_VERSION = 3;
const STORE_NAME = 'cache_store';

let dbInstance = null;
let openPromise = null;

if (typeof window !== 'undefined' && !(window.__memoryCache instanceof Map)) {
  window.__memoryCache = new Map();
}

function isValidCacheRecord(item) {
  return Boolean(
    item &&
    typeof item === 'object' &&
    typeof item.cache_key === 'string' &&
    typeof item.timestamp === 'number' &&
    typeof item.ttl === 'number' &&
    Object.prototype.hasOwnProperty.call(item, 'data')
  );
}

function getMemoryEntry(key) {
  if (typeof window === 'undefined' || !(window.__memoryCache instanceof Map) || !window.__memoryCache.has(key)) {
    return null;
  }
  const item = window.__memoryCache.get(key);
  if (!isValidCacheRecord(item)) {
    window.__memoryCache.delete(key);
    return null;
  }
  const age = Date.now() - item.timestamp;
  return {
    data: item.data,
    isStale: age > (item.ttl || 0),
    timestamp: item.timestamp
  };
}

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  if (openPromise) {
    return openPromise;
  }

  openPromise = new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      openPromise = null;
      return resolve(null);
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }
        db.createObjectStore(STORE_NAME, { keyPath: 'cache_key' });
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        dbInstance.onversionchange = () => {
          dbInstance.close();
          dbInstance = null;
        };
        dbInstance.onclose = () => {
          dbInstance = null;
        };
        dbInstance.onerror = () => {
          dbInstance = null;
        };
        openPromise = null;
        resolve(dbInstance);
      };

      request.onerror = () => {
        openPromise = null;
        resolve(null);
      };

      request.onblocked = () => {
        openPromise = null;
        resolve(null);
      };
    } catch {
      openPromise = null;
      resolve(null);
    }
  });

  return openPromise;
}

export async function setCache(key, data, ttlSeconds = 300) {
  const timestamp = Date.now();
  const ttl = Math.max(0, Number(ttlSeconds) || 0) * 1000;
  const record = {
    cache_key: String(key),
    data: data,
    timestamp: timestamp,
    ttl: ttl
  };

  const db = await openDB();
  if (!db) {
    if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
      window.__memoryCache.set(record.cache_key, record);
      return true;
    }
    return false;
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      if (ok) {
        if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
          window.__memoryCache.delete(record.cache_key);
        }
      } else if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
        window.__memoryCache.set(record.cache_key, record);
      }
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}

export async function getCacheEntry(key) {
  const normalizedKey = String(key);
  const db = await openDB();
  if (!db) {
    return getMemoryEntry(normalizedKey);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (val) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(normalizedKey);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) {
          return finish(getMemoryEntry(normalizedKey));
        }

        if (!isValidCacheRecord(item)) {
          deleteCache(normalizedKey).catch(() => {});
          return finish(null);
        }

        const age = Date.now() - item.timestamp;
        finish({
          data: item.data,
          isStale: age > (item.ttl || 0),
          timestamp: item.timestamp
        });
      };

      req.onerror = () => finish(getMemoryEntry(normalizedKey));
      tx.onerror = () => finish(getMemoryEntry(normalizedKey));
      tx.onabort = () => finish(getMemoryEntry(normalizedKey));
    } catch {
      dbInstance = null;
      finish(getMemoryEntry(normalizedKey));
    }
  });
}

export async function getCache(key) {
  const entry = await getCacheEntry(key);
  if (!entry || entry.isStale) return null;
  return entry.data;
}

export async function deleteCache(key) {
  const normalizedKey = String(key);
  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    window.__memoryCache.delete(normalizedKey);
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(normalizedKey);

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}

export async function deleteCacheByPrefix(prefix) {
  if (prefix === undefined || prefix === null) return 0;
  const normalizedPrefix = String(prefix);
  if (!normalizedPrefix) return 0;

  let memoryDeleted = 0;

  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    for (const k of window.__memoryCache.keys()) {
      if (typeof k === 'string' && k.startsWith(normalizedPrefix)) {
        window.__memoryCache.delete(k);
        memoryDeleted++;
      }
    }
  }

  const db = await openDB();
  if (!db) return memoryDeleted;

  return new Promise((resolve) => {
    let settled = false;
    let deletedCount = 0;
    const finish = (count) => {
      if (settled) return;
      settled = true;
      resolve(count);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && cursor.key.startsWith(normalizedPrefix)) {
            cursor.delete();
            deletedCount++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => finish(deletedCount + memoryDeleted);
      tx.onerror = () => finish(memoryDeleted);
      tx.onabort = () => finish(memoryDeleted);
      req.onerror = () => finish(memoryDeleted);
    } catch {
      dbInstance = null;
      finish(memoryDeleted);
    }
  });
}

export async function clearExpiredCache() {
  const now = Date.now();
  let purgedMemory = 0;

  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    for (const [k, v] of window.__memoryCache.entries()) {
      if (!isValidCacheRecord(v) || (typeof v.ttl === 'number' && now - v.timestamp > v.ttl)) {
        window.__memoryCache.delete(k);
        purgedMemory++;
      }
    }
  }

  const db = await openDB();
  if (!db) return purgedMemory;

  return new Promise((resolve) => {
    let settled = false;
    let purgedCount = 0;
    const finish = (count) => {
      if (settled) return;
      settled = true;
      resolve(count);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const item = cursor.value;
          if (!isValidCacheRecord(item) || (typeof item.ttl === 'number' && now - item.timestamp > item.ttl)) {
            cursor.delete();
            purgedCount++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => finish(purgedCount + purgedMemory);
      tx.onerror = () => finish(purgedMemory);
      tx.onabort = () => finish(purgedMemory);
      req.onerror = () => finish(purgedMemory);
    } catch {
      dbInstance = null;
      finish(purgedMemory);
    }
  });
}

export async function clearAllCache() {
  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    window.__memoryCache.clear();
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}