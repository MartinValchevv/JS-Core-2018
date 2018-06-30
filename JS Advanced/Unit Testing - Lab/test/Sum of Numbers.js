const expect = require('chai').expect;
const sum = require("../Sum of Numbers").sum

describe("Sum function tests", function () {
    it('should return 6 for [1,2,3]', function () {
        // Arrange
        let array = [1, 2, 3]
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.equal(6)
    });
    it('should return 1 for [1]', function () {
        // Arrange
        let array = [1]
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.equal(1)
    });
    it('should return 3 for [1.5, 1.5]', function () {
        // Arrange
        let array = [1.5, 1.5]
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.equal(3)
    });
    it('should return -3 for [-1.5, -1.5]', function () {
        // Arrange
        let array = [-1.5, -1.5]
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.equal(-3)
    });
    it('should return 0 for []', function () {
        // Arrange
        let array = []
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.equal(0)
    });
    it('should return NaN for string', function () {
        // Arrange
        let array = "string"
        // Act
        let result = sum(array)
        // Assert
        expect(result).to.be.NaN
    });
})