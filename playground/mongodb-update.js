const {
    MongoClient,
    ObjectID
} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server.')

    db.collection('todos').findOneAndUpdate({
            _id: new ObjectID('59f45bcb1b4ac928144a5484')
        }, {
            $set: {
                completed: false
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result)
        })

    // db.close()
})