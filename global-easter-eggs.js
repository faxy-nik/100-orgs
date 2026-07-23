(function () {
  'use strict';

  var buf = '';

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    buf += e.key.toLowerCase();
    if (buf.length > 20) buf = buf.slice(-20);

    // "dream" → navigate to dream world
    if (buf.indexOf('dream') !== -1) {
      buf = '';
      if (window.location.href.indexOf('dream.html') === -1) {
        window.location.href = 'dream.html';
      }
    }

    // "sleep" → navigate to make her sleep
    if (buf.indexOf('sleep') !== -1) {
      buf = '';
      if (window.location.href.indexOf('make-her-sleep.html') === -1) {
        window.location.href = 'make-her-sleep.html';
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
