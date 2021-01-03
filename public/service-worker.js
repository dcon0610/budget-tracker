const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";


console.log("Hello from your service worker!");

 // install
 self.addEventListener("install", function (evt) {
    // pre cache image data
    evt.waitUntil(
      caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
      );
      
      self.skipWaiting();
    });

    self.addEventListener("activate", function(evt) {
        evt.waitUntil(
          caches.keys().then(keyList => {
            return Promise.all(
              keyList.map(key => {
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                  console.log("Removing old cache data", key);
                  return caches.delete(key);
                }
              })
            );
          })
        );
    
        self.clients.claim();
      });

      self.addEventListener('fetch', function(evt) {
        // code to handle requests goes here
        });
