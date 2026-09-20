/* Patricia Batalla Estética · lógica de la web (tratamientos, carruseles y contacto por WhatsApp) */
(function () {
'use strict';

/* Todo lo que se personaliza vive en js/config.js */
var CONFIG = window.PB_CONFIG;

/* ==========================================================================
   Utilidades
   ========================================================================== */
/* Si una sección se saca del HTML, $ devuelve un elemento suelto para que el resto de la página siga funcionando */
var $ = function (s, r) { return (r || document).querySelector(s) || document.createElement('div'); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function slug(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function fmtPrecio(p) { return p ? '$ ' + Number(p).toLocaleString('es-AR') : 'Consultá el precio'; }

function waNum() {
  var n = String(CONFIG.whatsapp).replace(/\D/g, '');
  if (/^54(?!9)/.test(n)) n = '549' + n.slice(2); // WhatsApp exige el 9 en celulares argentinos
  return n;
}
function waLink(msg) { return 'https://wa.me/' + waNum() + (msg ? '?text=' + encodeURIComponent(msg) : ''); }
function igLink() { return 'https://www.instagram.com/' + CONFIG.instagram + '/'; }

/* ==========================================================================
   Medición para anuncios (Meta Pixel / Google Analytics): solo si hay IDs
   ========================================================================== */
function initTracking() {
  if (CONFIG.metaPixelId) {
    (function (f, b, e, v) {
      if (f.fbq) return;
      var n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      var t = b.createElement(e); t.async = true; t.src = v;
      var s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.metaPixelId);
    window.fbq('track', 'PageView');
  }
  if (CONFIG.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.ga4Id);
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4Id);
    document.head.appendChild(s);
  }
}
/* Cada clic en WhatsApp es un contacto: Meta "Contact", GA4 "whatsapp_click" */
function trackWa(lugarClic) {
  try {
    var meta = { lugar: lugarClic };
    if (window.fbq) window.fbq('track', 'Contact', meta);
    if (window.gtag) window.gtag('event', 'whatsapp_click', meta);
  } catch (_) {}
}

/* ==========================================================================
   Tratamientos
   ========================================================================== */
var SERVICIOS = CONFIG.servicios || [];
function groupServices() {
  var groups = [];
  SERVICIOS.forEach(function (s) {
    var g = groups.filter(function (x) { return x.cat === s.cat; })[0];
    if (!g) { g = { cat: s.cat, items: [] }; groups.push(g); }
    g.items.push(s);
  });
  return groups;
}
function renderServices() {
  $('#svc-groups').innerHTML = groupServices().map(function (g) {
    return '<div class="svc-group" id="cat-' + slug(g.cat) + '"><h3>' + esc(g.cat) + '</h3>' + g.items.map(function (s) {
      var meta = s.domicilio
        ? '<span><svg class="icon" style="width:1em;height:1em"><use href="#i-home"/></svg>Se coordina por WhatsApp</span><span>' + esc(fmtPrecio(s.precio)) + '</span>'
        : '<span>' + esc(fmtPrecio(s.precio)) + '</span>';
      return '<div class="svc"><h4>' + esc(s.nombre) + (s.domicilio ? '<span class="badge">A domicilio</span>' : '') + '</h4><p>' + esc(s.desc || '') + '</p><div class="meta">' + meta + '</div></div>';
    }).join('') + '</div>';
  }).join('');
}

/* ==========================================================================
   Carruseles: fotos por categoría y videos
   ========================================================================== */
var Car = {};
function mountCarousel(root) {
  var track = $('.car-track', root), ctrl = $('.car-ctrl', root), dots = $('.car-dots', root);
  var prev = $('[data-dir="-1"]', root), next = $('[data-dir="1"]', root), raf = 0;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function padL() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }
  function max() { return track.scrollWidth - track.clientWidth; }
  function current() {
    var sl = track.children, x = track.scrollLeft, p = padL(), best = 0, bd = 1e9;
    if (x >= max() - 2) return Math.max(0, sl.length - 1);
    for (var i = 0; i < sl.length; i++) { var d = Math.abs(sl[i].offsetLeft - p - x); if (d < bd) { bd = d; best = i; } }
    return best;
  }
  function update() {
    var n = track.children.length, m = max();
    ctrl.hidden = n < 2 || m <= 2;
    if (dots.children.length !== n) dots.innerHTML = new Array(n + 1).join('<i></i>');
    var c = current();
    Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === c); });
    prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft >= m - 2;
  }
  function go(dir) {
    var sl = track.children, t = Math.min(sl.length - 1, Math.max(0, current() + dir));
    track.scrollTo({ left: Math.max(0, sl[t].offsetLeft - padL()), behavior: reduce ? 'auto' : 'smooth' });
  }
  prev.addEventListener('click', function () { go(-1); });
  next.addEventListener('click', function () { go(1); });
  track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  track.addEventListener('keydown', function (e) {
    if (e.target !== track) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
  return { update: update };
}

/* --- Fotos por categoría (cada una con su carrusel) y videos en su propia sección --- */
function carouselHtml(label, slides) {
  return '<div class="carousel" role="region" aria-roledescription="carrusel" aria-label="' + esc(label) + '"><div class="car-track" tabindex="0">' + slides + '</div>' +
    '<div class="car-ctrl"><button class="car-btn" type="button" data-dir="-1" aria-label="Anterior"><svg class="icon"><use href="#i-prev"/></svg></button><div class="car-dots" aria-hidden="true"></div>' +
    '<button class="car-btn" type="button" data-dir="1" aria-label="Siguiente"><svg class="icon"><use href="#i-next"/></svg></button></div></div>';
}
function svcDe(x) { return SERVICIOS.filter(function (s) { return s.nombre === x.servicio; })[0]; }
function slideHtml(x) {
  var s = svcDe(x), title = x.titulo || (s && s.nombre) || '', text = x.texto || '', media;
  if (x.video) media = '<video src="' + esc(x.video) + '" poster="' + esc(x.poster || '') + '" muted loop playsinline preload="none" disablepictureinpicture aria-label="' + esc(title + '. ' + text) + '"></video><span class="vid-ic" aria-hidden="true"></span>';
  else media = '<img src="' + esc(x.img) + '" alt="' + esc(title + '. ' + text) + '" loading="lazy" decoding="async">';
  return '<article class="slide' + (x.video ? ' vid' : '') + '"><div class="slide-img' + (x.video ? ' is-video paused' : '') + '">' + media + '</div><div class="slide-body"><h3>' + esc(title) + '</h3><p>' + esc(text) + '</p></div></article>';
}
function renderGallery() {
  var fotos = (CONFIG.galeria || []).filter(function (x) { return x && x.img; }), orden = [], porCat = {};
  groupServices().forEach(function (g) { orden.push(g.cat); });
  fotos.forEach(function (x) {
    var s = svcDe(x), cat = s ? s.cat : 'Más fotos';
    if (orden.indexOf(cat) === -1) orden.push(cat);
    (porCat[cat] = porCat[cat] || []).push(x);
  });
  $('#gal-groups').innerHTML = orden.filter(function (c) { return porCat[c]; }).map(function (c) {
    return '<div class="gal-cat"><h3 class="gal-title">' + esc(c) + '</h3>' + carouselHtml('Fotos de ' + c, porCat[c].map(slideHtml).join('')) + '</div>';
  }).join('');
  Car.groups = $$('#gal-groups .carousel').map(mountCarousel);
}
function renderVideos() {
  var list = (CONFIG.videos || []).filter(function (x) { return x && x.video; });
  $('#videos').hidden = !list.length;
  $('#vid-track').innerHTML = list.map(slideHtml).join('');
  wireVideos();
  if (Car.video) Car.video.update();
}

/* Los videos se reproducen solos (sin sonido) mientras se ven en pantalla; con un toque se pausan o reproducen */
var videoObs = null;
function wireVideos() {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (videoObs) videoObs.disconnect();
  videoObs = ('IntersectionObserver' in window && !reduce) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      var v = en.target;
      if (en.intersectionRatio >= 0.6) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
    });
  }, { threshold: [0, 0.6] }) : null;
  $$('#vid-track video').forEach(function (v) {
    v.muted = true;
    var box = v.parentNode;
    ['play', 'pause'].forEach(function (ev) { v.addEventListener(ev, function () { box.classList.toggle('paused', v.paused); }); });
    v.addEventListener('click', function () { if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    if (videoObs) videoObs.observe(v);
  });
}

/* ==========================================================================
   Sobre Patricia, aviso y datos para Google
   ========================================================================== */
function renderAbout() {
  var P = CONFIG.profesional || {};
  $('#about-lead').textContent = P.frase || 'Patricia Batalla es la esteticista a cargo de cada turno en Marcos Juárez. Atiende con turnos pensados para dedicarle a cada tratamiento el tiempo que necesita y, en depilación, también va hasta tu casa.';
  var h = '';
  if (P.anios) h += '<div class="fact-num"><b>' + esc(P.anios) + '</b><span>años de experiencia</span></div>';
  if (P.formacion && P.formacion.length) h += '<div class="fact-list"><h3>Formación</h3><ul>' + P.formacion.map(function (x) { return '<li><svg class="icon"><use href="#i-check"/></svg><span>' + esc(x) + '</span></li>'; }).join('') + '</ul></div>';
  if (P.historia) h += '<p class="story">' + esc(P.historia) + '</p>';
  $('#facts').innerHTML = h;
  if (P.foto) {
    var img = document.createElement('img');
    img.src = P.foto; img.alt = 'Patricia Batalla, esteticista en Marcos Juárez'; img.loading = 'lazy';
    var box = $('#portrait'); box.innerHTML = ''; box.appendChild(img); box.removeAttribute('aria-hidden');
  }
}
function applyPromo() {
  var t = (CONFIG.promo || '').trim(), el = $('#promo');
  el.textContent = t; el.hidden = !t;
}
function jsonLd() {
  var ld = {
    '@context': 'https://schema.org', '@type': 'BeautySalon',
    name: 'Patricia Batalla Estética',
    description: 'Estética en Marcos Juárez, Córdoba: depilación con cera (también a domicilio), cejas, pestañas, uñas y tratamientos faciales.',
    areaServed: 'Marcos Juárez, Córdoba, Argentina',
    address: { '@type': 'PostalAddress', addressLocality: 'Marcos Juárez', addressRegion: 'Córdoba', addressCountry: 'AR' },
    telephone: '+' + waNum(),
    sameAs: [igLink()]
  };
  var el = document.getElementById('ld');
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'ld'; document.head.appendChild(el); }
  el.textContent = JSON.stringify(ld);
}

