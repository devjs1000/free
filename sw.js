var cacheName='vtApk1'

//calling install event
self.addEventListener('install',e=>{
  console.log('serviceWorker: installed')
})

//calling activate event
self.addEventListener('activate',e=>{
  console.log('serviceWorker: activated')
  e.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promise.all(
      cacheNames.map(cache=>{
        if(cache!==cacheName){
          console.log('serviceWorker: clearing old cache')
          return caches.delete(cache)
        }
      })
      )
    })
    )
})

//calling fetch event
self.addEventListener('fetch',e=>{
  console.log('serviceWorker: fetching')
  
  e.respondWith(fetch(e.request).then(res=>{
    const resClone=res.clone()
    
    caches.open(cacheName).then(cache=>{
      cache.put(e.request, resClone);
    })
    return res;
  }).catch(err=>caches.match(e.request).then(res=>res))
  )
})

