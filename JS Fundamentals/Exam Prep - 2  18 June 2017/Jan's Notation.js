function solve(input) {
    let arrOfNumbers = [];
    for (let i = 0; i < input.length; i++) {
        let current = input[i];
        if (typeof current === "number") {
            arrOfNumbers.push(current);
        } else {
            if (arrOfNumbers.length < 2) {
                console.log("Error: not enough operands!");
                return;
            }
            let num2 = arrOfNumbers.pop()
            let num1 = arrOfNumbers.pop()
            switch (current){
                case "+":
                    arrOfNumbers.push(num1 + num2);
                    break;
                case "-":
                    arrOfNumbers.push(num1 - num2);
                    break;
                case "/":
                    arrOfNumbers.push(num1 / num2);
                    break;
                case "*":
                    arrOfNumbers.push(num1 * num2);
                    break;
            }
        }
    }
    if (arrOfNumbers.length > 1){
        console.log("Error: too many operands!")
    } else {
        console.log(arrOfNumbers[0]);
    }
}

solve([3,
    4,
    '+']
)

solve([5,
    3,
    4,
    '*',
    '-']
)

solve([7,
    33,
    8,
    '-']
)