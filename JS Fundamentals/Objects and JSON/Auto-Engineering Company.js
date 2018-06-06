function solve(input) {
    let result = new Map();
    for (let i = 0; i < input.length; i++) {
        let [brand, model, quantity] = input[i].split(" | ");
        quantity = Number(quantity);
        if (!result.has(brand)) {
            result.set(brand, new Map());
        }
        if (!result.get(brand).has(model)) {
            result.get(brand).set(model, 0);
        }
        result.get(brand).set(model, result.get(brand).get(model) + quantity);
    }
    for (let [brand, modelsAndNum] of result){
        console.log(brand);
        for (let [model, number] of modelsAndNum){
            console.log(`###${model} -> ${number}`);
        }
    }
}

solve(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10'
])