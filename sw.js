// KEMASKINI: VERSI 9 (PENGASINGAN SAME-ORIGIN UNTUK ELAK ISU CSP CDN & 408)
const CACHE_NAME = 'erom-ag-v9'; 
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/img/logo-kpm.png',
  './src/api/supabaseClient.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Meng-cache aset asas (v9)');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Membuang cache lama:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Strategy: Network First dengan Had Same-Origin Sahaja
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // Hadkan pemintasan hanya untuk domain setempat (Same-Origin)
  // Permintaan ke CDN luaran (SweetAlert2, Cloudflare, Google Fonts) dilepaskan terus kepada pelayar
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('', {
            status: 408,
            statusText: 'Request Timed Out / Offline'
          });
        });
      })
  );
});
