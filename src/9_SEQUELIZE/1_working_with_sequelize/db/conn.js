const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


// try {
//     sequelize.authenticate()
//     console.log('Succesfully connected with Sequelize.')
// } catch (err) {
//     console.log('Error to connect: ', err)
// }

module.exports = sequelize