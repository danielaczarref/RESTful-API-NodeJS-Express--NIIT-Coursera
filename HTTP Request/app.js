const http = require('http');
const PORT = process.env.PORT || 5000;
const TODOs = require('./todos');
const getRequestData = require('./utils');

const server = http.createServer( async (request, response) => {
    if (request.url === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, {
            'content-type': 'application/json'
        });
        response.end(JSON.stringify(TODOs))
    }

    else if (request.url === '/api/v1/todos' && request.method === 'POST') {
        let reqBody = await getRequestData(request);
        TODOs.push(JSON.parse(reqBody));
        response.writeHead(201, {
            'content-type': 'application/json'
        })
        response.end(JSON.stringify(JSON.parse(reqBody)))
    }

    else if (request.url.match(/\/api\/v1\/todos\/([0-9])/) && request.method === 'DELETE') {
        const id = request.url.split('/')[4]
        const todo = TODOs.find(item => item.id === parseInt(id))
        if (!todo) {
            response.writeHead(404, {
                'content-type': 'application/json'
            })
            response.end('No TODO with the specified id is available')
        } else {
            const index = TODOs.indexOf(todo)
            TODOs.splice(index, 1)
            response.writeHead(200, {
                'content-type': 'application/json'
            })
            response.end(`Deleted the specified TODO id ${id}`)
        }
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