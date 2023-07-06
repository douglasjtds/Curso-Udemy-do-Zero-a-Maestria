const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.write('hello http')
    res.end()
})

server.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})