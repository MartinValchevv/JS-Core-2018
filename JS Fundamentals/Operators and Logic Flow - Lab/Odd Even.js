function oddEven(number) {
    if (!Number.isInteger(number)) {
        console.log("invalid");
    } else if (number % 2 !== 0){
        console.log("odd")
    } else {
        console.log("even")
    }
}
