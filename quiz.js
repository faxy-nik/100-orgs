(function () {
  if (window.FeatureFlags && !window.FeatureFlags.get('quiz')) return;
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
      },
      // 100-organs section 2
      {
        id: '100-organs-2', page: '100-organs', sectionIdx: 2, title: 'Section 3 Quiz',
        questions: [
          { question: 'What do your shoulders carry when you are strong?', options: ['The world', 'My hopes', 'Your weight', 'My fears'], answer: 1 },
          { question: 'What do arms do best?', options: ['Lift', 'Reach', 'Hold', 'Stretch'], answer: 2 },
          { question: 'How many bones are in the human hand?', options: ['19', '27', '33', '14'], answer: 1 },
          { question: 'What does a handshake represent?', options: ['Power', 'Trust', 'Goodbye', 'Friendship'], answer: 1 },
          { question: 'What makes fingertips so sensitive?', options: ['Blood flow', 'Nerve endings', 'Thin skin', 'Muscle memory'], answer: 1 },
          { question: 'Which finger has the most nerve endings?', options: ['Thumb', 'Index', 'Ring', 'Little'], answer: 1 },
          { question: 'What percentage of hugs reduce stress?', options: ['30%', '50%', '70%', '90%'], answer: 1 },
          { question: 'What do crossed arms often mean?', options: ['Confidence', 'Defensiveness', 'Comfort', 'Thinking'], answer: 1 },
          { question: 'How many muscles are in the human back?', options: ['20', '40', '60', '80'], answer: 1 },
          { question: 'What makes a hug last just long enough?', options: ['3 seconds', '7 seconds', '20 seconds', 'Until they let go'], answer: 2 }
        ]
      },
      // 100-organs section 3
      {
        id: '100-organs-3', page: '100-organs', sectionIdx: 3, title: 'Section 4 Quiz',
        questions: [
          { question: 'What does a relaxed belly indicate?', options: ['Fullness', 'Trust', 'Sleepiness', 'Weakness'], answer: 1 },
          { question: 'What is the waist often called?', options: ['The bridge', 'The curve', 'The middle', 'The hinge'], answer: 1 },
          { question: 'How many muscles make up the core?', options: ['15', '29', '35', '42'], answer: 2 },
          { question: 'What does the navel connect us to?', options: ['The past', 'Our mother', 'The earth', 'Our center'], answer: 0 },
          { question: 'What does a strong core improve?', options: ['Balance', 'Posture', 'Both', 'Neither'], answer: 2 },
          { question: 'What does a belly laugh release?', options: ['Air', 'Endorphins', 'Tears', 'Sound'], answer: 1 },
          { question: 'What part of the torso holds the most tension?', options: ['Chest', 'Stomach', 'Shoulders', 'Lower back'], answer: 3 },
          { question: 'How many ribs protect the human heart?', options: ['12 pairs', '8 pairs', '10 pairs', '6 pairs'], answer: 0 },
          { question: 'What does the diaphragm do?', options: ['Pumps blood', 'Helps breathe', 'Digests food', 'Filters air'], answer: 1 },
          { question: 'What is the softest part of the belly?', options: ['The center', 'The sides', 'Below the navel', 'Above the hips'], answer: 2 }
        ]
      },
      // 100-organs section 4
      {
        id: '100-organs-4', page: '100-organs', sectionIdx: 4, title: 'Section 5 Quiz',
        questions: [
          { question: 'What is the largest organ in the body?', options: ['Liver', 'Skin', 'Brain', 'Lungs'], answer: 1 },
          { question: 'How many bones are in the adult human body?', options: ['206', '300', '150', '250'], answer: 0 },
          { question: 'What is bone marrow responsible for?', options: ['Strength', 'Blood cell production', 'Calcium storage', 'Protection'], answer: 1 },
          { question: 'Which organ never rests?', options: ['Lungs', 'Brain', 'Heart', 'Liver'], answer: 2 },
          { question: 'How fast does skin regenerate?', options: ['Every 7 days', 'Every 14 days', 'Every 28 days', 'Every 60 days'], answer: 2 },
          { question: 'What is the strongest bone in the body?', options: ['Femur', 'Skull', 'Pelvis', 'Spine'], answer: 0 },
          { question: 'Which organ filters toxins?', options: ['Kidneys', 'Liver', 'Lungs', 'Spleen'], answer: 1 },
          { question: 'How many litres of blood does the heart pump daily?', options: ['About 7,500 litres', 'About 5,000 litres', 'About 10,000 litres', 'About 2,500 litres'], answer: 0 },
          { question: 'What are taste buds replaced every?', options: ['3 days', '10 days', '2 weeks', '30 days'], answer: 1 },
          { question: 'What percentage of your body is made of water?', options: ['40-50%', '50-60%', '60-70%', '70-80%'], answer: 2 }
        ]
      },
      // 100-organs section 5
      {
        id: '100-organs-5', page: '100-organs', sectionIdx: 5, title: 'Section 6 Quiz',
        questions: [
          { question: 'Where does emotion live in the body?', options: ['In the brain', 'In the heart', 'Everywhere', 'In the gut'], answer: 2 },
          { question: 'What is the soul often compared to?', options: ['A flame', 'A feather', 'A river', 'A star'], answer: 0 },
          { question: 'What produces the feeling of butterflies?', options: ['Love', 'Anxiety', 'Adrenaline', 'All of the above'], answer: 3 },
          { question: 'What connects the mind and the heart?', options: ['Thought', 'Feeling', 'Intuition', 'Memory'], answer: 2 },
          { question: 'What is the body\'s natural painkiller?', options: ['Adrenaline', 'Dopamine', 'Endorphins', 'Serotonin'], answer: 2 },
          { question: 'What does crying release from the body?', options: ['Water', 'Salt', 'Stress hormones', 'Heat'], answer: 2 },
          { question: 'Which emotion is stored in the shoulders?', options: ['Anger', 'Burden', 'Fear', 'Joy'], answer: 1 },
          { question: 'How long does an emotion typically last?', options: ['Seconds', 'Minutes', 'Hours', 'Days'], answer: 0 },
          { question: 'What synchronises when two people connect deeply?', options: ['Breathing', 'Heartbeats', 'Brain waves', 'All of the above'], answer: 3 },
          { question: 'What is the most powerful human emotion?', options: ['Fear', 'Joy', 'Love', 'Hope'], answer: 2 }
        ]
      },
      // 100-organs section 6
      {
        id: '100-organs-6', page: '100-organs', sectionIdx: 6, title: 'Section 7 Quiz',
        questions: [
          { question: 'What hormone is called the love hormone?', options: ['Dopamine', 'Oxytocin', 'Serotonin', 'Adrenaline'], answer: 1 },
          { question: 'What part of the body responds first to touch?', options: ['Hands', 'Skin', 'Lips', 'Neck'], answer: 1 },
          { question: 'How many nerve endings are in the average human body?', options: ['1 million', '45 million', '100 million', '500 million'], answer: 1 },
          { question: 'What does pupil dilation indicate?', options: ['Fear', 'Interest', 'Anger', 'Tiredness'], answer: 1 },
          { question: 'What is the most erogenous zone?', options: ['Lips', 'Neck', 'Ears', 'It varies per person'], answer: 3 },
          { question: 'What does skin-to-skin contact release?', options: ['Heat', 'Oxytocin', 'Sweat', 'Electricity'], answer: 1 },
          { question: 'How long does a kiss burn on average calories?', options: ['2 calories', '6 calories', '12 calories', '20 calories'], answer: 1 },
          { question: 'What determines sexual attraction most?', options: ['Looks', 'Scent', 'Personality', 'Voice'], answer: 2 },
          { question: 'What deepens intimacy over time?', options: ['Time spent', 'Vulnerability', 'Shared experiences', 'All of the above'], answer: 3 },
          { question: 'What is the most sensitive part of a lover\'s body?', options: ['The neck', 'The inner wrist', 'The lower back', 'The spot only they know'], answer: 3 }
        ]
      },
      // 100-organs section 7
      {
        id: '100-organs-7', page: '100-organs', sectionIdx: 7, title: 'Section 8 Quiz',
        questions: [
          { question: 'What makes a moment unforgettable?', options: ['The place', 'The person', 'The feeling', 'The timing'], answer: 2 },
          { question: 'How long does a memory last?', options: ['A day', 'A year', 'A lifetime', 'Forever'], answer: 2 },
          { question: 'What anchors a moment in time?', options: ['A photo', 'A scent', 'A song', 'A touch'], answer: 3 },
          { question: 'What defines a shared moment?', options: ['Being together', 'Saying something', 'Feeling the same', 'Looking at each other'], answer: 2 },
          { question: 'How many moments make a relationship?', options: ['The big ones', 'The small ones', 'Both', 'The first one'], answer: 2 },
          { question: 'What makes a goodbye memorable?', options: ['The words', 'The hug', 'The promise to return', 'The silence'], answer: 2 },
          { question: 'What turns a moment into a memory?', options: ['Repetition', 'Emotion', 'Time', 'Storytelling'], answer: 1 },
          { question: 'What is the best kind of silence between two people?', options: ['Awkward silence', 'Comfortable silence', 'Angry silence', 'Silence from distance'], answer: 1 },
          { question: 'What makes a future feel real?', options: ['Dreaming together', 'Planning together', 'Building together', 'All of the above'], answer: 3 },
          { question: 'What does every great love story need?', options: ['A happy ending', 'A challenge', 'Many chapters', 'A beginning that feels like fate'], answer: 2 }
        ]
      },
      // love section 2
      {
        id: 'love-2', page: 'love', sectionIdx: 2, title: 'Section 3 Quiz',
        questions: [
          { question: 'What defines a person\'s inner world?', options: ['Their thoughts', 'Their dreams', 'Their fears', 'All of the above'], answer: 3 },
          { question: 'What is the foundation of personality?', options: ['Genes', 'Upbringing', 'Experiences', 'A mix of all'], answer: 3 },
          { question: 'What draws people together beyond looks?', options: ['Conversation', 'Vulnerability', 'Shared values', 'Timing'], answer: 2 },
          { question: 'How long does it take to truly know someone?', options: ['Months', 'Years', 'A lifetime', 'A single moment'], answer: 2 },
          { question: 'What makes someone unforgettable?', options: ['Their face', 'Their voice', 'How they made you feel', 'What they said'], answer: 2 },
          { question: 'What is the most attractive quality in a person?', options: ['Confidence', 'Kindness', 'Humor', 'Intelligence'], answer: 1 },
          { question: 'What does a person\'s room say about them?', options: ['Their taste', 'Their state of mind', 'Their habits', 'All of the above'], answer: 3 },
          { question: 'What is the quietest form of love?', options: ['Understanding', 'Acceptance', 'Patience', 'Attention'], answer: 1 },
          { question: 'What builds a person\'s character?', options: ['Success', 'Struggle', 'Love', 'Time'], answer: 1 },
          { question: 'What makes someone feel truly seen?', options: ['Being noticed', 'Being remembered', 'Being understood', 'Being loved'], answer: 2 }
        ]
      },
      // love section 3
      {
        id: 'love-3', page: 'love', sectionIdx: 3, title: 'Section 4 Quiz',
        questions: [
          { question: 'What is the foundation of a strong relationship?', options: ['Passion', 'Trust', 'Communication', 'Time'], answer: 1 },
          { question: 'How often should couples communicate deeply?', options: ['Daily', 'Weekly', 'When needed', 'Always'], answer: 3 },
          { question: 'What destroys relationships most often?', options: ['Distance', 'Misunderstanding', 'Boredom', 'Pride'], answer: 3 },
          { question: 'What makes a relationship last?', options: ['Love', 'Effort', 'Compatibility', 'All of the above'], answer: 3 },
          { question: 'What is the healthiest form of conflict?', options: ['Arguing loudly', 'Silent treatment', 'Honest discussion', 'Walking away'], answer: 2 },
          { question: 'How much time should partners spend together?', options: ['24/7', 'Quality over quantity', 'Separate lives', 'Only weekends'], answer: 1 },
          { question: 'What strengthens a bond most?', options: ['Shared joy', 'Shared struggle', 'Shared growth', 'All of the above'], answer: 3 },
          { question: 'What is the role of family in a relationship?', options: ['Everything', 'Support', 'Boundaries', 'Background'], answer: 2 },
          { question: 'What does a healthy relationship feel like?', options: ['Exciting', 'Safe', 'Effortless', 'Home'], answer: 3 },
          { question: 'What is the most important thing in a partnership?', options: ['Love', 'Respect', 'Laughter', 'Commitment'], answer: 1 }
        ]
      },
      // love section 4
      {
        id: 'love-4', page: 'love', sectionIdx: 4, title: 'Section 5 Quiz',
        questions: [
          { question: 'What does a shared future begin with?', options: ['A plan', 'A dream', 'A promise', 'A date'], answer: 1 },
          { question: 'How do you build a life together?', options: ['One day at a time', 'With a blueprint', 'By following fate', 'By not planning'], answer: 0 },
          { question: 'What makes a love story beautiful?', options: ['The ending', 'The journey', 'The struggles', 'The luck'], answer: 1 },
          { question: 'What should every couple build together?', options: ['A home', 'A business', 'A family', 'A world of their own'], answer: 3 },
          { question: 'What sustains love through hard times?', options: ['Hope', 'Faith in each other', 'Shared purpose', 'All of the above'], answer: 3 },
          { question: 'What is the most romantic promise?', options: ['I will love you forever', 'I will always come back', 'I choose you every day', 'I will never leave'], answer: 2 },
          { question: 'How do you keep a story alive?', options: ['Keep writing it', 'Keep reading it', 'Keep telling it', 'Keep living it'], answer: 3 },
          { question: 'What is better than a perfect ending?', options: ['A new beginning', 'No ending at all', 'A shared one', 'A surprise'], answer: 1 },
          { question: 'What makes a journey together meaningful?', options: ['The destination', 'The company', 'The distance', 'The pace'], answer: 1 },
          { question: 'What is the final secret to a lasting love?', options: ['Never give up', 'Never stop growing', 'Never stop choosing each other', 'All of the above'], answer: 3 }
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
    var answers = [];
    questions.forEach(function (q, qi) {
      var selected = document.querySelector('input[name="quiz-q-' + qi + '"]:checked');
      var chosen = selected ? parseInt(selected.value) : -1;
      if (chosen === q.answer) score++;
      answers.push({
        question: q.question,
        chosen: chosen >= 0 && chosen < q.options.length ? q.options[chosen] : '(no answer)',
        correct: q.options[q.answer],
        isCorrect: chosen === q.answer
      });
    });
    var total = questions.length;
    var passed = score >= Math.ceil(total / 2);
    var html = '<div style="text-align:center;padding:1rem;">';
    html += '<div style="font-size:3rem;margin-bottom:.5rem;">' + (passed ? '\u2705' : '\u274C') + '</div>';
    html += '<h2 style="margin:0 0 .5rem;color:#ffe680;font-size:1.2rem;">' + (passed ? 'Passed!' : 'Keep Trying') + '</h2>';
    html += '<p style="font-size:1.1rem;color:#ffebd2;margin:0 0 .25rem;">' + score + ' / ' + total + '</p>';
    html += '<p style="color:#6b5f52;font-size:.8rem;margin:0 0 1rem;">' + (passed ? 'Great job!' : 'You need ' + Math.ceil(total / 2) + ' to pass.') + '</p>';
    html += '<div style="text-align:left;margin-bottom:1rem;">';
    answers.forEach(function (a, i) {
      var icon = a.isCorrect ? '\u2705' : '\u274C';
      var chosenClass = a.isCorrect ? 'color:#6fcf93;' : 'color:#e85d3a;';
      html += '<div style="padding:.4rem .5rem;margin-bottom:4px;border-radius:4px;background:rgba(255,220,160,.03);font-size:.8rem;line-height:1.4;">';
      html += '<div style="color:#ffebd2;font-weight:500;">' + (i + 1) + '. ' + esc(a.question) + '</div>';
      html += '<div style="' + chosenClass + '">' + icon + ' You: ' + esc(a.chosen) + '</div>';
      if (!a.isCorrect) html += '<div style="color:#6fcf93;">\u2705 Correct: ' + esc(a.correct) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div style="display:flex;gap:.5rem;justify-content:center;">';
    html += '<button onclick="closeModal()" style="padding:.5rem 1rem;border-radius:6px;background:rgba(255,230,128,.1);border:1px solid #ffe680;color:#ffe680;cursor:pointer;font-size:.85rem;">Close</button>';
    html += '<button id="retakeBtn" style="padding:.5rem 1rem;border-radius:6px;background:rgba(111,207,147,.1);border:1px solid rgba(111,207,147,.3);color:#6fcf93;cursor:pointer;font-size:.85rem;">\u21BB Retake</button>';
    html += '</div>';
    html += '</div>';
    openModal(html);
    var retakeBtn = document.getElementById('retakeBtn');
    if (retakeBtn) retakeBtn.onclick = function () { closeModal(); openQuizModal(quiz); };

    FB.get('quizHistory', 'all').then(function (d) {
      var items = d && d.items ? d.items : [];
      var key = quiz.id + '-' + Date.now();
      if (USED_KEYS[key]) return;
      USED_KEYS[key] = true;
      items.push({ quizId: quiz.id, score: score, total: total, passed: passed, answers: answers, timestamp: Date.now() });
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
