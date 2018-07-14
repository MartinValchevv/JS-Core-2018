const expect = require('chai').expect
const StringBuilder = require('./String Builder')


describe('StringBuilder UnitTest', function () {
    let builder;
    beforeEach(function () {
        builder = new StringBuilder('test')
    })
    it('it should have intialiazed all method', function () {
        expect(Object.getPrototypeOf(builder).hasOwnProperty('append')).to.be.equal(true)
        expect(Object.getPrototypeOf(builder).hasOwnProperty('prepend')).to.be.equal(true)
        expect(Object.getPrototypeOf(builder).hasOwnProperty('remove')).to.be.equal(true)
        expect(Object.getPrototypeOf(builder).hasOwnProperty('remove')).to.be.equal(true)
    })
    it('return same string', function () {
        expect(builder.toString()).to.be.equal('test')
    })
    it('if builder empty return same empty string', function () {
        builder = new StringBuilder()
        expect(builder.toString()).to.be.equal('')
    })
    it('if input diffrent from sting return throw', function () {
        expect(() => {builder = new StringBuilder(1)}).to.throw(TypeError)
    })
    it('func append', function () {
        builder.append('gosho')
        expect(builder._stringArray.length).to.be.equal(9)
        expect(builder.toString()).to.be.equal('testgosho')
    })
    it('func append error', function () {
        expect(() => {builder.append({})}).to.throw(TypeError)
    })
    it('func prepend', function () {
        builder.prepend('ivan')
        expect(builder._stringArray.length).to.be.equal(8)
        expect(builder.toString()).to.be.equal('ivantest')
    })
    it('func prepend error', function () {
        expect(() => {builder.prepend({})}).to.throw(TypeError)
    })
    it('func remove', function () {
        builder.remove(6, 3)
        expect(builder.toString()).to.be.equal('test')
        builder.remove(1, 3)
        expect(builder.toString()).to.be.equal('t')
    })
    it('func insertAt', function () {
        builder.insertAt('woop', 3)
        expect(builder.toString()).to.be.equal('teswoopt')
        expect(builder._stringArray.length).to.be.equal(8)
    })
    it('func insertAt error', function () {
        expect(() => {builder.insertAt({}, 5)}).to.throw(TypeError)
    })
})