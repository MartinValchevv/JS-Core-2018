function solve(input) {
    let result = [];
    let steps = Number(input[input.length - 1]);
    input.pop();
    for (let i = 0; i < input.length; i += steps) {
       result.push(input[i]);
    }
    console.log(result.join('\n'));
}

solve(['5','20', '31', '4', '20', '2'])
console.log()
solve(['1','2', '3', '4', '5', '6'])
console.log()
solve(['dsa','asd', 'test', 'tset', '2'])