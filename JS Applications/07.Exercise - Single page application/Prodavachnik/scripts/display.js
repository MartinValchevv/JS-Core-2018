function showView(viewName) {
    $('main > section').hide() // Hide all views
    $('#' + viewName).show() // Show the selected view only
}

function showHideMenuLinks() {
    $("#menu").show()
    if (sessionStorage.getItem('authToken') === null) { // No logged in user
        $("#linkHome").show()
        $("#linkLogin").show()
        $("#linkRegister").show()
        $("#linkListAds").hide()
        $("#linkCreateAd").hide()
        $("#linkLogout").hide()
    } else { // We have logged in user
        $("#linkHome").show()
        $("#linkLogin").hide()
        $("#linkRegister").hide()
        $("#linkListAds").show()
        $("#linkCreateAd").show()
        $("#linkLogout").show()
    }
}

function showHomeView() {
    showView('viewHome')
}

function showRegisterView() {
    $('#viewRegister').trigger('reset')
    showView('viewRegister')
}

function showLoginView() {
    showView('viewLogin')
    $('#formLogin').trigger('reset')
}

function viewAds() {
    showView('viewAds')
    $('#viewAds').trigger('reset')
}

function viewCreateAd() {
    showView('viewCreateAd')
    $('#viewCreateAd').trigger('reset')
}

function showInfo(message) {
    let infoBox = $('#infoBox')
    infoBox.text(message)
    infoBox.show()
    setTimeout(function() {
        $('#infoBox').fadeOut()
    }, 3000)
}
