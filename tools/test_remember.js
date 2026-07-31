const assert = require('assert');
// copy of pickMemory from i-remember.html (keep in sync)
var RARE_WEIGHT = 0.15;
function pickMemory(items, hist, onceDone, rnd) {
  var never = [];
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    if (it.on === false) continue;
    if (it.once && onceDone.indexOf(it.id) !== -1) continue;
    never.push({ item: it, w: it.rare ? RARE_WEIGHT : 1 });
  }
  if (!never.length) return null;
  if (never.length > 16) {
    var fresh = never.filter(function (e) { return hist.indexOf(e.item.id) === -1; });
    if (fresh.length) never = fresh;
  }
  var total = 0;
  for (var j = 0; j < never.length; j++) total += never[j].w;
  var r = rnd() * total;
  for (var k = 0; k < never.length; k++) {
    r -= never[k].w;
    if (r <= 0) return never[k].item;
  }
  return never[never.length - 1].item;
}

function item(id, o) { return Object.assign({ id: id, cat: '', text: 't' + id, rare: false, once: false, on: true }, o || {}); }
function seq(r) { return function () { return r; }; }

// 1. disabled excluded
assert.strictEqual(pickMemory([item('1'), item('2', { on: false })], [], [], seq(0.1)).id, '1', 'disabled excluded');
// 2. once + already done excluded forever (string ids, like Firebase keys)
assert.strictEqual(pickMemory([item('1', { once: true })], [], ['1'], seq(0.1)), null, 'once done excluded');
// 3. once but not done yet -> eligible
assert.strictEqual(pickMemory([item('1', { once: true })], [], [], seq(0.1)).id, '1', 'once eligible until shown');
// 4. recent history excluded while enough alternatives
{
  const items = [];
  for (let i = 1; i <= 18; i++) items.push(item(String(i)));
  const hist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  const p = pickMemory(items, hist, [], seq(0.0001));
  assert.ok(p.id !== '1', 'recent excluded: got ' + p.id);
}
// 5. cycles when everything was seen recently
{
  const items = [item('1'), item('2'), item('3')];
  const hist = ['1', '2', '3'];
  const p = pickMemory(items, hist, [], seq(0.5));
  assert.ok(p, 'cycles when all seen');
}
// 6. rare weighted: rnd in normal range returns a normal item
{
  const items = [item('1', { rare: true }), item('2')];
  const p = pickMemory(items, [], [], seq(0.5));
  assert.strictEqual(p.id, '2', 'rare low-weighted: got ' + p.id);
}
// 7. empty collection
assert.strictEqual(pickMemory([], [], [], seq(0.5)), null, 'empty -> null');
console.log('ALL PASS: disabled/once/history/cycle/rare-weight/empty');
