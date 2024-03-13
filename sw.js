importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;

const { registerRoute } = workbox.routing;

precacheAndRoute([
    {url: '/rede-educacao-e-saude/index.html', revision: '01'},
    {url: '/rede-educacao-e-saude/404.html', revision: '01'},
    {url: '/rede-educacao-e-saude/municipio.html', revision: '01'},
    {url: '/rede-educacao-e-saude/sobre.html', revision: '01'},
]);

registerRoute(({url}) => url.pathname === '/rede-educacao-e-saude/municipio.html', async({event}) => {
    try {
        const cacheResponse = await caches.match('/rede-educacao-e-saude/municipio.html?__WB_REVISION__=01');
        return cacheResponse || fetch(event.request);
    } catch (error) {
        return new Response('Erro ao buscar a página', { status: 500 });
    }
});


const strategy = new workbox.strategies.CacheFirst();
workbox.routing.setDefaultHandler(strategy);

// Ensure that our cache is pre-populated at install time,
// which will help with offline checks.
const urls = [
  'https://api.observablehq.com/@chrispahm/charts.js?v=3',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  // Add any other URLs that you want to ensure are cached here.
];


workbox.recipes.warmStrategyCache({urls, strategy});
workbox.core.clientsClaim();