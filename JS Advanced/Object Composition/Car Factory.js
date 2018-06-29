function solve(initialCar) {
    let modCar = {}
    let engine
    modCar.model = initialCar.model
    if (initialCar.power <= 90) {
        engine = {
            power: 90,
            volume: 1800
        }
    } else if (initialCar.power <= 120) {
        engine = {
            power: 120,
            volume: 2400
        }
    } else {
        engine = {
            power: 200,
            volume: 3500
        }
    }
    modCar.engine = engine
    modCar.carriage = {
        type: initialCar.carriage,
        color: initialCar.color
    }
    let wheels = []
    if (initialCar.wheelsize % 2 === 0) {
        initialCar.wheelsize--
    }
    for (let i = 0; i < 4; i++) {
        wheels.push(initialCar.wheelsize)
    }
    modCar.wheels = wheels

    return modCar
}

console.log(solve({
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
));


console.log(solve({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));