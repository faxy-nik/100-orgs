/**
 * GirlParticles.js
 * Particle effects powered by anime.js — hearts, stars, flowers, sparkles.
 * Uses a shared canvas overlaid on the girl companion's canvas.
 */
// anime v4 compat: make window.anime callable like v3
(function(){var a=window.anime;if(a&&typeof a!=='function'&&a.animate){var f=function(p){return a.animate(p)};for(var k in a)f[k]=a[k];window.anime=f}})();
(function (root) {
  'use strict';

  if (typeof anime === 'undefined') return;

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  var canvas, ctx, W, H, DPR = 1;
  var particles = [];
  var running = false;

  var EMOJIS = {
    heart: { chars: ['\u2764', '\u2665', '\u2763'], colors: ['#ff6688', '#ff4477', '#ff8899'] },
    star: { chars: ['\u2605', '\u2606', '\u2726'], colors: ['#ffdd44', '#ffcc00', '#ffee88'] },
    flower: { chars: ['\u273F', '\u2740', '\u2741'], colors: ['#ff88cc', '#ffaadd', '#ff66aa'] },
    sparkle: { chars: ['\u2728', '\u2733', '\u2734'], colors: ['#ffffff', '#eeeeff', '#ddddff'] },
    note: { chars: ['\u266A', '\u266B'], colors: ['#88ccff', '#66aaff'] },
    zzz: { chars: ['z', 'Z'], colors: ['#8888cc', '#aaaadd'] }
  };

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:999998;pointer-events:none';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    onResize();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
  }

  function render() {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      if (p.done) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.font = p.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.char, p.x, p.y);
    }
    ctx.globalAlpha = 1;
    if (particles.length > 0) {
      requestAnimationFrame(render);
    } else {
      running = false;
    }
  }

  function startLoop() {
    if (!running) { running = true; render(); }
  }

  /* ═══════════════════════ PUBLIC API ═══════════════════════ */

  GirlCompanion.Particles = {
    /** Burst of hearts at position */
    hearts: function (x, y, count) {
      ensureCanvas();
      count = count || 5;
      var set = EMOJIS.heart;
      for (var i = 0; i < count; i++) {
        var p = {
          x: x + (Math.random() - 0.5) * 30,
          y: y,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          color: set.colors[Math.floor(Math.random() * set.colors.length)],
          size: 12 + Math.random() * 10,
          alpha: 1,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          y: y - 40 - Math.random() * 60,
          x: p.x + (Math.random() - 0.5) * 50,
          alpha: 0,
          size: p.size + 6,
          duration: 1200 + Math.random() * 800,
          easing: 'easeOutCubic',
          delay: i * 80,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    /** Burst of stars */
    stars: function (x, y, count) {
      ensureCanvas();
      count = count || 6;
      var set = EMOJIS.star;
      for (var i = 0; i < count; i++) {
        var angle = (Math.PI * 2 / count) * i;
        var dist = 20 + Math.random() * 30;
        var p = {
          x: x, y: y,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          color: set.colors[Math.floor(Math.random() * set.colors.length)],
          size: 10 + Math.random() * 8,
          alpha: 1,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist - 20,
          alpha: 0,
          rotate: Math.random() * 360,
          duration: 1000 + Math.random() * 600,
          easing: 'easeOutQuad',
          delay: i * 50,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    /** Floating flowers */
    flowers: function (x, y, count) {
      ensureCanvas();
      count = count || 4;
      var set = EMOJIS.flower;
      for (var i = 0; i < count; i++) {
        var p = {
          x: x + (Math.random() - 0.5) * 40,
          y: y,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          color: set.colors[Math.floor(Math.random() * set.colors.length)],
          size: 14 + Math.random() * 8,
          alpha: 1,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          y: y - 30 - Math.random() * 50,
          x: '+=' + (Math.random() * 40 - 20),
          alpha: 0,
          rotate: Math.random() * 180 - 90,
          duration: 1500 + Math.random() * 1000,
          easing: 'easeOutSine',
          delay: i * 120,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    /** Sparkle shimmer */
    sparkles: function (x, y, count) {
      ensureCanvas();
      count = count || 8;
      var set = EMOJIS.sparkle;
      for (var i = 0; i < count; i++) {
        var p = {
          x: x + (Math.random() - 0.5) * 50,
          y: y + (Math.random() - 0.5) * 50,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          color: set.colors[Math.floor(Math.random() * set.colors.length)],
          size: 6 + Math.random() * 10,
          alpha: 0,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          alpha: [0, 1, 0],
          size: [p.size, p.size + 4, p.size],
          y: p.y - 15,
          duration: 800 + Math.random() * 600,
          easing: 'easeInOutSine',
          delay: i * 60,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    /** Music notes */
    notes: function (x, y, count) {
      ensureCanvas();
      count = count || 3;
      var set = EMOJIS.note;
      for (var i = 0; i < count; i++) {
        var p = {
          x: x + (Math.random() - 0.5) * 20,
          y: y,
          char: set.chars[Math.floor(Math.random() * set.chars.length)],
          color: set.colors[Math.floor(Math.random() * set.colors.length)],
          size: 14 + Math.random() * 6,
          alpha: 1,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          y: y - 50 - Math.random() * 30,
          x: '+=' + (Math.random() * 30 - 15),
          alpha: 0,
          rotate: Math.random() * 40 - 20,
          duration: 1800 + Math.random() * 800,
          easing: 'easeOutQuad',
          delay: i * 200,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    /** Sleep zzz */
    zzz: function (x, y) {
      ensureCanvas();
      var set = EMOJIS.zzz;
      for (var i = 0; i < 3; i++) {
        var p = {
          x: x + 10 + i * 8,
          y: y - 10,
          char: set.chars[i % set.chars.length],
          color: set.colors[i % set.colors.length],
          size: 10 + i * 3,
          alpha: 0.7,
          done: false
        };
        particles.push(p);
        anime({
          targets: p,
          y: y - 30 - i * 15,
          x: '+=' + (10 + i * 5),
          alpha: 0,
          duration: 2000 + i * 500,
          easing: 'easeOutSine',
          delay: i * 300,
          complete: function () { p.done = true; }
        });
      }
      startLoop();
    },

    clear: function () {
      particles = [];
      if (ctx) ctx.clearRect(0, 0, W, H);
    }
  };
})(typeof window !== 'undefined' ? window : this);
