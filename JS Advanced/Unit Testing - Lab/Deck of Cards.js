function printDeckOfCards(arr) {
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

    for (let i = 0; i < arr.length; i++) {
        let card = arr[i].substring(0, arr[i].length - 1)
        let suit = arr[i][arr[i].length - 1]
        try {
            arr[i] = createCard(card, suit)
        } catch (e) {
            console.log("Invalid card: " + arr[i])
            return
        }
    }
    console.log(arr.join(" "))
}


printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);