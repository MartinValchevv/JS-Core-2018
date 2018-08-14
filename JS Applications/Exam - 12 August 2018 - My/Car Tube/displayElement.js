function hideAllView() {
    $('#main').hide()
    $('#login').hide()
    $('#register').hide()
    $('.carlistings').hide()
    $('.createlisting').hide()
    $('.editlisting').hide()
    $('#mylistings').hide()
    $('#listingdetails').hide()
}

function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken')) { // We have logged in user
        hideAllView()
        $('#allListingLink').show()
        $('#myListingsLink').show()
        $('#createListingLink').show()
        $('#profile').show()
        $('#infoUser').text('Welcome '+ sessionStorage.getItem('username'))
        $('.carlistings').show()
        listCars()
    }else { // No logged in user
        hideAllView()
       $('#main').show()
       $('#allListingLink').hide()
       $('#myListingsLink').hide()
       $('#createListingLink').hide()
       $('#profile').hide()
    }
}

function showRegisterView() {
    hideAllView()
    $('#register').show()

}

function showLoginView() {
  hideAllView()
    $('#login').show()

}

function showCreateView() {
    hideAllView()
    $('.createlisting').show()
}

function allCarsView() {
    hideAllView()
    showHideMenuLinks()
    $('#listings').empty()
}

function displayMyView() {
    hideAllView()
    $('#mylistings').show()
    listMyCars()
}

function editView() {
    hideAllView()
    $('.editlisting').show()
}

function showDetails() {
    hideAllView()
    $('#listingdetails').show()
}
