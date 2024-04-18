importScripts('static/requests_content/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;


precacheAndRoute([
    {url: '/rede-educacao-e-saude/index.html', revision: '01'},
    {url: '/rede-educacao-e-saude/404.html', revision: '01'},
    {url: '/rede-educacao-e-saude/municipio.html', revision: '01'},
    {url: '/rede-educacao-e-saude/sobre.html', revision: '01'},
]);

const localurls = {
    "https://cdn.jsdelivr.net/npm/exceljs@4.3.0/dist/exceljs.min.js": "exceljs.min.js",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap": "font_google_api_Montserrat.css",
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js":"leaflet.js",
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-precaching.dev.js":"workbox-precaching.dev.js",
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-core.dev.js": "workbox-core.dev.js",
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-strategies.dev.js":"workbox-strategies.dev.js",
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-routing.dev.js":"workbox-routing.dev.js",
    "https://api.observablehq.com/@chrispahm/charts.js?v=3":"charts.js",
    "https://cdn.jsdelivr.net/npm/htl@0.3.1/dist/htl.min.js":"htl.min.js"
    // "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css":"leaflet_194.css",
    // "https://unpkg.com/leaflet/dist/leaflet.css":"leaflet_194.css",
    // "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.css":"leaflet_193.css",
  }


registerRoute(({url}) => url.pathname === '/rede-educacao-e-saude/municipio.html', async({event}) => {
    try {
        const cacheResponse = await caches.match('/rede-educacao-e-saude/municipio.html?__WB_REVISION__=01');
        return cacheResponse || fetch(event.request);
    } catch (error) {
        return new Response('Error loading page', { status: 500 });
    }
}); 


registerRoute(({url}) => localurls[url] != undefined, async({url, event}) => {
    try {                           
        console.log('Using a personalized route to load a project offline file');

        const response = await fetch("./static/requests_content/"+ localurls[url]);
        
        if (!response.ok) {
            throw new Error('Failed to load '+ localurls[url]);
        }

        const fileContent = await response.text();
        return new Response(fileContent, { status: 200 });
    } catch (error) {
        console.log('Error loading a project file from request, redirecting.. '+ error );
        const response = await fetch(url);
        return response;
    }
});


const strategy = new CacheFirst();
setDefaultHandler(strategy);

// workbox.recipes.warmStrategyCache({urls, strategy});
clientsClaim();