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
    console.log(req.body.text)
    let todo = new Todo({
        text: req.body.text
    })

    todo.save()
        .then((doc) => {
            console.log(doc)
            res.send(doc)
        }, (err) => {
            res.status(400).send(err)
            console.log(err)
        })
}, (err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})