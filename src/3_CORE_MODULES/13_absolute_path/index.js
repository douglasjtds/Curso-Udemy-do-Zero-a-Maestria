const path = require('path')

//path absoluto
console.log(path.resolve('test.txt'))

//formar path
const midFolder = 'relatorios'
const fileName = 'douglas.txt'

const finalPath = path.join('/', 'files', midFolder, fileName)

console.log(finalPath)