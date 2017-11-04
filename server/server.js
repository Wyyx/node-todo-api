require('./config/config')
const {
    ObjectId
} = require('mongodb')
const experss = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const {
    mongoose
} = require('./db/mongoose')
const {
    User
} = require('./models/user')
const {
    Todo
} = require('./models/todo')
const {
    authenticate
} = require('./middlewares/authenticate')


const app = experss()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
    let newTodo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    newTodo.save()
        .then((todo) => {
            res.status(200).send(todo)
        }, (err) => {
            res.status(400).send(err)
        })
        .catch((e) => {
            res.status(400).send(err)
        })
}, (err) => {
    console.log(err)
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
            _creator: req.user._id
        })
        .then((todos) => {
            res.send({
                todos
            })

        }, (err) => {
            res.status(400).send(err)
        })
})

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({
            error: 'Todo id is not valid.'
        })
    }

    Todo.findOne({
            _id: id,
            _creator: req.user._id
        })
        .then((todo) => {
            if (!todo) {
                res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((e) => {
            res.status(404).send()
        })
})

app.delete('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).send()
    }

    Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((e) => {
            res.status(404).send()
        })

}, (err) => {
    console.log(err)
})

app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectId.isValid(id)) {
        res.status(400).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {
            $set: body
        }, {
            new: true
        })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((e) => {
            res.status(400).send()
            console.log(e)
        })

})


app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])
    let user = new User(body)

    user.generateAuthToken()
        .then((token) => {
            if (!token) {
                return res.status(400).send()
            }

            res.header('x-auth', token).status(200).send(user)
        })
        .catch((e) => {
            res.status(400).send(e)
        })
})


app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user)
})

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateAuthToken()
                .then((token) => {
                    res.header('x-auth', token).send(user)
                })
        })
        .catch((e) => {
            res.status(400).send()
        })
})


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => {
            res.status(200).send()
        }, () => {
            res.status(400).send()
        })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {
    app
}