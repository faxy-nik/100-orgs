(function () {
  var STORAGE_KEY = 'ash-puzzle-progress';

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }

  var progress = loadProgress();

  function currentStep(puzzle) {
    var pz = progress[puzzle.id] || 0;
    return Math.min(pz, puzzle.steps.length);
  }

  function isSolved(puzzle) {
    return currentStep(puzzle) >= puzzle.steps.length;
  }

  function loadAllPuzzles() {
    return FB.get('project-puzzles', 'list').then(function (data) {
      return { list: toArray(data) };
    });
  }

  function checkAutoClues() {
    if (typeof FB === 'undefined') return;
    loadAllPuzzles().then(function (data) {
      if (!data || !data.list) return;
      for (var pi = 0; pi < data.list.length; pi++) {
        var puzzle = data.list[pi];
        var pz = progress[puzzle.id] || 0;
        for (var si = pz; si < puzzle.steps.length; si++) {
          var step = puzzle.steps[si];
          if (step.auto && step.auto.type === 'page-visit' && step.auto.page === getCurrentPage()) {
            if (!progress[puzzle.id]) progress[puzzle.id] = 0;
            progress[puzzle.id] = Math.max(progress[puzzle.id], si + 1);
            changed = true;
          }
          if (step.auto && step.auto.type === 'section-view' && step.auto.sectionIdx !== undefined) {
            try {
              var viewed = JSON.parse(localStorage.getItem('ash-section-viewed') || '{}');
              if (viewed[step.auto.sectionIdx]) {
                if (!progress[puzzle.id]) progress[puzzle.id] = 0;
                progress[puzzle.id] = Math.max(progress[puzzle.id], si + 1);
                changed = true;
              }
            } catch (e) {}
          }
        }
      }
      if (changed) {
        saveProgress(progress);
        renderPuzzlePanel();
      }
    }).catch(function () {});
  }

  function getCurrentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function submitAnswer(puzzleId, stepIdx, answer) {
    loadAllPuzzles().then(function (data) {
      if (!data || !data.list) return;
      var puzzle = null;
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].id === puzzleId) { puzzle = data.list[i]; break; }
      }
      if (!puzzle || !puzzle.steps[stepIdx]) return;
      var step = puzzle.steps[stepIdx];
      if (answer.trim().toLowerCase() === (step.answer || '').toLowerCase()) {
        if (!progress[puzzleId]) progress[puzzleId] = 0;
        progress[puzzleId] = Math.max(progress[puzzleId], stepIdx + 1);
        saveProgress(progress);
        renderPuzzlePanel();
        if (isSolved(puzzle)) {
          toast('\uD83C\uDF89 Puzzle "' + puzzle.title + '" solved!');
        } else {
          toast(step.successMsg || 'Correct!');
        }
      } else {
        toast(step.failMsg || 'Not quite, try again.');
      }
    }).catch(function () {});
  }

  var panel = null;
  function openPuzzlePanel() {
    var body = document.getElementById('ash-puzzle-body');
    if (!body) return;
    body.style.display = 'block';
    loadAllPuzzles().then(function (data) {
      if (data && data.list) renderPuzzleBody(data.list);
    }).catch(function (e) { console.error('[PuzzleHunt] load error:', e); });
  }
  function createPuzzleBtn() {
    if (document.getElementById('puzzleBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'puzzleBtn';
    btn.setAttribute('aria-label', 'Open treasure hunt');
    btn.innerHTML = '\uD83D\uDD11';
    document.body.appendChild(btn);
    btn.addEventListener('click', function () {
      var body = document.getElementById('ash-puzzle-body');
      if (!body) return;
      if (body.style.display === 'block') { body.style.display = 'none'; return; }
      openPuzzlePanel();
    });
    btn.classList.add('show');
  }
  function renderPuzzlePanel() {
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'ash-puzzle-panel';
      panel.style.cssText = 'position:fixed;bottom:80px;right:16px;z-index:9999;max-width:320px;width:90%;background:#1c181a;border:1px solid rgba(255,210,150,.15);border-radius:12px;padding:0;display:none;box-shadow:0 8px 32px rgba(0,0,0,.4);';
      panel.innerHTML = '<div style="padding:.75rem 1rem;border-bottom:1px solid rgba(255,210,150,.08);cursor:pointer;display:flex;align-items:center;justify-content:space-between;" id="ash-puzzle-toggle">' +
        '<span style="color:#ffe680;font-size:.85rem;font-weight:600;">\uD83E\uDDE9 Treasure Hunt</span>' +
        '<span style="color:#6b5f52;font-size:.7rem;" id="ash-puzzle-count"></span>' +
      '</div><div id="ash-puzzle-body" style="padding:1rem;max-height:400px;overflow-y:auto;display:none;"></div>';
      document.body.appendChild(panel);
      document.getElementById('ash-puzzle-toggle').addEventListener('click', function () {
        var bd = document.getElementById('ash-puzzle-body');
        if (bd.style.display === 'block') { bd.style.display = 'none'; return; }
        openPuzzlePanel();
      });
    }
    createPuzzleBtn();
    loadAllPuzzles().then(function (data) {
      if (!data || !data.list || !data.list.length) { panel.style.display = 'none'; return; }
      panel.style.display = 'block';
      var total = 0, solved = 0;
      for (var i = 0; i < data.list.length; i++) {
        total++;
        if (isSolved(data.list[i])) solved++;
      }
      document.getElementById('ash-puzzle-count').textContent = solved + '/' + total + ' solved';
    }).catch(function (e) { console.error('[PuzzleHunt] render error:', e); });
  }

  function renderPuzzleBody(puzzles) {
    var body = document.getElementById('ash-puzzle-body');
    if (!body) return;
    var html = '';
    for (var i = 0; i < puzzles.length; i++) {
      var p = puzzles[i];
      var stepIdx = currentStep(p);
      var done = isSolved(p);
      html += '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,210,150,.06);">' +
        '<div style="color:' + (done ? '#6fcf93' : '#ffe680') + ';font-size:.85rem;font-weight:600;margin-bottom:4px;">' +
        (done ? '\u2713 ' : '\uD83D\uDD11 ') + (p.title || 'Puzzle') + '</div>';
      if (done) {
        html += '<div style="color:#6fcf93;font-size:.8rem;">Solved!</div>';
      } else {
        var step = p.steps[stepIdx];
        if (step) {
          html += '<div style="color:#d4c5b2;font-size:.8rem;margin-bottom:6px;">Step ' + (stepIdx + 1) + '/' + p.steps.length + '</div>';
          if (step.hint) html += '<div style="color:#ffe68088;font-size:.75rem;margin-bottom:6px;font-style:italic;">\uD83D\uDD0D ' + step.hint + '</div>';
          html += '<div style="display:flex;gap:4px;"><input type="text" id="ash-pz-ans-' + p.id + '" placeholder="Your answer..." style="flex:1;padding:.35rem .5rem;border-radius:6px;background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.15);color:#ffebd2;font-family:inherit;font-size:.8rem;outline:none;">' +
            '<button class="ash-pz-submit" data-pz="' + p.id + '" data-step="' + stepIdx + '" style="padding:.35rem .6rem;border-radius:6px;background:rgba(255,230,128,.1);border:1px solid #ffe68055;color:#ffe680;cursor:pointer;font-size:.75rem;">Go</button></div>';
        }
      }
      html += '</div>';
    }
    if (!puzzles.length) html = '<div style="color:#6b5f52;font-size:.8rem;text-align:center;">No puzzles yet.</div>';
    body.innerHTML = html;
    body.querySelectorAll('.ash-pz-submit').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pzId = this.dataset.pz;
        var step = parseInt(this.dataset.step, 10);
        var input = document.getElementById('ash-pz-ans-' + pzId);
        submitAnswer(pzId, step, input ? input.value : '');
      });
    });
    body.querySelectorAll('input[id^="ash-pz-ans-"]').forEach(function (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var id = this.id.replace('ash-pz-ans-', '');
          var btn = body.querySelector('.ash-pz-submit[data-pz="' + id + '"]');
          if (btn) btn.click();
        }
      });
    });
  }

  function init() {
    if (typeof FB !== 'undefined' && FB.init) FB.init();
    checkAutoClues();
    renderPuzzlePanel();
    setInterval(checkAutoClues, 10000);
    setInterval(renderPuzzlePanel, 15000);
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:50%;left:50%;transform:translate(-50%,50%);background:#1c181a;border:1px solid rgba(255,210,150,.2);color:#ffebd2;padding:.6rem 1.2rem;border-radius:8px;z-index:100000;font-size:.85rem;font-family:Fraunces,Georgia,serif;transition:opacity .3s;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 300); }, 2000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.PuzzleHunt = {
    checkAutoClues: checkAutoClues,
    renderPuzzlePanel: renderPuzzlePanel,
    submitAnswer: submitAnswer
  };
})();
