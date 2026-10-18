const C='tasbih-v29',A=['./','index.html','style.css','app.js','firebase-config.js','duas.json','tasbih.json','names.json','indopak.json','manifest.json','icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// stale-while-revalidate: answer instantly from cache, refresh the cache in the background
const swr=(req,cache)=>cache.match(req).then(hit=>{
 const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))cache.put(req,r.clone());return r}).catch(()=>hit);
 return hit||net});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 const u=new URL(q.url),own=u.origin===location.origin,font=u.host.includes('fonts.g')||u.host==='db.onlinewebfonts.com';
 if(!own&&!font)return; // firebase / prayer-time API etc. go straight to the network
 e.respondWith(caches.open(C).then(c=>swr(q,c)))});
