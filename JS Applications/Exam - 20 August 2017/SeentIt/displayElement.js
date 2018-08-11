function showView(viewName) {
    $('body section').hide() // Hide all section views
    $('#' + viewName).show() //Show the selected view only
}

function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken') == null) { // No logged in user
        showView('viewWelcome')
        $('#profile').hide()
        $('#menu').hide()
    }else { // We have logged in user
        showView('profile')
        showView('menu')
        listPosts()
        $('#profile').find('span').text(sessionStorage.getItem('username'))
    }
}