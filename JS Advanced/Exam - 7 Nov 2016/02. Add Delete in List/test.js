const expect = require('chai').expect
const list = require('./add-delete-in-list')

describe("Add/Delete in list Unit testing", function() {
    it("create list", function() {
        list.delete(0)
        expect(list.toString()).to.be.equal("")
    });
    describe('add Func testing', function () {
        it("work correct whit number and string", function() {
            list.add(1)
            list.add('Pesho')
            list.add(3)
            expect(list.toString()).to.be.equal("1, Pesho, 3")
            expect(list.toString()).to.be.equal("1, Pesho, 3")
        });
    })
    describe('delete Func testing', function () {
        it("if index not integer or index is 0, index < data.length return undefined", function() {
            list.add(1)
            list.add(3)
            expect(list.delete(list[0])).to.be.undefined
            expect(list.delete(list[5])).to.be.undefined
            expect(list.delete(1.1)).to.be.undefined
            expect(list.delete('0')).to.be.undefined
        });
        it("work correct", function() {
            list.add(1)
            list.add('Pesho')
            list.add(3)
            expect(list.delete(1).toString()).to.be.equal('Pesho')
            expect(list.delete(0)).to.be.equal(1);
        });
        it("work diffrent element", function() {
            list.delete(0)
            list.delete(0)
            list.delete(0)
            list.delete(0)
            list.delete(0)
            list.delete(0)
            list.delete(0)
            expect(list.toString()).to.be.equal("");
            let elements = [{}, 101, "js", new Map(), 1.1, true, false];
            for (let e of elements) {
                list.add(e);
            }
            expect(list.toString()).to.be.equal("[object Object], 101, js, [object Map], 1.1, true, false");
            expect(list.delete(1)).to.be.equal(101);
            expect(list.delete(5)).to.be.false;
            expect(list.delete(1)).to.be.equal("js");
            expect(list.toString()).to.be.equal("[object Object], [object Map], 1.1, true");
        });
    })
});

