const fs = require('fs');
const src = fs.readFileSync('turn-on.html', 'utf8');
const stepRe = /\{\s*id:\s*(\d+)([\s\S]*?)\n\s*\}/g;
let m, steps = [];
while ((m = stepRe.exec(src))) {
  const id = parseInt(m[1]);
  const nx = [...m[2].matchAll(/next:\s*(-?\d+)/g)].map(x => parseInt(x[1]));
  steps.push({ id, nx });
}
const by = new Map(steps.map(s => [s.id, s]));
const entries = [1, 2, 400, 500, 600, 700];

// 1. reachability from entries
const seen = new Set();
const stack = [...entries];
while (stack.length) {
  const id = stack.pop();
  if (seen.has(id)) continue;
  seen.add(id);
  const st = by.get(id);
  if (!st) { console.log('MISSING step referenced:', id); continue; }
  for (const n of st.nx) if (n !== -1) stack.push(n);
}
const all = steps.map(s => s.id);
const missing = all.filter(id => !seen.has(id));
console.log('total steps:', all.length, '| reachable:', seen.size);
console.log('UNREACHABLE:', missing.join(','));

// 2. cycle check (DFS color, from each entry)
let cyclic = [];
const color = new Map();
function dfs(id) {
  color.set(id, 1);
  const st = by.get(id);
  for (const n of st.nx) {
    if (n === -1) continue;
    if (color.get(n) === 1) { cyclic.push(id + '->' + n); continue; }
    if (!color.has(n)) dfs(n);
  }
  color.set(id, 2);
}
for (const e of entries) if (!color.has(e)) dfs(e);
console.log('CYCLES:', cyclic.length ? cyclic.join(',') : 'none');

// 3. duplicate nexts within a step (allow, report count for info)
const dup = steps.filter(s => s.nx.length === 2 && s.nx[0] === s.nx[1] && s.nx[0] !== -1);
console.log('steps with duplicate nexts (info):', dup.length);

// 4. every non-(-1) next target must exist
let bad = [];
for (const s of steps) for (const n of s.nx) if (n !== -1 && !by.has(n)) bad.push(s.id + '->' + n);
console.log('BROKEN nexts:', bad.length ? bad.join(',') : 'none');
