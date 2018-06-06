function usernames(input) {
    let username = new Set();
    for (let name of input) {
        username.add(name);
    }
    let sorted = Array.from(username).sort((a, b) => sortUsername(a, b));
    console.log(sorted.join("\n"));


    function sortUsername(name1, name2) {
        if (name1.length === name2.length) {
            return name1.localeCompare(name2);
        }
        return name1.length - name2.length;
    }
}

usernames([
    'Rod',
    'RoD',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot',
])