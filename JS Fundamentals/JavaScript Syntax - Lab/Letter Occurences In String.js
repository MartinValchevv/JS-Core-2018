function letterOccurencesInString(word, letter) {
    let counter = 0;
    for (let lett of word) {
        if (lett === letter) {
            counter++;
        }
    }
    console.log(counter);
}

