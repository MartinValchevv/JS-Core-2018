function argumentInfo() {
    let typeCount = new Map()
    for (let arg of arguments) {
        let type = typeof arg
        if (!typeCount.has(type)) {
            typeCount.set(type, 0)
        }
        let oldValue = typeCount.get(type);
        typeCount.set(type, oldValue + 1);
        console.log(`${type}: ${arg}`)
    }
   let sortedArr = [...typeCount].sort((a, b) => b[1] - a[1]);
    for (let element of sortedArr) {
        console.log(`${element[0]} = ${element[1]}`)
    }
}


argumentInfo('cat', 42, function () { console.log('Hello world!'); })