const CACHE = "eduvo-matematicas-github-fbee2169626d";
const APP_SHELL = ["./","./index.html","./app-LFFNNI2O.js","./chunks/solid-lab-PZFB4RCS.js","./chunks/chunk-RMIRCVGT.js","./app-fbee2169626d.css","./favicon.svg","./eduvo-logo.png","./manifest.webmanifest"];
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
