// Susie's Quest - Service Worker
// Provides offline caching and PWA install support

const CACHE_NAME = 'susies-quest-v1.6.0';
const GHPATH = '/projects/susies-quest';

// Assets to cache for offline play
const ASSETS_TO_CACHE = [
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/css/style.css`,
    `${GHPATH}/js/game.js`,
    `${GHPATH}/js/assets.js`,
    `${GHPATH}/js/config.js`,
    `${GHPATH}/js/entities.js`,
    `${GHPATH}/js/input.js`,
    `${GHPATH}/js/sound.js`,
    `${GHPATH}/js/state.js`,
    `${GHPATH}/susie.png`,
    `${GHPATH}/susie_jump.png`,
    `${GHPATH}/susie_fall.png`,
    `${GHPATH}/platform.png`,
    `${GHPATH}/yarn.png`,
    `${GHPATH}/candy.png`,
    `${GHPATH}/enemy.png`,
    `${GHPATH}/bg_clouds.png`,
    `${GHPATH}/bg_hills.png`,
    `${GHPATH}/icon-192.png`,
    `${GHPATH}/icon-512.png`,
    `${GHPATH}/apple-touch-icon.png`,
    `${GHPATH}/manifest.webmanifest`,
    `${GHPATH}/manifest.json`
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching game assets...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[SW] All assets cached successfully');
                return self.skipWaiting(); // Activate immediately
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim()) // Take control immediately
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Don't cache API calls (leaderboard) - always go to network
    if (url.hostname === 'dipoletech.com') {
        event.respondWith(fetch(event.request));
        return;
    }
    
    // Don't cache Google Fonts API calls differently
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(
            caches.match(event.request)
                .then((cached) => {
                    if (cached) return cached;
                    return fetch(event.request).then((response) => {
                        // Cache font files for offline use
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                        return response;
                    });
                })
        );
        return;
    }
    
    // For game assets: try cache first, then network (cache-first strategy)
    // Strip query params (cache-busting versions) for matching
    const requestUrl = event.request.url.split('?')[0];
    
    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                if (cached) return cached;
                
                // Try matching without query params
                return caches.match(requestUrl)
                    .then((cachedNoQuery) => {
                        if (cachedNoQuery) return cachedNoQuery;
                        
                        // Fall back to network
                        return fetch(event.request)
                            .then((response) => {
                                // Don't cache non-OK responses
                                if (!response || response.status !== 200) {
                                    return response;
                                }
                                
                                // Cache the new response
                                const clone = response.clone();
                                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                                return response;
                            });
                    });
            })
            .catch(() => {
                // If both cache and network fail, return a fallback for HTML
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match(`${GHPATH}/index.html`);
                }
            })
    );
});