/* ==========================================================================
   Arranque
   ========================================================================== */
function wireStatic() {
  $$('[data-wa]').forEach(function (a) {
    a.href = waLink('Hola Patricia! Vi tu página y quiero pedir un turno.');
    a.target = '_blank'; a.rel = 'noopener';
    a.addEventListener('click', function () { trackWa(a.dataset.track || 'web'); });
  });
  $('#ig-foot').href = igLink(); $('#ig-about').href = igLink();
  $('#ig-display').textContent = '@' + CONFIG.instagram;
  $('#wa-display').textContent = CONFIG.whatsappTexto;
  $('#foot-year').textContent = '© ' + new Date().getFullYear() + ' · Patricia Batalla Estética';

  Car.video = mountCarousel($('#vid-car'));
  /* Si una foto no carga, se saca su tarjeta en vez de dejar un hueco */
  $('#gal-groups').addEventListener('error', function (e) { var t = e.target; if (t && t.tagName === 'IMG') { var c = t.closest('.slide'); if (c) c.remove(); (Car.groups || []).forEach(function (g) { g.update(); }); } }, true);
}

function start() {
  initTracking();
  wireStatic();
  /* Cada parte se arma por separado: si una falla, las demás siguen funcionando */
  [applyPromo, renderServices, renderGallery, renderVideos, renderAbout, jsonLd].forEach(function (fn) {
    try { fn(); } catch (err) { if (window.console) console.error(err); }
  });
}
start();

})();
