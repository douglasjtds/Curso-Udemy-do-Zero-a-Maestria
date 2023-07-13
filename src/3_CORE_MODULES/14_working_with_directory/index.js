const fs = require('fs')

if(!fs.existsSync('./myfolder')){
    console.log('not exists')
    fs.mkdirSync('myfolder')
}

else if(fs.existsSync('./myfolder')){
    console.log('exists')
}