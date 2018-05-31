function solve(arr) {
    let bigger = -Infinity;

    arr.forEach(e => {
        if (e >= bigger) {
            bigger = e;
            console.log(e)
        }
    });
}


solve([1,3,8,4,10,12,3,2,24])
solve([1,2,3,4,])
solve([20,3,2,15,6,1])