/**
 * BoyNavigation.js
 * Owns the companion's position and how it changes over time: picking safe
 * wander targets, stepping toward them at a given speed, following the
 * cursor slowly, and teleporting. Never places her on top of buttons,
 * links, dialogs, or other excluded UI — it rescans exclusion rects
 * periodically since layouts can change (responsive pages, opened modals).
 */
(function (root) {
  'use strict';

  var BoyCompanion = root.BoyCompanion = root.BoyCompanion || {};
  var Config = BoyCompanion.Config;

  function BoyNavigation(getSize) {
    this.getSize = getSize; // () => {w,h} of current rendered sprite
    this.pos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7 };
    this.target = null;
    this.speed = Config.WALK_SPEED_PX_S;
    this.facingRight = true;
    this._exclusions = [];
    this._rescanExclusions();
    this._rescanTimer = setInterval(this._rescanExclusions.bind(this), 2000);
  }

  BoyNavigation.prototype._rescanExclusions = function () {
    var els = document.querySelectorAll(Config.EXCLUSION_SELECTOR);
    var pad = Config.EXCLUSION_PADDING_PX;
    var rects = [];
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      rects.push({ x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 });
    }
    this._exclusions = rects;
  };

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  BoyNavigation.prototype._isSafe = function (x, y) {
    var size = this.getSize();
    var margin = Config.SCREEN_MARGIN_PX;
    if (x < margin || y < margin || x + size.w > window.innerWidth - margin || y + size.h > window.innerHeight - margin) {
      return false;
    }
    var box = { x: x, y: y, w: size.w, h: size.h };
    for (var i = 0; i < this._exclusions.length; i++) {
      if (rectsOverlap(box, this._exclusions[i])) return false;
    }
    return true;
  };

  /** Finds a random safe point, trying a handful of times before giving up. */
  BoyNavigation.prototype.pickWanderTarget = function () {
    var size = this.getSize();
    var margin = Config.SCREEN_MARGIN_PX;
    for (var attempt = 0; attempt < 12; attempt++) {
      var x = margin + Math.random() * (window.innerWidth - margin * 2 - size.w);
      var y = margin + Math.random() * (window.innerHeight - margin * 2 - size.h);
      if (this._isSafe(x, y)) return { x: x, y: y };
    }
    return null; // no safe spot found this round — caller should just stay put
  };

  BoyNavigation.prototype.moveTo = function (point, opts) {
    opts = opts || {};
    this.target = point;
    this.speed = opts.run ? Config.RUN_SPEED_PX_S : Config.WALK_SPEED_PX_S;
  };

  BoyNavigation.prototype.teleport = function (point) {
    this.pos = point;
    this.target = null;
  };

  BoyNavigation.prototype.stop = function () {
    this.target = null;
  };

  BoyNavigation.prototype.isMoving = function () {
    return !!this.target;
  };

  /** Advances position toward target. Returns true if a step happened. */
  BoyNavigation.prototype.update = function (dtMs) {
    if (!this.target) return false;
    var dtS = dtMs / 1000;
    var dx = this.target.x - this.pos.x;
    var dy = this.target.y - this.pos.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var step = this.speed * dtS;

    if (dist <= step || dist < 1) {
      this.pos = { x: this.target.x, y: this.target.y };
      this.target = null;
      return true;
    }

    this.facingRight = dx >= 0;
    this.pos = { x: this.pos.x + (dx / dist) * step, y: this.pos.y + (dy / dist) * step };
    return true;
  };

  BoyNavigation.prototype.stepBack = function (fromX) {
    var dir = this.pos.x < fromX ? -1 : 1;
    var size = this.getSize();
    var target = { x: clamp(this.pos.x + dir * 40, Config.SCREEN_MARGIN_PX, window.innerWidth - size.w - Config.SCREEN_MARGIN_PX), y: this.pos.y };
    this.moveTo(target);
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  BoyNavigation.prototype.destroy = function () {
    clearInterval(this._rescanTimer);
  };

  BoyCompanion.Navigation = BoyNavigation;
})(typeof window !== 'undefined' ? window : this);
