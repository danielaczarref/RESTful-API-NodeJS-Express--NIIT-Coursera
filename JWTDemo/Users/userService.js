const userDAO = require('./userDAO')

function findUser(email, done) {
    userDAO.findUser(email, done)
}

function registerUser(userData, done) {
    userDAO.registerUser(userData, done)
}

module.exports = { findUser, registerUser }