const DB_NAME = 'erom_db';
const DB_VERSION = 1;
const STORE_NAME = 'cache_store';

let dbInstance = null;

if (typeof window !== 'undefined' && !window.__memoryCache) {
  window.__memoryCache = new Map();
}

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return resolve(null);
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'cache_key' });
        }
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        dbInstance.onversionchange = () => {
          dbInstance.close();
          dbInstance = null;
        };
        resolve(dbInstance);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

export async function setCache(key, data, ttlSeconds = 300) {
  const timestamp = Date.now();
  const ttl = ttlSeconds * 1000;
  const record = {
    cache_key: key,
    data: data,
    timestamp: timestamp,
    ttl: ttl
  };

  const db = await openDB();
  if (!db) {
    if (typeof window !== 'undefined' && window.__memoryCache) {
      window.__memoryCache.set(key, record);
      return true;
    }
    return false;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        if (typeof window !== 'undefined' && window.__memoryCache) {
          window.__memoryCache.set(key, record);
        }
        resolve(false);
      };
    } catch {
      if (typeof window !== 'undefined' && window.__memoryCache) {
        window.__memoryCache.set(key, record);
      }
      resolve(false);
    }
  });
}

export async function getCacheEntry(key) {
  const db = await openDB();
  if (!db) {
    if (typeof window !== 'undefined' && window.__memoryCache && window.__memoryCache.has(key)) {
      const item = window.__memoryCache.get(key);
      const now = Date.now();
      const age = now - item.timestamp;
      return {
        data: item.data,
        isStale: age > (item.ttl || 0),
        timestamp: item.timestamp
      };
    }
    return null;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) {
          if (typeof window !== 'undefined' && window.__memoryCache && window.__memoryCache.has(key)) {
            const memItem = window.__memoryCache.get(key);
            const now = Date.now();
            const age = now - memItem.timestamp;
            return resolve({
              data: memItem.data,
              isStale: age > (memItem.ttl || 0),
              timestamp: memItem.timestamp
            });
          }
          return resolve(null);
        }

        const now = Date.now();
        const age = now - item.timestamp;
        const isStale = age > (item.ttl || 0);

        resolve({
          data: item.data,
          isStale: isStale,
          timestamp: item.timestamp
        });
      };

      req.onerror = () => {
        if (typeof window !== 'undefined' && window.__memoryCache) {
          const memItem = window.__memoryCache.get(key);
          const now = Date.now();
          const age = now - memItem.timestamp;
          return resolve({
            data: memItem.data,
            isStale: age > (memItem.ttl || 0),
            timestamp: memItem.timestamp
          });
        }
        resolve(null);
      };
    } catch {
      if (typeof window !== 'undefined' && window.__memoryCache) {
        const memItem = window.__memoryCache.get(key);
        const now = Date.now();
        const age = now - memItem.timestamp;
        return resolve({
          data: memItem.data,
          isStale: age > (memItem.ttl || 0),
          timestamp: memItem.timestamp
        });
      }
      resolve(null);
    }
  });
}

export async function getCache(key) {
  const entry = await getCacheEntry(key);
  if (!entry) return null;
  if (entry.isStale) return null;
  return entry.data;
}

export async function deleteCache(key) {
  if (typeof window !== 'undefined' && window.__memoryCache) {
    window.__memoryCache.delete(key);
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

export async function deleteCacheByPrefix(prefix) {
  let memoryDeleted = 0;
  if (typeof window !== 'undefined' && window.__memoryCache) {
    for (const k of window.__memoryCache.keys()) {
      if (typeof k === 'string' && k.startsWith(prefix)) {
        window.__memoryCache.delete(k);
        memoryDeleted++;
      }
    }
  }

  const db = await openDB();
  if (!db) return memoryDeleted;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      let deletedCount = 0;

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && cursor.key.startsWith(prefix)) {
            cursor.delete();
            deletedCount++;
          }
          cursor.continue();
        } else {
          resolve(deletedCount + memoryDeleted);
        }
      };

      req.onerror = () => resolve(memoryDeleted);
    } catch {
      resolve(memoryDeleted);
    }
  });
}

export async function clearExpiredCache() {
  const now = Date.now();
  let purgedMemory = 0;

  if (typeof window !== 'undefined' && window.__memoryCache) {
    for (const [k, v] of window.__memoryCache.entries()) {
      if (v && v.timestamp && v.ttl && (now - v.timestamp > v.ttl)) {
        window.__memoryCache.delete(k);
        purgedMemory++;
      }
    }
  }

  const db = await openDB();
  if (!db) return purgedMemory;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      let purgedCount = 0;

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const item = cursor.value;
          if (item && item.timestamp && item.ttl && (now - item.timestamp > item.ttl)) {
            cursor.delete();
            purgedCount++;
          }
          cursor.continue();
        } else {
          resolve(purgedCount + purgedMemory);
        }
      };

      req.onerror = () => resolve(purgedMemory);
    } catch {
      resolve(purgedMemory);
    }
  });
}

export async function clearAllCache() {
  if (typeof window !== 'undefined' && window.__memoryCache) {
    window.__memoryCache.clear();
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}