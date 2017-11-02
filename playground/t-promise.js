let p1 = new Promise(function (resolve, reject) {
    resolve("Success!");
    // or
    // reject("Error!");
});


p1.then(function (value) {
        console.log(value); // Success!
    }, function (reason) {
        console.log(reason); // Error!
    }).then(() => {
        console.log('aaa')
    })
    .then(() => {
        console.log('bbb')
        return Promise.reject('There are some errors!')
        // return Promise.resolve('It is success!')
    })
    .then(() => {
        console.log('ccc: success version')
    }, () => {
        console.log('ccc: reject version')
    })
    .then(() => {
        console.log('ddd')
    }, () => {
        console.log('ddd: reject version')
    })


    .catch((err) => {
        console.log(err)
    })