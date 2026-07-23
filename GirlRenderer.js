/**
 * GirlRenderer.js
 * Owns the DOM: a single absolutely-positioned <canvas>, drawn at device
 * pixel ratio, nearest-neighbor only (never blurred), never intercepting
 * pointer events. Purely a dumb painter — it draws whatever frame rect and
 * position it's told to, every tick.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};
  var Config = GirlCompanion.Config;

  function GirlRenderer(atlasImage, container) {
    this.atlasImage = atlasImage;
    this.container = container || document.body;
    this.dpr = window.devicePixelRatio || 1;

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    var style = this.canvas.style;
    style.position = 'fixed';
    style.left = '0px';
    style.top = '0px';
    style.pointerEvents = 'none';   // never intercepts clicks
    style.zIndex = String(Config.Z_INDEX);
    style.imageRendering = 'pixelated'; // nearest-neighbor, standards property
    style.willChange = 'transform';

    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.container.appendChild(this.canvas);

    this._boundResize = this._resize.bind(this);
    window.addEventListener('resize', this._boundResize);
  }

  GirlRenderer.prototype._resize = function () {
    this.dpr = window.devicePixelRatio || 1;
  };

  /**
   * Draw one frame.
   * frameRect: {x,y,w,h} within the atlas image (source pixels).
   * pos: {x,y} top-left position on screen (CSS pixels).
   * flipped: mirror horizontally (used for walking left vs right).
   */
  GirlRenderer.prototype.draw = function (frameRect, pos, flipped) {
    if (!frameRect) return;

    var aspect = frameRect.w / frameRect.h;
    var destH = Config.RENDER_HEIGHT_PX;
    var destW = destH * aspect;

    // size the backing canvas to cover viewport once; cheap since it's transparent-cleared each frame
    var vw = window.innerWidth, vh = window.innerHeight;
    var neededW = Math.round(vw * this.dpr);
    var neededH = Math.round(vh * this.dpr);
    if (this.canvas.width !== neededW || this.canvas.height !== neededH) {
      this.canvas.width = neededW;
      this.canvas.height = neededH;
      this.canvas.style.width = vw + 'px';
      this.canvas.style.height = vh + 'px';
    }

    var ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);

    ctx.save();
    if (flipped) {
      ctx.translate(pos.x + destW, pos.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.atlasImage, frameRect.x, frameRect.y, frameRect.w, frameRect.h, 0, 0, destW, destH);
    } else {
      ctx.drawImage(this.atlasImage, frameRect.x, frameRect.y, frameRect.w, frameRect.h, pos.x, pos.y, destW, destH);
    }
    ctx.restore();

    this._lastDestW = destW;
    this._lastDestH = destH;
  };

  GirlRenderer.prototype.lastSize = function () {
    return { w: this._lastDestW || Config.RENDER_HEIGHT_PX, h: this._lastDestH || Config.RENDER_HEIGHT_PX };
  };

  GirlRenderer.prototype.setVisible = function (visible) {
    this.canvas.style.display = visible ? '' : 'none';
  };

  GirlRenderer.prototype.destroy = function () {
    window.removeEventListener('resize', this._boundResize);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  };

  GirlCompanion.Renderer = GirlRenderer;

  /** Loads the atlas image + manifest JSON. Returns a Promise. */
  GirlCompanion.loadAssets = function () {
    var imgPromise = new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = Config.ATLAS_IMAGE_URL;
    });
    var jsonPromise = fetch(Config.ATLAS_JSON_URL).then(function (r) { return r.json(); });
    return Promise.all([imgPromise, jsonPromise]).then(function (results) {
      return { image: results[0], manifest: results[1] };
    });
  };
})(typeof window !== 'undefined' ? window : this);
