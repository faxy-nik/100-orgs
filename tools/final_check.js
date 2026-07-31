const fs = require('fs');
const path = require('path');
const d = path.resolve(__dirname, '..') + path.sep;

let bad = 0;

const files = fs.readdirSync(d).filter(f => /\.(html|js)$/i.test(f));
const jsFiles = files.filter(f => f.endsWith('.js'));

for (const f of jsFiles) {
  try { new Function(fs.readFileSync(d + f, 'utf8')); }
  catch (e) { bad++; console.log('FAIL JS  ' + f + ': ' + e.message); }
}

for (const f of files.filter(f => f.endsWith('.html'))) {
  const s = fs.readFileSync(d + f, 'utf8');
  const blocks = [...s.matchAll(/<script(?!\s+src)[^>]*>([\s\S]*?)<\/script>/g)].filter(m => !/type\s*=\s*["']application\/json["']/.test(m[0])).map(m => m[1]).filter(b => b.trim());
  for (const b of blocks) {
    try { new Function(b); }
    catch (e) { bad++; console.log('FAIL HTML ' + f + ': ' + e.message); }
  }
  const refs = [...s.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)].map(m => m[1]);
  for (const r of refs) {
    if (/^(https?:|data:|mailto:|tel:|#|javascript:)/.test(r)) continue;
    const p = r.split(/[?#]/)[0];
    if (!p) continue;
    if (!fs.existsSync(d + p)) { bad++; console.log('MISSING ' + p + ' referenced by ' + f); }
  }
  const fetches = [...s.matchAll(/(?:fetch|getJSON|openURL)\(\s*["']([^"']+)["']/g)].map(m => m[1]);
  for (const r of fetches) {
    if (/^(https?:|data:)/.test(r)) continue;
    const p = r.split(/[?#]/)[0];
    if (!p) continue;
    if (!fs.existsSync(d + p)) { bad++; console.log('MISSING fetch ' + p + ' in ' + f); }
  }
}

const htmlNames = new Set(files.filter(f => f.endsWith('.html')).map(f => f.toLowerCase()));
const jsNames = new Set(jsFiles.map(f => f.toLowerCase()));

for (const f of files.filter(f => f.endsWith('.html'))) {
  const s = fs.readFileSync(d + f, 'utf8');
  const tpl = [...s.matchAll(/["']([a-z0-9._-]+\.(?:html|js))["']/g)].map(m => m[1].toLowerCase());
  const tpl2 = [...s.matchAll(/`[^`]*?\$\{[^}]*\}[^`]*?([a-z0-9._-]+\.(?:html|js))[^`]*?`/g)].map(m => m[1].toLowerCase());
  const pageRefs = new Set([...tpl, ...tpl2].filter(r => r.startsWith('http') === false));
  for (const r of pageRefs) {
    if (r.startsWith('http')) continue;
    if (/(?:^|[A-Za-z0-9_])(?:\.\.|\/)/.test(r)) continue;
    const isHtml = r.endsWith('.html');
    const pool = isHtml ? htmlNames : jsNames;
    if (!pool.has(r)) { bad++; console.log('DYNAMIC REF ' + r + ' in ' + f); }
  }
}

const missingJsRefs = [...jsFiles].forEach(f => {
  const s = fs.readFileSync(d + f, 'utf8');
  for (const m of s.matchAll(/["']([a-z0-9._-]+\.(?:html|json))["']/g)) {
    const r = m[1].toLowerCase();
    if (/^(?:https?:|data:)/.test(r)) continue;
    if (!/(?:\.\.|\/)/.test(r) && !htmlNames.has(r) && !fs.existsSync(d + r)) {
      // skip download filenames (e.g. downloadFile(x, 'wishes-export.json', ...))
      const before = s.slice(Math.max(0, m.index - 60), m.index);
      if (/download/i.test(before)) continue;
      bad++; console.log('JS REF ' + r + ' in ' + f);
    }
  }
});

console.log('checked ' + jsFiles.length + ' js files, ' + files.filter(f => f.endsWith('.html')).length + ' html files');
process.exit(bad ? 1 : 0);
