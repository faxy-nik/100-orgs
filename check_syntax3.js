var fs = require('fs');
var content = fs.readFileSync('100-organs.html', 'utf8');
var start = content.indexOf('var k =');
var end = content.indexOf('</script>', start);
var script = content.substring(start, end);

// Write the script to a file for inspection
fs.writeFileSync('inline_script.js', script);
console.log('Script written to inline_script.js, length:', script.length);

// Find extra brace
var braceCount = 0;
for (var i = 0; i < script.length; i++) {
  var c = script[i];
  if (c === '{') braceCount++;
  else if (c === '}') {
    braceCount--;
    if (braceCount < 0) {
      console.log('Extra } at index', i);
      console.log('Context:', JSON.stringify(script.substring(Math.max(0,i-100), Math.min(script.length,i+100))));
      break;
    }
  }
}
