function  functionalCalculator(leftOperand, rightOperand, operator) {
    let result = 0;
    switch (operator) {
        case "+":
           result = leftOperand + rightOperand;
           break;
        case "-":
            result = leftOperand - rightOperand;
            break;
        case "*":
            result = leftOperand * rightOperand;
            break;
        case "/" :
            result = leftOperand / rightOperand;
            break;
    }
    console.log(result);
}
