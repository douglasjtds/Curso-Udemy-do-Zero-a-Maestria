const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

//configurando diretório de partials
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
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

app.get('/blog', (req,res) => {
    const posts = [
        {
            title: 'Learn node.js',
            category: 'javascript',
            body: 'test',
            comments: 4
        },
        {
            title: 'Learn PHP',
            category: 'php',
            body: 'test',
            comments: 4
        },
        {
            title: 'Learn Python',
            category: 'python',
            body: 'test',
            comments: 4
        }
    ]

    res.render('blog', {posts})
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