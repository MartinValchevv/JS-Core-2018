let vector = (function () {
    function add(vector1, vector2) {
        return[vector1[0] + vector2[0], vector1[1] + vector2[1]]
    }
    
    function multiply(vector1, scalar) {
        return[vector1[0] * scalar, vector1[1] * scalar]
    }
    
    function length(vector1) {
        return Math.sqrt(vector1[0] *  vector1[0] + vector1[1] *  vector1[1])
    }
    
    function dot(vector1, vector2) {
        return vector1[0] * vector2[0] + vector1[1] * vector2[1]
    }
    
    function cross(vector1, vector2) {
        return vector1[0] * vector2[1] - vector1[1] * vector2[0]
    }
    
    return {
        add: add,
        multiply: multiply,
        length: length,
        dot: dot,
        cross: cross
    }
})()


console.log(vector.add([1, 1], [1, 0]));
console.log(vector.multiply([3.5, -2], 2));
console.log(vector.length([3, -4]));
console.log(vector.dot([1, 0], [0, -1]));
console.log(vector.cross([3, 7], [1, 0]));