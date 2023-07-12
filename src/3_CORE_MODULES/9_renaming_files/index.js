const fs = require('fs')

const oldName = 'file.txt'
const newName = 'newFile.txt'

fs.rename(oldName, newName, function(err) {
    if(err){
        console.log(err)
        return
    }

    console.log(`The file ${oldName} was renemad for ${newName}`)
})