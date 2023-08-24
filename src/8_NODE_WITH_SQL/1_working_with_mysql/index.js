const express = require('express')
const exphbs = require('express-handlebars')
const mysql2 = require('mysql2')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty = req.body.pageqty

    const sqlQuery = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sqlQuery, function(err) {
        if (err){
            console.log(err)
        }

        res.redirect('/')
    })
})

const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function (err) {
    if (err){
        console.log(err)
    }

    console.log('Connected with MySQL!')

    app.listen(3000)
})