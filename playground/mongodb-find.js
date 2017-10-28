const {
    MongoClient
} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server.')

    db.collection('todos').find({
            completed: true
        }).toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2))

        }, (err) => {
            if (err) {
                console.log('Unable to fetch todos. ', err)
            }
        })

    // db.close()
})