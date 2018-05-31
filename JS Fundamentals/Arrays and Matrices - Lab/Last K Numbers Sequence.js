function lastKNumbersSeq(lenght, target) {
    let result = [1];
    for (let i = 1; i < lenght; i++) {
        let start = Math.max(0, i - target);
        let sum = result.slice(start, i).reduce((a, b) => a + b);
        result.push(sum);
    }
    console.log(result.join(" "));
}

lastKNumbersSeq(6 , 3)
lastKNumbersSeq(8 , 2)