function sortArr(input) {
    console.log(input.sort().sort((a, b) => a.length - b.length).join("\n"));
}


sortArr(['alpha', 'beta','gamma'])
sortArr(['Isacc', 'Theodor','Jack', 'Harrison', 'George'])
sortArr(['test', 'Deny','omen', 'Default'])