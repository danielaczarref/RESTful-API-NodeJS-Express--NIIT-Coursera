const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, 'users.json');

const getUsers = function (done) {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            return done('Encountered error while getting users details');
        }
        let userData = JSON.parse(fileContent);
        return done(undefined, userData);
    });
};

const getUserById = function(userId, done) {
    fs.readFile(filePath,(err,fileContent) => {
        if (err) {
            return done('Encountered error while getting users details');
        }
        let userData = JSON.parse(fileContent);
        const fetchUser = userData.find(user => user.userId == userId)
        if (fetchUser === undefined) {
            return done('No user found for requested userId')
        }
        return done(undefined,fetchUser)
    })
}

const updateUserDetails = function(userId, userName, done) {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            return done('Encountered error while getting users details');
        }
        let userData = JSON.parse(fileContent)
        let index = userData.findIndex(user => user.userId == userId)
        if (index == -1) {
            return done('No user found for requested userId')
        }
        userData[index].userName = userName
        fs.writeFile(filePath, JSON.stringify(userData),(err, updatedContent) => {
            if (err) {
                return done('Encountered error while updating user details')
            }
            return done(undefined, 'Successfully updated user details')
        })
    })
}


module.exports = {getUsers, getUserById, updateUserDetails}