const {
    SHA256
} = require('crypto-js')

const jwt = require('jsonwebtoken')

// let name = "houdini"

// let hash = SHA256(name)

// console.log(hash, hash.toString())


let data = {
    id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

let token = jwt.sign(data, 'houdini')
console.log(token)