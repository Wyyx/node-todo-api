const {
    User
} = require('./../models/user')

const authenticate = function (req, res, next) {
    let token = req.header('x-auth')

    User.findByToken(token)
        .then((user) => {
            if (!user) {
                return Promise.reject()
            }

            req.user = user
            req.token = token
            next()
        }, (err) => {
            console.log(err)
            res.status(401).send()
        })
        .catch((e) => {
            res.status(401).send(e)
        })

}

module.exports = {
    authenticate
}