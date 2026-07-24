/**
 * GirlCompanion.js
 * Public API. Everything else in this system is an internal module reached
 * only through here. Usage:
 *
 *   GirlCompanion.init({ container: document.body }).then(() => { ... });
 *   GirlCompanion.pause();  GirlCompanion.resume();  GirlCompanion.destroy();
 *   GirlCompanion.setWeather('rain');  GirlCompanion.setSky('night');
 *   GirlCompanion.teleport({x: 100, y: 400});
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};
  var Config = GirlCompanion.Config;

  var instance = null;

  function Instance() {
    this.bus = new GirlCompanion.EventBus();
    this.memory = new GirlCompanion.Memory(Config.STORAGE_KEY);
    this.paused = false;
    this.destroyed = false;
    this.reducedMotion = false;
    this.batterySaver = false;
    this._lastFrameTime = null;
    this._raf = null;
    this._teardownEnv = null;
    this._autosaveTimer = null;
  }

  Instance.prototype.init = function (options) {
    options = options || {};
    var self = this;

    return GirlCompanion.loadAssets().then(function (assets) {
      self.memory.load();

      self.renderer = new GirlCompanion.Renderer(assets.image, options.container);
      self.anim = new GirlCompanion.AnimationController(assets.manifest);
      self.navigation = new GirlCompanion.Navigation(function () { return self.renderer.lastSize(); });
      self.state = new GirlCompanion.StateMachine(self.bus);
      self.interactions = new GirlCompanion.Interactions(self.bus, self.navigation);

      self._teardownEnv = GirlCompanion.wireEnvironmentEvents(self.bus);
      self._wireBusHandlers();

      self._autosaveTimer = setInterval(function () { self.memory.save(); }, Config.AUTOSAVE_INTERVAL_MS);
      window.addEventListener('pagehide', function () { self.memory.save(); });

      self._lastFrameTime = performance.now();
      self._loop();

      if (self.memory.isReturningVisitor()) {
        self.anim.play('happy');
        self._emitParticles('sparkles');
      }

      return self;
    });
  };

  Instance.prototype._wireBusHandlers = function () {
    var self = this;

    self.bus.on('page:hidden', function () { self.pause(); });
    self.bus.on('page:visible', function () { self.resume(); });

    self.bus.on('motion:preference', function (data) {
      self.reducedMotion = data.reduced && Config.RESPECT_REDUCED_MOTION;
    });

    self.bus.on('battery:status', function (data) { self.batterySaver = data.saver; });

    self.bus.on('viewport:scroll', function () {
      self.state.setContext({ scrolling: true });
      clearTimeout(self._scrollStopTimer);
      self._scrollStopTimer = setTimeout(function () {
        self.state.setContext({ scrolling: false });
      }, 400);
    });

    self.bus.on('section:change', function (data) {
      self.memory.recordSectionVisit(data.id);
      var isNew = !self._lastSeenSection || self._lastSeenSection !== data.id;
      self._lastSeenSection = data.id;
      var emotional = data.el.hasAttribute(Config.EMOTIONAL_SECTION_ATTR);
      self.state.setContext({ sectionType: emotional ? 'cozy' : (isNew ? 'new' : 'normal') });
      if (isNew && self.memory.data.sectionVisits[data.id] === 1) {
        self.anim.play('celebrate', { onComplete: function () { self.anim.play('idle'); } });
        self._emitParticles('sparkles');
      }
      if (emotional) {
        self._emitParticles('flowers');
      }
    });

    self.bus.on('reading:candidate', function (data) {
      if (self.paused || self.navigation.isMoving()) return;
      var target = { x: data.x - self.renderer.lastSize().w / 2, y: data.y + 30 };
      self.navigation.moveTo(target);
      self.anim.play('reading');
      if (data.emotional) {
        self.state.state.comfort = Math.min(1, self.state.state.comfort + 0.05);
        self._emitParticles('hearts');
      }
    });

    self.bus.on('cursor:fastMove', function () {
      if (Math.random() < 0.4) {
        self.anim.play('surprised', { onComplete: function () { self.anim.play('idle'); } });
        self._emitParticles('sparkles');
      }
      self.state.setContext({ shyTrigger: true });
      clearTimeout(self._shyTimer);
      self._shyTimer = setTimeout(function () {
        self.state.setContext({ shyTrigger: false });
      }, 8000);
    });

    self.bus.on('cursor:stillNear', function (data) {
      self.state.setContext({ cursorStillNear: data.near });
    });
  };

  Instance.prototype._loop = function () {
    var self = this;
    this._raf = requestAnimationFrame(function (now) {
      if (self.destroyed) return;
      var dt = now - self._lastFrameTime;
      self._lastFrameTime = now;

      if (!self.paused) {
        var fpsCap = self.batterySaver ? Config.BATTERY_SAVER_FPS_CAP : 60;
        var minFrameMs = 1000 / fpsCap;
        if (dt >= minFrameMs || dt > 250) {
          self._update(Math.min(dt, 100)); // clamp huge tab-switch gaps
        }
      }
      self._loop();
    });
  };

  Instance.prototype._update = function (dt) {
    var decision = this.state.tick(dt);
    if (decision && !this.navigation.isMoving()) {
      this._act(decision);
    }

    this._blinkTimer = (this._blinkTimer || 0) + dt;
    if (this._blinkTimer > 2500 + Math.random() * 2000) {
      this._blinkTimer = 0;
      this.renderer.blink();
    }

    this.navigation.update(dt);
    this.anim.update(dt);

    var isWalking = this.navigation.isMoving();
    if (isWalking && this.anim.currentName !== 'walk' && this.anim.currentName !== 'run') {
      this.anim.play('walk');
    } else if (!isWalking && (this.anim.currentName === 'walk' || this.anim.currentName === 'run')) {
      this.anim.play('idle');
    }
    this.anim.setFlip(!this.navigation.facingRight);

    var pos = this.navigation.pos;
    this.renderer.draw(this.anim.currentFrame(), pos, this.anim.flipped);

    var size = this.renderer.lastSize();
    this.interactions.evaluateProximity({ x: pos.x + size.w / 2, y: pos.y + size.h / 2 });

    // Overlap escape: if currently overlapping an exclusion, flee to safe spot
    this._overlapCheckTimer = (this._overlapCheckTimer || 0) + dt;
    if (this._overlapCheckTimer > 1500) {
      this._overlapCheckTimer = 0;
      if (!this.navigation._isSafe(pos.x, pos.y) && !this.navigation.isMoving()) {
        var escape = this.navigation.findEmptyArea();
        if (escape) {
          this.navigation.moveTo(escape);
          this.anim.play('run');
        }
      }
    }
  };

  Instance.prototype._act = function (behaviour) {
    if (behaviour.kind === 'move' || behaviour.kind === 'move-corner') {
      var target = behaviour.kind === 'move-corner'
        ? { x: Config.SCREEN_MARGIN_PX, y: window.innerHeight - this.renderer.lastSize().h - Config.SCREEN_MARGIN_PX }
        : this.navigation.pickWanderTarget();
      if (target) {
        this.navigation.moveTo(target);
        return;
      }
    }
    this.anim.play(behaviour.anim || 'idle', {
      onComplete: (function (self) { return function () { self.anim.play('idle'); }; })(this)
    });
    // particles on specific animations
    if (behaviour.anim === 'heart' || behaviour.anim === 'leaveHearts') this._emitParticles('hearts');
    else if (behaviour.anim === 'celebrate') this._emitParticles('sparkles');
    else if (behaviour.anim === 'dance' || behaviour.anim === 'listenMusic') this._emitParticles('notes');
    else if (behaviour.anim === 'sleep') this._emitParticles('zzz');
    else if (behaviour.anim === 'collectFlower' || behaviour.anim === 'touchFlower') this._emitParticles('flowers');
    else if (behaviour.anim === 'collectStar' || behaviour.anim === 'gazeAtMoon') this._emitParticles('stars');
    else if (behaviour.anim === 'happy' || behaviour.anim === 'wave') this._emitParticles('hearts');
  };

  Instance.prototype._emitParticles = function (type) {
    if (!GirlCompanion.Particles || this.reducedMotion) return;
    var pos = this.navigation.pos;
    var size = this.renderer.lastSize();
    var cx = pos.x + size.w / 2;
    var cy = pos.y;
    GirlCompanion.Particles[type](cx, cy);
  };

  // ---- Public API ----

  GirlCompanion.init = function (options) {
    if (window.FeatureFlags && !window.FeatureFlags.get('companion-girl')) return Promise.resolve(null);
    if (instance) return Promise.resolve(instance);
    instance = new Instance();
    return instance.init(options);
  };

  GirlCompanion.destroy = function () {
    if (!instance) return;
    instance.destroyed = true;
    if (instance._raf) cancelAnimationFrame(instance._raf);
    if (instance._teardownEnv) instance._teardownEnv();
    if (instance._autosaveTimer) clearInterval(instance._autosaveTimer);
    if (instance.navigation) instance.navigation.destroy();
    if (instance.interactions) instance.interactions.destroy();
    if (instance.renderer) instance.renderer.destroy();
    instance.memory.save();
    instance = null;
  };

  GirlCompanion.pause = function () { if (instance) instance.paused = true; };
  GirlCompanion.resume = function () {
    if (instance) { instance.paused = false; instance._lastFrameTime = performance.now(); }
  };

  GirlCompanion.teleport = function (point) { if (instance) instance.navigation.teleport(point); };

  GirlCompanion.setMood = function (moodAnim) {
    if (!instance) return;
    instance.anim.play(moodAnim);
    instance.memory.setMood(moodAnim);
  };

  GirlCompanion.setWeather = function (weather) { if (instance) instance.state.setContext({ weather: weather }); };
  GirlCompanion.setSky = function (sky) {
    if (!instance) return;
    instance.state.setContext({ isNight: sky === 'night' });
    instance.memory.recordSkyVisit(sky);
  };

  /** Host page can call this manually instead of relying on the IntersectionObserver. */
  GirlCompanion.onSectionChange = function (sectionId, el) {
    if (instance) instance.bus.emit('section:change', { id: sectionId, el: el || document.body });
  };

  GirlCompanion.save = function () { if (instance) instance.memory.save(); };
  GirlCompanion.load = function () { if (instance) return instance.memory.load(); };

  GirlCompanion.setMusicPlaying = function (playing) { if (instance) instance.state.setContext({ musicPlaying: !!playing }); };
})(typeof window !== 'undefined' ? window : this);
