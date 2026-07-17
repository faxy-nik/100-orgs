(function () {
  var DB = 'ash-jukebox-db';
  var VER = 2;

  function openDB() {
    return new Promise(function (resolve, reject) {
      var r = indexedDB.open(DB, VER);
      r.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('counters')) db.createObjectStore('counters', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('songs')) db.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('config')) db.createObjectStore('config', { keyPath: 'key' });
      };
      r.onsuccess = function () { resolve(r.result); };
      r.onerror = function () { reject(r.error); };
    });
  }

  function getCounter(key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('counters', 'readonly');
        var store = tx.objectStore('counters');
        var g = store.get(key);
        g.onsuccess = function () {
          db.close();
          resolve(g.result ? g.result.count : 0);
        };
        g.onerror = function () { db.close(); reject(0); };
      });
    });
  }

  function incrementCounter(key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('counters', 'readwrite');
        var store = tx.objectStore('counters');
        var g = store.get(key);
        g.onsuccess = function () {
          var count = (g.result ? g.result.count : 0) + 1;
          store.put({ key: key, count: count });
          tx.oncomplete = function () { db.close(); resolve(count); };
        };
        g.onerror = function () { db.close(); reject(0); };
      });
    });
  }

  function getAllCounters() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('counters', 'readonly');
        var store = tx.objectStore('counters');
        var g = store.getAll();
        g.onsuccess = function () { db.close(); resolve(g.result || []); };
        g.onerror = function () { db.close(); reject([]); };
      });
    });
  }

  window.Track = {
    increment: incrementCounter,
    get: getCounter,
    getAll: getAllCounters
  };

  var page = window.location.pathname.split('/').pop() || 'index.html';
  incrementCounter('visit_' + page);
})();
