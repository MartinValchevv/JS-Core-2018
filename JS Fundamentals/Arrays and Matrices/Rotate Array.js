function rotateArr(input) {
    let rotateCounter = Number(input.pop());
    rotateCounter %= input.length;
    for (let i = 0; i < rotateCounter; i++) {
        let result = input.pop();
        input.unshift(result);
    }
    console.log(input.join(" "));
}

rotateArr(['1', '2', '3', '4', '2'])
rotateArr(['Banana', 'Orange', 'Orange', 'Apple', '15'])