/**
 * GirlAnimationController.js
 * Drives frame-by-frame playback of whatever animation is currently active,
 * against the manifest produced from the sprite sheet. Knows nothing about
 * canvas or DOM — GirlRenderer reads currentFrame() from this and draws it.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  function GirlAnimationController(manifest) {
    this.manifest = manifest; // { meta, animations: { name: {frames, fps, loop, fallback} } }
    this.current = null;
    this.frameIndex = 0;
    this.elapsed = 0;
    this.flipped = false;
    this.onComplete = null;
    this._playDefault();
  }

  GirlAnimationController.prototype._playDefault = function () {
    if (this.manifest.animations.idle) this.play('idle');
  };

  /**
   * Play an animation by name. If it isn't in the manifest (sprite sheet
   * didn't include it), gracefully falls back to 'idle' rather than throwing
   * or freezing on a blank frame — this satisfies the spec's "if an
   * animation is missing, gracefully fall back" requirement.
   */
  GirlAnimationController.prototype.play = function (name, opts) {
    opts = opts || {};
    var anim = this.manifest.animations[name];
    if (!anim || !anim.frames || !anim.frames.length) {
      if (name !== 'idle' && this.manifest.animations.idle) {
        return this.play('idle', opts);
      }
      return; // nothing playable at all — renderer will just hold last frame
    }
    if (this.currentName === name && !opts.restart) return;

    this.currentName = name;
    this.current = anim;
    this.frameIndex = 0;
    this.elapsed = 0;
    this.flipped = !!opts.flip;
    this.onComplete = opts.onComplete || null;
  };

  GirlAnimationController.prototype.setFlip = function (flipped) {
    this.flipped = flipped;
  };

  /** Advance playback. dtMs = milliseconds since last update. */
  GirlAnimationController.prototype.update = function (dtMs) {
    if (!this.current) return;
    var fps = this.current.fps || 6;
    var frameDuration = 1000 / fps;
    this.elapsed += dtMs;

    while (this.elapsed >= frameDuration) {
      this.elapsed -= frameDuration;
      this.frameIndex++;
      if (this.frameIndex >= this.current.frames.length) {
        if (this.current.loop) {
          this.frameIndex = 0;
        } else {
          this.frameIndex = this.current.frames.length - 1;
          if (this.onComplete) {
            var cb = this.onComplete;
            this.onComplete = null;
            cb();
          }
        }
      }
    }
  };

  GirlAnimationController.prototype.currentFrame = function () {
    if (!this.current) return null;
    return this.current.frames[this.frameIndex];
  };

  GirlAnimationController.prototype.isFinished = function () {
    if (!this.current || this.current.loop) return false;
    return this.frameIndex >= this.current.frames.length - 1 && this.elapsed === 0;
  };

  GirlCompanion.AnimationController = GirlAnimationController;
})(typeof window !== 'undefined' ? window : this);
