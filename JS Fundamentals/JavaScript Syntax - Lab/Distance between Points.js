function distanceBetweenPoints(x1,y1,x2,y2) {
    let distancex = Math.pow(x1-x2,2);
    let distancey = Math.pow(y1-y2,2);

    console.log(Math.sqrt(distancex+distancey));
}