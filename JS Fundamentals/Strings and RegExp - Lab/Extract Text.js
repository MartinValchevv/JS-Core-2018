function extractText(text) {
    let result = [];
    let start = text.indexOf('(');
    let end = text.indexOf(')', start);
    while (start > -1 && end > -1) {
        let snippet = text.substring(start + 1, end);
        result.push(snippet)
        start = text.indexOf('(', end);
        end = text.indexOf(')', start);
    }
    console.log(result.join(', '));
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)')