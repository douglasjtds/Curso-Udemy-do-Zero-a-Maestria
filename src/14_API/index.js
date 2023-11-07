const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//first endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'first route' })
})

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    if (!name) {
        res.status(422).json({message: "Name field is required."})
        return
    }

    res.status(201).json({message: `The product ${name} was created succesfully.`})
})

app.listen(3000)