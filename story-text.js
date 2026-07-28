(function () {
  if (typeof FB === 'undefined') return;
  FB.init();
  FB.get('project-texts', 'story').then(function (data) {
    if (!data) return;
    var titleEl = document.getElementById('storyTitle');
    var bodyEl = document.getElementById('storyBody');
    if (titleEl && data.title) titleEl.textContent = data.title;
    if (bodyEl && data.body) bodyEl.textContent = data.body;
  }).catch(function () {});
})();
