class BookCollection {

    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
        this._shelfCondition = 0;
    }

    get room() {
        return this._room;
    }

    get shelfCondition() {
        this._shelfCondition = this.shelfCapacity - this.shelf.length;
        return this._shelfCondition;
    }

    set room(value) {
        if (value === 'livingRoom' || value === 'bedRoom' || value === 'closet') {
            this._room = value;
            return;
        }
        throw new Error(`Cannot have book shelf in ${value}`)
    }

    addBook() {
        let obj = {};
        let bookName, bookAuthor, genre;
        if (arguments.length === 3) {
            bookName = arguments[0];
            bookAuthor = arguments[1];
            genre = arguments[2];
            obj = {bookName, bookAuthor, genre}
        } else if (arguments.length === 2) {
            bookName = arguments[0];
            bookAuthor = arguments[1];
            obj = {bookName, bookAuthor}
        }

        if (this.shelfCondition === 0) {
            this.shelf.shift();
            this.shelf.push(obj)
        } else {
            this.shelf.push(obj)
        }

        this.shelf = this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));

        return this;
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter(a => a.bookName !== bookName)
    }

    showBooks(genre) {
        let arr = [];
        arr = this.shelf.filter(a => a.genre === genre);
        let output = `Results for search "${genre}":\n`;

        for (let obj of arr) {
            output += `\uD83D\uDCD6 ${obj.bookAuthor} - "${obj.bookName}"\n`
        }
        output = output.slice(0, -1);
        return output;
    }

    toString() {
        let output = `"${this.shelfGenre}" shelf in ${this._room} contains:\n`;

        if (this.shelf.length === 0) {
            return `It's an empty shelf`
        }


        for (let obj of this.shelf) {
            output += `\uD83D\uDCD6 "${obj.bookName}" - ${obj.bookAuthor}\n`
        }
        output = output.slice(0, -1);
        return output
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


