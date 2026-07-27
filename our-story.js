(function () {
  var link = document.getElementById('ourStoryLink');
  if (!link) return;
  var DATA;
  var ANSWERS = {};

  function loadData(cb) {
    fetch('/quiz.json').then(function (res) {
      if (!res.ok) throw 'Not found';
      return res.json();
    }).then(cb).catch(function () {
      var el = document.getElementById('quizJsonData');
      if (el) try { cb(JSON.parse(el.textContent)); } catch (e) { alert('Our Story not available.'); }
      else alert('Our Story not available.');
    });
  }

  link.addEventListener('click', function (e) {
    e.preventDefault();
    loadData(function (data) {
      DATA = data;
      FB.init();
      FB.get('ourStoryAnswers', 'responses').then(function (d) {
        ANSWERS = d && d.questions ? d.questions : {};
        showStoryModal(data);
      }).catch(function () {
        ANSWERS = {};
        showStoryModal(data);
      });
    });
  });

  function showStoryModal(data) {
    var categories = {};
    (data.questions || []).forEach(function (q) {
      if (!categories[q.category]) categories[q.category] = [];
      categories[q.category].push(q);
    });
    var catNames = Object.keys(categories);
    var html = '<div style="max-height:70vh;overflow-y:auto;padding:0 .25rem;">';
    html += '<h2 style="margin:0 0 .25rem;color:#ffe680;font-size:1.1rem;">' + esc(data.title || 'Our Story') + '</h2>';
    html += '<p style="color:#6b5f52;font-size:.75rem;margin:0 0 1rem;">' + (data.totalQuestions || data.questions.length) + ' questions &middot; ' + catNames.length + ' chapters</p>';
    catNames.forEach(function (cat, ci) {
      var qs = categories[cat];
      html += '<div style="margin-bottom:.75rem;border-radius:6px;border:1px solid rgba(255,210,150,.06);overflow:hidden;">';
      html += '<div class="story-cat-header" data-ci="' + ci + '" style="padding:.5rem .7rem;background:rgba(255,220,160,.04);cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:.85rem;color:#ffe680;font-weight:600;">' +
        '<span>' + esc(cat) + ' (' + qs.length + ')</span><span class="story-arrow" style="transition:transform .2s;">&#x25BC;</span></div>';
      html += '<div class="story-cat-body" data-ci="' + ci + '" style="padding:0 .7rem;max-height:0;overflow:hidden;transition:max-height .3s ease;">';
      qs.forEach(function (q, qi) {
        var qid = q.id || (ci + '-' + qi);
        var val = ANSWERS[qid] || '';
        var inputHtml = inputForType(q, qid, val);
        html += '<div style="padding:.6rem 0;border-bottom:1px solid rgba(255,210,150,.04);">';
        html += '<p style="margin:0 0 3px;color:#ffebd2;font-size:.82rem;">' + (qi + 1) + '. ' + esc(q.question) + '</p>';
        html += '<span style="color:#6b5f52;font-size:.7rem;font-style:italic;">' + typeLabel(q) + ' &middot; ' + esc(q.answeredBy || 'Both') + '</span>';
        if (q.unlock && q.unlock.length) html += ' <span style="color:#6fcf93;font-size:.7rem;">&#x1F513; ' + q.unlock.join(', ') + '</span>';
        html += '<div style="margin-top:4px;">' + inputHtml + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
    });
    html += '<button id="ourStorySaveBtn" style="display:block;width:100%;padding:.5rem;border-radius:6px;background:rgba(111,207,147,.1);border:1px solid rgba(111,207,147,.3);color:#6fcf93;cursor:pointer;font-size:.85rem;margin-bottom:6px;">&#x1F4BE; Save Answers</button>';
    html += '<button onclick="closeModal()" style="display:block;width:100%;padding:.5rem;border-radius:6px;background:rgba(232,93,58,.1);border:1px solid rgba(232,93,58,.3);color:#e85d3a;cursor:pointer;font-size:.85rem;">Close</button>';
    html += '</div>';
    openModal(html);
    document.querySelectorAll('.story-cat-header').forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var ci = this.dataset.ci;
        var body = document.querySelector('.story-cat-body[data-ci="' + ci + '"]');
        var arrow = this.querySelector('.story-arrow');
        if (!body) return;
        var isOpen = body.style.maxHeight !== '0px' && body.style.maxHeight !== '';
        body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
        arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
      });
    });
    document.getElementById('ourStorySaveBtn').addEventListener('click', saveAnswers);
  }

  function inputForType(q, qid, val) {
    if (q.type === 'paragraph') return '<textarea data-qid="' + qid + '" style="width:100%;padding:.4rem .6rem;border-radius:5px;background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.1);color:#ffebd2;font-family:\'Lora\',Georgia,serif;font-size:.82rem;outline:none;resize:vertical;box-sizing:border-box;" rows="2">' + esc(val) + '</textarea>';
    if (q.type === 'date') return '<input type="date" data-qid="' + qid + '" value="' + esc(val) + '" style="width:100%;padding:.35rem .5rem;border-radius:5px;background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.1);color:#ffebd2;font-family:inherit;font-size:.82rem;outline:none;box-sizing:border-box;">';
    if (q.type === 'number') return '<input type="number" data-qid="' + qid + '" value="' + esc(val) + '" style="width:100%;padding:.35rem .5rem;border-radius:5px;background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.1);color:#ffebd2;font-family:inherit;font-size:.82rem;outline:none;box-sizing:border-box;">';
    if (q.type === 'yes_no') {
      var checkedYes = val === 'yes' ? ' checked' : '';
      var checkedNo = val === 'no' ? ' checked' : '';
      return '<label style="color:#c2b5a0;font-size:.8rem;margin-right:8px;"><input type="radio" name="' + qid + '" value="yes"' + checkedYes + '> Yes</label>' +
        '<label style="color:#c2b5a0;font-size:.8rem;"><input type="radio" name="' + qid + '" value="no"' + checkedNo + '> No</label>';
    }
    if ((q.type === 'single_choice' || q.type === 'multi_choice') && q.options) {
      var inputType = q.type === 'multi_choice' ? 'checkbox' : 'radio';
      var html = '';
      q.options.forEach(function (opt, oi) {
        var checked = Array.isArray(val) ? (val.indexOf(opt) > -1 ? ' checked' : '') : (val === opt ? ' checked' : '');
        html += '<label style="display:block;color:#c2b5a0;font-size:.8rem;padding:2px 0;"><input type="' + inputType + '" name="' + qid + '" value="' + esc(opt) + '"' + checked + '> ' + esc(opt) + '</label>';
      });
      return html;
    }
    return '<input type="text" data-qid="' + qid + '" value="' + esc(val) + '" style="width:100%;padding:.35rem .5rem;border-radius:5px;background:rgba(255,220,160,.04);border:1px solid rgba(255,210,150,.1);color:#ffebd2;font-family:inherit;font-size:.82rem;outline:none;box-sizing:border-box;">';
  }

  function collectAnswers() {
    var result = {};
    document.querySelectorAll('[data-qid]').forEach(function (el) {
      var qid = el.dataset.qid;
      var tag = el.tagName.toLowerCase();
      if (tag === 'textarea' || (tag === 'input' && (el.type === 'text' || el.type === 'date' || el.type === 'number'))) {
        result[qid] = el.value;
      } else if (el.type === 'radio' && el.checked) {
        result[qid] = el.value;
      } else if (el.type === 'checkbox') {
        if (!result[qid]) result[qid] = [];
        if (el.checked) result[qid].push(el.value);
      }
    });
    return result;
  }

  function saveAnswers() {
    var answers = collectAnswers();
    FB.put('ourStoryAnswers', { id: 'responses', questions: answers }).then(function () {
      ANSWERS = answers;
      var btn = document.getElementById('ourStorySaveBtn');
      if (btn) { btn.textContent = '\u2713 Saved!'; btn.style.borderColor = '#6fcf93'; }
      setTimeout(function () { if (btn) btn.textContent = '\uD83D\uDCBE Save Answers'; }, 2000);
    }).catch(function () {
      var btn = document.getElementById('ourStorySaveBtn');
      if (btn) { btn.textContent = '\u2717 Failed'; btn.style.borderColor = '#e85d3a'; }
    });
  }

  function typeLabel(q) {
    if (q.type === 'date') return 'Date';
    if (q.type === 'paragraph') return 'Long answer';
    if (q.type === 'short_text') return 'Short answer';
    if (q.type === 'yes_no') return 'Yes/No';
    if (q.type === 'number') return 'Number';
    if (q.type === 'single_choice') return 'Choose one';
    if (q.type === 'multi_choice') return 'Choose many';
    return q.type || '';
  }

  function esc(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function openModal(html) {
    var overlay = document.getElementById('modalOverlay');
    var content = document.getElementById('modalContent');
    if (!overlay || !content) {
      overlay = document.createElement('div'); overlay.className = 'modal-overlay'; overlay.id = 'modalOverlay';
      content = document.createElement('div'); content.className = 'modal'; content.id = 'modalContent';
      overlay.appendChild(content); document.body.appendChild(overlay);
    }
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:99998;';
    content.style.cssText = 'background:#1e1819;border:1px solid rgba(255,210,150,.12);border-radius:12px;padding:1.5rem;max-width:560px;width:90%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;';
    content.innerHTML = html;
    overlay.onclick = function (e) { if (e.target === overlay) closeModal(); };
  }

  if (!window.closeModal) {
    window.closeModal = function () {
      var overlay = document.getElementById('modalOverlay');
      if (overlay) overlay.style.display = 'none';
    };
  }
})();