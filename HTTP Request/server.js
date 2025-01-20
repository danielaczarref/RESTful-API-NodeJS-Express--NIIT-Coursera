const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "content-type": "text/plain"
    })
    response.end('Hello');
})

server.listen(PORT, () => {
    console.log(`Server is ready and running on Port ${PORT}`)
})

server.on('error', (err) => {
    if(err.code == 'EADRINUSE') {
        console.log(`Port ${PORT} already in use`)
    }
})