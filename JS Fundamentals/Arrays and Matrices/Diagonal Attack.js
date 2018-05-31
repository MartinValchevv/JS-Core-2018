function diagonalAttack(input) {
    let matrix = input.map(row => row.split(" ").map(e => Number(e)));

    let sum1 = 0;
    let sum2 = 0;

    for (let row = 0; row < matrix.length; row++) {
        sum1 += matrix[row][row];
        sum2 += matrix[row][matrix.length - 1 - row];
    }

    if (sum1 === sum2) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (col != row && col != matrix.length - 1 - row) {
                    matrix[row][col] = sum1;
                    continue;
                }
            }
        }
    }
    matrix.forEach(row => console.log(row.join(" ")));
}

diagonalAttack([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
)
console.log()
diagonalAttack([
    '1 1 1',
    '1 1 1',
    '1 1 0']
)