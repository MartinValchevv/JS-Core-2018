function kompot(input) {
    let totalCurrentProduct = 0
    let totalAnotherProduct = 0
    let peach = 0
    let plum = 0
    let cherry = 0
    let resultPeach = 0
    let resultPlum = 0
    let resultCherry = 0
    for (const line of input) {
        let current = line.split(' ').filter(v => v !== '')
        let product = current[0].trim()
        let quatity = +current[1].trim()
        if (product === 'peach' || product === 'plum' || product === 'cherry') {
            totalCurrentProduct += quatity
        } else {
            totalAnotherProduct += quatity
        }
        if (product === 'peach') {
            peach += quatity
        }
        if (product === 'plum') {
            plum += quatity
        }
        if (product === 'cherry') {
            cherry += quatity
        }
        resultPeach = peach / 0.140
        resultPlum = plum / 0.020
        resultCherry = cherry / 0.009

    }
    let rakia = totalAnotherProduct * 0.200
    console.log(`Cherry kompots: ${Math.floor(resultCherry / 25)}`)
    console.log(`Peach kompots: ${Math.floor(resultPeach / 2.5)}`)
    console.log(`Plum kompots: ${Math.floor(resultPlum / 10)}`)
    console.log(`Rakiya liters: ${rakia.toFixed(2)}`)
}

kompot([ 'cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0' ,
    'papaya 20' ]
)

console.log()

kompot([   'apple 6',
        'peach 25.158',
        'strawberry 0.200',
        'peach 0.1',
        'banana 1.55',
        'cherry 20.5',
        'banana 16.8',
        'grapes 205.65'
        ,'watermelon 20.54'
    ]
)