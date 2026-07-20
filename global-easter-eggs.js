(function () {
  'use strict';

  var buf = '';

  document.addEventListener('keydown', function (e) {
    buf += e.key.toLowerCase();
    if (buf.length > 20) buf = buf.slice(-20);

    // "dream" → navigate to dream world
    if (buf.indexOf('dream') !== -1) {
      buf = '';
      if (window.location.href.indexOf('dream.html') === -1) {
        window.location.href = 'dream.html';
      }
    }

    // "lanterns" → open Lantern World (only on gallery)
    if (buf.indexOf('lanterns') !== -1) {
      buf = '';
      if (typeof window._openLanternWorld === 'function') {
        window._openLanternWorld();
      }
    }
  });
})();
