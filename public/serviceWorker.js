const CACHE_NAME = 'my-pwa-cache-v5'
const assetUrls = [
  'index.html',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetUrls)),
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key)
          } else return false
        })),
      ),
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    }),
  )
})
