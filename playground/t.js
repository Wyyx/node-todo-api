let p1 = new Promise(function (resolve, reject) {
    resolve("Success!");
    // or
    // reject("Error!");
});

function test() {
    return p1.then(function (value) {
            console.log(value); // Success!
        }, function (reason) {
            console.log(reason); // Error!
        }).then(() => {
            console.log('hhh!')
        })
        .then((aa) => {
            console.log(aa)
            return 'node.js'
        })
}

console.log(test())