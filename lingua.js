// Lingua della pagina (schema di antoniosanna.dev): i dizionari stanno in lingue/<lingua>.js, generati da i18n/*.json con i18n/costruisci.py.
// L'italiano e' il testo della pagina stessa, letto al caricamento: una sola fonte.
(function () {
  var D = window.BO_I18N = window.BO_I18N || {};
  var LINGUE = ['it', 'en', 'de', 'fr', 'es', 'ar'];
  // file di lingua: lingue/<lingua>.js accanto a questo script, scaricato solo alla prima richiesta
  var VER = {"en": "4f64a1bd", "de": "59f57e50", "fr": "b3b8cead", "es": "ef75e1a0", "ar": "209e9001"};
  var BASE = (document.currentScript && document.currentScript.src) || location.href;
  function carica(lang, poi) {
    if (lang === 'it' || D[lang]) return poi();
    var s = document.createElement('script');
    s.src = new URL('lingue/' + lang + '.js?v=' + (VER[lang] || ''), BASE).href;
    s.onload = poi; s.onerror = poi;
    document.head.appendChild(s);
  }
  var root = document.documentElement;
  var testi = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var attrs = [].slice.call(document.querySelectorAll('[data-i18n-attr]'));
  var orig = new Map(), origAttr = new Map();
  testi.forEach(function (e) { orig.set(e, e.tagName === 'TITLE' ? e.textContent : e.innerHTML); });
  attrs.forEach(function (e) {
    var m = {};
    e.getAttribute('data-i18n-attr').split(';').forEach(function (p) { var a = p.split(':')[0]; m[a] = e.getAttribute(a); });
    origAttr.set(e, m);
  });
  // SEO delle traduzioni (pagine indicizzabili con canonical): ogni lingua e' l'indirizzo ?lang=xx,
  // canonical e og:url puntano alla lingua mostrata, e le alternative hreflang elencano tutte e sei
  // (italiano = indirizzo senza ?lang, anche come x-default). Stesso schema della sitemap.
  var canon = document.querySelector('link[rel="canonical"]');
  var noindex = /noindex/i.test((document.querySelector('meta[name="robots"]') || {}).content || '');
  var BASEURL = canon ? canon.href.split('?')[0].split('#')[0] : '';
  function indirizzo(lang) { return BASEURL + (lang === 'it' ? '' : '?lang=' + lang); }
  function seo(lang) {
    if (!canon || noindex) return;
    canon.setAttribute('href', indirizzo(lang));
    var og = document.querySelector('meta[property="og:url"]'); if (og) og.setAttribute('content', indirizzo(lang));
    if (!document.querySelector('link[rel="alternate"][hreflang]')) {
      LINGUE.concat('x-default').forEach(function (l) {
        var a = document.createElement('link'); a.rel = 'alternate'; a.hreflang = l;
        a.href = indirizzo(l === 'x-default' ? 'it' : l); document.head.appendChild(a);
      });
    }
  }
  function voce(lang, k) { return lang !== 'it' && D[lang] && D[lang][k] != null ? D[lang][k] : null; }
  function applica(lang) {
    if (LINGUE.indexOf(lang) < 0) lang = 'it';
    if (lang !== 'it' && !D[lang]) return carica(lang, function () { applica(lang); });
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    testi.forEach(function (e) {
      var v = voce(lang, e.getAttribute('data-i18n'));
      if (e.tagName === 'TITLE') e.textContent = v != null ? v : orig.get(e);
      else e.innerHTML = v != null ? v : orig.get(e);
    });
    attrs.forEach(function (e) {
      e.getAttribute('data-i18n-attr').split(';').forEach(function (p) {
        var a = p.split(':')[0], k = p.split(':')[1], v = voce(lang, k);
        e.setAttribute(a, v != null ? v : origAttr.get(e)[a]);
      });
    });
    // i collegamenti fra le pagine del sito portano con se' la lingua scelta
    [].forEach.call(document.querySelectorAll('a[data-con-lingua]'), function (a) {
      var h = a.getAttribute('data-con-lingua').split('#');
      a.setAttribute('href', h[0] + (lang === 'it' ? '' : '?lang=' + lang) + (h[1] ? '#' + h[1] : ''));
    });
    // L'applicazione si apre nella lingua scelta qui, anche in italiano.
    [].forEach.call(document.querySelectorAll('a[data-app]'), function (a) {
      // data-app carries the app's fingerprint (set by build.sh), so a new version is never cached.
      var v = a.getAttribute('data-app');
      a.setAttribute('href', 'app/?lang=' + lang + (v ? '&v=' + v : ''));
    });
    seo(lang);
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    var sel = document.getElementById('lang-select'); if (sel) sel.value = lang;
    // avvisa gli script della pagina (es. le didascalie della galleria) che la lingua e' cambiata
    try { document.dispatchEvent(new CustomEvent('lingua', { detail: lang })); } catch (e) {}
  }
  function iniziale() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && LINGUE.indexOf(q) >= 0) return q;
    // pagine con data-lingua-auto (il biglietto digitale): la lingua del dispositivo, se e' una delle sei.
    // Prima la lingua di sistema (Intl: la lingua dell'interfaccia, che segue il sistema operativo), poi le
    // lingue preferite per i siti del browser, che Chrome tiene a parte e spesso restano in inglese.
    if (root.hasAttribute('data-lingua-auto')) {
      var sis = '';
      try { sis = Intl.DateTimeFormat().resolvedOptions().locale || ''; } catch (e) {}
      var pref = [sis].concat(navigator.languages && navigator.languages.length ? [].slice.call(navigator.languages) : [navigator.language || '']);
      for (var i = 0; i < pref.length; i++) {
        var c = String(pref[i] || '').slice(0, 2).toLowerCase();
        if (LINGUE.indexOf(c) >= 0) return c;
      }
    }
    // predefinita: italiano. Un'altra lingua solo se chiesta.
    return 'it';
  }
  var sel = document.getElementById('lang-select');
  if (sel) sel.addEventListener('change', function () {
    applica(sel.value);
    try { var u = new URL(location.href); if (sel.value === 'it') u.searchParams.delete('lang'); else u.searchParams.set('lang', sel.value); history.replaceState(null, '', u); } catch (e) {}
  });
  applica(iniziale());

  // Torna su: compare dopo il primo scorrimento e porta alla posizione 0.
  var b = document.getElementById('to-top');
  if (b) {
    var su = function (e) {
      if (e) e.preventDefault();
      var r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: r ? 'auto' : 'smooth' });
    };
    var vedi = function () { b.classList.toggle('on', window.scrollY > 120); };
    window.addEventListener('scroll', vedi, { passive: true }); vedi();
    b.addEventListener('click', function () { su(); });
    [].forEach.call(document.querySelectorAll('a[href="#top"]'), function (a) { a.addEventListener('click', su); });
  }
})();
