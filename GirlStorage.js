/**
 * GirlStorage.js
 * Thin, defensive wrapper around localStorage. Every call is try/caught so
 * private browsing, storage quotas, or disabled storage never crash the
 * companion — she just stops remembering, silently.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  function isAvailable() {
    try {
      var testKey = '__girlCompanion_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  var available = isAvailable();

  GirlCompanion.Storage = {
    isAvailable: function () { return available; },

    get: function (key, fallback) {
      if (!available) return fallback;
      try {
        var raw = window.localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },

    set: function (key, value) {
      if (!available) return false;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },

    remove: function (key) {
      if (!available) return;
      try { window.localStorage.removeItem(key); } catch (e) { /* noop */ }
    }
  };
})(typeof window !== 'undefined' ? window : this);
