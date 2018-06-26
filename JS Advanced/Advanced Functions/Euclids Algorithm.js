function greatestCommon(num1, num2) {
    let greatest = num2;
    num2 = num1 % num2;
    num1 = greatest;
    if (num2 === 0) {
        return greatest
    } else {
        return greatestCommon(num1, num2)
    }
}

console.log(greatestCommon(252, 105));