const CACHE_NAME = "forex-converter-v1";

const PRECACHE = ["/", "/manifest.webmanifest", "/favicon.ico"];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE);

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );

      await clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const request = event.request;
  const url = new URL(request.url);

  // Ignore requests to other origins
  if (url.origin !== location.origin) return;

  // Ignore API routes
  if (url.pathname.startsWith("/api")) return;

  // Only cache static assets
  const destination = request.destination;

  const shouldCache = ["image", "font", "style", "script"].includes(
    destination,
  );

  if (!shouldCache) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      const networkResponse = await fetch(request);

      cache.put(request, networkResponse.clone());

      return networkResponse;
    })(),
  );
});
