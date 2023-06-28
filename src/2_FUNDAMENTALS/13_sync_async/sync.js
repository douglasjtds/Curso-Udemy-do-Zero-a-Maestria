const fs = require('fs');

console.log('starting application');

fs.writeFileSync('file.txt', 'sync hello world');

console.log('ending application');
