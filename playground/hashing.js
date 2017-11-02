const {
    SHA256
} = require('crypto-js')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// let data = {
//     id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// }

// let token = jwt.sign(data, 'houdini')
// console.log(token)

let password = '1234abcd'
let encoded = 5
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, result) => {

        console.log(result)
        encoded = result

        bcrypt.compare('1234abcdxxxxxx', encoded, (err, result) => {
            console.log(result)
        })
    })
})