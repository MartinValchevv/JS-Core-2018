function showView(viewName) {
    $('body section').hide() // Hide all section views
    $('#' + viewName).show() //Show the selected view only
}

function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken') == null) { // No logged in user
        showView()
        $('#linkLogin').show()
        $('#linkRegister').show()
        showRegisterView()
        showLoginView()
        $('#linkHome').hide()
        $('#linkDiscover').hide()
        $('#linkMe').hide()
        $('#linkLogout').hide()
    }else { // We have logged in user
        showView('linkHome')
        showView('linkDiscover')
        showView('linkMe')
        showView('linkLogout')
        $('#linkLogin').hide()
        $('#linkRegister').hide()
        showHomeView()
        //$('#profile').find('span').text(sessionStorage.getItem('username'))
    }
}

function showRegisterView() {
    showView('viewRegister')
    $('#formRegister').trigger('reset')
}

function showLoginView() {
    showView('viewLogin')
    $('#formLogin').trigger('reset')
}

function showHomeView() {
    showView('viewFeed')
    listChirps()
}