function stringOfNumbers1toN(num) {
   let number = Number(num);
    let output = "";
    for (let i = 1; i <= number; i++) {
       output += i;
    }
    console.log(output);
}