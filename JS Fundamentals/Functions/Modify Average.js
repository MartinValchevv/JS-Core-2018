function modifyAverage(number) {
    let average = findAverage(number);
    if (average > 5){
        return number;
    } else {
        number = add(number);
    }
    return modifyAverage(number);
    
    function add(number) {
        number = number + "9";
        return + number;
    }

    function findAverage(number) {
        let average = 0;
        let counter = 0;
        while (number > 0) {
            counter++;
            average += number % 10;
            number = Math.floor(number / 10)
        }
        return average / counter;
    }
}
