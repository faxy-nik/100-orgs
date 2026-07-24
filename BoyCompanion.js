/**
 * BoyCompanion.js — Minimal: sleeps in a corner, click to relocate.
 */
(function (root) {
  'use strict';

  var BoyCompanion = root.BoyCompanion = root.BoyCompanion || {};
  var Config = BoyCompanion.Config;

  var instance = null;

  // Sleeping frame from atlas
  var SLEEP_FRAME = { x: 227, y: 188, w: 29, h: 38 };

  var CORNERS = [
    { x: 24, y: 'bottom' },
    { x: 'right', y: 'bottom' },
    { x: 24, y: 24 },
    { x: 'right', y: 24 },
    { x: 'center', y: 'bottom' }
  ];

  function Instance() {
    this.canvas = null;
    this.ctx = null;
    this.atlasImage = null;
    this.destroyed = false;
    this._pos = null;
  }

  Instance.prototype.init = function (options) {
    var self = this;
    var container = (options && options.container) || document.body;

    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        self.atlasImage = img;
        self._setup(container);
        self._place();
        resolve(self);
      };
      img.onerror = reject;
      img.src = Config.ATLAS_IMAGE_URL;
    });
  };

  Instance.prototype._setup = function (container) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    var s = canvas.style;
    s.position = 'fixed';
    s.pointerEvents = 'auto';
    s.zIndex = String(Config.Z_INDEX);
    s.imageRendering = 'pixelated';
    s.cursor = 'pointer';
    s.transition = 'left 1.2s ease, top 1.2s ease';

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    container.appendChild(canvas);

    var self = this;
    canvas.addEventListener('click', function () { self._relocate(); });

    // Draw the frame once to size the canvas
    var dpr = window.devicePixelRatio || 1;
    var renderH = Config.RENDER_HEIGHT_PX;
    var renderW = renderH * (SLEEP_FRAME.w / SLEEP_FRAME.h);
    canvas.width = Math.ceil(renderW * dpr);
    canvas.height = Math.ceil(renderH * dpr);
    canvas.style.width = renderW + 'px';
    canvas.style.height = renderH + 'px';

    this._renderW = renderW;
    this._renderH = renderH;
  };

  Instance.prototype._place = function () {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var w = this._renderW;
    var h = this._renderH;
    var margin = 16;

    // Pick a random corner
    var corner = CORNERS[Math.floor(Math.random() * CORNERS.length)];
    var x, y;

    if (corner.x === 'right') x = vw - w - margin;
    else if (corner.x === 'center') x = (vw - w) / 2;
    else x = margin;

    if (corner.y === 'bottom') y = vh - h - margin;
    else y = margin;

    this._pos = { x: x, y: y };
    this._draw();
  };

  Instance.prototype._draw = function () {
    if (!this.atlasImage || !this._pos) return;
    var ctx = this.ctx;
    var dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this._renderW, this._renderH);
    ctx.drawImage(
      this.atlasImage,
      SLEEP_FRAME.x, SLEEP_FRAME.y, SLEEP_FRAME.w, SLEEP_FRAME.h,
      0, 0, this._renderW, this._renderH
    );
    this.canvas.style.left = this._pos.x + 'px';
    this.canvas.style.top = this._pos.y + 'px';
  };

  Instance.prototype._relocate = function () {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var w = this._renderW;
    var h = this._renderH;
    var margin = 16;

    // Random position near edges/corners, not overlapping current
    var positions = [
      { x: margin, y: vh - h - margin },
      { x: vw - w - margin, y: vh - h - margin },
      { x: margin, y: margin },
      { x: vw - w - margin, y: margin },
      { x: (vw - w) / 2, y: vh - h - margin },
      { x: margin, y: (vh - h) / 2 },
      { x: vw - w - margin, y: (vh - h) / 2 }
    ];

    // Filter out current position
    var self = this;
    positions = positions.filter(function (p) {
      return Math.abs(p.x - self._pos.x) > 50 || Math.abs(p.y - self._pos.y) > 50;
    });

    var next = positions[Math.floor(Math.random() * positions.length)];
    this._pos = next;
    this._draw();
  };

  Instance.prototype.destroy = function () {
    this.destroyed = true;
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  };

  // ---- Public API (minimal) ----

  BoyCompanion.init = function (options) {
    if (window.FeatureFlags && !window.FeatureFlags.get('companion-boy')) return Promise.resolve(null);
    if (instance) return Promise.resolve(instance);
    instance = new Instance();
    return instance.init(options);
  };

  BoyCompanion.destroy = function () {
    if (!instance) return;
    instance.destroy();
    instance = null;
  };

  BoyCompanion.pause = function () {};
  BoyCompanion.resume = function () {};
  BoyCompanion.teleport = function () {};
  BoyCompanion.setMood = function () {};
  BoyCompanion.setWeather = function () {};
  BoyCompanion.setSky = function () {};
  BoyCompanion.onSectionChange = function () {};
  BoyCompanion.save = function () {};
  BoyCompanion.load = function () {};
  BoyCompanion.setMusicPlaying = function () {};
})(typeof window !== 'undefined' ? window : this);
