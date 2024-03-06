importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { precacheAndRoute } = workbox.precaching;

registerRoute(
    '/\.(?:xlsx|json)$/',
    new workbox.strategies.CacheFirst({
        "cacheName": 'assets',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            })
        ]
    })
);

precacheAndRoute([
    {url: '/index.html', revision: '01'},
    {url: '/404.html', revision: '01'},
    {url: '/municipio.html', revision: '01'},
    {url: '/sobre.html', revision: '01'}
]
);