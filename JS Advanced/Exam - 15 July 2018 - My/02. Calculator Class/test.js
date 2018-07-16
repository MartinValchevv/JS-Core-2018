const expect = require('chai').expect
const Calculator = require('./Calculator Class')

describe('StringBuilder UnitTest', function () {
    let calc;
    beforeEach(function () {
        calc = new Calculator()
    })
    it("create calc", function() {
        expect(calc.toString()).to.be.equal("empty array")
    });
    it('it should have intialiazed all method', function () {
        expect(Object.getPrototypeOf(calc).hasOwnProperty('add')).to.be.equal(true)
        expect(Object.getPrototypeOf(calc).hasOwnProperty('divideNums')).to.be.equal(true)
        expect(Object.getPrototypeOf(calc).hasOwnProperty('orderBy')).to.be.equal(true)
        expect(Object.getPrototypeOf(calc).hasOwnProperty('constructor')).to.be.equal(true)
    })
    it("add func", function() {
        calc.add(10);
        calc.add("Pesho");
        calc.add("5");
        expect(calc.toString()).to.be.equal("10 -> Pesho -> 5")
    });
    it("add func whit diffrent type", function() {
        calc.add(10);
        calc.add("Pesho");
        calc.add({});
        calc.add(false);
        expect(calc.toString()).to.be.equal("10 -> Pesho -> [object Object] -> false")
    });
    it("add func  whit '' ", function() {
        calc.add();
        expect(calc.toString()).to.be.equal("")
    });
    it("divideNums func", function() {
        calc.add(10);
        expect(calc.divideNums(10)).to.be.equal(10)
    });
    it("divideNums func whit double number", function() {
        calc.add(15);
        expect(calc.divideNums(2.5)).to.be.equal(15)
    });
    it("divideNums func whit sting divide", function() {
        calc.add(15);
        expect(calc.divideNums('pesho')).to.throw
    });
    it("divideNums func whit > number for divide", function() {
        calc.add(15);
        calc.add(23);
        calc.add(1);
        expect(calc.divideNums(10000)).to.be.throw
    });
    it("orderBy func", function() {
        calc.add(1);
        calc.add("ivan");
        calc.add(3);
        expect(calc.orderBy()).to.be.equal('1, 3, ivan')
    });
    it("orderBy func", function() {
        calc.add([]);
        calc.add(3);
        calc.add("ivan");
        expect(calc.orderBy()).to.be.equal(', 3, ivan')
    });
    it("orderBy func", function() {
        calc.add(10);
        expect(calc.divideNums()).to.be.equal(10)
    });
    it("orderBy func whit undefined criteria", function() {
        calc.add(10);
        calc.add(0);
        expect(calc.divideNums(undefined)).to.be.equal("Cannot divide by zero")
    });
    it("orderBy func whit string, and return Error", function() {
        calc.add('ivan');
        calc.add('gosho');
        expect(()=> calc.divideNums()).to.throw('There are no numbers in the array!');
    });
});