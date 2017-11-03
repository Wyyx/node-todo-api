const jwt = require('jsonwebtoken')
const {
    ObjectID
} = require('mongodb')


const {
    Todo
} = require('./../../models/todo')
const {
    User
} = require('./../../models/user')


const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
    _id: userOneId,
    email: 'gnehcyx@163.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            access: 'auth'
        }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'john@example.com',
    password: 'useTwoPassword'
}]

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}]

const populateUsers = (done) => {
    User.remove({})
        .then(() => {
            let userOne = new User(users[0]).save()
            let userTwo = new User(users[1]).save()
        })
        .then(() => done())
}

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos)
        })
        .then(() => done())
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}