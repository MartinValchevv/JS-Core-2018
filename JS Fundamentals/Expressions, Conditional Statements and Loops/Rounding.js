function rounding([num1, num2]) {
     num2 = Number(num2);
    if(num2 > 15) {
        num2 = 15;
    }
    num1 = Number(num1).toFixed(num2);
    console.log(Number(num1));
}