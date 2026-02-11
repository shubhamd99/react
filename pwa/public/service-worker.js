const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "https://via.placeholder.com/192.png?text=Icon",
  "https://via.placeholder.com/512.png?text=Icon",
];

// Install Event: Cache static assets
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("[Service Worker] Caching app shell");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Activate Event: Clean up old caches
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache.", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  return self.clients.claim();
});

// Fetch Event: Serve from cache, falling back to network
self.addEventListener("fetch", function (event) {
  // console.log("[Service Worker] Fetching resource: ", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (networkResponse) {
        // Check if we received a valid response
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        // Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }),
  );
});

// Push Event: Handle push notifications
self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "PWA Push Notification";
  const options = {
    body: event.data.text() || "Yay it works!",
    icon: "https://via.placeholder.com/192.png?text=Icon",
    badge: "https://via.placeholder.com/192.png?text=Icon",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Sync Event: Handle background sync
self.addEventListener("sync", function (event) {
  console.log("[Service Worker] Background Sync event fired.", event);
  if (event.tag === "my-sync-tag") {
    console.log("[Service Worker] Syncing data now...");
    // event.waitUntil(doSomeBackgroundSync());
    // simulating sync
    event.waitUntil(
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("[Service Worker] Data synced!");
          resolve();
        }, 3000);
      }),
    );
  }
});
