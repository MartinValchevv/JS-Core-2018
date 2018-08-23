function bitcoinMining(arr) {
    let oneBitcoin = 11949.16
    let oneGramOfGold = 67.51
    let totalCoins = 0;
    let sumLeva = 0;
    let firstBuy = 0;
    let k = 0
    for (let day = 1; day <= arr.length; day++) {
        let currnetMoney = +arr[day - 1] * oneGramOfGold
        if(currnetMoney >= oneBitcoin && k === 0) {
            firstBuy = day
            k++
        }
        if (day % 3 === 0) {
            currnetMoney *= 0.7
        }
        sumLeva += currnetMoney
        if (sumLeva > oneBitcoin) {
            let countBitcoin = sumLeva / oneBitcoin
            sumLeva -= parseInt(countBitcoin) * oneBitcoin
            totalCoins += parseInt(countBitcoin)
        }
    }
    console.log(`Bought bitcoins: ${totalCoins}`)
    if (totalCoins > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstBuy}`);
    }
    console.log(`Left money: ${sumLeva.toFixed(2)} lv.`);
}


bitcoinMining([100, 200, 300])
console.log()
bitcoinMining([50, 100])
console.log()
bitcoinMining([3124.15, 504.212, 2511.124])