function capitalizeTheWords(text) {
    console.log(text.toLowerCase().split(" ").map(f => f[0].toUpperCase() + f.substr(1)).join(" "));
}

capitalizeTheWords('Capitalize these words')
capitalizeTheWords('Was that Easy? tRY thIs onE for SiZe!')