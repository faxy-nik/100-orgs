var fs = require('fs');
var content = fs.readFileSync('100-organs.html', 'utf8');
var start = content.indexOf('var PAGE');
var end = content.indexOf('</script>', start);
var script = content.substring(start, end);

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
if (braceCount > 0) console.log('Unclosed { count:', braceCount);
if (braceCount === 0) console.log('Braces balanced');
