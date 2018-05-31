function solve(input) {
    let delimetar = input[input.length - 1];
    input.pop();
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (i === 0){
            result += input[i];
        } else {
            result += delimetar + input[i];
        }
    }
    console.log(result);
}

solve(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-'])

solve(['How about no?',
    'I',
    'will',
    'not',
    'do',
    'it!',
    '_'])