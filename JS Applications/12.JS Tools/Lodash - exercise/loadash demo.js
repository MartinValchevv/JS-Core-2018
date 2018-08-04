let _ = require('lodash')

let lastEvenNum = _.findLast([1, 2, 3, 4, 5, 6], function (el) {
    return el % 2 === 0
})
console.log(lastEvenNum);