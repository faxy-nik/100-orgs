var fs = require('fs');
var c = fs.readFileSync('100-organs.html', 'utf8');
// Find the lock script <script> tag after position 404900
var s = c.indexOf('<script>', 404900);
console.log('Lock <script> at:', s);
var pre = c.substring(s, s + 40);
console.log('Lock <script> tag + content:', JSON.stringify(pre));
// Find IIFE
var iife = c.indexOf('(function ()', s);
console.log('IIFE at:', iife);
console.log('IIFE content:', JSON.stringify(c.substring(iife, iife + 80)));
// Find </script>
var end = c.indexOf('</script>', iife);
console.log('</script> at:', end);
var body = c.substring(iife, end);
console.log('Body length:', body.length);
try {
  new Function(body);
  console.log('PARSE OK');
} catch (x) {
  console.log('PARSE ERROR:', x.message);
  // Show lines
  var lines = body.split('\n');
  for (var i = 0; i < Math.min(20, lines.length); i++) {
    console.log((i+1) + ': ' + JSON.stringify(lines[i].substring(0, 100)));
  }
}
