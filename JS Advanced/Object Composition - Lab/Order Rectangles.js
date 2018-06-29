function orderRectangles(matrix) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let obj = {
            width: matrix[i][0],
            height: matrix[i][1],
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (other) {
                let result = other.area() - this.area();
                return result || (other.width - this.width)
            }
        }
        result.push(obj);
    }

    return result.sort((a, b) => a.compareTo(b));
}

console.log(orderRectangles([[10, 5], [3, 20], [5, 12]]));