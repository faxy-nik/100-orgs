/**
 * secret-letters.js — Hidden handwritten letters throughout the website.
 * Letters appear based on achievements. Collection book included.
 */
(function () {
  'use strict';
  if (window.FeatureFlags && !window.FeatureFlags.get('secret-letters')) return;

  var KEY = 'ash-secret-letters';
  var found;
  function load() { try { found = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { found = {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(found)); } catch(e) {} }
  load();

  var LETTERS = [
    { id:'l1', title:'The First Step', content:'The beginning of every journey is the hardest step. You took it. That alone is braver than most.', reason:'Visit any page to begin', cond:function(){ return true; } },
    { id:'l2', title:'Moonlight Whisper', content:'Under the same moon I think of you. Distance means nothing when two hearts share the same sky.', reason:'Click the moon 3 times', cond:function(){ return getObs('moonClicks')>=3; } },
    { id:'l3', title:'Lantern Prayer', content:'I release this lantern into the dark, hoping it finds you wherever you are. Every flame carries a wish.', reason:'Release 3 lanterns', cond:function(){ return parseInt(localStorage.getItem('ash-lanterns-released')||'0')>=3; } },
    { id:'l4', title:'Star Seeker', content:'Somewhere among those stars is a story written just for you. Keep looking up.', reason:'Visit the sky observatory 5 times', cond:function(){ return getSkies()>=5; } },
    { id:'l5', title:'Wings of Change', content:'The butterfly does not remember being a caterpillar. And yet, it flies. You will too.', reason:'Collect 3 feathers', cond:function(){ return getObs('feathers')&&getObs('feathers').count>=3; } },
    { id:'l6', title:'Dreamer\'s Promise', content:'Dreams are letters we write to ourselves in a language only the heart understands.', reason:'Visit the Dream page', cond:function(){ return document.querySelector('.dream-page')!==null || location.pathname.indexOf('dream')>=0; } },
    { id:'l7', title:'Garden of Stars', content:'Every star I planted in the sky bloomed into a memory of you.', reason:'Visit the sky observatory 10 times', cond:function(){ return getSkies()>=10; } },
    { id:'l8', title:'The Invisible Thread', content:'There is an invisible thread connecting every soul that has ever loved, lost, and loved again.', reason:'Make 5 wishes', cond:function(){ return getWishes()>=5; } },
    { id:'l9', title:'Feather Light', content:'The universe carries us like feathers on the wind. We float not because we are weightless, but because we are held.', reason:'Collect 8 feathers', cond:function(){ var f=getObs('feathers'); return f&&f.count>=8; } },
    { id:'l10', title:'Firefly Dance', content:'Fireflies are proof that even the smallest light can illuminate the darkest night.', reason:'Catch 10 fireflies', cond:function(){ return getObs('fireflies')&&getObs('fireflies').caught>=10; } },
    { id:'l11', title:'The Hidden Path', content:'Not all paths are mapped. Some reveal themselves only when you are ready to walk them.', reason:'Collect 3 fragments', cond:function(){ return getObs('fragments')&&getObs('fragments').length>=3; } },
    { id:'l12', title:'Echo of Yesterday', content:'Memories are echoes that never fade. They live in the spaces between heartbeats.', reason:'Visit the tree 5 times', cond:function(){ return getVisits()>=5; } },
    { id:'l13', title:'Songs Unspoken', content:'The most beautiful songs are the ones never sung — they exist in the silence between two people who understand each other.', reason:'Play 5 songs', cond:function(){ try{var m=JSON.parse(localStorage.getItem('musicState'));return m&&m.played>5;}catch(e){}return false; } },
    { id:'l14', title:'Reading Between Lines', content:'Every story you read here is a thread in a larger tapestry. Thank you for being part of it.', reason:'View 20 pages', cond:function(){ return getViewedCount()>=20; } },
    { id:'l15', title:'The Dragon\'s Gift', content:'Dragons guard treasure not because they are greedy, but because they know what is precious must be protected.', reason:'Meet the dragon', cond:function(){ return document.querySelector('#dragon, .dragon')!==null || !!localStorage.getItem('ash-dragon-met'); } },
    { id:'l16', title:'Constellation of Us', content:'If I could arrange the stars, I would write your name across the sky in a constellation that never sets.', reason:'Explore 15 places', cond:function(){ return getObs('recent')&&getObs('recent').length>=15; } },
    { id:'l17', title:'The Quiet Hour', content:'Somewhere between midnight and dawn, the world holds its breath. In that silence, I found peace.', reason:'Take a coffee break', cond:function(){ return getObs('coffeeAt')>0; } },
    { id:'l18', title:'Gratitude', content:'Thank you for being here. For reading. For caring. For making this world a little less lonely.', reason:'View 50 pages', cond:function(){ return getViewedCount()>=50; } },
    { id:'l19', title:'Butterfly Effect', content:'The flutter of a butterfly\'s wing can cause a storm on the other side of the world. Never underestimate small acts of love.', reason:'Add 5 favorites', cond:function(){ return getObs('favorites')&&getObs('favorites').length>=5; } },
    { id:'l20', title:'The Lighthouse', content:'Even when the fog is thick, even when the night is endless — I will be your lighthouse.', reason:'Visit the tree 10 times', cond:function(){ return getVisits()>=10; } },
    { id:'l21', title:'Fragments of Us', content:'Every broken piece finds its way home. Every fragment is part of a larger picture.', reason:'Collect 8 fragments', cond:function(){ return getObs('fragments')&&getObs('fragments').length>=8; } },
    { id:'l22', title:'Stargazer', content:'The universe is vast and cold, but between the stars there is warmth. You carry it with you.', reason:'Visit the sky observatory 20 times', cond:function(){ return getSkies()>=20; } },
    { id:'l23', title:'Roots and Wings', content:'Grow roots deep enough to weather any storm, and wings strong enough to chase every horizon.', reason:'Grow the tree to 50%', cond:function(){ var t=window.TreeOfMemories; return t&&t.getGrowth()>=50; } },
    { id:'l24', title:'The Gift', content:'The greatest gift is not what you hold, but who you hold close.', reason:'Catch 25 fireflies', cond:function(){ return getObs('fireflies')&&getObs('fireflies').caught>=25; } },
    { id:'l25', title:'Wanderer', content:'Not all who wander are lost. Some are just looking for the stars that fell to earth.', reason:'Release 5 balloons', cond:function(){ return getObs('balloonNotes')&&getObs('balloonNotes').length>=5; } },
    { id:'l26', title:'Eternal Spring', content:'In the garden of memory, it is always spring. The flowers never fade.', reason:'Make 15 wishes', cond:function(){ return getWishes()>=15; } },
    { id:'l27', title:'The Song of the Sky', content:'If you listen closely, the sky hums a melody older than time.', reason:'Find the lucky star', cond:function(){ return getObs('luckyStar')&&getObs('luckyStar').found; } },
    { id:'l28', title:'Home', content:'Home is not a place. It is a feeling. It is you.', reason:'Visit the tree 20 times', cond:function(){ return getVisits()>=20; } },
    { id:'l29', title:'The Last Firefly', content:'The last firefly of summer carries the light of every firefly that came before.', reason:'Catch 50 fireflies', cond:function(){ return getObs('fireflies')&&getObs('fireflies').caught>=50; } },
    { id:'l30', title:'To Eeshah', content:'This world exists because you do. Every star. Every word. Every breath. Thank you for being my everything.', reason:'View 100 pages and visit the tree 30 times', cond:function(){ return getViewedCount()>=100 && getVisits()>=30; } }
  ];

  function getObs(prop) {
    try { var o=JSON.parse(localStorage.getItem('ash-obs')); return o?o[prop]:null; } catch(e){ return null; }
  }
  function getSkies() {
    try{ var s=JSON.parse(localStorage.getItem('ash-sky-visited')); return s?s.length:0; }catch(e){ return 0; }
  }
  function getWishes() {
    try{ var w=JSON.parse(localStorage.getItem('ash-wish-journal')); return w?w.length:0; }catch(e){ return 0; }
  }
  function getVisits() {
    try{ var d=JSON.parse(localStorage.getItem('ash-tree-of-memories')); return d?d.visits||0:0; }catch(e){ return 0; }
  }
  function getViewedCount() {
    var total=0;
    try{ for(var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(k&&k.indexOf('ash-viewed-')===0){ total+=parseInt(localStorage.getItem(k+'_count')||'0'); } } }catch(e){}
    return total;
  }

  /* ---------- Discovery ---------- */
  function checkNewLetters() {
    var anyNew = false;
    LETTERS.forEach(function(L){
      if (found[L.id]) return;
      if (L.cond()) {
        found[L.id] = { foundAt: Date.now(), title: L.title };
        anyNew = true;
      }
    });
    if (anyNew) { save(); showNotification(); }
  }

  var notificationTimer = null;
  function showNotification() {
    if (notificationTimer) { clearTimeout(notificationTimer); document.querySelector('.letter-notif')&&document.querySelector('.letter-notif').remove(); }
    var n = document.createElement('div');
    n.className = 'letter-notif';
    n.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:999999;background:rgba(10,8,6,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,230,100,0.3);border-radius:12px;padding:12px 18px;color:#ffebd2;font-size:14px;cursor:pointer;transition:opacity 0.5s;max-width:280px;';
    n.innerHTML = '<span style="font-size:18px;">\uD83D\uDCEC</span> New letter discovered!<br><span style="font-size:11px;color:#ffe680;">Click to read</span>';
    n.addEventListener('click', function(){ n.remove(); openCollection(); });
    document.body.appendChild(n);
    notificationTimer = setTimeout(function(){ n.style.opacity='0'; setTimeout(function(){ n.remove(); }, 500); }, 6000);
  }

  /* ---------- Collection Book ---------- */
  function openCollection() {
    var existing = document.getElementById('letterCollection');
    if (existing) { existing.remove(); return; }

    load();
    var overlay = document.createElement('div');
    overlay.id = 'letterCollection';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:999999;background:rgba(10,8,6,0.8);backdrop-filter:blur(10px);display:flex;justify-content:center;align-items:center;';

    var panel = document.createElement('div');
    panel.style.cssText = 'background:rgba(20,16,12,0.95);border:1px solid rgba(255,230,100,0.2);border-radius:16px;padding:24px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;position:relative;color:#ffebd2;';
    panel.innerHTML = '<div style="font-size:20px;font-weight:bold;color:#ffe680;margin-bottom:12px;">\uD83D\uDCEC Secret Letters</div>' +
      '<div style="font-size:12px;color:#a09080;margin-bottom:16px;">Found '+Object.keys(found).length+' / '+LETTERS.length+' letters</div>';

    LETTERS.forEach(function(L){
      var f = found[L.id];
      var isFound = !!f;
      panel.innerHTML += '<div style="padding:10px 12px;margin-bottom:6px;border-radius:8px;background:'+(isFound?'rgba(255,230,100,0.08)':'rgba(255,255,255,0.03)')+';cursor:'+(isFound?'pointer':'default')+';border:1px solid '+(isFound?'rgba(255,230,100,0.15)':'rgba(255,255,255,0.05)')+';"'+
        ' onclick="'+(isFound?'document.getElementById(\'letterContent'+L.id+'\').style.display=document.getElementById(\'letterContent'+L.id+'\').style.display===\'block\'?\'none\':\'block\'':'')+'">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;">'+
        '<span style="font-weight:'+(isFound?'bold':'normal')+';'+(isFound?'':'color:#605040')+';">'+(isFound?'\uD83D\uDCEC ':'\uD83D\uDD12 ')+L.title+'</span>'+
        '<span style="font-size:11px;color:'+(isFound?'#ffe680':'#605040')+';">'+(!isFound?'???':new Date(f.foundAt).toLocaleDateString())+'</span>'+
        '</div>'+
        (!isFound?'<div style="font-size:10px;color:#807060;margin-top:2px;">'+L.reason+'</div>':'')+
        '<div id="letterContent'+L.id+'" style="display:none;margin-top:8px;padding:12px;background:rgba(0,0,0,0.3);border-radius:8px;font-style:italic;color:#ffe8d0;font-size:13px;line-height:1.6;">'+L.content+'</div>'+
        '</div>';
    });

    panel.innerHTML += '<div style="text-align:center;margin-top:16px;"><span style="font-size:11px;color:#a09080;">Progress: '+Math.round(Object.keys(found).length/LETTERS.length*100)+'%</span></div>' +
      '<div style="text-align:center;margin-top:12px;"><button onclick="document.getElementById(\'letterCollection\').remove()" style="background:rgba(255,230,100,0.15);border:1px solid rgba(255,230,100,0.3);color:#ffe680;padding:6px 18px;border-radius:20px;cursor:pointer;">Close</button></div>';

    overlay.appendChild(panel);
    panel.addEventListener('click', function(e){ e.stopPropagation(); });
    overlay.addEventListener('click', function(){ overlay.remove(); });
    document.body.appendChild(overlay);
  }

  /* ---------- Hint sparkles on page ---------- */
  function spawnHints() {
    var undiscoved = LETTERS.filter(function(L){ return !found[L.id] && L.cond(); });
    if (undiscoved.length === 0) return;

    // subtle indicator near left buttons
    var hint = document.createElement('div');
    hint.style.cssText = 'position:fixed;bottom:6.5rem;left:1rem;z-index:99997;font-size:10px;cursor:pointer;opacity:0.6;animation:hintGlow 2s ease-in-out infinite;background:rgba(10,8,6,0.3);border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;';
    hint.textContent = '\uD83D\uDCEC';
    hint.title = 'A letter awaits...';
    hint.addEventListener('click', function(){ hint.remove(); var L=undiscoved[0]; found[L.id]={foundAt:Date.now(),title:L.title}; save(); openCollection(); });
    document.body.appendChild(hint);

    if (!document.getElementById('letterHintStyle')) {
      var s = document.createElement('style');
      s.id = 'letterHintStyle';
      s.textContent = '@keyframes hintGlow { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }';
      document.head.appendChild(s);
    }
  }

  /* ---------- Init ---------- */
  function init() {
    if (/stats\.html$/i.test(window.location.pathname)) {
      // Still expose API on stats page for collection viewing, but don't spawn anything
      return;
    }
    checkNewLetters();
    spawnHints();
    // periodic check
    setInterval(checkNewLetters, 20000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 1500); });
  else setTimeout(init, 1500);

  window.SecretLetters = {
    check: checkNewLetters,
    openCollection: openCollection,
    count: function(){ return Object.keys(found).length; },
    total: function(){ return LETTERS.length; }
  };
})();
