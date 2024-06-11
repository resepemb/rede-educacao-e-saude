importScripts('static/requests_content/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;


const scope = self.registration.scope; 

precacheAndRoute([
    {url: scope+'index.html', revision: '02'},
    {url: scope+'404.html', revision: '02'},
    {url: scope+'municipio.html', revision: '03'},
    {url: scope+'sobre.html', revision: '02'},
]);

const localurls = {
    "https://cdn.jsdelivr.net/npm/exceljs@4.3.0/dist/exceljs.min.js": "exceljs.min.js",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap": "font_google_api_Montserrat.css",
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js":"leaflet.js",
    "https://cdn.jsdelivr.net/npm/htl@0.3.1/dist/htl.min.js":"htl.min.js",
    "https://cdn.jsdelivr.net/npm/chart.js/package.json":"chartsjs_package.json",
    "https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.js":"chart.umd.js",
  }

const contentTypeMappings = {
'.js': 'application/javascript',
'.css': 'text/css',
'.json': 'application/json'
};


registerRoute(({url}) => url.pathname === scope+'municipio.html', async({event}) => {
    try {
        const cacheResponse = await caches.match(scope+'municipio.html?__WB_REVISION__=02');
        return cacheResponse || fetch(event.request);
    } catch (error) {
        return new Response('Error loading page', { status: 500 });
    }
}); 


registerRoute(({url}) => localurls[url] != undefined, async({url}) => {
    try {                           
        console.log('Using a personalized route to load a project offline file');

        const response = await fetch(scope+"static/requests_content/"+ localurls[url]);
        
        if (!response.ok) {
            throw new Error('Failed to load '+ localurls[url]);
        }

        var contentType;

        for (const extension in contentTypeMappings) {
            if (localurls[url].endsWith(extension)) {
                contentType = contentTypeMappings[extension];
                break;
            }
        }

        if (!contentType) {
            contentType = 'text/plain';
        }


        const fileContent = await response.text();
        return new Response(fileContent, { status: 200, headers: {'Content-Type': contentType}});
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