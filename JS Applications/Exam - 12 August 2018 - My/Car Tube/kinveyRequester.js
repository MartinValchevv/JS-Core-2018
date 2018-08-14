const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_r1lVbhaHQ' //your app id
const APP_SECRET = '69ce95a2f6574b9581e5d3cf8b35c586' //your app secret
const AUTH_HEADERS = { 'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET) }


function loginUser() {
    let username = $('#formLogin input[name=username]').val()
    let password = $('#formLogin input[name=password]').val()

    if (username && username.length > 2) {
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
            showError('A password is empty.')
        }
    } else {
        showError('A username should be at least 3 characters long.')
    }
}

function registerUser() {
    let username = $('#registerForm input[name=username]').val()
    let password = $('#registerForm input[name=password]').val()
    let repeatPass = $('#registerForm input[name=repeatPass]').val()


    if (username && username.length > 2) {
        if (password && password.length > 5) {
            if (password === repeatPass) {

                $.ajax({
                    method: 'POST',
                    url: BASE_URL + 'user/' + APP_KEY + '/',
                    headers: AUTH_HEADERS,
                    data: { username, password }
                }).then(function (res) {
                    $('#registerForm').trigger('reset')
                    signInUser(res, 'User registration successful.')
                }).catch(handleAjaxError)

            } else {
                showError('Passwords do not match.')
            }
        } else {
            showError('A user‘s password should be at least 6 characters long')
        }
    } else {
        showError('A username should be at least 3 characters long.')
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

function listCars() {
    $('.listing').remove()
    $('.no-cars').hide()
    $('#listings').empty()
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/cars?query={}&sort={"_kmd.ect": -1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayCars(res)
    }).catch(handleAjaxError)

}

function displayCars(cars) {
    if (cars.length !== 0) {
        for (let car of cars) {
            let mainDiv = $('<div class="listing">')
            let info = $(`<p>${car.title}</p><img src="${car.imageUrl}"><h2>Brand: ${car.brand}</h2>`)
            let divInfo = $('<div class="info">')
            let dataInfo = $('<div id="data-info">')
            let info2 = $(` <h3>Seller: ${car.author}</h3>
                            <h3>Fuel: ${car.fuelType}</h3>
                            <h3>Year: ${car.year}</h3>
                            <h3>Price: ${car.price} $</h3>`)
            let divButton = $('<div id="data-buttons">')
            let ul = $('<ul>')
            let li = $('<li class="action">')
            let li2 = $('<li class="action">')
            let li3 = $('<li class="action">')
            let aDetails = $('<a href="#" class="button-carDetails">Details</a>').on('click', function () {
                details(car)
                showDetails()
            })
            let aEdit = $('<a href="#" class="button-carDetails" id="btnEdit2">edit</a>').on('click', function () {
                loadCarForEdit(car)
                editView()
            })
            let aDelete = $('<a href="#" class="button-carDetails">delete</a>').on('click', function () {
                deleteCars(car)
                listCars()
            })

            if (sessionStorage.getItem("id") === car._acl.creator) {
                $('#listings').append(mainDiv.append(info)
                    .append(divInfo.append(dataInfo.append(info2))
                        .append(divButton.append(ul.append(li.append(aDetails).append(li2.append(aEdit).append(li3.append(aDelete))))))))
            } else {
                $('#listings').append(mainDiv.append(info)
                    .append(divInfo.append(dataInfo.append(info2))
                        .append(divButton.append(ul.append(li.append(aDetails))))))
            }
        }

    } else {
            $('.no-cars').show()
    }
}


function createCar() {
    let author = sessionStorage.getItem('username')
    let title = $(`#createForm input[name=title]`).val()
    let description = $(`#createForm input[name=description]`).val()
    let brand = $(`#createForm input[name=brand]`).val()
    let model = $(`#createForm input[name=model]`).val()
    let year = $(`#createForm input[name=year]`).val()
    let imageUrl = $(`#createForm input[name=imageUrl]`).val()
    let fuelType = $(`#createForm input[name=fuelType]`).val()
    let price = +$(`#createForm input[name=price]`).val()

    if (title && title.length < 34) {
        if (description.length < 451) {
            if (brand && brand.length < 12 && fuelType && fuelType.length < 12 && model && model.length < 12 ) {
                if (year && year.length > 3) {
                    if (price && price <= 1000000 ) {
                        $.ajax({
                            method: 'POST',
                            url: BASE_URL + 'appdata/' + APP_KEY + '/cars',
                            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
                            data: {author, title, description, brand, model, year, imageUrl, fuelType, price}
                        }).then(function (res) {
                            sessionStorage.setItem('CarId', res._id)
                            $('#createForm').trigger('reset')
                            showInfo('listing created.')
                            listCars()
                            allCarsView()
                        }).catch(handleAjaxError)
                    } else {
                        showError('The maximum price is 1000000$')
                    }
                } else {
                    showError('The year must be only 4 chars long!')
                }
            } else {
                showError('length must not exceed 11 characters!')
            }
        } else {
            showError('Your listing is over 450 symbols.')
        }
    } else {
        showError('Enter text. / The title length must not exceed 33 characters!')
    }
}

function listMyCars() {
    let username = sessionStorage.getItem('username')
    $('#mycarlistin').remove()
    $('#mylistings').empty()
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/cars?query={"author":"${username}"}&sort={"_kmd.ect": 1}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayMyCars(res)
    }).catch(handleAjaxError)
}

