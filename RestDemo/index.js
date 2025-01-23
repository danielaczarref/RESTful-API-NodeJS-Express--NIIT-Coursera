const express = require('express')
const app = express()

const users = [
    { "username": "John", "userId": 101},
    { "username": "Tony", "userId": 102},
    { "username": "William", "userId": 103},
    { "username": "Jenny", "userId": 104},
    { "username": "Bob", "userId": 105}
]

app.get('/users/:userId', (req, res) => {
    const userData = users.find(u => u.userId === parseInt(req.params.userId))

    if (userData) {
        res.status(200).send(userData)
    } else {
        res.status(404).send('The request with given id not found')
    }
})

app.listen(3000, () => {
    console.log('Started at 3000')
})