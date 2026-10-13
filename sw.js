// Caddie service worker: app shell works offline; map tiles are cached as you see them.
const SHELL = "caddie-shell-v8";
const TILES = "caddie-tiles-v1";
const SHELL_FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./holes.js", "./courses.js", "./leaflet.js"];;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = e.request.url;
  const isTile = url.includes("arcgisonline.com") || url.includes("tile.openstreetmap.org");
  if (isTile) {
    // cache-first for tiles, capped at ~1500 entries
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request); if (hit) return hit;
      try { const r = await fetch(e.request); if (r.ok) { c.put(e.request, r.clone()); trim(c, 1500); } return r; }
      catch { return new Response("", { status: 504 }); }
    }));
    return;
  }
  // app shell: network first, fall back to cache
  e.respondWith(fetch(e.request).then(r => { if (r.ok && e.request.method === "GET") caches.open(SHELL).then(c => c.put(e.request, r.clone())); return r; })
    .catch(() => caches.match(e.request).then(h => h || caches.match("./index.html"))));
});
async function trim(cache, max) {
  const keys = await cache.keys();
  if (keys.length > max) await Promise.all(keys.slice(0, keys.length - max).map(k => cache.delete(k)));
}
