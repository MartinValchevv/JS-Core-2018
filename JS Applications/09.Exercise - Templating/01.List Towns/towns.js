function attachEvents() {
    let source = $('#towns-template').html()
    let template = Handlebars.compile(source)

    $('#btnLoadTowns').click(function () {
        $('#root').empty()
        let input = $('#towns').val()
        let arr = input.split(', ')

        let context = {
            towns: arr
        }

        let html = template(context)

        $('#towns').val('')
        $('#root').append(html)
    })
}