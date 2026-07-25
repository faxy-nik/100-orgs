/* ---- Firebase Realtime Database Helper ---- */
/* Requires: firebase-app-compat.js + firebase-database-compat.js */

var FB = (function () {
  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  // --- in-memory store for local testing ---
  var memStore = {};
  var memSeq = 0;

  function memGetAll(store) { return Promise.resolve(memStore[store] || []); }
  function memGet(store, key) {
    var items = memStore[store] || [];
    for (var i = 0; i < items.length; i++) { if ((items[i].id || items[i].key) === key) return Promise.resolve(items[i]); }
    return Promise.resolve(null);
  }
  function memPut(store, data) {
    var key = data && (data.id || data.key);
    if (!memStore[store]) memStore[store] = [];
    var items = memStore[store];
    if (key) {
      for (var i = 0; i < items.length; i++) { if ((items[i].id || items[i].key) === key) { items[i] = data; return Promise.resolve({ key: key }); } }
      items.push(data);
      return Promise.resolve({ key: key });
    }
    data.id = 'local_' + (++memSeq);
    items.push(data);
    return Promise.resolve({ key: data.id });
  }
  function memDelete(store, key) {
    if (!memStore[store]) return Promise.resolve();
    memStore[store] = memStore[store].filter(function (x) { return (x.id || x.key) !== key; });
    return Promise.resolve();
  }
  function memClear(store) { memStore[store] = []; return Promise.resolve(); }

  if (isLocal) {
    return {
      init: function () {},
      getAll: memGetAll,
      get: memGet,
      put: memPut,
      delete: memDelete,
      clear: memClear,
      blobToBase64: function (blob) { return Promise.resolve(''); },
      base64ToBlob: function () { return null; }
    };
  }

  // 🔥 FILL IN YOUR FIREBASE CONFIG HERE (Firebase Console → Project Settings → General → Your apps → Web)
  var firebaseConfig = {
    apiKey: 'AIzaSyD30nS8GMLHvj1EunF141FAPAU4w9uVdBI',
    authDomain: 'faxy-ash.firebaseapp.com',
    databaseURL: 'https://faxy-ash-default-rtdb.firebaseio.com',
    projectId: 'faxy-ash',
    storageBucket: 'faxy-ash.firebasestorage.app',
    messagingSenderId: '920825271894',
    appId: '1:920825271894:web:f69a3d44dc350abe1f4df7',
    measurementId: 'G-RR3WJ8KK1L'
  };

  var db, initialized = false;

  function init() {
    if (initialized) return;
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded. Add script tags.');
      return;
    }
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    initialized = true;
  }

  function ref(store) { init(); return db.ref(store); }

  function fbGetAll(store) {
    return ref(store).once('value').then(function (snap) {
      var val = snap.val();
      if (!val) return [];
      var keys = Object.keys(val);
      var arr = [];
      for (var i = 0; i < keys.length; i++) {
        var item = val[keys[i]];
        if (typeof item === 'object' && item !== null) {
          item.id = keys[i];
          decodeBlobs(item);
          arr.push(item);
        }
      }
      return arr;
    });
  }

  function fbGet(store, key) {
    return ref(store).child(key).once('value').then(function (snap) {
      var val = snap.val();
      if (!val) return null;
      val.id = key;
      decodeBlobs(val);
      return val;
    });
  }

  function fbPut(store, data) {
    var itemKey = data && (data.id || data.key);
    var copy = {}, blobField = null, blobName = '';
    for (var k in data) {
      if (k === 'id' || k === 'key') continue;
      if (data[k] instanceof Blob) {
        blobField = k;
        blobName = k.replace('Blob', '');
        continue;
      }
      copy[k] = data[k];
    }
    if (blobField) {
      var blob = data[blobField];
      return blobToBase64(blob).then(function (b64) {
        copy['_' + blobName + 'Base64'] = b64;
        copy['_' + blobName + 'Type'] = blob.type;
        return doPut(store, copy, itemKey);
      });
    }
    return doPut(store, copy, itemKey);
  }

  function doPut(store, data, key) {
    if (key) {
      return ref(store).child(key).set(data).then(function () { return { key: key }; });
    }
    var newRef = ref(store).push();
    return newRef.set(data).then(function () { return { key: newRef.key }; });
  }

  function fbDelete(store, key) {
    return ref(store).child(key).remove();
  }

  function fbClear(store) {
    return ref(store).set(null);
  }

  function decodeBlobs(item) {
    for (var k in item) {
      if (k.indexOf('_Base64') > 0) {
        var prefix = k.slice(0, -7);
        var typeKey = prefix + 'Type';
        try {
          item[prefix + 'Blob'] = base64ToBlob(item[k], item[typeKey]);
        } catch(e) { /* ponytail: blob decode failure non-fatal */ }
        delete item[k];
        if (item[typeKey]) delete item[typeKey];
      }
    }
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var result = reader.result;
        var base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function base64ToBlob(b64, type) {
    var byteChars = atob(b64);
    var byteArr = new Uint8Array(byteChars.length);
    for (var i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
    return new Blob([byteArr], { type: type || 'audio/webm' });
  }

  return {
    init: init,
    getAll: fbGetAll,
    get: fbGet,
    put: fbPut,
    delete: fbDelete,
    clear: fbClear,
    blobToBase64: blobToBase64,
    base64ToBlob: base64ToBlob
  };
})();
