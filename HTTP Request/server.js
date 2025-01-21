const http = require('http');
const PORT = process.env.PORT || 5000;
const TODOs = require('./todos');

const server = http.createServer((request, response) => {
    if (request.url === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, {
            'content-type': 'application/json'
        });
        response.end(JSON.stringify(TODOs))
    }
})

server.listen(PORT, () => {
    console.log(`Server is ready and running on Port ${PORT}`)
})

server.on('error', (err) => {
    if(err.code == 'EADRINUSE') {
        console.log(`Port ${PORT} already in use`)
    }
})