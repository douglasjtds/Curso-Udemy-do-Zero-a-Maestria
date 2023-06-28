const fs = require('fs');

console.log('starting application');

fs.writeFile('file.txt', 'async hello world', function (err) {
  setTimeout(function () {
    console.log('file created!');
  }, 1000);
});

console.log('ending application');
