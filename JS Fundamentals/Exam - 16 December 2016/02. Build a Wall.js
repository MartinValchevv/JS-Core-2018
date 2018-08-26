function buildWall(arr) {
    arr = arr.map(Number)
    let dayCubic = []
    let complete = false

    while (!complete) {
        let crete = 0
        complete = true
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 30) {
                arr[i] += 1
                crete += 195
                complete = false
            }
        }
        if (!complete) {
            dayCubic.push(crete)
        }
    }
    console.log(dayCubic.join(', '))
    console.log(dayCubic.reduce((a, b) => a + b, 0) * 1900 + ' pesos');
}

buildWall(['21', '25', '28'])
console.log()
buildWall(['17'])
console.log()
buildWall(['17', '22', '17', '19', '17'])