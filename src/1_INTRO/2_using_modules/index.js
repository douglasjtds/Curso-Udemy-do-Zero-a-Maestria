const fs = require('fs') //file system

fs.readFile('file.txt', 'utf8', (err, data) => {

    if(err) {
        console.log(err)
    }

    console.log(data)
});