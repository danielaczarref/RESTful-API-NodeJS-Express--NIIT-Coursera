const users = require('./users.json')
const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, 'users.json');

function findUser(email,done){
    const userFetched = users.filter(user => user.email === email)[0]
    done(undefined, userFetched)
}

function registerUser(userData,done){
   users.push(userData)
   fs.writeFileSync(filePath, JSON.stringify(users))
   done(undefined, userData)
}

module.exports = {
    findUser,registerUser
}