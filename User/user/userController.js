const userService = require('./userService')

const getUsers = function(done) {
    userService.getUsers(done)
}

const getUserById = function(userId, done) {
    userService.getUserById(userId, done)
}

const updateUserDetails = function(userId, userName, done) {
    userService.updateUserDetails(userId, userName, done)
}

module.exports= {getUsers, getUserById, updateUserDetails}