const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_SJXv3ijHX' //your app id
const APP_SECRET = '3835f49f4b5c4cabbf02e2661c1df02f' //your app secret
const AUTH_HEADERS = { 'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET) }


function loginUser() {
    let username = $('#formLogin input[name=username]').val()
    let password = $('#formLogin input[name=password]').val()

    if (username && username.length > 4) {
        if (password) {

            $.ajax({
                method: 'POST',
                url: BASE_URL + 'user/' + APP_KEY + '/login',
                headers: AUTH_HEADERS,
                data: { username, password }
            }).then(function (res) {
                $('#formLogin').trigger('reset')
                signInUser(res, 'Login successful.')
            }).catch(handleAjaxError)

        } else {
            showError('A password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }
    } else {
        showError('A username should be at least 5 characters long and should contain only english alphabet letters.')
    }
}

function registerUser() {
    let username = $('#formRegister input[name=username]').val()
    let password = $('#formRegister input[name=password]').val()
    let repeatPass = $('#formRegister input[name=repeatPass]').val()


    if (username && username.length > 4) {
        if (password) {
            if (password === repeatPass) {

                $.ajax({
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_KEY + '/',
                    headers: AUTH_HEADERS,
                    data: { username, password }
                }).then(function (res) {
                    $('#formRegister').trigger('reset')
                    signInUser(res, 'User registration successful.')
                }).catch(handleAjaxError)

            } else {
                showError('Passwords do not match.')
            }
        } else {
            showError('A password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }
    } else {
        showError('A username should be at least 5 characters long and should contain only english alphabet letters.')
    }

}

function logoutUser() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function () {
        sessionStorage.clear()
        showInfo('Logout successful.')
        showHideMenuLinks()
    }).catch(handleAjaxError)

}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('authToken', res._kmd.authtoken)
    sessionStorage.setItem('id', res._id)
    sessionStorage.setItem('subscriptions', JSON.stringify(res.subscriptions))
    showHideMenuLinks()
    showInfo(message)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

function listChirps() {
    $('#chirps article').remove()
    $('#chirps div').remove()

    let subs = ''
    if (sessionStorage.getItem('subscriptions') !== 'undefined') {
        subs = JSON.parse(sessionStorage.getItem('subscriptions'))
        subs = subs.map(e => `"${e}"`);
    }

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": 1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayChirps(res)
        loadUserPostField('viewFeed', 'userStats', sessionStorage.getItem('username'))
    }).catch(handleAjaxError)

}

function displayChirps(chirps) {
    if (chirps.length != 0) {
        for (let chirp of chirps) {
            $('#chirps').append($('<article>').addClass('chirp')
                .append($('<div>').addClass('titlebar')
                    .append($('<a>').attr('href', '#').addClass('chirp-author').text(chirp.author).on('click', function () {
                        showUser(chirp.author, chirp._id)
                    }))
                    .append($('<span>').addClass('chirp-time').text(calcTime(chirp._kmd.ect)))
                ).append($('<p>').text(chirp.text))
            )
        }
    } else {
        $('#chirps article').remove()
        $('#chirps').append($('<div>').addClass('chirp')
            .append($('<span>').addClass('loading').text('No chirps in database'))
        )
    }
}

function countChirps(username) {
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/chirps?query={"author":"${username}"}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        sessionStorage.setItem('chirps', res.length)
    }).catch(handleAjaxError)
}

function countFollowing(username) {
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'user/' + APP_KEY + `/?query={"username":"${username}"}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        if (res[0].subscriptions === undefined) {
            sessionStorage.setItem('following', 0)
        } else {
            sessionStorage.setItem('following', res[0].subscriptions.length)
        }
    }).catch(handleAjaxError)
}

function countFollowers(username) {
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'user/' + APP_KEY + `/?query={"subscriptions":"${username}"}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        sessionStorage.setItem('followers', res.length)
    }).catch(handleAjaxError)
}

function loadUserPostField(usernameField, userStatsField, username) {

    $(`#${usernameField} h2`).first().text(username)
    $(`#${userStatsField}`).empty()
    countChirps(username)
    countFollowing(username)
    countFollowers(username)

    let chirps = sessionStorage.getItem('chirps')
    let following = sessionStorage.getItem('following')
    let followers = sessionStorage.getItem('followers')

    $(`#${userStatsField}`)
        .append($('<span>').text(`${chirps} chirps |`))
        .append($('<span>').text(` ${following} following |`))
        .append($('<span>').text(` ${followers} followers`))
}

function postChirp(formName) {
    let author = sessionStorage.getItem('username')
    let text = $(`#${formName} textarea[name=text]`).val()

    if (text.length > 0) {
        if (text.length <= 150) {
            $.ajax({
                method: 'POST',
                url: BASE_URL + 'appdata/' + APP_KEY + '/chirps',
                headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
                data: { author, text }
            }).then(function (res) {
                $(`#${formName} textarea[name=text]`).val('')
                showInfo('Chirp published.')
                displayUserFeed()
            }).catch(handleAjaxError)
        } else {
            showError('Your Chirp is over 150 symbols.')
        }
    } else {
        showError('Enter text.')
    }
}

function displayUserFeed() {
    showView('viewMe')
    listMyChirps()
    loadUserPostField('viewMe', 'myStats', sessionStorage.getItem('username'))
}

