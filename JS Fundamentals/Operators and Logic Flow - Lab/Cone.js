function cone(a, b) {
    let s = Math.sqrt(a*a+b*b);
    console.log('volume = '+ Math.PI*a*a*b/3);
    console.log('area = '+ Math.PI*a*(a+s));
}
