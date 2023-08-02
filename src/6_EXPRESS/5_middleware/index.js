const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next) {
    req.authStatus = true

    if(req.authStatus){
        console.log('Its logged in, can continue.')
        next()
    }
    else
        console.log('Not logged in, please login to continue')
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})