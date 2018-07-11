const expect = require('chai').expect
const createList = require('./list-add-swap-shift-left-right').createList

describe('Unit tests', function () {
    let list;

    beforeEach(() => {
        list = createList();
    });

    describe("has data array", () => {
        it('has empty array', () => {
            expect(list.toString()).to.equal("");
        })
    });

    describe('add works', () => {
        it("correct add", () => {
            list.add("5");
            list.add("6");
            list.add(2);
            list.add({});
            list.add(-1);
            list.add([]);
            expect(list.toString()).to.equal("5, 6, 2, [object Object], -1, ");
        });
    });

    describe("shiftsLeft correctly", () => {
        it("works", () => {
            list.add(2);
            list.add(3);
            list.shiftLeft();
            expect(list.toString()).to.equal("3, 2");
        });
        it("", () => {
            list.add(1);
            list.shiftLeft();
            expect(list.toString()).to.equal("1");
        })
    });

    describe("shiftsRight correctly", () => {
        it("works", () => {
            list.add(2);
            list.add(3);
            list.add(5);
            list.shiftRight();
            expect(list.toString()).to.equal("5, 2, 3");
        });
        it("", () => {
            list.add(1);
            list.shiftRight();
            expect(list.toString()).to.equal("1");
        })
    });

    describe("swap works correctly", () => {
        it("works", () => {
            list.add(2);
            list.add(3);
            list.add(5);
            //for first index
            expect(list.swap(-1,1)).to.equal(false);
            expect(list.swap("pesho", 2)).to.equal(false);
            expect(list.swap(2.5, 2)).to.equal(false);
            expect(list.swap(3,2)).to.equal(false);
            //for second index
            expect(list.swap(1,-1)).to.equal(false);
            expect(list.swap(2, "pesho")).to.equal(false);
            expect(list.swap(2, 2.5)).to.equal(false);
            expect(list.swap(2,3)).to.equal(false);
            //if object
            expect(list.swap({}, 1)).to.equal(false);
            expect(list.swap(1, {})).to.equal(false);
            //if equal
            expect(list.swap(2,2)).to.equal(false);
            expect(list.swap(0,0)).to.equal(false);
            expect(list.swap(0,1)).to.equal(true);
        });
        it("pesho", () => {
            list.add(1);
            list.add(2);
            list.swap(0,1);
            expect(list.toString()).to.equal("2, 1");
        });
        it("swaps", () => {
            list.add(2);
            list.add(1);
            list.swap(-1,10);
            expect(list.toString()).to.equal("2, 1");
        });
        it("swaps", () => {
            list.add(2);
            list.add(1);
            list.swap(0,[1,3]);
            expect(list.toString()).to.equal("2, 1");
        });
        it("swaps", () => {
            list.add("pesho");
            list.add("gosho");
            list.swap(0,1);
            expect(list.toString()).to.equal("gosho, pesho");
        })
    });

    describe("toString works", () => {
        it("works", () => {
            list.add("hi");
            list.add("bye");
            expect(list.toString()).to.equal("hi, bye");
        })
        it("returns empty", () => {
            expect(list.toString()).to.equal("");
        })
    })
});