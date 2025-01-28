const express = require('express')
const {route} = require('../Authentication')
const router = express.Router()
const userController = require('./userController')

router.get('/',(req, res) => {
    try {
        const userData = req.claims
        console.log(userData)
        if (!userData.email) {
            return res.send(400).send('User email not available')
        }
        userController.findUser(userData.email, (err, result) => {
            if (err) {
                return res.status(400).send('Error getting user', err)
            } else {
                return res.status(200).send(result)
            }
        })
    } catch(err) {
        return res.status(500).send('Unexpected system error')
    }
})

module.exports = router