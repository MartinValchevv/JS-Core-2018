const expect = require('chai').expect
const Sumator = require('./sumator');


describe('Sumator Unit Test', function () {
    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    });
    describe("check if functions exist", function () {
        it("data is not undefined", function () {
            expect(sumator.data !== undefined).to.equal(true)
        });

        it("add func exists", function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.be.equal(true);
        });

        it("sumNums func exists", function () {
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.be.equal(true);
        });

        it("removeByFilter func exists", function () {
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.be.equal(true);
        });

        it("toString func exists", function () {
            expect(Sumator.prototype.hasOwnProperty('toString')).to.be.equal(true);
        });
    });

    describe ('test if data length is empty', function () {
        it('test if data length is empty', function () {
            expect(sumator.data.length).to.be.equal(0)
        });
    });
    describe('test addFunc', function () {
        it('test addFunc with numbers', function () {
            sumator.add(5)
            sumator.add(2)
            sumator.add(1)
            expect(sumator.toString()).to.be.equal('5, 2, 1')
        })
        it('test addFunc with string', function () {
            sumator.add('Kiro')
            sumator.add('Marto')
            sumator.add('Ivan')
            expect(sumator.toString()).to.be.equal('Kiro, Marto, Ivan')
        })
        it('test addFunc with mixed type', function () {
            sumator.add('Kiro')
            sumator.add(5)
            sumator.add({name: 'Ivan'})
            expect(sumator.toString()).to.be.equal('Kiro, 5, [object Object]')
        })
    })
    describe('test SumFunc', function () {
        it('test with numbers', function () {
            sumator.add(5)
            sumator.add(2)
            sumator.add(1)
            expect(sumator.sumNums()).to.be.equal(8)
        })
        it('test  with string', function () {
            sumator.add('Kiro')
            sumator.add('Marto')
            sumator.add('Ivan')
            expect(sumator.sumNums()).to.be.equal(0)
        })
        it('test  with mixed', function () {
            sumator.add('Kiro')
            sumator.add(1)
            sumator.add(1)
            sumator.add('Ivan')
            expect(sumator.sumNums()).to.be.equal(2)
        })
        it('test with mixed should return 0', function () {
            sumator.add('Kiro')
            sumator.add({})
            sumator.add([])
            expect(sumator.sumNums()).to.be.equal(0)
        })
    })
    describe('Test removeByFilter func', function () {
        it('test removeByFilter with odd numbers', function () {
            for (let i = 0; i <= 10; i++) {
                sumator.add(i)
            }
            sumator.removeByFilter((x) => x % 2 !== 0)
            expect(sumator.toString()).to.be.equal('0, 2, 4, 6, 8, 10')
        })
        it('test removeByFilter with > 5', function () {
            for (let i = 0; i <= 5; i++) {
                sumator.add(i)
            }
            sumator.removeByFilter((x) => x > 5)
            expect(sumator.toString()).to.be.equal('0, 1, 2, 3, 4, 5')
        })
        it('test removeByFilter with undefined', function () {
            for (let i = 0; i <= 5; i++) {
                sumator.add(i)
            }
            expect(() => sumator.removeByFilter(undefined)).to.throw()
        })
    })
    describe('Test toString', function () {
        it('whit items in array', function () {
            sumator.add(4)
            sumator.add("Kiro")
            expect(sumator.toString()).to.be.equal('4, Kiro')
        })
        it('whit no items in array', function () {
            expect(sumator.toString()).to.be.equal('(empty)')
        })
    })
})