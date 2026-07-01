const CACHE_NAME = "forex-converter-v1";

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");

  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // We'll add caching later.
});
