function solve(input) {
    let result = 0;
    let specializedCount = 0;
    let specializedSum = 0;
    let clumsyCount = 0;
    for (let element of input) {
        let current = element.split(" : ");
        let professions = current[0];
        let price = Number(current[1]);

       if (professions === "Programming" || professions === "Hardware maintenance" || professions === "Cooking" ||
       professions === "Designing" || professions === "Translating") {
        if (price < 200) {
            continue;
        }
        specializedCount++;
        specializedSum += price;

        if (specializedCount % 2 === 0) {
            result += 200;
        }
        result += price;

       } else if (professions === "Singing" || professions === "Accounting" || professions === "Teachin" ||
           professions === "Exam-Making" || professions === "Acting" || professions === "Writing" ||
           professions === "Lecturing" || professions === "Modeling" || professions === "Nursing") {
           clumsyCount++;
           if (clumsyCount % 2 === 0) {
               result += price - price * 0.05;
           } else if (clumsyCount % 3 === 0) {
               result += price - price * 0.10;
           } else {
               result += price;
           }
       } else {
           result += price;
       }
    }
    result -= specializedSum * 0.20;
    console.log(`Final sum: ${parseFloat(result).toFixed(2)}`);
    if (result < 100) {
        console.log(console.log(`Mariyka need to earn ${parseFloat(Math.abs(1000 - result)
            .toFixed(2))} gold more to continue in the next task.`));
    } else {
        console.log(`Mariyka earned ${parseFloat(Math.abs(1000 - result)).toFixed(2)} gold more.`)
    }
}


solve(["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"])
console.log()
solve(["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199", "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"])
