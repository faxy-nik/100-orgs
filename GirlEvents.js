/**
 * GirlEvents.js
 * A minimal pub/sub bus so modules don't need direct references to each
 * other. Also centralizes the handful of raw DOM listeners the companion
 * needs (visibility, motion preference, resize) so they're wired once.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  function EventBus() {
    this._listeners = {};
  }

  EventBus.prototype.on = function (event, fn) {
    (this._listeners[event] = this._listeners[event] || []).push(fn);
    return this;
  };

  EventBus.prototype.off = function (event, fn) {
    var list = this._listeners[event];
    if (!list) return this;
    this._listeners[event] = list.filter(function (f) { return f !== fn; });
    return this;
  };

  EventBus.prototype.emit = function (event) {
    var list = this._listeners[event];
    if (!list) return;
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < list.length; i++) {
      try { list[i].apply(null, args); } catch (e) { /* one bad listener shouldn't kill the bus */ }
    }
  };

  GirlCompanion.EventBus = EventBus;

  /**
   * Wires the shared environmental DOM listeners onto a bus.
   * Returns a teardown function.
   */
  GirlCompanion.wireEnvironmentEvents = function (bus) {
    var teardowns = [];

    function add(target, type, handler, opts) {
      target.addEventListener(type, handler, opts);
      teardowns.push(function () { target.removeEventListener(type, handler, opts); });
    }

    add(document, 'visibilitychange', function () {
      bus.emit(document.hidden ? 'page:hidden' : 'page:visible');
    });

    add(window, 'resize', function () {
      bus.emit('viewport:resize', { width: window.innerWidth, height: window.innerHeight });
    });

    add(window, 'scroll', function () {
      bus.emit('viewport:scroll', { y: window.scrollY });
    }, { passive: true });

    var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (motionQuery) {
      var onMotionChange = function () { bus.emit('motion:preference', { reduced: motionQuery.matches }); };
      onMotionChange();
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', onMotionChange);
        teardowns.push(function () { motionQuery.removeEventListener('change', onMotionChange); });
      }
    }

    if (navigator.getBattery) {
      navigator.getBattery().then(function (battery) {
        var onLevelChange = function () {
          bus.emit('battery:status', { saver: battery.level <= 0.2 && !battery.charging });
        };
        onLevelChange();
        battery.addEventListener('levelchange', onLevelChange);
        battery.addEventListener('chargingchange', onLevelChange);
      }).catch(function () { /* battery API not available, ignore */ });
    }

    add(document, 'mousemove', function (e) {
      bus.emit('cursor:move', { x: e.clientX, y: e.clientY, t: performance.now() });
    }, { passive: true });

    return function teardown() {
      teardowns.forEach(function (fn) { fn(); });
    };
  };
})(typeof window !== 'undefined' ? window : this);
