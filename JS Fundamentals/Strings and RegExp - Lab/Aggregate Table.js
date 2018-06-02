function aggregateTable(arr) {
    let result = [];
    let sum = 0;
    for (let line of arr) {
        let town = line.split('|')
        result.push(town[1].trim())
        sum += Number(town[2].trim())
    }
    console.log(result.join(', '))
    console.log(sum)
}

aggregateTable([
    '| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
)