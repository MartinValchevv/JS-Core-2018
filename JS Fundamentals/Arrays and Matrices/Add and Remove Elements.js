function addRemoveElementArr(input) {
    let result = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "add") {
            result.push(i + 1);
        } else {
            result.pop();
        }
    }
    if (result[0] == null){
        console.log("Empty");
    }
    console.log(result.join('\n'));
}

addRemoveElementArr([
    'add',
    'add',
    'add',
    'add'
])
console.log()
addRemoveElementArr([
    'add',
    'add',
    'remove',
    'add',
    'add'
])
console.log()
addRemoveElementArr([
    'remove',
    'remove',
    'remove',
])
