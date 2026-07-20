(function () {
  'use strict';

  var active = false;
  var canvas, ctx, W, H, DPR = 1;
  var columns = [];
  var heartRain = [];
  var drops = [];
  var frameId = null;
  var lastT = 0;

  var matrixBuf = '';
  for (var ci = 0x30A0; ci < 0x30FF; ci++) matrixBuf += String.fromCharCode(ci);

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'matrixRainCanvas';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;display:none;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', function () { if (active) resize(); });
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function initRain() {
    var colCount = Math.floor(W / 14);
    columns = [];
    for (var i = 0; i < colCount; i++) {
      columns.push({
        x: i * 14 + 7,
        y: Math.random() * H,
        speed: 80 + Math.random() * 120,
        chars: [],
        len: 10 + Math.floor(Math.random() * 15)
      });
    }
    heartRain = [];
    var heartCount = 6 + Math.floor(Math.random() * 8);
    for (var hi = 0; hi < heartCount; hi++) {
      heartRain.push({
        x: Math.random() * W,
        y: -20 - Math.random() * 100,
        speed: 40 + Math.random() * 60,
        size: 10 + Math.random() * 14,
        sway: Math.random() * 30,
        swayPhase: Math.random() * Math.PI * 2
      });
    }
  }

  function frame(now) {
    if (!active) return;
    var dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;
    var t = now / 1000;

    // semi-transparent clear for trail effect
    ctx.fillStyle = 'rgba(10,8,12,0.08)';
    ctx.fillRect(0, 0, W, H);

    // draw columns
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      col.y += col.speed * dt;
      if (col.y > H + 20) {
        col.y = -col.len * 14;
        col.speed = 80 + Math.random() * 120;
      }
      for (var j = 0; j < col.len; j++) {
        var cy = col.y - j * 14;
        if (cy < -14 || cy > H) continue;
        var ch = matrixBuf[Math.floor(Math.random() * matrixBuf.length)];
        var alpha = 1 - j / col.len;
        var bright = j < 2;
        ctx.fillStyle = bright ? 'rgba(200,255,200,0.9)' : 'rgba(0,200,80,' + (alpha * 0.6) + ')';
        ctx.fillText(ch, col.x, cy);
      }
    }

    // draw hearts
    for (var hi = heartRain.length - 1; hi >= 0; hi--) {
      var h = heartRain[hi];
      h.y += h.speed * dt;
      h.x += Math.sin(t * 2 + h.swayPhase) * 0.5;
      if (h.y > H + 20) {
        heartRain.splice(hi, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.font = h.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ff6b8a';
      ctx.fillText('\u2661', h.x, h.y);
      ctx.restore();
    }

    // respawn hearts
    if (Math.random() < 0.02) {
      heartRain.push({
        x: Math.random() * W,
        y: -20,
        speed: 40 + Math.random() * 60,
        size: 10 + Math.random() * 14,
        sway: Math.random() * 30,
        swayPhase: Math.random() * Math.PI * 2
      });
    }

    frameId = requestAnimationFrame(frame);
  }

  function startMatrix() {
    active = true;
    ensureCanvas();
    canvas.style.display = 'block';
    initRain();
    lastT = performance.now();
    frameId = requestAnimationFrame(frame);
  }

  function stopMatrix() {
    active = false;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = null;
    if (canvas) {
      canvas.style.display = 'none';
      ctx.clearRect(0, 0, W, H);
    }
  }

  function toggleMatrix() {
    if (active) stopMatrix();
    else startMatrix();
  }

  /* ===================== KEYBOARD DETECTION ===================== */
  var buf = '';
  var TARGET = 'matrix';

  document.addEventListener('keydown', function (e) {
    buf += e.key.toLowerCase();
    if (buf.length > 12) buf = buf.slice(-12);
    if (buf.indexOf(TARGET) !== -1) {
      buf = '';
      toggleMatrix();
    }
  });

  window.MatrixRain = { toggle: toggleMatrix, active: function () { return active; } };
})();
