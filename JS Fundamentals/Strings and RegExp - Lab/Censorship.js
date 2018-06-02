function censorship(text, word) {
    for (let current of word) {
        let repleced = "-".repeat(current.length);
        while (text.indexOf(current) > -1) {
            text = text.replace(current, repleced)
        }
    }
    return text;
}