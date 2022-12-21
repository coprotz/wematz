const CACHE_NAME = "version-1.1";
const urlsToCache = ['./manifest.json', './index.html', './offline.html' ];

const self = this;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
            }).then(() => {
                return self.skipWaiting();
            })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(function(responnse) {
                if(responnse){
                    return responnse
                }
                return fetch(event.request).then(function(responnse){
                    if(responnse.status === 404){
                        return caches.match('/offline.html');
                    }
                    return responnse
                });
                    // .catch(() => caches.match('offline.html'))
            }).catch(function(){
                return caches.match('/offline.html')
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheNames.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});

self.addEventListener("message", function(event) {
    if (event.data && event.data.type === "SKIP_WAITING") {
        skipWaiting();
    }
});