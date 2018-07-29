const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_Bk6L-cO4X'
const APP_SECRET = '80d8df4c6e204b409cc466467f29614c'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}


function startApp() {
    showHideMenuLinks()
    showView('viewHome')
    events()
}


function registerUser() {
    let username = $('#formRegister input[name="username"]').val()
    let password = $('#formRegister input[name="passwd"]').val()
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res)
        showInfo('User registration successful.');
    }).catch(handleAjaxError)
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('userId', userInfo._id)
}

function signInUser(res) {
    saveAuthInSession(res)
    showHideMenuLinks()
    showHomeView()
}

function loginUser() {
    let username = $('#formLogin input[name="username"]').val()
    let password = $('#formLogin input[name="passwd"]').val()
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res)
        showInfo('Login successful.')
    }).catch(handleAjaxError)
}

function logoutUser() {
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        sessionStorage.clear()
        showHomeView()
        showHideMenuLinks()
        showInfo('Logout successful.')
    }).catch(handleAjaxError)
}

function createAd() {
    let title = $('#formCreateAd input[name="title"]').val()
    let description = $('#formCreateAd textarea[name="description"]').val()
    let date = $('#formCreateAd input[name="datePublished"]').val()
    let price = $('#formCreateAd input[name="price"]').val()
    let image = $('#formCreateAd input[name=image]').val()
    let publisher = sessionStorage.getItem('username')
    $.ajax({
        method: "POST",
        url: BASE_URL + 'appdata/' + APP_KEY + '/ad',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, description, date, price, image, publisher}
    }).then(function (res) {
        listAd()
        showInfo('Advertisement created.')
    }).catch(handleAjaxError)
}


function listAd() {
    $.ajax({
        method: "GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/ad',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        showView('viewAds')
        $('#ads > table tr').each((index, element) => {
            if (index > 0) {
                $(element).remove()
            }
        })
        for (const ad of res) {
            let tr = $(`<tr><td>${ad.title}</td>` +
                `<td>${ad.publisher}</td>` +
                `<td>${ad.description}</td>` +
                `<td>${ad.price}</td>` +
                `<td>${ad.date}</td>`)
            $('#ads > table').append(tr)
            let aReadMore = $('<a href="#">[Read More]</a>').on('click', function () {
                readMore(ad)
            })
            let td = $('<td>')
            td.append(aReadMore)
            tr.append(td)
            if (ad._acl.creator === sessionStorage.getItem('userId')) {
                let aDelete = $('<a href="#">[Delete]</a>').on('click', function () {
                    deleteAd(ad)
                })
                let aEdit = $('<a href="#">[Edit]</a>').on('click', function () {
                    loadAdForEdit(ad)
                })
                td.append(aDelete).append(aEdit)
                tr.append(td)
            }
        }
    }).catch(handleAjaxError)
}


function readMore(ad) {
    $.ajax({
        method: "GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/ad/' + ad._id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function () {
        $('#viewDetailsAd').empty();
        let info = $('<div>').append(
            $(`<img src="${ad.image}">`),
            $('<br>'),
            $('<label>').text('Title:'),
            $('<h1>').text(ad.title),
            $('<label>').text('Description:'),
            $('<p>').text(ad.description),
            $('<label>').text('Publisher:'),
            $('<div>').text(ad.publisher),
            $('<label>').text('Date:'),
            $('<div>').text(ad.date))
        let btnBack = $('<div><input type="button" class="form" value="Back"/></div>').on('click', function () {
            showView('viewAds')
        })
        $('#viewDetailsAd').append(info).append(btnBack)
        showView('viewDetailsAd');
    }).catch(handleAjaxError)
}

function deleteAd(ad) {
    $.ajax({
        method: "DELETE",
        url: BASE_URL + 'appdata/' + APP_KEY + '/ad/' + ad._id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function () {
        listAd()
        showView('viewAds')
        showInfo('Advert deleted.');
    }).catch(handleAjaxError)
}

function loadAdForEdit(ad) {
    showView('viewEditAd')
    $('#formEditAd input[name="title"]').val(ad.title)
    $('#formEditAd textarea[name="description"]').val(ad.description)
    $('#formEditAd input[name="datePublished"]').val(ad.date)
    $('#formEditAd input[name="price"]').val(ad.price)
    $('#formEditAd input[name="id"]').val(ad._id)
    $('#formEditAd input[name=image]').val(ad.image);
    $('#formEditAd input[name="publisher"]').val(sessionStorage.getItem('username'))
}

function editAd() {
   let title = $('#formEditAd input[name="title"]').val()
   let description = $('#formEditAd textarea[name="description"]').val()
    let date = $('#formEditAd input[name="datePublished"]').val()
   let price = $('#formEditAd input[name="price"]').val()
    let id = $('#formEditAd input[name="id"]').val()
    let image = $('#formEditAd input[name=image]').val();
    let publisher =$('#formEditAd input[name="publisher"]').val()
    $.ajax({
        method: "PUT",
        url: BASE_URL + 'appdata/' + APP_KEY + '/ad/' + id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, description, date, price, image, publisher}
    }).then(function () {
        listAd()
        showInfo('Advertisement edited.');
    }).catch(handleAjaxError)
}


function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    // showError(errorMsg)
}
