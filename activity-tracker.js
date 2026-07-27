(function () {
  var PAGE = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  var RECORDED_KEY = 'ash-tracked-events';
  var SESSION_KEY = 'ash-session-id';

  function sessionId() {
    var s = sessionStorage.getItem(SESSION_KEY);
    if (!s) { s = Date.now() + '_' + Math.random().toString(36).slice(2, 8); sessionStorage.setItem(SESSION_KEY, s); }
    return s;
  }

  function getRecorded() {
    try { return JSON.parse(localStorage.getItem(RECORDED_KEY)) || {}; } catch (e) { return {}; }
  }
  function markRecorded(key) {
    var r = getRecorded();
    r[key] = 1;
    try { localStorage.setItem(RECORDED_KEY, JSON.stringify(r)); } catch (e) {}
  }
  function isRecorded(key) { return !!getRecorded()[key]; }

  function record(type, details) {
    if (typeof FB === 'undefined') return;
    FB.init();
    var entry = { type: type, page: PAGE, timestamp: Date.now(), date: new Date().toISOString() };
    for (var k in details) entry[k] = details[k];
    FB.put('activity', entry).catch(function () {});
  }

  window.trackActivity = record;

  // Record page visit once per session per page
  var visitKey = 'visit_' + PAGE + '_' + sessionId();
  if (!sessionStorage.getItem(visitKey)) {
    sessionStorage.setItem(visitKey, '1');
    record('page-visit');
  }

  // Record section views already in localStorage (once)
  try {
    var viewed = JSON.parse(localStorage.getItem('ash-section-viewed') || '{}');
    for (var idx in viewed) {
      if (viewed[idx]) {
        var sk = 'section_' + PAGE + '_' + idx;
        if (!isRecorded(sk)) {
          record('section-view', { sectionIdx: parseInt(idx, 10) });
          markRecorded(sk);
        }
      }
    }
  } catch (e) {}

  // Poll for new section views
  setInterval(function () {
    try {
      var viewed = JSON.parse(localStorage.getItem('ash-section-viewed') || '{}');
      for (var idx in viewed) {
        if (viewed[idx]) {
          var sk = 'section_' + PAGE + '_' + idx;
          if (!isRecorded(sk)) {
            record('section-view', { sectionIdx: parseInt(idx, 10) });
            markRecorded(sk);
          }
        }
      }
    } catch (e) {}
  }, 10000);

  // Track image clicks
  document.addEventListener('click', function (e) {
    var img = e.target.closest('img');
    if (img && img.src && img.src.indexOf('ash/') > -1) {
      var fn = img.src.split('/').pop();
      var dk = 'download_' + fn;
      if (!isRecorded(dk)) {
        record('image-view', { file: fn, alt: img.alt || '' });
        markRecorded(dk);
      }
    }
  });
})();
