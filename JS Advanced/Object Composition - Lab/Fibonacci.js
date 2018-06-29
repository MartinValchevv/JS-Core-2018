function fibonacci() {
    let first = 0;
    let second = 1;
    return function () {
        let f2 = first + second;
        [first, second] = [second, f2];
        return first;
    };
}

let fib = fibonacci();
console.log(fib());
