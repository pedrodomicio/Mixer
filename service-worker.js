const CACHE_NAME = 'audio-cache-v1';
const urlsToCache = [
    'aviao Arppegio 1.wav',
    'aviao Arppegio 2.wav',
    'aviao Bass.wav',
    'aviao Drums.wav',
    'aviao Organ.wav',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
