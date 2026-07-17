(function () {
  var SKY_KEY = 'ash-jukebox-sky';
  var MSG_KEY = 'ash-jukebox-sky-msg';
  var msgEl = null;

  var SKIES = [
    {
      name: 'Sunrise',
      css: '\
        background: linear-gradient(180deg, #ff7e5f 0%, #feb47b 35%, #ffe29f 60%, #fff5e6 100%);\
        background-attachment: fixed;\
      ',
      message: 'Like the first light you brought into my world \u2661',
      extra: '\
        <div class="sky-sun" style="position:fixed;top:5%;left:50%;transform:translateX(-50%);width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,#fff8e0,#ffcc33 60%,transparent 70%);box-shadow:0 0 60px rgba(255,200,50,.5),0 0 120px rgba(255,200,50,.2);pointer-events:none;z-index:0;"></div>\
        <div class="sky-ray" style="position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 50% 10%,rgba(255,200,100,.12),transparent 60%);pointer-events:none;z-index:0;"></div>\
      '
    },
    {
      name: 'Sunset',
      css: '\
        background: linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 20%, #e85d3a 50%, #ff9a56 70%, #ffd3a5 100%);\
        background-attachment: fixed;\
      ',
      message: 'Even endings are beautiful when I think of you \u2661',
      extra: '\
        <div class="sky-sun" style="position:fixed;bottom:8%;left:50%;transform:translateX(-50%);width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,#ffe680,#e85d3a 60%,transparent 70%);box-shadow:0 0 80px rgba(232,93,58,.6),0 0 160px rgba(232,93,58,.3);pointer-events:none;z-index:0;"></div>\
      '
    },
    {
      name: 'Rain',
      css: '\
        background: linear-gradient(180deg, #2c3e50 0%, #4a6274 30%, #6b8599 60%, #889aaa 100%);\
        background-attachment: fixed;\
      ',
      message: 'Every drop carries a memory of you \u2661',
      extra: '\
        <div class="sky-rain" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-rain");for(var i=0;i<60;i++){var d=document.createElement("div");d.style.cssText="position:absolute;top:"+(Math.random()*100)+"%;left:"+(Math.random()*100)+"%;width:1px;height:"+(10+Math.random()*25)+"px;background:rgba(180,200,220,"+(.2+Math.random()*.3)+");animation:rainDrop "+(.5+Math.random()*.8)+"s linear infinite;animation-delay:"+(Math.random()*2)+"s";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes rainDrop{0%{transform:translateY(-30px)}100%{transform:translateY(100vh)}";document.head.appendChild(s)})();\
        </script>\
      '
    },
    {
      name: 'Clouds',
      css: '\
        background: linear-gradient(180deg, #b8c6d4 0%, #d4e1ec 40%, #e8f0f6 70%, #f0f5f9 100%);\
        background-attachment: fixed;\
      ',
      message: 'My thoughts of you drift like clouds, endless \u2661',
      extra: '\
        <div class="sky-clouds" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-clouds");for(var i=0;i<5;i++){var d=document.createElement("div");var s=80+Math.random()*200;d.style.cssText="position:absolute;top:"+(5+Math.random()*30)+"%;left:"+(Math.random()*120-10)+"%;width:"+s+"px;height:"+(s/3)+"px;border-radius:50%;background:rgba(255,255,255,"+(.4+Math.random()*.4)+");filter:blur("+(15+Math.random()*20)+"px);animation:cloudDrift "+(20+Math.random()*30)+"s linear infinite;animation-delay:-"+(Math.random()*30)+"s";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes cloudDrift{0%{transform:translateX(-30%)}100%{transform:translateX(130%)}";document.head.appendChild(s)})();\
        </script>\
      '
    },
    {
      name: 'Starry Night',
      css: '\
        background: linear-gradient(180deg, #0a0a1a 0%, #12122e 30%, #1a1a3e 60%, #0d0d2b 100%);\
        background-attachment: fixed;\
      ',
      message: 'You are every star that lights my darkest nights \u2661',
      extra: '\
        <div class="sky-stars" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-stars");for(var i=0;i<100;i++){var d=document.createElement("div");var sz=.5+Math.random()*2.5;d.style.cssText="position:absolute;top:"+(Math.random()*80)+"%;left:"+(Math.random()*100)+"%;width:"+sz+"px;height:"+sz+"px;border-radius:50%;background:white;box-shadow:0 0 "+(sz*3)+"px rgba(255,255,255,.5);animation:twinkle "+(1+Math.random()*3)+"s ease-in-out infinite alternate;animation-delay:"+(Math.random()*3)+"s";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes twinkle{0%{opacity:.2}100%{opacity:1}";document.head.appendChild(s);\
        var m=document.createElement("div");m.style.cssText="position:fixed;top:12%;right:12%;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle at 40% 40%,#fff8e0,transparent 60%);box-shadow:-15px -10px 30px rgba(255,255,200,.15);pointer-events:none;z-index:1";c.parentNode.appendChild(m)})();\
        </script>\
      '
    },
    {
      name: 'Storm',
      css: '\
        background: linear-gradient(180deg, #1a1a2e 0%, #2d2d44 30%, #3d3d5c 60%, #2a2a3e 100%);\
        background-attachment: fixed;\
      ',
      message: 'Even in chaos, you are my calm \u2661',
      extra: '\
        <div class="sky-storm" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-storm");for(var i=0;i<40;i++){var d=document.createElement("div");d.style.cssText="position:absolute;top:"+(Math.random()*100)+"%;left:"+(Math.random()*100)+"%;width:1px;height:"+(15+Math.random()*35)+"px;background:rgba(200,200,255,"+(.3+Math.random()*.3)+");transform:rotate("+(10+Math.random()*20)+"deg);animation:stormRain "+(.3+Math.random()*.5)+"s linear infinite;animation-delay:"+(Math.random()*2)+"s";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes stormRain{0%{transform:translateY(-40px) rotate("+(10+Math.random()*10)+"deg)}100%{transform:translateY(100vh) rotate("+(10+Math.random()*10)+"deg)}";document.head.appendChild(s);\
        setInterval(function(){var f=document.createElement("div");f.style.cssText="position:fixed;top:"+(Math.random()*30+10)+"%;left:"+(Math.random()*80+10)+"%;width:120px;height:3px;background:rgba(255,255,255,.8);border-radius:50%;filter:blur(2px);box-shadow:0 0 30px rgba(255,255,255,.3);pointer-events:none;z-index:1;opacity:0;transition:opacity .05s";c.appendChild(f);requestAnimationFrame(function(){f.style.opacity=1;setTimeout(function(){f.style.opacity=0;setTimeout(function(){f.remove()},200)},100)})},3000+Math.random()*4000)})();\
        </script>\
      '
    },
    {
      name: 'Aurora',
      css: '\
        background: linear-gradient(180deg, #0a0a1a 0%, #0f1a2e 30%, #0a1a1a 60%, #0a0a1a 100%);\
        background-attachment: fixed;\
      ',
      message: 'You paint my sky with colours I never knew existed \u2661',
      extra: '\
        <div class="sky-aurora" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-aurora");var colors=["rgba(0,255,128,.15)","rgba(0,200,255,.12)","rgba(100,50,200,.1)","rgba(0,255,100,.08)"];for(var i=0;i<6;i++){var d=document.createElement("div");var w=200+Math.random()*400;d.style.cssText="position:absolute;top:"+(10+Math.random()*30)+"%;left:"+(Math.random()*120-10)+"%;width:"+w+"px;height:"+(40+Math.random()*80)+"px;border-radius:50%;background:"+colors[i%colors.length]+";filter:blur("+(30+Math.random()*40)+"px);animation:auroraDrift "+(8+Math.random()*12)+"s ease-in-out infinite alternate;animation-delay:"+(Math.random()*5)+"s";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes auroraDrift{0%{transform:translateX(-10%) scaleX(1)}50%{transform:translateX(10%) scaleX(1.2)}100%{transform:translateX(-5%) scaleX(.8)}";document.head.appendChild(s);\
        var stars=document.createElement("div");stars.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:0";c.parentNode.appendChild(stars);for(var i=0;i<40;i++){var st=document.createElement("div");st.style.cssText="position:absolute;top:"+(Math.random()*90)+"%;left:"+(Math.random()*100)+"%;width:1px;height:1px;background:rgba(255,255,255,.5);border-radius:50%;animation:twinkleA "+(2+Math.random()*3)+"s ease-in-out infinite alternate";stars.appendChild(st)}var s2=document.createElement("style");s2.textContent="@keyframes twinkleA{0%{opacity:.1}100%{opacity:.8}";document.head.appendChild(s2)})();\
        </script>\
      '
    },
    {
      name: 'Fog',
      css: '\
        background: linear-gradient(180deg, #b0b8c0 0%, #c8ced4 30%, #d8dce0 60%, #e0e4e8 100%);\
        background-attachment: fixed;\
      ',
      message: 'I\u2019d wander through a thousand mists just to find you \u2661',
      extra: '\
        <div class="sky-fog" style="position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;"></div>\
        <script>\
          (function(){var c=document.querySelector(".sky-fog");for(var i=0;i<4;i++){var d=document.createElement("div");d.style.cssText="position:absolute;top:"+(20+Math.random()*60)+"%;left:"+(Math.random()*100)+"%;width:"+(300+Math.random()*400)+"px;height:"+(80+Math.random()*120)+"px;border-radius:50%;background:rgba(255,255,255,"+(.15+Math.random()*.15)+");filter:blur("+(40+Math.random()*30)+"px);animation:fogDrift "+(15+Math.random()*20)+"s linear infinite alternate";c.appendChild(d)}var s=document.createElement("style");s.textContent="@keyframes fogDrift{0%{transform:translateX(-20%)}100%{transform:translateX(20%)}";document.head.appendChild(s)})();\
        </script>\
      '
    },
    {
      name: 'Clear Day',
      css: '\
        background: linear-gradient(180deg, #4facfe 0%, #87cefa 40%, #b0d4f1 70%, #d4e8f7 100%);\
        background-attachment: fixed;\
      ',
      message: 'With you, every day is clear and bright \u2661',
      extra: '\
        <div class="sky-clear" style="position:fixed;top:6%;right:10%;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,#fff8e0,#ffdd44 60%,transparent 70%);box-shadow:0 0 50px rgba(255,220,50,.4),0 0 100px rgba(255,220,50,.15);pointer-events:none;z-index:0;"></div>\
      '
    },
    {
      name: 'Twilight',
      css: '\
        background: linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 25%, #5b2c56 50%, #b85d6e 70%, #e8a87c 100%);\
        background-attachment: fixed;\
      ',
      message: 'Between day and night, you are my only thought \u2661',
      extra: '\
        <div class="sky-twilight" style="position:fixed;top:12%;right:15%;width:35px;height:35px;border-radius:50%;background:radial-gradient(circle at 60% 60%,#fff8e0,transparent 60%);box-shadow:3px 3px 20px rgba(255,255,200,.1);pointer-events:none;z-index:0;"></div>\
        <div style="position:fixed;inset:0;background:radial-gradient(ellipse at 50% 70%,rgba(200,100,80,.08),transparent 50%);pointer-events:none;z-index:0;"></div>\
      '
    }
  ];

  function showSkyMessage(sky) {
    if (msgEl) { msgEl.remove(); msgEl = null; }
    msgEl = document.createElement('div');
    msgEl.id = 'skyMsg';
    msgEl.textContent = sky.message;
    msgEl.style.cssText = '\
      position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);\
      font-family:Fraunces,Georgia,serif;font-size:1rem;font-style:italic;\
      color:#ffe680;text-shadow:0 2px 12px rgba(0,0,0,.6);\
      text-align:center;pointer-events:none;z-index:10000;\
      opacity:1;transition:opacity 2s ease;\
      max-width:80vw;white-space:nowrap;\
    ';
    document.body.appendChild(msgEl);
    setTimeout(function () {
      if (msgEl) { msgEl.style.opacity = '0'; }
    }, 6000);
    setTimeout(function () {
      if (msgEl) { msgEl.remove(); msgEl = null; }
    }, 8000);
  }

  function applySky(index) {
    var sky = SKIES[index];
    var html = document.documentElement;

    html.style.cssText = sky.css;
    document.body.style.background = 'transparent';

    var container = document.getElementById('skyOverlay');
    if (!container) {
      container = document.createElement('div');
      container.id = 'skyOverlay';
      container.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;transition:opacity 1s ease;';
      document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = '';

    if (sky.extra) {
      var extraDiv = document.createElement('div');
      extraDiv.innerHTML = sky.extra;
      while (extraDiv.firstChild) container.appendChild(extraDiv.firstChild);
      var scripts = container.querySelectorAll('script');
      for (var i = 0; i < scripts.length; i++) {
        var s = document.createElement('script');
        s.textContent = scripts[i].textContent;
        scripts[i].parentNode.removeChild(scripts[i]);
        document.body.appendChild(s);
        document.body.removeChild(s);
      }
    }

    showSkyMessage(sky);
    try { localStorage.setItem(SKY_KEY, index); } catch (e) {}
  }

  function randomSky() {
    var idx = Math.floor(Math.random() * SKIES.length);
    applySky(idx);
  }

  function getCurrentSkyIndex() {
    try { var v = localStorage.getItem(SKY_KEY); return v !== null ? parseInt(v) : -1; } catch (e) { return -1; }
  }

  function createSkyButton(container) {
    var btn = document.createElement('button');
    btn.id = 'skyBtn';
    btn.textContent = '\uD83C\uDF26\uFE0F';
    btn.title = 'Change the sky';
    btn.style.cssText = '\
      background:rgba(255,220,160,.08);border:1px solid rgba(255,210,150,.15);\
      color:#6b5f52;padding:.4rem .9rem;border-radius:6px;\
      cursor:pointer;font-family:inherit;font-size:.8rem;\
      transition:all .25s;\
    ';
    btn.addEventListener('mouseenter', function () {
      this.style.borderColor = '#ffe680'; this.style.color = '#ffe680';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.borderColor = 'rgba(255,210,150,.15)'; this.style.color = '#6b5f52';
    });
    btn.addEventListener('click', randomSky);
    container.appendChild(btn);
    return btn;
  }

  window.Skies = {
    SKIES: SKIES,
    apply: applySky,
    random: randomSky,
    getCurrent: getCurrentSkyIndex,
    createButton: createSkyButton
  };

  var saved = getCurrentSkyIndex();
  if (saved >= 0 && saved < SKIES.length) {
    applySky(saved);
  }
})();
