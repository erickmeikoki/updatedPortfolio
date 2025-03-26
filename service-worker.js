const CACHE_NAME = "portfolio-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/thank-you.html",
  "/css/style.css",
  "/css/animations.css",
  "/js/main.js",
  "/js/theme.js",
  "/js/particles.js",
  "/js/loading.js",
  "/js/form.js",
  "/js/accessibility.js",
  "/js/tooltips.js",
  "/js/feedback.js",
  "/js/back-to-top.js",
  "/img/Avatar.jpg",
  "/img/cats.jpeg",
  "/img/Keep.png",
  "/img/netflix.jpg",
  "/img/snek.png",
  "/img/Hotel.png",
  "/img/Tinder.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
