function solve(input) {
    let validSentences = [];
    let invalidSentences = [];
    let str = input.splice(0, 2);
    let companies = str[0].split(str[1]);

    for (let line of input) {
        let count = 0;
        line = line.toLowerCase();
        for (let company of companies) {
            if (line.indexOf(company) > -1) {
                count++;
            }
        }
        if (count === companies.length) {
            validSentences.push(line);
        } else {
            invalidSentences.push(line);
        }
    }
    if (validSentences.length > 0) {
        console.log('ValidSentences')
    }

    for (let i = 0; i < validSentences.length; i++) {
        console.log(`${i + 1}. ${validSentences[i]}`);
    }

    if (validSentences.length > 0 && invalidSentences.length > 0) {
        console.log('==============================');
    }

    if (invalidSentences.length > 0) {
        console.log('InvalidSentences');

    }

    for (let i = 0; i < invalidSentences.length; i++) {
        console.log(`${i + 1}. ${invalidSentences[i]}`);
    }
}


solve(["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
    "someone continues as no "]
)
console.log()
solve(["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho  e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
    "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"]
)
