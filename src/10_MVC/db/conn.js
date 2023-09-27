const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Connected with MySQL!')

} catch (error) {
    console.log(`Not able to connect:  ${error}`)
}

module.exports = sequelize