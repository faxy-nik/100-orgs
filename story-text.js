(function () {
  if (typeof FB === 'undefined') return;
  FB.init();

  function toArray(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.list) return Array.isArray(data.list) ? data.list : toArray(data.list);
    var keys = Object.keys(data).filter(function (k) { return k !== 'id' && k !== 'key'; });
    if (keys.length && keys.every(function (k) { return String(parseInt(k, 10)) === k; })) {
      return keys.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); }).map(function (k) { return data[k]; });
    }
    return [];
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatDate(ev) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (ev.type === 'range' && ev.startDate && ev.endDate) {
      var s = ev.startDate.split('-'), e = ev.endDate.split('-');
      var sm = months[parseInt(s[0],10)-1], em = months[parseInt(e[0],10)-1];
      var sd = parseInt(s[1],10), ed = parseInt(e[1],10);
      return sm + ' ' + sd + ', ' + (ev.startYear||'?') + ' — ' + em + ' ' + ed + ', ' + (ev.endYear||'?');
    }
    if (ev.type === 'annual' && ev.startDate) {
      var parts = ev.startDate.split('-');
      return months[parseInt(parts[0],10)-1] + ' ' + parseInt(parts[1],10) + (ev.label.toLowerCase().indexOf('birthday') > -1 ? '' : ' (annual)');
    }
    if (ev.startDate) {
      var p = ev.startDate.split('-');
      var lbl = months[parseInt(p[0],10)-1] + ' ' + parseInt(p[1],10);
      if (ev.year) lbl += ', ' + ev.year;
      return lbl;
    }
    return '';
  }

  function renderTimeline(events, container) {
    if (!events.length) {
      container.innerHTML = '<div class="empty-state">Timeline is empty. Add events in Admin → 💎 Project → Project Events.</div>';
      return;
    }
    var html = '<div class="timeline">';
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      var date = formatDate(ev);
      var color = ev.accentColor || '#ffe680';
      html += '<div class="timeline-item">' +
        '<div class="timeline-dot" style="background:' + color + ';box-shadow:0 0 8px ' + color + '44;"></div>' +
        '<div class="timeline-content">' +
        (date ? '<div class="timeline-date" style="color:' + color + ';">' + esc(date) + '</div>' : '') +
        (ev.icon ? '<span class="timeline-icon">' + ev.icon + '</span>' : '') +
        '<div class="timeline-label">' + esc(ev.label || 'Event') + '</div>' +
        (ev.message ? '<div class="timeline-message">' + esc(ev.message) + '</div>' : '') +
        '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function renderChapters(items, container) {
    if (!items.length) {
      container.innerHTML = '<div class="empty-state">No chapters yet. Add them in Admin → 💎 Project → The Whole Storyline.</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < items.length; i++) {
      var s = items[i];
      html += '<div class="story-chapter">' +
        (s.title ? '<div class="story-chapter-title">' + esc(s.title) + '</div>' : '') +
        (s.body ? '<div class="story-chapter-body">' + esc(s.body) + '</div>' : '') +
        '</div>';
    }
    container.innerHTML = html;
  }

  Promise.all([
    FB.get('project-events', 'list'),
    FB.get('project-texts', 'list')
  ]).then(function (results) {
    var events = toArray(results[0]);
    var chapters = toArray(results[1]);

    var timelineEl = document.getElementById('storyTimeline');
    var chaptersEl = document.getElementById('storyChapters');

    if (timelineEl) renderTimeline(events, timelineEl);
    if (chaptersEl) renderChapters(chapters, chaptersEl);
  }).catch(function () {
    var timelineEl = document.getElementById('storyTimeline');
    if (timelineEl) timelineEl.innerHTML = '<div class="empty-state">Could not load timeline.</div>';
    var chaptersEl = document.getElementById('storyChapters');
    if (chaptersEl) chaptersEl.innerHTML = '<div class="empty-state">Could not load chapters.</div>';
  });
})();
