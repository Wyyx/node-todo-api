const expect = require('expect')
const request = require('supertest')
const {
    ObjectId
} = require('mongodb')

const {
    app
} = require('./../server')
const {
    Todo
} = require('./../models/todo')


const todos = [{
    _id: new ObjectId(),
    text: 'First test todo'
}, {
    _id: new ObjectId(),
    text: 'Second test todo'
}]

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos)
        })
        .then(() => done())
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((err) => {
                    done(err)
                })
            })
    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2)
                        done()
                    })
                    .catch((err) => {
                        done(err)
                    })
            })
    })
})


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)

    })

    it('should return 400 if todo id is not valid', (done) => {
        request(app)
            .get('/todos/123')
            .expect(400)
            .end(done)
    })

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString().replace(/\w/,'8')}`)
            .expect(404)
            .end(done)
    })
})

describe('DELETE /todos/:id', () => {

    it('should return 200', (done) => {

        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                let id = `${todos[0]._id.toHexString()}`
                expect(res.body.todo._id).toBe(id)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                let id = res.body.todo._id
                Todo.findById(id)
                    .then((todo) => {
                        expect(todo).toNotExist()
                        done()
                    })
                    .catch((err) => {
                        done(err)
                    })
            })
    })

    it('should return 400 if todo id is not valid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(400)
            .end(done)
    })

    it('should return 404 if not find', (done) => {
        let url = `/todos/${todos[0]._id.toHexString()}`
        url = url.substr(0, url.length - 1) + '0'
        console.log(url)
        request(app)
            .delete(url)
            .expect(404)
            .end(done)
    })
})