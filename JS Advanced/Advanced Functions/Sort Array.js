function sortArray(arr, order) {
switch (order) {
    case "asc":
        arr.sort((a, b) => {
            return a - b
        })
        break
    case "desc":
        arr.sort((a, b) => {
            return b - a
        })
        break
    }
    return arr
}


console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([14, 7, 17, 6, 8], 'desc'));