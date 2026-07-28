var fs = require('fs');
var content = fs.readFileSync('100-organs.html', 'utf8');
// Find the lock script - it's the one with var PAGE and (function () {
var start = content.indexOf('(function ()', content.indexOf('var PAGE') - 50);
var end = content.indexOf('</script>', start);
var script = content.substring(start, end);

console.log('Script starts with:', JSON.stringify(script.substring(0, 30)));
console.log('Script ends with:', JSON.stringify(script.substring(script.length - 30)));
console.log('Length:', script.length);

// Brace balance
var braceCount = 0;
for (var i = 0; i < script.length; i++) {
  var c = script[i];
  if (c === '{') braceCount++;
  else if (c === '}') {
    braceCount--;
    if (braceCount < 0) {
      console.log('Extra } at index', i);
      console.log('Context:', JSON.stringify(script.substring(Math.max(0,i-80), Math.min(script.length,i+20))));
      break;
    }
  }
}
if (braceCount > 0) console.log('Unclosed { count:', braceCount, 'at', script.substring(script.length - 50));
if (braceCount === 0) console.log('Braces balanced');

try {
  new Function(script);
  console.log('PARSE OK');
} catch (e) {
  console.log('PARSE ERROR:', e.message);
}
