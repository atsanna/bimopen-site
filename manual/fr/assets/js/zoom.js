// A picture of the manual opens large on a click (or Enter); a click, Esc or the × closes it.
// Plain script, nothing loaded from outside; re-bound on every page of the instant navigation.
(function () {
  function close(box) { box.remove(); document.documentElement.style.overflow = ""; }
  function open(img) {
    var box = document.createElement("div");
    box.className = "bo-zoom";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", img.alt || "");
    var big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || "";
    var x = document.createElement("button");
    x.className = "bo-zoom-close";
    x.type = "button";
    x.setAttribute("aria-label", "×");
    x.textContent = "×";
    box.appendChild(big);
    box.appendChild(x);
    if (img.alt) { var c = document.createElement("p"); c.textContent = img.alt; box.appendChild(c); }
    box.addEventListener("click", function () { close(box); });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") { close(box); document.removeEventListener("keydown", esc); }
    });
    document.documentElement.style.overflow = "hidden";
    document.body.appendChild(box);
    x.focus();
  }
  function bind() {
    document.querySelectorAll(".md-content img").forEach(function (img) {
      if (img.dataset.zoom || img.closest("a")) return;
      img.dataset.zoom = "1";
      img.tabIndex = 0;
      img.addEventListener("click", function () { open(img); });
      img.addEventListener("keydown", function (e) { if (e.key === "Enter") open(img); });
    });
  }
  if (window.document$ && window.document$.subscribe) { window.document$.subscribe(bind); }
  else { document.addEventListener("DOMContentLoaded", bind); }
})();
