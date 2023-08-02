const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`User's name is: ${name} and he is ${age} years old.`)

    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    //aqui eu poderia fazer leitura da tabela users e resgatar um usuário por id
    console.log(`Searching for user: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router