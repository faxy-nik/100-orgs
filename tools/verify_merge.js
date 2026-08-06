// Verify merged turn-on-steps.js matches every tools/enhance/*.enhanced.json field-for-field.
// Usage: node verify_merge.js   (exit 1 if any mismatch)
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'turn-on-steps.js');
const src = fs.readFileSync(file, 'utf8');
const steps = eval(src + '; getDefaultSteps();');
const byId = new Map(steps.map(s => [s.id, s]));
let bad = 0, checked = 0;
for (const f of fs.readdirSync(path.join(__dirname, 'enhance')).filter(f => f.endsWith('.enhanced.json'))) {
  for (const en of JSON.parse(fs.readFileSync(path.join(__dirname, 'enhance', f), 'utf8'))) {
    const st = byId.get(en.id);
    if (!st) { console.log('MISSING step', en.id); bad++; continue; }
    checked++;
    if (st.scene !== en.scene) { console.log(`step ${en.id} scene mismatch`); bad++; }
    if (st.prompt !== en.prompt) { console.log(`step ${en.id} prompt mismatch`); bad++; }
    for (let i = 0; i < en.options.length; i++) {
      if (st.options[i].next !== en.options[i].next) { console.log(`step ${en.id} opt ${i} next mismatch`); bad++; }
      if (st.options[i].text !== en.options[i].text) { console.log(`step ${en.id} opt ${i} (next:${en.options[i].next}) text mismatch`); bad++; }
      if (st.options[i].transition !== en.options[i].transition) { console.log(`step ${en.id} opt ${i} (next:${en.options[i].next}) transition mismatch`); bad++; }
    }
  }
}
console.log(bad ? `FAIL: ${bad} mismatches` : `OK: ${checked} steps match enhanced JSONs exactly`);
process.exit(bad ? 1 : 0);
