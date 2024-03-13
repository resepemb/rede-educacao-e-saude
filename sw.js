importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;


precacheAndRoute([
    {url: '/index.html', revision: '01'},
    {url: '/404.html', revision: '01'},
    {url: '/municipio.html', revision: '01'},
    {url: '/sobre.html', revision: '01'},
]);


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