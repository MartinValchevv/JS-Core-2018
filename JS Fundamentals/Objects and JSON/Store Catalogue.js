function storeCatalogue(input) {
    let result = new Map();
    for (let i = 0; i < input.length; i++) {
        let current = input[i].split(" : ");

        let product = current[0];
        let price = +current[1];
        let firstLetter = product[0];

        if (!result.has(firstLetter)) {
            result.set(firstLetter, new Map());
        }
        result.get(firstLetter).set(product, price);
    }
    result = new Map([...result.entries()].sort());
    for (let [letter, insideMap]of result) {
        console.log(letter);
        insideMap = new Map([...insideMap.entries()].sort());
        for (let [product, price] of insideMap) {
            console.log(`  ${product}: ${price}`);
        }
    }
}

storeCatalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
)

storeCatalogue(['Banana : 2',
'Rubic\'s Cube : 5',
'Raspberry P : 4999',
'Rolex : 100000',
'Rollon : 10',
'Rali Car : 2000000',
'Pesho : 0.000001',
'Barrel : 10'
])