function attachEvents() {
    const baseURL = `https://messenger-853cd.firebaseio.com/`
    let textArea = $('#messages')
    let author = $('#author')
    let message = $('#content')
    let sendBtn = $('#submit')
    let refreshBtn = $('#refresh')

    loadMessage()

    refreshBtn.click(loadMessage)
    sendBtn.click(newMessage)

    function newMessage() {
        if (author.val() !== '' && message.val() !== '') {
            let msg = {author: author.val(), content: message.val(), timestamp: Date.now()}
            $.ajax({
                method: "POST",
                url: baseURL + '.json',
                data: JSON.stringify(msg)
            }).then(function () {
                author.val('')
                message.val('')
            }).catch(handleError)
        }
    }

    function loadMessage() {
        $.ajax({
            method: "GET",
            url: baseURL + '.json'
        }).then(function (data) {
            let text = ''
            let sorted = Object.keys(data).sort((a, b) => data[a].timestamp - data[b].timestamp)
            for (const id of sorted) {
                text += data[id].author + ': ' + data[id].content + '\n'
            }
            textArea.text(text)
        }).catch(handleError)
    }

    function handleError(err) {
        console.error(err);
    }
}