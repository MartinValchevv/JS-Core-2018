$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $('#cat-template').html()
        let template = Handlebars.compile(source)

        let context = {
            cats: window.cats
        }

        let html = template(context)

        $('#allCats').append(html)

        $('button').click(function () {
            let el = $(this).parent().children()
            let id = $(el[1]).attr('id')

            if ($("#" + id).css('display') === 'none') {
                this.textContent = 'Hide status code'
                $("#" + id).show()
            } else {
                this.textContent = 'Show status code'
                $("#" + id).hide()
            }
        })
    }
})