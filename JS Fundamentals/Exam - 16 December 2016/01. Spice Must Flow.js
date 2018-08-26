function spiceMustFlow(startingYield) {
    let counterDay = 0
    let total = 0
    while (startingYield >= 100) {
        counterDay++
        total += startingYield
        startingYield -= 10
        total -= 26
    }
    total -= 26
    if (total < 0) {
        total = 0
    }
    console.log(counterDay);
    console.log(total);

}

spiceMustFlow(111)
console.log()
spiceMustFlow(450)
console.log()
spiceMustFlow(200)