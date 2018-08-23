function pollutedBlocks(matrixInput, commandsInput) {
    let matrix = [];
    let polutedThatReachedFifty = [];

    for (let element of matrixInput) {
        matrix.push(element.split(' ').map(ch => Number(ch)));
    }
    for (let i = 0; i < commandsInput.length; i++) {

        for(let row = 0; row< matrix.length; row++){
            for(let col = 0; col < matrix[row].length; col++) {
                let number = `${row}${col}`;
                if (matrix[row][col] >= 50 && !polutedThatReachedFifty.includes(number)) {
                    polutedThatReachedFifty.push(number);
                }
            }
        }

        let cmdTokens = commandsInput[i].split(' ');
        let cmd = cmdTokens[0];
        let value = Number(cmdTokens[1]);


        if (cmd === 'breeze') {
            for (let row = 0; row < 1; row++) {
                for (let col = 0; col < matrix[value].length; col++) {
                    let number = `${value}${col}`;
                    if(polutedThatReachedFifty.includes(Number) && matrix[value][col] - 15 < 0){
                        matrix[value][col] = 0;
                    }else{
                        matrix[value][col] -= 15;
                    }

                }
            }
        } else if (cmd === 'gale') {
            for (let row = 0; row < matrix.length; row++) {
                let number = `${row}${value}`;
                if(polutedThatReachedFifty.includes(Number) && matrix[row][value] - 20 < 0){
                    matrix[row][value] = 0;
                }else{
                    matrix[row][value] -= 20;
                }

            }
        }else if (cmd === 'smog'){
            for(let row = 0; row< matrix.length; row++){
                for(let col = 0; col < matrix[row].length; col++){
                    matrix[row][col]+=value;
                }
            }
        }
    }
    let polutedBlocks = [];
    for(let row = 0; row< matrix.length; row++){
        for(let col = 0; col < matrix[row].length; col++){
            if(matrix[row][col]>=50){
                polutedBlocks.push(`[${row}-${col}]`)
            }
        }
    }
    if(polutedBlocks.length === 0){
        console.log(`No polluted areas`)
    }else{

        console.log(`Polluted areas: ${polutedBlocks.join(', ')}`)
    }

}

pollutedBlocks([
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
    ],
    ["breeze 1", "gale 2", "smog 25"]
)

pollutedBlocks([
        "5 7 2 14 4",
        "21 14 2 5 3",
        "3 16 7 42 12",
        "2 20 8 39 14",
        "7 34 1 10 24",
    ],
    ["breeze 1", "gale 2", "smog 35"]
)

pollutedBlocks([
        "5 7 3 28 32",
        "41 12 49 30 33",
        "3 16 20 42 12",
        "2 20 10 39 14",
        "7 34 4 27 24",
    ],
    [
        "smog 11", "gale 3",
        "breeze 1", "smog 2"
    ]
)