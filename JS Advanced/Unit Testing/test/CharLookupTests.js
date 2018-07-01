const expect = require('chai').expect
const lookupChar = require('../Char Lookup').lookupChar

describe('Lookup Char Tests', function () {
    it ('with diff param, should return undefined', function () {
        expect(lookupChar([], {})).to.be.undefined
    })
    it ('with first diff param, should return undefined', function () {
        expect(lookupChar('first', {})).to.be.undefined
    })
    it ('with only integer param, should return undefined', function () {
        expect(lookupChar(2, 7)).to.be.undefined
    })
    it ('with double index, should return undefined', function () {
        expect(lookupChar('pesho', 7.7)).to.be.undefined
    })
    it ('with only one param, should return undefined', function () {
        expect(lookupChar('first')).to.be.undefined
    })
    it ('with two strings param, should return undefined', function () {
        expect(lookupChar('first', 'second')).to.be.undefined
    })
    it ('with string.length <= index, should return Incorrect index', function () {
        expect(lookupChar('first', 10)).to.be.equal('Incorrect index')
    })
    it ('with string.length <= index, should return Incorrect index', function () {
        expect(lookupChar('first', 5)).to.be.equal('Incorrect index')
    })
    it ('with index < 0, should return Incorrect index', function () {
        expect(lookupChar('first', -1)).to.be.equal('Incorrect index')
    })
    it ('with index = 0, should return f', function () {
        expect(lookupChar('first', 0)).to.be.equal('f')
    })
    it ('with first and 4, should return t', function () {
        expect(lookupChar('first', 4)).to.be.equal('t')
    })
})
