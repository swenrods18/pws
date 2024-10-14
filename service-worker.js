importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('speech-pwa-cache').then(cache => {
            return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json', '/icon.png']);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
