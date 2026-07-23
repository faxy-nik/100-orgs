/**
 * GirlInteractions.js
 * Treats the mouse cursor as a character she reacts to, and watches which
 * part of the page the visitor is dwelling on so she can wander over,
 * "read", and linger longer near emotional content.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};
  var Config = GirlCompanion.Config;

  function GirlInteractions(bus, navigation) {
    this.bus = bus;
    this.navigation = navigation;
    this.cursor = { x: -9999, y: -9999 };
    this._lastCursor = null;
    this._stillSince = 0;
    this._readingObserver = null;
    this._sectionObserver = null;

    bus.on('cursor:move', this._onCursorMove.bind(this));
    this._setupReadingObserver();
    this._setupSectionObserver();
  }

  GirlInteractions.prototype._onCursorMove = function (data) {
    var prev = this._lastCursor;
    this.cursor = { x: data.x, y: data.y };
    this._lastCursor = { x: data.x, y: data.y, t: data.t };

    if (prev) {
      var dt = (data.t - prev.t) || 16;
      var dist = Math.hypot(data.x - prev.x, data.y - prev.y);
      var speed = dist / (dt / 1000);
      if (speed > Config.CURSOR_FAST_PX_PER_S) {
        this.bus.emit('cursor:fastMove', { speed: speed });
      }
      this._stillSince = dist > 3 ? performance.now() : (this._stillSince || performance.now());
    }
  };

  /** Call every tick with the companion's current on-screen center. */
  GirlInteractions.prototype.evaluateProximity = function (companionCenter) {
    var dist = Math.hypot(this.cursor.x - companionCenter.x, this.cursor.y - companionCenter.y);
    var isStill = this._stillSince && (performance.now() - this._stillSince) > Config.CURSOR_STILL_MS;
    var stillNear = isStill && dist < Config.CURSOR_NEAR_PX;

    if (this._lastStillNear !== stillNear) {
      this._lastStillNear = stillNear;
      this.bus.emit('cursor:stillNear', { near: stillNear });
    }

    if (dist < Config.CURSOR_VERY_NEAR_PX) {
      return { zone: 'veryNear', dist: dist, cursorStill: isStill };
    }
    if (dist < Config.CURSOR_NEAR_PX) {
      return { zone: 'near', dist: dist, cursorStill: isStill };
    }
    return { zone: 'far', dist: dist, cursorStill: isStill };
  };

  GirlInteractions.prototype._setupReadingObserver = function () {
    if (typeof IntersectionObserver === 'undefined') return;
    var self = this;
    var paragraphs = document.querySelectorAll('p, article, .companion-readable');
    if (!paragraphs.length) return;

    var dwellTimers = new WeakMap();
    this._readingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var timer = setTimeout(function () {
            var rect = entry.target.getBoundingClientRect();
            self.bus.emit('reading:candidate', {
              el: entry.target,
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              emotional: entry.target.closest('[' + Config.EMOTIONAL_SECTION_ATTR + ']') !== null
            });
          }, Config.READING_MIN_DWELL_MS);
          dwellTimers.set(entry.target, timer);
        } else {
          var t = dwellTimers.get(entry.target);
          if (t) clearTimeout(t);
        }
      });
    }, { threshold: 0.6 });

    paragraphs.forEach(function (p) { self._readingObserver.observe(p); });
  };

  GirlInteractions.prototype._setupSectionObserver = function () {
    if (typeof IntersectionObserver === 'undefined') return;
    var self = this;
    var sections = document.querySelectorAll('section, [data-companion-section]');
    if (!sections.length) return;

    this._sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          var id = entry.target.id || entry.target.getAttribute('data-companion-section') || entry.target.tagName;
          self.bus.emit('section:change', { id: id, el: entry.target });
        }
      });
    }, { threshold: [0.5] });

    sections.forEach(function (s) { self._sectionObserver.observe(s); });
  };

  GirlInteractions.prototype.destroy = function () {
    if (this._readingObserver) this._readingObserver.disconnect();
    if (this._sectionObserver) this._sectionObserver.disconnect();
  };

  GirlCompanion.Interactions = GirlInteractions;
})(typeof window !== 'undefined' ? window : this);
