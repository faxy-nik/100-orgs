var fs = require('fs');
var content = fs.readFileSync('100-organs.html', 'utf8');
var start = content.indexOf('var k =');
var end = content.indexOf('</script>', start);
var script = content.substring(start, end);

// Show the problematic area
console.log('Around position 2104:');
console.log(script.substring(2080, 2130));
console.log('---');
console.log(script.substring(2100, 2110));
console.log('=== Braces around ===');
var braces = 0;
for (var i = 0; i < script.length; i++) {
  var c = script[i];
  if (c === '{') braces++;
  else if (c === '}') braces--;
  if (braces < 0) {
    console.log('Extra } at position', i);
    console.log('Context: ' + script.substring(Math.max(0,i-60), Math.min(script.length,i+60)));
    break;
  }
}
