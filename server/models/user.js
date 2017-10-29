const mongoose = require('mongoose')

let User = mongoose.model('users', {
    email: {
        type: String,
        trim: true,
        minlength: 1
    }
})

module.exports = {
    User
}