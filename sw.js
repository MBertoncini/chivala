// Tiene una copia della pagina sul telefono, così i cartelli si aprono anche senza campo.
// I video li salva la pagina stessa (pulsante «Scarica i video») nella stessa cache.
const CACHE = "chivala-v2";
const PAGINA = "./";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add(PAGINA)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

// Pagina: subito la copia salvata, e intanto la aggiorna se c'è rete.
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const salvata = await c.match(PAGINA);
    const rete = fetch(e.request).then(r => {
      if (r.ok) c.put(PAGINA, r.clone());
      return r;
    });
    if (salvata) {
      e.waitUntil(rete.catch(() => {}));
      return salvata;
    }
    return rete;
  })());
});
