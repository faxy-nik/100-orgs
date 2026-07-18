var CACHE = 'ash-v2';
var urlsToCache = [
  '/',
  '/index.html',
  '/100-organs.html',
  '/love.html',
  '/fantasies.html',
  '/gallery.html',
  '/admin.html',
  '/stats.html',
  '/404.html',
  '/music.js',
  '/skies.js',
  '/sky-living.js',
  '/track.js',
  '/style.css'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (res) {
        return caches.open(CACHE).then(function (cache) {
          if (e.request.url.startsWith(self.location.origin)) {
            cache.put(e.request, res.clone());
          }
          return res;
        });
      });
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
});