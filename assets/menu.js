// The header menu of every page (assets/menu.css): the «Funzioni ▾» disclosure and, below 1180 px,
// the drawer. Esc, a click outside or leaving with Tab close the disclosure; ×, Esc or a click
// outside close the drawer, whose focus stays inside while it is open and goes back to ☰ after.
(function () {
  var root = document.documentElement;
  [].forEach.call(document.querySelectorAll('.dd'), function (dd) {
    var b = dd.querySelector('.dd-btn');
    var links = function () { return [].slice.call(dd.querySelectorAll('.dd-menu a')); };
    var open = function () { return b.getAttribute('aria-expanded') === 'true'; };
    function set(o, back) { b.setAttribute('aria-expanded', o ? 'true' : 'false'); if (!o && back) b.focus(); }
    b.addEventListener('click', function () { set(!open()); });
    dd.addEventListener('keydown', function (e) {
      var l = links(), i = l.indexOf(document.activeElement);
      if (e.key === 'Escape' && open()) { e.preventDefault(); e.stopPropagation(); set(false, true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (!open()) set(true); (l[i + 1] || l[0]).focus(); }
      else if (e.key === 'ArrowUp' && open()) { e.preventDefault(); (l[i - 1] || l[l.length - 1]).focus(); }
    });
    dd.addEventListener('focusout', function (e) { if (e.relatedTarget && !dd.contains(e.relatedTarget)) set(false); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) set(false); });
    dd.querySelector('.dd-menu').addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  });

  var dr = document.getElementById('drawer'), veil = document.getElementById('drawerVeil');
  var mb = document.getElementById('menuBtn'), x = document.getElementById('drawerClose');
  if (!dr || !veil || !mb || !x) return;
  var isOpen = function () { return root.classList.contains('drawer-open'); };
  function openDrawer() {
    root.classList.add('drawer-open'); veil.hidden = false; mb.setAttribute('aria-expanded', 'true');
    x.focus();
  }
  function closeDrawer(back) {
    if (!isOpen()) return;
    root.classList.remove('drawer-open'); veil.hidden = true; mb.setAttribute('aria-expanded', 'false');
    if (back) mb.focus();
  }
  mb.addEventListener('click', openDrawer);
  x.addEventListener('click', function () { closeDrawer(true); });
  veil.addEventListener('click', function () { closeDrawer(true); });
  // a link of this page (an anchor) closes the drawer before scrolling
  dr.addEventListener('click', function (e) { if (e.target.closest('a')) closeDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(true); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(dr.querySelectorAll('a[href], button'), function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!dr.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  // wider than the menu: the drawer is not needed any more
  var wide = window.matchMedia('(min-width: 1180px)');
  var onWide = function () { if (wide.matches) closeDrawer(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
})();
