const expect = require('chai').expect
const SubscriptionCard = require('./Subscription Card')


describe('SubscriptionCard Unit Testing', function () {

    describe('Construktor Test', function () {
        it ('intiliazie corectly', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.firstName).to.be.equal("Pesho")
            expect(card.lastName).to.be.equal("Petrov")
            expect(card.SSN).to.be.equal("00000000")
        })
    })

    describe('isBlocked Test', function () {
        it ('return false for new Obj', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isBlocked).to.be.equal(false)
        })
        it ('return true for blocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block()
            expect(card.isBlocked).to.be.equal(true)
        })
        it ('return false for blocked card then unblock', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block()
            card.unblock()
            expect(card.isBlocked).to.be.equal(false)
        })
        it ('return false for unblock card then block', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.unblock()
            card.block()
            expect(card.isBlocked).to.be.equal(true)
        })
    })
    describe('addSubscription Test', function () {
        it ('Add correctly subscrition', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.be.equal(1)
            expect(card._subscriptions[0].line).to.be.equal('120')
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'))
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'))
        })
        it ('Add correctly whit 2 subscrition', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card._subscriptions.length).to.be.equal(2)
            expect(card._subscriptions[0].line).to.be.equal('120')
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'))
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'))
            expect(card._subscriptions[1].line).to.be.equal('*')
            expect(card._subscriptions[1].startDate).to.be.eql(new Date('2018-05-25'))
            expect(card._subscriptions[1].endDate).to.be.eql(new Date('2018-06-24'))
        })
        it ('work correctly empty card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card._subscriptions.length).to.be.equal(0)
            expect(card._subscriptions[0]).to.be.equal(undefined)
            expect(card._subscriptions).to.be.eql([])
        })
    })

    describe('isValid Test', function () {
        it ('Empty card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.equal(false)
        })
        it ('One day before', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-21'))).to.be.equal(false)
        })
        it ('One day after', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-22'))).to.be.equal(false)
        })
        it ('On start day', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.equal(true)
        })
        it ('On end day', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-21'))).to.be.equal(true)
        })
        it ('invalid line', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-04-25'))).to.be.equal(false)
        })
        it ('whit(*) valid all line', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('15226621', new Date('2018-04-25'))).to.be.equal(true)
        })
        it ('whit(*) to start date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('15226621', new Date('2018-04-22'))).to.be.equal(true)
        })
        it ('whit(*) end date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('15226621', new Date('2018-05-21'))).to.be.equal(true)
        })
        it ('whit(*) one day before', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('15226621', new Date('2018-04-21'))).to.be.equal(false)
        })
        it ('whit(*) one day after', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('15226621', new Date('2018-05-22'))).to.be.equal(false)
        })
        it ('Blocked card return false', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            card.block()
            expect(card.isValid('15226621', new Date('2018-04-24'))).to.be.equal(false)
        })
    })
    describe('should not change', function () {
        it ('all change testing', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.firstName = 'Test'
            card.lastName = 'Test'
            card.SSN = 'Test'
            expect(card.firstName).to.be.equal("Pesho")
            expect(card.lastName).to.be.equal("Petrov")
            expect(card.SSN).to.be.equal("00000000")
        })
    })
})