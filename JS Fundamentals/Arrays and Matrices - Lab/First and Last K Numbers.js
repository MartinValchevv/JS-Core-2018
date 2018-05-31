function firsAndLastKNumbers(arr) {
    let target = arr.shift();
    console.log(arr.slice(0, target).join(" "));
    console.log(console.log(arr.slice(arr.length - target, arr.length).join(" ")));
}

firsAndLastKNumbers([2, 7, 8, 9])
firsAndLastKNumbers([3, 6, 7, 8, 9])