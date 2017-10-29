const experss = require('express')
const bodyParser = require('body-parser')

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

app.listen(3000, () => {
    console.log('Started on port 3000')
})

module.exports = {
    app
}