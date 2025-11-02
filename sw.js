const CACHE_NAME = 'arabic-ads-calc-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/cpc-calculator.html',
  '/roi-calculator.html', 
  '/cpa-calculator.html',
  '/ctr-calculator.html',
  '/cvr-calculator.html',
  '/profit-margin-calculator.html',
  '/budget-planner.html',
  '/audience-calculator.html',
  '/utm-generator.html',
  '/whatsapp-generator.html',
  '/social-content-planner.html',
  '/all-tools.html',
  '/about.html',
  '/favicon.svg',
  '/chatbot.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for offline analytics
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Send queued analytics events when back online
  return fetch('/api/sync-analytics', {
    method: 'POST',
    body: JSON.stringify(getQueuedEvents())
  }).catch(err => {
    console.log('Background sync failed:', err);
  });
}

function getQueuedEvents() {
  // Implementation would get events from IndexedDB
  return [];
}