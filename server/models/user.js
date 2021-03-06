const validator = require('validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, ['email', '_id'])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, process.env.JWT_SECRET).toString()

    user.tokens.push({
        access,
        token
    })

    return user.save()
        .then(() => {
            return token
        }, (err) => {
            return null
        })
        .catch((e) => {
            console.log(e)
        })
}

UserSchema.statics.findByToken = function (token) {
    let User = this
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return Promise.reject(e)
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    let user = this
    return User.findOne({
            email
        })
        .then((user) => {
            if (!user) {
                return Promise.reject()
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user)
                    } else(
                        reject()
                    )
                })
            })
        })
}

UserSchema.methods.removeToken = function (token) {
    let user = this
    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

UserSchema.pre('save', function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // console.log(hash)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


let User = mongoose.model('User', UserSchema)

module.exports = {
    User
}