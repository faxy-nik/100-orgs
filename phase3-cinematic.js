/* ===================================================================
   PHASE 3 — Cinematic Finale & Polish
   ===================================================================
   Load order: must load LAST (after all other scripts).
   Integrates with:
     window.Skies, window.SkyLiving, window.WishSystem
     DOM audio volume, meta theme-color, progress tracking
   =================================================================== */
(function () {
  'use strict';

  var VERSION = '1.0.0';

  /* ===================== CONFIG ===================== */
  var PROGRESS_POLL_INTERVAL = 15000;
  var FINALE_SKY_INDEX = 99;  // "Infinite Love" — the last sky
  var THEME_COLOR_META = null;
  var isFinalePlaying = false;
  var finalePlayedThisSession = false;
  var progressPages = [
    { key: '100-organs', file: '100-organs.html', label: '100 Organs' },
    { key: 'love', file: 'love.html', label: 'Love' },
    { key: 'fantasies', file: 'fantasies.html', label: 'Fantasies' }
  ];

  /* ===================== DOM HELPERS ===================== */
  function qs(s, root) { return (root || document).querySelector(s); }
  function qsa(s, root) { return (root || document).querySelectorAll(s); }

  /* ===================== CANVAS OVERLAY ===================== */
  var overlayCanvas = null;
  var overlayCtx = null;
  var CW = 0, CH = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var animRunning = false;
  var animLastT = 0;
  var currentSkyIndex = -1;
  var currentSkyConfig = null;

  function ensureCanvas() {
    if (overlayCanvas) return;
    overlayCanvas = document.createElement('canvas');
    overlayCanvas.id = 'phase3Canvas';
    overlayCanvas.style.cssText = 'position:fixed;inset:0;z-index:2;pointer-events:none;background:transparent;';
    document.body.appendChild(overlayCanvas);
    overlayCtx = overlayCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', function () {
      clearTimeout(resizeCanvas._timer);
      resizeCanvas._timer = setTimeout(resizeCanvas, 150);
    }, { passive: true });
  }

  function resizeCanvas() {
    if (!overlayCanvas) return;
    CW = window.innerWidth;
    CH = window.innerHeight;
    overlayCanvas.width = Math.round(CW * dpr);
    overlayCanvas.height = Math.round(CH * dpr);
    overlayCanvas.style.width = CW + 'px';
    overlayCanvas.style.height = CH + 'px';
    overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ===================== DYNAMIC BROWSER THEME ===================== */
  function initThemeColor() {
    THEME_COLOR_META = qs('meta[name="theme-color"]');
    if (!THEME_COLOR_META) {
      THEME_COLOR_META = document.createElement('meta');
      THEME_COLOR_META.name = 'theme-color';
      document.head.appendChild(THEME_COLOR_META);
    }
    var style = document.createElement('style');
    style.textContent = 'meta[name="theme-color"]{transition:background-color 0.8s ease;}';
    document.head.appendChild(style);
  }

  function updateThemeColor(sky) {
    if (!THEME_COLOR_META || !sky) return;
    var stops = sky.gradient;
    if (!stops || !stops.length) return;
    var mid = stops[Math.floor(stops.length / 2)];
    var color = mid ? mid[1] : '#181214';
    THEME_COLOR_META.content = color;
  }

  /* ===================== LENS FLARE ===================== */
  function drawLensFlare(ctx, t) {
    if (!currentSkyConfig) return;
    var lights = currentSkyConfig.lights;
    if (!lights || !lights.length) return;
    for (var li = 0; li < lights.length; li++) {
      var l = lights[li];
      if (!l) continue;
      var isBright = l.rays || l.r > 25 || !l.eclipse;
      if (!isBright) continue;
      var cx = l.x * CW, cy = l.y * CH;
      if (cy > CH * 0.7) continue;
      var intensity = Math.min(1, l.r / 60 + 0.2);
      var lightAngle = Math.atan2(CH / 2 - cy, CW / 2 - cx);
      drawGhostArtifacts(ctx, cx, cy, intensity, lightAngle, t);
      drawChromaticAberration(ctx, cx, cy, l.r, intensity, t);
      drawAnamorphicStreak(ctx, cx, cy, intensity, lightAngle);
      drawDiffractionSpikes(ctx, cx, cy, intensity, t);
      drawDustMotes(ctx, cx, cy, intensity, t);
    }
  }

  function drawGhostArtifacts(ctx, cx, cy, intensity, angle, t) {
    var ghostCount = 4;
    for (var i = 0; i < ghostCount; i++) {
      var dist = (i + 1) * 40 + Math.sin(t * 0.5 + i) * 8;
      var gx = cx - Math.cos(angle) * dist;
      var gy = cy - Math.sin(angle) * dist;
      if (gx < 0 || gx > CW || gy < 0 || gy > CH) continue;
      var r = 8 + i * 5;
      var alpha = 0.03 * intensity / (i + 1);
      var hueShift = i * 30;
      var color = 'hsla(' + ((angle * 180 / Math.PI + hueShift) % 360) + ', 80%, 60%, ' + alpha + ')';
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(gx, gy, r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  function drawChromaticAberration(ctx, cx, cy, r, intensity, t) {
    var pulse = 0.8 + 0.2 * Math.sin(t * 2);
    var ringR = r * 1.4 * pulse;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,50,50,' + (0.04 * intensity) + ')';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 2, cy, ringR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50,255,50,' + (0.03 * intensity) + ')';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 2, cy, ringR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50,50,255,' + (0.03 * intensity) + ')';
    ctx.stroke();
    ctx.restore();
  }

  function drawAnamorphicStreak(ctx, cx, cy, intensity, angle) {
    var len = 200 + intensity * 150;
    var a = angle + Math.PI / 2;
    var dx = Math.cos(a) * len / 2;
    var dy = Math.sin(a) * len / 2;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    g.addColorStop(0, 'rgba(255,255,200,0)');
    g.addColorStop(0.4, 'rgba(255,255,200,' + (0.035 * intensity) + ')');
    g.addColorStop(0.5, 'rgba(255,255,200,' + (0.05 * intensity) + ')');
    g.addColorStop(0.6, 'rgba(255,255,200,' + (0.035 * intensity) + ')');
    g.addColorStop(1, 'rgba(255,255,200,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - dx, cy - dy - 1, len, 3);
    ctx.restore();
  }

  function drawDiffractionSpikes(ctx, cx, cy, intensity, t) {
    var spikeCount = 4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < spikeCount; i++) {
      var a = (i / spikeCount) * Math.PI + t * 0.1;
      var len = 60 + 40 * intensity + 20 * Math.sin(t * 1.5 + i);
      var dx = Math.cos(a) * len;
      var dy = Math.sin(a) * len;
      var g = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
      g.addColorStop(0, 'rgba(255,255,255,' + (0.06 * intensity) + ')');
      g.addColorStop(0.5, 'rgba(255,255,255,' + (0.12 * intensity) + ')');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - dx * 0.3, cy - dy * 0.3);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDustMotes(ctx, cx, cy, intensity, t) {
    var count = 6;
    for (var i = 0; i < count; i++) {
      var angle = (i / count) * Math.PI * 2 + t * 0.05;
      var dist = 30 + 50 * Math.sin(t * 0.3 + i * 1.7) + 30;
      var mx = cx + Math.cos(angle) * dist;
      var my = cy + Math.sin(angle) * dist;
      if (mx < 0 || mx > CW || my < 0 || my > CH) continue;
      var size = 2 + Math.sin(t * 2 + i) * 1;
      ctx.save();
      ctx.globalAlpha = 0.04 * intensity * (0.5 + 0.5 * Math.sin(t + i));
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(mx, my, size, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  /* ===================== AURORA REFLECTION ===================== */
  function drawAuroraReflection(ctx, t) {
    if (!currentSkyConfig) return;
    var aurora = currentSkyConfig.aurora;
    if (!aurora || !aurora.colors || !aurora.colors.length) return;
    var colors = aurora.colors;
    var reflectY = CH * 0.78;
    var reflectHeight = CH * 0.22;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.35;
    for (var b = 0; b < colors.length; b++) {
      ctx.beginPath();
      var step = Math.max(8, CW / 50);
      var startX = -5;
      for (var x = startX; x <= CW + 5; x += step) {
        var waveY = reflectY + Math.sin(x * 0.02 + t * 0.8 + b) * 6;
        waveY += Math.sin(x * 0.01 + t * 0.4) * 10;
        waveY += (NoiseGen(x * 0.005 + t * 0.1, t * 0.05) - 0.5) * 12;
        var y = waveY + (b * reflectHeight / colors.length);
        if (x === startX) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      for (var x2 = CW + 5; x2 >= startX; x2 -= step) {
        var waveY2 = reflectY + Math.sin(x2 * 0.02 + t * 0.8 + b) * 6;
        waveY2 += Math.sin(x2 * 0.01 + t * 0.4) * 10;
        waveY2 += (NoiseGen(x2 * 0.005 + t * 0.1, t * 0.05) - 0.5) * 12;
        var y2 = Math.min(CH, reflectY + reflectHeight) + (b * reflectHeight / colors.length);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      var g = ctx.createLinearGradient(0, reflectY, 0, Math.min(CH, reflectY + reflectHeight));
      g.addColorStop(0, colors[b]);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.restore();
  }

  var NoiseGen = (function () {
    var perm = new Uint8Array(512);
    (function seed() {
      var p = new Uint8Array(256);
      for (var i = 0; i < 256; i++) p[i] = i;
      for (var i = 255; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = p[i]; p[i] = p[j]; p[j] = t;
      }
      for (var i = 0; i < 512; i++) perm[i] = p[i & 255];
    })();
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function grad(hash, x, y) {
      var h = hash & 7, u = h < 4 ? x : y, v = h < 4 ? y : x;
      return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
    }
    return function Noise2(x, y) {
      var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      var u = fade(x), v = fade(y);
      var aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
      var ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
      var x1 = lerp(grad(aa, x, y), grad(ba, x - 1, y), u);
      var x2 = lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u);
      return (lerp(x1, x2, v) + 1) / 2;
    };
  })();

  /* ===================== GRAND FINALE ===================== */
  var finaleSteps = [];
  var finaleStepIndex = 0;
  var finaleOverlay = null;
  var finaleMessageEl = null;
  var finaleVignette = null;
  var finaleResolve = null;
  var finaleStarBrightness = 0;
  var finaleGlowIntensity = 0;

  function monitorProgress() {
    var total = 0, viewed = 0;
    var loaded = 0;
    function check() {
      total = 0; viewed = 0; loaded = 0;
      progressPages.forEach(function (p) {
        var vk = 'ash-viewed-' + p.file.replace(/[^a-z0-9]/gi, '_');
        var lk = vk + '_count';
        try {
          var v = JSON.parse(localStorage.getItem(vk) || '[]');
          var count = parseInt(localStorage.getItem(lk) || '0');
          total += count;
          viewed += v.length;
        } catch (e) {}
        if (typeof FB !== 'undefined' && FB.get) {
          FB.get('viewed', p.key).then(function (d) {
            if (d && d.data) {
              if (d.data.entries && Array.isArray(d.data.entries)) viewed += d.data.entries.length;
              if (d.data.count) total += parseInt(d.data.count);
            }
            loaded++;
            if (loaded === progressPages.length) evaluate();
          }).catch(function () {
            loaded++;
            if (loaded === progressPages.length) evaluate();
          });
        } else {
          loaded++;
          if (loaded === progressPages.length) evaluate();
        }
      });
    }
    function evaluate() {
      var pct = total > 0 ? Math.min(100, Math.round(viewed / total * 100)) : 0;
      if (pct >= 100 && !isFinalePlaying && !finalePlayedThisSession) {
        triggerFinale();
      }
    }
    if (typeof FB !== 'undefined' && FB.init) {
      try { FB.init(); } catch (e) {}
      setTimeout(check, 2000);
    } else {
      check();
    }
    setInterval(check, PROGRESS_POLL_INTERVAL);
  }

  function triggerFinale() {
    if (isFinalePlaying || finalePlayedThisSession) return;
    isFinalePlaying = true;
    finalePlayedThisSession = true;
    try { localStorage.setItem('ash-finale-played', 'true'); } catch (e) {}

    ensureCanvas();
    startAnimLoop();
    createFinaleOverlay();
    buildFinaleSequence();
    runFinaleSequence();
  }

  function createFinaleOverlay() {
    finaleOverlay = document.createElement('div');
    finaleOverlay.id = 'finaleOverlay';
    finaleOverlay.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;';

    finaleVignette = document.createElement('div');
    finaleVignette.style.cssText = 'position:absolute;inset:0;box-shadow:inset 0 0 200px rgba(0,0,0,0.8);transition:box-shadow 4s ease;';
    finaleOverlay.appendChild(finaleVignette);

    document.body.appendChild(finaleOverlay);
  }

  function buildFinaleSequence() {
    finaleSteps = [];

    // Step 0: Soften music
    finaleSteps.push(function (done) {
      var slider = qs('.volume-slider');
      if (slider) {
        var currentVol = parseFloat(slider.value) / 100;
        var targetVol = Math.min(currentVol, 0.2);
        smoothVolume(slider, currentVol, targetVol, 3000, done);
      } else {
        setTimeout(done, 500);
      }
    });

    // Step 1: Transition to final sky
    finaleSteps.push(function (done) {
      if (currentSkyIndex !== FINALE_SKY_INDEX) {
        window.Skies.apply(FINALE_SKY_INDEX);
        setTimeout(done, 2500);
      } else {
        setTimeout(done, 500);
      }
    });

    // Step 2: Stars brighten — draw on overlay canvas
    finaleSteps.push(function (done) {
      finaleStarBrightness = 0;
      var startT = performance.now();
      function fadeStars() {
        var elapsed = performance.now() - startT;
        finaleStarBrightness = Math.min(1, elapsed / 5000);
        if (finaleStarBrightness >= 1) { done(); return; }
        requestAnimationFrame(fadeStars);
      }
      requestAnimationFrame(fadeStars);
    });

    // Step 3: Camera zoom out (vignette expands)
    var zoomActive = false;
    var zoomProgress = 0;

    finaleSteps.push(function (done) {
      zoomActive = true;
      zoomProgress = 0;
      var startT = performance.now();
      function zoomStep() {
        if (!zoomActive) return;
        var elapsed = performance.now() - startT;
        zoomProgress = Math.min(1, elapsed / 8000);
        var vignetteIntensity = 100 + zoomProgress * 250;
        if (finaleVignette) {
          finaleVignette.style.boxShadow = 'inset 0 0 ' + vignetteIntensity + 'px rgba(0,0,0,0.8)';
        }
        if (zoomProgress >= 1) { done(); return; }
        requestAnimationFrame(zoomStep);
      }
      requestAnimationFrame(zoomStep);
    });

    // Step 4: Lanterns rise
    finaleSteps.push(function (done) {
      var lanternCount = 20;
      var spawned = 0;
      var alreadyDone = false;
      function onDone() { if (!alreadyDone) { alreadyDone = true; done(); } }
      for (var li = 0; li < lanternCount; li++) {
        (function (delay) {
          setTimeout(function () {
            spawnFinaleLantern();
            spawned++;
            if (spawned >= lanternCount) onDone();
          }, delay);
        })(li * 300);
      }
    });

    // Step 5: Constellations glow — draw on canvas
    finaleSteps.push(function (done) {
      finaleGlowIntensity = 0;
      var startT = performance.now();
      function glowStep() {
        var elapsed = performance.now() - startT;
        finaleGlowIntensity = Math.min(1, elapsed / 4000);
        if (finaleGlowIntensity >= 1) { done(); return; }
        requestAnimationFrame(glowStep);
      }
      requestAnimationFrame(glowStep);
    });

    // Step 6: Particles calm (let the existing systems settle)
    finaleSteps.push(function (done) {
      setTimeout(done, 3000);
    });

    // Step 7: Display final message
    finaleSteps.push(function (done) {
      finaleMessageEl = document.createElement('div');
      finaleMessageEl.id = 'finaleMessage';
      finaleMessageEl.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:100000;text-align:center;opacity:0;transition:opacity 3s ease;';
      finaleMessageEl.innerHTML =
        '<div style="font-family:Fraunces,Georgia,serif;color:#ffe680;font-size:clamp(1.5rem,4vw,3rem);font-weight:600;text-shadow:0 0 40px rgba(255,230,128,.3);">Thank you for reading</div>' +
        '<div style="font-family:Lora,Georgia,serif;color:#ffebd2;font-size:clamp(0.9rem,2vw,1.2rem);margin-top:1rem;font-style:italic;opacity:0.8;">Every word was written for you</div>' +
        '<div style="font-family:Lora,Georgia,serif;color:#aa9a7a;font-size:clamp(0.75rem,1.5vw,0.9rem);margin-top:0.5rem;">&#x2661; for eeshah &mdash; always &#x2661;</div>';
      document.body.appendChild(finaleMessageEl);
      requestAnimationFrame(function () {
        finaleMessageEl.style.opacity = '1';
      });
      setTimeout(done, 5000);
    });

    // Step 8: Offer Memory Replay
    finaleSteps.push(function (done) {
      if (finaleMessageEl) {
        var btn = document.createElement('div');
        btn.style.cssText = 'margin-top:1.5rem;opacity:0;transition:opacity 1s ease;';
        btn.innerHTML = '<span style="cursor:pointer;display:inline-block;padding:0.6rem 1.5rem;border:1px solid rgba(255,210,150,.35);border-radius:8px;font-family:Fraunces,Georgia,serif;color:#ffe680;font-size:0.85rem;transition:all 0.3s;" onmouseover="this.style.borderColor=\'#ffe680\';this.style.boxShadow=\'0 0 20px rgba(255,230,128,.15)\'" onmouseout="this.style.borderColor=\'rgba(255,210,150,.35)\';this.style.boxShadow=\'none\'">&#x1F3AC; Replay Your Journey</span>';
        btn.addEventListener('click', function () {
          openMemoryReplay();
        });
        finaleMessageEl.appendChild(btn);
        requestAnimationFrame(function () { btn.style.opacity = '1'; });
      }
      setTimeout(done, 2000);
    });
  }

  function smoothVolume(slider, from, to, duration, done) {
    var startT = performance.now();
    function step() {
      var elapsed = performance.now() - startT;
      var p = Math.min(1, elapsed / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = from + (to - from) * eased;
      slider.value = val * 100;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      if (p >= 1) { if (done) done(); return; }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function spawnFinaleLantern() {
    var el = document.createElement('div');
    el.textContent = '\uD83C\uDFEE';
    el.style.cssText = 'position:fixed;left:' + (10 + Math.random() * 80) + 'vw;bottom:-40px;font-size:' + (16 + Math.random() * 14) + 'px;z-index:99998;pointer-events:none;opacity:0.7;transition:none;filter:drop-shadow(0 0 6px rgba(255,200,100,0.3));';
    document.body.appendChild(el);
    var duration = 8000 + Math.random() * 6000;
    var targetY = -(20 + Math.random() * 40);
    var drift = (Math.random() - 0.5) * 60;
    requestAnimationFrame(function () {
      el.style.transition = 'transform ' + duration + 'ms linear, opacity ' + (duration * 0.5) + 'ms ease';
      el.style.transform = 'translateY(' + targetY + 'vh) translateX(' + drift + 'px)';
      el.style.opacity = '0';
    });
    setTimeout(function () { if (el.parentNode) el.remove(); }, duration + 200);
  }

  function runFinaleSequence() {
    finaleStepIndex = 0;
    executeNextFinaleStep();
  }

  function executeNextFinaleStep() {
    if (finaleStepIndex >= finaleSteps.length) {
      isFinalePlaying = false;
      stopAnimLoop();
      return;
    }
    var step = finaleSteps[finaleStepIndex];
    finaleStepIndex++;
    step(function () {
      setTimeout(executeNextFinaleStep, 300);
    });
  }

  /* ===================== MEMORY REPLAY ===================== */
  function openMemoryReplay() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,10,26,0.97);overflow-y:auto;overflow-x:hidden;';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '\u2716';
    closeBtn.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:100000;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#ffebd2;font-size:1.2rem;width:40px;height:40px;border-radius:50%;cursor:pointer;transition:all 0.3s;';
    closeBtn.addEventListener('mouseenter', function () { this.style.borderColor = '#ffe680'; this.style.color = '#ffe680'; });
    closeBtn.addEventListener('mouseleave', function () { this.style.borderColor = 'rgba(255,255,255,0.12)'; this.style.color = '#ffebd2'; });
    closeBtn.addEventListener('click', function () { overlay.remove(); document.body.style.overflow = ''; });
    overlay.appendChild(closeBtn);

    var content = document.createElement('div');
    content.style.cssText = 'max-width:700px;margin:0 auto;padding:3rem 1.5rem 5rem;font-family:Fraunces,Georgia,serif;color:#ffebd2;';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'text-align:center;margin-bottom:3rem;opacity:0;transform:translateY(20px);transition:all 1s ease;';
    header.innerHTML =
      '<h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:600;color:#ffe680;margin:0;">&#x1F3AC; Your Journey</h1>' +
      '<p style="font-family:Lora,Georgia,serif;color:#aa9a7a;font-style:italic;margin:0.5rem 0 0;">A cinematic recap of everything you experienced</p>';
    content.appendChild(header);

    // Build timeline sections
    var sections = buildReplaySections();
    sections.forEach(function (sec, idx) {
      var el = document.createElement('div');
      el.style.cssText = 'margin-bottom:2rem;opacity:0;transform:translateY(20px);transition:all 0.8s ease;transition-delay:' + (idx * 0.15) + 's;';
      el.innerHTML =
        '<h2 style="font-family:Fraunces,Georgia,serif;font-size:1.2rem;color:#ffe680;margin:0 0 0.8rem;display:flex;align-items:center;gap:0.5rem;">' + sec.icon + ' ' + sec.title + '</h2>' +
        '<div style="font-family:Lora,Georgia,serif;font-size:0.85rem;color:#c7b8a1;line-height:1.6;">' + sec.body + '</div>';
      content.appendChild(el);
    });

    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(function () {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    });
    setTimeout(function () {
      var children = content.children;
      for (var ci = 1; ci < children.length; ci++) {
        (function (el, delay) {
          setTimeout(function () {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
        })(children[ci], 300 + (ci - 1) * 200);
      }
    }, 800);
  }

  function buildReplaySections() {
    var sections = [];
    // Visited skies
    var journal = loadJournal();
    sections.push(buildSkySection(journal));
    // Music played
    sections.push(buildMusicSection());
    // Easter eggs found
    sections.push(buildEggsSection());
    // Progress timeline
    sections.push(buildProgressSection());
    // Wishes made
    sections.push(buildWishesSection());
    // Lanterns released
    sections.push(buildLanternsSection());
    return sections;
  }

  function loadJournal() {
    try {
      return JSON.parse(localStorage.getItem('ash-sky-journal') || '[]');
    } catch (e) { return []; }
  }

  function buildSkySection(journal) {
    var skyNames = journal.map(function (e) { return e.name || 'Unknown'; });
    var unique = [];
    skyNames.forEach(function (n) {
      if (unique.indexOf(n) === -1) unique.push(n);
    });
    var body = unique.length ? unique.map(function (n) {
      return '<span style="display:inline-block;background:rgba(255,220,160,.06);border:1px solid rgba(255,210,150,.1);border-radius:12px;padding:2px 10px;margin:2px 4px;">' + n + '</span>';
    }).join('') : '<em>No skies visited yet.</em>';
    body += '<div style="margin-top:0.5rem;color:#6b5f52;font-size:0.75rem;">' + unique.length + ' of ' + (window.Skies && window.Skies.SKIES ? window.Skies.SKIES.length : '?') + ' skies discovered</div>';
    return { icon: '\uD83C\uDF26\uFE0F', title: 'Skies Explored', body: body };
  }

  function buildMusicSection() {
    var state = null;
    try {
      state = JSON.parse(localStorage.getItem('ash-jukebox') || 'null');
    } catch (e) {}
    var body = '';
    if (state && state.favorites && state.favorites.length) {
      body += '<div style="margin-bottom:0.3rem;">&#x2665; ' + state.favorites.length + ' songs favorited</div>';
    }
    if (state) {
      body += '<div style="color:#6b5f52;font-size:0.75rem;">Volume: ' + Math.round((state.volume || 0) * 100) + '%' +
        (state.shuffle ? ' &middot; Shuffle on' : '') +
        (state.repeat ? ' &middot; Repeat on' : '') + '</div>';
    } else {
      body = '<em>No music data yet.</em>';
    }
    return { icon: '\uD83C\uDFB5', title: 'Music & Sound', body: body };
  }

  function buildEggsSection() {
    var eggs = [];
    try {
      eggs = JSON.parse(localStorage.getItem('ash-sky-eggs') || '[]');
    } catch (e) {}
    var eggList = ['\uD83E\uDD89 Owl', '\uD83D\uDC09 Dragon', '\uD83D\uDEF8 UFO', '\uD83D\uDDA5\uFE0F Matrix', '\uD83C\uDFEE Lantern', '\uD83C\uDF20 Dream World'];
    var found = eggs.filter(function (e) { return e && e.name; }).map(function (e) { return e.name; });
    var body = eggList.map(function (name) {
      var isFound = found.indexOf(name) > -1;
      return '<span style="display:inline-block;background:' + (isFound ? 'rgba(255,220,160,.08)' : 'rgba(255,255,255,.03)') + ';border:1px solid ' + (isFound ? 'rgba(255,210,150,.2)' : 'rgba(255,255,255,.06)') + ';border-radius:12px;padding:2px 10px;margin:2px 4px;' + (isFound ? '' : 'opacity:0.4;') + '">' + name + (isFound ? ' &#x2714\uFE0F' : ' &#x274C') + '</span>';
    }).join('');
    body += '<div style="margin-top:0.5rem;color:#6b5f52;font-size:0.75rem;">' + found.length + ' of ' + eggList.length + ' secrets discovered</div>';
    return { icon: '\u2728', title: 'Secrets & Easter Eggs', body: body };
  }

  function buildProgressSection() {
    var total = 0, viewed = 0;
    var parts = [];
    progressPages.forEach(function (p) {
      var vk = 'ash-viewed-' + p.file.replace(/[^a-z0-9]/gi, '_');
      var lk = vk + '_count';
      try {
        var v = JSON.parse(localStorage.getItem(vk) || '[]');
        var count = parseInt(localStorage.getItem(lk) || '0');
        total += count;
        viewed += v.length;
        var pct = count > 0 ? Math.round(v.length / count * 100) : 0;
        parts.push({ label: p.label, viewed: v.length, total: count, pct: pct });
      } catch (e) {}
    });
    var body = parts.map(function (part) {
      return '<div style="margin-bottom:0.5rem;">' +
        '<div style="display:flex;justify-content:space-between;color:#c7b8a1;">' +
        '<span>' + part.label + '</span><span>' + part.viewed + '/' + part.total + ' (' + part.pct + '%)</span></div>' +
        '<div style="height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;margin-top:2px;">' +
        '<div style="height:100%;width:' + part.pct + '%;background:linear-gradient(90deg,#ffe680,#e85d3a);border-radius:2px;transition:width 0.6s;"></div></div></div>';
    }).join('');
    var overall = total > 0 ? Math.round(viewed / total * 100) : 0;
    body += '<div style="margin-top:0.8rem;text-align:center;color:#ffe680;font-size:0.9rem;">' + viewed + ' / ' + total + ' memories read &mdash; ' + overall + '% complete</div>';
    return { icon: '\uD83D\uDCD6', title: 'Reading Progress', body: body };
  }

  function buildWishesSection() {
    var wishes = [];
    try {
      wishes = JSON.parse(localStorage.getItem('ash-wish-journal') || '[]');
    } catch (e) {}
    var count = wishes.length;
    var granted = wishes.filter(function (w) { return w.granted; }).length;
    var faved = wishes.filter(function (w) { return w.favourite; }).length;
    var body = wishes.length ? wishes.slice(-5).reverse().map(function (w) {
      return '<div style="background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.08);border-radius:8px;padding:6px 10px;margin-bottom:4px;font-style:italic;">&#x2728; "' + (w.text || '').substring(0, 60) + (w.text && w.text.length > 60 ? '...' : '') + '"</div>';
    }).join('') : '<em>No wishes made yet.</em>';
    body += '<div style="margin-top:0.5rem;color:#6b5f52;font-size:0.75rem;">' + count + ' total &middot; ' + granted + ' granted &middot; ' + faved + ' favourited</div>';
    return { icon: '\u2728', title: 'Wishes', body: body };
  }

  function buildLanternsSection() {
    var wishes = [];
    try {
      wishes = JSON.parse(localStorage.getItem('ash-wish-journal') || '[]');
    } catch (e) {}
    var released = wishes.filter(function (w) { return w.released; });
    var body = released.length ? released.map(function (w) {
      return '<div style="background:rgba(255,200,100,.04);border:1px solid rgba(255,200,100,.1);border-radius:8px;padding:6px 10px;margin-bottom:4px;">&#x1F3EE; "' + (w.text || '').substring(0, 60) + (w.text && w.text.length > 60 ? '...' : '') + '"</div>';
    }).join('') : '<em>No lanterns released yet.</em>';
    body += '<div style="margin-top:0.5rem;color:#6b5f52;font-size:0.75rem;">' + released.length + ' lanterns sent to the sky</div>';
    return { icon: '\uD83C\uDFEE', title: 'Lanterns Released', body: body };
  }

  /* ===================== MAIN RENDER LOOP ===================== */
  var finaleStars = (function () {
    var arr = [];
    for (var si = 0; si < 40; si++) {
      arr.push({ x: Math.random(), y: Math.random() * 0.7, r: 0.5 + Math.random() * 1.5, phase: Math.random() * Math.PI * 2 });
    }
    return arr;
  })();
  function startAnimLoop() {
    if (animRunning) return;
    animRunning = true;
    animLastT = performance.now();
    requestAnimationFrame(animFrame);
  }

  function stopAnimLoop() {
    animRunning = false;
  }

  function animFrame(now) {
    if (!animRunning) return;
    var dt = Math.min((now - animLastT) / 1000, 0.05) || 0.016;
    animLastT = now;
    var t = now / 1000;

    if (overlayCtx) {
      overlayCtx.clearRect(0, 0, CW, CH);
      drawLensFlare(overlayCtx, t);
      drawAuroraReflection(overlayCtx, t);
      drawFinaleEffects(overlayCtx, t);
    }

    requestAnimationFrame(animFrame);
  }

  function drawFinaleEffects(ctx, t) {
    if (finaleStarBrightness > 0) {
      ctx.save();
      for (var si = 0; si < finaleStars.length; si++) {
        var s = finaleStars[si];
        var sx = s.x * CW;
        var sy = s.y * CH;
        var sr = s.r * finaleStarBrightness;
        var alpha = 0.3 * finaleStarBrightness * (0.5 + 0.5 * Math.sin(t * 2 + s.phase));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffe680';
        ctx.shadowBlur = sr * 4;
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    if (finaleGlowIntensity > 0 && currentSkyConfig) {
      ctx.save();
      ctx.globalAlpha = 0.2 * finaleGlowIntensity;
      ctx.shadowColor = '#ffe680';
      ctx.shadowBlur = 20;
      for (var gi = 0; gi < 3; gi++) {
        var cx = CW * (0.2 + gi * 0.3);
        var cy = CH * (0.15 + Math.sin(t * 0.3 + gi) * 0.05);
        ctx.strokeStyle = 'rgba(255,230,180,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        var ptCount = 8;
        for (var pi = 0; pi <= ptCount; pi++) {
          var angle = (pi / ptCount) * Math.PI * 2;
          var r = 40 + Math.sin(angle * 3 + t + gi) * 12;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r * 0.6;
          if (pi === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }
      ctx.restore();
    }
  }

  /* ===================== SKY CHANGE HOOK ===================== */
  function onSkyChanged(index) {
    currentSkyIndex = index;
    currentSkyConfig = window.Skies && window.Skies.SKIES ? window.Skies.SKIES[index] : null;
    ensureCanvas();
    updateThemeColor(currentSkyConfig);
    // Reset finale effects
    if (!isFinalePlaying) {
      finaleStarBrightness = 0;
      finaleGlowIntensity = 0;
    }
  }

  function wrapSkiesApply() {
    if (!window.Skies || !window.Skies.apply) return;
    var orig = window.Skies.apply;
    window.Skies.apply = function (index) {
      orig.call(window.Skies, index);
      onSkyChanged(index);
    };
  }

  /* ===================== EXPOSE PUBLIC API ===================== */
  window.Phase3 = {
    version: VERSION,
    triggerFinale: triggerFinale,
    openMemoryReplay: openMemoryReplay,
    updateThemeColor: function () { updateThemeColor(currentSkyConfig); }
  };

  /* ===================== INIT ===================== */
  function init() {
    wrapSkiesApply();
    initThemeColor();

    // Only run on pages with the sky system
    if (!window.Skies) return;

    // Apply initial theme
    var curIdx = window.Skies.getCurrent ? window.Skies.getCurrent() : -1;
    if (curIdx >= 0) onSkyChanged(curIdx);

    ensureCanvas();

    // Check if finale was already played
    try {
      if (localStorage.getItem('ash-finale-played') === 'true') {
        finalePlayedThisSession = true;
      }
    } catch (e) {}

    // Start progress monitoring for Grand Finale
    setTimeout(monitorProgress, 3000);

    startAnimLoop();

    // Handle visibility changes - only pause finale animation if running
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && animRunning) stopAnimLoop();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
