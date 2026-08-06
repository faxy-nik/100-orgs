// Merge tools/enhance/branch-*.enhanced.json text fields back into turn-on-steps.js in place.
// Only scene/prompt/option text/option transition literals are replaced; structure is verified unchanged.
// Usage: node turnon_merge.js
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'turn-on-steps.js');
let src = fs.readFileSync(file, 'utf8');
const stepRe = /\{\s*id:\s*(\d+)([\s\S]*?)\n\s*\}/g;
const steps = eval(src + '; getDefaultSteps();');
const byId = new Map(steps.map(s => [s.id, s]));

const litRe = (field) => new RegExp('\\b' + field + ":\\s*'((?:[^'\\\\]|\\\\.)*)'", 'g');
const escSingle = (v) => String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

let changed = 0, skipped = 0;
const dir = path.resolve(__dirname, 'enhance');
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.enhanced.json'))) {
  const items = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const en of items) {
    const orig = byId.get(en.id);
    if (!orig) { console.log('SKIP unknown id', en.id, 'in', f); skipped++; continue; }
    const sameStructure =
      ['level', 'mood', 'energy', 'symbol', 'pause', 'hub'].every(k => JSON.stringify(orig[k]) === JSON.stringify(en[k])) &&
      (orig.options ? orig.options.length : 0) === (en.options ? en.options.length : 0) &&
      (orig.options || []).every((o, i) => o.next === en.options[i].next);
    if (!sameStructure) { console.log('SKIP structural change', en.id, 'in', f); skipped++; continue; }

    stepRe.lastIndex = 0;
    let m;
    while ((m = stepRe.exec(src))) {
      if (parseInt(m[1]) !== en.id) continue;
      let body = m[2];
      let pos = 0;
      const replaceAt = (field, occurrence, value) => {
        const re = litRe(field);
        re.lastIndex = pos;
        const mm = re.exec(body);
        if (!mm) return false;
        const lit = "'" + escSingle(value) + "'";
        const prefix = mm[0].slice(0, mm[0].indexOf("'"));
        body = body.slice(0, mm.index) + prefix + lit + body.slice(re.lastIndex);
        pos = mm.index + prefix.length + lit.length;
        return true;
      };
      const countField = (field) => {
        const re = litRe(field);
        re.lastIndex = 0;
        let n = 0;
        while (re.exec(body)) n++;
        return n;
      };
      const transCount = countField('transition');
      replaceAt('scene', 0, en.scene || '');
      replaceAt('prompt', 0, en.prompt || '');
      (en.options || []).forEach((o, i) => {
        if (o.text !== undefined) replaceAt('text', i, o.text);
        if (o.transition !== undefined && transCount === en.options.length) replaceAt('transition', i, o.transition);
      });
      const bodyStart = m[0].indexOf(m[2]);
      src = src.slice(0, m.index) + m[0].slice(0, bodyStart) + body + m[0].slice(bodyStart + m[2].length) + src.slice(m.index + m[0].length);
      changed++;
      break;
    }
  }
}
fs.writeFileSync(file, src);
console.log('merged text into', changed, 'steps; skipped', skipped);

// post-merge guard: file must parse and every step must keep its required keys
try {
  const check = eval(src + '; getDefaultSteps();');
  const badSteps = check.filter(function (s) {
    return s.prompt === undefined || s.scene === undefined || !Array.isArray(s.options);
  });
  if (badSteps.length) { console.log('POST-MERGE FAIL: missing keys on', badSteps.slice(0, 5).map(s => s.id).join(',')); process.exit(1); }
  const allT = check.some(function (s) {
    return String(s.prompt).indexOf('undefined') >= 0 || String(s.scene).indexOf('undefined') >= 0 ||
      s.options.some(function (o) { return String(o.text).indexOf('undefined') >= 0; });
  });
  if (allT) { console.log('POST-MERGE FAIL: literal "undefined" leaked into text'); process.exit(1); }
  console.log('post-merge check OK:', check.length, 'steps, all keys present');
} catch (e) {
  console.log('POST-MERGE FAIL:', e.message);
  process.exit(1);
}
