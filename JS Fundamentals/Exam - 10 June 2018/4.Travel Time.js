function solve(input) {
    let townsMap = new Map();
    for (let i = 0; i < input.length; i++) {
        let [country, town, travelCost] = input[i].split(" > ");
        town = town.charAt(0).toUpperCase() + town.slice(1);

        if (!townsMap.has(country)) {
            townsMap.set(country, new Map());
        }
        if (!townsMap.get(country).has(town)) {
            townsMap.get(country).set(town, Number(travelCost));
        }
        let currentCost = townsMap.get(country).get(town);
        if (currentCost > travelCost) {
            townsMap.get(country).set(town, travelCost);
        }
    }
    let sortedTownsMap = Array.from(townsMap).sort();
    for (let [darjava, city] of sortedTownsMap) {
        let res = "";
        for (let [cities, price] of city) {
            res += `${cities} -> ${price} `;
        }
        console.log(`${darjava} -> ${res}`);
    }
}


solve(["Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200" ]
)
