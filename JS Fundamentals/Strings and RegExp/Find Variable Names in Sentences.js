function findVariable(text) {
    let regex =  /\b_{1}([A-Za-z0-9]+)\b/g;
    let match = regex.exec(text);
    let result = [];
    while (match !== null) {
        result.push(match[1]);
        match = regex.exec(text);
    }
    console.log(result.join(","))
}



findVariable('The _id and _age variables are both integers.')
findVariable('Calculate the _area of the _perfectRectangle object.')
findVariable('__invalidVariable _evenMoreInvalidVariable_ _validVariable')