const CACHE = "eduvo-matematicas-github-fa36bde65cf0";
const APP_SHELL = ["./","./index.html","./app-NOP7PK76.js","./chunks/solid-lab-BIIGTW52.js","./chunks/archipelago-scene-TZS4XY7B.js","./chunks/chunk-BP4LALDF.js","./chunks/chunk-ZVO6ME7Q.js","./chunks/chunk-RMIRCVGT.js","./app-fa36bde65cf0.css","./eduvo-logo.png","./favicon.svg","./file.svg","./fonts/manrope-latin.woff2","./fonts/OFL.txt","./globe.svg","./manifest.webmanifest","./window.svg"];
const base = new URL("./", self.location.href);
const shell = new URL("index.html", base).href;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => { const old = keys.filter(key => key.startsWith("eduvo-matematicas-github-") && key !== CACHE); return Promise.all(old.slice(0, -1).map(key => caches.delete(key))); }).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  if (event.request.mode === "navigate") {
    const offlineShell = () => caches.open(CACHE).then(cache => cache.match(shell));
    event.respondWith(fetch(event.request).then(response => response.ok ? response : offlineShell()).catch(offlineShell));
  } else event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
