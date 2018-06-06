function uniqueSeq(input) {
    let uniques = [];

    for (let arr of input) {
        arr = JSON.parse(arr).sort((a, b) => b - a);

        let sumArr = arr.reduce((a, b) => a + b);
        if (!uniques.find(a => a.reduce((a, b) => a + b) === sumArr)) {
            uniques.push(arr);
        }
    }
    uniques.sort((ar1, ar2) => ar1.length - ar2.length).forEach(e => console.log(`[${e.join(", ")}]`));
}

uniqueSeq([
    '[-3, -2, -1, 0, 1, 2, 3, 4]',
    '[10, 1, -17, 0, 2, 13]',
    '[4, -3, 3, -2, 2, -1, 1, 0]']);