const CACHE_NAME = "worker-demo-v1";
const DYNAMIC_CACHE = "worker-demo-dynamic-v1";

// Install Event - Triggered when the browser installs the SW
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Service Worker ...", event);

  // Wait until the promise resolves before finishing installation
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Precaching App Shell");
      // Adding assets to cache immediately
      // Note: In development with Vite, paths might vary, so we handle failures gracefully
      return cache
        .addAll([
          "/",
          "/index.html",
          // Add other assets here if known
        ])
        .catch((err) =>
          console.warn("Specific file caching failed, proceeding:", err),
        );
    }),
  );

  // Immediately activate the service worker without waiting for existing clients to close
  self.skipWaiting();
});

// Activate Event - Triggered when the SW is activated
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating Service Worker ...", event);

  // Clean up old caches
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
          return null;
        }),
      );
    }),
  );

  // Claim any clients immediately, so they utilize this SW right away
  return self.clients.claim();
});

// Fetch Event - Intercepts network requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Mock API response
  if (url.pathname === "/api/mock-time") {
    const mockResponse = new Response(
      JSON.stringify({
        time: new Date().toISOString(),
        source: "Interceptor Service Worker",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    event.respondWith(mockResponse);
    return;
  }

  // 2. Cache-First Strategy for static assets or specific resources
  //    Check cache first, if missing, fetch from network
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached response
      }

      // If not in cache, fetch from network
      return fetch(event.request)
        .then((res) => {
          // Optionally cache new requests dynamically
          // return caches.open(DYNAMIC_CACHE).then((cache) => {
          //   cache.put(event.request.url, res.clone());
          //   return res;
          // });
          return res;
        })
        .catch((err) => {
          console.error("[Service Worker] Fetch failed:", err);
          // Could return a fallback page here if offline
        });
    }),
  );
});

// Message Event - Communicate with the main thread
self.addEventListener("message", (event) => {
  console.log("[Service Worker] Message received:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  // Reply to client
  if (event.source) {
    event.source.postMessage({
      type: "REPLY",
      payload: `Echo from SW: ${JSON.stringify(event.data)}`,
    });
  }
});
