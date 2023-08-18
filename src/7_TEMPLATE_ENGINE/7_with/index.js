const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ["Item a", "Item b", "Item c"]

    res.render('dashboard', {items})
})

app.get('/post', (req,res) => {
    const post = {
        title: 'learning node.js',
        category: 'javascript',
        body: 'this article will help you learn node.js...',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.get('/', (req, res) => {

    const user = {
        name: "Matheus",
        surname: "Battisti",
        age: 30
    }

    const auth = false

    const approved = true

    res.render('home', {user: user, auth, approved})
})

app.listen(3000, () => {
    console.log('App is running.')
})