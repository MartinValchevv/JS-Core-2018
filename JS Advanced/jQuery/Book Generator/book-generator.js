function createBook(selector, bookTitle, authorName, isbn) {
    let bookGenerator = (function () {
        let id = 1;
        return function (selector, bookTitle, authorName, isbn) {
            let container = $(selector)
            let bookConteiner = $('<div>')
            bookConteiner.attr('id', 'book' + id)
            bookConteiner.css('border', 'none')
            $(`<p class='title'>${bookTitle}</p>`).appendTo(bookConteiner)
            $(`<p class='author'>${authorName}</p>`).appendTo(bookConteiner)
            $(`<p class='isbn'>${isbn}</p>`).appendTo(bookConteiner)
            let select = $('<button>Select</button>')
            let deselect = $('<button>Deselect</button>')
            select.on('click', function () {
                bookConteiner.css('border', '2px solid blue')
            })
            deselect.on('click', function () {
                bookConteiner.css('border', 'none')
            })
            select.appendTo(bookConteiner)
            deselect.appendTo(bookConteiner)
            bookConteiner.appendTo(container)
            id++
        }
    }())
    bookGenerator(selector, bookTitle, authorName, isbn)
}
