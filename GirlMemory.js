/**
 * GirlMemory.js
 * Everything the companion remembers between visits. Loaded once at init,
 * mutated in memory during the session, autosaved periodically and on
 * pagehide. Pure data + small helpers — no rendering or timing logic here.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  function defaultMemory() {
    return {
      version: 1,
      firstVisit: Date.now(),
      lastVisit: Date.now(),
      visitCount: 0,
      totalTimeMs: 0,

      sectionVisits: {},      // { sectionId: count }
      skyVisits: {},          // { skyName: count }
      flowersCollected: 0,
      starsCollected: 0,
      heartsPlaced: 0,
      secretsFound: {},       // { secretId: true }

      lastSection: null,
      lastMood: 'neutral',
      lastPage: null
    };
  }

  function GirlMemory(storageKey) {
    this.storageKey = storageKey;
    this.data = defaultMemory();
    this._sessionStart = Date.now();
  }

  GirlMemory.prototype.load = function () {
    var stored = GirlCompanion.Storage.get(this.storageKey, null);
    if (stored && typeof stored === 'object') {
      // merge onto defaults so new fields introduced by updates don't break old saves
      this.data = Object.assign(defaultMemory(), stored);
    }
    this.data.visitCount += 1;
    this.data.lastVisit = Date.now();
    this._sessionStart = Date.now();
    return this.data;
  };

  GirlMemory.prototype.save = function () {
    this.data.totalTimeMs += (Date.now() - this._sessionStart);
    this._sessionStart = Date.now();
    return GirlCompanion.Storage.set(this.storageKey, this.data);
  };

  GirlMemory.prototype.recordSectionVisit = function (sectionId) {
    if (!sectionId) return;
    this.data.sectionVisits[sectionId] = (this.data.sectionVisits[sectionId] || 0) + 1;
    this.data.lastSection = sectionId;
  };

  GirlMemory.prototype.recordSkyVisit = function (skyName) {
    if (!skyName) return;
    this.data.skyVisits[skyName] = (this.data.skyVisits[skyName] || 0) + 1;
  };

  GirlMemory.prototype.collectFlower = function () { this.data.flowersCollected++; };
  GirlMemory.prototype.collectStar = function () { this.data.starsCollected++; };
  GirlMemory.prototype.placeHeart = function () { this.data.heartsPlaced++; };

  GirlMemory.prototype.findSecret = function (id) {
    var isNew = !this.data.secretsFound[id];
    this.data.secretsFound[id] = true;
    return isNew;
  };

  GirlMemory.prototype.setMood = function (mood) { this.data.lastMood = mood; };

  GirlMemory.prototype.favoriteSection = function () {
    return topKey(this.data.sectionVisits);
  };

  GirlMemory.prototype.favoriteSky = function () {
    return topKey(this.data.skyVisits);
  };

  GirlMemory.prototype.isReturningVisitor = function () {
    return this.data.visitCount > 1;
  };

  function topKey(map) {
    var best = null, bestCount = -1;
    for (var k in map) {
      if (map.hasOwnProperty(k) && map[k] > bestCount) {
        best = k; bestCount = map[k];
      }
    }
    return best;
  }

  GirlCompanion.Memory = GirlMemory;
})(typeof window !== 'undefined' ? window : this);
