/**
 * GirlNavigation.js — Enhanced
 * Owns the companion's position and how it changes over time: picking safe
 * wander targets, stepping toward them at a given speed, following the
 * cursor slowly, and teleporting. Never places her on top of buttons,
 * links, dialogs, or other excluded UI.
 *
 * Enhanced with:
 * - Steering avoidance (reroutes around obstacles mid-path)
 * - Smooth easing on arrival
 * - Momentum/inertia for natural movement
 * - Wall sliding along obstacles
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};
  var Config = GirlCompanion.Config;

  function GirlNavigation(getSize) {
    this.getSize = getSize;
    this.pos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7 };
    this.target = null;
    this.speed = Config.WALK_SPEED_PX_S;
    this.facingRight = true;
    this._exclusions = [];
    this._rescanExclusions();
    this._rescanTimer = setInterval(this._rescanExclusions.bind(this), 2000);

    // movement physics
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85;
    this._idlePhase = 0;
    this._idleSway = 0;
  }

  GirlNavigation.prototype._rescanExclusions = function () {
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

  GirlNavigation.prototype._isSafe = function (x, y) {
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

  GirlNavigation.prototype._findSafeNear = function (x, y) {
    if (this._isSafe(x, y)) return { x: x, y: y };
    for (var r = 8; r < 100; r += 10) {
      for (var angle = 0; angle < Math.PI * 2; angle += Math.PI / 5) {
        var nx = x + Math.cos(angle) * r;
        var ny = y + Math.sin(angle) * r;
        if (this._isSafe(nx, ny)) return { x: nx, y: ny };
      }
    }
    return null;
  };

  GirlNavigation.prototype.pickWanderTarget = function () {
    var size = this.getSize();
    var margin = Config.SCREEN_MARGIN_PX;
    for (var attempt = 0; attempt < 20; attempt++) {
      var x = margin + Math.random() * (window.innerWidth - margin * 2 - size.w);
      var y = margin + Math.random() * (window.innerHeight - margin * 2 - size.h);
      if (this._isSafe(x, y)) return { x: x, y: y };
    }
    // fallback: near current position
    for (var a = 0; a < 12; a++) {
      var angle = (a / 12) * Math.PI * 2;
      var dist = 50 + Math.random() * 80;
      var tx = this.pos.x + Math.cos(angle) * dist;
      var ty = this.pos.y + Math.sin(angle) * dist;
      var safe = this._findSafeNear(tx, ty);
      if (safe) return safe;
    }
    return null;
  };

  GirlNavigation.prototype.findEmptyArea = function () {
    var size = this.getSize();
    var margin = Config.SCREEN_MARGIN_PX;
    var vw = window.innerWidth, vh = window.innerHeight;
    // grid scan: find the largest gap with no exclusions
    var best = null, bestScore = 0;
    var step = 60;
    for (var x = margin; x < vw - margin - size.w; x += step) {
      for (var y = margin; y < vh - margin - size.h; y += step) {
        if (this._isSafe(x, y)) {
          // score: prefer corners and edges (more "empty" feeling)
          var edgeDist = Math.min(x, y, vw - x - size.w, vh - y - size.h);
          var score = edgeDist + Math.random() * 40;
          if (score > bestScore) { bestScore = score; best = { x: x, y: y }; }
        }
      }
    }
    return best;
  };

  GirlNavigation.prototype.moveTo = function (point, opts) {
    opts = opts || {};
    this.target = point;
    this.speed = opts.run ? Config.RUN_SPEED_PX_S : Config.WALK_SPEED_PX_S;
    this.facingRight = point.x >= this.pos.x;
  };

  GirlNavigation.prototype.teleport = function (point) {
    this.pos = point;
    this.target = null;
    this.vx = 0;
    this.vy = 0;
  };

  GirlNavigation.prototype.stop = function () {
    this.target = null;
  };

  GirlNavigation.prototype.isMoving = function () {
    return !!this.target;
  };

  /** Check if a point is inside any exclusion zone. */
  GirlNavigation.prototype._isInObstacle = function (x, y) {
    var size = this.getSize();
    var box = { x: x - size.w / 2, y: y - size.h / 2, w: size.w, h: size.h };
    for (var i = 0; i < this._exclusions.length; i++) {
      if (rectsOverlap(box, this._exclusions[i])) return this._exclusions[i];
    }
    return null;
  };

  /** Compute avoidance force: push away from nearby obstacles. */
  GirlNavigation.prototype._avoidanceForce = function (x, y) {
    var size = this.getSize();
    var forceX = 0, forceY = 0;
    var box = { x: x - size.w / 2, y: y - size.h / 2, w: size.w, h: size.h };

    for (var i = 0; i < this._exclusions.length; i++) {
      var obs = this._exclusions[i];
      if (!rectsOverlap(box, obs)) continue;

      var ocx = obs.x + obs.w / 2;
      var ocy = obs.y + obs.h / 2;
      var pushX = x - ocx;
      var pushY = y - ocy;
      var pushLen = Math.hypot(pushX, pushY) || 1;
      forceX += (pushX / pushLen) * 40;
      forceY += (pushY / pushLen) * 40;
    }
    return (forceX !== 0 || forceY !== 0) ? { x: forceX, y: forceY } : null;
  };

  /** Wall slide: if pressed against obstacle, slide along its edge. */
  GirlNavigation.prototype._wallSlide = function (x, y, vx, vy) {
    var size = this.getSize();
    var box = { x: x - size.w / 2, y: y - size.h / 2, w: size.w, h: size.h };

    for (var i = 0; i < this._exclusions.length; i++) {
      var obs = this._exclusions[i];
      if (!rectsOverlap(box, obs)) continue;

      var dx = x - (obs.x + obs.w / 2);
      var dy = y - (obs.y + obs.h / 2);
      var scaleX = obs.w / 2 + size.w / 2;
      var scaleY = obs.h / 2 + size.h / 2;
      var overlapX = scaleX - Math.abs(dx);
      var overlapY = scaleY - Math.abs(dy);

      if (overlapX < overlapY) {
        return { x: 0, y: vy * 0.5, pushX: Math.sign(dx) * overlapX };
      } else {
        return { x: vx * 0.5, y: 0, pushY: Math.sign(dy) * overlapY };
      }
    }
    return null;
  };

  GirlNavigation.prototype.update = function (dtMs) {
    if (!this.target) {
      this._idlePhase += dtMs / 1000;
      this._idleSway = Math.sin(this._idlePhase * 0.8) * 0.3;
      return false;
    }

    var dtS = dtMs / 1000;
    var dx = this.target.x - this.pos.x;
    var dy = this.target.y - this.pos.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var step = this.speed * dtS;

    // arrival easing
    var ease = dist < 50 ? Math.max(0.3, dist / 50) : 1;

    // desired velocity
    var desVx = dist > 0 ? (dx / dist) * this.speed * ease : 0;
    var desVy = dist > 0 ? (dy / dist) * this.speed * ease : 0;

    // avoidance
    var avoid = this._avoidanceForce(this.pos.x, this.pos.y);
    if (avoid) {
      desVx += avoid.x;
      desVy += avoid.y;
    }

    // smooth steering with momentum
    this.vx = this.vx * this.friction + desVx * (1 - this.friction);
    this.vy = this.vy * this.friction + desVy * (1 - this.friction);

    var newX = this.pos.x + this.vx * dtS;
    var newY = this.pos.y + this.vy * dtS;

    // wall slide
    var slide = this._wallSlide(newX, newY, this.vx, this.vy);
    if (slide) {
      if (slide.pushX) newX += slide.pushX;
      if (slide.pushY) newY += slide.pushY;
      this.vx = slide.x;
      this.vy = slide.y;
    }

    // clamp to viewport
    var size = this.getSize();
    var margin = Config.SCREEN_MARGIN_PX;
    newX = Math.max(margin, Math.min(window.innerWidth - size.w - margin, newX));
    newY = Math.max(margin, Math.min(window.innerHeight - size.h - margin, newY));

    // safety check — if new position is unsafe, try nearest safe spot
    if (!this._isSafe(newX, newY)) {
      var safe = this._findSafeNear(newX, newY);
      if (safe) {
        newX = safe.x;
        newY = safe.y;
      } else {
        // truly stuck — stop
        this.target = null;
        this.vx = 0;
        this.vy = 0;
        return false;
      }
    }

    this.pos = { x: newX, y: newY };
    this.facingRight = dx >= 0;

    // arrived?
    var finalDist = Math.hypot(this.target.x - this.pos.x, this.target.y - this.pos.y);
    if (finalDist <= step || finalDist < 2) {
      this.pos = { x: this.target.x, y: this.target.y };
      this.target = null;
      this.vx = 0;
      this.vy = 0;
      return true;
    }

    return true;
  };

  GirlNavigation.prototype.stepBack = function (fromX) {
    var dir = this.pos.x < fromX ? -1 : 1;
    var size = this.getSize();
    var target = { x: clamp(this.pos.x + dir * 40, Config.SCREEN_MARGIN_PX, window.innerWidth - size.w - Config.SCREEN_MARGIN_PX), y: this.pos.y };
    this.moveTo(target);
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  GirlNavigation.prototype.destroy = function () {
    clearInterval(this._rescanTimer);
  };

  GirlCompanion.Navigation = GirlNavigation;
})(typeof window !== 'undefined' ? window : this);
