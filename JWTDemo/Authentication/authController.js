const userService = require('../Users/userService')
const authService = require('./authService')

function registerUser(userData,done) {
    userService.findUser(userData.email, (err, userFound) => {
        if (err) {
            done(err)
        } else {
            if (userFound) {
                done(userFound)
            } else {
                userService.registerUser(userData, done)
            }
        }
    })
}

function loginUser({email, password}, done) {
    userService.findUser(email, (err, userFound) => {
        if (err) {
            done(err)
        } else {
            const userVerified = authService.verifyUser({email, password}, userFound)
            if (userFound) {
                const jwtToken = authService.createJWT(userFound)
                done(undefined, jwtToken)
            } else {
                done({error: 'User not verified!'})
            }
        }
    })
}

module.exports = {registerUser, loginUser}