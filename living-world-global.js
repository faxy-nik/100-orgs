(function () {
  'use strict';

  // Skip if sky-living.js already handles dragon/UFO on this page
  if (window.SkyLiving) return;

  var canvas, ctx, W, H, DPR = 1;
  var dragon = null;
  var ufo = null;
  var frameId = null;
  var lastT = 0;

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'livingWorldCanvas';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:2;pointer-events:none;display:none;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', function () { resize(); });
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function maybeDragon(t) {
    if (dragon) return;
    if (Math.random() > 0.0005) return;
    var fromLeft = Math.random() < 0.5;
    dragon = {
      x: fromLeft ? -120 : W + 120,
      y: H * (0.08 + Math.random() * 0.18),
      vx: (fromLeft ? 1 : -1) * (40 + Math.random() * 30),
      t: 0,
      duration: 5 + Math.random() * 4,
      wingPhase: 0
    };
    canvas.style.display = 'block';
  }

  function drawDragon(dt, t) {
    if (!dragon) return;
    dragon.t += dt;
    dragon.x += dragon.vx * dt;
    dragon.y += Math.sin(dragon.t * 0.8) * 8;
    dragon.wingPhase += dt * 4;
    var prog = dragon.t / dragon.duration;
    if (prog > 1 || dragon.x < -200 || dragon.x > W + 200) {
      dragon = null;
      if (!ufo) canvas.style.display = 'none';
      return;
    }
    var fade = prog < 0.1 ? prog / 0.1 : prog > 0.85 ? (1 - prog) / 0.15 : 1;
    ctx.save();
    ctx.globalAlpha = fade * 0.55;
    ctx.translate(dragon.x, dragon.y);
    // body
    ctx.strokeStyle = '#5a4040';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (var i = 0; i < 12; i++) {
      var px = i * 7 - 42;
      var py = Math.sin(i * 0.8 + dragon.t * 1.2) * 5;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // wings
    var wingUp = Math.sin(dragon.wingPhase) * 14;
    ctx.fillStyle = 'rgba(80,50,50,0.35)';
    ctx.beginPath();
    ctx.moveTo(-8, 0); ctx.lineTo(-25, -18 - wingUp); ctx.lineTo(-18, 0); ctx.lineTo(-25, 18 + wingUp);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(8, 0); ctx.lineTo(25, -18 - wingUp); ctx.lineTo(18, 0); ctx.lineTo(25, 18 + wingUp);
    ctx.closePath(); ctx.fill();
    // head
    ctx.fillStyle = '#6a5050';
    ctx.beginPath(); ctx.arc(38, -2, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6644';
    ctx.beginPath(); ctx.arc(45, -3, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function maybeUFO(t) {
    if (ufo) return;
    if (Math.random() > 0.00015) return;
    var fromLeft = Math.random() < 0.5;
    ufo = {
      x: fromLeft ? -60 : W + 60,
      y: H * (0.1 + Math.random() * 0.2),
      vx: (fromLeft ? 1 : -1) * (80 + Math.random() * 70),
      t: 0,
      duration: 1.5 + Math.random() * 1.5
    };
    canvas.style.display = 'block';
  }

  function drawUFO(dt, t) {
    if (!ufo) return;
    ufo.t += dt;
    ufo.x += ufo.vx * dt;
    ufo.y += Math.sin(ufo.t * 2) * 5;
    var prog = ufo.t / ufo.duration;
    if (prog > 1 || ufo.x < -80 || ufo.x > W + 80) {
      ufo = null;
      if (!dragon) canvas.style.display = 'none';
      return;
    }
    var fade = prog < 0.15 ? prog / 0.15 : prog > 0.8 ? (1 - prog) / 0.2 : 1;
    ctx.save();
    ctx.globalAlpha = fade * 0.5;
    var ux = ufo.x, uy = ufo.y;
    // glow
    var grd = ctx.createRadialGradient(ux, uy + 5, 0, ux, uy + 5, 35);
    grd.addColorStop(0, 'rgba(100,200,255,0.25)');
    grd.addColorStop(1, 'rgba(100,200,255,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(ux, uy + 5, 35, 0, Math.PI * 2); ctx.fill();
    // disc
    ctx.fillStyle = 'rgba(180,220,255,0.35)';
    ctx.beginPath(); ctx.ellipse(ux, uy, 14, 5, 0, 0, Math.PI * 2); ctx.fill();
    // dome
    ctx.fillStyle = 'rgba(200,230,255,0.25)';
    ctx.beginPath(); ctx.arc(ux, uy - 2, 5, Math.PI, 0); ctx.fill();
    // lights
    var cols = ['rgba(100,255,200,0.5)', 'rgba(255,100,200,0.5)', 'rgba(200,255,100,0.5)'];
    for (var li = 0; li < 3; li++) {
      ctx.fillStyle = cols[li];
      ctx.beginPath(); ctx.arc(ux - 6 + li * 6, uy + 3, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function frame(now) {
    if (!canvas) return;
    if (!dragon && !ufo) {
      canvas.style.display = 'none';
      return;
    }
    var dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;
    ctx.clearRect(0, 0, W, H);
    drawDragon(dt, now / 1000);
    drawUFO(dt, now / 1000);
  }

  function tick(now) {
    if (dragon || ufo) frame(now);
    var t = now / 1000;
    maybeDragon(t);
    maybeUFO(t);
    requestAnimationFrame(tick);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ensureCanvas();
    requestAnimationFrame(tick);
  }

  window.LivingWorld = {
    get hasDragon() { return !!dragon; },
    get hasUFO() { return !!ufo; }
  };
})();
