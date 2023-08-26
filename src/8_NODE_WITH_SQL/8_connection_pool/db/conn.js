const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

module.exports = pool