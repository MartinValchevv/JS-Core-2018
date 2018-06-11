function solve(arr) {
    let startIndex = Number(arr[0]);
    let endIndex = Number(arr[1]);
    let rightWord = arr[2];
    let text = arr[3];
    let regexNumber = /[0-9]{3}\.?[0-9]*/g;
    let regexCountry = /[A-Z]{1}[a-z]+[A-Z]{1}/g;
    let city = "";
    let matches = text.match(regexNumber);
    let countryMatch = regexCountry.exec(text);
    let country = countryMatch[0];

    for (let match of matches) {
        let num = Math.ceil(Number(match));

        let char = String.fromCharCode(num);
        city += char;
        city = city.charAt(0).toUpperCase() + city.substr(1);
    }
    let part = country.substring(startIndex, endIndex + 1);
    let countryResult = country.replace(part, rightWord);
    countryResult = countryResult.toLowerCase();
    countryResult = countryResult.charAt(0).toUpperCase() + countryResult.substr(1);
    console.log(`${countryResult} => ${city}`);
}


solve(["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"])
console.log()
solve(["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"])
