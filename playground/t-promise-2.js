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

        return new Promise((resolve, reject) => {
            setTimeout(function () {
                console.log('setTimeout')
            }, 2000);
            console.log('xxx')
            resolve()
        })

    })
    .then(() => {
        console.log('ccc')
    })
    .catch((err) => {
        console.log(err)
    })

console.log('111')