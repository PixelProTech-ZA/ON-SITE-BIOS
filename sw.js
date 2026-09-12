/*
  ON-SITE BIOS — service worker
  Caches the app shell so it genuinely works offline after the first
  successful load. No background sync, no push, no cloud calls — none
  of that exists in this build, so none of it is faked here either.
*/
var CACHE_NAME = "onsitebios-v2";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(SHELL);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

// Cache-first for the app shell, network-first fallback for anything else,
// falling back to cache if the network is unavailable.
self.addEventListener("fetch", function(event){
  if(event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function(cached){
      if(cached) return cached;
      return fetch(event.request).then(function(resp){
        return caches.open(CACHE_NAME).then(function(cache){
          try{ cache.put(event.request, resp.clone()); }catch(e){}
          return resp;
        });
      }).catch(function(){
        return cached;
      });
    })
  );
});
