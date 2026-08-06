// Split turn-on-steps.js into per-branch JSON files for text enhancement.
// Usage: node turnon_split.js
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'turn-on-steps.js');
const src = fs.readFileSync(file, 'utf8');
const steps = eval(src + '; getDefaultSteps();');

const starts = [1400, 1300, 1200, 1100, 1000, 900, 800, 700, 600, 500, 400];
function gid(id) {
  if (id < 100) return 2;
  for (const s of starts) if (id >= s && id < s + 100) return s;
  return 999;
}

const dir = path.resolve(__dirname, 'enhance');
fs.mkdirSync(dir, { recursive: true });
for (const f of fs.readdirSync(dir)) fs.rmSync(path.join(dir, f), { force: true });

const groups = {};
for (const s of steps) {
  const g = gid(s.id);
  (groups[g] = groups[g] || []).push(s);
}
let total = 0;
for (const g of Object.keys(groups)) {
  const list = groups[g];
  total += list.length;
  if (g === '999') {
    const byH = {};
    for (const s of list) {
      const h = Math.floor(s.id / 100);
      (byH[h] = byH[h] || []).push(s);
    }
    for (const h of Object.keys(byH)) {
      fs.writeFileSync(path.join(dir, 'branch-999-' + h + '.json'), JSON.stringify(byH[h], null, 2));
    }
    console.log('branch-999-' + Object.keys(byH).join('+'), list.length, '(ending paths)');
  } else {
    fs.writeFileSync(path.join(dir, 'branch-' + g + '.json'), JSON.stringify(list, null, 2));
    console.log('branch-' + g, list.length);
  }
}
console.log('total', total);
