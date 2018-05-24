function triangleOfStars(input) {
    for (let i = 1; i <= input; i++) {
        console.log("*".repeat(i));
    }
    for (let j = input - 1; j > 0; j--) {
        console.log("*".repeat(j));
    }
}
