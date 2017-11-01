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


const app = experss()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    })

    newTodo.save()
        .then((todo) => {
            console.log(todo)
            res.send(todo)
        }, (err) => {
            res.status(400).send(err)
            console.log(err)
        })
}, (err) => {
    console.log(err)
})

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({
                todos
            })

        }, (err) => {
            res.status(400).send(err)
        })
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({
            error: 'Todo id is not valid.'
        })
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((err) => {
            res.status(404).send()
        })
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).send()
    }

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((err) => {
            res.status(404).send()
        })

}, (err) => {
    console.log(err)
})

app.patch('/todos/:id', (req, res) => {
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

    Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        })
        .then((todo) => {
            if (!todo) {
                res.status(404).send()
            }

            res.status(200).send({
                todo
            })
        })
        .catch((err) => {
            res.status(400).send()
            console.log(err)
        })

})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {
    app
}