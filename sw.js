const CACHE_NAME = 'erom-ag-v15';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css?v=20261112',
  './assets/js/app.js?v=20261112',
  './assets/img/logo-kpm.png',
  './config.js?v=20261112',
  './idb-cache.js',
  './realtime.js',
  './migration.js?v=20261112',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((assetUrl) => {
          const freshRequest = new Request(assetUrl, { cache: 'reload' });
          return fetch(freshRequest).then((response) => {
            if (!response || response.status !== 200) {
              throw new Error(`Failed to precache asset: ${assetUrl}`);
            }
            return cache.put(assetUrl, response);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const cacheControl = networkResponse.headers.get('Cache-Control') || '';
        const shouldCache =
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic' &&
          !cacheControl.toLowerCase().includes('no-store');

        if (shouldCache) {
          const responseClone = networkResponse.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              return cache.put(event.request, responseClone);
            })
            .catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          const fallbackResponse = await caches.match('./index.html');
          if (fallbackResponse) {
            return fallbackResponse;
          }
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});