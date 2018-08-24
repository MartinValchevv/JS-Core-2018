function hungryProgrammer(product, commands) {
    let eatCount = 0
        for (let j = 0; j < commands.length; j++) {
        let currentCommand = commands[j].split(' ')
            if (currentCommand === 'End') {
                break
            }
            if (currentCommand[0] === 'Serve') {
            if (product.length < 1) {
                break
            }
                console.log(`${product.pop()} served!`)
            }
            if (currentCommand[0] === 'Add') {
                if (currentCommand[1] === undefined) {
                    break;
                }
                product.unshift(currentCommand[1])
            }
            if (currentCommand[0] === 'Shift') {
                shiftPlates(currentCommand[1], currentCommand[2], product);
            }
            if (currentCommand[0] === 'Eat') {
                if (product.length < 1) {
                    break;
                }
                console.log(`${product.shift()} eaten`)
                eatCount++
            }
            if (currentCommand[0] === 'Consume') {
                eatCount += consumeMeals(currentCommand[1], currentCommand[2], product);
            }
        }
        if (product.length > 0) {
            console.log(`Meals left: ${product.join(', ')}`);
        } else {
            console.log("The food is gone");
        }
    console.log(`Meals eaten: ${eatCount}`)
        
        function shiftPlates(first, second, arr) {
            let firstIndex = Number(first);
            let secondIndex = Number(second);
            if (arr[firstIndex] !== undefined && arr[secondIndex] !== undefined) {
                let firstMeal = arr[firstIndex];
                arr[firstIndex] = arr[secondIndex];
                arr[secondIndex] = firstMeal;
            }
        }

        function consumeMeals(first, second, arr) {
            let firstIndex = Number(first);
            let secondIndex = Number(second);
            if (arr[firstIndex] !== undefined && arr[secondIndex] !== undefined) {
                let count = secondIndex - firstIndex + 1;
                arr.splice(firstIndex, count);
                console.log("Burp!");
                return count;
            } else {
                return 0;
            }
        }
}


hungryProgrammer(['chicken', 'steak', 'eggs'],
    ['Serve',
        'Eat',
        'End',
        'Consume 0 1']
)
console.log()
hungryProgrammer(['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
    ['Add spaghetti',
        'Shift 0 1',
        'Consume 1 4',
        'End']
)
console.log()
hungryProgrammer(['carrots', 'apple', 'beet'],
    ['Consume 0 2',
        'End',]
)
console.log()
hungryProgrammer(['bacon', 'veggies', 'chicken', 'turkey', 'eggs'], ['Shift 2 9',
    'Eat',
    'Serve',
    'End',
    'Serve'])