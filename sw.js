var CACHE = 'ash-v30';
var urlsToCache = [
  '/',
  '/index.html',
  '/100-organs.html',
  '/love.html',
  '/fantasies.html',
  '/sky-observatory.html',
  '/photo-gallery.html',
  '/admin.html',
  '/stats.html',
  '/404.html',
  '/dream.html',
  '/make-her-sleep.html',
  '/music.js',
  '/skies.js',
  '/sky-observatory.js',
  '/firefly-jar.js',
  '/sky-living.js',
  '/track.js',
  '/fb-db.js',
  '/style.css',
  '/content-common.js',
  '/anime.min.js',
  '/motion-masterpiece.js',
  '/dragon-companion.js',
  '/GirlConfig.js',
  '/GirlStorage.js',
  '/GirlMemory.js',
  '/GirlEvents.js',
  '/GirlAnimationController.js',
  '/GirlRenderer.js',
  '/GirlStateMachine.js',
  '/GirlNavigation.js',
  '/GirlInteractions.js',
  '/GirlCompanion.js',
  '/girl-particles.js',
  '/girl-assets/atlas.json',
  '/girl-assets/atlas.png',
  '/BoyConfig.js',
  '/BoyCompanion.js',
  '/boy-assets/atlas.json',
  '/boy-assets/atlas.png',
  '/ash/ash10.jpeg',
  '/ash/ash11.jpeg',
  '/ash/ash.jpeg',
  '/ash/ash1.jpeg',
  '/ash/ash2.jpeg',
  '/ash/ash3.jpeg',
  '/ash/ash4.jpeg',
  '/ash/ash5.jpeg',
  '/ash/ash6.jpeg',
  '/ash/ash7.jpeg',
  '/ash/ash8.jpeg',
  '/ash/ash9.jpeg',
  '/ash/ash_childhood.jpeg',
  '/ash/ash_childhood1.jpeg',
  '/ash/ash_childhood2.jpeg',
  '/ash/ash_childhood3.jpeg',
  '/ash/ash1.mp4',
  '/ash/ash2.mp4',
  '/ash/ash3.mp4',
  '/ash/ash4.mp4',
  '/ash/ash5.mp4',
  '/ash/ash6.mp4',
  '/ash/ash7.mp4',
  '/ash/ash8.mp4',
  '/ash/ash9.mp4',
  '/ash/duck.jpeg',
  '/ash/mr turtle.jpeg',
  '/ash/the book she gave to me.jpeg',
  '/ash/some random chat ss.jpeg',
  '/ash/my saved sticker in her chat.jpeg',
  '/ash/my bacha with her bachas(younger cznz).jpeg',
  '/ash/she in sunlight looking damn awsm.jpeg',
  '/ash/her younger pic , lookin way too skiny.jpeg',
  '/ash/her in a winter outfit , with fluffy cap.jpeg',
  '/ash/her selfi in red black dress cute hot.jpeg',
  '/ash/her random pic at a event sitting on a chair , lovely.jpeg',
  '/ash/her pic , in rain, a bit wet, looking damn hot.jpeg',
  '/ash/her selfie in blue dress , aswm.jpeg',
  '/ash/her selfi in black dress cute.jpeg',
  '/ash/her selfie in grey hoodi , eyes closed , all the cutensess on her cheeks and glasses.jpeg',
  '/ash/her selfie in pink dress, cute.jpeg',
  '/ash/our funny video call ss.jpeg',
  '/ash/our funny video call ss 2.jpeg',
  '/ash/our funny video call ss 3.jpeg',
  '/ash/her night video cute one.mp4',
  '/ash/her mirror pic in black dress with flowers on it.mp4',
  '/ash/her eyes.mp4',
  '/ash/her a bit younger video , looking damn cute, front.mp4',
  '/ash/her old video in black filter.mp4',
  '/ash/her skiiny front video.mp4',
  '/ash/her selfie video , peach dress.mp4',
  '/ash/her toungue out video.mp4',
  '/ash/her video inlight pink dress and pink scarf in uni , looking cute (front).mp4',
  '/ash/video regarding my eyes.mp4',
  '/ash/she studying on her bed selfie.mp4',
  '/ash/mirror pic video.mp4',
  '/ash/love video of uss.mp4',
  '/ash/her younger self video front camera.mp4',
  '/ash/my random vido.mp4',
  '/ash/eye roll video in blue dress nad dark blue scarf , looking fierce9front).mp4',
  '/matrix-rain.js',
  '/adaptive-text.js',
  '/global-easter-eggs.js',
  '/landscape.js',
  '/interactive.js',
  '/tree-of-memories.js',
  '/secret-letters.js',
  '/butterfly-collection.js',
  '/world-progress.js',
  '/random-constellations.js',
  '/manifest.json'
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