function listMyChirps() {
    let username = sessionStorage.getItem('username')
    $('#myChirps div').remove()
    $('#myChirps article').remove()

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayMyChirps(res)
    }).catch(handleAjaxError)
}

function displayMyChirps(chirps) {
    if (chirps.length != 0) {
        for (let chirp of chirps) {
            $('#myChirps').append($('<article>').addClass('chirp')
                .append($('<div>').addClass('titlebar')
                    .append($('<a>').attr('href', '#').addClass('chirp-author').text(chirp.author).on('click', function () {
                        // showUser(chirp.author)
                    }))
                    .append($('<span>').addClass('chirp-time')
                        .append($('<a>').attr('href', '#').html('delete&nbsp').on('click', function () {
                            deleteChirp(chirp)
                        }))
                        .append($('<span>').addClass('chirp-time').text(`${calcTime(chirp._kmd.ect)}`))
                    )
                ).append($('<p>').text(chirp.text))
            )
        }
    } else {
        $('#myChirps article').remove()
        $('#myChirps').append($('<div>').addClass('chirp')
            .append($('<span>').addClass('loading').text('No chirps in database'))
        )
    }
}

function deleteChirp(chirp) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + `/chirps/${chirp._id}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        showInfo('Chirp deleted.')
        listMyChirps()
    }).catch(handleAjaxError)
}

function listDiscover() {
    $('#linkDiscover').off('click')
    setTimeout(() => $('#linkDiscover').on('click', listDiscover), 1000) //to avoid multiple click

    showView('viewDiscover')
    $('#userlist div').remove()

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'user/' + APP_KEY,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayDiscover(res)
    }).catch(handleAjaxError)
}

function displayDiscover(users) {
    for (let user of users) {
        let username = sessionStorage.getItem('username')

        if (user.username != username) {
            $.ajax({
                method: 'GET',
                url: BASE_URL + 'user/' + APP_KEY + `/?query={"subscriptions":"${user.username}"}`,
                headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
            }).then(function (res) {
                $('#userlist').append($('<div>').addClass('userbox')
                    .append($('<div>')
                        .append($('<a>').attr('href', '#').addClass('chirp-author').text(user.username).on('click', function () {
                            showUser(user.username)
                        })))
                    .append($('<div>').addClass('user-details')
                        .append($('<span>').text(`${res.length} followers`))
                    )
                )
            }).catch(handleAjaxError)
        }
    }
}

function listUserChirps() {
    let username = $('#viewProfile h2').first().text()
    $('#profileChirps article').remove()
    $('#profileChirps div').remove()

    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayUserChirps(res)
    }).catch(handleAjaxError)
}

function displayUserChirps(chirps) {
    if (chirps.length != 0) {
        for (let chirp of chirps) {
            $('#profileChirps').append($('<article>').addClass('chirp')
                .append($('<div>').addClass('titlebar')
                    .append($('<a>').attr('href', '#').addClass('chirp-author').text(chirp.author))
                    .append($('<span>').addClass('chirp-time')
                        .append($('<span>').addClass('chirp-time').text(`${calcTime(chirp._kmd.ect)}`))
                    )
                ).append($('<p>').text(chirp.text))
            )
        }
    } else {
        $('#profileChirps article').remove()
        $('#profileChirps').append($('<div>').addClass('chirp')
            .append($('<span>').addClass('loading').text('No chirps in database'))
        )
    }

}

function showUser(user, userId) {
    showView('viewProfile')
    $('#userProfileStats').empty()
    loadUserPostField('viewProfile', 'userProfileStats', user)
    let subscriptions = []
    if (sessionStorage.getItem('subscriptions') != 'undefined') {
        subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
    }
    listUserChirps()


    if (subscriptions.includes(user)) {
        $('#btnFollow').hide()
        $('#btnUnfollow').show()
    } else {
        $('#btnUnfollow').hide()
        $('#btnFollow').show()
    }
}

function fallowUser() {
    let user = $('#viewProfile h2').first().text()
    let subscriptions = []
    if (sessionStorage.getItem('subscriptions') != 'undefined') {
        subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
    }

    if (!subscriptions.includes(user)) {
        subscriptions.push(user)
    }
    showInfo(`Subscribed to ${user}`)
    sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions))


    $.ajax({
        method: 'PUT',
        url: BASE_URL + 'user/' + APP_KEY + '/' + sessionStorage.getItem('id'),
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
        data: { subscriptions }
    }).then(function (res) {
        $('#btnFollow').hide()
        $('#btnUnfollow').show()
        showHomeView()
    }).catch(handleAjaxError)
}

function unfallowUser() {
    let user = $('#viewProfile h2').first().text()
    let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'))
    subscriptions = subscriptions.filter(x => x != user)
    showInfo(`Unsubscribed to ${user}`)
    sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions))

    $.ajax({
        method: 'PUT',
        url: BASE_URL + 'user/' + APP_KEY + '/' + sessionStorage.getItem('id'),
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') },
        data: { subscriptions }
    }).then(function (res) {
        $('#btnFollow').show()
        $('#btnUnfollow').hide()
        showHomeView()
    }).catch(handleAjaxError)
}