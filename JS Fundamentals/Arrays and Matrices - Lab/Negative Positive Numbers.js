function negativePositiveNums(arr) {
    let result = [];
    for (let nums of arr) {
        if (nums < 0){
            result.unshift(nums);
        } else {
            result.push(nums)
        }
    }
    console.log(result.join('\n'));
}

negativePositiveNums([7, -2, 8, 9])
negativePositiveNums([3, -2, 0, -1])