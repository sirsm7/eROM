// src/storage/db.js

const DB_NAME = 'erom_db';
const DB_VERSION = 1;
const STORE_NAME = 'cache_store';

let dbInstance = null;

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      console.warn('[IndexedDB] API IndexedDB tidak disokong pada pelayar ini.');
      return resolve(null);
    }

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

    request.onerror = (event) => {
      console.error('[IndexedDB] Ralat membuka pangkalan data:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function setCache(key, data, ttlSeconds = 300) {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record = {
        cache_key: key,
        data: data,
        timestamp: Date.now(),
        ttl: ttlSeconds * 1000
      };

      const req = store.put(record);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal menulis ke cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada setCache:', err);
      resolve(false);
    }
  });
}

export async function getCacheEntry(key) {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) {
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
        console.error('[IndexedDB] Gagal membaca rekod cache:', req.error);
        resolve(null);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada getCacheEntry:', err);
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
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal memadam kunci cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada deleteCache:', err);
      resolve(false);
    }
  });
}

export async function deleteCacheByPrefix(prefix) {
  const db = await openDB();
  if (!db) return 0;

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
          resolve(deletedCount);
        }
      };

      req.onerror = () => {
        console.error('[IndexedDB] Gagal memadam awalan cache:', req.error);
        resolve(deletedCount);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada deleteCacheByPrefix:', err);
      resolve(0);
    }
  });
}

export async function clearExpiredCache() {
  const db = await openDB();
  if (!db) return 0;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const now = Date.now();
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
          resolve(purgedCount);
        }
      };

      req.onerror = () => {
        console.error('[IndexedDB] Gagal membersihkan cache luput:', req.error);
        resolve(purgedCount);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada clearExpiredCache:', err);
      resolve(0);
    }
  });
}

export async function clearAllCache() {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal mengosongkan storan cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada clearAllCache:', err);
      resolve(false);
    }
  });
}