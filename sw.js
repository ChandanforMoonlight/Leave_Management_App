const CACHE='mp-leave-shell-v1';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./icon.svg','./manifest.webmanifest']))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mp-leave-shell-')&&k!==CACHE).map(k=>caches.delete(k))))));
// Cache public app shell only. Never cache database, auth or user responses.
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).catch(()=>caches.match('./')));
});
