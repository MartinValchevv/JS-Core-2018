let expect = require('chai').expect
let isOddOrEven = require('../Even Or Odd').isOddOrEven

describe("Odd or Even Tests", function () {
    it("with number, should return undefined", function () {
        expect(isOddOrEven(3)).to.be.undefined
    })
    it("with obj{}, should return undefined", function () {
        expect(isOddOrEven({})).to.be.undefined
    })
    it("with odd string, should return odd", function () {
        expect(isOddOrEven('pesho')).to.be.equal('odd')
    })
    it("with even string, should return even", function () {
        expect(isOddOrEven('four')).to.be.equal('even')
    })
    it("with empty string, should return even", function () {
        expect(isOddOrEven('')).to.be.equal('even')
    })
    it("with undefined, should return undefined", function () {
        expect(isOddOrEven(undefined)).to.be.undefined
    })
})