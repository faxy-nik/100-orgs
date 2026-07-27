(function () {
  var PAGE = document.body.dataset.page || '';
  var QUIZZES = getDefaultQuizzes();
  var USED_KEYS = {};

  function getDefaultQuizzes() {
    return [
      // 100-organs section 0
      {
        id: '100-organs-0', page: '100-organs', sectionIdx: 0, title: 'Section 1 Quiz',
        questions: [
          { question: 'What organ did you first fall in love with?', options: ['The brain', 'The heart', 'The eyes', 'The voice'], answer: 1 },
          { question: 'How many chambers does the heart have?', options: ['2', '3', '4', '5'], answer: 2 },
          { question: 'What is the largest organ in the human body?', options: ['Liver', 'Skin', 'Brain', 'Lungs'], answer: 1 },
          { question: 'Which part of the body never stops growing?', options: ['Heart', 'Ears and nose', 'Brain', 'Feet'], answer: 1 },
          { question: 'A smile uses how many muscles?', options: ['12', '17', '22', '32'], answer: 1 },
          { question: 'What color is blood inside your body?', options: ['Blue', 'Red', 'Purple', 'Dark red'], answer: 3 },
          { question: 'Where is the smallest bone in the body?', options: ['Hand', 'Foot', 'Ear', 'Nose'], answer: 2 },
          { question: 'How many senses do humans have?', options: ['3', '5', '7', '9'], answer: 1 },
          { question: 'What organ pumps blood?', options: ['Brain', 'Lungs', 'Heart', 'Liver'], answer: 2 },
          { question: 'Our body produces how many new cells per day?', options: ['50 billion', '100 billion', '330 billion', '500 billion'], answer: 2 }
        ]
      },
      // 100-organs section 1
      {
        id: '100-organs-1', page: '100-organs', sectionIdx: 1, title: 'Section 2 Quiz',
        questions: [
          { question: 'What triggers a feeling of love in the brain?', options: ['Adrenaline', 'Dopamine', 'Cortisol', 'Serotonin'], answer: 1 },
          { question: 'How long does it take to form a habit?', options: ['7 days', '21 days', '66 days', '100 days'], answer: 2 },
          { question: 'What is the most sensitive part of the body?', options: ['Lips', 'Fingertips', 'Skin', 'Tongue'], answer: 2 },
          { question: 'What percent of the body is water?', options: ['40%', '50%', '60%', '70%'], answer: 2 },
          { question: 'Which organ can regenerate itself?', options: ['Heart', 'Liver', 'Kidney', 'Stomach'], answer: 1 },
          { question: 'How many taste buds does the tongue have?', options: ['2,000', '5,000', '10,000', '20,000'], answer: 2 },
          { question: 'What strengthens with exercise?', options: ['The heart', 'The bones', 'Both', 'Neither'], answer: 2 },
          { question: 'Human hair can support how much weight?', options: ['100g', '500g', '1kg', '2kg'], answer: 2 },
          { question: 'How often does the body replace its cells?', options: ['Every day', 'Every week', 'Every 7 years', 'Every 10 years'], answer: 2 },
          { question: 'What does kissing release in the brain?', options: ['Cortisol', 'Oxytocin', 'Adrenaline', 'Histamine'], answer: 1 }
        ]
      },
      // love section 0
      {
        id: 'love-0', page: 'love', sectionIdx: 0, title: 'Section 1 Quiz',
        questions: [
          { question: 'What color symbolizes love most?', options: ['White', 'Red', 'Pink', 'Purple'], answer: 1 },
          { question: 'Where does love blossom first?', options: ['In the eyes', 'In the heart', 'In the mind', 'In the soul'], answer: 2 },
          { question: 'How long does infatuation typically last?', options: ['3 months', '6 months', '12 months', '2 years'], answer: 0 },
          { question: 'What keeps love alive?', options: ['Gifts', 'Words', 'Attention', 'Trust'], answer: 3 },
          { question: 'Which language is called the language of love?', options: ['Italian', 'French', 'Spanish', 'Portuguese'], answer: 1 },
          { question: 'What element is associated with the heart?', options: ['Fire', 'Water', 'Air', 'Earth'], answer: 0 },
          { question: 'Which flower means true love?', options: ['Tulip', 'Rose', 'Orchid', 'Lily'], answer: 1 },
          { question: 'What bond outlasts all others?', options: ['Friendship', 'Romance', 'Family', 'Shared memories'], answer: 3 },
          { question: 'What moon phase is tied to romance?', options: ['New moon', 'Full moon', 'Crescent', 'Blue moon'], answer: 1 },
          { question: 'Where do lovers meet in eternity?', options: ['In heaven', 'In dreams', 'In memory', 'In the stars'], answer: 2 }
        ]
      },
      // love section 1
      {
        id: 'love-1', page: 'love', sectionIdx: 1, title: 'Section 2 Quiz',
        questions: [
          { question: 'What ancient god represents love?', options: ['Zeus', 'Eros', 'Apollo', 'Hermes'], answer: 1 },
          { question: 'What is said to break a heart?', options: ['Time', 'Distance', 'Silence', 'Hate'], answer: 2 },
          { question: 'Which star is called the love star?', options: ['Sirius', 'Venus', 'Mars', 'Polaris'], answer: 1 },
          { question: 'What makes a memory unforgettable?', options: ['Time', 'Emotion', 'Place', 'Sound'], answer: 1 },
          { question: 'How many love languages are there?', options: ['3', '5', '7', '10'], answer: 1 },
          { question: 'What sustains long-distance love?', options: ['Hope', 'Memory', 'Letters', 'Patience'], answer: 2 },
          { question: 'What music genre is most romantic?', options: ['Jazz', 'Classical', 'Ballads', 'Bossa nova'], answer: 2 },
          { question: 'What is a promise called in love?', options: ['A vow', 'A wish', 'A dream', 'A hope'], answer: 0 },
          { question: 'What bridges two hearts?', options: ['Time', 'Distance', 'Words', 'Silence'], answer: 2 },
          { question: 'What is love\'s greatest gift?', options: ['Passion', 'Understanding', 'Devotion', 'Freedom'], answer: 1 }
        ]
      }
    ];
  }

  function getQuizForSection(page, idx) {
    for (var i = 0; i < QUIZZES.length; i++) {
      if (QUIZZES[i].page === page && QUIZZES[i].sectionIdx === idx) return QUIZZES[i];
    }
    return null;
  }

  window.addSectionQuizBtn = function (content, page, sectionIdx) {
    if (sectionIdx > 1) return;
    if (content.querySelector('.section-quiz-btn')) return;
    var quiz = getQuizForSection(page, sectionIdx);
    if (!quiz) return;
    var btn = document.createElement('button');
    btn.className = 'section-quiz-btn';
    btn.textContent = '\uD83E\uDDEA Quiz (' + quiz.questions.length + ' questions)';
    btn.style.cssText = 'display:block;margin:.75rem auto .5rem;padding:.6rem 1.2rem;border-radius:8px;background:rgba(111,207,147,.08);border:1px solid rgba(111,207,147,.25);color:#6fcf93;font-family:Fraunces,Georgia,serif;font-size:.82rem;cursor:pointer;transition:all .25s;';
    btn.onmouseover = function () { this.style.background = '#6fcf93'; this.style.color = '#181214'; };
    btn.onmouseout = function () { this.style.background = 'rgba(111,207,147,.08)'; this.style.color = '#6fcf93'; };
    btn.onclick = function () { openQuizModal(quiz); };
    var requestBtn = content.querySelector('.section-request-btn');
    if (requestBtn) content.insertBefore(btn, requestBtn);
    else {
      var lastTribute = content.querySelector('.tribute:last-of-type');
      if (lastTribute) lastTribute.after(btn);
      else content.appendChild(btn);
    }
  };

  function addQuizButtons() {
    var groups = document.querySelectorAll('.accordion-group');
    if (!groups.length) return;
    groups.forEach(function (g, idx) {
      if (idx > 1) return; // ponytail: only first 2 sections
      var quiz = getQuizForSection(PAGE, idx);
      if (!quiz) return;
      var content = g.querySelector('.accordion-content');
      if (!content) return;
      if (content.querySelector('.section-quiz-btn')) return; // already added
      var btn = document.createElement('button');
      btn.className = 'section-quiz-btn';
      btn.textContent = '\uD83E\uDDEA Quiz (' + quiz.questions.length + ' questions)';
      btn.style.cssText = 'display:block;margin:1rem auto .5rem;padding:.6rem 1.2rem;border-radius:8px;background:rgba(111,207,147,.08);border:1px solid rgba(111,207,147,.25);color:#6fcf93;font-family:Fraunces,Georgia,serif;font-size:.82rem;cursor:pointer;transition:all .25s;';
      btn.onmouseover = function () { this.style.background = '#6fcf93'; this.style.color = '#181214'; };
      btn.onmouseout = function () { this.style.background = 'rgba(111,207,147,.08)'; this.style.color = '#6fcf93'; };
      btn.onclick = function () { openQuizModal(quiz); };
      var requestBtn = content.querySelector('.section-request-btn');
      if (requestBtn) content.insertBefore(btn, requestBtn);
      else {
        var lastTribute = content.querySelector('.tribute:last-of-type');
        if (lastTribute) lastTribute.after(btn);
        else content.appendChild(btn);
      }
    });
  }

  function openQuizModal(quiz) {
    var questions = quiz.questions || [];
    var html = '<div style="max-height:70vh;overflow-y:auto;padding:0 .25rem;">';
    html += '<h2 style="margin:0 0 .75rem;color:#ffe680;font-size:1.1rem;">' + esc(quiz.title || 'Quiz') + '</h2>';
    html += '<p style="color:#6b5f52;font-size:.75rem;margin:0 0 1rem;">' + questions.length + ' question' + (questions.length !== 1 ? 's' : '') + '</p>';
    questions.forEach(function (q, qi) {
      html += '<div style="margin-bottom:1.2rem;padding:.6rem .75rem;border-radius:6px;background:rgba(255,220,160,.03);border:1px solid rgba(255,210,150,.06);">';
      html += '<p style="margin:0 0 .5rem;color:#ffebd2;font-size:.85rem;font-weight:600;">' + (qi + 1) + '. ' + esc(q.question) + '</p>';
      var options = q.options || [];
      options.forEach(function (opt, oi) {
        var inputId = 'quiz-' + qi + '-' + oi;
        html += '<label style="display:flex;align-items:center;gap:6px;padding:3px 0;color:#c2b5a0;font-size:.82rem;cursor:pointer;">' +
          '<input type="radio" name="quiz-q-' + qi + '" value="' + oi + '" id="' + inputId + '">' +
          esc(opt) + '</label>';
      });
      html += '</div>';
    });
    html += '<button id="quizSubmitBtn" style="display:block;width:100%;padding:.55rem;border-radius:6px;background:rgba(111,207,147,.1);border:1px solid rgba(111,207,147,.3);color:#6fcf93;font-family:Fraunces,Georgia,serif;font-size:.9rem;cursor:pointer;">Submit</button>';
    html += '</div>';
    openModal(html);
    document.getElementById('quizSubmitBtn').addEventListener('click', function () { submitQuiz(quiz); });
  }

  function submitQuiz(quiz) {
    var questions = quiz.questions || [];
    var score = 0;
    questions.forEach(function (q, qi) {
      var selected = document.querySelector('input[name="quiz-q-' + qi + '"]:checked');
      if (selected && parseInt(selected.value) === q.answer) score++;
    });
    var total = questions.length;
    var passed = score >= Math.ceil(total / 2);
    var html = '<div style="text-align:center;padding:1rem;">';
    html += '<div style="font-size:3rem;margin-bottom:.5rem;">' + (passed ? '\u2705' : '\u274C') + '</div>';
    html += '<h2 style="margin:0 0 .5rem;color:#ffe680;font-size:1.2rem;">' + (passed ? 'Passed!' : 'Keep Trying') + '</h2>';
    html += '<p style="font-size:1.1rem;color:#ffebd2;margin:0 0 .25rem;">' + score + ' / ' + total + '</p>';
    html += '<p style="color:#6b5f52;font-size:.8rem;margin:0 0 1rem;">' + (passed ? 'Great job!' : 'You need ' + Math.ceil(total / 2) + ' to pass.') + '</p>';
    html += '<button onclick="closeModal()" style="padding:.5rem 1rem;border-radius:6px;background:rgba(255,230,128,.1);border:1px solid #ffe680;color:#ffe680;cursor:pointer;font-size:.85rem;">Close</button>';
    html += '</div>';
    openModal(html);

    FB.get('quizHistory', 'all').then(function (d) {
      var items = d && d.items ? d.items : [];
      var key = quiz.id + '-' + Date.now();
      if (USED_KEYS[key]) return;
      USED_KEYS[key] = true;
      items.push({ quizId: quiz.id, score: score, total: total, passed: passed, timestamp: Date.now() });
      FB.put('quizHistory', { id: 'all', items: items }).catch(function () {});
    }).catch(function () {});
  }

  function esc(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function toastShow(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(24,18,20,.92);color:#ffebd2;padding:.6rem 1.2rem;border-radius:8px;font-size:.85rem;z-index:99999;border:1px solid rgba(255,210,150,.12);transition:opacity .3s;';
    t.style.opacity = '1';
    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function () { t.style.opacity = '0'; }, 3000);
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
    content.style.cssText = 'background:#1e1819;border:1px solid rgba(255,210,150,.12);border-radius:12px;padding:1.5rem;max-width:480px;width:90%;max-height:80vh;overflow-y:auto;';
    content.innerHTML = html;
    overlay.onclick = function (e) { if (e.target === overlay) closeModal(); };
  }

  window.closeModal = window.closeModal || function () {
    var overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.style.display = 'none';
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(addQuizButtons, 500); });
  else setTimeout(addQuizButtons, 500);
})();
