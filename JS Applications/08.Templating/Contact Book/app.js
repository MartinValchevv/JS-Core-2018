( async () => {
    const data = await $.get('./data.json')
    const contactHtml = await $.get('./template/contacts.hbs')
    let contactTemplate = Handlebars.compile(contactHtml)
    let finalData = {contacts: data}
    let resultHtml = contactTemplate(finalData)
    $('#list').append(resultHtml)

    const detailsHtml = await $.get('./template/details.hbs')
    let detailsTemplate = Handlebars.compile(detailsHtml)
    $('.contact').on('click', function () {
        $('.content > div').removeClass('contactSelected')
        $(this).addClass('contactSelected')
        let index = $(this).attr('data-id')
        let result = detailsTemplate(data[index])
        $('#details > div').remove()
        $('#details').append(result)
    })
})()