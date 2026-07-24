window.globalErrors = [];
window.onerror = function (msg, url, line, col, error) {
  window.globalErrors.push({ type: 'error', msg: msg, line: line, col: col, stack: error ? error.stack : '' });
};
window.addEventListener('unhandledrejection', function (event) {
  window.globalErrors.push({ type: 'rejection', msg: event.reason ? (event.reason.message || event.reason) : 'unknown' });
});
var oldConsoleError = console.error;
console.error = function () {
  window.globalErrors.push({ type: 'console', msg: Array.prototype.slice.call(arguments).map(String).join(' ') });
  oldConsoleError.apply(console, arguments);
};

(function () {
  'use strict';

  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) document.documentElement.classList.add('is-touch');
  var isMobileView = window.innerWidth <= 800;
  var safeEl = function (sel) { try { return document.querySelector(sel) } catch (e) { return null } };

  // Error logging helper
  var logError = function (context, error) {
    if (window.console && console.error) {
      console.error('[ASH Error] ' + context, error);
    }
  };

  // Track intervals/timeouts/observers for cleanup
  var activeIntervals = [];
  var activeTimeouts = [];
  var activeObservers = [];

  var safeSetInterval = function (fn, delay) {
    var id = setInterval(fn, delay);
    activeIntervals.push(id);
    return id;
  };
  var safeSetTimeout = function (fn, delay) {
    var id = setTimeout(fn, delay);
    activeTimeouts.push(id);
    return id;
  };
  var safeAddEventListener = function (target, type, listener, options) {
    target.addEventListener(type, listener, options);
  };
  var safeObserve = function (observer, target) {
    observer.observe(target);
    activeObservers.push({ observer: observer, target: target });
  };
  window.safeObserve = safeObserve;

  var clearAll = function () {
    activeIntervals.forEach(clearInterval);
    activeTimeouts.forEach(clearTimeout);
    activeObservers.forEach(function (o) {
      try { o.observer.unobserve(o.target); } catch (e) { }
    });
    var disconnected = {};
    activeObservers.forEach(function (o) {
      if (!disconnected[o.observer]) {
        try { o.observer.disconnect(); } catch (e) { }
        disconnected[o.observer] = true;
      }
    });
    activeIntervals = [];
    activeTimeouts = [];
    activeObservers = [];
  };
  window.addEventListener('beforeunload', clearAll);
  window.addEventListener('pagehide', clearAll);

  /*======= LOADER =======*/
  (function () {
    try {
      var loader = safeEl('.loader');
      if (!loader) return;
      var fill = loader.querySelector('.fill') || (function () {
        var ring = document.createElement('div');
        ring.className = 'progress-ring';
        var f = document.createElement('div');
        f.className = 'fill';
        ring.appendChild(f);
        loader.appendChild(ring);
        return f;
      })();
      var count = 0, max = 100, removed = false;
      var interval = safeSetInterval(function () {
        count += 1 + Math.floor(Math.random() * 3);
        if (count > max) count = max;
        if (fill) fill.style.width = count + '%';
        if (count >= max) {
          clearInterval(interval);
          safeSetTimeout(function () {
            if (removed) return;
            removed = true;
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            safeSetTimeout(function () { try { loader.remove() } catch (e) { } }, 1500);
          }, 400);
        }
      }, 30);
      safeSetTimeout(function () {
        if (removed) return;
        clearInterval(interval);
        removed = true;
        if (fill) fill.style.width = '100%';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        safeSetTimeout(function () { try { loader.remove() } catch (e) { } }, 1500);
      }, 8000);
    } catch (e) { logError('LOADER', e); }
  })();

  /*======= CURSOR LIGHT =======*/
  (function () {
    try {
      var light = safeEl('.cursorLight');
      if (!light || rm || isTouch) { if (light) light.style.display = 'none'; return; }
      var lightTicking = false;
      safeAddEventListener(document, 'mousemove', function (e) {
        if (!lightTicking) {
          requestAnimationFrame(function () {
            light.style.left = e.clientX + 'px';
            light.style.top = e.clientY + 'px';
            lightTicking = false;
          });
          lightTicking = true;
        }
      });
    } catch (e) { logError('CURSOR_LIGHT', e); }
  })();

  /*======= ROSE PETALS =======*/
  (function () {
    try {
      var el = safeEl('.petals');
      if (!el || rm) return;
      var n = isTouch ? 6 : 12;
      for (var i = 0; i < n; i++) {
        var p = document.createElement('div');
        p.className = 'petal';
        p.innerHTML = '\uD83C\uDF38';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (10 + Math.random() * 12) + 's';
        p.style.fontSize = (12 + Math.random() * 16) + 'px';
        p.style.animationDelay = Math.random() * 10 + 's';
        el.appendChild(p);
      }
    } catch (e) { logError('ROSE_PETALS', e); }
  })();

  /*======= FIREFLIES =======*/
  (function () {
    try {
      if (rm) return;
      var n = isTouch ? 4 : 10;
      for (var i = 0; i < n; i++) {
        var f = document.createElement('div');
        f.className = 'firefly';
        f.style.left = Math.random() * 100 + 'vw';
        f.style.top = Math.random() * 100 + 'vh';
        f.style.animationDuration = (6 + Math.random() * 8) + 's';
        f.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(f);
      }
    } catch (e) { logError('FIREFLIES', e); }
  })();

  /*======= TABLE OF CONTENTS =======*/
  (function () {
    try {
      var toc = safeEl('.toc');
      var tocToggle = safeEl('.toc-toggle');
      if (!toc) return;
      var headings = document.querySelectorAll('.tribute-lead span:last-child');
      var links = [];
      isMobileView = window.innerWidth <= 800;

      headings.forEach(function (title) {
        var id = title.innerText.replace(/\s+/g, '_').toLowerCase();
        title.parentElement.id = id;
        var a = document.createElement('a');
        a.href = '#' + id;


        a.innerText = title.innerText;
        toc.appendChild(a);
        links.push(a);
      });

      // Mobile: toggle TOC panel
      if (tocToggle) {
        tocToggle.addEventListener('click', function () {
          toc.classList.toggle('mobile-open');
          tocToggle.classList.toggle('active');
        });

        // Close TOC when clicking a link
        links.forEach(function (a) {
          a.addEventListener('click', function () {
            toc.classList.remove('mobile-open');
            tocToggle.classList.remove('active');
          });
        });

        tocToggle.classList.add('show');
      }

      var tocCurrent = safeEl('.toc-current');

      // Handle resize
      var resizeTimer;
      safeAddEventListener(window, 'resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          isMobileView = window.innerWidth <= 800;
        }, 150);
      });
    } catch (e) { logError('TOC', e); }
  })();

  /*======= SCROLL PROGRESS + BACK TO TOP =======*/
  (function () {
    try {
      var progressFill = document.getElementById('progressFill');
      var toTopBtn = document.getElementById('toTop');
      if (progressFill && toTopBtn) {
        toTopBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' });
        });
      }
    } catch (e) { logError('SCROLL_PROGRESS', e); }
  })();

  /*======= CONSOLIDATED SCROLL HANDLER =======*/
  (function () {
    try {
      var tocEl = safeEl('.toc');
      var tocToggle = document.getElementById('tocToggle');
      var tocCurrent = safeEl('.toc-current');
      var tocLinks = tocEl ? tocEl.querySelectorAll('a[href^="#"]') : [];
      var progressFill = document.getElementById('progressFill');
      var toTopBtn = document.getElementById('toTop');
      var heroEl = safeEl('.hero');
      var ticking = false;
      var lastTocUpdate = 0;

      function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar + back to top
        if (progressFill) {
          var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
          progressFill.style.width = progress.toFixed(2) + '%';
        }
        if (toTopBtn) {
          toTopBtn.classList.toggle('is-visible', scrollTop > 480);
        }

        // TOC active link (throttled to every 300ms)
        var now = Date.now();
        if (tocEl && now - lastTocUpdate > 300) {
          lastTocUpdate = now;
          var best = null, bestDist = Infinity;
          tocLinks.forEach(function (a) {
            var el = document.getElementById(a.getAttribute('href').slice(1));
            if (el) {
              var dist = Math.abs(el.getBoundingClientRect().top);
              if (dist < bestDist) { bestDist = dist; best = a; }
            }
          });
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          if (best) {
            best.classList.add('active');
            if (tocCurrent) tocCurrent.textContent = best.textContent;
          }
        }

        // Parallax hero
        if (heroEl && !rm && !isTouch && scrollTop < window.innerHeight) {
          heroEl.style.transform = 'translateY(' + (scrollTop * 0.15) + 'px)';
          heroEl.style.opacity = Math.max(0.3, 1 - scrollTop / (window.innerHeight * 0.7));
        }
      }

      safeAddEventListener(window, 'scroll', function () {
        if (!ticking) {
          requestAnimationFrame(function () { onScroll(); ticking = false; });
          ticking = true;
        }
      }, { passive: true });
      onScroll();
      // ponytail: body starts display:none for lock-check, scrollHeight=0 at init.
      // Re-run onScroll once body becomes visible so progress bar picks up correct height.
      var bodyCheck = safeSetInterval(function () {
        if (document.body.style.display !== 'none') {
          clearInterval(bodyCheck);
          onScroll();
        }
      }, 200);
    } catch (e) { logError('CONSOLIDATED_SCROLL', e); }
  })();

  /*======= REVEAL ANIMATION =======*/
  (function () {
    try {
      var cards = document.querySelectorAll('.tribute, .prose');
      if (!cards.length) return;
      cards.forEach(function (c) { c.classList.add('fadeCard'); });
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: rm ? 0 : 0.15 });
      cards.forEach(function (c) { safeObserve(observer, c); });
      // ponytail: body starts display:none (admin lock check). Elements have zero
      // dimensions while hidden so observer never fires isIntersecting. Once body
      // becomes visible we re-observe AND force-reveal anything still hidden.
      function forceReveal() {
        cards.forEach(function (c) {
          if (!c.classList.contains('show')) {
            try { observer.unobserve(c); observer.observe(c); } catch (e) {}
          }
        });
      }
      // Poll until body is visible, then re-observe
      var bodyPoll = safeSetInterval(function () {
        if (document.body.style.display !== 'none') {
          clearInterval(bodyPoll);
          safeSetTimeout(forceReveal, 100);
        }
      }, 200);
      // Hard fallback: after 2s, force-reveal everything regardless
      safeSetTimeout(function () {
        cards.forEach(function (c) { c.classList.add('show'); });
      }, 2000);
    } catch (e) { logError('REVEAL_ANIMATION', e); }
  })();

  /*======= READING FOCUS =======*/
  (function () {
    try {
      var paragraphs = document.querySelectorAll('.prose, .tribute-body');
      if (!paragraphs.length || rm) return;
      var reading = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            paragraphs.forEach(function (p) {
              if (p !== entry.target) {
                p.classList.add('dimmed');
                p.classList.remove('focused');
              }
            });
            entry.target.classList.remove('dimmed');
            entry.target.classList.add('focused');
          }
        });
      }, { threshold: 0.5 });
      paragraphs.forEach(function (p) { safeObserve(reading, p); });
    } catch (e) { logError('READING_FOCUS', e); }
  })();

  /*======= EMOJI HEADINGS =======*/
  (function () {
    try {
      var map = {
        heart: '\u2764\uFE0F', brain: '\uD83E\uDDE0', mind: '\uD83E\uDDE0',
        eye: '\uD83D\uDC40', eyes: '\uD83D\uDC40', pupil: '\uD83D\uDC41\uFE0F',
        eyebrow: '\u2728', eyelash: '\u2728', ear: '\uD83D\uDC42',
        nose: '\uD83D\uDC43', lip: '\uD83D\uDC44', mouth: '\uD83D\uDC44',
        tongue: '\uD83D\uDC45', teeth: '\uD83E\uDDB7', smile: '\uD83D\uDE0A',
        cheek: '\uD83D\uDE0A', hair: '\uD83D\uDC87', hairline: '\uD83D\uDC87',
        baby: '\uD83C\uDF38', scalp: '\uD83D\uDC86', face: '\uD83C\uDF38',
        forehead: '\u2728', neck: '\uD83E\uDDA2', nape: '\uD83E\uDDA2',
        shoulder: '\uD83E\uDD0D', arm: '\uD83D\uDCAA', hand: '\uD83E\uDD32',
        finger: '\uD83E\uDEF6', fingertip: '\uD83E\uDEF6', nail: '\uD83D\uDC85',
        waist: '\uD83D\uDC9E', belly: '\uD83E\uDD0D', 'belly button': '\uD83C\uDF00',
        hips: '\uD83D\uDC83', thigh: '\uD83E\uDDB5', leg: '\uD83E\uDDB5',
        knee: '\uD83E\uDBBF', feet: '\uD83E\uDDB6', foot: '\uD83E\uDDB6',
        toes: '\uD83E\uDDB6', back: '\uD83E\uDD0D', heartbeat: '\uD83D\uDC93',
        chest: '\uD83E\uDD0D', breast: '\uD83D\uDC95', cleavage: '\uD83D\uDC95',
        boob: '\uD83D\uDC95', vagina: '\uD83C\uDF39', clitoris: '\uD83C\uDF39',
        scent: '\uD83C\uDF3A', hug: '\uD83E\uDEC2', laugh: '\uD83D\uDE02',
        voice: '\uD83C\uDFB5', soul: '\u2728', whole: '\uD83D\uDC96'
      };
      document.querySelectorAll('.tribute-lead span:last-child').forEach(function (title) {
        var text = title.textContent.toLowerCase();
        for (var key in map) {
          if (text.includes(key)) {
            title.innerHTML = map[key] + ' ' + title.innerHTML;
            break;
          }
        }
      });
    } catch (e) { logError('EMOJI_HEADINGS', e); }
  })();

  /*======= GOLDEN DIVIDER =======*/
  (function () {
    try {
      document.querySelectorAll('.tribute').forEach(function (card) {
        if (card.querySelector('.golden-divider')) return;
        var hr = document.createElement('div');
        hr.className = 'golden-divider';
        hr.innerHTML = '\u2726 \u2764\ufe0f \u2726';
        hr.style.textAlign = 'center';
        hr.style.marginTop = '25px';
        hr.style.marginBottom = '25px';
        hr.style.opacity = '.35';
        hr.style.letterSpacing = '.6rem';
        hr.style.color = '#ffd36a';
        card.prepend(hr);
      });
    } catch (e) { logError('GOLDEN_DIVIDER', e); }
  })();

  /*======= FLOATING QUOTES =======*/
  (function () {
    if (window.FeatureFlags && !window.FeatureFlags.get('floating-quotes')) return;
    try {
      if (rm) return;
      var quotes = [
        'Always',
        'Forever',
        'My Home',
        'My Safe Place',
        'My Peace',
        'My Favorite Person',
        'You',
        'Love',
        'Only You',
        'Be Mine',
        'Hold Me',
        'Come Closer',
        'Stay Close',
        'One More Hug',
        'One More Kiss',
        'Your Smile',
        'Your Laugh',
        'Your Eyes',
        'Your Heart',
        'Your Voice',
        'Your Scent',
        'Your Touch',
        'Wrapped In You',
        'Lost In You',
        "Can't Resist You",
        'Irresistible',
        'Mesmerized',
        'Captivated',
        'Breathless',
        'Electric',
        'Temptation',
        'Desire',
        'Longing',
        'Yearning',
        'Craving',
        'Soft Kisses',
        'Gentle Touch',
        'Sweet Dreams',
        'Kiss Me',
        'Miss Me',
        'Stay With Me',
        'Just Us',
        'My Universe',
        'My Moon',
        'My Sunshine',
        'My Queen',
        'My Angel',
        'My Muse',
        'My Beautiful Girl',
        'My Pretty Girl',
        'My Darling',
        'My Sweetheart',
        'My Honey',
        'My Honey Bunny',
        'My Sugarplum',
        'My Sugar Cookie',
        'My Little Star',
        'My Safe Haven',
        'My Comfort',
        'My Calm',
        'My Happiness',
        'My Heartbeat',
        'My Everything',
        'My Forever',
        'My Always',
        'My Destiny',
        'My Favorite Smile',
        'My Favorite Eyes',
        'Your My Home',
        "You're My Peace",
        "You're My Soft Place",
        "You're My Favorite Hello",
        "You're Worth Every Moment",
        'Your Blush',
        'Your Warmth',
        'Your Embrace',
        'Your Presence',
        'Our Story',
        'Our Forever',
        'Eeshah ❤️',
        'Still You',
        'Always You',
        'Forever Yours',
        'Endlessly',
        'Infinity',
        'Soulmate',
        'Together',
        'Unbreakable',
        'Cherished',
        'Adored',
        'Treasured',
        'Beloved',
        'Dream Girl',
        'Moonlight',
        'Starlight',
        'Velvet',
        'Bloom',
        'Whisper',
        'Caress',
        'Heartbeat',
        'Home',
        'Bite My Lip',
        'Hold My Waist',
        'Skin on Skin',
        'Taste You',
        'Trace Your Body',
        'Breathless Sighs',
        'Sweet Shivers',
        'Late Night Heat',
        'Make Me Moan',
        'Gentle Bites',
        'Passionate Kisses',
        'Under the Sheets',
        'Losing Control',
        'Your Warm Breath',
        'Slow & Deep',
        'Worship You',
        'Tangled Together'
      ];
      var active = 0;
      safeSetInterval(function () {

        if (active >= 30) return;

        requestAnimationFrame(function () {

          for (let i = 0; i < 2; i++) {

            const q = document.createElement("div");

            active++;

            q.innerText = quotes[Math.floor(Math.random() * quotes.length)];

            q.style.position = "fixed";
            q.style.left = Math.random() * 100 + "vw";
            q.style.bottom = "-60px";

            q.style.fontSize = (16 + Math.random() * 18) + "px";
            q.style.opacity = (0.03 + Math.random() * 0.05).toFixed(2);

            const colors = [
              "#c9952a",
              "#d4a8a8",
              "#c8b89e",
              "#b89caa",
              "#c2aa88"
            ];

            q.style.color = colors[Math.floor(Math.random() * colors.length)];

            q.style.fontStyle = "italic";
            q.style.fontWeight = Math.random() > 0.5 ? "600" : "400";

            q.style.pointerEvents = "none";
            q.style.transition = (14 + Math.random() * 8) + "s linear";
            q.style.zIndex = "-1";

            document.body.appendChild(q);

            requestAnimationFrame(function () {

              q.style.transform =
                `translateY(-120vh)
                     translateX(${Math.random() * 300 - 150}px)
                     rotate(${Math.random() * 90 - 45}deg)`;

              q.style.opacity = "0";

            });

            safeSetTimeout(function () {

              q.remove();
              active--;

            }, 22000);

          }

        });

      }, 1000);
    } catch (e) { logError('FLOATING_QUOTES', e); }
  })();

  /*======= CURSOR SPARKLES =======*/
  (function () {
    try {
      if (rm || isTouch) return;
      var lastSparkle = 0;
      safeAddEventListener(document, 'mousemove', function (e) {
        var now = Date.now();
        if (now - lastSparkle < 200) return;
        lastSparkle = now;
        var s = document.createElement('div');
        s.innerHTML = Math.random() > 0.5 ? '\u2764' : '\u2728';
        s.style.position = 'fixed';
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        s.style.pointerEvents = 'none';
        s.style.fontSize = '12px';
        s.style.opacity = '.8';
        s.style.transition = '1s';
        s.style.zIndex = '9998';
        document.body.appendChild(s);
        requestAnimationFrame(function () {
          s.style.transform = 'translate(' + ((Math.random() * 40) - 20) + 'px,' + (-40 - Math.random() * 40) + 'px) scale(.2)';
          s.style.opacity = '0';
        });
        safeSetTimeout(function () { s.remove(); }, 1000);
      });
    } catch (e) { logError('CURSOR_SPARKLES', e); }
  })();

  /*======= HEART RAIN =======*/
  (function () {
    if (window.FeatureFlags && !window.FeatureFlags.get('floating-hearts')) return;
    try {
      if (rm) return;
      safeSetInterval(function () {
        var n = isTouch ? 2 : 4;
        for (var i = 0; i < n; i++) {
          var h = document.createElement('div');
          h.innerHTML = '\u2764';
          h.style.position = 'fixed';
          h.style.left = Math.random() * 100 + 'vw';
          h.style.top = '-30px';
          h.style.color = 'rgba(200,90,120,.18)';
          h.style.fontSize = (10 + Math.random() * 18) + 'px';
          h.style.animation = 'none';
          h.style.pointerEvents = 'none';
          h.style.zIndex = '9999';
          document.body.appendChild(h);
          (function (el) {
            safeSetTimeout(function () {
              el.style.transition = '3s linear';
              el.style.transform = 'translateY(110vh)';
              el.style.opacity = '0';
              safeSetTimeout(function () { el.remove(); }, 3000);
            }, 100);
          })(h);
        }
      }, 30000);
    } catch (e) { logError('HEART_RAIN', e); }
  })();

  /*======= END SECTION =======*/
  (function () {
    try {
      var endSection = safeEl('.end-section');
      if (!endSection) return;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) endSection.classList.add('visible');
        });
      }, { threshold: 0.3 });
      safeObserve(observer, endSection);
    } catch (e) { logError('END_SECTION', e); }
  })();

  /*======= PARALLAX HERO =======*/

  /*======= EASTER EGG (TURN YOURSELF ON) =======*/
  (function () {
    if (window.FeatureFlags && !window.FeatureFlags.get('easter-egg-btn')) return;
    try {
      var btn = document.getElementById('easterEggBtn');
      var modal = document.getElementById('easterEggModal');
      var closeBtn = document.getElementById('easterEggClose');
      if (!btn || !modal || !closeBtn) return;

      // ===== AUDIO ENGINE =====
      var audioCtx = null;
      var audioBuffers = {};
      var masterGain = null;

      function initAudio() {
        if (audioCtx) return;
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          masterGain = audioCtx.createGain();
          masterGain.gain.value = 0.3;
          masterGain.connect(audioCtx.destination);
        } catch (e) { console.warn('AudioContext init failed:', e); }
      }

      // Generate procedural sounds
      function createTone(frequency, duration, type, gainValue) {
        if (!audioCtx) return null;
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = frequency;
        gain.gain.value = gainValue || 0.1;
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
        return osc;
      }

      function playAmbientDrone() {
        if (!audioCtx) return;
        // Low sub-bass drone
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 55; // A1
        gain.gain.value = 0.02;
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        // Slow frequency modulation
        var lfo = audioCtx.createOscillator();
        var lfoGain = audioCtx.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 0.15;
        lfoGain.gain.value = 8;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        return { osc: osc, lfo: lfo, gain: gain };
      }

      var ambientDrone = null;

      function startAmbient() {
        if (ambientDrone) return;
        initAudio();
        ambientDrone = playAmbientDrone();
        // Add subtle pink noise layer
        if (audioCtx) {
          var bufferSize = audioCtx.sampleRate * 2;
          var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          var output = noiseBuffer.getChannelData(0);
          for (var i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.003;
          }
          var noiseSource = audioCtx.createBufferSource();
          var noiseGain = audioCtx.createGain();
          noiseGain.gain.value = 0.008;
          noiseSource.buffer = noiseBuffer;
          noiseSource.loop = true;
          noiseSource.connect(noiseGain);
          noiseGain.connect(masterGain);
          noiseSource.start();
          ambientDrone.noise = noiseSource;
        }
      }

      function stopAmbient() {
        if (ambientDrone) {
          try { ambientDrone.osc.stop(); ambientDrone.lfo.stop(); } catch (e) { }
          if (ambientDrone.noise) { try { ambientDrone.noise.stop(); } catch (e) { } }
          ambientDrone = null;
        }
      }

      // Procedural sound effects
      function playClick() {
        initAudio();
        createTone(800, 0.06, 'sine', 0.08);
        createTone(1200, 0.04, 'sine', 0.04);
      }

      function playTransition() {
        initAudio();
        // Descending glissando
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      }

      function playChoice() {
        initAudio();
        // Soft chime
        createTone(523.25, 0.15, 'sine', 0.07); // C5
        setTimeout(function () { createTone(659.25, 0.15, 'sine', 0.05); }, 60); // E5
        setTimeout(function () { createTone(783.99, 0.2, 'sine', 0.04); }, 120); // G5
      }

      function playClimax() {
        initAudio();
        // Layered harmonic cascade
        var notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5 E5 G5 C6 E6
        notes.forEach(function (freq, i) {
          setTimeout(function () {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
          }, i * 80);
        });
        // Sub bass hit
        var sub = audioCtx.createOscillator();
        var subGain = audioCtx.createGain();
        sub.type = 'sine';
        sub.frequency.value = 40;
        subGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        subGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        sub.connect(subGain);
        subGain.connect(masterGain);
        sub.start();
        sub.stop(audioCtx.currentTime + 1.5);
      }

      function playWhisper() {
        initAudio();
        // Breath-like noise burst
        var bufferSize = audioCtx.sampleRate * 0.3;
        var whisperBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        var output = whisperBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3)) * 0.02;
        }
        var src = audioCtx.createBufferSource();
        var gain = audioCtx.createGain();
        src.buffer = whisperBuffer;
        gain.gain.value = 0.1;
        src.connect(gain);
        gain.connect(masterGain);
        src.start();
      }

      function playHeartbeat() {
        initAudio();
        // Double thump
        function thump(delay, freq, dur) {
          setTimeout(function () {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(audioCtx.currentTime + dur);
          }, delay);
        }
        thump(0, 60, 0.15);
        thump(180, 55, 0.12);
        thump(800, 60, 0.15);
        thump(980, 55, 0.12);
      }

      // ===== HAPTICS =====
      function vibrate(pattern) {
        if (navigator.vibrate) {
          try { navigator.vibrate(pattern); } catch (e) { }
        }
      }

      function hapticLight() { vibrate(15); }
      function hapticMedium() { vibrate([30, 20, 30]); }
      function hapticHeavy() { vibrate([50, 30, 50, 30, 80]); }
      function hapticHeartbeat() { vibrate([80, 100, 80, 300, 80, 100, 80]); }
      function hapticClimax() { vibrate([100, 50, 100, 50, 100, 50, 200, 100, 200]); }
      function hapticTransition() { vibrate([20, 10, 20, 10, 40]); }

      // ===== EASTER EGG LOGIC =====
      var currentStep = null;

      function showStep(stepId) {
        var allSteps = modal.querySelectorAll('.easter-egg-step');
        allSteps.forEach(function (s) { s.hidden = true; });
        var step = modal.querySelector('.easter-egg-step[data-step="' + stepId + '"]');
        if (step) step.hidden = false;
        currentStep = stepId;

        // Audio/haptic feedback per step
        if (stepId === '1') {
          startAmbient();
          playWhisper();
          hapticLight();
        } else if (stepId === '2') {
          playTransition();
          hapticTransition();
        } else if (stepId === '3') {
          playChoice();
          hapticMedium();
        } else if (stepId === '4') {
          playHeartbeat();
          hapticMedium();
        } else if (stepId === '5') {
          playWhisper();
          hapticLight();
        } else if (stepId === '6') {
          playTransition();
          hapticTransition();
        } else if (stepId === '7') {
          playHeartbeat();
          hapticHeavy();
        } else if (stepId === '8') {
          playClimax();
          hapticClimax();
          var hbInterval = setInterval(playHeartbeat, 2200);
          modal._heartbeatInterval = hbInterval;
        } else if (stepId === '9') {
          playClimax();
          hapticClimax();
        } else if (stepId === '10') {
          playClimax();
          hapticClimax();
        } else if (stepId === '11') {
          stopAmbient();
          if (modal._heartbeatInterval) clearInterval(modal._heartbeatInterval);
          playWhisper();
          hapticLight();
        } else if (stepId === '12') {
          playTransition();
          hapticHeartbeat();
        }
      }

      function openModal() {
        initAudio();
        modal.hidden = false;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        showStep('1');
        hapticMedium();
      }

      function closeModal() {
        stopAmbient();
        if (modal._heartbeatInterval) clearInterval(modal._heartbeatInterval);
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(function () { modal.hidden = true; }, 500);
      }

      btn.addEventListener('click', function () {
        playClick();
        openModal();
      });
      closeBtn.addEventListener('click', function () {
        playClick();
        closeModal();
      });

      // Click choices
      modal.addEventListener('click', function (e) {
        var choice = e.target.closest('.easter-egg-choice');
        if (!choice) return;
        playClick();
        hapticLight();
        var next = choice.getAttribute('data-next');
        if (next === '1') {
          closeModal();
        } else if (next) {
          showStep(next);
        }
      });

      // Close on backdrop click
      modal.querySelector('.easter-egg-backdrop').addEventListener('click', function (e) {
        if (e.target === this) {
          playClick();
          closeModal();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
          playClick();
          closeModal();
        }
      });
    } catch (e) { logError('EASTER_EGG', e); }
  })();

  /*======= DAY/NIGHT & BOOKMARKS & DICE & TYPEWRITER =======*/
  (function () {
    try {
      // --- Show floating buttons after loader finishes ---
      safeSetTimeout(function () {
        var favToggleBtn = document.getElementById('favToggle');
        var themeToggleBtn = document.getElementById('themeToggle');
        var diceBtnEl = document.getElementById('diceBtn');
        if (favToggleBtn) favToggleBtn.classList.add('show');
        if (themeToggleBtn) themeToggleBtn.classList.add('show');
        if (diceBtnEl) diceBtnEl.classList.add('show');
      }, 2000);

      // --- Theme Toggle (Day / Reading mode) ---
      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        const savedTheme = localStorage.getItem('ash-theme');
        if (savedTheme === 'day') {
          document.body.classList.add('day-mode');
          themeToggle.textContent = '\uD83C\uDF19';
        }
        themeToggle.addEventListener('click', function () {
          const isDay = document.body.classList.toggle('day-mode');
          localStorage.setItem('ash-theme', isDay ? 'day' : 'dark');
          themeToggle.textContent = isDay ? '\uD83C\uDF19' : '\u2600\uFE0F';
          if (navigator.vibrate) navigator.vibrate(30);
        });
      }

      // --- Random Section Dice ---
      const diceBtn = document.getElementById('diceBtn');
      if (diceBtn) {
        diceBtn.addEventListener('click', function () {
          const tributes = document.querySelectorAll('.tribute');
          if (tributes.length > 0) {
            const rand = tributes[Math.floor(Math.random() * tributes.length)];
            rand.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const originalBorder = rand.style.borderColor;
            rand.style.borderColor = 'var(--rose)';
            setTimeout(() => { rand.style.borderColor = originalBorder; }, 1500);
            if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
          }
        });
      }

      // --- Parallax backgrounds for ALL sections ---
      // 20 original PNGs + 2 ash photos in pool; keyword map uses old PNGs
      (function applyParallaxToAll() {
        if (window.FeatureFlags && !window.FeatureFlags.get('parallax')) return;
        var parallaxImages = window.ASH_CONFIG.parallaxImages;

        var keywordMap = window.ASH_CONFIG.keywordMap || [
          { kw: 'eyebrow', image: './ash/ash8.jpeg' },
          { kw: 'forehead', image: './ash/ash8.jpeg' },
          { kw: 'eye', image: './ash/ash1.jpeg' },
          { kw: 'pupil', image: './ash/ash1.jpeg' },
          { kw: 'eyelash', image: './ash/ash1.jpeg' },
          { kw: 'eyelid', image: './ash/ash1.jpeg' },
          { kw: 'smile', image: './ash/ash2.jpeg' },
          { kw: 'laugh', image: './ash/ash2.jpeg' },
          { kw: 'lip', image: './ash/ash2.jpeg' },
          { kw: 'cheek', image: './ash/ash4.jpeg' },
          { kw: 'dimple', image: './ash/ash4.jpeg' },
          { kw: 'nose', image: './ash/ash5.jpeg' },
          { kw: 'face', image: './ash/ash6.jpeg' },
          { kw: 'feature', image: './ash/ash.jpeg' },
          { kw: 'jawline', image: './ash/ash6.jpeg' },
          { kw: 'chin', image: './ash/ash6.jpeg' },
          { kw: 'ear', image: './parallax/parallax_ears.png' },
          { kw: 'hairline', image: './parallax/parallax_hair.png' },
          { kw: 'baby hair', image: './parallax/parallax_hair.png' },
          { kw: 'scalp', image: './parallax/parallax_hair.png' },
          { kw: 'hair', image: './parallax/parallax_hair.png' },
          { kw: 'mole', image: './parallax/parallax_mole.png' },
          { kw: 'beauty', image: './parallax/parallax_mole.png' },
          { kw: 'cleavage', image: './parallax/parallax_mole.png' },
          { kw: 'breast', image: './parallax/parallax_mole.png' },
          { kw: 'tear', image: './parallax/parallax_tear.png' },
          { kw: 'cry', image: './parallax/parallax_tear.png' },
          { kw: 'weep', image: './parallax/parallax_tear.png' },
          { kw: 'neck', image: './parallax/parallax_neck.png' },
          { kw: 'collarbone', image: './parallax/parallax_neck.png' },
          { kw: 'chain', image: './parallax/parallax_neck.png' },
          { kw: 'necklace', image: './parallax/parallax_neck.png' },
          { kw: 'vinyl', image: './parallax/parallax_vinyl.png' },
          { kw: 'record', image: './parallax/parallax_vinyl.png' },
          { kw: 'turntable', image: './parallax/parallax_vinyl.png' },
          { kw: 'music', image: './parallax/parallax_vinyl.png' },
          { kw: 'lantern', image: './parallax/parallax_lanterns.png' },
          { kw: 'wish', image: './parallax/parallax_lanterns.png' },
          { kw: 'reading', image: './parallax/parallax_reading.png' },
          { kw: 'book', image: './parallax/parallax_reading.png' },
          { kw: 'firefly', image: './parallax/parallax_firefly.png' },
          { kw: 'glow', image: './parallax/parallax_firefly.png' },
          { kw: 'constellation', image: './parallax/parallax_constellation.png' },
          { kw: 'wax seal', image: './parallax/parallax_waxseal.png' },
          { kw: 'seal', image: './parallax/parallax_waxseal.png' },
          { kw: 'letter', image: './parallax/parallax_letter.png' },
          { kw: 'moon', image: './parallax/parallax_moon.png' },
          { kw: 'crescent', image: './parallax/parallax_moon.png' },
          { kw: 'fog', image: './parallax/parallax_fog.png' },
          { kw: 'mist', image: './parallax/parallax_fog.png' },
          { kw: 'ember', image: './parallax/parallax_ember.png' },
          { kw: 'glowing', image: './parallax/parallax_ember.png' },
          { kw: 'intertwine', image: './parallax/parallax_hands_intertwined.png' },
          { kw: 'fingers', image: './parallax/parallax_hands_intertwined.png' },
          { kw: 'forehead', image: './parallax/parallax_forehead.png' }
        ];

        var allTributes = document.querySelectorAll('.tribute');
        var attachment = window.ASH_CONFIG.attachment; if (isTouch) attachment = 'scroll';

        // ponytail: seeded shuffle for intimate sections so images distribute
        // evenly instead of all starting with parallax_bedroom.png
        function seededShuffle(arr, seed) {
          var a = arr.slice();
          for (var i = a.length - 1; i > 0; i--) {
            seed = (seed * 16807 + 0) % 2147483647;
            var j = seed % (i + 1);
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
          }
          return a;
        }
        var intimatePool = seededShuffle(parallaxImages, 42);

        // ponytail: user-uploaded images replace ~10 random sections
        // stored in localStorage as JSON array of data-URL strings
        var userImages = [];
        try {
          var raw = localStorage.getItem('ash-user-parallax');
          if (raw) userImages = JSON.parse(raw);
        } catch (e) {}
        // pre-compute which sections get user images (deterministic, ~10 or 10%)
        var userReplaceSet = {};
        if (userImages.length) {
          var totalTributes = allTributes.length;
          var replaceCount = Math.min(userImages.length, Math.max(10, Math.floor(totalTributes * 0.1)));
          var allIndices = [];
          for (var ri = 0; ri < totalTributes; ri++) allIndices.push(ri);
          var shuffledIndices = seededShuffle(allIndices, 7);
          for (var si = 0; si < replaceCount; si++) userReplaceSet[shuffledIndices[si]] = true;
        }

        // Pre-compute image data for each tribute
        // Separate AI images from Ash originals
        var aiImages = [];
        var ashImages = [];
        parallaxImages.forEach(function (p) {
          if (p.indexOf('./ash/') === 0) ashImages.push(p);
          else aiImages.push(p);
        });

        // ponytail: skip images for the most intimate/private sections
        var skipImageKw = ['inner thigh', 'vagina', 'clitoris', 'vulva', 'labia', 'g-spot', 'ovaries', 'wetness', 'nipples', 'mammary', 'pleasure', 'arous'];

        var tributeData = [];
        var lastImg = '';
        var aiIdx = 0;
        var ashIdx = 0;
        allTributes.forEach(function (tribute, idx) {
          var img = aiImages[aiIdx % aiImages.length];
          var isIntimate = false;
          var isSkipped = false;
          var isLongSection = false;

          var lead = tribute.querySelector('.tribute-lead');
          if (lead) {
            var titleSpan = lead.querySelector('span:not(.spark)');
            if (titleSpan) {
              var rawText = titleSpan.textContent.trim();
              var lowerText = rawText.toLowerCase();

              // Check if this section should have no image at all
              for (var si = 0; si < skipImageKw.length; si++) {
                if (lowerText.indexOf(skipImageKw[si]) !== -1) {
                  isSkipped = true;
                  break;
                }
              }

              // Check body length — longer sections (>1500 chars) get Ash originals
              var bodies = tribute.querySelectorAll('.tribute-body');
              var bodyLen = 0;
              bodies.forEach(function (b) { bodyLen += b.textContent.length; });
              if (bodyLen > 1500) isLongSection = true;

              var numMatch = rawText.match(/(\d+)/);
              var isFantasiesPage = location.pathname.indexOf('fantasies') !== -1;
              if ((numMatch && parseInt(numMatch[1], 10) >= 48) || isFantasiesPage) {
                isIntimate = true;
                tribute.classList.add('intimate-card');
              }

              if (!isSkipped && lowerText.indexOf('--') === -1) {
                // Keyword mapping for top-level sections
                for (var mi = 0; mi < keywordMap.length; mi++) {
                  if (lowerText.indexOf(keywordMap[mi].kw) !== -1) {
                    img = keywordMap[mi].image;
                    break;
                  }
                }
              }
            }
          }

          // Assign image based on section type
          if (isSkipped) {
            img = null;
          } else if (isLongSection && ashImages.length) {
            img = ashImages[ashIdx % ashImages.length];
            ashIdx++;
          } else {
            img = aiImages[aiIdx % aiImages.length];
            aiIdx++;
          }

          if (img && img === lastImg) {
            var pool = img.indexOf('./ash/') === 0 ? ashImages : aiImages;
            var poolIdx = pool.indexOf(img);
            img = pool[(poolIdx + 1) % pool.length];
          }
          lastImg = img;

          // ponytail: replace ~10 random sections with user-uploaded images
          if (userImages.length && userReplaceSet[idx]) {
            img = userImages[idx % userImages.length];
          }

          // Add class for AI image visibility
          if (img && img.indexOf('./ash/') !== 0) {
            tribute.classList.add('ai-parallax');
          }

          tributeData.push({
            el: tribute,
            idx: idx,
            bg: img ? 'url(' + img + ')' : '',
            attachment: attachment,
            skipped: isSkipped
          });
        });

        // ponytail: apply all parallax backgrounds immediately (accordion groups
        // with overflow:hidden break IntersectionObserver lazy-loading)
        tributeData.forEach(function (d) {
          if (!d.skipped && d.bg && window.innerWidth >= 768) {
            d.el.style.backgroundImage = d.bg;
            d.el.style.backgroundAttachment = d.attachment;
            d.el.style.backgroundPosition = 'center';
            d.el.style.backgroundRepeat = 'no-repeat';
            d.el.style.backgroundSize = 'cover';
          }
          // Store data as attributes as well for accordion fallback
          if (d.bg) d.el.setAttribute('data-parallax-bg', d.bg);
          if (d.attachment) d.el.setAttribute('data-parallax-attachment', d.attachment);
        });

        // Observer still used for voice-controls UI + progress tracking
        var viewedKey = 'ash-viewed-' + location.pathname.replace(/[^a-z0-9]/gi, '_');
        if (tributeData.length > 0) { try { localStorage.setItem(viewedKey + '_count', tributeData.length); } catch (e) {} }
        if ('IntersectionObserver' in window) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var data = entry.target._parallaxData;
                if (data) {
                  // Mark section as viewed for progress tracking
                  try {
                    var v = JSON.parse(localStorage.getItem(viewedKey) || '[]');
                    if (v.indexOf(data.idx) === -1) { v.push(data.idx); localStorage.setItem(viewedKey, JSON.stringify(v)); }
                  } catch (e) { }
                  delete data.el._parallaxData;
                }
                if (window.FeatureFlags && !window.FeatureFlags.get('voice-recording')) continue;
                if (!entry.target.querySelector('.voice-controls')) {
                  var wrapper = document.createElement('div');
                  wrapper.className = 'voice-controls';
                  wrapper.style.cssText = 'position:absolute;bottom:16px;right:16px;z-index:10;display:flex;flex-direction:column;align-items:flex-end;gap:4px;';

                  var toast = function (m, bg, dur) {
                    var t = document.createElement('div');
                    t.textContent = m;
                    t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:' + (bg || 'rgba(0,0,0,0.85)') + ';color:#ffe680;padding:10px 24px;border-radius:8px;font-family:var(--font-body);font-size:0.9rem;z-index:99999;pointer-events:none;opacity:0;transition:opacity 0.4s;';
                    document.body.appendChild(t);
                    requestAnimationFrame(function () { t.style.opacity = '1'; });
                    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 500); }, dur || 2500);
                    return t;
                  };

                  var getSectionHeading = function (el) {
                    var p = el.parentNode;
                    while (p) {
                      var h = p.querySelector('h2, h3, h4');
                      if (h) return h.textContent;
                      p = p.parentElement;
                    }
                    return '';
                  };

                  // Row 1: text input + submit button
                  var row1 = document.createElement('div');
                  row1.style.cssText = 'display:flex;gap:4px;align-items:center;';
                  var ti = document.createElement('input');
                  ti.type = 'text';
                  ti.className = 'voice-text-input';
                  ti.placeholder = 'Write a review...';
                  ti.maxLength = 1000;
                  ti.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:var(--parchment);padding:6px 10px;border-radius:6px;font-family:inherit;font-size:0.75rem;width:140px;outline:none;box-sizing:border-box;';
                  var sb = document.createElement('button');
                  sb.textContent = 'Submit';
                  sb.className = 'voice-submit-btn';
                  sb.style.cssText = 'background:rgba(232,93,58,0.15);border:1px solid rgba(232,93,58,0.3);color:var(--parchment);padding:6px 10px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:0.7rem;transition:all 0.3s;white-space:nowrap;';
                  sb.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var textVal = ti.value.trim();
                    if (!textVal) { toast('Write a review first', 'rgba(180,40,40,0.9)', 2000); return; }
                    var review = { type: 'text', file: window.ASH_CONFIG.reviewFile, section: getSectionHeading(sb), sectionIdx: data.idx || 0, text: textVal, date: new Date().toISOString() };
                    FB.put('reviews', review).then(function () {
                      toast('\u2714\uFE0F Text review saved', 'rgba(40,180,40,0.9)', 2500);
                    }).catch(function () {
                      toast('Save failed', 'rgba(180,40,40,0.9)', 3000);
                    });
                    ti.value = '';
                  });
                  row1.appendChild(ti);
                  row1.appendChild(sb);

                  // Row 2: voice record/stop button
                  var vb = document.createElement('button');
                  vb.className = 'voice-note-btn';
                  vb.textContent = '\uD83C\uDF99\uFE0F';
                  vb.setAttribute('aria-label', 'Record voice note');
                  vb.title = 'Record a voice note';
                  vb.style.cssText = 'background:rgba(232,93,58,0.15);border:1px solid rgba(232,93,58,0.3);color:var(--parchment);width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s;';
                  vb.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var that = this;
                    if (window._recording) {
                      if (window._mediaRecorder && window._mediaRecorder.state === 'recording') window._mediaRecorder.stop();
                      return;
                    }
                    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert('Voice recording not supported.'); return; }
                    toast('Voice max: 120s recommended, 180s limit', 'rgba(0,0,0,0.85)', 3000);
                    window._recording = true;
                    window._mediaRecorder = null;
                    that.style.background = 'rgba(232,58,58,0.3)';
                    that.textContent = '\u23F9\uFE0F';
                    that.title = 'Stop recording';
                    var chunks = [];
                    var maxDuration = 120000;
                    var hardMax = 180000;
                    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
                      var mediaRecorder = new MediaRecorder(stream);
                      window._mediaRecorder = mediaRecorder;
                      mediaRecorder.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
                      var warnTimeout = setTimeout(function () {
                        if (mediaRecorder.state === 'recording') toast('Warning: 120s exceeded! Max 180s.', 'rgba(180,40,40,0.9)', 5000);
                      }, maxDuration);
                      var hardTimeout = setTimeout(function () {
                        if (mediaRecorder.state === 'recording') mediaRecorder.stop();
                      }, hardMax);
                      mediaRecorder.onstop = function () {
                        clearTimeout(warnTimeout); clearTimeout(hardTimeout);
                        var blob = new Blob(chunks, { type: 'audio/webm' });
                        var review = { type: 'audio', file: window.ASH_CONFIG.reviewFile, section: getSectionHeading(that), sectionIdx: data.idx || 0, audioBlob: blob, text: ti.value.trim(), date: new Date().toISOString() };
                        if (typeof FB !== 'undefined' && FB.put) {
                          FB.put('reviews', review).then(function () {
                            toast('\u2714\uFE0F Voice review saved', 'rgba(40,180,40,0.9)', 2500);
                          }).catch(function () {
                            toast('Save failed', 'rgba(180,40,40,0.9)', 3000);
                          });
                        } else {
                          toast('Save failed — offline', 'rgba(180,40,40,0.9)', 3000);
                        }
                        that.style.background = 'rgba(58,232,93,0.2)';
                        that.textContent = '\u2714\uFE0F';
                        setTimeout(function () {
                          that.style.background = 'rgba(232,93,58,0.15)';
                          that.textContent = '\uD83C\uDF99\uFE0F';
                          that.title = 'Record a voice note';
                        }, 3000);
                        window._recording = false;
                        window._mediaRecorder = null;
                        stream.getTracks().forEach(function (t) { t.stop(); });
                      };
                      mediaRecorder.start();
                    }).catch(function () {
                      that.style.background = 'rgba(232,93,58,0.15)';
                      that.textContent = '\uD83C\uDF99\uFE0F';
                      that.title = 'Record a voice note';
                      window._recording = false;
                      alert('Microphone access denied.');
                    });
                  });

                  wrapper.appendChild(row1);
                  wrapper.appendChild(vb);
                  entry.target.style.position = 'relative';
                  entry.target.appendChild(wrapper);
                }
                obs.unobserve(entry.target);
              }
            });
          }, { rootMargin: '200px' });
          tributeData.forEach(function (d) {
            d.el._parallaxData = d;
            // ponytail: store parallax data as attributes so accordion handler
            // can apply backgrounds even after observer has unobserved the element
            if (d.bg) d.el.setAttribute('data-parallax-bg', d.bg);
            if (d.attachment) d.el.setAttribute('data-parallax-attachment', d.attachment);
            safeObserve(obs, d.el);
          });
        } else {
          // Fallback: apply all immediately
          tributeData.forEach(function (d) {
            d.el.style.backgroundImage = d.bg;
            d.el.style.backgroundAttachment = d.attachment;
            d.el.style.backgroundPosition = 'center';
            d.el.style.backgroundRepeat = 'no-repeat';
            d.el.style.backgroundSize = 'cover';
          });
        }
      })();

      // --- Bookmarks / Favorites system ---
      // Register favToggle handler IMMEDIATELY (not deferred) so it works as soon as button appears
      (function initFavToggle() {
        if (window.FeatureFlags && !window.FeatureFlags.get('favorites')) return;
        var flowContainer = document.querySelector('.flow');
        var favToggle = document.getElementById('favToggle');

        function updateFavsView() {
          if (!flowContainer) return;
          var favCount = flowContainer.querySelectorAll('.tribute.is-favorite').length;
          if (favCount === 0) {
            flowContainer.classList.add('no-favorites-active');
          } else {
            flowContainer.classList.remove('no-favorites-active');
          }
        }

        // Expose globally so heart buttons can call it
        window._updateFavsView = updateFavsView;
        window._flowContainer = flowContainer;

        if (favToggle) {
          favToggle.addEventListener('click', function () {
            if (!flowContainer) return;
            var isFiltering = flowContainer.classList.toggle('filtering-favs');
            favToggle.classList.toggle('filtering', isFiltering);

            if (isFiltering) {
              updateFavsView();
              flowContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
              flowContainer.classList.remove('no-favorites-active');
            }
            if (navigator.vibrate) navigator.vibrate(50);
          });
        }

        // Inject empty-state placeholder
        if (flowContainer && !flowContainer.querySelector('.no-favs-msg')) {
          var noFavs = document.createElement('div');
          noFavs.className = 'no-favs-msg';
          noFavs.innerHTML = '<p>No favorites saved yet. Tap the \u2764\uFE0F on your favourite sections to save them here.</p>';
          flowContainer.appendChild(noFavs);
        }
      })();

      // --- Inject heart buttons into every section ---
      // Deferred so content-visibility:auto subtrees are rendered
      function initHeartButtons() {
        if (window.FeatureFlags && !window.FeatureFlags.get('favorites')) return;
        var tributes = document.querySelectorAll('.tribute');
        var favorites = [];
        try { favorites = JSON.parse(localStorage.getItem('ash-favorites') || '[]'); } catch (e) { favorites = []; }

        // Migrate old text-based keys (one-time cleanup)
        if (favorites.length > 0 && typeof favorites[0] === 'string' && !favorites[0].match(/^ash-sec-\d+$/)) {
          localStorage.removeItem('ash-favorites');
          favorites = [];
        }

        tributes.forEach(function (tribute, idx) {
          // Skip if heart already injected
          if (tribute.querySelector('.fav-btn')) return;

          var lead = tribute.querySelector('.tribute-lead');
          if (!lead) return;

          var sectionKey = 'ash-sec-' + idx;
          tribute.dataset.sectionId = sectionKey;

          var heartBtn = document.createElement('button');
          heartBtn.type = 'button';
          heartBtn.className = 'fav-btn';
          heartBtn.setAttribute('aria-label', 'Favorite this section');
          heartBtn.setAttribute('data-sec', sectionKey);

          if (favorites.indexOf(sectionKey) !== -1) {
            tribute.classList.add('is-favorite');
            heartBtn.classList.add('active');
            heartBtn.textContent = '\u2764'; // Solid heart ❤
          } else {
            heartBtn.textContent = '\u2661'; // Hollow heart ♡
          }

          lead.appendChild(heartBtn);
        });

        // Event delegation on .flow — one listener for ALL fav-btn clicks (robust, no closure issues)
        var flowDelegation = document.querySelector('.flow');
        if (flowDelegation) {
          flowDelegation.addEventListener('click', function (e) {
            var btn = e.target.closest('.fav-btn');
            if (!btn) return;
            e.stopPropagation();
            e.preventDefault();

            try {
              var secKey = btn.getAttribute('data-sec');
              var parentTribute = btn.closest('.tribute');
              if (!parentTribute || !secKey) return;

              var favs = [];
              try { favs = JSON.parse(localStorage.getItem('ash-favorites') || '[]'); } catch (ex) { favs = []; }
              var isFav = favs.indexOf(secKey) !== -1;

              if (isFav) {
                favs = favs.filter(function (id) { return id !== secKey; });
                parentTribute.classList.remove('is-favorite');
                btn.classList.remove('active');
                btn.textContent = '\u2661';
              } else {
                favs.push(secKey);
                parentTribute.classList.add('is-favorite');
                btn.classList.add('active');
                btn.textContent = '\u2764';
                btn.style.animation = 'none';
                btn.offsetHeight;
                btn.style.animation = '';
                if (navigator.vibrate) navigator.vibrate(30);
              }
              localStorage.setItem('ash-favorites', JSON.stringify(favs));

              var favBtn = document.getElementById('favToggle');
              if (favBtn) favBtn.style.display = favs.length > 0 ? '' : 'none';

              if (window._flowContainer && window._flowContainer.classList.contains('filtering-favs')) {
                window._updateFavsView();
              }
            } catch (ex) { console.error('Fav click error:', ex); }
          });
        }
      }

      // Run IMMEDIATELY — no deferral, content-visibility is removed so all DOM is accessible
      initHeartButtons();
    } catch (e) { console.error('UX controller error:', e); }
  })();

  // Show favToggle if favorites exist
  (function initFavToggleVisibility() {
    if (window.FeatureFlags && !window.FeatureFlags.get('favorites')) return;
    var btn = document.getElementById('favToggle');
    if (!btn) return;
    try {
      var favs = JSON.parse(localStorage.getItem('ash-favorites') || '[]');
      if (favs.length > 0) btn.style.display = '';
    } catch (e) {}
  })();

  // Show Turn Yourself On button if Fantasies section viewed
  (function initEasterEggVisibility() {
    if (window.FeatureFlags && !window.FeatureFlags.get('easter-egg-btn')) return;
    var btn = document.getElementById('easterEggBtn');
    if (!btn) return;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('ash-viewed-') === 0 && k.indexOf('fantasies') !== -1) {
          btn.style.display = '';
          return;
        }
      }
    } catch (e) {}
  })();

  // Mood filtering
  (function () {
    var bar = document.querySelector('.mood-filter-bar');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.mood-btn');
      if (!btn) return;
      bar.querySelectorAll('.mood-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var mood = btn.getAttribute('data-mood');
      if (mood === 'all') {
        document.body.classList.remove('filtering-mood');
        document.querySelectorAll('.tribute').forEach(function (t) { t.classList.remove('mood-match'); });
      } else {
        document.body.classList.add('filtering-mood');
        document.querySelectorAll('.tribute').forEach(function (t) {
          var m = t.getAttribute('data-mood');
          t.classList.toggle('mood-match', m && m.split(' ').indexOf(mood) !== -1);
        });
      }
    });
    // Tag each tribute with a mood based on its content
    document.querySelectorAll('.tribute').forEach(function (t) {
      var text = (t.textContent || '').toLowerCase();
      var span = t.querySelector('.tribute-lead span:last-child');
      var title = span ? span.textContent.toLowerCase() : '';
      var moodTags = [];
      if (title.indexOf('kiss') !== -1 || title.indexOf('hug') !== -1 || title.indexOf('cuddle') !== -1 || title.indexOf('hold') !== -1 || text.indexOf('soft') !== -1 || text.indexOf('warm') !== -1 || text.indexOf('gentle') !== -1 || text.indexOf('tender') !== -1 || text.indexOf('adore') !== -1 || text.indexOf('cherish') !== -1) moodTags.push('romantic');
      if (title.indexOf('laugh') !== -1 || title.indexOf('smile') !== -1 || title.indexOf('play') !== -1 || title.indexOf('tease') !== -1 || title.indexOf('banter') !== -1 || title.indexOf('silly') !== -1 || text.indexOf('funny') !== -1 || text.indexOf('giggle') !== -1 || text.indexOf('fun') !== -1 || text.indexOf('joke') !== -1 || text.indexOf('humor') !== -1) moodTags.push('playful');
      if (title.indexOf('breast') !== -1 || title.indexOf('nipple') !== -1 || title.indexOf('vagina') !== -1 || title.indexOf('clitor') !== -1 || title.indexOf('wet') !== -1 || title.indexOf('moan') !== -1 || title.indexOf('arous') !== -1 || title.indexOf('penetrat') !== -1 || title.indexOf('touch') !== -1 || title.indexOf('skin') !== -1 || title.indexOf('body') !== -1 || text.indexOf('naked') !== -1 || text.indexOf('undress') !== -1 || text.indexOf('foreplay') !== -1 || text.indexOf('sext') !== -1 || text.indexOf('caress') !== -1 || text.indexOf('desire') !== -1 || text.indexOf('passion') !== -1) moodTags.push('intimate');
      if (title.indexOf('thank') !== -1 || title.indexOf('grateful') !== -1 || title.indexOf('bless') !== -1 || text.indexOf('grateful') !== -1 || text.indexOf('thankful') !== -1 || text.indexOf('blessed') !== -1 || text.indexOf('gratitude') !== -1 || text.indexOf('appreciate') !== -1 || text.indexOf('lucky') !== -1) moodTags.push('grateful');
      if (title.indexOf('miss') !== -1 || title.indexOf('wish') !== -1 || title.indexOf('dream') !== -1 || title.indexOf('imagin') !== -1 || title.indexOf('can\'t wait') !== -1 || title.indexOf('future') !== -1 || text.indexOf('miss') !== -1 || text.indexOf('wait') !== -1 || text.indexOf('someday') !== -1 || text.indexOf('yearn') !== -1 || text.indexOf('crave') !== -1 || text.indexOf('ache') !== -1) moodTags.push('longing');
      // Default to romantic
      if (moodTags.length === 0) moodTags.push('romantic');
      t.setAttribute('data-mood', moodTags.join(' '));
    });
  })();

  // Love Letter Generator
  (function () {
    if (window.FeatureFlags && !window.FeatureFlags.get('love-letter-gen')) return;
    var btn = document.createElement('button');
    btn.textContent = 'Write me a letter';
    btn.style.cssText = 'position:fixed;bottom:403px;right:25px;z-index:100;background:rgba(232,93,58,0.15);border:1px solid rgba(232,93,58,0.35);color:var(--parchment);padding:10px 18px;border-radius:24px;cursor:pointer;font-family:var(--font-display);font-size:0.85rem;transition:all 0.3s;backdrop-filter:blur(6px);';
    btn.addEventListener('mouseenter', function () { this.style.background = 'rgba(232,93,58,0.3)'; });
    btn.addEventListener('mouseleave', function () { this.style.background = 'rgba(232,93,58,0.15)'; });
    btn.addEventListener('click', function () {
      var sections = document.querySelectorAll('.tribute');
      if (sections.length < 5) return;
      var picks = [], used = new Set();
      while (picks.length < 5) {
        var idx = Math.floor(Math.random() * sections.length);
        if (!used.has(idx)) { used.add(idx); picks.push(sections[idx]); }
      }
      var html = '<div style="position:fixed;inset:0;z-index:9999;background:rgba(15,10,8,0.97);overflow-y:auto;padding:3rem 1.5rem;"><button onclick="this.parentElement.remove()" style="position:fixed;top:16px;right:20px;z-index:10000;background:transparent;border:1px solid rgba(255,255,255,0.15);color:var(--parchment);font-size:1.5rem;width:44px;height:44px;border-radius:50%;cursor:pointer;">\u2716</button><div style="max-width:640px;margin:0 auto;font-family:var(--font-display);">';
      html += '<h1 style="font-size:2rem;margin-bottom:0.5rem;font-weight:400;">a letter for you</h1>';
      html += '<p style="color:var(--parchment-dim);margin-bottom:3rem;font-style:italic;">picked from ' + document.title + '</p>';
      picks.forEach(function (s, i) {
        var title = s.querySelector('.tribute-lead');
        var body = s.querySelector('.tribute-body');
        html += '<div style="margin-bottom:2.5rem;padding:1.5rem;border-left:2px solid rgba(232,93,58,0.3);">';
        if (title) html += title.outerHTML;
        if (body) html += body.outerHTML;
        html += '</div>';
      });
      html += '</div></div>';
      var div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstChild);
    });
    document.body.appendChild(btn);
  })();



  // Wallpaper Download
  (function () {
    var btn = document.createElement('button');
    btn.textContent = '\uD83D\uDCF7 Wallpaper';
    btn.style.cssText = 'position:fixed;bottom:459px;right:25px;z-index:100;background:rgba(100,200,255,0.1);border:1px solid rgba(100,200,255,0.2);color:var(--parchment);padding:10px 18px;border-radius:24px;cursor:pointer;font-family:var(--font-display);font-size:0.85rem;transition:all 0.3s;backdrop-filter:blur(6px);';
    btn.addEventListener('mouseenter', function () { this.style.background = 'rgba(100,200,255,0.2)'; });
    btn.addEventListener('mouseleave', function () { this.style.background = 'rgba(100,200,255,0.1)'; });
    btn.addEventListener('click', function () {
      var tributes = document.querySelectorAll('.tribute');
      if (!tributes.length) return;
      var pick = tributes[Math.floor(Math.random() * tributes.length)];
      var body = pick.querySelector('.tribute-body');
      var quote = body ? body.textContent.trim() : 'for eeshah';
      var titleEl = pick.querySelector('.tribute-lead');
      var label = titleEl ? titleEl.textContent.trim() : '';

      var ashFiles = ['ash1.jpeg', 'ash2.jpeg', 'ash3.jpeg', 'ash4.jpeg', 'ash5.jpeg', 'ash6.jpeg', 'ash7.jpeg', 'ash8.jpeg', 'ash9.jpeg', 'ash10.jpeg', 'ash11.jpeg', 'ash.jpeg', 'ash_childhood.jpeg', 'ash_childhood1.jpeg', 'ash_childhood2.jpeg', 'ash_childhood3.jpeg'];
      var imgPath = './ash/' + ashFiles[Math.floor(Math.random() * ashFiles.length)];

      var canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      var ctx = canvas.getContext('2d');

      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        var x = (canvas.width - img.width * scale) / 2;
        var y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        var overlay = ctx.createLinearGradient(0, canvas.height * 0.35, 0, canvas.height);
        overlay.addColorStop(0, 'rgba(15,10,8,0.2)');
        overlay.addColorStop(0.5, 'rgba(15,10,8,0.7)');
        overlay.addColorStop(1, 'rgba(15,10,8,0.95)');
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(232,93,58,0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.15, canvas.height * 0.76);
        ctx.lineTo(canvas.width * 0.85, canvas.height * 0.76);
        ctx.stroke();

        ctx.fillStyle = '#ffebd2';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = '32px Georgia, serif';
        ctx.fillText(label || 'for eeshah', canvas.width / 2, canvas.height * 0.12);

        ctx.font = '48px Georgia, serif';
        var maxWidth = canvas.width * 0.78;
        var words = quote.split(' ');
        var lines = [];
        var line = '';
        for (var i = 0; i < words.length; i++) {
          var test = line + words[i] + ' ';
          if (ctx.measureText(test).width > maxWidth) {
            lines.push(line.trim());
            line = words[i] + ' ';
            if (lines.length >= 7) break;
          } else {
            line = test;
          }
        }
        if (line.trim() && lines.length < 7) lines.push(line.trim());

        var lineHeight = 68;
        var startY = canvas.height * 0.48 - (lines.length * lineHeight) / 2;
        for (var j = 0; j < lines.length; j++) {
          ctx.fillText(lines[j], canvas.width / 2, startY + j * lineHeight);
        }

        ctx.font = '44px serif';
        ctx.fillText('\u2661', canvas.width / 2, canvas.height * 0.88);

        var link = document.createElement('a');
        link.download = 'ash-wallpaper.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.onerror = function () {
        var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#2a1f18');
        grad.addColorStop(1, '#0f0a08');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffebd2';
        ctx.font = '36px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('for eeshah', canvas.width / 2, canvas.height / 2);
        var link = document.createElement('a');
        link.download = 'ash-wallpaper.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = imgPath;
    });
    document.body.appendChild(btn);
  })();

  /*======= ACCESSIBILITY =======*/
  (function () {
    try {
      document.querySelectorAll('.hearts, .petals, .firefly, .cursorLight, .aurora, .vignette').forEach(function (el) {
        if (!el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
      });
    } catch (e) { logError('ACCESSIBILITY', e); }
  })();

  /*======= LOADER-WAIT HELPER =======*/
  // Resolves when .loader is gone (or after maxWait ms). Pages with loaders
  // use this to delay companion init until the loading screen finishes.
  window.whenLoaderDone = function (maxWait) {
    maxWait = maxWait || 14000;
    return new Promise(function (resolve) {
      var loader = document.querySelector('.loader');
      if (!loader) { resolve(); return; }
      var done = false;
      var finish = function () { if (!done) { done = true; resolve(); } };
      // watch for loader removal
      var obs = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          for (var j = 0; j < mutations[i].removedNodes.length; j++) {
            if (mutations[i].removedNodes[j] === loader) { obs.disconnect(); finish(); return; }
          }
        }
      });
      obs.observe(loader.parentNode || document.body, { childList: true });
      // also watch opacity/visibility reaching hidden
      var check = setInterval(function () {
        var s = getComputedStyle(loader);
        if (s.opacity === '0' || s.visibility === 'hidden' || s.display === 'none') {
          clearInterval(check); obs.disconnect(); finish();
        }
      }, 200);
      // safety timeout
      setTimeout(function () { clearInterval(check); obs.disconnect(); finish(); }, maxWait);
    });
  };

  // Periodic visibility checks for dynamic reveals
  setInterval(function () {
    try {
      var fBtn = document.getElementById('favToggle');
      if (fBtn && fBtn.style.display === 'none') {
        var f = JSON.parse(localStorage.getItem('ash-favorites') || '[]');
        if (f.length > 0) fBtn.style.display = '';
      }
      if (!window.FeatureFlags || window.FeatureFlags.get('easter-egg-btn')) {
        var eBtn = document.getElementById('easterEggBtn');
        if (eBtn && eBtn.style.display === 'none') {
          for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            if (k && k.indexOf('ash-viewed-') === 0 && k.indexOf('fantasies') !== -1) {
              eBtn.style.display = '';
              break;
            }
          }
        }
      }
    } catch (e) {}
  }, 3000);

})();
