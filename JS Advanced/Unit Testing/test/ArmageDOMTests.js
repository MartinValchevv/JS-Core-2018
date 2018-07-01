let expect = require("chai").expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let nuke = require("../ArmageDOM").nuke;

describe("ArmageDom task", () => {
    beforeEach(function () {
        document.body.innerHTML = `<body>
<div id="target">
    <div class="nested target">
        <p>This is some text</p>
    </div>
    <div class="target">
        <p>Empty div</p>
    </div>
    <div class="inside">
        <span class="nested">Some more text</span>
        <span class="target">Some more text</span>
    </div>
</div>
</body>
`
    });

    describe("sent invalid selectors it should stay unchanged", () => {
        it('should return the same body for first selector "unitTest" ', function () {
            let selector1 = "unitTest";
            let selector2 = '#target';
            let oldHTML = $(selector2).html();
            nuke(selector1, selector2);
            expect($(selector2).html()).to.be.equal(oldHTML);
        });
        it('should return the same body for second selector 33', function () {
            let selector1 = "div";
            let selector2 = 33;
            let oldHTML = $(selector1).html();
            nuke(selector1, selector2);
            expect($(selector1).html()).to.be.equal(oldHTML);
        });
        it('should return unchanged body for selectors with same value', function () {
            let selector1 = ".inside";
            let selector2 = ".inside";
            let oldHTML = $(selector1).html();
            nuke(selector1, selector2);
            expect($(selector1).html()).to.be.equal(oldHTML);
        });
        it('should shoud return unchaged for both correct selectors but on diffrent elements', function () {
            let selector1 = ".inside";
            let selector2 = ".target";
            let oldHTML = $(selector1).html();
            nuke(selector1, selector2);
            expect($(selector1).html()).to.be.equal(oldHTML);
        });
    });
    describe("sent valid selectors", () => {
        it('should delete the node with select "div" and "inside"', function () {
            let selector1 = ".target";
            let selector2 = ".inside";
            nuke(selector1, selector2);
            let length = $(selector1 + selector2);
            expect(length.length).to.be.equal(0)
        });
    });
});