function displayMyCars(cars) {
    if (cars.length !== 0) {
        for (let car of cars) {
            let btnDetails = $('<a href="#" class="my-button-list" id="btnDetails">Details</a>').on('click', function () {
               showDetails()
            })
            let btnEdit = $('<a href="#" class="my-button-list" id="btnEdit">Edit</a>').on('click', function () {
                loadCarForEdit(car)
                editView()
            })
            let btnDelete = $('<a href="#" class="my-button-list" id="btnDelete">Delete</a>').on('click', function () {
                deleteCars(car)
                listMyCars()
            })
            let mainDiv = $(`<div class="car-listings" id="mycarlistin">`)
            let innerDiv = $(`<div class="my-listing">`)
            let moreDiv = $(` <p id="listing-title">${car.title}</p>
                    <img src="${car.imageUrl}">

                    <div class="listing-props">
                        <h2>Brand: ${car.brand}</h2>
                        <h3>Model: ${car.model}</h3>
                        <h3>Year: ${car.year}</h3>
                        <h3>Price: ${car.price}$</h3>
                    </div>`)
            let divBtn = $(`<div class="my-listing-buttons">`).append(btnDetails).append(btnEdit).append(btnDelete)
            innerDiv.append(moreDiv).append(divBtn)
            $('#mylistings').append(mainDiv).append(innerDiv)
        }
    } else {
        $('#mylistings').append('<div class="car-listings" id="mycarlistin"><p class="no-cars" id="nocars"> No cars in database.</p></div>')
    }
}

function deleteCars(car) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + `/cars/${car._id}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        showInfo('Car deleted.')
        listCars()
        listMyCars()
    }).catch(handleAjaxError)
}


function loadCarForEdit(car) {
     sessionStorage.getItem('username')
    $(`#editForm input[name=title]`).val(car.title)
    $(`#editForm input[name=description]`).val(car.description)
    $(`#editForm input[name=brand]`).val(car.brand)
    $(`#editForm input[name=model]`).val(car.model)
    $(`#editForm input[name=year]`).val(car.year)
    $(`#editForm input[name=imageUrl]`).val(car.imageUrl)
    $(`#editForm input[name=fuelType]`).val(car.fuelType)
    $(`#editForm input[name=price]`).val(car.price)

}

function editCar() {
    let author = sessionStorage.getItem('username')
    let title = $(`#editForm input[name=title]`).val()
    let description = $(`#editForm input[name=description]`).val()
    let brand = $(`#editForm input[name=brand]`).val()
    let model = $(`#editForm input[name=model]`).val()
    let year = $(`#editForm input[name=year]`).val()
    let imageUrl = $(`#editForm input[name=imageUrl]`).val()
    let fuelType = $(`#editForm input[name=fuelType]`).val()
    let price = $(`#editForm input[name=price]`).val()
    let carId = sessionStorage.getItem('carId')

    if (title && title.length < 34) {
        if (description.length < 451) {
            if (brand && brand.length < 12 && fuelType && fuelType.length < 12 && model && model.length < 12) {
                if (year && year.length > 3) {
                    if (price && price <= 1000000) {
                        $.ajax({
                            method: 'PUT',
                            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + carId,
                            headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
                            data: {author, title, description, brand, model, year, imageUrl, fuelType, price}
                        }).then(function (res) {
                            showInfo('Listing edited.')
                            listCars()
                            listMyCars()
                            allCarsView()
                        }).catch(handleAjaxError)
                    } else {
                        showError('The maximum price is 1000000$')
                    }
                } else {
                    showError('The year must be only 4 chars long!')
                }
            } else {
                showError('length must not exceed 11 characters!')
            }
        } else {
            showError('Your listing is over 450 symbols.')
        }
    } else {
        showError('Enter text. / The title length must not exceed 33 characters!')
    }
}

function details(car) {
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + `/cars/?query={"CarId":"${car}"}`,
        headers: { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken') }
    }).then(function (res) {
        displayDetails(res)
    }).catch(handleAjaxError)
}

function displayDetails(car) {
    $('#details1').remove()
    $('#listingdetails').empty()
    let mainDiv = $('<div class="my-listing-details" id="details1">')
    let info = $(`<p id="auto-title">${car.title}</p>
                <img src="${car.imageUrl}">`)
    let propDiv = $('<div class="listing-props">')
    let infoProp = $(`<h2>Brand: ${car.brand}</h2>
                    <h3>Model: ${car.model}</h3>
                    <h3>Year: ${car.year}</h3>
                    <h3>Fuel: ${car.fuelType}</h3>
                    <h3>Price: ${car.price}$</h3>`)
    let divBtn = $('<div class="listings-buttons">')
    let aEdit = $('<a href="#" class="button-list">Edit</a>').on('click', function () {
        loadCarForEdit(car)
        editView()
    })
    let aDel = $('<a href="#" class="button-list">Delete</a>').on('click', function () {
        deleteCars(car)
        listMyCars()
    })

    if (sessionStorage.getItem("id") === car._acl.creator) {
    $('#listingdetails').append(mainDiv
        .append(info)
        .append(propDiv.append(infoProp))
        .append(divBtn.append(aEdit).append(aDel))
        .append(`<p id="description-title">Description:</p>
                <p id="description-para">${car.description}</p>`))
    } else {
    $('#listingdetails').append(mainDiv
        .append(info)
        .append(propDiv.append(infoProp))
        .append(divBtn)
        .append(`<p id="description-title">Description:</p>
                <p id="description-para">${car.description}</p>`))
    }
}
