function attachAllEvents() {
    //Bind the navigation menu links
    $('#linkRegister').on('click', showRegisterView)
    $('#linkRegisterLoginForum').on('click', showRegisterView)
    $('#linkLogin').on('click', showLoginView)
    $('#linkLoginRegisterForm').on('click', showLoginView)
    $('#linkHome').on('click', showHomeView)
    $('#linkLogout').on('click', logoutUser)
    $('#linkMe').on('click', () => displayUserFeed)
    $('#linkMe').on('click', displayUserFeed)
    $('#linkDiscover').on('click', listDiscover)



    // Bind the form submit buttons
    $('#btnRegister').on('click', registerUser)
    $('#btnLogin').on('click', loginUser)
    $('#btnSubmitChirp').on('click', () => postChirp('formSubmitChirp'))
    $('#btnSubmitChirpMy').on('click', () => postChirp('formSubmitChirpMy'))
    $('#btnFollow').on('click', fallowUser)
    $('#btnUnfollow').on('click', unfallowUser)

    $("form").on('submit', function (event) { event.preventDefault() })

}