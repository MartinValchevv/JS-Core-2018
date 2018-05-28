function roadRadar(input) {
    let speed = input[0];
    let zone = input[1];
    let limit = 0;
    switch (zone){
        case "city": limit = 50; break;
        case "interstate": limit =  90; break;
        case "motorway" : limit = 130; break;
        case "residential":limit = 20; break;
    }
    let overSpeed = speed - limit;
    if (overSpeed <= 0) {
        console.log("");
    } else if (overSpeed <= 20){
        console.log("speeding")
    } else if (overSpeed <= 40) {
        console.log("excessive speeding")
    } else {
        console.log("reckless driving")
    }
}
