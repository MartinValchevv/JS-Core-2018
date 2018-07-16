class BookCollection {
    constructor (shelfGenre, room, shelfCapacity) {
        this.room = room
        this.shelfGenre = shelfGenre
        this.shelfCapacity = +shelfCapacity
        this.shelf = []
    }

    get room() {
        return this._room
    }

    get shelfCondition () {
        this._shelfCondition = this.shelfCapacity - this.shelf.length
        return this._shelfCondition
    }

    set room(value) {
        if (value === 'livingRoom' || value === 'bedRoom' || value === 'closet') {
            this._room = value
            return
        }
        throw new Error(`Cannot have book shelf in ${value}`)
    }

    addBook(bookName, bookAuthor, genre) {
        let object = {bookName: bookName, bookAuthor: bookAuthor, genre: genre}
        this.shelf.push(object)
        return this
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter(a=>a.bookName !== bookName)
    }

    showBooks(genre) {
        let arr = []
        arr = this.shelf.filter(a=>a.genre === genre)
        let output = `Results for search ${genre}":\n`
        for (let obj of arr) {
            output += `\n “\uD83D\uDCD6 "${obj.bookName}" – ${obj.bookAuthor}”`
        }
        output = output.slice(0, -1)
        return output
    }

    toString() {
        let result = `"${this.shelfGenre}" shelf in ${this.room} contains:`
        if (this.shelf.length > 0) {
            this.shelf.forEach(o => result += `\n “\uD83D\uDCD6 "${o.bookName}" – ${o.bookAuthor}”`);
        } else {
            // result += "\n";
            return 'It\'s an empty shelf'
        }
        return result;
    }
}


// let livingRoom = new BookCollection("Programming", "livingRoom", 5)
//     .addBook("Introduction to Programming with C#", "Svetlin Nakov")
//     .addBook("Introduction to Programming with Java", "Svetlin Nakov")
//     .addBook("Programming for .NET Framework", "Svetlin Nakov");
// console.log(livingRoom.toString());


// let garden = new BookCollection("Programming", "garden");
// console.log(garden.toString());

let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));


