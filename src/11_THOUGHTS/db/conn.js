const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('thoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Connected with database.')
} catch(err) {
    console.log(`Unable to connect:  ${err}`)
}

module.exports = sequelize