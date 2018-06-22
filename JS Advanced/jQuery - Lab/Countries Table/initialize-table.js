function initializeTable() {
    addCountries("Bulgaria", "Sofia");
    addCountries("Germany", "Berlin");
    addCountries("Russia", "Moscow");
    fixRows();

    $("#createLink").click(collectData);

    function collectData() {
        let country = $("#newCountryText");
        let capital = $("#newCapitalText");
        addCountries(country.val(), capital.val());
        country.val(" ");
        capital.val(" ");
    }

    function addCountries(country, capital) {
        let row = $(`<tr>`)
            .append(`<td>${country}</td>`)
            .append(`<td>${capital}</td>`)
            .append($(`<td>`)
                .append($('<a href="#">[Up]</a>').click(MoveUpRow))
                .append($('<a href="#">[Down]</a>').click(MoveDownRow))
                .append($('<a href="#">[Delete]</a>').click(DeletedRow))
            )
            .appendTo($("#countriesTable"));

        row.css("display", "none");
        row.fadeIn();
        fixRows()
    }

    function MoveUpRow() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.insertBefore(row.prev());
            row.fadeIn();
            fixRows()
        });
    }

    function MoveDownRow() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.insertAfter(row.next());
            row.fadeIn();
            fixRows()
        });
    }

    function DeletedRow() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.remove();
            fixRows()
        });
    }

    function fixRows() {
        $("#countriesTable a").css("display", "inline");
        let allRows = $("#countriesTable tr");

        $(allRows[2]).find("a:contains('Up')").css('display', 'none');
        $(allRows[allRows.length - 1]).find("a:contains('Down')").css("display", "none");
    }
}