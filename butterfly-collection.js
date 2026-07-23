/**
 * butterfly-collection.js — Butterflies that appear naturally on pages,
 * interact with the tree, companions, weather, and seasons.
 * 24 species with collection book.
 */
(function () {
  'use strict';

  var KEY = 'ash-butterflies';
  var data;
  function load() { try { data = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ data={}; } if(!data.discovered) data={discovered:{},species:{}}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){} }

  var SPECIES = [
    { id:'b1', name:'Sunflare', desc:'Golden wings that catch the morning light.', color:'#ffe680', wingShape:'round', rarity:'common', active:'day', flower:'sunflower', flight:'flutter' },
    { id:'b2', name:'Moonpetal', desc:'Pale silver like moonlight on petals.', color:'#c0c8e0', wingShape:'round', rarity:'common', active:'night', flower:'moonflower', flight:'glide' },
    { id:'b3', name:'Rosewhisper', desc:'Soft pink, barely there, like a blush.', color:'#ff8eb4', wingShape:'round', rarity:'common', active:'day', flower:'rose', flight:'flutter' },
    { id:'b4', name:'Skygazer', desc:'Blue as the summer sky at noon.', color:'#66bbff', wingShape:'wide', rarity:'common', active:'day', flower:'lavender', flight:'soar' },
    { id:'b5', name:'Emberwing', desc:'Crimson and orange like dying embers.', color:'#e85d3a', wingShape:'angular', rarity:'uncommon', active:'dusk', flower:'poppy', flight:'dart' },
    { id:'b6', name:'Frostvein', desc:'White with veins of frozen blue.', color:'#ddeeff', wingShape:'angular', rarity:'uncommon', active:'dawn', flower:'snowdrop', flight:'glide' },
    { id:'b7', name:'Velvetnight', desc:'Deep purple, almost black, with stars.', color:'#6a3a8a', wingShape:'wide', rarity:'uncommon', active:'night', flower:'nightshade', flight:'glide' },
    { id:'b8', name:'Goldleaf', desc:'Autumn captured in wing form.', color:'#d4a020', wingShape:'round', rarity:'uncommon', active:'day', flower:'marigold', flight:'flutter' },
    { id:'b9', name:'Coralflame', desc:'Vibrant coral, hot and bright.', color:'#ff6f5e', wingShape:'angular', rarity:'uncommon', active:'day', flower:'hibiscus', flight:'dart' },
    { id:'b10', name:'Mistdancer', desc:'Translucent grey that dances in fog.', color:'#a0a8b0', wingShape:'round', rarity:'uncommon', active:'dawn', flower:'lily', flight:'dance' },
    { id:'b11', name:'Jewelwing', desc:'Emerald green, faceted like a gem.', color:'#40b060', wingShape:'angular', rarity:'rare', active:'day', flower:'jade', flight:'dart' },
    { id:'b12', name:'Sapphiretide', desc:'Deep blue, flowing like ocean waves.', color:'#2a60c0', wingShape:'wide', rarity:'rare', active:'dusk', flower:'bluebell', flight:'soar' },
    { id:'b13', name:'Amberdrift', desc:'Honey-colored, slow and gentle.', color:'#c09030', wingShape:'round', rarity:'rare', active:'day', flower:'honeysuckle', flight:'glide' },
    { id:'b14', name:'Irisdream', desc:'Purple and violet, shifting in light.', color:'#8a5abe', wingShape:'wide', rarity:'rare', active:'dusk', flower:'iris', flight:'dance' },
    { id:'b15', name:'Peachbloom', desc:'Soft peach, like the first spring blossom.', color:'#ffb080', wingShape:'round', rarity:'rare', active:'day', flower:'cherry', flight:'flutter' },
    { id:'b16', name:'Stormbringer', desc:'Dark grey with lightning veins.', color:'#5a6080', wingShape:'angular', rarity:'rare', active:'rain', flower:'thistle', flight:'dart' },
    { id:'b17', name:'Aurora', desc:'Green and pink like the northern lights.', color:'#60d080', wingShape:'wide', rarity:'very-rare', active:'night', flower:'aurora', flight:'dance' },
    { id:'b18', name:'Sunsetwing', desc:'All the colors of dusk on one wing.', color:'#ff8844', wingShape:'wide', rarity:'very-rare', active:'dusk', flower:'sunset', flight:'soar' },
    { id:'b19', name:'Stardust', desc:'Tiny points of light on translucent wings.', color:'#ffe8aa', wingShape:'round', rarity:'very-rare', active:'night', flower:'starflower', flight:'dance' },
    { id:'b20', name:'Rainbow', desc:'Every color of the spectrum, rare and bright.', color:'#ff6b6b', wingShape:'wide', rarity:'very-rare', active:'day', flower:'rainbow', flight:'soar' },
    { id:'b21', name:'Ghostwing', desc:'Nearly invisible, seen only in shadow.', color:'#e0e0e8', wingShape:'angular', rarity:'legendary', active:'night', flower:'ghost', flight:'glide' },
    { id:'b22', name:'Phoenixflare', desc:'Red-gold, said to be born from ashes.', color:'#ff4400', wingShape:'angular', rarity:'legendary', active:'dawn', flower:'phoenix', flight:'dart' },
    { id:'b23', name:'Voidglimmer', desc:'Black with stars inside, like the cosmos.', color:'#1a0a2a', wingShape:'wide', rarity:'legendary', active:'night', flower:'void', flight:'dance' },
    { id:'b24', name:'Ethereal', desc:'Pure white with golden edges, celestial.', color:'#fff8ee', wingShape:'round', rarity:'mythic', active:'any', flower:'celestial', flight:'glide' }
  ];

  var rarityColors = { common:'#a0a080', uncommon:'#80a060', rare:'#6080c0', 'very-rare':'#c060a0', legendary:'#d4a020', mythic:'#ffe680' };

  /* ---------- Spawn butterflies ---------- */
  var activeButterflies = [];
  function spawnButterflies() {
    // determine how many based on rarity and conditions
    var count = Math.floor(Math.random() * 3) + 1;
    for (var i = 0; i < count; i++) {
      var species = pickSpecies();
      if (!species) continue;

      (function (capturedSpecies) {
        var el = document.createElement('div');
        el.className = 'butterfly-bg';
        el.style.cssText = 'position:fixed;z-index:99994;pointer-events:auto;cursor:pointer;width:18px;height:18px;opacity:0;transition:opacity 1s;';

        var c = document.createElement('canvas');
        c.width = 20; c.height = 16;
        drawButterfly(c, capturedSpecies.color, capturedSpecies.wingShape);
        el.appendChild(c);

        var startX = Math.random() * (window.innerWidth - 40) + 20;
        var startY = Math.random() * (window.innerHeight - 60) + 30;
        el.style.left = startX + 'px';
        el.style.top = startY + 'px';
        document.body.appendChild(el);

        setTimeout(function(){ el.style.opacity = '0.8'; }, 50);

        var speed = 2000 + Math.random() * 3000;
        var vertical = 30 + Math.random() * 30;
        var horizontal = 40 + Math.random() * 60;
        var flightFunc = getFlightFunc(capturedSpecies.flight, el);

        var interval = setInterval(function(){ if (!el.parentNode) { clearInterval(interval); return; } flightFunc(el, horizontal, vertical); }, speed);
        var timeout = setTimeout(function(){
          if (!el.parentNode) return;
          clearInterval(interval);
          el.style.opacity = '0';
          setTimeout(function(){ if (el.parentNode) el.remove(); }, 1000);
        }, 15000 + Math.random() * 10000);

        el.addEventListener('click', function(){
          discover(capturedSpecies.id);
          el.style.transform = 'scale(2) rotate(180deg)';
          el.style.opacity = '0';
          clearInterval(interval);
          clearTimeout(timeout);
          setTimeout(function(){ if (el.parentNode) el.remove(); }, 500);
        });

        activeButterflies.push({ el:el, interval:interval, timeout:timeout });
      })(species);
    }
  }

  function pickSpecies() {
    var eligible = SPECIES.filter(function(s){
      if (s.rarity === 'mythic' && Math.random() > 0.05) return false;
      return true;
    });
    if (eligible.length === 0) return null;

    // weight by rarity
    var weights = { common:50, uncommon:30, rare:15, 'very-rare':8, legendary:4, mythic:1 };
    var total = 0;
    eligible.forEach(function(s){ total += weights[s.rarity] || 10; });
    var r = Math.random() * total;
    for (var i = 0; i < eligible.length; i++) {
      r -= weights[eligible[i].rarity] || 10;
      if (r <= 0) return eligible[i];
    }
    return eligible[eligible.length - 1];
  }

  function getFlightFunc(type, el) {
    var x = parseFloat(el.style.left);
    var y = parseFloat(el.style.top);
    var vx = 0, vy = 0;

    return function(el, hRange, vRange) {
      var vw = window.innerWidth, vh = window.innerHeight;
      var cx = parseFloat(el.style.left) || vw/2;
      var cy = parseFloat(el.style.top) || vh/2;

      if (type === 'soar') {
        // smooth, wide circles
        vx += (Math.random() - 0.5) * 2; vy += (Math.random() - 0.5) * 1.5;
        vx *= 0.9; vy *= 0.9;
        el.style.transition = 'left 2s ease-in-out, top 2s ease-in-out';
        el.style.left = Math.max(10, Math.min(vw-30, cx + vx * 15)) + 'px';
        el.style.top = Math.max(10, Math.min(vh-30, cy + vy * 10)) + 'px';
      } else if (type === 'dance') {
        // erratic, zigzag
        el.style.transition = 'left 1s ease-in-out, top 1s ease-in-out';
        el.style.left = Math.max(10, Math.min(vw-30, cx + (Math.random()-0.5)*80)) + 'px';
        el.style.top = Math.max(10, Math.min(vh-30, cy + (Math.random()-0.5)*50)) + 'px';
      } else if (type === 'dart') {
        // fast, straight lines
        el.style.transition = 'left 0.8s ease-in, top 0.8s ease-in';
        el.style.left = Math.max(10, Math.min(vw-30, cx + (Math.random()-0.5)*120)) + 'px';
        el.style.top = Math.max(10, Math.min(vh-30, cy + (Math.random()-0.5)*40)) + 'px';
      } else if (type === 'glide') {
        // slow, drifting
        el.style.transition = 'left 3s ease-in-out, top 3s ease-in-out';
        el.style.left = Math.max(10, Math.min(vw-30, cx + (Math.random()-0.5)*50)) + 'px';
        el.style.top = Math.max(10, Math.min(vh-30, cy + (Math.random()-0.5)*30 + Math.sin(Date.now()/2000)*10)) + 'px';
      } else {
        // flutter (default) — gentle bobbing
        el.style.transition = 'left 2.5s ease-in-out, top 2.5s ease-in-out';
        el.style.left = Math.max(10, Math.min(vw-30, cx + (Math.random()-0.5)*60)) + 'px';
        el.style.top = Math.max(10, Math.min(vh-30, cy + (Math.random()-0.5)*40 + Math.sin(Date.now()/1000)*8)) + 'px';
      }
    };
  }

  function drawButterfly(canvas, color, shape) {
    var ctx = canvas.getContext('2d');
    var w = 20, h = 16;
    ctx.clearRect(0, 0, w, h);

    var dark = darken(color);
    // left wing
    ctx.beginPath();
    if (shape === 'angular') {
      ctx.moveTo(10, 8); ctx.lineTo(0, 0); ctx.lineTo(2, 8); ctx.lineTo(0, 16); ctx.closePath();
    } else if (shape === 'wide') {
      ctx.moveTo(10, 8); ctx.quadraticCurveTo(0, -2, 2, 8); ctx.quadraticCurveTo(0, 18, 10, 8);
    } else {
      ctx.ellipse(5, 8, 5, 7, 0, 0, Math.PI*2);
    }
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 0.5; ctx.stroke();

    // right wing
    ctx.beginPath();
    if (shape === 'angular') {
      ctx.moveTo(10, 8); ctx.lineTo(20, 0); ctx.lineTo(18, 8); ctx.lineTo(20, 16); ctx.closePath();
    } else if (shape === 'wide') {
      ctx.moveTo(10, 8); ctx.quadraticCurveTo(20, -2, 18, 8); ctx.quadraticCurveTo(20, 18, 10, 8);
    } else {
      ctx.ellipse(15, 8, 5, 7, 0, 0, Math.PI*2);
    }
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 0.5; ctx.stroke();

    // body
    ctx.fillStyle = '#2a1a00';
    ctx.fillRect(9.5, 5, 1, 6);
    ctx.beginPath(); ctx.arc(10, 4, 1.5, 0, Math.PI*2); ctx.fill();
    // antennae
    ctx.strokeStyle = '#2a1a00'; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(9, 3); ctx.lineTo(6, 0); ctx.moveTo(11, 3); ctx.lineTo(14, 0); ctx.stroke();
  }

  function darken(hex) {
    var r = parseInt(hex.slice(1,3),16)-40, g = parseInt(hex.slice(3,5),16)-40, b = parseInt(hex.slice(5,7),16)-40;
    return 'rgb('+Math.max(0,r)+','+Math.max(0,g)+','+Math.max(0,b)+')';
  }

  /* ---------- Discovery ---------- */
  function discover(id) {
    load();
    if (!data.discovered[id]) {
      data.discovered[id] = { count:1, first:Date.now() };
      save();
      showDiscoverToast(id);
    } else {
      data.discovered[id].count++;
      save();
    }
  }

  function showDiscoverToast(id) {
    var s = SPECIES.find(function(x){ return x.id === id; });
    if (!s) return;
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:30%;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(10,8,6,0.9);backdrop-filter:blur(8px);border:1px solid '+rarityColors[s.rarity]+';border-radius:12px;padding:16px 24px;color:#ffebd2;text-align:center;transition:opacity 0.5s;';
    t.innerHTML = '<div style="font-size:12px;color:'+rarityColors[s.rarity]+';text-transform:uppercase;margin-bottom:4px;">'+s.rarity+'</div>'+
      '<div style="font-size:18px;margin-bottom:4px;">\uD83E\uDD8B '+s.name+'</div>'+
      '<div style="font-size:12px;color:#a09080;">'+s.desc+'</div>';
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); }, 500); }, 3000);
  }

  /* ---------- Collection Book ---------- */
  function openCollection() {
    var existing = document.getElementById('butterflyCollection');
    if (existing) { existing.remove(); return; }
    load();
    var overlay = document.createElement('div');
    overlay.id = 'butterflyCollection';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:999999;background:rgba(10,8,6,0.8);backdrop-filter:blur(10px);display:flex;justify-content:center;align-items:center;';

    var panel = document.createElement('div');
    panel.style.cssText = 'background:rgba(20,16,12,0.95);border:1px solid rgba(255,230,100,0.2);border-radius:16px;padding:24px;max-width:550px;width:90%;max-height:80vh;overflow-y:auto;position:relative;color:#ffebd2;';

    var foundCount = Object.keys(data.discovered).length;
    panel.innerHTML = '<div style="font-size:20px;font-weight:bold;color:#ffe680;margin-bottom:12px;">\uD83E\uDD8B Butterfly Collection</div>'+
      '<div style="font-size:12px;color:#a09080;margin-bottom:16px;">Found '+foundCount+' / '+SPECIES.length+' species</div>';

    SPECIES.forEach(function(s){
      var d = data.discovered[s.id];
      var found = !!d;
      panel.innerHTML += '<div style="display:flex;align-items:center;padding:8px 10px;margin-bottom:4px;border-radius:8px;background:'+(found?'rgba(255,230,100,0.06)':'rgba(255,255,255,0.02)')+';border:1px solid '+(found?rarityColors[s.rarity]:'rgba(255,255,255,0.05)')+';'+(!found?'filter:grayscale(1)opacity(0.4)':'')+'">'+
        '<div style="width:40px;height:30px;display:flex;align-items:center;justify-content:center;margin-right:12px;">'+
        '<span style="font-size:20px;">'+(found?'\uD83E\uDD8B':'?')+'</span></div>'+
        '<div style="flex:1;"><div style="font-weight:'+(found?'bold':'normal')+';'+(found?'':'color:#605040')+';">'+(found?s.name:'???')+'</div>'+
        '<div style="font-size:10px;color:'+(found?'#a09080':'#504030')+';">'+(found?s.desc:'Undiscovered')+'</div></div>'+
        '<div style="text-align:right;"><div style="font-size:10px;color:'+rarityColors[s.rarity]+';">'+s.rarity+(d&&d.count>1?' (\u00D7'+d.count+')':'')+'</div>'+
        (found?'<div style="font-size:9px;color:#605040;">'+new Date(d.first).toLocaleDateString()+'</div>':'')+'</div></div>';
    });

    panel.innerHTML += '<div style="text-align:center;margin-top:12px;"><button onclick="document.getElementById(\'butterflyCollection\').remove()" style="background:rgba(255,230,100,0.15);border:1px solid rgba(255,230,100,0.3);color:#ffe680;padding:6px 18px;border-radius:20px;cursor:pointer;">Close</button></div>';

    overlay.appendChild(panel);
    panel.addEventListener('click', function(e){ e.stopPropagation(); });
    overlay.addEventListener('click', function(){ overlay.remove(); });
    document.body.appendChild(overlay);
  }

  /* ---------- Init ---------- */
  function init() {
    if (/stats\.html$/i.test(window.location.pathname)) return;
    load();
    spawnButterflies();
    setInterval(spawnButterflies, 20000);
    // periodic rotation
    setInterval(function(){
      activeButterflies.forEach(function(b){
        if (b.el.parentNode && Math.random() < 0.3) {
          b.el.style.opacity = '0';
          setTimeout(function(){ if (b.el.parentNode) { b.el.remove(); clearInterval(b.interval); clearTimeout(b.timeout); } }, 500);
        }
      });
      activeButterflies = activeButterflies.filter(function(b){ return b.el.parentNode !== null; });
    }, 30000);
  }

  var styleAdded = false;
  if (!styleAdded) {
    var s = document.createElement('style');
    s.textContent = '.butterfly-bg canvas { display:block; } @keyframes butterflyFlutter { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }';
    document.head.appendChild(s);
    styleAdded = true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 2000); });
  else setTimeout(init, 2000);

  window.ButterflyCollection = {
    openCollection: openCollection,
    count: function(){ load(); return Object.keys(data.discovered).length; },
    total: function(){ return SPECIES.length; }
  };
})();
