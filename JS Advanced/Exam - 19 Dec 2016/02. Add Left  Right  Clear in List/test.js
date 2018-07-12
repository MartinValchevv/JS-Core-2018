const expect = require('chai').expect
const makeList = require('./list-add-left-right-clear')


describe("Make list unit testing", function() {
    let myList = {};
    beforeEach(function () {
        myList = makeList();
    });
    it("create list", function() {
        expect(myList.toString()).to.be.equal("")
    });
    describe("addLeft testing", function() {
        it("check whit 0 return undefined", function() {
            expect(myList.addLeft(0)).to.be.undefined
        });
        it("check whit string return undefined", function() {
            expect(myList.addLeft('beer')).to.be.undefined
        });
        it("check addRight and AddLeft", function() {
            myList.addRight(1);
            myList.addRight("two");
            myList.addLeft(0);
            expect(myList.toString()).to.be.equal('0, 1, two')
        });
    });
    describe("clear testing", function() {
        it("check", function() {
            myList.addRight(1);
            myList.addRight("two");
            myList.addLeft(0);
            myList.clear();
            expect(myList.toString()).to.be.equal('')
        });
    });
});

