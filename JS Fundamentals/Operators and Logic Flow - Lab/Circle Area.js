function circleArea(r) {
    let area = Math.PI * r * r;
    console.log(area);
    let areaRaunded = Math.round(area * 100) / 100;
    console.log(areaRaunded);
}