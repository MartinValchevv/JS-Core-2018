function wordOccurencess(text, target) {
    let counter = 0;
    let regex = new RegExp(`\\b${target}\\b`, "gi");
    let match = regex.exec(text);
    while (match !== null) {
        counter++;
        match = regex.exec(text);
    }
    console.log(counter);
}


wordOccurencess("The waterfall was so high, that the child couldn’t see its peak.", "the")
wordOccurencess("How do you plan on achieving that? How? How can you even think of that? how", "how")
wordOccurencess("There was one. Therefore I bought it. I wouldn’t buy it otherwise.", "there")
