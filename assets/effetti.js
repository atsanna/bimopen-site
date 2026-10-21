// The motion of every page with a header (assets/effetti.css): the reveal on scroll and the light
// that follows the pointer on the cards. Only what is still below the window when the page loads
// is marked .rv (hidden until it scrolls in), so the first screen never waits and nothing stays
// hidden if this script does not run. Each element is revealed once; the elements that come into
// view together follow one another 75 ms apart. prefers-reduced-motion: nothing at all.
(function () {
  var mm = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  if (mm('(prefers-reduced-motion: reduce)')) return;

  // the light on the card under the pointer, one style write per frame
  if (mm('(hover: hover) and (pointer: fine)')) {
    var card = null, x = 0, y = 0, queued = false;
    document.addEventListener('pointermove', function (e) {
      var c = e.target.closest && e.target.closest('.card, .step');
      if (!c) return;
      card = c; x = e.clientX; y = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        var r = card.getBoundingClientRect();
        card.style.setProperty('--fx-x', Math.round(x - r.left) + 'px');
        card.style.setProperty('--fx-y', Math.round(y - r.top) + 'px');
      });
    }, { passive: true });
  }

  var main = document.querySelector('main');
  if (!main || !('IntersectionObserver' in window)) return;
  var SEL = '.eyebrow, h2, .sub, .card, .step, .ep, .car, .pl, details, pre, .checks, .phase-head, .fin-card, .rel, .bars li, .avail li, .outs li, .small, .rm-cta, .follow-in > *, figure';
  var HERO = '.hero-c, .rp-hero, .dw-hero, dialog, [hidden], .skip';
  var H = window.innerHeight || document.documentElement.clientHeight;
  var items = [].filter.call(main.querySelectorAll(SEL), function (el) {
    if (el.closest(HERO)) return false;
    // one reveal per block: a title inside a card moves with its card
    var up = el.parentElement && el.parentElement.closest(SEL);
    if (up && main.contains(up)) return false;
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return false;
    return r.top >= H; // already on screen (or above it): shown as it is
  });
  if (!items.length) return;

  var left = items.slice();
  function done(el) { io.unobserve(el); el.classList.remove('rv', 'in'); el.style.removeProperty('--fx-d'); }
  var io = new IntersectionObserver(function (entries) {
    var n = 0;
    entries.forEach(function (e) {
      if (!e.isIntersecting || !e.target.classList.contains('rv')) return;
      var el = e.target, d = Math.min(n++, 6) * 75;
      io.unobserve(el);
      el.style.setProperty('--fx-d', d + 'ms');
      el.classList.add('in');
      // once shown it is an ordinary element again (the cards take their hover lift back)
      setTimeout(function () { done(el); }, d + 600);
    });
    // what a jump (an anchor, Home, a fast fling) carried above the window without ever showing
    // it is simply there when one scrolls back up
    left = left.filter(function (el) {
      if (!el.classList.contains('rv') || el.classList.contains('in')) return false;
      if (el.getBoundingClientRect().bottom < 0) { done(el); return false; }
      return true;
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  items.forEach(function (el) { el.classList.add('rv'); io.observe(el); });
  // printing shows everything
  window.addEventListener('beforeprint', function () {
    items.forEach(done);
  });
})();
