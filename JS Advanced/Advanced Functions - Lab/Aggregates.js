function aggregates(arr) {
    let min = Math.min(...arr)
    let max = Math.max(...arr)
    let sum = arr.reduce((a, b) => a + b)
    let concat = arr.join("")
    let product = arr.reduce((a, b) => a * b)
    console.log(`Sum = ${sum}`);
    console.log(`Min = ${min}`);
    console.log(`Max = ${max}`);
    console.log(`Product = ${product}`);
    console.log(`Join  = ${concat}`);
}


aggregates([2,3,10,5])
console.log()
aggregates([5, -3, 20, 7, 0.5])