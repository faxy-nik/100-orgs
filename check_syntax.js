var fs = require('fs');
var content = fs.readFileSync('100-organs.html', 'utf8');
var start = content.indexOf('var k =');
var end = content.indexOf('</script>', start);
var script = content.substring(start, end);

var braces = 0, parens = 0;
for (var i = 0; i < script.length; i++) {
  var c = script[i];
  if (c === '{') braces++;
  else if (c === '}') braces--;
  else if (c === '(') parens++;
  else if (c === ')') parens--;
  if (braces < 0) { console.log('Extra } at', i); break; }
  if (parens < 0) { console.log('Extra ) at', i); break; }
}
console.log('Final braces:', braces, 'parens:', parens);

try {
  new Function(script);
  console.log('PARSE OK');
} catch (e) {
  console.log('PARSE ERROR:', e.message);
  console.log('Stack:', e.stack);
}
