/* ===================================================================
   SKY OBSERVATORY — browse, discover, and collect skies
   Requires: skies.js (window.Skies)
   Loads on: gallery.html only
   =================================================================== */
(function () {
  'use strict';

  var OBS_KEY = 'ash-obs';
  var FAV_KEY = 'ash-obs-favs';
  var RECENT_KEY = 'ash-obs-recent';
  var MOON_KEY = 'ash-obs-moon';
  var STAR_KEY = 'ash-obs-star';
  var RADIO_KEY = 'ash-obs-radio';

  var config = {};

  function defaults() {
    try {
      config = JSON.parse(localStorage.getItem(OBS_KEY)) || {};
    } catch (e) { config = {}; }
    if (!config.favorites) config.favorites = [];
    if (!config.recent) config.recent = [];
    if (!config.moonClicks) config.moonClicks = 0;
    if (!config.luckyStar) config.luckyStar = {};
    if (!config.radio) config.radio = false;
    if (!config.coffeeAt) config.coffeeAt = 0;
  }
  function save() {
    try { localStorage.setItem(OBS_KEY, JSON.stringify(config)); } catch (e) {}
  }
  defaults();

  /* ---------- categories ---------- */
  function getCategory(sky) {
    var n = (sky.name || '').toLowerCase();
    if (sky.storm || n.indexOf('storm')>=0 || n.indexOf('thunder')>=0) return 'Storm';
    if (sky.rainbow || n.indexOf('rainbow')>=0) return 'Rainbow';
    if (n.indexOf('aurora')>=0 || n.indexOf('northern')>=0 || n.indexOf('emerald')>=0 || n.indexOf('cyan')>=0 || n.indexOf('purple aurora')>=0) return 'Aurora';
    if (n.indexOf('galaxy')>=0 || n.indexOf('nebula')>=0 || n.indexOf('cosmic')>=0 || n.indexOf('space')>=0 || n.indexOf('stardust')>=0 || n.indexOf('void')>=0 || n.indexOf('starfall')>=0 || n.indexOf('binary')>=0) return 'Cosmic';
    if (sky.particles) {
      for (var i=0;i<sky.particles.length;i++) {
        var t = sky.particles[i].type;
        if (t === 'rain') return 'Rain';
        if (t === 'snow') return 'Snow';
        if (t === 'petal' || t === 'leaf') return 'Seasonal';
      }
    }
    if (sky.waves || n.indexOf('ocean')>=0 || n.indexOf('coastal')>=0 || n.indexOf('misty coast')>=0 || n.indexOf('glacier')>=0 || n.indexOf('white sands')>=0) return 'Water';
    if (n.indexOf('sunrise')>=0 || n.indexOf('dawn')>=0 || n.indexOf('morning')>=0 || n.indexOf('creamy')>=0) return 'Dawn';
    if (n.indexOf('sunset')>=0 || n.indexOf('dusk')>=0 || n.indexOf('twilight')>=0 || n.indexOf('desert dusk')>=0 || n.indexOf('golden hour')>=0 || n.indexOf('harvest')>=0 || n.indexOf('autumn sunset')>=0) return 'Sunset';
    if (n.indexOf('night')>=0 || n.indexOf('midnight')>=0 || n.indexOf('eclipse')>=0 || n.indexOf('moon')>=0 || n.indexOf('starry')>=0 || n.indexOf('star')>=0 && n.indexOf('starfall')<0 || n.indexOf('meteor')>=0 || n.indexOf('shooting')>=0) return 'Night';
    if (n.indexOf('fog')>=0 || n.indexOf('mist')>=0) return 'Fog';
    if (n.indexOf('firefl')>=0 || n.indexOf('campfire')>=0 || n.indexOf('lantern')>=0 || n.indexOf('candle')>=0) return 'Cozy';
    if (n.indexOf('sakura')>=0 || n.indexOf('cherry')>=0 || n.indexOf('spring')>=0 || n.indexOf('meadow')>=0 || n.indexOf('butterfl')>=0 || n.indexOf('forest')>=0 || n.indexOf('jungle')>=0 || n.indexOf('wisteria')>=0 || n.indexOf('lavender')>=0) return 'Nature';
    if (n.indexOf('cotton')>=0 || n.indexOf('dream')>=0 || n.indexOf('bubble')>=0 || n.indexOf('heaven')>=0 || n.indexOf('celestial')>=0 || n.indexOf('fantasy')>=0 || n.indexOf('infinite')>=0 || n.indexOf('rose nebula')>=0 || n.indexOf('cosmic bloom')>=0) return 'Fantasy';
    if (sky.lights && sky.lights.length && sky.lights[0].y < 0.35) return 'Day';
    return 'Misc';
  }

  function getMoodTags(sky) {
    var tags = [], n = (sky.name || '').toLowerCase();
    if (sky.stars) { tags.push('starry'); if (sky.stars.count > 100) tags.push('dense'); }
    if (sky.aurora) tags.push('aurora');
    if (sky.lights && sky.lights.length) tags.push(sky.lights[0].eclipse ? 'eclipse' : 'glowing');
    if (sky.rainbow) tags.push('rainbow');
    if (sky.storm) tags.push('stormy');
    if (sky.clouds) tags.push('cloudy');
    if (sky.particles) {
      for (var i=0;i<sky.particles.length;i++) {
        var t = sky.particles[i].type;
        if (t==='rain') tags.push('rainy');
        else if (t==='snow') tags.push('snowy');
        else if (t==='petal'||t==='leaf') tags.push('floating');
        else if (t==='firefly') tags.push('magical');
        else if (t==='meteor') tags.push('shooting');
        else if (t==='ember') tags.push('warm');
      }
    }
    if (sky.waves) tags.push('waves');
    if (n.indexOf('romantic')>=0||n.indexOf('love')>=0||n.indexOf('infinite')>=0) tags.push('romantic');
    if (n.indexOf('dream')>=0||n.indexOf('fantasy')>=0||n.indexOf('magical')>=0) tags.push('dreamy');
    if (n.indexOf('calm')>=0||n.indexOf('quiet')>=0||n.indexOf('gentle')>=0||n.indexOf('soft')>=0) tags.push('calm');
    return tags;
  }

  /* ---------- helpers ---------- */
  function hexToRgba(hex, a) {
    var h = hex.replace('#','');
    if (h.length===3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h,16);
    return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';
  }

  /* ---------- thumbnail rendering ---------- */
  function renderThumbnail(canvas, sky) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;

    // Gradient background
    if (sky.gradient && sky.gradient.length) {
      var grd = ctx.createLinearGradient(0, 0, 0, h);
      for (var i=0;i<sky.gradient.length;i++) {
        grd.addColorStop(sky.gradient[i][0], sky.gradient[i][1]);
      }
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = '#1a1a2a';
      ctx.fillRect(0, 0, w, h);
    }

    // Stars
    if (sky.stars) {
      var seed = sky.name.length;
      for (var si=0;si<Math.min(sky.stars.count,80);si++) {
        var sx = ((si*137.5+seed)%1)*w, sy = ((si*97.3+seed*3)%1)*h*0.8;
        var sr = sky.stars.minR + (sky.stars.maxR-sky.stars.minR)*((si*41.7)%1);
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(sr*0.5,1), 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,240,'+(0.3+0.7*((si*53.1)%1))+')';
        ctx.fill();
      }
    }

    // Lights (sun/moon)
    if (sky.lights) {
      for (var li=0;li<sky.lights.length;li++) {
        var l = sky.lights[li];
        var lx = l.x*w, ly = l.y*h, lr = Math.max(l.r*0.3,8);
        if (l.eclipse) {
          ctx.beginPath();
          ctx.arc(lx, ly, lr*0.8, 0, Math.PI*2);
          ctx.fillStyle = '#000';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(lx+lr*0.25, ly-lr*0.15, lr*0.6, 0, Math.PI*2);
          ctx.fillStyle = l.core || '#fff';
          ctx.fill();
        } else {
          var grd2 = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr*2);
          grd2.addColorStop(0, l.core || '#fff');
          grd2.addColorStop(0.4, l.glow || 'rgba(255,200,100,0.5)');
          grd2.addColorStop(1, 'transparent');
          ctx.fillStyle = grd2;
          ctx.fillRect(lx-lr*2, ly-lr*2, lr*4, lr*4);
        }
      }
    }

    // Clouds (simplified)
    if (sky.clouds) {
      for (var ci=0;ci<Math.min(sky.clouds.length,3);ci++) {
        var cl = sky.clouds[ci];
        var cx = ((ci*173+50)%1)*w, cy = cl.yMin*h + (cl.yMax-cl.yMin)*h*((ci*89)%1);
        var crad = Math.min(cl.minR,cl.maxR)*0.3;
        var ca = Math.min(cl.alpha||0.3,0.4);
        ctx.beginPath();
        ctx.ellipse(cx, cy, crad, crad*0.5, 0, 0, Math.PI*2);
        ctx.fillStyle = hexToRgba(cl.color||'#ffffff', ca);
        ctx.fill();
      }
    }

    // Aurora (simplified, seed-based for stable thumbnails)
    if (sky.aurora) {
      var aSeed = sky.name.length * 1000;
      for (var ai=0;ai<8;ai++) {
        var ay = 0.2*h + ai*0.1*h*Math.sin(ai*2+aSeed);
        ctx.beginPath();
        ctx.moveTo(0, ay);
        for (var ax=0;ax<=w;ax+=20) {
          ctx.lineTo(ax, ay+15*Math.sin(ax*0.03+ai*1.5+aSeed));
        }
        ctx.strokeStyle = sky.aurora.colors[ai%sky.aurora.colors.length] || 'rgba(100,200,255,0.15)';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }

    // Name overlay
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, h-22, w, 22);
    ctx.fillStyle = '#ffebd2';
    ctx.font = '11px Georgia,serif';
    ctx.textAlign = 'center';
    ctx.fillText(sky.name, w/2, h-7);
  }

  /* ---------- observatory UI ---------- */
  var container, gridEl, searchEl, catBar, previewEl, selectedIdx = -1;

  function initUI() {
    // Replace page content
    var main = document.querySelector('main') || document.body;
    var header = main.querySelector('.page-header');
    if (header) {
      header.innerHTML = '<h1 style="font-family:var(--font-display);font-weight:600;font-size:clamp(2rem,7vw,3.5rem);color:var(--parchment);margin:0 0 0.3rem;text-shadow:0 0 30px rgba(255,230,128,.3),0 2px 4px rgba(0,0,0,.6)">\uD83D\uDD2D Sky Observatory</h1><p style="color:var(--parchment-dim);font-size:clamp(0.85rem,2vw,1rem);font-style:italic;margin:0">Browse every sky. Find your atmosphere.</p>';
    }

    var oldGrid = document.getElementById('galleryGrid');
    var oldLightbox = document.getElementById('lightbox');
    if (oldLightbox) oldLightbox.style.display = 'none';

    // Create observatory container
    var obs = document.createElement('div');
    obs.id = 'observatory';
    obs.style.cssText = 'max-width:1200px;margin:0 auto;padding:0 var(--pad-inline,1.25rem) 2rem;';

    // Search + categories bar
    var controls = document.createElement('div');
    controls.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:1rem;';

    searchEl = document.createElement('input');
    searchEl.id = 'obsSearch';
    searchEl.placeholder = '\uD83D\uDD0D Search skies...';
    searchEl.style.cssText = 'flex:1;min-width:160px;background:var(--glass);border:1px solid var(--glassBorder);color:var(--parchment);padding:0.55rem 0.9rem;border-radius:8px;font-family:var(--font-body);font-size:0.85rem;outline:none;transition:border-color 0.3s;';
    searchEl.addEventListener('input', function () { renderGrid(); });
    controls.appendChild(searchEl);

    catBar = document.createElement('div');
    catBar.id = 'obsCats';
    catBar.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
    controls.appendChild(catBar);
    obs.appendChild(controls);

    // Category buttons
    var CATS = ['All','Dawn','Day','Sunset','Night','Aurora','Cosmic','Rain','Snow','Storm','Rainbow','Fog','Water','Seasonal','Nature','Cozy','Fantasy','Misc'];
    var activeCat = 'All';
    CATS.forEach(function(c) {
      var btn = document.createElement('button');
      btn.textContent = c;
      btn.dataset.cat = c;
      btn.style.cssText = 'background:'+(c==='All'?'rgba(255,230,128,.15)':'var(--glass)')+';border:1px solid '+(c==='All'?'rgba(255,230,128,.35)':'var(--glassBorder)')+';color:'+(c==='All'?'var(--gold)':'var(--parchment-dim)')+';padding:0.3rem 0.7rem;border-radius:6px;cursor:pointer;font-family:var(--font-body);font-size:0.75rem;transition:all 0.25s;';
      btn.addEventListener('click', function() {
        catBar.querySelectorAll('button').forEach(function(b) {
          b.style.background = 'var(--glass)';
          b.style.borderColor = 'var(--glassBorder)';
          b.style.color = 'var(--parchment-dim)';
        });
        this.style.background = 'rgba(255,230,128,.15)';
        this.style.borderColor = 'rgba(255,230,128,.35)';
        this.style.color = 'var(--gold)';
        activeCat = this.dataset.cat;
        renderGrid();
      });
      catBar.appendChild(btn);
    });

    // Recently viewed strip
    var recentStrip = document.createElement('div');
    recentStrip.id = 'obsRecent';
    recentStrip.style.cssText = 'margin-bottom:1rem;display:none;';
    obs.appendChild(recentStrip);

    // Grid
    gridEl = document.createElement('div');
    gridEl.id = 'obsGrid';
    gridEl.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:1.5rem;';
    obs.appendChild(gridEl);

    // Preview card
    previewEl = document.createElement('div');
    previewEl.id = 'obsPreview';
    previewEl.style.cssText = 'background:var(--glass);border:1px solid var(--glassBorder);border-radius:12px;padding:1rem;display:none;';
    obs.appendChild(previewEl);

    if (oldGrid) oldGrid.replaceWith(obs); else main.appendChild(obs);
    container = obs;

    renderRecent();
    renderGrid();
  }

  function renderRecent() {
    var strip = document.getElementById('obsRecent');
    if (!strip || !config.recent.length) { if (strip) strip.style.display = 'none'; return; }
    var html = '<div style="font-size:0.75rem;color:var(--parchment-dim);margin-bottom:6px;">\uD83D\uDD0D Recently viewed</div><div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">';
    var SKIES = window.Skies && window.Skies.SKIES;
    if (!SKIES) return;
    for (var i=Math.max(0,config.recent.length-10);i<config.recent.length;i++) {
      var idx = config.recent[i];
      var sky = SKIES[idx];
      if (!sky) continue;
      var isFav = config.favorites.indexOf(idx) >= 0;
      html += '<div class="obs-recent-item" data-idx="'+idx+'" style="flex-shrink:0;width:100px;cursor:pointer;border-radius:8px;overflow:hidden;border:1px solid var(--glassBorder);transition:border-color 0.3s;" onclick="SkyObservatory.selectSky('+idx+')">';
      html += '<canvas width="200" height="120" style="width:100px;height:60px;display:block;"></canvas>';
      html += '<div style="padding:3px 5px;font-size:0.6rem;color:var(--parchment-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+(isFav?'\u2605 ':'')+sky.name+'</div>';
      html += '</div>';
    }
    html += '</div>';
    strip.innerHTML = html;
    strip.style.display = '';
    // Render thumbnails for recent
    requestAnimationFrame(function() {
      strip.querySelectorAll('.obs-recent-item').forEach(function(el) {
        var idx = parseInt(el.dataset.idx);
        var sky = SKIES[idx];
        var cv = el.querySelector('canvas');
        if (cv && sky) renderThumbnail(cv, sky);
      });
    });
  }

  function renderGrid() {
    var SKIES = window.Skies && window.Skies.SKIES;
    if (!SKIES || !gridEl) return;
    var q = (searchEl.value || '').toLowerCase().trim();
    var activeCat = 'All';
    var activeBtn = catBar.querySelector('button[style*="rgba(255,230,128,.15)"]');
    if (activeBtn) activeCat = activeBtn.dataset.cat;

    var filtered = [], indices = [];
    for (var i=0;i<SKIES.length;i++) {
      var sky = SKIES[i];
      if (!sky || !sky.name) continue;
      var cat = getCategory(sky);
      if (activeCat !== 'All' && cat !== activeCat) continue;
      if (q && sky.name.toLowerCase().indexOf(q) < 0) continue;
      filtered.push(sky);
      indices.push(i);
    }

    var html = '';
    for (var fi=0;fi<filtered.length;fi++) {
      var idx = indices[fi], sky = filtered[fi];
      var isFav = config.favorites.indexOf(idx) >= 0;
      html += '<div class="obs-sky-card" data-idx="'+idx+'" style="position:relative;border-radius:10px;overflow:hidden;background:var(--glass);border:2px solid '+(idx===selectedIdx?'var(--gold)':'var(--glassBorder)')+';cursor:pointer;transition:all 0.3s;" onclick="SkyObservatory.selectSky('+idx+')">';
      html += '<canvas width="300" height="180" style="width:100%;height:auto;aspect-ratio:300/180;display:block;"></canvas>';
      html += '<div style="padding:0.4rem 0.5rem;">';
      html += '<div style="font-size:0.72rem;font-family:var(--font-display);color:var(--parchment);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+sky.name+'</div>';
      html += '<div style="font-size:0.6rem;color:var(--ash);margin-top:2px;">'+getCategory(sky)+'</div>';
      html += '</div>';
      html += '<button class="obs-fav-btn" data-idx="'+idx+'" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.4);border:none;border-radius:50%;width:26px;height:26px;font-size:0.8rem;cursor:pointer;color:'+(isFav?'var(--gold)':'rgba(255,255,255,0.35)')+';z-index:2;transition:all 0.3s;" title="'+(isFav?'Remove from favorites':'Add to favorites')+'">'+(isFav?'\u2605':'\u2606')+'</button>';
      html += '</div>';
    }
    gridEl.innerHTML = html || '<div style="text-align:center;padding:3rem;color:var(--ash);font-style:italic;">No skies found \u2728</div>';

    // Render thumbnails
    requestAnimationFrame(function() {
      gridEl.querySelectorAll('.obs-sky-card canvas').forEach(function(cv) {
        var card = cv.closest('.obs-sky-card');
        var idx = parseInt(card.dataset.idx);
        var sky = SKIES[idx];
        if (sky) renderThumbnail(cv, sky);
      });
    });

    // Favorite buttons
    gridEl.querySelectorAll('.obs-fav-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = parseInt(this.dataset.idx);
        var pos = config.favorites.indexOf(idx);
        if (pos >= 0) {
          config.favorites.splice(pos, 1);
          this.textContent = '\u2606';
          this.style.color = 'rgba(255,255,255,0.35)';
          this.title = 'Add to favorites';
        } else {
          config.favorites.push(idx);
          this.textContent = '\u2605';
          this.style.color = 'var(--gold)';
          this.title = 'Remove from favorites';
        }
        save();
      });
    });
  }

  function selectSky(idx) {
    var SKIES = window.Skies && window.Skies.SKIES;
    if (!SKIES || !SKIES[idx]) return;
    selectedIdx = idx;
    var sky = SKIES[idx];

    // Update recent
    var rp = config.recent.indexOf(idx);
    if (rp >= 0) config.recent.splice(rp, 1);
    config.recent.push(idx);
    if (config.recent.length > 20) config.recent.splice(0, config.recent.length-20);
    save();
    renderRecent();

    // Highlight card
    gridEl.querySelectorAll('.obs-sky-card').forEach(function(c) {
      c.style.borderColor = 'var(--glassBorder)';
    });
    var card = gridEl.querySelector('.obs-sky-card[data-idx="'+idx+'"]');
    if (card) card.style.borderColor = 'var(--gold)';

    // Show preview
    var isFav = config.favorites.indexOf(idx) >= 0;
    var tags = getMoodTags(sky);
    var prev = previewEl;
    prev.style.display = '';
    prev.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:1rem;">' +
      '<div style="flex:0 0 200px;">' +
        '<canvas id="obsPreviewCanvas" width="400" height="240" style="width:100%;height:auto;aspect-ratio:400/240;border-radius:8px;display:block;"></canvas>' +
      '</div>' +
      '<div style="flex:1;min-width:180px;">' +
        '<h3 style="margin:0 0 0.3rem;font-family:var(--font-display);color:var(--gold);font-size:1.1rem;">'+sky.name+'</h3>' +
        '<div style="font-size:0.75rem;color:var(--ash);margin-bottom:0.5rem;">'+getCategory(sky)+'</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:0.5rem;">' +
          tags.map(function(t){return '<span style="background:rgba(255,230,128,.1);border:1px solid rgba(255,230,128,.2);color:var(--gold);padding:2px 6px;border-radius:4px;font-size:0.65rem;">'+t+'</span>';}).join('') +
        '</div>' +
        '<p style="font-size:0.85rem;color:var(--parchment-dim);font-style:italic;line-height:1.5;margin:0 0 0.8rem;">'+(sky.message||'')+'</p>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
          '<button id="obsApplyBtn" style="background:rgba(255,230,128,.15);border:1px solid rgba(255,230,128,.35);color:var(--gold);padding:0.5rem 1.2rem;border-radius:8px;cursor:pointer;font-family:var(--font-display);font-size:0.85rem;transition:all 0.3s;">\u2728 Apply Sky</button>' +
          '<button id="obsFavBtn" style="background:var(--glass);border:1px solid var(--glassBorder);color:'+(isFav?'var(--gold)':'var(--parchment-dim)')+';padding:0.5rem 1rem;border-radius:8px;cursor:pointer;font-family:var(--font-display);font-size:0.85rem;transition:all 0.3s;">'+(isFav?'\u2605 Favorited':'\u2606 Favorite')+'</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    requestAnimationFrame(function() {
      var cv = document.getElementById('obsPreviewCanvas');
      if (cv) renderThumbnail(cv, sky);
    });

    document.getElementById('obsApplyBtn').addEventListener('click', function() {
      if (window.Skies) {
        window.Skies.apply(idx);
        checkSecretCombos(idx);
      }
    });

    document.getElementById('obsFavBtn').addEventListener('click', function() {
      var pos = config.favorites.indexOf(idx);
      if (pos >= 0) {
        config.favorites.splice(pos, 1);
        this.textContent = '\u2606 Favorite';
        this.style.color = 'var(--parchment-dim)';
      } else {
        config.favorites.push(idx);
        this.textContent = '\u2605 Favorited';
        this.style.color = 'var(--gold)';
      }
      save();
      renderGrid();
    });
  }

  /* =====================================================
     PART 2 — ALL 10 FEATURES
     ===================================================== */

  /* ---------- 1. Secret Sky Combinations ---------- */
  var lastSkyIdx = -1;
  function checkSecretCombos(idx) {
    var SKIES = window.Skies && window.Skies.SKIES;
    if (!SKIES) return;
    var combo = null;
    var a = lastSkyIdx >= 0 ? SKIES[lastSkyIdx] : null;
    var b = SKIES[idx];
    if (a && b) {
      var an = (a.name||'').toLowerCase(), bn = (b.name||'').toLowerCase();
      if ((an.indexOf('aurora')>=0&&bn.indexOf('galaxy')>=0)||(bn.indexOf('aurora')>=0&&an.indexOf('galaxy')>=0)) combo = {name:'Aurora Galaxy', msg:'The galaxy meets the aurora — a secret sky unfolds \u2728'};
      if ((an.indexOf('storm')>=0&&bn.indexOf('sunset')>=0)||(bn.indexOf('storm')>=0&&an.indexOf('sunset')>=0)) combo = {name:'Storm Sunset', msg:'Chaos and beauty collide — a sky born from opposites \uD83C\uDF24\uFE0F\u26C8\uFE0F'};
      if ((an.indexOf('snow')>=0&&bn.indexOf('moon')>=0)||(bn.indexOf('snow')>=0&&an.indexOf('moon')>=0)) combo = {name:'Snow Moon', msg:'The moon watches the snowfall in secret \u2744\uFE0F\uD83C\uDF19'};
      if ((an.indexOf('rainbow')>=0&&bn.indexOf('aurora')>=0)||(bn.indexOf('rainbow')>=0&&an.indexOf('aurora')>=0)) combo = {name:'Prism Aurora', msg:'Rainbows and auroras merge into pure light \uD83C\uDF08\uD83C\uDF00'};
      if ((an.indexOf('firefly')>=0&&bn.indexOf('starry')>=0)||(bn.indexOf('firefly')>=0&&an.indexOf('starry')>=0)) combo = {name:'Firefly Stars', msg:'The stars come down to dance with the fireflies \u2728\uD83D\uDD25'};
      if ((an.indexOf('ocean')>=0&&bn.indexOf('aurora')>=0)||(bn.indexOf('ocean')>=0&&an.indexOf('aurora')>=0)) combo = {name:'Bioluminescent Wave', msg:'The ocean reflects the aurora — a secret revealed \uD83C\uDF0A\uD83C\uDF00'};
    }
    lastSkyIdx = idx;
    if (combo) {
      toast('\u2728 '+combo.name+'\n'+combo.msg, 'rgba(180,100,255,0.9)', 5000);
    }
  }

  /* ---------- 2. Random Black Cat ---------- */
  var catInterval = null;
  function initBlackCat() {
    if (catInterval) return;
    catInterval = setInterval(function() {
      if (Math.random() > 0.006) return;
      spawnCat();
    }, 10000);
    // Also check on page visibility
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        clearInterval(catInterval);
        catInterval = setInterval(function() {
          if (Math.random() > 0.006) return;
          spawnCat();
        }, 10000);
      }
    });
  }

  function spawnCat() {
    var cat = document.createElement('div');
    cat.textContent = '\uD83D\uDC31';
    cat.style.cssText = 'position:fixed;bottom:10px;font-size:2rem;z-index:9999;pointer-events:auto;cursor:pointer;transform:scaleX(-1);transition:left 8s linear;left:-60px;';
    document.body.appendChild(cat);

    // Walk across
    requestAnimationFrame(function() {
      cat.style.left = (window.innerWidth + 60) + 'px';
    });

    var clicked = false;
    cat.addEventListener('click', function(e) {
      if (clicked) return;
      clicked = true;
      cat.style.transition = 'none';
      cat.style.left = e.clientX + 'px';
      cat.textContent = '\uD83D\uDC31\u200D\u2B1B'; // Black cat emoji + look
      setTimeout(function() {
        cat.style.transition = 'left 1.5s ease-in';
        cat.style.left = '-60px';
        setTimeout(function() { cat.remove(); }, 2000);
      }, 800);
    });

    // Remove after walk
    setTimeout(function() {
      if (!clicked) cat.remove();
    }, 9000);
  }

  /* ---------- 3. Real Time World ---------- */
  function initRealTime() {
    var el = document.createElement('div');
    el.id = 'obsRealTime';
    el.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:100;font-size:0.65rem;color:var(--ash);font-family:var(--font-display);opacity:0.6;pointer-events:none;text-align:right;';
    document.body.appendChild(el);

    function updateTime() {
      var d = new Date();
      var h = d.getHours();
      var period = h<6?'Night':h<12?'Morning':h<17?'Afternoon':h<21?'Evening':'Night';
      var icon = period==='Morning'?'\uD83C\uDF05':period==='Afternoon'?'\u2600\uFE0F':period==='Evening'?'\uD83C\uDF07':'\uD83C\uDF19';
      var timeStr = d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
      el.innerHTML = icon+' '+period+'<br>'+timeStr;
    }
    updateTime();
    setInterval(updateTime, 30000);
  }

  /* ---------- 4. Moon Click Counter ---------- */
  function initMoonCounter() {
    var moonBtn = document.createElement('button');
    moonBtn.id = 'obsMoonBtn';
    moonBtn.title = 'Click the moon \uD83C\uDF19';
    moonBtn.textContent = '\uD83C\uDF19';
    moonBtn.style.cssText = 'position:fixed;bottom:5rem;right:1rem;z-index:100;background:var(--glass);border:1px solid var(--glassBorder);border-radius:50%;width:40px;height:40px;font-size:1.2rem;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;justify-content:center;';
    moonBtn.addEventListener('click', function() {
      config.moonClicks = (config.moonClicks || 0) + 1;
      save();
      var msgs = {5:'\u2728 You found a moon secret!',10:'\uD83C\uDF19 Moon child \u2728',25:'\uD83C\uDF1B Crescent of secrets...',50:'\uD83C\uDF15 Half moon wisdom',100:'\uD83C\uDF1D Full moon — you are devoted \u2728'};
      var next = null;
      for (var k in msgs) { if (config.moonClicks == k) next = msgs[k]; }
      if (next) toast(next, 'rgba(200,180,255,0.85)', 4000);
      else toast('\uD83C\uDF19 Moon click #'+config.moonClicks, 'rgba(200,180,255,0.6)', 1500);
      if (config.moonClicks===25) spawnCat();
    });
    document.body.appendChild(moonBtn);
  }

  /* ---------- 5. Hidden Radio (type "radio") ---------- */
  var radioBuf = '';
  function initHiddenRadio() {
    document.addEventListener('keydown', function(e) {
      radioBuf += e.key.toLowerCase();
      if (radioBuf.length > 5) radioBuf = radioBuf.slice(-5);
      if (radioBuf === 'radio') {
        radioBuf = '';
        toggleRadio();
      }
    });
  }

  var radioPlayer = null;
  function toggleRadio() {
    if (radioPlayer && radioPlayer.style.display !== 'none') {
      radioPlayer.style.display = 'none';
      return;
    }
    if (!radioPlayer) {
      radioPlayer = document.createElement('div');
      radioPlayer.id = 'obsRadio';
      radioPlayer.innerHTML = '<div style="background:var(--ink-soft);border:1px solid var(--gold);border-radius:12px;padding:1rem;width:280px;box-shadow:0 8px 32px rgba(0,0,0,.6);">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:0.8rem;">' +
          '<span style="font-size:1.5rem;">\uD83D\uDCFB</span>' +
          '<span style="font-family:var(--font-display);color:var(--gold);font-size:0.9rem;">Cassette Player</span>' +
          '<button id="radioClose" style="margin-left:auto;background:none;border:none;color:var(--ash);cursor:pointer;font-size:1.2rem;">&times;</button>' +
        '</div>' +
        '<div style="text-align:center;margin-bottom:0.8rem;">' +
          '<div style="font-size:0.7rem;color:var(--ash);margin-bottom:4px;">Now Playing</div>' +
          '<div id="radioTrack" style="font-family:var(--font-display);color:var(--parchment);font-size:0.9rem;">Hidden Frequencies</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">' +
          '<button class="radio-btn" data-url="" style="background:var(--glass);border:1px solid var(--glassBorder);color:var(--parchment-dim);padding:0.3rem 0.6rem;border-radius:6px;cursor:pointer;font-size:0.7rem;">\u25B6 Play</button>' +
          '<button class="radio-btn" data-url="" style="background:var(--glass);border:1px solid var(--glassBorder);color:var(--parchment-dim);padding:0.3rem 0.6rem;border-radius:6px;cursor:pointer;font-size:0.7rem;">\u23F8 Pause</button>' +
        '</div>' +
      '</div>';
      radioPlayer.style.cssText = 'position:fixed;bottom:6rem;right:1rem;z-index:9999;';
      document.body.appendChild(radioPlayer);

      radioPlayer.querySelector('#radioClose').addEventListener('click', function() {
        radioPlayer.style.display = 'none';
      });
      radioPlayer.querySelectorAll('.radio-btn')[0].addEventListener('click', function() {
        // Create a subtle ambient tone
        try {
          var actx = new (window.AudioContext||window.webkitAudioContext)();
          var osc = actx.createOscillator();
          var gain = actx.createGain();
          osc.type = 'sine';
          osc.frequency.value = 432;
          gain.gain.setValueAtTime(0, actx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, actx.currentTime + 2);
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(actx.currentTime);
          osc.stop(actx.currentTime + 8);
          gain.gain.linearRampToValueAtTime(0, actx.currentTime + 8);
        } catch(e) {}
        document.getElementById('radioTrack').textContent = '432 Hz \u2661 For you';
      });
      radioPlayer.querySelectorAll('.radio-btn')[1].addEventListener('click', function() {
        document.getElementById('radioTrack').textContent = 'Paused \u2728';
      });

      config.radio = true;
      save();
    }
    radioPlayer.style.display = '';
    toast('\uD83D\uDCFB Hidden radio found!', 'rgba(200,180,255,0.85)', 3000);
  }

  /* ---------- 6. Konami Code ---------- */
  var konamiBuf = [];
  var KONAMI = [38,38,40,40,37,39,37,39,66,65];
  var devMode = false;
  function initKonami() {
    document.addEventListener('keydown', function(e) {
      konamiBuf.push(e.keyCode);
      if (konamiBuf.length > 10) konamiBuf.shift();
      if (konamiBuf.length === 10 && konamiBuf.every(function(v,i){return v===KONAMI[i];})) {
        konamiBuf = [];
        toggleDevMode();
      }
    });
  }
  function toggleDevMode() {
    devMode = !devMode;
    if (devMode) {
      toast('\uD83D\uDD25 Developer Sky Mode ACTIVATED', 'rgba(0,200,255,0.9)', 5000);
      document.body.style.boxShadow = 'inset 0 0 100px rgba(0,255,200,0.15)';
      // Apply a neon sky
      if (window.Skies && window.Skies.SKIES) {
        var neon = {gradient:[[0,"#000033"],[0.3,"#0a0a4a"],[0.6,"#151565"],[1,"#0a0a3a"]],stars:{count:200,maxY:100,minR:0.5,maxR:2.5},aurora:{colors:["rgba(0,255,200,.35)","rgba(255,0,200,.3)","rgba(0,200,255,.25)"],speed:0.08,band:100,thickness:80},name:'Developer Sky',message:'\u2728 You found the neon dimension \u2728'};
        window.Skies.SKIES.push(neon);
        window.Skies.apply(window.Skies.SKIES.length-1);
      }
    } else {
      toast('Dev mode deactivated', 'rgba(200,0,0,0.8)', 3000);
      document.body.style.boxShadow = 'none';
    }
  }

  /* ---------- 7. Lucky Star ---------- */
  function initLuckyStar() {
    // One random star per session
    if (config.luckyStar && config.luckyStar.found) return;
    var star = document.createElement('div');
    star.textContent = '\u2B50';
    star.style.cssText = 'position:fixed;z-index:9997;font-size:'+(14+Math.random()*10)+'px;cursor:pointer;pointer-events:auto;animation:luckyFloat 4s ease-in-out infinite;opacity:0.7;transition:all 0.3s;';
    star.style.left = (10+Math.random()*80)+'vw';
    star.style.top = (10+Math.random()*70)+'vh';
    star.title = 'A lucky star \u2728';
    star.addEventListener('click', function() {
      var msgs = ['\u2728 You found the lucky star!','\u2B50 The star whispers: you are loved','\uD83C\uDF1F Make a wish \u2728','\u2728 This star chose you today','\u2B50 \u201cYou are someone\'s favourite thought\u201d'];
      toast(msgs[Math.floor(Math.random()*msgs.length)], 'rgba(255,230,128,0.9)', 5000);
      star.style.transform = 'scale(2)';
      star.style.opacity = '0';
      setTimeout(function() { star.remove(); }, 1000);
      config.luckyStar.found = true;
      save();
    });
    document.body.appendChild(star);

    // Sparkle trail on hover
    star.addEventListener('mouseenter', function() {
      star.style.opacity = '1';
      star.style.transform = 'scale(1.3)';
    });
    star.addEventListener('mouseleave', function() {
      star.style.opacity = '0.7';
      star.style.transform = 'scale(1)';
    });
  }

  /* ---------- 8. Double Rainbow ---------- */
  var lastRainIdx = -1;
  function initDoubleRainbow() {
    // Hook into applySky to detect rain skies
    var origApply = window.Skies && window.Skies.apply;
    if (!origApply) return;
    window.Skies.apply = function(idx) {
      origApply(idx);
      var sky = window.Skies.SKIES[idx];
      if (sky) {
        var n = (sky.name||'').toLowerCase();
        var isRain = n.indexOf('rain')>=0||n.indexOf('storm')>=0||n.indexOf('shower')>=0;
        if (isRain && lastRainIdx !== idx && Math.random() < 0.2) {
          setTimeout(function() { showRainbow(false); }, 3000);
          if (Math.random() < 0.08) {
            setTimeout(function() { showRainbow(true); }, 4000);
          }
        }
        lastRainIdx = idx;
      }
    };
  }

  function showRainbow(double) {
    var r = document.createElement('div');
    r.style.cssText = 'position:fixed;bottom:3rem;left:50%;transform:translateX(-50%);z-index:9998;pointer-events:none;font-size:'+(double?'6rem':'3.5rem')+';opacity:0;transition:opacity 2s ease;animation:rainbowGlow 4s ease-in-out;';
    r.textContent = double?'\uD83C\uDF08\uD83C\uDF08':'\uD83C\uDF08';
    document.body.appendChild(r);
    requestAnimationFrame(function() { r.style.opacity = '1'; });
    setTimeout(function() {
      r.style.opacity = '0';
      setTimeout(function() { r.remove(); }, 2000);
    }, 5000);
    if (double) toast('\uD83C\uDF08 DOUBLE RAINBOW! \uD83C\uDF08', 'rgba(255,200,100,0.9)', 6000);
  }

  /* ---------- 9. Coffee Break ---------- */
  var coffeeTimer = null;
  function initCoffeeBreak() {
    var startTime = Date.now();
    coffeeTimer = setTimeout(function() {
      showCoffee();
    }, 20*60*1000); // 20 minutes

    document.addEventListener('click', function() {
      if (coffeeTimer) { clearTimeout(coffeeTimer); }
      // Reset: show coffee 20min from last interaction
      var elapsed = Date.now() - startTime;
      var remaining = Math.max(0, 20*60*1000 - elapsed);
      coffeeTimer = setTimeout(function() { showCoffee(); }, remaining);
    });
  }

  function showCoffee() {
    var cup = document.createElement('div');
    cup.innerHTML = '<div style="text-align:center;">' +
      '<div style="font-size:3rem;animation:coffeeBounce 1.5s ease-in-out infinite;">\u2615</div>' +
      '<p style="font-family:var(--font-display);color:var(--parchment);margin:0.5rem 0 0;font-size:0.9rem;">Time for a coffee break?</p>' +
      '<p style="font-size:0.75rem;color:var(--ash);margin:0.3rem 0 0;">You have been exploring for a while \u2728</p>' +
    '</div>';
    cup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:var(--ink-soft);border:1px solid var(--gold);border-radius:16px;padding:2rem;box-shadow:0 8px 40px rgba(0,0,0,.7);animation:fadeIn 0.5s ease;';
    cup.addEventListener('click', function() { cup.remove(); });
    document.body.appendChild(cup);
    setTimeout(function() {
      cup.style.opacity = '0';
      cup.style.transition = 'opacity 0.5s';
      setTimeout(function() { cup.remove(); }, 600);
    }, 8000);
  }

  /* ---------- 10. Progress Memories ---------- */
  function initProgress() {
    var el = document.createElement('div');
    el.id = 'obsProgress';
    el.style.cssText = 'position:fixed;bottom:5rem;left:1rem;z-index:100;background:var(--glass);border:1px solid var(--glassBorder);border-radius:12px;padding:0.7rem 1rem;backdrop-filter:blur(8px);font-size:0.75rem;max-width:200px;cursor:pointer;transition:all 0.3s;';
    el.addEventListener('mouseenter', function() { this.style.borderColor = 'var(--gold)'; });
    el.addEventListener('mouseleave', function() { this.style.borderColor = 'var(--glassBorder)'; });
    el.addEventListener('click', function() { window.location.href = 'stats.html'; });

    function updateProgress() {
      var pages = [
        {key:'100-organs',file:'100-organs.html',label:'100 Organs'},
        {key:'love',file:'love.html',label:'Love'},
        {key:'fantasies',file:'fantasies.html',label:'Fantasies'}
      ];
      var total = 0, viewed = 0;
      pages.forEach(function(p) {
        var vk = 'ash-viewed-' + p.file.replace(/[^a-z0-9]/gi,'_');
        try {
          var v = JSON.parse(localStorage.getItem(vk) || '[]');
          var count = parseInt(localStorage.getItem(vk+'_count') || '0');
          total += count;
          viewed += v.length;
        } catch(e) {}
      });
      var pct = total > 0 ? Math.min(100, Math.round(viewed/total*100)) : 0;
      el.innerHTML = '<div style="font-family:var(--font-display);color:var(--gold);margin-bottom:4px;">\uD83D\uDCD6 Progress</div>' +
        '<div style="color:var(--parchment-dim);">' + viewed + ' / ' + total + ' memories</div>' +
        '<div style="margin-top:4px;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">' +
          '<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,var(--gold),var(--ember));border-radius:2px;transition:width 0.6s ease;"></div>' +
        '</div>' +
        '<div style="font-size:0.6rem;color:var(--ash);margin-top:2px;">Click for details</div>';
    }
    updateProgress();
    document.body.appendChild(el);
    setInterval(updateProgress, 10000);
  }

  /* ---------- Toast helper ---------- */
  function toast(msg, bg, dur) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);z-index:99999;background:'+(bg||'rgba(0,0,0,0.85)')+';color:#ffebd2;padding:0.8rem 1.5rem;border-radius:10px;font-family:Lora,Georgia,serif;font-size:0.85rem;max-width:80vw;text-align:center;pointer-events:none;opacity:0;transition:opacity 0.4s;box-shadow:0 4px 20px rgba(0,0,0,.4);';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.style.opacity = '1'; });
    setTimeout(function(){ t.style.opacity = '0'; setTimeout(function(){ t.remove(); },500); }, dur||2500);
    return t;
  }

  /* ---------- Init ---------- */
  function init() {
    if (!window.Skies || !window.Skies.SKIES) { setTimeout(init, 100); return; }
    initUI();
    initBlackCat();
    initRealTime();
    initMoonCounter();
    initHiddenRadio();
    initKonami();
    initLuckyStar();
    initDoubleRainbow();
    initCoffeeBreak();
    initProgress();

    // CSS for lucky float, rainbow glow, coffee bounce
    var css = document.createElement('style');
    css.textContent = '@keyframes luckyFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}' +
      '@keyframes rainbowGlow{0%,100%{opacity:0;transform:translateX(-50%) scale(0.8)}20%,80%{opacity:1;transform:translateX(-50%) scale(1)}}' +
      '@keyframes coffeeBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}' +
      '@keyframes fadeIn{from{opacity:0;transform:translate(-50%,-50%) scale(0.9)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}';
    document.head.appendChild(css);

    // Expose for onclick
    window.SkyObservatory = { selectSky: selectSky };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
