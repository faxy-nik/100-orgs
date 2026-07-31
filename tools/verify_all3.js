const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..') + path.sep;
const file = root + 'turn-on.html';
const src = fs.readFileSync(file, 'utf8');

const a = src.indexOf('<script>'), b = src.lastIndexOf('</script>');
try { new Function(src.substring(a + 8, b)); console.log('1. syntax OK'); }
catch (e) { console.log('1. SYNTAX ERROR:', e.message); process.exit(1); }

const s = src.indexOf('function getDefaultSteps()');
const end = src.indexOf('];', src.indexOf('function loadSteps'));
const block = src.substring(s, end + 2);
const stepRe = /\{\s*id:\s*(\d+)([\s\S]*?)\n\s*\}/g;
let m, steps = new Map();
while ((m = stepRe.exec(block))) {
  const body = m[2];
  steps.set(parseInt(m[1]), {
    opts: [...body.matchAll(/text:\s*'((?:[^'\\]|\\.)*)'/g)].map(x => x[1]),
    nx: [...body.matchAll(/next:\s*(-?\d+)/g)].map(x => parseInt(x[1]))
  });
}
console.log('2. steps:', steps.size, 'options:', [...steps.values()].reduce((a, v) => a + v.opts.length, 0));

// forward-only + unique nexts
let fwd = 0, dupN = 0;
for (const [id, v] of steps) {
  for (const n of v.nx) if (n !== -1 && n <= id) { fwd++; console.log('   BACKWARD step', id, '->', n); }
  if (new Set(v.nx).size !== v.nx.length) { dupN++; console.log('   DUP next in step', id); }
}
console.log('3. backward refs:', fwd, '| steps with duplicate nexts:', dupN);

// references
let refs = new Map();
for (const [id, v] of steps) for (const n of v.nx) {
  if (n !== -1 && !refs.has(n)) refs.set(n, []);
  if (n !== -1) refs.get(n).push(id);
}
const deadOld = [];
for (const id of steps.keys()) if (!refs.has(id) && ![1].includes(id)) deadOld.push(id);
console.log('4. unreferenced steps:', deadOld.join(',') || 'none');

const badRefs = [...refs.entries()].filter(([n]) => !steps.has(n));
console.log('5. refs to missing steps:', badRefs.map(([n, v]) => n + '<-' + v.join(',')).join('; ') || 'none');
console.log('6. deleted 401-414 still referenced:', refs.has(401) || refs.has(402) || refs.has(403) ? 'YES (BAD)' : 'no');
console.log('7. 440-454 present:', [440, 447, 449, 454].every(i => steps.has(i)));

// voice audit
const ash = [
  /^(fuck me|kiss me|touch me|hold me|fill me|make me|let me|watch me|mark me|bite me|take me|come for me|suck me|lick me|eat me|taste me|use me|ride me)/i,
  /^(do not stop|please|untie me|flip me|move me|finger me)/i,
  /I (need|want) you to (fuck|finger|kiss|touch|take|eat|lick|fill|hold)/i,
  /^I need your /i, /^I am yours/i,
  /inside me\b|between my legs\b|into my mouth\b|on my tongue\b|around your cock\b|in my mouth\b/i
];
let n = 0;
for (const [id, v] of steps) for (const o of v.opts) if (ash.some(p => p.test(o))) { n++; console.log('   VOICE', id + ':', o.slice(0, 80)); }
console.log('8. ash-voice in options:', n);

const seen = new Map();
for (const [id, v] of steps) for (const o of v.opts) {
  if (!seen.has(o)) seen.set(o, []);
  seen.get(o).push(id);
}
const dups = [...seen.entries()].filter(([t, ids]) => ids.length > 2);
console.log('9. options in 3+ steps:', dups.length);
dups.slice(0, 10).forEach(([t, ids]) => console.log('   ', ids.length + 'x', t.slice(0, 60), '@', ids.join(',')));

// hub + entry spot checks
for (const id of [1, 400, 500]) {
  const v = steps.get(id);
  console.log('10. step', id, '->', v.nx.join(','), '|', v.opts.map(o => o.slice(0, 40)).join(' || '));
}
