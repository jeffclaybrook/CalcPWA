const staticDevCalculator = 'dev-calculator-site-v1'
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://fonts.cdnfonts.com/s/16141/SamsungOne-400.woff'
]

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCalculator).then(cache => {
            cache.addAll(assets);
        })
    )
})

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    )
})