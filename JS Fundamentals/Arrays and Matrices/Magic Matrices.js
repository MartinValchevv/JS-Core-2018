function magicMatrix(matrix) {
    let sum = matrix[0].reduce((a,b) => a+b);


    for (let i = 1; i < matrix.length; i++) {
        if (sum != matrix[i].reduce((a,b) => a+b))
            return false;
    }
    for (let col = 0; col < matrix[0].length; col++) {
        let colSum = 0;
        for (let row = 0; row < matrix.length; row++) {
            colSum += matrix[row][col];
        }
        if (sum != colSum)
            return false;
    }
    return true;
}

console.log(magicMatrix([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]));
console.log(magicMatrix([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));
console.log(magicMatrix([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
]));
