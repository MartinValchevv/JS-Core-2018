function cookingByNumbers(input) {
    let numbers = Number(input[0]);
    for (let i = 1; i < input.length; i++) {
        if (input[i] === "chop") {
            numbers = numbers / 2;
        } else if (input[i] === "dice") {
            numbers = Math.sqrt(numbers);
        } else if (input[i] === "spice") {
            numbers = numbers + 1;
        } else if (input[i] === "bake") {
            numbers = numbers * 3;
        } else if (input[i] === "fillet") {
            numbers = numbers * 0.80;
        }
        console.log(numbers);
    }
}

