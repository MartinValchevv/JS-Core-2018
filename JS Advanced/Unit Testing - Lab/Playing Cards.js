function createCard(cards, suit) {
    const VALID_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const VALID_SUIT = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    }
    if (VALID_CARDS.indexOf(cards) < 0 || !VALID_SUIT.hasOwnProperty(suit)) {
        throw new Error('Invalid card of suit!')
    }
    return {
        toString: function () {
            return cards + VALID_SUIT[suit]
        }
    }
}

console.log('' + createCard('A', 'S'))
console.log('' + createCard('10', 'H'))
console.log('' + createCard('1', 'C'))