const { Router } = require('express')
const express = require('express')
const routes = express.Router()
const userController = require('./userController')

routes.get('/',(req, res) => {
    try {
        userController.getUsers((err, results) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({ status: 'OK', data: results })
        })
    } catch(err) {
        return res.status(500).send('Unexpected system error; try again later.')
    }
})

routes.get('/:userId', (req, res) => {
    try {
        const userId = req.params.userId;
        userController.getUserById(userId, (err,result) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({status:'Ok', data:result})
        })
    } catch(err) {
        return res.status(500).send('Unexpected system error; try again later.')
    }
})

routes.put('/:userId', (req,res) => {
    try {
        const userId = req.params.userId
        const userName = req.body.userName
        userController.updateUserDetails(userId, userName, (err, results) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({status:'Ok', data:results})
        })
    } catch(err) {
        return res.status(500).send('Unexpected system error; try again later.')
    }
})

module.exports = routes