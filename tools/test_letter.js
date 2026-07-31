const assert = require('assert');

// ---- copies from letter-that-writes-itself.html (keep in sync) ----
function tokenize(body) {
  var tokens = [];
  var buf = '';
  function flush() { if (buf) { tokens.push({ t: buf, pause: 18 + Math.floor(Math.random() * 14) }); buf = ''; } }
  for (var i = 0; i < body.length; i++) {
    var c = body[i];
    if (c === ',') { flush(); tokens.push({ t: ',', pause: 260 }); }
    else if (c === '.' || c === '!' || c === '?') { flush(); tokens.push({ t: c, pause: 440 }); }
    else if (c === ';' || c === ':' || c === '—') { flush(); tokens.push({ t: c, pause: 320 }); }
    else if (c === ' ') { flush(); tokens.push({ t: ' ', pause: 28 }); }
    else if (c === '\n') { flush(); tokens.push({ t: '\n', pause: 40 }); }
    else buf += c;
  }
  flush();
  return tokens;
}

function pickLetter(letters, today, hist, secretMode) {
  var pool = [];
  for (var i = 0; i < letters.length; i++) {
    var l = letters[i];
    if (!l || l.enabled === false) continue;
    if (l.secret && !secretMode) continue;
    pool.push(l);
  }
  if (!pool.length) return null;
  for (var j = 0; j < pool.length; j++) {
    if (pool[j].scheduledDate === today) return pool[j];
  }
  if (pool.length > 1) {
    var fresh = pool.filter(function (l) { return hist.indexOf(String(l.id)) === -1; });
    if (fresh.length) pool = fresh;
  }
  pool.sort(function (a, b) { return (b.priority || 0) - (a.priority || 0) || (b.createdAt || 0) - (a.createdAt || 0); });
  return pool[0];
}

// ---- tokenizer tests ----
const body = 'Dear Ash,\n\nI noticed something today. The way you pause before you laugh — it stayed with me.\n\nYours, Faxy.';
const toks = tokenize(body);
const rebuilt = toks.map(t => t.t).join('');
assert.strictEqual(rebuilt, body, 'round-trip must equal original');
const p = t => t.pause;
assert.ok(p(toks.find(t => t.t === ',')) >= 200, 'comma pause ~260');
assert.ok(p(toks.find(t => t.t === '.')) >= 400, 'period pause ~440');
assert.ok(p(toks.find(t => t.t === '—')) >= 280, 'em-dash pause ~320');
assert.ok(p(toks.find(t => t.t === ' ')) < 100, 'space pause fast');
assert.ok(toks.find(t => t.t === '\n'), 'newline tokenized');

// ---- pickLetter tests ----
function L(id, o) { return Object.assign({ id: id, title: 't', body: 'b', enabled: true, secret: false }, o || {}); }
// scheduled wins over everything
assert.strictEqual(pickLetter([L('1', { scheduledDate: '2026-08-02', priority: 1 }), L('2', { scheduledDate: '2026-08-02', priority: 5 })], '2026-08-02', [], false).id, '1', 'first scheduled wins');
// secret excluded in normal mode
assert.strictEqual(pickLetter([L('1', { secret: true }), L('2')], '2026-08-02', [], false).id, '2', 'secret hidden normally');
// secret shown in secret mode
assert.strictEqual(pickLetter([L('1', { secret: true }), L('2')], '2026-08-02', [], true).id, '1', 'secret shown in secret mode');
// disabled excluded
assert.strictEqual(pickLetter([L('1', { enabled: false }), L('2')], '2026-08-02', [], false).id, '2', 'disabled excluded');
// history avoidance then cycle
assert.strictEqual(pickLetter([L('1'), L('2')], '2026-08-02', ['1'], false).id, '2', 'avoid repeat');
assert.ok(pickLetter([L('1'), L('2')], '2026-08-02', ['1', '2'], false), 'cycles when all seen');
// priority sorts
assert.strictEqual(pickLetter([L('1', { priority: 1 }), L('2', { priority: 9 })], '2026-08-02', [], false).id, '2', 'higher priority first');
// empty
assert.strictEqual(pickLetter([], '2026-08-02', [], false), null, 'empty -> null');
console.log('ALL PASS: tokenizer round-trip/punctuation-pauses; scheduled/secret/disabled/history/priority/empty');
