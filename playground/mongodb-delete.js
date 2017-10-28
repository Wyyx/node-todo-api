const {
    MongoClient,
    ObjectID
} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server.')
    db.collection('users').deleteOne({
            _id: new ObjectID('59f4736797b41517c0902258')
        })
        .then((result) => {
            console.log(result)
        })

    // db.close()
})

// 59f4736797b41517c0902258