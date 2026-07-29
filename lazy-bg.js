/* ---- Lazy-load background images with IntersectionObserver ---- */
(function () {
  var els = document.querySelectorAll('[data-bg]');
  if (!els.length) return;
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')';
          el.removeAttribute('data-bg');
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '200px' });
    els.forEach(function (el) { obs.observe(el); });
  } else {
    els.forEach(function (el) { el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')'; });
  }
})();
