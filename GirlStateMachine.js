/**
 * GirlStateMachine.js
 * Two responsibilities:
 *  1. Continuously evolve a small set of emotional variables (energy,
 *     comfort, curiosity, sleepiness, friendship, confidence, joy) based on
 *     context (time of day, scrolling, music, weather, idle duration).
 *  2. On an irregular schedule (never a fixed interval — that's what makes
 *     it feel alive rather than looping), pick the next behaviour from a
 *     weighted pool that both the emotional state and current context bias.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};
  var Config = GirlCompanion.Config;

  // The full behaviour pool. Each entry: name, base weight, and an optional
  // weight() function that adjusts likelihood based on live state/context.
  // "anim" is the animation to play; some behaviours are movement-only
  // (handled by GirlNavigation) and reuse walk/idle animations.
  var BEHAVIOURS = [
    { name: 'sit',            anim: 'sit',        base: 3, weight: function (s) { return s.energy < 0.4 ? 2 : 1; } },
    { name: 'walkSlowly',     anim: 'walk',        base: 4, kind: 'move' },
    { name: 'lookAround',     anim: 'lookAround',  base: 3, weight: function (s) { return 1 + s.curiosity; } },
    { name: 'blink',          anim: 'blink',       base: 2 },
    { name: 'stretch',        anim: 'stretch',     base: 2, weight: function (s) { return s.energy < 0.5 ? 2 : 0.5; } },
    { name: 'sleep',          anim: 'sleep',       base: 1, weight: function (s, c) { return s.sleepiness > 0.6 ? 4 : (c.isNight ? 1.5 : 0.2); } },
    { name: 'wake',           anim: 'idle',        base: 0.5 },
    { name: 'wave',           anim: 'wave',        base: 1, weight: function (s) { return s.friendship > 0.5 ? 2 : 0.7; } },
    { name: 'inspectFlowers', anim: 'touchFlower',  base: 1.5 },
    { name: 'inspectStars',   anim: 'collectStar',  base: 1, weight: function (s, c) { return c.isNight ? 2.5 : 0.3; } },
    { name: 'lookUpward',     anim: 'lookAtSky',    base: 1.5 },
    { name: 'lookAtCursor',   anim: 'thinking',     base: 1, kind: 'cursor' },
    { name: 'walkToLocation', anim: 'walk',         base: 3, kind: 'move' },
    { name: 'readNearbyText', anim: 'reading',       base: 1, kind: 'reading' },
    { name: 'admireImages',   anim: 'lookAround',    base: 1 },
    { name: 'watchSkies',     anim: 'gazeAtMoon',    base: 1, weight: function (s, c) { return c.isNight ? 2 : 0.4; } },
    { name: 'watchRain',      anim: 'umbrella',      base: 0, weight: function (s, c) { return c.weather === 'rain' ? 6 : 0; } },
    { name: 'watchSnow',      anim: 'lookAtSky',     base: 0, weight: function (s, c) { return c.weather === 'snow' ? 6 : 0; } },
    { name: 'collectFlowers', anim: 'collectFlower', base: 1.5, weight: function (s) { return s.joy > 0.5 ? 2 : 1; } },
    { name: 'collectStars',   anim: 'collectStar',   base: 1 },
    { name: 'leaveHearts',    anim: 'heart',         base: 0.8, weight: function (s) { return s.friendship > 0.6 ? 2.5 : 0.5; } },
    { name: 'yawn',           anim: 'yawn',          base: 1, weight: function (s) { return s.sleepiness > 0.5 ? 3 : 0.3; } },
    { name: 'thinking',       anim: 'thinking',      base: 1 },
    { name: 'dance',          anim: 'dance',         base: 0.6, weight: function (s, c) { return c.musicPlaying ? 3 : 0.1; } },
    { name: 'petCat',         anim: 'petCat',        base: 0.8, weight: function (s, c) { return c.cursorStillNear ? 3 : 0; } },
    { name: 'listenMusic',    anim: 'listenMusic',   base: 0.8, weight: function (s, c) { return c.musicPlaying ? 2.5 : 0; } },
    { name: 'drinkTea',       anim: 'drinkTea',      base: 1, weight: function (s, c) { return (c.isNight || s.comfort > 0.7) ? 2.5 : 0.5; } },
    { name: 'shy',            anim: 'shy',           base: 0.6, weight: function (s, c) { return c.shyTrigger ? 4 : 0; } },
    { name: 'turnAround',     anim: 'turnAround',    base: 0.8 },
    { name: 'point',          anim: 'point',         base: 0.8, weight: function (s, c) { return c.sectionType === 'new' ? 2 : 0.5; } },
    { name: 'sad',            anim: 'sad',           base: 0.5, weight: function (s) { return s.friendship < 0.3 ? 3 : 0.2; } },
    { name: 'spin',           anim: 'spin',          base: 0.4, weight: function (s) { return s.joy > 0.8 ? 3 : 0; } },
    { name: 'idle',           anim: 'idle',          base: 5 } // always available baseline
  ];

  // Very rare "hidden moments" — rolled separately, small chance per decision.
  var HIDDEN_MOMENTS = [
    { name: 'screenCorner', anim: 'sitOnCloud', kind: 'move-corner' },
    { name: 'fallAsleep',   anim: 'sleep' },
    { name: 'watchStars',   anim: 'gazeAtMoon' },
    { name: 'drawHearts',   anim: 'heart' },
    { name: 'waveAtNothing',anim: 'wave' },
    { name: 'stareIntoDistance', anim: 'thinking' },
    { name: 'sitUnderTree', anim: 'sitUnderTree' },
    { name: 'playFlute',    anim: 'playFlute' },
    { name: 'fishInClouds', anim: 'fishInClouds' },
    { name: 'readBook',     anim: 'readBook' },
    { name: 'watchButterfly', anim: 'watchButterfly' }
  ];

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  function GirlStateMachine(bus) {
    this.bus = bus;
    this.state = {
      energy: 0.8, comfort: 0.7, curiosity: 0.6,
      sleepiness: 0.2, friendship: 0.3, confidence: 0.6, joy: 0.6
    };
    this.context = {
      isNight: false, weather: 'clear', musicPlaying: false,
      sectionType: 'normal', idleDurationMs: 0, scrolling: false,
      cursorStillNear: false, shyTrigger: false
    };
    this.history = [];
    this._nextDecisionAt = 0;
    this._clock = 0;
  }

  GirlStateMachine.prototype.setContext = function (patch) {
    Object.assign(this.context, patch);
  };

  GirlStateMachine.prototype.notifyInteraction = function (kind) {
    // interacting with the visitor nudges friendship/joy/confidence up a little
    this.state.friendship = clamp01(this.state.friendship + 0.01);
    this.state.joy = clamp01(this.state.joy + 0.02);
    this.state.confidence = clamp01(this.state.confidence + 0.01);
  };

  GirlStateMachine.prototype.tick = function (dtMs) {
    this._clock += dtMs;
    var dtS = dtMs / 1000;
    var rates = Config.STATE_RATES;
    var s = this.state, c = this.context;

    s.energy = clamp01(s.energy - rates.energy.decay * dtS * (c.scrolling ? 1.5 : 1));
    s.comfort = clamp01(s.comfort - rates.comfort.decay * dtS + (c.sectionType === 'cozy' ? 0.002 * dtS : 0));
    s.curiosity = clamp01(s.curiosity - rates.curiosity.decay * dtS + (c.sectionType === 'new' ? 0.01 * dtS : 0));
    s.sleepiness = clamp01(s.sleepiness + rates.sleepiness.growth * dtS * (c.isNight ? 1.6 : 1));
    s.friendship = clamp01(s.friendship + rates.friendship.growth * dtS);
    s.confidence = clamp01(s.confidence - rates.confidence.decay * dtS);
    s.joy = clamp01(s.joy - rates.joy.decay * dtS + (c.musicPlaying ? 0.004 * dtS : 0));

    if (this._clock >= this._nextDecisionAt) {
      this._scheduleNext();
      return this._decide();
    }
    return null;
  };

  GirlStateMachine.prototype._scheduleNext = function () {
    var min = Config.DECISION_INTERVAL_MIN_MS, max = Config.DECISION_INTERVAL_MAX_MS;
    this._nextDecisionAt = this._clock + (min + Math.random() * (max - min));
  };

  GirlStateMachine.prototype._decide = function () {
    if (Math.random() < Config.HIDDEN_MOMENT_CHANCE) {
      var hidden = HIDDEN_MOMENTS[Math.floor(Math.random() * HIDDEN_MOMENTS.length)];
      this._pushHistory(hidden.name);
      this.bus.emit('behaviour:decided', hidden);
      return hidden;
    }

    var s = this.state, c = this.context;
    var pool = [];
    var totalWeight = 0;
    for (var i = 0; i < BEHAVIOURS.length; i++) {
      var b = BEHAVIOURS[i];
      if (this.history.indexOf(b.name) !== -1) continue; // avoid immediate repeats
      var w = b.weight ? b.base * Math.max(0, b.weight(s, c)) : b.base;
      if (w <= 0) continue;
      pool.push({ b: b, w: w });
      totalWeight += w;
    }
    if (!pool.length) return { name: 'idle', anim: 'idle' };

    var roll = Math.random() * totalWeight;
    for (var j = 0; j < pool.length; j++) {
      roll -= pool[j].w;
      if (roll <= 0) {
        this._pushHistory(pool[j].b.name);
        this.bus.emit('behaviour:decided', pool[j].b);
        return pool[j].b;
      }
    }
    var last = pool[pool.length - 1].b;
    this._pushHistory(last.name);
    return last;
  };

  GirlStateMachine.prototype._pushHistory = function (name) {
    this.history.push(name);
    if (this.history.length > Config.ACTION_HISTORY_LENGTH) this.history.shift();
  };

  GirlCompanion.StateMachine = GirlStateMachine;
})(typeof window !== 'undefined' ? window : this);
