(function () {
  if (typeof FB === 'undefined') return;
  FB.init();
  FB.get('project-texts', 'list').then(function (data) {
    var items = Array.isArray(data) ? data : (data && Array.isArray(data.list) ? data.list : []);
    var container = document.getElementById('storyChapters');
    if (!container) return;
    if (!items.length) {
      container.innerHTML = '<div class="empty-story">The story is being written...</div>';
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
  }).catch(function () {
    var container = document.getElementById('storyChapters');
    if (container) container.innerHTML = '<div class="empty-story">Could not load the story.</div>';
  });

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
